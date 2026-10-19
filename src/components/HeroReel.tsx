import { useEffect, useState } from "react";
import { PrivateVehiclePhoto } from "@/components/PrivateVehiclePhoto";

export interface ReelSlide {
  src: string;
  caption: string;
}

/** Seconds each car stays on screen; the crossfade overlaps the next slide. */
const SLIDE_SECONDS = 5;

/**
 * Promotional hero reel made from the real fleet photographs.
 *
 * Each photo gets a slow cinematic push-in and pan (Ken Burns) and crossfades into
 * the next, like a short promo film. Plates stay blurred because every frame goes
 * through PrivateVehiclePhoto. The poster image is rendered first for fast LCP and
 * remains the only image for visitors who prefer reduced motion.
 */
export function HeroReel({ poster, posterAlt, slides }: { poster: string; posterAlt: string; slides: ReelSlide[] }) {
  const [active, setActive] = useState(-1);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (reduce?.matches || slides.length === 0) return;
    // Start after first paint so the poster stays the LCP element.
    const start = window.setTimeout(() => { setEnabled(true); setActive(0); }, 1200);
    return () => window.clearTimeout(start);
  }, [slides.length]);

  useEffect(() => {
    if (!enabled) return;
    let timer = 0;
    const schedule = () => {
      timer = window.setTimeout(() => {
        if (document.visibilityState === "visible") setActive((i) => (i + 1) % slides.length);
        schedule();
      }, SLIDE_SECONDS * 1000);
    };
    schedule();
    return () => window.clearTimeout(timer);
  }, [enabled, slides.length]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-ink">
      <img
        src={poster}
        alt={posterAlt}
        width={1600}
        height={1008}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {enabled && slides.map((slide, i) => {
        const on = i === active;
        // Alternate the camera move so consecutive shots don't feel repetitive.
        const move = i % 2 === 0 ? "hero-reel-push-left" : "hero-reel-push-right";
        return (
          <div
            key={slide.src}
            className="absolute inset-0 transition-opacity duration-[1400ms] ease-in-out"
            style={{ opacity: on ? 1 : 0 }}
          >
            <div className={`absolute inset-0 ${on ? move : ""}`} style={{ animationDuration: `${SLIDE_SECONDS + 1.4}s` }}>
              <PrivateVehiclePhoto src={slide.src} alt={slide.caption} fit="cover" className="h-full w-full" />
            </div>
            <span
              className="pointer-events-none absolute bottom-5 right-5 rounded-full bg-black/45 px-3 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur-sm transition-all duration-700"
              style={{ opacity: on ? 1 : 0, transform: on ? "translateY(0)" : "translateY(6px)" }}
            >
              {slide.caption}
            </span>
          </div>
        );
      })}
      {/* Subtle vignette so the reel reads as filmed footage, not a slideshow. */}
      <div className="hero-reel-vignette pointer-events-none absolute inset-0" />
      {enabled && <div className="absolute bottom-0 left-0 h-0.5 w-full bg-white/10">
        <div key={active} className="hero-reel-progress h-full bg-signal/80" style={{ animationDuration: `${SLIDE_SECONDS}s` }} />
      </div>}
    </div>
  );
}
