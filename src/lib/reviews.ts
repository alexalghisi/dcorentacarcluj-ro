/**
 * Recenzii Google Business Profile — DCO Rent a Car Cluj
 *
 * Cum se activează feed-ul:
 * 1. Ovidiu creează / revendică profilul Google Business Profile.
 * 2. Se completează GOOGLE_PLACE_ID + GOOGLE_REVIEW_URL mai jos cu linkurile reale.
 * 3. Recenziile primite se adaugă în lista REVIEWS (text exact, fără modificări).
 *    Doar recenziile reale intră aici — schema AggregateRating se generează
 *    automat din ele, deci orice text inventat ar fi spam pentru Google.
 */

export type Review = {
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  /** ISO date, ex. "2026-07-12" */
  date: string;
  text: string;
  /** Oraș / context, opțional */
  context?: string;
};

/** Place ID Google (se completează după verificarea profilului). */
export const GOOGLE_PLACE_ID = "";

/** Linkul public al profilului Google Business (harta / recenzii). */
export const GOOGLE_PROFILE_URL =
  "https://www.google.com/maps/search/?api=1&query=DCO+Rent+a+Car+Cluj+Gil%C4%83u";

/** Linkul direct de „Scrie o recenzie” (se generează din Place ID). */
export const GOOGLE_WRITE_REVIEW_URL = GOOGLE_PLACE_ID
  ? `https://search.google.com/local/writereview?placeid=${GOOGLE_PLACE_ID}`
  : GOOGLE_PROFILE_URL;

/**
 * Recenzii reale preluate din Google Business Profile.
 * Gol până la activarea profilului — secțiunea afișează atunci un CTA de recenzie.
 */
export const REVIEWS: Review[] = [];

export const reviewStats = () => {
  if (REVIEWS.length === 0) return null;
  const total = REVIEWS.reduce((sum, r) => sum + r.rating, 0);
  return {
    count: REVIEWS.length,
    average: Math.round((total / REVIEWS.length) * 10) / 10,
  };
};

/** Schema.org Review[] + AggregateRating, doar dacă există recenzii reale. */
export const reviewsSchema = () => {
  const stats = reviewStats();
  if (!stats) return null;
  return {
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(stats.average),
      reviewCount: String(stats.count),
      bestRating: "5",
      worstRating: "1",
    },
    review: REVIEWS.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      datePublished: r.date,
      reviewBody: r.text,
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(r.rating),
        bestRating: "5",
        worstRating: "1",
      },
    })),
  };
};
