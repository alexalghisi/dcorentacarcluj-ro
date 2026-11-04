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
import {
  ADSTERRA_NATIVE_KEY,
  ADSTERRA_SMARTLINK,
  ADSTERRA_SOCIAL_BAR_SRC,
  nativeBannerDocument,
  socialBarAllowed,
} from "./advertising";

test("native banner uses the dcorentacarcluj.ro NativeBanner_1 code", () => {
  assert.equal(ADSTERRA_NATIVE_KEY, "471ff9dfab2afed94172b3c1bae1109a");
  const doc = nativeBannerDocument("x1");
  assert.ok(doc.includes(`src="https://bauval.org/21/${ADSTERRA_NATIVE_KEY}"`));
  assert.ok(doc.includes(`id="container-${ADSTERRA_NATIVE_KEY}"`));
  assert.ok(doc.includes('"x1"'));
});
test("social bar and smartlink use the supplied codes", () => {
  assert.equal(ADSTERRA_SOCIAL_BAR_SRC, "https://bauval.org/14/08f2737e64f46d6026af4de4283ec886");
  assert.equal(ADSTERRA_SMARTLINK, "https://araplhn.org/4/774cb25231e4bd2f08c8dfa892efffb7");
});
test("social bar loads on public pages only", () => {
  for (const p of ["/", "/rent-a-car-cluj", "/blog/x", "/blog"]) assert.equal(socialBarAllowed(p), true, p);
  for (const p of ["/admin", "/admin/", "/admin/login", "/recenzie/abc", "/lovable/email/transactional/preview"])
    assert.equal(socialBarAllowed(p), false, p);
});
