import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1";
const MODEL = "openai/gpt-6-astra";
const RUN_ID_HEADER = "X-Lovable-AIG-Run-ID";

export interface SeoPriorities {
  day: string;
  content: string;
  created_at: string;
  cached: boolean;
}

function runIdFetch() {
  let runId: string | undefined;
  return async (input: RequestInfo | URL, init?: RequestInit) => {
    const headers = new Headers(init?.headers);
    if (runId && !headers.has(RUN_ID_HEADER)) headers.set(RUN_ID_HEADER, runId);
    const res = await fetch(input, { ...init, headers });
    runId ??= res.headers.get(RUN_ID_HEADER)?.trim() || undefined;
    return res;
  };
}

function todayBucharest() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Bucharest" }).format(new Date());
}

/** Returns today's AI SEO priorities, generating them once per day from real Search Console data. */
export async function getDailySeoPriorities(force: boolean): Promise<SeoPriorities> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const day = todayBucharest();

  if (!force) {
    const { data } = await supabaseAdmin
      .from("seo_priorities")
      .select("day, content, created_at")
      .eq("day", day)
      .maybeSingle();
    if (data) return { ...data, cached: true };
  }

  const { fetchSearchConsoleStats } = await import("@/lib/search-console.server");
  const stats = await fetchSearchConsoleStats();
  if (!stats.available) throw new Error(stats.message ?? "Datele din Search Console lipsesc.");

  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) throw new Error("Funcția AI nu este configurată.");

  const fmt = (r: { key: string; clicks: number; impressions: number; ctr: number; position: number }) =>
    `${r.key} | clicuri ${r.clicks} | afișări ${r.impressions} | CTR ${(r.ctr * 100).toFixed(1)}% | poziție ${r.position.toFixed(1)}`;

  const prompt = `Date reale Google Search Console pentru dcorentacarcluj.ro (rent a car în Cluj/Gilău), ${stats.startDate} – ${stats.endDate}.
Total: clicuri ${stats.totals?.clicks}, afișări ${stats.totals?.impressions}, CTR ${((stats.totals?.ctr ?? 0) * 100).toFixed(1)}%, poziție medie ${stats.totals?.position.toFixed(1)}.

Căutări:
${(stats.queries ?? []).map(fmt).join("\n") || "(fără date)"}

Pagini:
${(stats.pages ?? []).map(fmt).join("\n") || "(fără date)"}

Scrie în română prioritățile SEO pentru AZI: maxim 5 acțiuni concrete, ordonate după impact. Pentru fiecare: titlu scurt, de ce (citează cifrele), ce anume schimbi (titlu, descriere, text, linkuri interne, recenzii, Google Business). Favorizează căutările cu afișări multe și poziție 5–20 sau CTR mic. Fără promisiuni de locul 1, fără tactici interzise de Google. Format: listă numerotată, sub 250 de cuvinte.`;

  const provider = createOpenAI({
    baseURL: GATEWAY_URL,
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: runIdFetch(),
  });

  const result = streamText({
    model: provider.responses(MODEL),
    system: "Ești consultant SEO local pentru o firmă mică de închirieri auto din Cluj.",
    prompt,
    maxRetries: 0,
    providerOptions: {
      openai: {
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        store: false,
        include: ["reasoning.encrypted_content"],
      },
    },
  });
  const content = (await result.text).trim();
  if (!content) throw new Error("Modelul nu a returnat priorități. Încearcă din nou mai târziu.");

  const { data, error } = await supabaseAdmin
    .from("seo_priorities")
    .upsert({ day, content, created_at: new Date().toISOString() })
    .select("day, content, created_at")
    .single();
  if (error) throw new Error(error.message);
  return { ...data, cached: false };
}
