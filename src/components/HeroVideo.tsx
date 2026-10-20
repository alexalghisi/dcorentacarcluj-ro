import { useEffect, useRef } from "react";

export const HERO_VIDEO_POSTER = "/video/hero-fleet-poster.jpg?v=20261020";
const HERO_VIDEO = "/video/hero-fleet.mp4?v=20261020";
const HERO_VIDEO_WEBM = "/video/hero-fleet.webm?v=20261020";

/** Muted studio film of the fleet behind the hero copy; stays on the poster for reduced motion. */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (reduce.matches) v.pause();
      else void v.play().catch(() => {});
    };
    sync();
    reduce.addEventListener("change", sync);
    return () => reduce.removeEventListener("change", sync);
  }, []);
  return (
    <video
      ref={ref}
      aria-hidden="true"
      tabIndex={-1}
      muted
      loop
      playsInline
      autoPlay
      preload="auto"
      poster={HERO_VIDEO_POSTER}
      width={1280}
      height={720}
      className="absolute inset-0 h-full w-full object-cover object-[68%_60%]"
    >
      <source src={HERO_VIDEO} type="video/mp4" />
      <source src={HERO_VIDEO_WEBM} type="video/webm" />
    </video>
  );
}
