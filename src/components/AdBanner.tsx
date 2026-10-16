import { useEffect, useRef } from "react";

/**
 * Banner de monetizare (rețea CPM). Formatele sunt cele generate în contul
 * rețelei pentru dcorentacarcluj.ro — cheile NU se schimbă.
 * Popunder/SocialBar/Smartlink nu sunt folosite intenționat: strică
 * experiența vizitatorilor și pot afecta SEO-ul.
 */
const UNITS = {
  leaderboard: { key: "420bec8420ceb6dcf93ad0c873b010eb", width: 728, height: 90 },
  box: { key: "ab9100a85f77f2acafea9f09e17594b4", width: 300, height: 250 },
  mobile: { key: "ac44df6e484d23de0b5037682810d054", width: 320, height: 50 },
} as const;

export type AdFormat = keyof typeof UNITS;

/** Pauză temporară cât timp Google verifică site-ul pentru AdSense. Pune `false` ca să reactivezi. */
const ADS_PAUSED = true;

export function AdBanner(props: { format: AdFormat; className?: string }) {
  if (ADS_PAUSED) return null;
  return <AdBannerInner {...props} />;
}

function AdBannerInner({ format, className = "" }: { format: AdFormat; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const unit = UNITS[format];


  useEffect(() => {
    const el = host.current;
    if (!el) return;
    el.innerHTML = "";
    const opts = document.createElement("script");
    opts.text = `atOptions = { 'key': '${unit.key}', 'format': 'iframe', 'height': ${unit.height}, 'width': ${unit.width}, 'params': {} };`;
    const invoke = document.createElement("script");
    invoke.src = `https://pl31755961.profitableratecpmnetwork.com/${unit.key}/invoke.js`;
    invoke.async = true;
    el.appendChild(opts);
    el.appendChild(invoke);
    return () => {
      el.innerHTML = "";
    };
  }, [unit.key, unit.width, unit.height]);

  return (
    <div className={`flex justify-center ${className}`} aria-label="Publicitate">
      <div
        ref={host}
        className="max-w-full overflow-hidden"
        style={{ width: unit.width, height: unit.height }}
      />
    </div>
  );
}
