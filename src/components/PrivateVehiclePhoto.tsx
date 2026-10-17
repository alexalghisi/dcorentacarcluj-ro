import { useEffect, useRef, useState } from "react";
import { ImageOff } from "lucide-react";
import { plateRegions } from "@/lib/vehicle-photo-privacy";

/** Paint the source and its privacy masks together; never expose an unmasked loading frame. */
export function PrivateVehiclePhoto({ src, alt, className = "" }: {
  src: string; alt: string; className?: string;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
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
      ctx.fillStyle = getComputedStyle(el).color;
      for (const [x, y, w, h] of masks) {
        ctx.fillRect(x * el.width, y * el.height, w * el.width, h * el.height);
      }
    };
    photo.onerror = () => { if (!cancelled) setFailed(true); };
    photo.src = src;
    return () => { cancelled = true; photo.onload = null; photo.onerror = null; };
  }, [src]);
  return (
    <div className={`relative overflow-hidden bg-surface ${className}`}>
      <canvas ref={canvas} role="img" aria-label={alt}
        className="h-full w-full object-contain text-foreground" />
      {failed && <div className="absolute inset-0 flex items-center justify-center bg-surface text-muted-foreground">
        <ImageOff className="h-6 w-6" aria-label="Fotografie indisponibilă" />
      </div>}
    </div>
  );
}