import { ArrowRight, Quote, Star } from "lucide-react";

import {
  GOOGLE_PROFILE_URL,
  GOOGLE_WRITE_REVIEW_URL,
  REVIEWS,
  reviewStats,
} from "@/lib/reviews";

function Stars({ rating, label }: { rating: number; label?: string }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={label ?? `${rating} din 5 stele`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={
            i <= Math.round(rating)
              ? "h-4 w-4 fill-signal text-signal"
              : "h-4 w-4 text-muted-foreground/40"
          }
        />
      ))}
    </div>
  );
}

export function ReviewsSection() {
  const stats = reviewStats();

  return (
    <section id="recenzii" className="bg-surface py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Recenzii Google</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Ce spun clienții DCO Rent a Car Cluj
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Recenzii verificate din profilul Google Business, de la clienți care au închiriat
              mașini în Cluj-Napoca, Gilău, Florești și la Aeroportul Cluj.
            </p>
          </div>
          {stats ? (
            <div className="rounded-2xl border border-border bg-card px-5 py-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{stats.average.toFixed(1)}</span>
                <span className="text-sm text-muted-foreground">/ 5</span>
              </div>
              <Stars rating={stats.average} label={`Rating mediu ${stats.average} din 5`} />
              <p className="mt-1 text-xs text-muted-foreground">
                {stats.count} {stats.count === 1 ? "recenzie" : "recenzii"} pe Google
              </p>
            </div>
          ) : null}
        </div>

        {REVIEWS.length > 0 ? (
          <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map((r) => (
              <li
                key={`${r.author}-${r.date}`}
                className="flex flex-col rounded-2xl border border-border bg-card p-6"
              >
                <Quote aria-hidden="true" className="h-5 w-5 text-signal" />
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {r.text}
                </p>
                <div className="mt-5 border-t border-border pt-4">
                  <Stars rating={r.rating} />
                  <p className="mt-2 text-sm font-semibold">{r.author}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Intl.DateTimeFormat("ro-RO", {
                      month: "long",
                      year: "numeric",
                    }).format(new Date(r.date))}
                    {r.context ? ` · ${r.context}` : ""}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-border bg-card p-8 text-center">
            <Stars rating={5} label="Lasă o recenzie de 5 stele" />
            <h3 className="mt-4 text-xl font-semibold">
              Ai închiriat o mașină la DCO? Lasă o recenzie pe Google
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
              Recenziile ne ajută să fim găsiți mai ușor de șoferii din Cluj. Durează mai puțin
              de un minut și se afișează automat aici.
            </p>
            <a
              className="btn-base btn-primary mt-6 inline-flex px-6 py-3"
              href={GOOGLE_WRITE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Scrie o recenzie pe Google
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        )}

        <a
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-signal hover:underline"
          href={GOOGLE_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Vezi profilul Google Business DCO Rent a Car Cluj
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
