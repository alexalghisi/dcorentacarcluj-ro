import { useEffect, useRef, useState } from "react";

const UNITS = {
  leaderboard: { key: "420bec8420ceb6dcf93ad0c873b010eb", width: 728, height: 90 },
  box: { key: "ab9100a85f77f2acafea9f09e17594b4", width: 300, height: 250 },
  mobile: { key: "ac44df6e484d23de0b5037682810d054", width: 320, height: 50 },
} as const;

export type AdFormat = keyof typeof UNITS;

const CONSENT_KEY = "ad-consent";

export function getAdConsent(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(CONSENT_KEY) === "accepted";
}

export function AdConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(window.localStorage.getItem(CONSENT_KEY) === null);
  }, []);

  if (!visible) return null;

  const decide = (accepted: boolean) => {
    window.localStorage.setItem(CONSENT_KEY, accepted ? "accepted" : "refused");
    setVisible(false);
    window.dispatchEvent(new Event("ad-consent-changed"));
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card p-4 shadow-lg">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
        <p className="flex-1 text-sm text-muted-foreground">
          Folosim reclame de la parteneri pentru a susține site-ul. Acceptați afișarea reclamelor?
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => decide(true)}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Accept
          </button>
          <button
            type="button"
            onClick={() => decide(false)}
            className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground"
          >
            Refuz
          </button>
        </div>
      </div>
    </div>
  );
}

export function AdBanner({ format }: { format: AdFormat }) {
  const ref = useRef<HTMLDivElement>(null);
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    const update = () => setConsented(getAdConsent());
    update();
    window.addEventListener("ad-consent-changed", update);
    return () => window.removeEventListener("ad-consent-changed", update);
  }, []);

  useEffect(() => {
    if (!consented || !ref.current) return;
    const unit = UNITS[format];
    const container = ref.current;
    container.innerHTML = "";
    const conf = document.createElement("script");
    conf.innerHTML = `atOptions = { 'key' : '${unit.key}', 'format' : 'iframe', 'height' : ${unit.height}, 'width' : ${unit.width}, 'params' : {} };`;
    const invoke = document.createElement("script");
    invoke.src = `https://pl31755961.profitableratecpmnetwork.com/${unit.key}/invoke.js`;
    invoke.async = true;
    container.appendChild(conf);
    container.appendChild(invoke);
  }, [consented, format]);

  if (!consented) return null;

  const unit = UNITS[format];
  return (
    <div className="my-8 flex justify-center" aria-label="Reclamă">
      <div ref={ref} style={{ width: unit.width, height: unit.height, maxWidth: "100%" }} />
    </div>
  );
}
