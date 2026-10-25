export type PlateRegion = readonly [number, number, number, number];

/** Reviewed source-photo regions in normalized image coordinates (x, y, width, height). */
const regions: Record<string, readonly PlateRegion[]> = {
  "car-fabia.jpg": [[0.14, 0.73, 0.22, 0.115]],
  "pbkvzuzixhd72-RO": [[0.14, 0.70, 0.23, 0.1]],
  "car-clio.jpg": [[0.74, 0.68, 0.26, 0.13]],
  "car-focus.jpg": [[0.07, 0.69, 0.18, 0.14]],
  "car-passat.jpg": [[0.025, 0.72, 0.25, 0.16]],
  "car-volvo-s40.jpg": [[0.17, 0.54, 0.24, 0.15]],
  "car-volvo-s40-grey.jpg": [[0.61, 0.71, 0.23, 0.16]],
  "car-c5.jpg": [[0.82, 0.38, 0.11, 0.11]],
  "ypg2sp1lmszl-RO": [[0.81, 0.44, 0.13, 0.1]],
  "car-xc90.jpg": [[0, 0.43, 0.14, 0.12]],
  "car-focus-black.jpg": [[0.76, 0.54, 0.16, 0.07], [0.68, 0.5, 0.12, 0.05]],
  "oz6a3xdde8qn-RO": [[0.76, 0.54, 0.16, 0.07], [0.68, 0.5, 0.12, 0.05]],
  "renault-megane-break-1.jpeg": [[0.79, 0.59, 0.14, 0.055], [0.84, 0.555, 0.12, 0.035]],
  "renault-megane-break-2.jpeg": [[0.77, 0.60, 0.16, 0.065], [0.84, 0.55, 0.12, 0.04]],
};

/**
 * Resized WebP copies served from /public/fleet keep the exact framing of their source photo,
 * so they reuse the reviewed regions of the original file name.
 */
const optimizedRegions: Record<string, readonly PlateRegion[]> = Object.fromEntries(
  Object.entries(regions)
    .filter(([key]) => /\.jpe?g$/.test(key))
    .map(([key, value]) => [`/fleet/${key.replace(/\.jpe?g$/, "")}.webp`, value]),
);

export function plateRegions(src: string): readonly PlateRegion[] | undefined {
  return (
    Object.entries(optimizedRegions).find(([key]) => src.includes(key))?.[1] ??
    Object.entries(regions).find(([key]) => src.includes(key))?.[1]
  );
}

export function wrapPhoto(index: number, count: number): number {
  return count > 0 ? ((index % count) + count) % count : 0;
}