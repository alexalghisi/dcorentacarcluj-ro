import { Link } from "@tanstack/react-router";
import { NativeAdSlot } from "@/components/NativeAdSlot";
import { SponsoredLink } from "@/components/SponsoredLink";
import { Car, Phone, Mail, MapPin, Check, ArrowRight, ArrowLeft, MessageCircle } from "lucide-react";

import type { LocationPage } from "@/lib/locations";
import { AdsterraSlot } from "@/components/AdsterraSlot";
import { locations } from "@/lib/locations";

const PHONE_HREF = "tel:+40742925934";

const ONLINE_BOOKING_SLUGS = new Set([
  "rent-a-car-floresti-cluj",
  "rent-a-car-gilau",
  "inchirieri-auto-cluj",
  "rent-a-car-cluj-napoca",
  "rent-a-car-huedin",
]);

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=DCO+Rent+a+Car+Cluj+Gil%C4%83u";

const SERVED_AREAS: string[] = [
  "Cluj-Napoca",
  "Gilău",
  "Florești",
  "Apahida",
  "Baciu",
  "Turda",
  "Huedin",
  "Aeroport Cluj",
];

const LANDMARKS: string[] = [
  "Aeroportul Internațional Avram Iancu Cluj (Terminal Plecări)",
  "Gara CFR Cluj-Napoca și Autogara Beta",
  "Piața Unirii și centrul Cluj-Napoca",
  "Iulius Mall / VIVO! Cluj",
  "Campusul UBV / Universitatea Babeș-Bolyai",
  "Lacul Tarnița și barajul Gilău (weekend)",
];


type Lang = NonNullable<LocationPage["lang"]>;

/** Interface text for landing pages, so English and Hungarian pages are not half Romanian. */
const UI: Record<Lang, {
  waAria: string; call: string; home: string; bookOnline: string; callNow: string; quote: string;
  fleet: (city: string) => string; bookFor: (city: string) => string; bookText: string; waWrite: string;
  form: string; faq: (city: string) => string; zones: (city: string) => string; zonesText: string;
  places: string; landmarks: string; openMaps: string; mapTitle: (city: string) => string;
  others: string; rights: string; privacy: string; waText: (city: string) => string;
}> = {
  ro: {
    waAria: "Scrie pe WhatsApp", call: "Sună", home: "Acasă", bookOnline: "Rezervă online", callNow: "Sună acum",
    quote: "Cere o ofertă", fleet: (c) => `Mașini de închiriat pentru ${c}`, bookFor: (c) => `Rezervă o mașină pentru ${c}`,
    bookText: "Sună sau scrie-ne cu perioada dorită și clasa de mașină. Confirmăm disponibilitatea rapid.",
    waWrite: "Scrie pe WhatsApp", form: "Formular de rezervare", faq: (c) => `Întrebări frecvente — ${c}`,
    zones: (c) => `Zone deservite în județul Cluj — ${c}`,
    zonesText: "Bază în Gilău, la 12 km de centrul Cluj-Napoca. Predăm și preluăm mașina în localitățile de mai jos și la punctele de reper cele mai cerute, la ora stabilită telefonic.",
    places: "Localități", landmarks: "Puncte de reper pentru predare", openMaps: "Deschide în Google Maps",
    mapTitle: (c) => `Harta zonelor deservite de DCO Rent a Car — ${c}, județul Cluj`,
    others: "Alte zone deservite", rights: "Toate drepturile rezervate.", privacy: "Politica de confidențialitate",
    waText: (c) => `Bună ziua! Vreau să închiriez o mașină (${c}). Perioada dorită: `,
  },
  en: {
    waAria: "Message us on WhatsApp", call: "Call", home: "Home", bookOnline: "Book online", callNow: "Call now",
    quote: "Get a quote", fleet: () => "Cars for hire", bookFor: () => "Book a car",
    bookText: "Call or message us with your dates and the type of car. We confirm availability quickly.",
    waWrite: "Message on WhatsApp", form: "Booking form", faq: () => "Frequently asked questions",
    zones: () => "Where we hand over cars",
    zonesText: "Our base is in Gilău, just west of Cluj-Napoca. We hand over and collect cars in the places below and at the most requested landmarks, at a time agreed by phone.",
    places: "Towns", landmarks: "Handover landmarks", openMaps: "Open in Google Maps",
    mapTitle: () => "Map of the area served by DCO Rent a Car, Cluj County",
    others: "Other pages", rights: "All rights reserved.", privacy: "Privacy policy",
    waText: () => "Hello! I would like to rent a car. Dates: ",
  },
  hu: {
    waAria: "Írjon WhatsAppon", call: "Hívás", home: "Főoldal", bookOnline: "Online foglalás", callNow: "Hívjon most",
    quote: "Ajánlatkérés", fleet: () => "Bérelhető autók", bookFor: () => "Autófoglalás",
    bookText: "Hívjon vagy írjon a kívánt időszakkal és az autó típusával. Gyorsan visszaigazoljuk, van-e szabad autó.",
    waWrite: "Írjon WhatsAppon", form: "Foglalási űrlap", faq: () => "Gyakori kérdések",
    zones: () => "Hol adjuk át az autót",
    zonesText: "Telephelyünk Gyalun van, Kolozsvártól nyugatra. Az autót az alábbi településeken és a leggyakoribb találkozási pontokon adjuk át és vesszük vissza, telefonon egyeztetett időben.",
    places: "Települések", landmarks: "Átadási pontok", openMaps: "Megnyitás a Google Térképen",
    mapTitle: () => "A DCO Rent a Car által kiszolgált terület térképe, Kolozs megye",
    others: "További oldalak", rights: "Minden jog fenntartva.", privacy: "Adatvédelmi szabályzat",
    waText: () => "Jó napot! Autót szeretnék bérelni. Időszak: ",
  },
};

function waLink(text: string) {
  return `https://wa.me/40742925934?text=${encodeURIComponent(text)}`;
}

export function LocationLanding({ page, fleet = [] }: { page: LocationPage; fleet?: { name: string; slug: string }[] }) {
  const nearby = page.nearby ?? [];
  const others = locations
    .filter((l) => l.slug !== page.slug)
    .sort((a, b) => {
      const ia = nearby.indexOf(a.slug);
      const ib = nearby.indexOf(b.slug);
      return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
    })
    // A short, relevant set reads better than linking every page from every page.
    .slice(0, 12);
  const t = UI[page.lang ?? "ro"];
  const whatsapp = waLink(t.waText(page.city));


  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Car className="h-5 w-5" strokeWidth={2.4} />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-sm font-bold tracking-tight">DCO RENT A CAR</span>
              <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {page.city}
              </span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.waAria}
              className="btn-base btn-outline-ink px-4 py-2.5 text-sm"
            >
              <MessageCircle className="h-4 w-4" /> <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <a href={PHONE_HREF} className="btn-base btn-primary px-5 py-2.5 text-sm">
              <Phone className="h-4 w-4" /> <span className="hidden sm:inline">(0742) 925 934</span>
              <span className="sm:hidden">{t.call}</span>
            </a>
          </div>

        </div>
      </header>

      <main>
        <section className="border-b border-border bg-surface">
          <div className="mx-auto max-w-4xl px-5 py-12 md:py-16">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> {t.home}
            </Link>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" /> {page.city}
            </p>
            <h1 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl">
              {page.h1}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{page.intro}</p>

            <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
              {page.highlights.map((h) => (
                <div key={h.label} className="rounded-xl border border-border bg-card px-4 py-3">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {h.label}
                  </p>
                  <p className="mt-1 font-display text-lg font-bold">{h.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {ONLINE_BOOKING_SLUGS.has(page.slug) ? (
                <Link to="/rezervare" className="btn-base btn-primary">
                  {t.bookOnline} <ArrowRight className="h-4 w-4" />
                </Link>
              ) : null}
              <a href={PHONE_HREF} className="btn-base btn-primary">
                <Phone className="h-4 w-4" /> {t.callNow}
              </a>
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn-base btn-signal">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
              <Link to="/" hash="contact" className="btn-base btn-outline-ink">
                {t.quote} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

          </div>
        </section>


        <section className="mx-auto max-w-4xl px-5 py-12 md:py-16">
          <div className="space-y-10">
            {page.sections.map((s, index) => (
              <div key={s.heading}>
              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight">{s.heading}</h2>
                {s.paragraphs.map((p) => (
                  <p key={p} className="mt-3 leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
                {s.bullets ? (
                  <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm text-foreground">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2.6} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
              {index === Math.floor(page.sections.length / 2) - 1 &&
                /flota|masin|auto|suv|break/.test(page.slug) &&
                <AdsterraSlot placement="fleet-detail-mid-content" />}
              </div>
            ))}
          </div>

          {fleet.length > 0 && <section className="py-8">
            <h2 className="font-display text-2xl font-bold">{t.fleet(page.city)}</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {fleet.map((vehicle) => <li key={vehicle.slug}><Link to="/masini/$slug" params={{ slug: vehicle.slug }} className="inline-flex items-center gap-2 font-semibold text-primary hover:underline">{vehicle.name}<ArrowRight className="h-4 w-4" /></Link></li>)}
            </ul>
          </section>}
          <NativeAdSlot placement="location-native" />

          <div className="mt-12 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] md:p-8">
            <h2 className="font-display text-xl font-bold tracking-tight">
              {t.bookFor(page.city)}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {t.bookText}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {ONLINE_BOOKING_SLUGS.has(page.slug) ? (
                <Link to="/rezervare" className="btn-base btn-primary">
                  {t.bookOnline} <ArrowRight className="h-4 w-4" />
                </Link>
              ) : null}
              <a href={PHONE_HREF} className="btn-base btn-primary">
                <Phone className="h-4 w-4" /> (0742) 925 934
              </a>
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn-base btn-signal">
                <MessageCircle className="h-4 w-4" /> {t.waWrite}
              </a>
              <a href="mailto:Ovidiu_danciu@yahoo.com" className="btn-base btn-outline-ink">
                <Mail className="h-4 w-4" /> Ovidiu_danciu@yahoo.com
              </a>
              <Link to="/" hash="contact" className="btn-base btn-outline-ink">
                {t.form} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

          </div>

          <div className="mt-12">
            <h2 className="font-display text-2xl font-bold tracking-tight">{t.faq(page.city)}</h2>
            <div className="mt-5 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
              {page.faq.map((f, i) => (
                <details key={f.q} open={i === 0} className="group p-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-3">
                    <h3 className="font-display text-base font-bold">{f.q}</h3>
                    <ArrowRight
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-90"
                    />
                  </summary>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </div>


          <div className="mt-12">
            <h2 className="font-display text-2xl font-bold tracking-tight">
              {t.zones(page.city)}
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {t.zonesText}
            </p>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {t.places}
                </h3>
                <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  {SERVED_AREAS.map((a) => (
                    <li key={a} className="flex items-start gap-2">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2.4} />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {t.landmarks}
                </h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {LANDMARKS.map((l) => (
                    <li key={l} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2.6} />
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-base btn-outline-ink mt-6"
                >
                  {t.openMaps} <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <div className="overflow-hidden rounded-2xl border border-border bg-card">
                <iframe
                  title={t.mapTitle(page.city)}
                  src="https://www.openstreetmap.org/export/embed.html?bbox=23.20%2C46.66%2C23.75%2C46.85&layer=mapnik&marker=46.7469%2C23.3736"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-[300px] w-full border-0 md:h-full md:min-h-[420px]"
                />
              </div>
            </div>
          </div>

          <div className="mt-12">

            <h2 className="font-display text-lg font-bold tracking-tight">{t.others}</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  to="/$slug"
                  params={{ slug: o.slug }}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-primary"
                >
                  <span className="font-semibold">{o.linkTitle ?? `Rent a Car ${o.city}`}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>

      <AdsterraSlot placement="location-before-footer" />
      <footer className="border-t border-border bg-background pb-20 md:pb-0">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p className="font-semibold text-foreground">DCO RENT A CAR CLUJ</p>
          <p>Gilău · Cluj-Napoca · Florești</p>
          <p>
            © {new Date().getFullYear()} {t.rights}{" "}
<Link to="/confidentialitate" className="hover:text-foreground hover:underline">{t.privacy}</Link> <SponsoredLink className="ml-2" />
          </p>
        </div>
      </footer>

      {/* Bară fixă mobil: sună + WhatsApp */}
      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-border bg-background/95 p-3 backdrop-blur md:hidden">
        <a href={PHONE_HREF} className="btn-base btn-primary w-full justify-center py-3">
          <Phone className="h-4 w-4" /> {t.call}
        </a>
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-base btn-signal w-full justify-center py-3"
        >
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </a>
      </div>

    </div>
  );
}
