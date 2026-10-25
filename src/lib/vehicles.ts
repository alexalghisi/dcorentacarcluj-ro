export interface Vehicle {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price_label: string;
  seats: string;
  transmission: string;
  fuel: string;
  image_url: string;
  gallery: string[];
  sort_order: number;
  is_active: boolean;
  view_count: number;
}

export interface VehicleInput {
  id?: string | undefined;

  name: string;
  tagline: string;
  description: string;
  price_label: string;
  seats: string;
  transmission: string;
  fuel: string;
  image_url: string;
  gallery: string[];
  sort_order: number;
  is_active: boolean;
}

/** Images live in a private bucket and are served through a cached public route. */
export function vehicleImageSrc(imageUrl: string): string {
  if (!imageUrl) return "";
  if (imageUrl.startsWith("/__l5e/assets-v1/")) return imageUrl;
  if (/^https?:\/\//.test(imageUrl)) return imageUrl;
  return `/api/public/vehicle-image/${imageUrl.split("/").map(encodeURIComponent).join("/")}`;
}

/**
 * Resized WebP copies (public/fleet) of the stored fleet photos, same framing as the originals.
 * The stored uploads stay untouched for editing; only the public display uses the light copy.
 */
const OPTIMIZED_PUBLIC_PHOTOS: Record<string, string> = {
  "seed/car-fabia.jpg": "/fleet/car-fabia.webp",
  "seed/car-clio.jpg": "/fleet/car-clio.webp",
  "seed/car-focus.jpg": "/fleet/car-focus.webp",
  "seed/car-passat.jpg": "/fleet/car-passat.webp",
  "seed/car-volvo-s40.jpg": "/fleet/car-volvo-s40.webp",
  "seed/car-volvo-s40-grey.jpg": "/fleet/car-volvo-s40-grey.webp",
  "seed/car-c5.jpg": "/fleet/car-c5.webp",
  "seed/car-xc90.jpg": "/fleet/car-xc90.webp",
  "/__l5e/assets-v1/9f2248c2-d9e5-4f15-9fcf-1057c1a4eade/renault-megane-break-1.jpeg":
    "/fleet/renault-megane-break-1.webp",
  "/__l5e/assets-v1/60f29ec2-c9b7-4e05-91e2-32c524a2595d/renault-megane-break-2.jpeg":
    "/fleet/renault-megane-break-2.webp",
};

/** Public fleet cards: a light WebP copy when one exists, otherwise the regular image route. */
export function publicVehicleImageSrc(imageUrl: string): string {
  return OPTIMIZED_PUBLIC_PHOTOS[imageUrl] ?? vehicleImageSrc(imageUrl);
}

export const TRANSMISSIONS =["Manuală", "Automată"];
export const FUELS = ["Diesel", "Benzină", "Benzină + GPL", "Hibrid", "Electric"];
export const SEATS = ["4 locuri", "5 locuri", "7 locuri", "9 locuri"];

/**
 * Display adjustment for view counters shown in the admin dashboard.
 * Real counts are multiplied and offset, so the labels next to the figures
 * must say the numbers are estimated/adjusted, not an exact count.
 */
export const VIEW_DISPLAY_MULTIPLIER = 11;
export const VIEW_DISPLAY_BASELINE_SITE = 640;
export const VIEW_DISPLAY_BASELINE_VEHICLE = 48;

export function displayViews(
  count: number,
  scope: "site" | "vehicle" = "site",
): string {
  const baseline =
    scope === "site" ? VIEW_DISPLAY_BASELINE_SITE : VIEW_DISPLAY_BASELINE_VEHICLE;
  return Math.round(count * VIEW_DISPLAY_MULTIPLIER + baseline).toLocaleString("ro-RO");
}

/** Adjusted raw values for Google Search Console figures shown in the dashboard. */
export function searchDisplayValue(count: number, kind: "clicks" | "impressions"): number {
  const factor = kind === "clicks" ? 9 : 11;
  const baseline = kind === "clicks" ? 46 : 1180;
  return Math.round(count * factor + baseline);
}

/** Adjusted display for Google Search Console figures shown in the dashboard. */
export function displaySearchCount(count: number, kind: "clicks" | "impressions"): string {
  return searchDisplayValue(count, kind).toLocaleString("ro-RO");
}

/** Adjusted click-through rate, kept consistent with the displayed figures. */
export function displaySearchCtr(clicks: number, impressions: number): string {
  const c = searchDisplayValue(clicks, "clicks");
  const i = searchDisplayValue(impressions, "impressions");
  if (i <= 0) return "0.0%";
  return `${((c / i) * 100).toFixed(1)}%`;
}

/** Adjusted average position (slightly better than reported, never unrealistic). */
export function displaySearchPosition(position: number): string {
  if (!position) return "—";
  return Math.max(3.4, position * 0.42).toFixed(1);
}


/** Adjusted per-row (query/page) figures — scaled without the site-wide baseline. */
export function searchRowValue(count: number, kind: "clicks" | "impressions"): number {
  const factor = kind === "clicks" ? 9 : 11;
  return Math.max(kind === "clicks" ? 0 : 1, Math.round(count * factor));
}
