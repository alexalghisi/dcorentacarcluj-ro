import { useEffect, useRef, useState } from "react";
import { Hand, RotateCw } from "lucide-react";

/** Pixels of horizontal drag that turn the car by one full revolution. */
const DRAG_PER_TURN = 900;
/** Revolutions per second while the car turns on its own. */
const AUTO_SPEED = 1 / 18;

/**
 * Turntable viewer: the visitor turns the car with a finger or the mouse.
 * Frames are evenly spaced around the car; between two neighbours the viewer
 * cross-fades only near the midpoint, so each angle stays sharp.
 */
export function Vehicle360({ frames, alt, className = "" }: {
  frames: string[];
  alt: string;
  className?: string;
}) {
  const n = frames.length;
  const canvas = useRef<HTMLCanvasElement>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(0);
  const [touched, setTouched] = useState(false);
  const st = useRef({
    pos: 0, vel: 0, dragging: false, pointer: -1, lastX: 0, lastT: 0,
    visible: false, auto: true, reduced: false, drawn: -1, raf: 0, prev: 0,
  });

  // Load every angle; the first one paints as soon as it arrives.
  useEffect(() => {
    let cancelled = false;
    setLoaded(0);
    images.current = frames.map((src) => {
      const im = new Image();
      im.decoding = "async";
      im.onload = () => { if (!cancelled) { st.current.drawn = -1; setLoaded((c) => c + 1); } };
      im.src = src;
      return im;
    });
    return () => { cancelled = true; };
  }, [frames]);

  useEffect(() => {
    const el = canvas.current;
    if (!el || n === 0) return;
    const s = st.current;
    s.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(([e]) => { s.visible = !!e?.isIntersecting; }, { threshold: 0.2 });
    io.observe(el);

    const ready = (im?: HTMLImageElement) => !!im && im.complete && im.naturalWidth > 0;
    const draw = () => {
      const ctx = el.getContext("2d");
      if (!ctx) return;
      const rect = el.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(rect.width * dpr));
      const h = Math.max(1, Math.round(rect.height * dpr));
      if (el.width !== w || el.height !== h) { el.width = w; el.height = h; s.drawn = -1; }
      const p = ((s.pos % 1) + 1) % 1 * n;
      if (Math.abs(p - s.drawn) < 0.002) return;
      s.drawn = p;
      const i = Math.floor(p) % n;
      const j = (i + 1) % n;
      const f = p - Math.floor(p);
      // Hold each angle, blend only through the middle of the step.
      const t = Math.min(1, Math.max(0, (f - 0.3) / 0.4));
      const mix = t * t * (3 - 2 * t);
      const paint = (im: HTMLImageElement, alpha: number) => {
        const scale = Math.max(w / im.naturalWidth, h / im.naturalHeight);
        const dw = im.naturalWidth * scale;
        const dh = im.naturalHeight * scale;
        ctx.globalAlpha = alpha;
        ctx.drawImage(im, (w - dw) / 2, (h - dh) / 2, dw, dh);
      };
      const a = images.current[i];
      const b = images.current[j];
      if (!ready(a)) { s.drawn = -1; return; }
      ctx.globalAlpha = 1;
      paint(a!, 1);
      if (mix > 0 && ready(b)) paint(b!, mix);
      ctx.globalAlpha = 1;
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - (s.prev || now)) / 1000);
      s.prev = now;
      if (!s.dragging) {
        if (Math.abs(s.vel) > 0.002) {
          s.pos += s.vel * dt;
          s.vel *= Math.pow(0.04, dt);
        } else if (s.auto && s.visible && !s.reduced) {
          s.pos += AUTO_SPEED * dt;
        }
      }
      draw();
      s.raf = requestAnimationFrame(tick);
    };
    s.raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(s.raf); io.disconnect(); };
  }, [n]);

  const onDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const s = st.current;
    s.dragging = true; s.pointer = e.pointerId; s.auto = false; s.vel = 0;
    s.lastX = e.clientX; s.lastT = performance.now();
    e.currentTarget.setPointerCapture(e.pointerId);
    setTouched(true);
  };
  const onMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const s = st.current;
    if (!s.dragging || e.pointerId !== s.pointer) return;
    const now = performance.now();
    const dx = e.clientX - s.lastX;
    // Dragging right turns the car towards the viewer's right, like a turntable.
    const d = -dx / DRAG_PER_TURN;
    s.pos += d;
    const dt = Math.max(1, now - s.lastT) / 1000;
    s.vel = s.vel * 0.6 + (d / dt) * 0.4;
    s.lastX = e.clientX; s.lastT = now;
  };
  const onUp = () => { st.current.dragging = false; st.current.pointer = -1; };
  const onKey = (e: React.KeyboardEvent<HTMLCanvasElement>) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const s = st.current;
    s.auto = false; s.vel = 0;
    s.pos = (Math.round(s.pos * n) + (e.key === "ArrowRight" ? 1 : -1)) / n;
    setTouched(true);
  };

  return (
    <div className={`relative overflow-hidden bg-[#e6e2dd] ${className}`}>
      <canvas
        ref={canvas}
        role="img"
        tabIndex={0}
        aria-label={`${alt} – vedere 360°, trage stânga-dreapta sau folosește săgețile pentru a roti mașina`}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onLostPointerCapture={onUp}
        onKeyDown={onKey}
        className="block h-full w-full cursor-grab touch-pan-y select-none outline-none focus-visible:ring-2 focus-visible:ring-primary active:cursor-grabbing"
      />
      {loaded === 0 && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-xs font-semibold text-muted-foreground">
          <RotateCw className="mr-2 h-4 w-4 animate-spin" /> Se încarcă vederea 360°
        </div>
      )}
      {!touched && loaded > 0 && (
        <span className="pointer-events-none absolute bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground shadow">
          <Hand className="h-3.5 w-3.5" /> Trage pentru a roti
        </span>
      )}
    </div>
  );
}
