import { test } from "node:test";
import assert from "node:assert/strict";
import { locations } from "./locations";
import { VEHICLE_LOCAL_AREAS, vehicleSlug } from "./vehicle-seo";

test("vehicles with the same model have distinct public addresses", () => {
  assert.notEqual(vehicleSlug({ name: "Volvo S40", id: "one" }), vehicleSlug({ name: "Volvo S40", id: "two" }));
});

test("all linked local rental areas have existing pages", () => {
  for (const area of VEHICLE_LOCAL_AREAS) {
    assert.ok(locations.some((location) => location.slug === area.slug), area.city);
  }
});

test("vehicle local coverage includes the five explicitly requested places", () => {
  const names = new Set<string>(VEHICLE_LOCAL_AREAS.map(({ city }) => city));
  for (const city of ["Florești", "Cluj", "Gilău", "Cluj-Napoca", "Huedin"]) assert.ok(names.has(city), city);
});