export const SITE_URL = "https://dcorentacarcluj.ro";

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
export function canonicalLinks(path = "/", withDefault = false) {
  const href = canonical(path);
  return [
    { rel: "canonical", href },
    { rel: "alternate", hrefLang: "ro-RO", href },
    ...(withDefault ? [{ rel: "alternate", hrefLang: "x-default", href }] : []),
  ];
}
