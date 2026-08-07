import type { Booking, BookingInput, BookingRange } from "@/lib/bookings";

const ADMIN_COLUMNS =
  "id, vehicle_id, start_date, end_date, customer_name, customer_phone, note, status";

/** Public availability: only the occupied periods, never customer details. */
export async function fetchBusyRanges(): Promise<BookingRange[]> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const today = new Date().toISOString().slice(0, 10);
  const { data, error } = await supabaseAdmin
    .from("vehicle_bookings")
    .select("vehicle_id, start_date, end_date")
    .gte("end_date", today)
    .order("start_date", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as BookingRange[];
}


export async function fetchAllBookings(): Promise<Booking[]> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("vehicle_bookings")
    .select(ADMIN_COLUMNS)
    .order("start_date", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as Booking[];
}

export async function upsertBooking(input: BookingInput): Promise<Booking> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const payload = {
    vehicle_id: input.vehicle_id,
    start_date: input.start_date,
    end_date: input.end_date,
    customer_name: input.customer_name.trim(),
    customer_phone: input.customer_phone.trim(),
    note: input.note.trim(),
    status: input.status,
  };

  if (input.id) {
    const { data, error } = await supabaseAdmin
      .from("vehicle_bookings")
      .update(payload)
      .eq("id", input.id)
      .select(ADMIN_COLUMNS)
      .single();
    if (error) throw new Error(error.message);
    return data as Booking;
  }

  const { data, error } = await supabaseAdmin
    .from("vehicle_bookings")
    .insert(payload)
    .select(ADMIN_COLUMNS)
    .single();
  if (error) throw new Error(error.message);
  return data as Booking;
}

export async function removeBooking(id: string): Promise<void> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { error } = await supabaseAdmin.from("vehicle_bookings").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
