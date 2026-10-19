/**
 * Ads are disabled on this site.
 *
 * Third-party banners distract visitors from calling or writing on WhatsApp
 * and lower trust on a booking site, so the components below render nothing.
 * They are kept as no-ops so existing imports keep compiling.
 */

export type AdFormat = "leaderboard" | "box" | "mobile";

export function getAdConsent(): boolean {
  return false;
}

export function AdConsentBanner() {
  return null;
}

export function AdBanner(_props: { format: AdFormat }) {
  return null;
}
