import { describe, expect, test } from "bun:test";
import { plateRegions, wrapPhoto } from "./vehicle-photo-privacy";

describe("public fleet privacy", () => {
  for (const file of ["car-fabia.jpg", "car-clio.jpg", "car-focus.jpg", "car-passat.jpg",
    "car-volvo-s40.jpg", "car-volvo-s40-grey.jpg", "car-c5.jpg", "car-xc90.jpg",
    "car-focus-black.jpg", "renault-megane-break-1.jpeg", "renault-megane-break-2.jpeg",
    "pbkvzuzixhd72-RO", "ypg2sp1lmszl-RO", "oz6a3xdde8qn-RO"]) {
    test(`${file} has reviewed plate masking`, () => {
      const masks = plateRegions(`/photos/${file}`);
      expect(masks?.length).toBeGreaterThan(0);
      for (const [x, y, w, h] of masks ?? []) {
        expect(x).toBeGreaterThanOrEqual(0);
        expect(y).toBeGreaterThanOrEqual(0);
        expect(w).toBeGreaterThan(0);
        expect(h).toBeGreaterThan(0);
        expect(x + w).toBeLessThanOrEqual(1);
        expect(y + h).toBeLessThanOrEqual(1);
      }
    });
  }
  test("unknown uploads fail closed instead of revealing unreviewed plates", () => {
    expect(plateRegions("/photos/new-car.jpg")).toBeUndefined();
  });
  test("photo navigation wraps within the same vehicle gallery", () => {
    expect(wrapPhoto(-1, 2)).toBe(1);
    expect(wrapPhoto(2, 2)).toBe(0);
    expect(wrapPhoto(99, 1)).toBe(0);
  });
});