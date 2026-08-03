/** View counters. Increments run with the service role, never from the browser. */

export async function recordSiteView(): Promise<void> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { error } = await supabaseAdmin.rpc("increment_site_metric", {
    _key: "site_views",
    _delta: 1,
  });
  if (error) throw new Error(error.message);
}

export async function recordVehicleView(id: string): Promise<void> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { error } = await supabaseAdmin.rpc("increment_vehicle_view", { _id: id });
  if (error) throw new Error(error.message);
}

export async function fetchSiteViews(): Promise<number> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("site_metrics")
    .select("value")
    .eq("key", "site_views")
    .maybeSingle();
  if (error) throw new Error(error.message);
  return Number(data?.value ?? 0);
}
