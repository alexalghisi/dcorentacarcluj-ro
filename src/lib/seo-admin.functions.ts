import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireAdmin } from "@/lib/admin.server";

/** Admin: full SEO monitoring dashboard data. */
export const getSeoDashboard = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const [keywordsRes, snapshotsRes, changesRes, recsRes, gscRes] = await Promise.all([
    supabaseAdmin
      .from("seo_keywords")
      .select("id, keyword, locality, active")
      .order("locality")
      .order("keyword"),
    supabaseAdmin
      .from("serp_snapshots")
      .select("keyword_id, checked_at, our_position, our_url, competitors")
      .order("checked_at", { ascending: false })
      .limit(600),
    supabaseAdmin
      .from("serp_changes")
      .select("id, keyword_id, detected_at, change_type, details")
      .order("detected_at", { ascending: false })
      .limit(50),
    supabaseAdmin
      .from("seo_recommendations")
      .select("id, page, keyword, recommendation, status, created_at")
      .order("created_at", { ascending: false })
      .limit(30),
    supabaseAdmin
      .from("gsc_page_daily")
      .select("page, date, clicks, impressions, ctr, position")
      .order("date", { ascending: false })
      .limit(60),
  ]);

  return {
    keywords: keywordsRes.data ?? [],
    snapshots: snapshotsRes.data ?? [],
    changes: changesRes.data ?? [],
    recommendations: recsRes.data ?? [],
    gscPages: gscRes.data ?? [],
  };
});

/** Admin: approve or reject an AI recommendation. Nothing is published automatically. */
export const decideRecommendation = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({ id: z.string().uuid(), status: z.enum(["approved", "rejected"]) })
      .parse(data),
  )
  .handler(async ({ data }) => {
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("seo_recommendations")
      .update({ status: data.status, decided_at: new Date().toISOString() })
      .eq("id", data.id);
    if (error) throw error;
    return { ok: true as const };
  });

/** Admin: add a keyword to the daily monitoring list. */
export const addSeoKeyword = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        keyword: z.string().trim().min(3).max(120),
        locality: z.string().trim().min(2).max(60),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("seo_keywords")
      .upsert(
        { keyword: data.keyword.toLowerCase(), locality: data.locality },
        { onConflict: "keyword,locality" },
      );
    if (error) throw error;
    return { ok: true as const };
  });

/** Admin: pause or resume monitoring for a keyword. */
export const toggleSeoKeyword = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z.object({ id: z.string().uuid(), active: z.boolean() }).parse(data),
  )
  .handler(async ({ data }) => {
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("seo_keywords")
      .update({ active: data.active })
      .eq("id", data.id);
    if (error) throw error;
    return { ok: true as const };
  });

/** Admin: run the SERP check right now (same daily cap as the scheduled job). */
export const runSerpCheckNow = createServerFn({ method: "POST" }).handler(async () => {
  await requireAdmin();
  const { runSerpCheck } = await import("@/lib/serp-monitor.server");
  return runSerpCheck();
});
