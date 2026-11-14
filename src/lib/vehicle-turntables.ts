import { STUDIO_SEQUENCES } from "./vehicle-studio-sequences";

const turntableFiles = import.meta.glob<string>("../assets/turntable/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
});

/**
 * Turntable order (car turning one way, 45° per step):
 * front, front-left 3/4, left side, rear-left 3/4, rear, rear-right 3/4, right side, front-right 3/4.
 */
const ORDER = ["0", "1", "L", "2", "3", "4", "R", "5"];

const framesByKey = Object.entries(turntableFiles).reduce<Record<string, Record<string, string>>>(
  (sets, [path, url]) => {
    const match = path.match(/\/([^/]+)-([0-9LR])\.webp$/);
    if (!match) return sets;
    const key = match[1];
    const angle = match[2];
    if (!key || !angle) return sets;
    sets[key] = { ...(sets[key] ?? {}), [angle]: url };
    return sets;
  },
  {},
);

function keyForVehicle(name: string, imageUrl = ""): string | null {
  const value = `${name} ${imageUrl}`.toLocaleLowerCase("ro-RO");
  if (value.includes("fabia")) return "fabia";
  if (value.includes("clio")) return "clio";
  if (value.includes("passat")) return "passat";
  if (value.includes("citro") || value.includes("c5")) return "c5";
  if (value.includes("xc90")) return "xc90";
  if (value.includes("s40") && (value.includes("gri") || value.includes("grey"))) return "s40grey";
  if (value.includes("s40")) return "s40";
  if (value.includes("focus") && (value.includes("negru") || value.includes("black"))) return "focusblack";
  if (value.includes("focus")) return "focus";
  return null;
}

/** Returns the AI-assisted 360° angles belonging to a known fleet vehicle, in turning order. */
export function vehicleTurntable(name: string, imageUrl = ""): string[] {
  const key = keyForVehicle(name, imageUrl);
  if (!key) return [];
  const set = framesByKey[key] ?? {};
  return ORDER.map((a) => set[a]).filter((u): u is string => Boolean(u));
}

/** Number of positions in each smooth spin (one every 5°), served from /public/spin/<key>/00..71.jpg. */
export const SPIN_FRAMES = 72;
const SPIN_KEYS = new Set(["fabia", "clio", "passat", "c5", "xc90", "s40grey", "s40", "focusblack", "focus"]);

/** Returns the 72 smooth-rotation positions for a known fleet vehicle (empty if none). */
export function vehicleSpin(name: string, imageUrl = ""): string[] {
  const key = keyForVehicle(name, imageUrl);
  if (!key || !SPIN_KEYS.has(key)) return [];
  return Array.from({ length: SPIN_FRAMES }, (_, i) => `/spin/${key}/${String(i).padStart(2, "0")}.jpg`);
}

/**
 * Studio 360° views shown on the public fleet cards, served from /public/spin360/<key>-NN.webp.
 * Each set was built from the angles of that exact unit (same colour, wheels and trim as the
 * real photos), with number plates blurred and every angle aligned on one ground line.
 * All vehicles use eight selected angles; unstable Fabia interpolation steps are excluded.
 */
const SPIN360_VERSION = "20261021";

/** Frames of the drag-to-rotate studio view for a fleet vehicle, in turning order (empty if none). */
export function vehicle360Frames(name: string, imageUrl = ""): string[] {
  const key = keyForVehicle(name, imageUrl);
  const sequence = key ? STUDIO_SEQUENCES[key] : undefined;
  if (!key || !sequence) return [];
  return sequence.map(
    (i) => `/spin360/${key}-${String(i).padStart(2, "0")}.webp?v=${SPIN360_VERSION}`,
  );
}

/**
 * Whether the studio set may blend between neighbouring angles for a smoother turn.
 * The Fabia's frames keep the car in slightly different spots, so blending shows a
 * ghost car there; the other sets stay put and can glide.
 */
export function vehicle360Blend(name: string, imageUrl = ""): boolean {
  const key = keyForVehicle(name, imageUrl);
  return Boolean(key) && key !== "fabia";
}
