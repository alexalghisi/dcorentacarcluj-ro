/**
 * Adsterra banners (website id 6112457 in the Adsterra publisher panel).
 *
 * Each banner renders inside its own iframe (srcDoc) so the ad script
 * stays out of the booking page markup, and it is lazy-loaded so it never slows
 * down the first paint. Sizes: 728x90 desktop, 320x50 phone, 300x250 box.
 */

import { useEffect } from "react";

export type AdFormat = "leaderboard" | "box" | "mobile";

const HOST = "https://bauval.org";

const UNITS = {
  "728x90": { key: "420bec8420ceb6dcf93ad0c873b010eb", w: 728, h: 90 },
  "320x50": { key: "ac44df6e484d23de0b5037682810d054", w: 320, h: 50 },
  "300x250": { key: "ab9100a85f77f2acafea9f09e17594b4", w: 300, h: 250 },
} as const;

type Size = keyof typeof UNITS;

export function adDocument(size: Size): string {
  const u = UNITS[size];
  return `<html><body style="margin:0"><script>atOptions={'key':'${u.key}','format':'iframe','height':${u.h},'width':${u.w},'params':{}};</script><script src="${HOST}/22/${u.key}"></script></body></html>`;
}

function Frame({ size }: { size: Size }) {
  const u = UNITS[size];
  return (
    <iframe
      title="Publicitate"
      srcDoc={adDocument(size)}
      width={u.w}
      height={u.h}
      scrolling="no"
      loading="lazy"
      className="mx-auto block max-w-full border-0"
    />
  );
}

/** Kept for compatibility with older imports; ads no longer wait for consent. */
export function getAdConsent(): boolean {
  return true;
}

export function AdConsentBanner() {
  return null;
}

const ADSENSE_CLIENT = "ca-pub-4079300108937036";

/** Loads Google AdSense (auto ads) once per page view. */
function useAdSense() {
  useEffect(() => {
    if (document.getElementById("adsense-loader")) return;
    const s = document.createElement("script");
    s.id = "adsense-loader";
    s.async = true;
    s.crossOrigin = "anonymous";
    s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
    document.head.appendChild(s);
  }, []);
}

export function AdBanner({ format }: { format: AdFormat }) {
  useAdSense();
  return (
    <aside className="mx-auto my-8 max-w-6xl px-4 text-center" aria-label="Publicitate">
      <p className="mb-1 text-[10px] uppercase tracking-widest text-muted-foreground">
        Publicitate
      </p>
      {format === "box" ? (
        <Frame size="300x250" />
      ) : format === "mobile" ? (
        <Frame size="320x50" />
      ) : (
        <>
          <div className="hidden md:block">
            <Frame size="728x90" />
          </div>
          <div className="md:hidden">
            <Frame size="320x50" />
          </div>
        </>
      )}
    </aside>
  );
}
