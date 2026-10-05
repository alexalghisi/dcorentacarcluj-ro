import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import {
  getAdminSession,
  isAdminUnlocked,
  requireAdmin,
  uploadVehicleImage,
  verifyCredentials,
} from "@/lib/admin.server";
import {
  applyVehicleOrder,
  fetchAllVehicles,
  fetchPublicVehicles,
  removeVehicle,
  setVehicleActive,
  upsertVehicle,
} from "@/lib/vehicles.server";

const vehicleSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(1, "Numele este obligatoriu").max(80),
  tagline: z.string().trim().max(160).default(""),
  description: z.string().trim().max(1200).default(""),
  price_label: z.string().trim().min(1).max(60),
  seats: z.string().trim().min(1).max(30),
  transmission: z.string().trim().min(1).max(30),
  fuel: z.string().trim().min(1).max(30),
  image_url: z.string().trim().max(500).default(""),
  gallery: z.array(z.string().trim().max(500)).max(20).default([]),
  sort_order: z.number().int().min(0).max(100000).default(0),
  is_active: z.boolean().default(true),
});

export const getPublicVehicles = createServerFn({ method: "GET" }).handler(async () =>
  fetchPublicVehicles(),
);

/** Public: counts one homepage visit. */
export const trackSiteView = createServerFn({ method: "POST" }).handler(async () => {
  const { recordSiteView } = await import("@/lib/analytics.server");
  await recordSiteView();
  return { ok: true as const };
});

/** Public: counts one view of a single vehicle card. */
export const trackVehicleView = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data }) => {
    const { recordVehicleView } = await import("@/lib/analytics.server");
    await recordVehicleView(data.id);
    return { ok: true as const };
  });

export const adminStats = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  const { fetchSiteViews } = await import("@/lib/analytics.server");
  const [siteViews, vehicles] = await Promise.all([fetchSiteViews(), fetchAllVehicles()]);
  const vehicleViews = vehicles.reduce((sum, v) => sum + (v.view_count ?? 0), 0);
  return { siteViews, vehicleViews, vehicles: vehicles.length };
});

/** Admin only: real Google Search Console performance for the site. */
export const adminSearchConsole = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  const { fetchSearchConsoleStats } = await import("@/lib/search-console.server");
  return fetchSearchConsoleStats();
});

/** Admin only: today's AI SEO priorities from real Search Console data (cached per day). */
export const adminSeoPriorities = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({ force: z.boolean().default(false) }).parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();
    const { getDailySeoPriorities } = await import("@/lib/seo-ai.server");
    try {
      return { ok: true as const, ...(await getDailySeoPriorities(data.force)) };
    } catch (error) {
      console.error("SEO priorities error", error);
      const message = error instanceof Error ? error.message : "Eroare necunoscută";
      return { ok: false as const, error: message };
    }
  });




export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({ username: z.string().max(120), password: z.string().max(200) })
      .parse(data),
  )
  .handler(async ({ data }) => {
    if (!verifyCredentials(data.username, data.password)) {
      return { ok: false as const };
    }
    const session = await getAdminSession();
    await session.update({ unlocked: true, username: data.username.trim() });
    return { ok: true as const };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  const session = await getAdminSession();
  await session.clear();
  return { ok: true as const };
});

export const adminStatus = createServerFn({ method: "GET" }).handler(async () => ({
  unlocked: await isAdminUnlocked(),
}));

export const adminListVehicles = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  return fetchAllVehicles();
});

export const adminSaveVehicle = createServerFn({ method: "POST" })
  .inputValidator((data) => vehicleSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();
    return upsertVehicle(data);
  });

export const adminDeleteVehicle = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();
    await removeVehicle(data.id);
    return { ok: true as const };
  });

export const adminToggleVehicle = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z.object({ id: z.string().uuid(), is_active: z.boolean() }).parse(data),
  )
  .handler(async ({ data }) => {
    await requireAdmin();
    await setVehicleActive(data.id, data.is_active);
    return { ok: true as const };
  });

export const adminReorderVehicles = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({ ids: z.array(z.string().uuid()).max(200) }).parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();
    await applyVehicleOrder(data.ids);
    return { ok: true as const };
  });

export const adminUploadImage = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        fileName: z.string().min(1).max(200),
        contentType: z.string().max(100).default("image/jpeg"),
        base64: z.string().min(1).max(14_000_000),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    await requireAdmin();
    const path = await uploadVehicleImage(data.fileName, data.base64, data.contentType);
    return { path };
  });

const bookingSchema = z.object({
  id: z.string().uuid().optional(),
  vehicle_id: z.string().uuid(),
  start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  customer_name: z.string().trim().max(120).default(""),
  customer_phone: z.string().trim().max(40).default(""),
  note: z.string().trim().max(600).default(""),
  status: z.enum(["confirmed", "option", "blocked"]).default("confirmed"),
});

/** Public: occupied periods per vehicle (no customer data). */
export const getBusyRanges = createServerFn({ method: "GET" }).handler(async () => {
  const { fetchBusyRanges } = await import("@/lib/bookings.server");
  return fetchBusyRanges();
});

export const adminListBookings = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  const { fetchAllBookings } = await import("@/lib/bookings.server");
  return fetchAllBookings();
});

export const adminSaveBooking = createServerFn({ method: "POST" })
  .inputValidator((data) => bookingSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();
    if (data.end_date < data.start_date) {
      return { ok: false as const, error: "Data de final este înaintea datei de start." };
    }
    const { upsertBooking } = await import("@/lib/bookings.server");
    try {
      const booking = await upsertBooking(data);
      return { ok: true as const, booking };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Eroare necunoscută";
      return {
        ok: false as const,
        error: message.includes("suprapune")
          ? "Perioada se suprapune cu o rezervare existentă pentru această mașină."
          : message,
      };
    }
  });

export const adminDeleteBooking = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();
    const { removeBooking } = await import("@/lib/bookings.server");
    await removeBooking(data.id);
    return { ok: true as const };
  });
