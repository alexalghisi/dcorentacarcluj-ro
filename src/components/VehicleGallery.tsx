import { useEffect, useRef, useState } from "react";
import { BadgeCheck, CalendarX2, ChevronLeft, ChevronRight, Rotate3d } from "lucide-react";

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
  const rotRef = useRef(0);
  const [dragging, setDragging] = useState(false);
  const [touched, setTouched] = useState(false);
  const drag = useRef<{ x: number; start: number; id: number } | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const setR = (v: number) => {
    rotRef.current = v;
    setRot(v);
  };

  // Show the effect once when the card scrolls into view, so visitors see it works.
  useEffect(() => {
    const el = boxRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    let timers: number[] = [];
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();
        const seq = list.length > 1 ? [-40, 40, 0] : [-55, 55, 0];
        seq.forEach((v, i) =>
          timers.push(window.setTimeout(() => !drag.current && setR(v), 300 + i * 550)),
        );
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
      timers = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const step = Math.round(rot / SEGMENT);
  const active = ((step % count) + count) % count;
  const offset = rot - step * SEGMENT; // -45..45 within the current photo
  const tilt = list.length > 1 ? offset * 1.1 : Math.max(-60, Math.min(60, rot));
  const src = list[active] ?? "";

  function onDown(e: React.PointerEvent<HTMLDivElement>) {
    drag.current = { x: e.clientX, start: rotRef.current, id: e.pointerId };
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    setDragging(true);
    setTouched(true);
  }
  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!drag.current || drag.current.id !== e.pointerId) return;
    setR(drag.current.start + (e.clientX - drag.current.x) * PX_TO_DEG);
  }
  function onUp() {
    if (!drag.current) return;
    drag.current = null;
    setDragging(false);
    const r = rotRef.current;
    setR(list.length > 1 ? Math.round(r / SEGMENT) * SEGMENT : 0);
  }
  function nudge(dir: 1 | -1) {
    setTouched(true);
    if (list.length > 1) {
      setR((Math.round(rotRef.current / SEGMENT) + dir) * SEGMENT);
    } else {
      setR(dir * 50);
      window.setTimeout(() => setR(0), 600);
    }
  }
  function goTo(i: number) {
    const base = Math.round(rotRef.current / SEGMENT);
    const cur = ((base % count) + count) % count;
    setR((base + (i - cur)) * SEGMENT);
  }

  return (
    <div>
      <div className="relative overflow-hidden bg-gradient-to-b from-surface to-background">
        <div
          ref={boxRef}
          role="img"
          aria-label={`${name} – trage stânga/dreapta pentru a roti mașina 360°`}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          onLostPointerCapture={onUp}
          className={`relative h-56 select-none ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
          style={{ perspective: "600px", touchAction: "pan-y", WebkitUserSelect: "none" }}
        >
          <img
            src={src}
            alt={`${name} ${busy ? "rezervată" : "disponibilă"} la închiriere în Cluj`}
            width={1200}
            height={900}
            loading="lazy"
            draggable={false}
            className={`pointer-events-none absolute inset-x-4 inset-y-3 h-[calc(100%-1.5rem)] w-[calc(100%-2rem)] rounded-lg object-cover shadow-xl ${busy ? "grayscale" : ""}`}
            style={{
              transform: `rotateY(${tilt}deg) scale(${1 - Math.abs(tilt) / 300})`,
              transition: dragging ? "none" : "transform 500ms cubic-bezier(.2,.8,.2,1)",
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background: `linear-gradient(${tilt > 0 ? 90 : 270}deg, transparent 40%, hsl(0 0% 0% / ${Math.abs(tilt) / 120}))`,
            }}
          />
        </div>
        <button
          type="button"
          onClick={() => nudge(-1)}
          aria-label={`Rotește ${name} spre stânga`}
          className="absolute left-1 top-1/2 -translate-y-1/2 rounded-full bg-foreground/60 p-1.5 text-background shadow"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => nudge(1)}
          aria-label={`Rotește ${name} spre dreapta`}
          className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-foreground/60 p-1.5 text-background shadow"
        >
          <ChevronRight className="h-5 w-5" />
        </button>


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
