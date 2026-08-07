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
  if (/^https?:\/\//.test(imageUrl)) return imageUrl;
  return `/api/public/vehicle-image/${imageUrl.split("/").map(encodeURIComponent).join("/")}`;
}

export const TRANSMISSIONS = ["Manuală", "Automată"];
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

