import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { STUDIO_SEQUENCES } from "./vehicle-studio-sequences";

test("Fabia uses eight stable angles, not the unstable 36-frame interpolation", () => {
  assert.deepEqual(STUDIO_SEQUENCES['fabia'], [0, 11, 13, 17, 18, 27, 30, 31]);
  assert.equal(STUDIO_SEQUENCES['fabia']?.length, STUDIO_SEQUENCES['clio']?.length);
});

test("every selected studio angle exists in its own vehicle set", () => {
  for (const [key, sequence] of Object.entries(STUDIO_SEQUENCES)) {
    assert.equal(new Set(sequence).size, 8);
    for (const angle of sequence) {
      assert.ok(existsSync(`public/spin360/${key}-${String(angle).padStart(2, "0")}.webp`));
    }
  }
});