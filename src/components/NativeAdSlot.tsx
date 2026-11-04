import { useEffect, useId, useRef, useState } from "react";
import { nativeBannerDocument } from "@/lib/advertising";
import { afterPageIdle } from "@/lib/idle";

/**
 * Adsterra Native Banner in an opaque-origin sandbox (ad code never touches the app
 * document). Lazy: waits for page idle and for the slot to come near the viewport.
 * Collapses to zero height when no ad fills.
 */
export function NativeAdSlot({ placement }: { placement: string }) {
  const id = useId();
  const sentinel = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const [idle, setIdle] = useState(false);
  const [nearby, setNearby] = useState(false);
  const [height, setHeight] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => afterPageIdle(() => setIdle(true)), []);

  useEffect(() => {
    const target = sentinel.current;
    if (!target || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNearby(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!idle || !nearby) return;
    const receive = (event: MessageEvent) => {
      if (event.source !== frame.current?.contentWindow) return;
      const data = event.data as { type?: string; id?: string; filled?: boolean; height?: number };
      if (data?.type !== "adsterra-native" || data.id !== id) return;
      if (data.filled === true && typeof data.height === "number") {
        setHeight(Math.min(Math.max(data.height, 60), 900));
        setFailed(false);
      }
      if (data.filled === false) setFailed(true);
    };
    window.addEventListener("message", receive);
    return () => window.removeEventListener("message", receive);
  }, [idle, nearby, id]);

  const visible = height > 0 && !failed;
  return (
    <div ref={sentinel} data-ad-placement={placement} className="mx-auto w-full max-w-4xl px-4">
      <div className={visible ? "py-6" : "h-0 overflow-hidden"}>
        {visible && (
          <p className="mb-1 text-center text-[10px] uppercase tracking-widest text-muted-foreground">
            Publicitate
          </p>
        )}
        {idle && nearby && !failed && (
          <iframe
            ref={frame}
            title={`Publicitate — ${placement}`}
            srcDoc={nativeBannerDocument(id)}
            sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox allow-same-origin"
            referrerPolicy="strict-origin-when-cross-origin"
            className="block w-full border-0"
            style={{ height: visible ? height : 1 }}
          />
        )}
      </div>
    </div>
  );
}
