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
 * Display multiplier for view counters shown in the admin dashboard.
 * 1 = real numbers. Any other value inflates what is displayed, so the label
 * next to the figure must say the numbers are estimated/adjusted.
 */
export const VIEW_DISPLAY_MULTIPLIER = 1;

export function displayViews(count: number): string {
  return Math.round(count * VIEW_DISPLAY_MULTIPLIER).toLocaleString("ro-RO");
}
