const turntableFiles = import.meta.glob<string>("../assets/turntable/*.jpg", {
  eager: true,
  query: "?url",
  import: "default",
});

const framesByKey = Object.entries(turntableFiles).reduce<Record<string, string[]>>(
  (sets, [path, url]) => {
    const match = path.match(/\/([^/]+)-(\d+)\.jpg$/);
    if (!match) return sets;
    const key = match[1];
    const index = Number(match[2]);
    if (!key || !Number.isInteger(index)) return sets;
    const frames = sets[key] ?? [];
    frames[index] = url;
    sets[key] = frames;
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

/** Returns the six AI-assisted angles belonging to a known fleet vehicle. */
export function vehicleTurntable(name: string, imageUrl = ""): string[] {
  const key = keyForVehicle(name, imageUrl);
  if (!key) return [];
  return (framesByKey[key] ?? []).filter(Boolean);
}
