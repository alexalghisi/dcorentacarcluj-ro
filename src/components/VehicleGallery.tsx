import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { BadgeCheck, CalendarX2, ChevronLeft, ChevronRight, Images, Rotate3d } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PrivateVehiclePhoto } from "@/components/PrivateVehiclePhoto";
import { wrapPhoto } from "@/lib/vehicle-photo-privacy";

export interface VehicleGalleryProps {
  images: string[];
  name: string;
  busy: boolean;
  busyLabel: string;
  rangeLabel: string;
  freeFromLabel: string;
}

/** Pixels of horizontal drag that turn the view by one photo. */
const STEP_PX = 140;
/** Maximum tilt (degrees) of a photo while it is being turned. */
const MAX_TILT = 38;
/** Tilt range when there is a single photo: the car "leans" but never fakes a new side. */
const SINGLE_TILT = 18;

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Interactive 3D viewer built only from real photographs.
 *
 * Drag with a finger or the mouse: the car turns in perspective and, when there
 * are several photos, rotates into the next real angle. Nothing is generated or
 * morphed, so the renter sees the actual car. Plates are blurred by PrivateVehiclePhoto.
 */
export function VehicleGallery({ images, name, busy, busyLabel, rangeLabel, freeFromLabel }: VehicleGalleryProps) {
  const photos = [...new Set(images.filter(Boolean))];
  const count = photos.length;
  const multi = count > 1;

  /** Continuous position: integer = a photo facing the viewer, fraction = mid-turn. */
  const [pos, setPos] = useState(0);
  const posRef = useRef(0);
  const drag = useRef<{ id: number; x: number; start: number; lastX: number; lastT: number; v: number } | null>(null);
  const anim = useRef<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const [hinted, setHinted] = useState(false);

  const set = useCallback((value: number) => {
    posRef.current = value;
    setPos(value);
  }, []);

  const stop = () => {
    if (anim.current !== null) cancelAnimationFrame(anim.current);
    anim.current = null;
  };

  /** Spring the position to `target` (an integer for several photos, 0 for one). */
  const settle = useCallback((target: number, velocity = 0) => {
    stop();
    if (prefersReducedMotion()) { set(target); return; }
    let v = velocity;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.032, (now - last) / 1000);
      last = now;
      const x = posRef.current;
      // Critically damped spring towards the target.
      const k = 90, c = 19;
      v += (-k * (x - target) - c * v) * dt;
      const next = x + v * dt;
      if (Math.abs(next - target) < 0.001 && Math.abs(v) < 0.01) { set(target); anim.current = null; return; }
      set(next);
      anim.current = requestAnimationFrame(tick);
    };
    anim.current = requestAnimationFrame(tick);
  }, [set]);

  useEffect(() => () => stop(), []);

  const go = (direction: number) => settle(Math.round(posRef.current) + direction);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (count === 0) return;
    stop();
    drag.current = { id: e.pointerId, x: e.clientX, start: posRef.current, lastX: e.clientX, lastT: performance.now(), v: 0 };
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    setHinted(true);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const now = performance.now();
    const dx = e.clientX - d.x;
    if (multi) {
      set(d.start - dx / STEP_PX);
    } else {
      // One photo: lean with resistance, capped, then spring back.
      const t = Math.max(-1, Math.min(1, -dx / (STEP_PX * 1.5)));
      set(t);
    }
    const dt = Math.max(1, now - d.lastT);
    d.v = (-(e.clientX - d.lastX) / STEP_PX) / (dt / 1000);
    d.lastX = e.clientX;
    d.lastT = now;
  };

  const end = () => {
    const d = drag.current;
    drag.current = null;
    setDragging(false);
    if (!d) return;
    if (!multi) { settle(0, d.v); return; }
    // Inertia: a flick carries the turn to the next photos.
    const projected = posRef.current + Math.max(-2, Math.min(2, d.v * 0.18));
    settle(Math.round(projected), d.v);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!multi) return;
    if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
  };

  const frac = pos - Math.floor(pos);
  const active = wrapPhoto(Math.round(pos), count);

  /** Signed distance from the current view to photo `i`, wrapped around the turntable. */
  const offsetOf = (i: number) => {
    let o = i - pos;
    if (multi) o = ((o % count) + count + count / 2) % count - count / 2;
    return o;
  };

  /**
   * Every real photo stays mounted (no reload flashes); only the one facing the
   * viewer and its neighbour mid-turn are visible.
   */
  const layer = (i: number) => {
    const o = multi ? offsetOf(i) : 0;
    const tilt = multi ? o * MAX_TILT : -pos * SINGLE_TILT;
    const shift = multi ? o * 42 : -pos * 6;
    const visible = multi ? Math.max(0, 1 - Math.abs(o)) : 1;
    return (
      <div
        key={photos[i]}
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `translateX(${shift}%) rotateY(${tilt}deg) scale(${1 - Math.min(1, Math.abs(multi ? o : pos)) * 0.06})`,
          opacity: visible,
          visibility: visible > 0.001 ? "visible" : "hidden",
          zIndex: Math.round(visible * 10),
          backfaceVisibility: "hidden",
        }}
      >
        <PrivateVehiclePhoto
          src={photos[i] ?? ""}
          alt={`${name} – fotografia reală ${i + 1}, număr de înmatriculare blurat`}
          className={`h-full w-full ${busy ? "grayscale" : ""}`}
        />
      </div>
    );
  };

  const shadowShift = (multi ? (frac > 0.5 ? frac - 1 : frac) : pos) * -18;

  return <div>
    <div className="relative overflow-hidden bg-surface">
      <div
        role="group"
        tabIndex={0}
        aria-roledescription="vizualizare 3D"
        aria-label={`${name} – rotește cu degetul sau cu mouse-ul (fotografii reale)`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={end}
        onPointerCancel={end}
        onLostPointerCapture={end}
        onKeyDown={onKeyDown}
        className={`relative h-56 touch-pan-y select-none outline-none focus-visible:ring-2 focus-visible:ring-primary ${count ? (dragging ? "cursor-grabbing" : "cursor-grab") : ""}`}
        style={{ perspective: "900px" }}
      >
        {/* Soft ground shadow that slides opposite the turn, selling the depth. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-3 left-1/2 h-5 w-3/4 rounded-[50%] bg-foreground/15 blur-md"
          style={{ transform: `translateX(calc(-50% + ${shadowShift}%))` }}
        />
        <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
          {photos.map((_, i) => layer(i))}
        </div>
      </div>
      {multi && <>
        <Button type="button" size="icon" variant="secondary" onClick={() => go(-1)}
          aria-label={`Rotește spre fotografia anterioară pentru ${name}`} title="Rotește la stânga"
          className="absolute left-2 top-1/2 z-20 -translate-y-1/2">
          <ChevronLeft />
        </Button>
        <Button type="button" size="icon" variant="secondary" onClick={() => go(1)}
          aria-label={`Rotește spre fotografia următoare pentru ${name}`} title="Rotește la dreapta"
          className="absolute right-2 top-1/2 z-20 -translate-y-1/2">
          <ChevronRight />
        </Button>
      </>}
      <span className={`pointer-events-none absolute left-3 top-3 z-20 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold shadow ${busy ? "bg-destructive text-destructive-foreground" : "bg-primary text-primary-foreground"}`}>
        {busy ? <CalendarX2 className="h-3.5 w-3.5" /> : <BadgeCheck className="h-3.5 w-3.5" />}
        {busy ? "Rezervată" : "Disponibilă"}
      </span>
      <span className="pointer-events-none absolute bottom-3 left-3 z-20 inline-flex items-center gap-1.5 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold text-foreground">
        <Images className="h-3.5 w-3.5" /> Fotografii reale
      </span>
      {count > 0 && !hinted && <span className="pointer-events-none absolute right-3 top-3 z-20 inline-flex items-center gap-1.5 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold text-foreground">
        <Rotate3d className="h-3.5 w-3.5" /> Trage pentru 3D
      </span>}
      {multi && <span className="pointer-events-none absolute bottom-3 right-3 z-20 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold text-foreground">
        {active + 1}/{count}
      </span>}
    </div>
    {busy && <p className="border-t border-border px-3 py-2 text-xs text-muted-foreground">
      Indisponibilă {rangeLabel} · {busyLabel}{freeFromLabel}
    </p>}
    {multi && <div className="flex gap-2 overflow-x-auto border-b border-border bg-surface px-3 py-2">
      {photos.map((src, i) => <Button key={src} type="button" variant="ghost"
        onClick={() => settle(Math.round(posRef.current) + ((i - active + count + Math.floor(count / 2)) % count) - Math.floor(count / 2))}
        aria-label={`Fotografia ${i + 1} pentru ${name}`} aria-current={i === active}
        className={`h-14 w-20 shrink-0 overflow-hidden border-2 p-0 ${i === active ? "border-primary" : "border-transparent"}`}>
        <PrivateVehiclePhoto src={src} alt={`${name} – fotografia ${i + 1}`} className="h-full w-full" />
      </Button>)}
    </div>}
  </div>;
}
