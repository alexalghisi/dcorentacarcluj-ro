import {
  FLEET_SOURCE_URL,
  parseMinPrice,
  parseSourceImages,
  parseSourceVehicles,
  type FleetSyncRun,
} from "@/lib/fleet-sync";

const FIRECRAWL_SCRAPE = "https://api.firecrawl.dev/v2/scrape";

export interface FleetSyncResult {
  ok: boolean;
  found: number;
  created: number;
  updated: number;
  skipped: number;
  deactivated: number;
  message: string;
}

/** Fetches the OLX listing as markdown (OLX blocks plain requests). */
async function scrapeListing(): Promise<string> {
  const apiKey = process.env["FIRECRAWL_API_KEY"];
  if (!apiKey) throw new Error("FIRECRAWL_API_KEY lipsește");

  const response = await fetch(FIRECRAWL_SCRAPE, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ url: FLEET_SOURCE_URL, formats: ["markdown"], onlyMainContent: false }),
  });

  const payload = (await response.json().catch(() => null)) as
    | { markdown?: string; data?: { markdown?: string }; error?: string }
    | null;

  if (!response.ok) {
    throw new Error(payload?.error ?? `Firecrawl a răspuns ${response.status}`);
  }
  const markdown = payload?.markdown ?? payload?.data?.markdown ?? "";
  if (!markdown) throw new Error("Anunțul a fost citit, dar fără conținut");
  return markdown;
}

function normalizeName(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");
}

/** Model name without the year, used to match cars added before the sync existed. */
function modelKey(value: string): string {
  return normalizeName(value).replace(/(19|20)\d{2}/g, "");
}


/** Reads the OLX listing and mirrors it into the fleet, keeping manual edits intact. */
export async function runFleetSync(): Promise<FleetSyncResult> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const now = new Date().toISOString();

  let result: FleetSyncResult = {
    ok: false,
    found: 0,
    created: 0,
    updated: 0,
    skipped: 0,
    deactivated: 0,
    message: "",
  };

  try {
    const markdown = await scrapeListing();
    const minPrice = parseMinPrice(markdown);
    const images = parseSourceImages(markdown);
    const parsed = parseSourceVehicles(markdown, minPrice);
    if (parsed.length === 0) throw new Error("Nu am găsit mașini în descrierea anunțului");

    const { data: existingRows, error: readError } = await supabaseAdmin
      .from("vehicles")
      .select("id, name, source_key, manual_lock, image_url, gallery, sort_order, is_active")
      .order("sort_order", { ascending: true });
    if (readError) throw new Error(readError.message);

    const existing = (existingRows ?? []) as Array<{
      id: string;
      name: string;
      source_key: string;
      manual_lock: boolean;
      image_url: string;
      gallery: string[];
      sort_order: number;
      is_active: boolean;
    }>;

    const byKey = new Map(existing.filter((v) => v.source_key).map((v) => [v.source_key, v]));
    const byName = new Map(existing.map((v) => [normalizeName(v.name), v]));
    const usedImages = new Set(
      existing.flatMap((v) => [v.image_url, ...(v.gallery ?? [])]).filter(Boolean),
    );
    const freeImages = images.filter((url) => !usedImages.has(url));

    let sortOrder = (existing.at(-1)?.sort_order ?? 0) + 10;
    const matchedIds = new Set<string>();
    let created = 0;
    let updated = 0;
    let skipped = 0;

    for (const item of parsed) {
      const match = byKey.get(item.source_key) ?? byName.get(normalizeName(item.name));

      if (!match) {
        const cover = freeImages.shift() ?? "";
        const { data, error } = await supabaseAdmin
          .from("vehicles")
          .insert({
            name: item.name,
            tagline: item.tagline,
            description: "",
            price_label: item.price_label,
            seats: item.seats,
            transmission: item.transmission,
            fuel: item.fuel,
            image_url: cover,
            gallery: [],
            sort_order: sortOrder,
            is_active: true,
            source_key: item.source_key,
            synced_at: now,
            manual_lock: false,
          })
          .select("id")
          .single();
        if (error) throw new Error(error.message);
        if (data?.id) matchedIds.add(data.id);
        sortOrder += 10;
        created += 1;
        continue;
      }

      matchedIds.add(match.id);

      if (match.manual_lock) {
        const { error } = await supabaseAdmin
          .from("vehicles")
          .update({ source_key: match.source_key || item.source_key, synced_at: now })
          .eq("id", match.id);
        if (error) throw new Error(error.message);
        skipped += 1;
        continue;
      }

      const { error } = await supabaseAdmin
        .from("vehicles")
        .update({
          name: item.name,
          tagline: item.tagline,
          price_label: item.price_label,
          seats: item.seats,
          transmission: item.transmission,
          fuel: item.fuel,
          source_key: item.source_key,
          synced_at: now,
          is_active: true,
        })
        .eq("id", match.id);
      if (error) throw new Error(error.message);
      updated += 1;
    }

    // Cars no longer listed get hidden, unless the owner edited them manually.
    const stale = existing.filter(
      (v) => !matchedIds.has(v.id) && v.is_active && !v.manual_lock && v.source_key,
    );
    for (const v of stale) {
      const { error } = await supabaseAdmin
        .from("vehicles")
        .update({ is_active: false, synced_at: now })
        .eq("id", v.id);
      if (error) throw new Error(error.message);
    }

    result = {
      ok: true,
      found: parsed.length,
      created,
      updated,
      skipped,
      deactivated: stale.length,
      message: minPrice ? `Preț minim din anunț: ${minPrice} lei/zi` : "",
    };
  } catch (error) {
    result.message = error instanceof Error ? error.message : "Eroare necunoscută";
  }

  await supabaseAdmin.from("fleet_sync_runs").insert({
    status: result.ok ? "ok" : "error",
    found: result.found,
    created: result.created,
    updated: result.updated,
    skipped: result.skipped + result.deactivated,
    message: result.message,
  });

  return result;
}

export async function fetchFleetSyncRuns(limit = 5): Promise<FleetSyncRun[]> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("fleet_sync_runs")
    .select("id, ran_at, status, found, created, updated, skipped, message")
    .order("ran_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);
  return (data ?? []) as FleetSyncRun[];
}
