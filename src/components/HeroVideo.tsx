import { useEffect, useRef, useState } from "react";
import { afterPageIdle } from "@/lib/idle";

export const HERO_VIDEO_POSTER = "/video/hero-fleet-poster.webp?v=20261025";
const HERO_VIDEO = "/video/hero-fleet.mp4?v=20261020";
const HERO_VIDEO_WEBM = "/video/hero-fleet.webm?v=20261020";

/**
 * Muted studio film of the fleet behind the hero copy; stays on the poster for reduced motion.
 * The poster paints first; the film itself is fetched only after the page has loaded and
 * plays while the hero is on screen.
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);
  const visible = useRef(true);

  // Attach the film once the page is loaded and idle.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) {
      const onChange = () => { if (!reduce.matches) setActive(true); };
      reduce.addEventListener("change", onChange);
      return () => reduce.removeEventListener("change", onChange);
    }
    return afterPageIdle(() => setActive(true));
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v || !active) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (reduce.matches || !visible.current) v.pause();
      else void v.play().catch(() => {});
    };
    v.load();
    sync();
    const io = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(([e]) => {
      visible.current = !!e?.isIntersecting;
      sync();
    });
    io?.observe(v);
    reduce.addEventListener("change", sync);
    return () => { io?.disconnect(); reduce.removeEventListener("change", sync); };
  }, [active]);

  return (
    <video
      ref={ref}
      aria-hidden="true"
      tabIndex={-1}
      muted
      loop
      playsInline
      autoPlay={active}
      preload={active ? "auto" : "none"}
      poster={HERO_VIDEO_POSTER}
      width={1280}
      height={720}
      className="absolute inset-0 h-full w-full object-cover object-[68%_60%]"
    >
      {active && <source src={HERO_VIDEO} type="video/mp4" />}
      {active && <source src={HERO_VIDEO_WEBM} type="video/webm" />}
    </video>
  );
}
