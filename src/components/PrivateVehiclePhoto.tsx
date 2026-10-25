import { useEffect, useRef, useState } from "react";
import { ImageOff } from "lucide-react";
import { plateRegions } from "@/lib/vehicle-photo-privacy";

/**
 * Blur one region of the canvas so a plate stays unreadable on every browser.
 * The region is shrunk to a few pixels and scaled back up with smoothing, which
 * gives a strong, natural-looking blur without relying on ctx.filter (missing in Safari).
 */
function blurRegion(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  if (w < 2 || h < 2) return;
  const pad = Math.round(Math.max(w, h) * 0.08);
  const rx = Math.max(0, x - pad), ry = Math.max(0, y - pad);
  const rw = Math.min(ctx.canvas.width - rx, w + pad * 2), rh = Math.min(ctx.canvas.height - ry, h + pad * 2);
  const small = document.createElement("canvas");
  small.width = Math.max(2, Math.round(rw / 14));
  small.height = Math.max(2, Math.round(rh / 14));
  const s = small.getContext("2d");
  if (!s) { ctx.fillRect(rx, ry, rw, rh); return; }
  s.imageSmoothingEnabled = true;
  s.imageSmoothingQuality = "high";
  // Two shrink passes average the plate characters away completely.
  s.drawImage(ctx.canvas, rx, ry, rw, rh, 0, 0, small.width, small.height);
  const tiny = document.createElement("canvas");
  tiny.width = Math.max(1, Math.round(small.width / 2));
  tiny.height = Math.max(1, Math.round(small.height / 2));
  tiny.getContext("2d")?.drawImage(small, 0, 0, tiny.width, tiny.height);
  ctx.save();
  ctx.beginPath();
  const r = Math.min(rw, rh) * 0.25;
  if (typeof ctx.roundRect === "function") ctx.roundRect(rx, ry, rw, rh, r);
  else ctx.rect(rx, ry, rw, rh);
  ctx.clip();
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(tiny, 0, 0, tiny.width, tiny.height, rx, ry, rw, rh);
  ctx.restore();
}

/** Paint the source and its privacy blur together; never expose an unmasked loading frame. */
export function PrivateVehiclePhoto({ src, alt, className = "", fit = "contain" }: {
  src: string; alt: string; className?: string; fit?: "contain" | "cover";
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);
  // Fetch the photo only when it gets near the viewport, so off-screen cards cost nothing.
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = canvas.current;
    if (!el || near) return;
    if (typeof IntersectionObserver === "undefined") { setNear(true); return; }
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) { setNear(true); observer.disconnect(); }
    }, { rootMargin: "300px" });
    observer.observe(el);
    return () => observer.disconnect();
  }, [near]);
  useEffect(() => {
    const el = canvas.current;
    if (!el || !near) return;
    const ctx = el.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, el.width, el.height);
    setFailed(false);
    let cancelled = false;
    const photo = new Image();
    photo.decoding = "async";
    photo.onload = () => {
      if (cancelled) return;
      const masks = plateRegions(src);
      // Unreviewed future uploads are not exposed until their plate regions are checked.
      if (!masks) { setFailed(true); return; }
      el.width = photo.naturalWidth;
      el.height = photo.naturalHeight;
      ctx.drawImage(photo, 0, 0);
      for (const [x, y, w, h] of masks) {
        blurRegion(ctx, x * el.width, y * el.height, w * el.width, h * el.height);
      }
    };
    photo.onerror = () => { if (!cancelled) setFailed(true); };
    photo.src = src;
    return () => { cancelled = true; photo.onload = null; photo.onerror = null; };
  }, [src, near]);
  return (
    <div className={`relative overflow-hidden bg-surface ${className}`}>
      <canvas ref={canvas} role="img" aria-label={alt}
        className={`h-full w-full ${fit === "cover" ? "object-cover" : "object-contain"} text-foreground`} />
      {failed && <div className="absolute inset-0 flex items-center justify-center bg-surface text-muted-foreground">
        <ImageOff className="h-6 w-6" aria-label="Fotografie indisponibilă" />
      </div>}
    </div>
  );
}
