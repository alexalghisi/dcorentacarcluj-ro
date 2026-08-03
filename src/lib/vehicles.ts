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
