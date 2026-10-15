/**
 * Conversion tracking: call clicks, WhatsApp clicks, booking form submits.
 * Events go to window.dataLayer (GA4/GTM pick them up) once a GA4 ID is configured.
 */
type W = Window & { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void };

export function trackConversion(name: string, params: Record<string, unknown> = {}) {
  const w = window as W;
  w.dataLayer = w.dataLayer || [];
  if (typeof w.gtag === "function") w.gtag("event", name, params);
  else w.dataLayer.push({ event: name, ...params });
}

export function initConversionTracking(gaId?: string) {
  const w = window as W;
  if (gaId && !w.gtag) {
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(s);
    w.dataLayer = w.dataLayer || [];
    w.gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer!.push(arguments);
    };
    w.gtag("js", new Date());
    w.gtag("config", gaId);
  }
  const onClick = (e: MouseEvent) => {
    const a = (e.target as HTMLElement | null)?.closest?.("a");
    const href = a?.getAttribute("href") ?? "";
    const page_path = location.pathname;
    if (href.startsWith("tel:")) trackConversion("call_click", { page_path });
    else if (/wa\.me|whatsapp/i.test(href)) trackConversion("whatsapp_click", { page_path });
    else if (href.startsWith("sms:")) trackConversion("sms_click", { page_path });
  };
  const onSubmit = (e: SubmitEvent) => {
    const f = e.target as HTMLFormElement;
    if (!f.closest("[data-admin]") && !location.pathname.startsWith("/admin"))
      trackConversion("booking_submit", { page_path: location.pathname });
  };
  document.addEventListener("click", onClick, true);
  document.addEventListener("submit", onSubmit, true);
  return () => {
    document.removeEventListener("click", onClick, true);
    document.removeEventListener("submit", onSubmit, true);
  };
}
