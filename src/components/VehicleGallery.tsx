import { useRef, useState } from "react";
import { BadgeCheck, CalendarX2, ChevronLeft, ChevronRight, Images, Rotate3d } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PrivateVehiclePhoto } from "@/components/PrivateVehiclePhoto";
import { Vehicle360 } from "@/components/Vehicle360";
import { wrapPhoto } from "@/lib/vehicle-photo-privacy";
import { vehicle360Frames } from "@/lib/vehicle-turntables";

export interface VehicleGalleryProps {
  images: string[];
  name: string;
  busy: boolean;
  busyLabel: string;
  rangeLabel: string;
  freeFromLabel: string;
}

/**
 * Studio 360° view (when this exact unit has one) plus the real photographs, one tap apart.
 * The 360° view is matched by vehicle name only, never by uploaded file names.
 */
export function VehicleGallery({ images, name, busy, busyLabel, rangeLabel, freeFromLabel }: VehicleGalleryProps) {
  const photos = [...new Set(images.filter(Boolean))];
  const [spinFrames] = useState(() => vehicle360Frames(name));
  const has360 = spinFrames.length > 0;
  const [mode, setMode] = useState<"360" | "photos">(has360 ? "360" : "photos");
  const show360 = has360 && mode === "360";
  const [index, setIndex] = useState(0);
  const drag = useRef<{ id: number; x: number; moved: boolean } | null>(null);
  const active = wrapPhoto(index, photos.length);
  const navigate = (direction: number) => setIndex(current => wrapPhoto(current + direction, photos.length));

  return <div>
    <div className="relative overflow-hidden bg-surface">
      {show360 ? <Vehicle360 frames={spinFrames} alt={name}
        className={`h-56 w-full ${busy ? "grayscale" : ""}`} /> : <>
      <div
        aria-label={`${name} – fotografii reale`}
        onPointerDown={e => {
          if (photos.length < 2) return;
          drag.current = { id: e.pointerId, x: e.clientX, moved: false };
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={e => {
          const start = drag.current;
          if (!start || start.id !== e.pointerId || start.moved) return;
          const distance = e.clientX - start.x;
          if (Math.abs(distance) < 45) return;
          start.moved = true;
          navigate(distance < 0 ? 1 : -1);
        }}
        onPointerUp={() => { drag.current = null; }}
        onPointerCancel={() => { drag.current = null; }}
        onLostPointerCapture={() => { drag.current = null; }}
        className={`relative h-56 touch-pan-y select-none ${photos.length > 1 ? "cursor-grab active:cursor-grabbing" : ""}`}
      >
        <PrivateVehiclePhoto src={photos[active] ?? ""}
          alt={`${name} – fotografia reală ${active + 1}, număr de înmatriculare ascuns`}
          className={`h-full w-full ${busy ? "grayscale" : ""}`} />
      </div>
      {photos.length > 1 && <>
        <Button type="button" size="icon" variant="secondary" onClick={() => navigate(-1)}
          aria-label={`Fotografia anterioară pentru ${name}`} title="Fotografia anterioară"
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2">
          <ChevronLeft />
        </Button>
        <Button type="button" size="icon" variant="secondary" onClick={() => navigate(1)}
          aria-label={`Fotografia următoare pentru ${name}`} title="Fotografia următoare"
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2">
          <ChevronRight />
        </Button>
      </>}
      <span className={`pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold shadow ${busy ? "bg-destructive text-destructive-foreground" : "bg-primary text-primary-foreground"}`}>
        {busy ? <CalendarX2 className="h-3.5 w-3.5" /> : <BadgeCheck className="h-3.5 w-3.5" />}
        {busy ? "Rezervată" : "Disponibilă"}
      </span>
      <span className="pointer-events-none absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold text-foreground">
        <Images className="h-3.5 w-3.5" /> Fotografii reale
      </span>
      {photos.length > 1 && <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold text-foreground">
        {active + 1}/{photos.length}
      </span>}
      </>}
      {show360 && <span className={`pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold shadow ${busy ? "bg-destructive text-destructive-foreground" : "bg-primary text-primary-foreground"}`}>
        {busy ? <CalendarX2 className="h-3.5 w-3.5" /> : <BadgeCheck className="h-3.5 w-3.5" />}
        {busy ? "Rezervată" : "Disponibilă"}
      </span>}
      {has360 && <div role="group" aria-label={`Mod de vizualizare pentru ${name}`}
        className="absolute right-2 top-2 z-10 inline-flex rounded-full bg-background/90 p-0.5 text-xs font-semibold shadow">
        <button type="button" onClick={() => setMode("360")} aria-pressed={show360} title="Rotește mașina 360°"
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 ${show360 ? "bg-primary text-primary-foreground" : "text-foreground"}`}>
          <Rotate3d className="h-3.5 w-3.5" /> 360°
        </button>
        <button type="button" onClick={() => setMode("photos")} aria-pressed={!show360} title="Fotografii reale"
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 ${!show360 ? "bg-primary text-primary-foreground" : "text-foreground"}`}>
          <Images className="h-3.5 w-3.5" /><span className="sr-only">Fotografii reale</span>
        </button>
      </div>}
    </div>
    {busy && <p className="border-t border-border px-3 py-2 text-xs text-muted-foreground">
      Indisponibilă {rangeLabel} · {busyLabel}{freeFromLabel}
    </p>}
    {photos.length > 1 && <div className="flex gap-2 overflow-x-auto border-b border-border bg-surface px-3 py-2">
      {photos.map((src, i) => <Button key={src} type="button" variant="ghost"
        onClick={() => { setIndex(i); setMode("photos"); }} aria-label={`Fotografia ${i + 1} pentru ${name}`} aria-current={!show360 && i === active}
        className={`h-14 w-20 shrink-0 overflow-hidden border-2 p-0 ${!show360 && i === active ? "border-primary" : "border-transparent"}`}>
        <PrivateVehiclePhoto src={src} alt={`${name} – fotografia ${i + 1}`} className="h-full w-full" />
      </Button>)}
    </div>}
  </div>;
}
