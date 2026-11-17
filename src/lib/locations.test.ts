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

test("root html lang map matches page languages", async () => {
  const { LOCATION_LANGS } = await import("./location-langs");
  const expected = new Map(
    locations.filter((l) => l.lang && l.lang !== "ro").map((l) => [`/${l.slug}`, l.lang]),
  );
  assert.deepEqual(new Map(LOCATION_LANGS), expected);
});

test("language pages are routable with sane meta", () => {
  for (const slug of ["cluj-airport-car-rental", "autoberles-kolozsvar"]) {
    const page = getLocation(slug);
    assert.ok(page, slug);
    assert.ok(page.metaTitle.length <= 60, `${slug} title ${page.metaTitle.length}`);
    assert.ok(page.description.length <= 160, `${slug} description ${page.description.length}`);
  }
});

test("no two indexable pages share a title", () => {
  const titles = locations.map((l) => l.metaTitle);
  assert.equal(new Set(titles).size, titles.length);
  assert.ok(!titles.includes("Rent a Car Cluj | Mașini de închiriat de la 70 lei/zi"), "clashes with homepage");
});
