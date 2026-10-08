import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { z } from "zod";

import type { Json } from "@/integrations/supabase/types";

const OUR_DOMAIN = "dcorentacarcluj.ro";
const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1";
const MODEL = "openai/gpt-6-astra";

interface Competitor {
  position: number;
  domain: string;
  title: string;
  snippet: string;
  url: string;
}

interface KeywordRow {
  id: string;
  keyword: string;
  locality: string;
}

function domainOf(link: string): string {
  try {
    return new URL(link).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function today() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Bucharest" }).format(new Date());
}

async function fetchSerp(keyword: string, apiKey: string) {
  const params = new URLSearchParams({
    engine: "google",
    google_domain: "google.ro",
    gl: "ro",
    hl: "ro",
    num: "10",
    q: keyword,
    api_key: apiKey,
  });
  const res = await fetch(`https://serpapi.com/search.json?${params}`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`SerpApi a eșuat [${res.status}]: ${text.slice(0, 200)}`);
  }
  const data = (await res.json()) as {
    organic_results?: { position?: number; link?: string; title?: string; snippet?: string }[];
  };
  const competitors: Competitor[] = (data.organic_results ?? [])
    .slice(0, 10)
    .map((r, i) => ({
      position: r.position ?? i + 1,
      domain: domainOf(r.link ?? ""),
      title: r.title ?? "",
      snippet: r.snippet ?? "",
      url: r.link ?? "",
    }))
    .filter((c) => c.domain);
  const ours = competitors.find((c) => c.domain === OUR_DOMAIN || c.domain.endsWith(`.${OUR_DOMAIN}`));
  return { competitors, ourPosition: ours?.position ?? null, ourUrl: ours?.url ?? null };
}

const RecommendationSchema = z.object({
  recommendations: z
    .array(
      z.object({
        page: z.string().max(200).default(""),
        keyword: z.string().max(120).default(""),
        recommendation: z.string().min(20).max(600),
      }),
    )
    .min(1)
    .max(5),
});

async function generateRecommendations(
  changes: { keyword: string; type: string; details: string }[],
  positions: { keyword: string; locality: string; position: number | null }[],
) {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey || changes.length === 0) return 0;
  const provider = createOpenAI({ baseURL: GATEWAY_URL, apiKey });
  const prompt = `Ești consultant SEO pentru DCO Rent a Car Cluj (${OUR_DOMAIN}), închirieri auto cu bază în Gilău, Cluj.

Poziții azi în Google.ro:
${positions.map((p) => `- „${p.keyword}" (${p.locality}): ${p.position ? `poziția ${p.position}` : "nu apare în top 10"}`).join("\n")}

Schimbări detectate azi:
${changes.map((c) => `- [${c.type}] „${c.keyword}": ${c.details}`).join("\n")}

Propune maximum 5 recomandări concrete, acționabile, în română, pentru îmbunătățirea pozițiilor. Fiecare recomandare trebuie să spună CE pagină și CE anume de schimbat (titlu, conținut, FAQ, linkuri interne). Nu propune recenzii false, nu inventa prețuri sau servicii. Răspunde DOAR cu JSON valid: {"recommendations": [{"page": "...", "keyword": "...", "recommendation": "..."}]}`;

  const { text } = await generateText({
    model: provider(MODEL),
    prompt,
    temperature: 0.4,
  });
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return 0;
  const parsed = RecommendationSchema.safeParse(JSON.parse(match[0]));
  if (!parsed.success) return 0;

  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { error } = await supabaseAdmin.from("seo_recommendations").insert(
    parsed.data.recommendations.map((r) => ({
      page: r.page || null,
      keyword: r.keyword || null,
      recommendation: r.recommendation,
      status: "pending",
    })),
  );
  return error ? 0 : parsed.data.recommendations.length;
}

/** Daily SERP check for all active keywords. Safe to re-run: one snapshot per keyword per day. */
export async function runSerpCheck(): Promise<{
  checked: number;
  changes: number;
  recommendations: number;
}> {
  const apiKey = process.env["SERPAPI_API_KEY"];
  if (!apiKey) throw new Error("Cheia SerpApi nu este configurată încă.");
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const { data: keywords, error } = await supabaseAdmin
    .from("seo_keywords")
    .select("id, keyword, locality")
    .eq("active", true)
    .order("locality");
  if (error) throw error;
  const list = (keywords ?? []) as KeywordRow[];

  const day = today();
  let changesCount = 0;
  const changeSummaries: { keyword: string; type: string; details: string }[] = [];
  const positions: { keyword: string; locality: string; position: number | null }[] = [];

  for (const kw of list) {
    // One snapshot per keyword per day: skip if already checked today.
    const { data: existing } = await supabaseAdmin
      .from("serp_snapshots")
      .select("id")
      .eq("keyword_id", kw.id)
      .gte("checked_at", `${day}T00:00:00+03:00`)
      .limit(1);
    if (existing && existing.length > 0) continue;

    let serp: Awaited<ReturnType<typeof fetchSerp>>;
    try {
      serp = await fetchSerp(kw.keyword, apiKey);
    } catch (e) {
      console.error(`SerpApi failed for „${kw.keyword}"`, e);
      continue;
    }
    positions.push({ keyword: kw.keyword, locality: kw.locality, position: serp.ourPosition });

    const { data: prevRows } = await supabaseAdmin
      .from("serp_snapshots")
      .select("our_position, competitors")
      .eq("keyword_id", kw.id)
      .lt("checked_at", `${day}T00:00:00+03:00`)
      .order("checked_at", { ascending: false })
      .limit(1);
    const prev = prevRows?.[0] as
      | { our_position: number | null; competitors: Competitor[] }
      | undefined;

    await supabaseAdmin.from("serp_snapshots").insert({
      keyword_id: kw.id,
      our_position: serp.ourPosition,
      our_url: serp.ourUrl,
      competitors: serp.competitors as unknown as Json,
    });

    const changes: { change_type: string; details: { [key: string]: Json | undefined } }[] = [];
    if (prev) {
      if (prev.our_position == null && serp.ourPosition != null) {
        changes.push({
          change_type: "appeared",
          details: { position: serp.ourPosition },
        });
        changeSummaries.push({
          keyword: kw.keyword,
          type: "appeared",
          details: `am intrat în top 10 pe poziția ${serp.ourPosition}`,
        });
      } else if (prev.our_position != null && serp.ourPosition == null) {
        changes.push({ change_type: "disappeared", details: { from: prev.our_position } });
        changeSummaries.push({
          keyword: kw.keyword,
          type: "disappeared",
          details: `am ieșit din top 10 (eram pe ${prev.our_position})`,
        });
      } else if (prev.our_position != null && serp.ourPosition != null) {
        const delta = prev.our_position - serp.ourPosition;
        if (prev.our_position <= 3 && serp.ourPosition > 3) {
          changes.push({
            change_type: "dropped_top3",
            details: { from: prev.our_position, to: serp.ourPosition },
          });
          changeSummaries.push({
            keyword: kw.keyword,
            type: "dropped_top3",
            details: `am căzut din top 3: ${prev.our_position} → ${serp.ourPosition}`,
          });
        } else if (Math.abs(delta) >= 3) {
          changes.push({
            change_type: delta > 0 ? "position_up" : "position_down",
            details: { from: prev.our_position, to: serp.ourPosition },
          });
          changeSummaries.push({
            keyword: kw.keyword,
            type: delta > 0 ? "position_up" : "position_down",
            details: `${prev.our_position} → ${serp.ourPosition}`,
          });
        }
      }
      const prevDomains = new Set(prev.competitors.map((c) => c.domain));
      const fresh = serp.competitors.filter(
        (c) => c.domain !== OUR_DOMAIN && !prevDomains.has(c.domain),
      );
      if (fresh.length > 0) {
        changes.push({
          change_type: "new_competitor",
          details: { domains: fresh.map((c) => c.domain) },
        });
        changeSummaries.push({
          keyword: kw.keyword,
          type: "new_competitor",
          details: `concurenți noi în top 10: ${fresh.map((c) => c.domain).join(", ")}`,
        });
      }
    }

    if (changes.length > 0) {
      await supabaseAdmin
        .from("serp_changes")
        .insert(changes.map((c) => ({ keyword_id: kw.id, ...c })));
      changesCount += changes.length;
    }
  }

  // Refresh the Search Console per-page cache (last 30 days, stored under today).
  try {
    const { fetchSearchConsoleStats } = await import("@/lib/search-console.server");
    const stats = await fetchSearchConsoleStats();
    if (stats.available && stats.pages) {
      await supabaseAdmin.from("gsc_page_daily").upsert(
        stats.pages.map((p) => ({
          page: p.key,
          date: day,
          clicks: p.clicks,
          impressions: p.impressions,
          ctr: p.ctr,
          position: p.position,
        })),
        { onConflict: "page,date" },
      );
    }
  } catch (e) {
    console.error("GSC cache refresh failed", e);
  }

  let recommendations = 0;
  try {
    recommendations = await generateRecommendations(changeSummaries, positions);
  } catch (e) {
    console.error("AI recommendations failed", e);
  }

  return { checked: positions.length, changes: changesCount, recommendations };
}
