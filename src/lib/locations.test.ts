import { test } from "node:test";
import assert from "node:assert/strict";
import { getLocation, locations } from "./locations";

test("every location slug is unique", () => {
  const slugs = locations.map((l) => l.slug);
  assert.equal(new Set(slugs).size, slugs.length);
});

test("trend-driven intent pages are routable", () => {
  for (const slug of [
    "rent-a-car-cluj-non-stop",
    "inchiriere-masina-weekend-cluj",
    "rent-a-car-cluj-ieftin",
    "inchiriere-masina-iarna-cluj",
  ]) {
    const page = getLocation(slug);
    assert.ok(page, slug);
    assert.ok(page.metaTitle.length <= 65, `${slug} title too long`);
    assert.ok(
      page.description.length >= 70 && page.description.length <= 170,
      `${slug} description length`,
    );
    assert.ok(page.faq.length >= 3);
  }
});

test("nearby links point at existing pages", () => {
  const slugs = new Set(locations.map((l) => l.slug));
  for (const l of locations)
    for (const n of l.nearby ?? []) assert.ok(slugs.has(n), `${l.slug} -> ${n}`);
});
