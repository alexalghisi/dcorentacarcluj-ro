/** Public listing that the daily fleet sync reads. */
export const FLEET_SOURCE_URL =
  "https://www.olx.ro/d/oferta/inchiriez-masini-masini-de-inchiriat-rent-a-car-cluj-gilau-floresti-IDgPPvn.html";

export interface FleetSyncRun {
  id: string;
  ran_at: string;
  status: string;
  found: number;
  created: number;
  updated: number;
  skipped: number;
  message: string;
}

export interface ParsedSourceVehicle {
  source_key: string;
  name: string;
  tagline: string;
  fuel: string;
  transmission: string;
  seats: string;
  price_label: string;
}

const FUELS: Record<string, string> = {
  diesel: "Diesel",
  benzina: "Benzină",
  gpl: "Benzină + GPL",
  hibrid: "Hibrid",
  electric: "Electric",
};

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function titleCase(value: string): string {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => (w.length <= 2 ? w.toUpperCase() : w[0]!.toUpperCase() + w.slice(1).toLowerCase()))
    .join(" ");
}

function seatsFor(name: string): string {
  const lower = name.toLowerCase();
  if (/(xc90|touran|sharan|zafira|galaxy|7 locuri)/.test(lower)) return "7 locuri";
  if (/smart/.test(lower)) return "4 locuri";
  return "5 locuri";
}

/** Smallest daily price advertised in the listing, e.g. "70". */
export function parseMinPrice(markdown: string): number | null {
  const patterns = [
    /începând cu\s*(\d{2,4})\s*lei/i,
    /incepand cu\s*(\d{2,4})\s*lei/i,
    /de la\s*(\d{2,4})\s*lei/i,
    /^###\s*(\d{2,4})\s*lei/im,
  ];
  for (const re of patterns) {
    const m = markdown.match(re);
    if (m?.[1]) return Number(m[1]);
  }
  return null;
}

/** Photos published in the listing (deduplicated, original order). */
export function parseSourceImages(markdown: string): string[] {
  const urls = new Set<string>();
  for (const m of markdown.matchAll(/!\[[^\]]*\]\((https:\/\/[^\s)]*olxcdn\.com[^\s)]*)\)/g)) {
    if (m[1]) urls.add(m[1]);
  }
  return [...urls];
}

/**
 * Extracts fleet entries from the listing description.
 * Lines look like: "Vw Passat 2013 diesel manual".
 */
export function parseSourceVehicles(
  markdown: string,
  minPrice: number | null,
): ParsedSourceVehicle[] {
  const priceLabel = minPrice ? `de la ${minPrice} lei/zi` : "de la 70 lei/zi";
  const out: ParsedSourceVehicle[] = [];
  const seen = new Set<string>();

  const line = /^([\p{L}0-9][\p{L}0-9.\-+ ]{2,40}?)[.,]?\s+((?:19|20)\d{2})\s+(diesel|benzina|benzină|gpl|hibrid|electric)\s*\+?\s*(gpl)?\s*(automat[aă]?|manual[aă]?)?/iu;

  for (const raw of markdown.split("\n")) {
    const text = raw.replace(/[*_>#]/g, "").trim();
    if (!text || text.length > 80) continue;
    const m = text.match(line);
    if (!m) continue;

    const rawName = m[1]!.replace(/\s+/g, " ").trim();
    const year = m[2]!;
    const fuelKey = m[3]!
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const fuel = m[4] ? "Benzină + GPL" : (FUELS[fuelKey] ?? "Diesel");
    const transmission = /automat/i.test(m[5] ?? "") ? "Automată" : "Manuală";
    const name = `${titleCase(rawName)} ${year}`;
    const source_key = normalize(`${rawName}-${year}-${transmission}`);
    if (seen.has(source_key)) continue;
    seen.add(source_key);

    out.push({
      source_key,
      name,
      tagline: `${fuel} · ${transmission} · ${year}`,
      fuel,
      transmission,
      seats: seatsFor(rawName),
      price_label: priceLabel,
    });
  }

  return out;
}
