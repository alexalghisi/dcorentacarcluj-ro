/**
 * Runs `callback` once the page has finished loading and the main thread is idle,
 * so non-essential work (ads, background video) never competes with the first paint.
 * Returns a cancel function.
 */
export function afterPageIdle(callback: () => void, timeout = 3000): () => void {
  if (typeof window === "undefined") return () => {};
  let cancelled = false;
  let idleId: number | undefined;
  let timer: number | undefined;
  const fire = () => {
    if (!cancelled) callback();
  };
  const schedule = () => {
    if (cancelled) return;
    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(fire, { timeout });
    } else {
      timer = window.setTimeout(fire, 300);
    }
  };
  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule, { once: true });
  return () => {
    cancelled = true;
    window.removeEventListener("load", schedule);
    if (idleId !== undefined && typeof window.cancelIdleCallback === "function") {
      window.cancelIdleCallback(idleId);
    }
    if (timer !== undefined) window.clearTimeout(timer);
  };
}
