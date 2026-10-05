import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin.server";

export type VehicleReview = {
  id: string;
  vehicle_id: string;
  author: string;
  rating: number;
  comment: string;
  submitted_at: string | null;
};

export type AdminReview = VehicleReview & {
  booking_id: string;
  token: string;
  status: "invited" | "pending" | "approved" | "rejected";
};

const admin = async () => (await import("@/integrations/supabase/client.server")).supabaseAdmin;

/** Public: only approved reviews, no booking or customer data. */
export const getApprovedReviews = createServerFn({ method: "GET" }).handler(async () => {
  const db = await admin();
  const { data, error } = await db
    .from("vehicle_reviews")
    .select("id, vehicle_id, author, rating, comment, submitted_at")
    .eq("status", "approved")
    .order("submitted_at", { ascending: false })
    .limit(200);
  if (error) throw new Error(error.message);
  return (data ?? []) as VehicleReview[];
});

/** Public: check an invite link. Only the car name is returned. */
export const getReviewInvite = createServerFn({ method: "GET" })
  .inputValidator((d) => z.object({ token: z.string().min(20).max(80) }).parse(d))
  .handler(async ({ data }) => {
    const db = await admin();
    const { data: row } = await db
      .from("vehicle_reviews")
      .select("status, vehicles(name)")
      .eq("token", data.token)
      .maybeSingle();
    if (!row) return { ok: false as const };
    const v = row.vehicles as unknown as { name: string } | null;
    return { ok: true as const, used: row.status !== "invited", vehicle: v?.name ?? "" };
  });

export const submitReview = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z
      .object({
        token: z.string().min(20).max(80),
        author: z.string().trim().min(2).max(60),
        rating: z.number().int().min(1).max(5),
        comment: z.string().trim().min(5).max(1000),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    const db = await admin();
    const { data: rows, error } = await db
      .from("vehicle_reviews")
      .update({
        author: data.author,
        rating: data.rating,
        comment: data.comment,
        status: "pending",
        submitted_at: new Date().toISOString(),
      })
      .eq("token", data.token)
      .eq("status", "invited")
      .select("id");
    if (error) throw new Error(error.message);
    if (!rows?.length) return { ok: false as const, error: "Linkul a fost deja folosit sau nu este valid." };
    return { ok: true as const };
  });

export const adminCreateReviewInvite = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ bookingId: z.string().uuid() }).parse(d))
  .handler(async ({ data }) => {
    await requireAdmin();
    const db = await admin();
    const { data: existing } = await db
      .from("vehicle_reviews")
      .select("token")
      .eq("booking_id", data.bookingId)
      .maybeSingle();
    if (existing) return { token: existing.token };
    const { data: booking, error: bErr } = await db
      .from("vehicle_bookings")
      .select("id, vehicle_id")
      .eq("id", data.bookingId)
      .single();
    if (bErr || !booking) throw new Error("Rezervarea nu există.");
    const bytes = crypto.getRandomValues(new Uint8Array(24));
    const token = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
    const { error } = await db
      .from("vehicle_reviews")
      .insert({ booking_id: booking.id, vehicle_id: booking.vehicle_id, token });
    if (error) throw new Error(error.message);
    return { token };
  });

export const adminListReviews = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  const db = await admin();
  const { data, error } = await db
    .from("vehicle_reviews")
    .select("id, booking_id, vehicle_id, token, author, rating, comment, status, submitted_at")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as AdminReview[];
});

export const adminModerateReview = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z.object({ id: z.string().uuid(), status: z.enum(["approved", "rejected"]) }).parse(d),
  )
  .handler(async ({ data }) => {
    await requireAdmin();
    const db = await admin();
    const { error } = await db
      .from("vehicle_reviews")
      .update({ status: data.status })
      .eq("id", data.id)
      .neq("status", "invited");
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });
