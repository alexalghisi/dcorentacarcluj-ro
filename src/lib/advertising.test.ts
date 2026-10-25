import { test } from "node:test";
import assert from "node:assert/strict";
import { adsterraUnit, ADSENSE_ACCOUNT } from "./advertising";

test("desktop banners start at 768px", () => {
  assert.deepEqual(adsterraUnit(768), { key: "420bec8420ceb6dcf93ad0c873b010eb", width: 728, height: 90 });
});
test("tablet banners cover 400 through 767px", () => {
  for (const width of [400, 767]) assert.deepEqual(adsterraUnit(width), { key: "ab9100a85f77f2acafea9f09e17594b4", width: 300, height: 250 });
});
test("small phones use 320 by 50 banners", () => {
  assert.deepEqual(adsterraUnit(399), { key: "ac44df6e484d23de0b5037682810d054", width: 320, height: 50 });
});
test("AdSense uses the supplied publisher account", () => {
  assert.equal(ADSENSE_ACCOUNT, "ca-pub-4079300108937036");
});