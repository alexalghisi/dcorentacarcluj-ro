export const SITE_URL = "https://dcorentacarcluj.ro";

/** Absolute social preview image used by every indexable route. */
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

/** og:image + twitter:image meta entries (absolute URLs, as crawlers require). */
export function socialImageMeta(alt = "DCO Rent a Car Cluj — mașini de închiriat în Cluj și Gilău") {
  return [
    { property: "og:image", content: OG_IMAGE },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: alt },
    { name: "twitter:image", content: OG_IMAGE },
  ];
}


/**
 * Builds the single canonical absolute URL for a path.
 * - always https + non-www host (the host every other variant redirects to)
 * - homepage canonical is the root with a trailing slash
 * - every other path has no trailing slash and no query/hash
 */
export function canonical(path = "/"): string {
  const clean = `/${path}`.replace(/\/+/g, "/").replace(/[?#].*$/, "");
  if (clean === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${clean.replace(/\/+$/, "")}`;
}

/** canonical + self-referencing hreflang links for a path. */
export function canonicalLinks(path = "/", withDefault = false, hrefLang = "ro-RO") {
  const href = canonical(path);
  return [
    { rel: "canonical", href },
    { rel: "alternate", hrefLang, href },
    ...(withDefault ? [{ rel: "alternate", hrefLang: "x-default", href }] : []),
  ];
}
