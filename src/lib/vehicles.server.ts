import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import type { Vehicle, VehicleInput } from "@/lib/vehicles";

const COLUMNS =
  "id, name, tagline, description, price_label, seats, transmission, fuel, image_url, gallery, sort_order, is_active, view_count";

function publicClient() {
  const key =
    process.env["SUPABASE_PUBLISHABLE_KEY"] ?? process.env["SUPABASE_ANON_KEY"] ?? "";
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
          headers.delete("Authorization");
        }
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });
}

/** Public, anon-visible fleet (RLS restricts to active rows). */
export async function fetchPublicVehicles(): Promise<Vehicle[]> {
  const { data, error } = await publicClient()
    .from("vehicles")
    .select(COLUMNS)
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as Vehicle[];
}

export async function fetchAllVehicles(): Promise<Vehicle[]> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("vehicles")
    .select(COLUMNS)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as Vehicle[];
}

export async function upsertVehicle(input: VehicleInput): Promise<Vehicle> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const payload = {
    name: input.name.trim(),
    tagline: input.tagline.trim(),
    description: input.description.trim(),
    price_label: input.price_label.trim(),
    seats: input.seats.trim(),
    transmission: input.transmission.trim(),
    fuel: input.fuel.trim(),
    image_url: input.image_url.trim(),
    gallery: (input.gallery ?? []).map((g) => g.trim()).filter(Boolean),
    sort_order: input.sort_order,
    is_active: input.is_active,
  };

  if (input.id) {
    const { data, error } = await supabaseAdmin
      .from("vehicles")
      .update(payload)
      .eq("id", input.id)
      .select(COLUMNS)
      .single();
    if (error) throw new Error(error.message);
    return data as Vehicle;
  }

  const { data, error } = await supabaseAdmin
    .from("vehicles")
    .insert(payload)
    .select(COLUMNS)
    .single();
  if (error) throw new Error(error.message);
  return data as Vehicle;
}

export async function removeVehicle(id: string): Promise<void> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { error } = await supabaseAdmin.from("vehicles").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function applyVehicleOrder(ids: string[]): Promise<void> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  for (let i = 0; i < ids.length; i += 1) {
    const { error } = await supabaseAdmin
      .from("vehicles")
      .update({ sort_order: (i + 1) * 10 })
      .eq("id", ids[i]!);
    if (error) throw new Error(error.message);
  }
}

export async function setVehicleActive(id: string, isActive: boolean): Promise<void> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { error } = await supabaseAdmin
    .from("vehicles")
    .update({ is_active: isActive })
    .eq("id", id);
  if (error) throw new Error(error.message);
}
