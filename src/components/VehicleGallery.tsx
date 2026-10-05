import { useRef, useState } from "react";
import { BadgeCheck, CalendarX2, Rotate3d } from "lucide-react";

export interface VehicleGalleryProps {
  images: string[];
  name: string;
  busy: boolean;
  busyLabel: string;
  rangeLabel: string;
  freeFromLabel: string;
}

/** Degrees of virtual rotation that map to one photo when the car has several angles. */
const SEGMENT = 90;
const PX_TO_DEG = 0.7;

/**
 * Car photo with a simulated 360° drag: dragging tilts the photo in 3D and,
 * when there are several photos, steps through them as the car "turns".
 */
export function VehicleGallery({
  images,
  name,
  busy,
  busyLabel,
  rangeLabel,
  freeFromLabel,
}: VehicleGalleryProps) {
  const list = images.filter(Boolean);
  const count = Math.max(list.length, 1);
  const [rot, setRot] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [touched, setTouched] = useState(false);
  const drag = useRef<{ x: number; start: number; id: number } | null>(null);

  const step = Math.round(rot / SEGMENT);
  const active = ((step % count) + count) % count;
  const offset = rot - step * SEGMENT; // -45..45 within the current photo
  const tilt = list.length > 1 ? offset * 0.6 : Math.max(-35, Math.min(35, rot * 0.5));
  const src = list[active] ?? "";

  function onDown(e: React.PointerEvent<HTMLDivElement>) {
    drag.current = { x: e.clientX, start: rot, id: e.pointerId };
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    setTouched(true);
  }
  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!drag.current || drag.current.id !== e.pointerId) return;
    setRot(drag.current.start + (e.clientX - drag.current.x) * PX_TO_DEG);
  }
  function onUp() {
    if (!drag.current) return;
    drag.current = null;
    setDragging(false);
    // settle on the nearest photo, facing forward
    setRot(list.length > 1 ? Math.round(rot / SEGMENT) * SEGMENT : 0);
  }
  function goTo(i: number) {
    setRot((r) => {
      const base = Math.round(r / SEGMENT);
      const cur = ((base % count) + count) % count;
      return (base + (i - cur)) * SEGMENT;
    });
  }

  return (
    <div>
      <div className="relative overflow-hidden bg-gradient-to-b from-surface to-background">
        <div
          role="img"
          aria-label={`${name} – trage stânga/dreapta pentru a roti mașina 360°`}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          className={`relative h-48 select-none ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
          style={{ perspective: "900px", touchAction: "pan-y" }}
        >
          <img
            src={src}
            alt={`${name} ${busy ? "rezervată" : "disponibilă"} la închiriere în Cluj`}
            width={1200}
            height={900}
            loading="lazy"
            draggable={false}
            className={`h-full w-full object-cover ${busy ? "grayscale" : ""}`}
            style={{
              transform: `rotateY(${tilt}deg) scale(${1 - Math.abs(tilt) / 400})`,
              transition: dragging ? "none" : "transform 450ms cubic-bezier(.2,.8,.2,1)",
              transformStyle: "preserve-3d",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background: `linear-gradient(${tilt > 0 ? 90 : 270}deg, transparent 40%, hsl(0 0% 0% / ${Math.abs(tilt) / 90}))`,
            }}
          />
        </div>

        {busy ? (
          <>
            <span className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-destructive px-3 py-1 text-xs font-bold text-destructive-foreground shadow">
              <CalendarX2 className="h-3.5 w-3.5" /> Rezervată
            </span>
            <div className="pointer-events-none absolute inset-0 hidden items-end bg-foreground/75 p-4 text-center opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 sm:flex">
              <p className="w-full text-xs font-semibold leading-relaxed text-background">
                Indisponibilă {rangeLabel}
                <br />
                {busyLabel}
                {freeFromLabel}
              </p>
            </div>
          </>
        ) : (
          <span className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow">
            <BadgeCheck className="h-3.5 w-3.5" /> Disponibilă
          </span>
        )}

        <span
          className={`pointer-events-none absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-foreground/70 px-2.5 py-1 text-[0.7rem] font-semibold text-background transition-opacity ${
            touched ? "opacity-60" : "opacity-100"
          }`}
        >
          <Rotate3d className={`h-3.5 w-3.5 ${touched ? "" : "animate-pulse"}`} />
          360° · trage
        </span>
        {list.length > 1 && (
          <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-foreground/70 px-2.5 py-1 text-[0.7rem] font-semibold text-background">
            {active + 1}/{list.length} foto
          </span>
        )}
      </div>

      {list.length > 1 && (
        <div className="flex gap-2 overflow-x-auto border-b border-border/60 bg-surface/60 px-3 py-2">
          {list.map((img, i) => (
            <button
              key={img + i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Fotografia ${i + 1} pentru ${name}`}
              aria-current={i === active}
              className={`shrink-0 overflow-hidden rounded-md border-2 transition ${
                i === active ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={img}
                alt={`${name} – fotografia ${i + 1}`}
                loading="lazy"
                className={`h-12 w-16 object-cover ${busy ? "grayscale" : ""}`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
