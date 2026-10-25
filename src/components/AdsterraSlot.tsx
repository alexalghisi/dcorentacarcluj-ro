import { useEffect, useId, useRef, useState } from "react";
import { adsterraDocument, adsterraUnit } from "@/lib/advertising";

/** External ad code runs in an opaque-origin sandbox, never in the app document. */
export function AdsterraSlot({ placement }: { placement: string }) {
  const id = useId();
  const sentinel = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const [unit, setUnit] = useState<ReturnType<typeof adsterraUnit> | null>(null);
  const [nearby, setNearby] = useState(false);
  const [filled, setFilled] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const update = () => { setUnit(adsterraUnit(window.innerWidth)); setFilled(false); setFailed(false); };
    const desktop = window.matchMedia("(min-width: 768px)");
    const tablet = window.matchMedia("(min-width: 400px)");
    update();
    desktop.addEventListener("change", update);
    tablet.addEventListener("change", update);
    return () => { desktop.removeEventListener("change", update); tablet.removeEventListener("change", update); };
  }, []);

  useEffect(() => {
    const target = sentinel.current;
    if (!target) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) { setNearby(true); observer.disconnect(); }
    }, { rootMargin: "200px" });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!nearby || !unit) return;
    const receive = (event: MessageEvent) => {
      if (event.source !== frame.current?.contentWindow || event.data?.type !== "adsterra-fill" || event.data?.id !== id) return;
      if (event.data.filled === true) { setFilled(true); setFailed(false); }
      if (event.data.filled === false) { setFilled(false); setFailed(true); }
    };
    window.addEventListener("message", receive);
    const timeout = window.setTimeout(() => setFailed((previous) => previous || !frame.current?.dataset['filled']), 18000);
    return () => { window.removeEventListener("message", receive); window.clearTimeout(timeout); };
  }, [nearby, unit, id]);

  return (
    <div ref={sentinel} data-ad-placement={placement} className="relative w-full">
      <div className="absolute top-0 h-px w-px" aria-hidden="true" />
      <div className={filled && !failed ? "flex flex-col items-center gap-2 py-6" : "h-0 overflow-hidden"}>
        {filled && !failed && <span className="text-xs text-muted-foreground">Publicitate</span>}
        {nearby && unit && !failed && (
          <iframe
            key={unit.key}
            ref={frame}
            data-filled={filled ? "true" : undefined}
            title={`Publicitate — ${placement}`}
            srcDoc={adsterraDocument(unit, id)}
            sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            width={unit.width}
            height={unit.height}
            className="max-w-full shrink-0 border-0"
          />
        )}
      </div>
    </div>
  );
}