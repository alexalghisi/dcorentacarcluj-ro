import { useCallback, useEffect, useRef, useState } from "react";
import { BadgeCheck, CalendarX2, ChevronLeft, ChevronRight, Rotate3d } from "lucide-react";

export interface VehicleGalleryProps {
  images: string[];
  turntable?: string[];
  name: string;
  busy: boolean;
  busyLabel: string;
  rangeLabel: string;
  freeFromLabel: string;
}

/** Max tilt (deg) of a photo while it turns away / towards the viewer. */
const TURN_DEG = 38;
/** Max tilt (deg) for a car with a single photo. */
const SINGLE_MAX = 55;
/** Inertia friction (per second) and spring stiffness for settling. */
const FRICTION = 3.5;
const SPRING = 9;

const smooth = (t: number) => t * t * (3 - 2 * t);
const mod = (a: number, n: number) => ((a % n) + n) % n;

/**
 * Car photo with a smooth simulated 360°: dragging turns the car continuously,
 * blending each photo into the next (multi-photo) or tilting it in 3D (single photo),
 * with inertia on release and a soft settle on the closest angle.
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
  const n = list.length;
  const multi = n > 1;

  // pos: multi → position in photo units (float); single → tilt in degrees
  const [pos, setPos] = useState(0);
  const posRef = useRef(0);
  const velRef = useRef(0);
  const targetRef = useRef<number | null>(0);
  const rafRef = useRef<number | null>(null);
  const lastT = useRef(0);
  const drag = useRef<{ x: number; start: number; id: number; lx: number; lt: number } | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [touched, setTouched] = useState(false);

  const tick = useCallback(
    (t: number) => {
      const dt = Math.min((t - (lastT.current || t)) / 1000, 0.05);
      lastT.current = t;
      let p = posRef.current;
      let v = velRef.current;

      if (!drag.current) {
        if (Math.abs(v) > (multi ? 0.35 : 25)) {
          // inertia
          p += v * dt;
          v *= Math.exp(-FRICTION * dt);
          if (!multi && Math.abs(p) > SINGLE_MAX) {
            p = Math.sign(p) * SINGLE_MAX;
            v = 0;
          }
        } else {
          v = 0;
          const target = targetRef.current ?? (multi ? Math.round(p) : 0);
          targetRef.current = target;
          p += (target - p) * (1 - Math.exp(-SPRING * dt));
          if (Math.abs(target - p) < (multi ? 0.002 : 0.1)) {
            p = target;
            posRef.current = p;
            velRef.current = 0;
            setPos(p);
            rafRef.current = null;
            lastT.current = 0;
            return;
          }
        }
      }
      posRef.current = p;
      velRef.current = v;
      setPos(p);
      rafRef.current = requestAnimationFrame(tick);
    },
    [multi],
  );

  const run = useCallback(() => {
    if (rafRef.current == null) {
      lastT.current = 0;
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [tick]);

  useEffect(() => () => {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
  }, []);

  // Preload every angle so turning never flashes or skips.
  useEffect(() => {
    list.forEach((s) => {
      const img = new Image();
      img.src = s;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list.join("|")]);

  // Gentle demo turn the first time the card is visible.
  useEffect(() => {
    const el = boxRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const timers: number[] = [];
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();
        const seq = multi ? [0.45, -0.3, 0] : [-30, 30, 0];
        seq.forEach((v, i) =>
          timers.push(
            window.setTimeout(() => {
              if (drag.current) return;
              targetRef.current = v;
              run();
            }, 400 + i * 700),
          ),
        );
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [multi, run]);

  function unitsPerPx() {
    const w = boxRef.current?.clientWidth || 320;
    return multi ? 1.6 / w : (SINGLE_MAX * 2.2) / w;
  }

  function onDown(e: React.PointerEvent<HTMLDivElement>) {
    const now = performance.now();
    drag.current = { x: e.clientX, start: posRef.current, id: e.pointerId, lx: e.clientX, lt: now };
    velRef.current = 0;
    targetRef.current = null;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    setDragging(true);
    setTouched(true);
  }
  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const k = unitsPerPx();
    // drag right → car turns towards the next angle
    let p = d.start - (e.clientX - d.x) * k;
    if (!multi) {
      p = d.start + (e.clientX - d.x) * k;
      p = Math.max(-SINGLE_MAX, Math.min(SINGLE_MAX, p));
    }
    const now = performance.now();
    const dtm = Math.max(now - d.lt, 1) / 1000;
    const inst = ((multi ? -1 : 1) * (e.clientX - d.lx) * k) / dtm;
    velRef.current = velRef.current * 0.6 + inst * 0.4;
    d.lx = e.clientX;
    d.lt = now;
    posRef.current = p;
    setPos(p);
  }
  function onUp() {
    if (!drag.current) return;
    if (performance.now() - drag.current.lt > 80) velRef.current = 0;
    drag.current = null;
    setDragging(false);
    targetRef.current = null;
    if (!multi) velRef.current = 0;
    run();
  }
  function nudge(dir: 1 | -1) {
    setTouched(true);
    velRef.current = 0;
    if (multi) {
      targetRef.current = Math.round(posRef.current) + dir;
      run();
    } else {
      targetRef.current = dir * 40;
      run();
      window.setTimeout(() => {
        targetRef.current = 0;
        run();
      }, 650);
    }
  }
  function goTo(i: number) {
    setTouched(true);
    velRef.current = 0;
    const base = Math.round(posRef.current);
    let diff = i - mod(base, n);
    if (diff > n / 2) diff -= n;
    if (diff < -n / 2) diff += n;
    targetRef.current = base + diff;
    run();
  }

  // ---- render maths ----
  const base = Math.floor(pos);
  const f = pos - base;
  const e = smooth(f);
  const iA = multi ? mod(base, n) : 0;
  const iB = multi ? mod(base + 1, n) : 0;
  const active = multi ? mod(Math.round(pos), n) : 0;
  const shadeTilt = multi ? (f < 0.5 ? -f : 1 - f) * TURN_DEG * 2 : pos;

  const frames = multi
    ? [
        {
          src: list[iA],
          key: `a-${iA}`,
          opacity: 1 - e,
          transform: `translateX(${-f * 18}%) rotateY(${-f * TURN_DEG}deg) scale(${1 - f * 0.06})`,
          z: f < 0.5 ? 2 : 1,
        },
        {
          src: list[iB],
          key: `b-${iB}`,
          opacity: e,
          transform: `translateX(${(1 - f) * 18}%) rotateY(${(1 - f) * TURN_DEG}deg) scale(${1 - (1 - f) * 0.06})`,
          z: f < 0.5 ? 1 : 2,
        },
      ]
    : [
        {
          src: list[0] ?? "",
          key: "single",
          opacity: 1,
          transform: `rotateY(${pos}deg) scale(${1 - Math.abs(pos) / 320})`,
          z: 1,
        },
      ];

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
          style={{ perspective: "700px", touchAction: "pan-y", WebkitUserSelect: "none" }}
        >
          {frames.map((fr) =>
            fr.opacity < 0.01 ? null : (
              <img
                key={fr.key}
                src={fr.src}
                alt={`${name} ${busy ? "rezervată" : "disponibilă"} la închiriere în Cluj`}
                width={1200}
                height={900}
                draggable={false}
                decoding="async"
                className={`pointer-events-none absolute inset-x-4 inset-y-3 h-[calc(100%-1.5rem)] w-[calc(100%-2rem)] rounded-lg object-cover shadow-xl ${busy ? "grayscale" : ""}`}
                style={{
                  opacity: fr.opacity,
                  transform: fr.transform,
                  zIndex: fr.z,
                  willChange: "transform, opacity",
                  backfaceVisibility: "hidden",
                }}
              />
            ),
          )}
          {/* soft floor reflection / shadow for depth */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-10 bottom-1 z-0 h-3 rounded-full bg-foreground/20 blur-md"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[3]"
            style={{
              background: `linear-gradient(${shadeTilt > 0 ? 90 : 270}deg, transparent 45%, hsl(0 0% 0% / ${Math.min(Math.abs(shadeTilt) / 140, 0.35)}))`,
            }}
          />
        </div>

        <button
          type="button"
          onClick={() => nudge(-1)}
          aria-label={`Rotește ${name} spre stânga`}
          className="absolute left-1 top-1/2 z-[4] -translate-y-1/2 rounded-full bg-foreground/60 p-1.5 text-background shadow"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => nudge(1)}
          aria-label={`Rotește ${name} spre dreapta`}
          className="absolute right-1 top-1/2 z-[4] -translate-y-1/2 rounded-full bg-foreground/60 p-1.5 text-background shadow"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {busy ? (
          <>
            <span className="pointer-events-none absolute left-3 top-3 z-[4] inline-flex items-center gap-1.5 rounded-full bg-destructive px-3 py-1 text-xs font-bold text-destructive-foreground shadow">
              <CalendarX2 className="h-3.5 w-3.5" /> Rezervată
            </span>
            <div className="pointer-events-none absolute inset-0 z-[5] hidden items-end bg-foreground/75 p-4 text-center opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 sm:flex">
              <p className="w-full text-xs font-semibold leading-relaxed text-background">
                Indisponibilă {rangeLabel}
                <br />
                {busyLabel}
                {freeFromLabel}
              </p>
            </div>
          </>
        ) : (
          <span className="pointer-events-none absolute left-3 top-3 z-[4] inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow">
            <BadgeCheck className="h-3.5 w-3.5" /> Disponibilă
          </span>
        )}

        <span
          className={`pointer-events-none absolute bottom-3 left-3 z-[4] inline-flex items-center gap-1.5 rounded-full bg-foreground/70 px-2.5 py-1 text-[0.7rem] font-semibold text-background transition-opacity ${
            touched ? "opacity-60" : "opacity-100"
          }`}
        >
          <Rotate3d className={`h-3.5 w-3.5 ${touched ? "" : "animate-pulse"}`} />
          360° · trage
        </span>
        {multi && (
          <span className="pointer-events-none absolute bottom-3 right-3 z-[4] rounded-full bg-foreground/70 px-2.5 py-1 text-[0.7rem] font-semibold text-background">
            {active + 1}/{n} foto
          </span>
        )}
      </div>

      {multi && (
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
