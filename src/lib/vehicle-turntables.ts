const turntableFiles = import.meta.glob<string>("../assets/turntable/*.jpg", {
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
    const match = path.match(/\/([^/]+)-([0-9LR])\.jpg$/);
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
