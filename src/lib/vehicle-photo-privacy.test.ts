import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { plateRegions, wrapPhoto } from "./vehicle-photo-privacy";

describe("public fleet privacy", () => {
  for (const file of ["car-fabia.jpg", "car-clio.jpg", "car-focus.jpg", "car-passat.jpg",
    "car-volvo-s40.jpg", "car-volvo-s40-grey.jpg", "car-c5.jpg", "car-xc90.jpg",
    "car-focus-black.jpg", "renault-megane-break-1.jpeg", "renault-megane-break-2.jpeg",
    "pbkvzuzixhd72-RO", "ypg2sp1lmszl-RO", "oz6a3xdde8qn-RO"]) {
    test(`${file} has reviewed plate masking`, () => {
      const masks = plateRegions(`/photos/${file}`);
      assert.ok(masks && masks.length > 0);
      for (const [x, y, w, h] of masks ?? []) {
        assert.ok(x >= 0);
        assert.ok(y >= 0);
        assert.ok(w > 0);
        assert.ok(h > 0);
        assert.ok(x + w <= 1);
        assert.ok(y + h <= 1);
      }
    });
  }
  for (const file of ["car-fabia", "car-volvo-s40", "car-volvo-s40-grey", "renault-megane-break-1", "renault-megane-break-2"]) {
    test(`optimized /fleet/${file}.webp reuses the reviewed masking of its source`, () => {
      const original = plateRegions(`/photos/${file}.${file.startsWith("renault") ? "jpeg" : "jpg"}`);
      assert.deepEqual(plateRegions(`/fleet/${file}.webp`), original);
    });
  }
  test("unknown uploads fail closed instead of revealing unreviewed plates", () => {
    assert.equal(plateRegions("/photos/new-car.jpg"), undefined);
  });
  test("photo navigation wraps within the same vehicle gallery", () => {
    assert.equal(wrapPhoto(-1, 2), 1);
    assert.equal(wrapPhoto(2, 2), 0);
    assert.equal(wrapPhoto(99, 1), 0);
  });
});