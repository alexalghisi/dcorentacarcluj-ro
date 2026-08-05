import { useEffect, useRef, useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Car,
  ShieldCheck,
  CreditCard,
  Clock,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Fuel,
  Users,
  Settings2,
  BadgeCheck,
  CalendarDays,
  CalendarX2,

} from "lucide-react";

import {
  getBusyRanges,
  getPublicVehicles,
  trackSiteView,
  trackVehicleView,
} from "@/lib/admin.functions";
import { VehicleGallery } from "@/components/VehicleGallery";
import { vehicleImageSrc, type Vehicle } from "@/lib/vehicles";
import {
  conflictsFor,
  formatRangeRo,
  freeAgainFrom,
  todayISO,
  type BookingRange,
} from "@/lib/bookings";

import heroCar from "@/assets/hero-fleet.jpg";
import carPassat from "@/assets/car-passat.jpg";
import carC5 from "@/assets/car-c5.jpg";
import carFocus from "@/assets/car-focus.jpg";
import carFabia from "@/assets/car-fabia.jpg";
import carClio from "@/assets/car-clio.jpg";
import carVolvoS40 from "@/assets/car-volvo-s40.jpg";
import carVolvoS40Grey from "@/assets/car-volvo-s40-grey.jpg";
import carXc90 from "@/assets/car-xc90.jpg";

import { locations } from "@/lib/locations";
import { SITE_URL, canonical, canonicalLinks } from "@/lib/seo";


const SITE = SITE_URL;
const TITLE = "Rent a Car Cluj-Napoca | Mașini de la 70 lei/zi";
const DESCRIPTION =
  "Rent a Car Cluj-Napoca, Gilău și Florești de la 70 lei/zi. Mașini de închiriat cu ITP, RCA, rovinietă și AC incluse, predare personală. Sună (0742) 925 934.";


const faq = [
  {
    q: "Cât costă închirierea unei mașini în Cluj sau Gilău?",
    a: "Prețurile pornesc de la 70 lei/zi și sunt negociabile în funcție de mașina aleasă și de durata închirierii. Pentru perioade mai lungi oferim reducere.",
  },
  {
    q: "Ce mașini sunt disponibile?",
    a: "Flota include Škoda Fabia, Renault Clio Symbol, Ford Focus break, VW Passat break, două Volvo S40, Citroën C5 automat și Volvo XC90 cu 7 locuri. Toate au ITP, RCA, rovinietă și aer condiționat. Sunați pentru disponibilitatea exactă.",
  },
  {
    q: "Ce documente sunt necesare pentru închiriere?",
    a: "Permis de conducere valabil de minimum 1 an și carte de identitate sau pașaport.",
  },
  {
    q: "De unde se preia mașina?",
    a: "Predarea se face personal în Gilău, județul Cluj, la o oră stabilită împreună. Servim clienți din Cluj-Napoca, Florești și Gilău.",
  },
  {
    q: "Cum rezerv o mașină?",
    a: "Sunați la (0742) 925 934, scrieți pe WhatsApp sau completați formularul de pe site. Confirmăm disponibilitatea rapid, inclusiv în weekend.",
  },
  {
    q: "Faceți rent a car în Cluj-Napoca fără garanție și fără card de credit?",
    a: "Da. Închirierea se face fără garanție și fără card de credit: aveți nevoie doar de permis valabil de minimum 1 an și de carte de identitate sau pașaport.",
  },
  {
    q: "Se poate închiria mașina pe termen lung, lunar?",
    a: "Da, oferim închirieri auto lunare în Cluj la tarif redus. Pentru perioade de peste 7 zile tariful zilnic scade, iar pentru firme emitem factură.",
  },
  {
    q: "Livrați mașina în Cluj-Napoca, Florești sau la aeroport?",
    a: "Baza este în Gilău, la 12 km de Cluj-Napoca. Stabilim împreună un punct convenabil de întâlnire în Cluj-Napoca, Florești sau în zona aeroportului.",
  },
];



export const Route = createFileRoute("/")({
  loader: async () => {
    const [vehicles, busy] = await Promise.all([
      getPublicVehicles().catch(() => []),
      getBusyRanges().catch(() => []),
    ]);
    return { vehicles, busy };
  },

  errorComponent: () => (
    <main className="p-10 text-center">
      <h1 className="text-xl font-bold">Reîncarcă pagina</h1>
    </main>
  ),
  notFoundComponent: () => <main className="p-10 text-center">Pagina nu a fost găsită.</main>,
  component: Index,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "rent a car cluj, cluj rent a car, car rental cluj, car hire cluj napoca, rent a car cluj napoca, inchirieri auto cluj, inchiriere masina cluj, masini de inchiriat cluj, inchirieri masini cluj, rent a car cluj aeroport, rent a car gilau, rent a car floresti, inchirieri auto lunare cluj, inchirieri auto ieftine cluj, masina automata de inchiriat cluj, masina 7 locuri de inchiriat cluj",
      },

      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "author", content: "DCO Rent a Car Cluj" },
      { name: "geo.region", content: "RO-CJ" },
      { name: "geo.placename", content: "Gilău, Cluj" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonical("/") },
      { property: "og:locale", content: "ro_RO" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: canonicalLinks("/", true),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": `${SITE}#organization`,
              name: "DCO Rent a Car Cluj",
              legalName: "DCO Rent a Car",
              alternateName: ["DCO Rent a Car Gilău", "DCO Rent a Car Florești"],
              url: SITE,
              description: DESCRIPTION,
              email: "Ovidiu_danciu@yahoo.com",
              telephone: "+40742925934",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Gilău",
                addressRegion: "Cluj",
                postalCode: "407310",
                addressCountry: "RO",
              },
              areaServed: [
                { "@type": "City", name: "Cluj-Napoca" },
                { "@type": "City", name: "Gilău" },
                { "@type": "City", name: "Florești" },
                { "@type": "AdministrativeArea", name: "Județul Cluj" },
              ],
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  contactType: "customer service",
                  telephone: "+40742925934",
                  email: "Ovidiu_danciu@yahoo.com",
                  availableLanguage: ["ro", "en"],
                  areaServed: "RO",
                },
              ],
            },
            {
              "@type": ["LocalBusiness", "AutoRental"],
              "@id": `${SITE}#business`,
              parentOrganization: { "@id": `${SITE}#organization` },
              name: "DCO Rent a Car Cluj",
              alternateName: "DCO Rent a Car Gilău",
              description: DESCRIPTION,
              url: SITE,
              telephone: "+40742925934",
              email: "Ovidiu_danciu@yahoo.com",
              priceRange: "€€",
              currenciesAccepted: "EUR, RON",
              paymentAccepted: "Cash, Card",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Gilău",
                addressRegion: "Cluj",
                postalCode: "407310",
                addressCountry: "RO",
              },
              geo: { "@type": "GeoCoordinates", latitude: 46.7469, longitude: 23.3736 },
              areaServed: [
                { "@type": "City", name: "Cluj-Napoca" },
                { "@type": "City", name: "Gilău" },
                { "@type": "City", name: "Florești" },
                { "@type": "AdministrativeArea", name: "Județul Cluj" },
              ],
              makesOffer: [
                {
                  "@type": "Offer",
                  name: "Închiriere auto Cluj / Gilău",
                  price: "70",
                  priceCurrency: "RON",
                  description:
                    "Tarif de la 70 lei/zi, negociabil în funcție de mașină și perioadă.",
                  eligibleDuration: { "@type": "QuantitativeValue", value: 1, unitCode: "DAY" },
                },
              ],
            },
            {
              "@type": "WebSite",
              "@id": `${SITE}#website`,
              url: SITE,
              name: "DCO Rent a Car Cluj",
              inLanguage: "ro-RO",
              publisher: { "@id": `${SITE}#organization` },
            },
            {
              "@type": "WebPage",
              "@id": `${SITE}#webpage`,
              url: SITE,
              name: TITLE,
              description: DESCRIPTION,
              inLanguage: "ro-RO",
              isPartOf: { "@id": `${SITE}#website` },
              about: { "@id": `${SITE}#business` },
            },
          ],
        }),
      },

      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Flota DCO Rent a Car Cluj",
          itemListElement: [
            "Škoda Fabia",
            "Renault Clio Symbol",
            "Ford Focus Break",
            "VW Passat Break",
            "Volvo S40 2.0D",
            "Citroën C5 automat",
            "Volvo XC90 D5 7 locuri",
          ].map((name, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Car",
              name,
              brand: { "@type": "Brand", name: name.split(" ")[0] },
              offers: {
                "@type": "Offer",
                price: "70",
                priceCurrency: "RON",
                availability: "https://schema.org/InStock",
                priceSpecification: {
                  "@type": "UnitPriceSpecification",
                  price: 70,
                  priceCurrency: "RON",
                  unitCode: "DAY",
                },
                seller: { "@id": `${SITE}#organization` },
              },
            },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Rent a Car Cluj", item: canonical("/") },
          ],
        }),
      },

    ],
  }),
});

const fleet = [
  {
    img: carFabia,
    name: "Škoda Fabia",
    example: "Compactă, economică, perfectă pentru oraș",
    price: "de la 70 lei/zi",
    specs: ["5 locuri", "Manuală", "Benzină"],
  },
  {
    img: carClio,
    name: "Renault Clio Symbol",
    example: "Cea mai accesibilă opțiune, consum mic",
    price: "de la 70 lei/zi",
    specs: ["5 locuri", "Manuală", "Benzină"],
  },
  {
    img: carFocus,
    name: "Ford Focus Break",
    example: "Portbagaj generos, fiabil pe drum lung",
    price: "de la 70 lei/zi",
    specs: ["5 locuri", "Manuală", "Diesel"],
  },
  {
    img: carPassat,
    name: "VW Passat Break",
    example: "Spațios și confortabil, ideal pentru familie",
    price: "de la 70 lei/zi",
    specs: ["5 locuri", "Manuală", "Diesel"],
  },
  {
    img: carVolvoS40,
    name: "Volvo S40 2.0D",
    example: "Berlină sigură și silențioasă",
    price: "de la 70 lei/zi",
    specs: ["5 locuri", "Manuală", "Diesel"],
  },
  {
    img: carVolvoS40Grey,
    name: "Volvo S40",
    example: "A doua unitate S40, disponibilă la cerere",
    price: "de la 70 lei/zi",
    specs: ["5 locuri", "Manuală", "Diesel"],
  },
  {
    img: carC5,
    name: "Citroën C5",
    example: "Berlină automată, confort maxim pe autostradă",
    price: "de la 70 lei/zi",
    specs: ["5 locuri", "Automată", "Diesel"],
  },
  {
    img: carXc90,
    name: "Volvo XC90 D5",
    example: "SUV premium 7 locuri, tracțiune integrală",
    price: "la cerere",
    specs: ["7 locuri", "Automată", "Diesel"],
  },
];



const perks = [
  {
    icon: ShieldCheck,
    title: "Predare personală",
    text: "Ne întâlnim în Gilău și predăm mașina direct, cu explicații și verificare împreună.",
  },
  {
    icon: CreditCard,
    title: "Prețuri de la 70 lei/zi",
    text: "Tarif negociabil în funcție de mașina aleasă și de durata închirierii, cu reducere pentru perioade lungi.",
  },
  {
    icon: BadgeCheck,
    title: "Mașini verificate",
    text: "Toate autoturismele au AC, ITP valabil, rovinietă și asigurare, verificate înainte de predare.",
  },
  {
    icon: Car,
    title: "Flotă variată",
    text: "De la mașini mici și economice la break-uri, berline automate și SUV cu 7 locuri.",
  },
  {
    icon: MapPin,
    title: "Predare personală în Gilău",
    text: "Vă întâmpinăm personal în Gilău, la o oră stabilită împreună. Servim Cluj-Napoca, Florești și Gilău.",
  },
  {
    icon: Clock,
    title: "Răspuns rapid",
    text: "Un telefon sau un mesaj pe WhatsApp și confirmăm disponibilitatea, inclusiv în weekend.",
  },
];

const steps = [
  { n: "01", title: "Alegeți mașina", text: "Ne spuneți perioada și modelul dorit din flotă." },
  { n: "02", title: "Primiți prețul", text: "Tarif final, negociat în funcție de durată." },
  { n: "03", title: "Predare în Gilău", text: "Ne întâlnim personal și predăm mașina verificată." },
  { n: "04", title: "Returnați simplu", text: "Verificare rapidă la finalul perioadei." },
];

const conditions = [
  "Permis auto valabil de minimum 1 an",
  "Carte de identitate sau pașaport",
  "Preț în funcție de mașină și perioadă",
  "Predare personală în Gilău",
  "Mașini verificate înainte de predare",
  "Asistență telefonică rapidă",
];


function Index() {
  const { vehicles: dbVehicles, busy } = Route.useLoaderData() as {
    vehicles: Vehicle[];
    busy: BookingRange[];
  };

  const [from, setFrom] = useState(todayISO());
  const [to, setTo] = useState(todayISO());
  const rangeTo = to < from ? from : to;

  const fleetItems = (
    dbVehicles.length > 0
      ? dbVehicles.map((v) => ({
          img: vehicleImageSrc(v.image_url),
          images: [v.image_url, ...(v.gallery ?? [])].filter(Boolean).map(vehicleImageSrc),
          name: v.name,
          example: v.tagline,
          price: v.price_label,
          specs: [v.seats, v.transmission, v.fuel],
          id: v.id as string | undefined,
        }))
      : fleet.map((c) => ({ ...c, images: [c.img], id: undefined as string | undefined }))
  ).map((c) => {
    const conflicts = conflictsFor(busy, c.id, from, rangeTo);
    const freeFrom = freeAgainFrom(conflicts);
    return {
      ...c,
      busy: conflicts.length > 0,
      busyLabel:
        conflicts.length > 0
          ? `Rezervată ${conflicts.map((r) => formatRangeRo(r.start_date, r.end_date)).join(", ")}`
          : "",
      freeFrom,
    };
  });

  const availableCount = fleetItems.filter((c) => !c.busy).length;

  const fleetRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    void trackSiteView({ data: undefined }).catch(() => {});
  }, []);

  useEffect(() => {
    const root = fleetRef.current;
    if (!root || typeof IntersectionObserver === "undefined") return;
    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).dataset["vehicleId"];
          if (!entry.isIntersecting || !id || seen.has(id)) continue;
          seen.add(id);
          observer.unobserve(entry.target);
          void trackVehicleView({ data: { id } }).catch(() => {});
        }
      },
      { threshold: 0.5 },
    );
    root.querySelectorAll("[data-vehicle-id]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [dbVehicles]);

  return (

    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Car className="h-5 w-5" strokeWidth={2.4} />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-sm font-bold tracking-tight">
                DCO RENT A CAR
              </span>
              <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Cluj · Gilău
              </span>
            </span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
            <a className="transition-colors hover:text-foreground" href="#flota">
              Flota
            </a>
            <a className="transition-colors hover:text-foreground" href="#avantaje">
              Avantaje
            </a>
            <a className="transition-colors hover:text-foreground" href="#proces">
              Cum funcționează
            </a>
            <a className="transition-colors hover:text-foreground" href="#intrebari">
              Întrebări
            </a>
            <Link className="transition-colors hover:text-foreground" to="/$slug" params={{ slug: "rent-a-car-cluj-napoca" }}>
              Cluj-Napoca
            </Link>
            <Link className="transition-colors hover:text-foreground" to="/$slug" params={{ slug: "rent-a-car-aeroport-cluj" }}>
              Aeroport
            </Link>
            <Link className="transition-colors hover:text-foreground" to="/blog">
              Blog
            </Link>
            <a className="transition-colors hover:text-foreground" href="#contact">
              Contact
            </a>
          </nav>
          <a href="tel:+40742925934" className="btn-base btn-primary px-5 py-2.5 text-sm">
            <Phone className="h-4 w-4" /> Rezervă
          </a>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="relative isolate overflow-hidden">
          <img
            src={heroCar}
            alt="Flota DCO Rent a Car în Gilău, Cluj: mașini pregătite pentru închiriere"
            width={1600}
            height={1008}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(100deg,oklch(0.17_0.03_262/0.95)_0%,oklch(0.2_0.05_262/0.85)_52%,oklch(0.2_0.05_262/0.3)_100%)]" />
          <div className="relative mx-auto max-w-6xl px-5 py-24 md:py-32">
            <p className="eyebrow text-signal">Cluj · Gilău · Florești</p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] text-ink-foreground md:text-6xl">
              Rent a Car Cluj-Napoca — mașini de închiriat de la 70 lei/zi.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-foreground/80 md:text-lg">
              DCO Rent a Car închiriază autoturisme în stare perfectă de
              funcționare, cu AC, ITP, rovinietă și asigurare. Predare personală
              în Gilău, mașini verificate înainte de predare. Prețuri negociabile
              în funcție de mașina aleasă și de durata închirierii.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#contact" className="btn-base btn-signal">
                Cere o ofertă <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#flota" className="btn-base btn-outline-ink">
                Vezi flota
              </a>
            </div>
            <dl className="mt-14 grid max-w-2xl grid-cols-2 gap-6 border-t border-ink-foreground/15 pt-8 md:grid-cols-4">
              {[
                ["70 lei", "tarif de la / zi"],
                ["8 mașini", "în flotă"],
                ["ITP + RCA", "incluse"],
                ["Gilău", "predare personală"],
              ].map(([big, small]) => (
                <div key={small}>
                  <dt className="font-display text-2xl font-bold text-ink-foreground">
                    {big}
                  </dt>
                  <dd className="mt-1 text-sm text-ink-foreground/70">{small}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Flota */}
        <section id="flota" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <p className="eyebrow">Flota</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold md:text-4xl">
            Mașini disponibile, manuale și automate
          </h2>

          {/* Verificator de disponibilitate pe interval */}
          <div className="mt-8 card-eco p-5 md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="grid flex-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="avail-from"
                    className="block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground"
                  >
                    Preluare
                  </label>
                  <input
                    id="avail-from"
                    type="date"
                    value={from}
                    min={todayISO()}
                    onChange={(e) => {
                      setFrom(e.target.value || todayISO());
                      if (to < e.target.value) setTo(e.target.value);
                    }}
                    className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="avail-to"
                    className="block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground"
                  >
                    Returnare
                  </label>
                  <input
                    id="avail-to"
                    type="date"
                    value={rangeTo}
                    min={from}
                    onChange={(e) => setTo(e.target.value || from)}
                    className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm"
                  />
                </div>
              </div>
              <p
                aria-live="polite"
                className="flex items-center gap-2 text-sm font-semibold text-muted-foreground"
              >
                <CalendarDays className="h-4 w-4 text-primary" />
                {availableCount} din {fleetItems.length} disponibile ·{" "}
                {formatRangeRo(from, rangeTo)}
              </p>
            </div>
          </div>

          <div ref={fleetRef} className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {fleetItems.map((c) => (
              <article
                key={c.name}
                {...(c.id ? { "data-vehicle-id": c.id } : {})}
                tabIndex={0}
                aria-disabled={c.busy}
                title={
                  c.busy
                    ? `Indisponibilă în perioada ${formatRangeRo(from, rangeTo)} — ${c.busyLabel}`
                    : undefined
                }
                className={`card-eco group relative overflow-hidden transition ${
                  c.busy ? "opacity-70 ring-1 ring-destructive/30" : ""
                }`}
              >
                <VehicleGallery
                  images={c.images.length > 0 ? c.images : [c.img]}
                  name={c.name}
                  busy={c.busy}
                  busyLabel={c.busyLabel}
                  rangeLabel={formatRangeRo(from, rangeTo)}
                  freeFromLabel={
                    c.freeFrom ? ` · liberă din ${formatRangeRo(c.freeFrom, c.freeFrom)}` : ""
                  }
                />
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold">{c.name}</h3>
                    <span className="whitespace-nowrap rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                      {c.price}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{c.example}</p>
                  <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-1.5">
                      <Users className="h-4 w-4 text-primary" /> {c.specs[0]}
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Settings2 className="h-4 w-4 text-primary" /> {c.specs[1]}
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Fuel className="h-4 w-4 text-primary" /> {c.specs[2]}
                    </li>
                  </ul>
                  {c.busy ? (
                    <p className="mt-5 rounded-lg bg-destructive/10 px-3 py-2 text-xs font-semibold leading-relaxed text-destructive">
                      Indisponibilă {formatRangeRo(from, rangeTo)} · {c.busyLabel}
                      {c.freeFrom ? ` · liberă din ${formatRangeRo(c.freeFrom, c.freeFrom)}` : ""}
                    </p>
                  ) : (
                    <a
                      href="#contact"
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                    >
                      Rezervă această mașină <ArrowRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
          <div className="mt-12 card-eco p-6 md:p-8">

            <p className="text-sm text-muted-foreground">
              Disponibilitatea variază în funcție de perioadă. Sunați la{" "}
              <a href="tel:+40742925934" className="font-semibold text-primary">
                (0742) 925 934
              </a>{" "}
              pentru mașina și prețul exact.
            </p>
          </div>
        </section>


        {/* Avantaje */}
        <section id="avantaje" className="bg-surface py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <p className="eyebrow">De ce DCO</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold md:text-4xl">
              Închiriere fără birocrație și fără costuri ascunse
            </h2>
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {perks.map(({ icon: Icon, title, text }) => (
                <article key={title} className="card-eco p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                    <Icon className="h-5 w-5" strokeWidth={2.2} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Proces */}
        <section id="proces" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <p className="eyebrow">Cum funcționează</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold md:text-4xl">
            Patru pași de la telefon la volan
          </h2>
          <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <li key={s.n} className="border-t-2 border-primary pt-5">
                <span className="font-display text-sm font-bold tracking-widest text-primary">
                  {s.n}
                </span>
                <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.text}
                </p>
              </li>
            ))}
          </ol>
          <div className="mt-12 card-eco p-6 md:p-8">
            <h3 className="text-lg font-semibold">Condiții de închiriere</h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {conditions.map((c) => (
                <li key={c} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section id="intrebari" className="bg-surface py-20 md:py-28">
          <div className="mx-auto max-w-3xl px-5">
            <p className="eyebrow">Întrebări frecvente</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Tot ce trebuie să știți despre închirierea unei mașini în Cluj
            </h2>
            <div className="mt-10 divide-y divide-border">
              {faq.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold">
                    <h3 className="text-base font-semibold">{f.q}</h3>
                    <ArrowRight className="h-4 w-4 shrink-0 text-primary transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>



        {/* Zone deservite — linkuri interne SEO */}
        <section id="zone" className="py-20 md:py-24">
          <div className="mx-auto max-w-6xl px-5">
            <p className="eyebrow">Zone deservite</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold md:text-4xl">
              Rent a Car Cluj-Napoca, Gilău, Florești și Aeroport Cluj
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Fiecare zonă are pagina proprie, cu tarife, mod de predare și întrebări
              frecvente. Alegeți localitatea sau tipul de închiriere care vă interesează.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {locations.map((l) => (
                <Link
                  key={l.slug}
                  to="/$slug"
                  params={{ slug: l.slug }}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3.5 transition-colors hover:border-primary"
                >
                  <span className="font-semibold">{l.linkTitle ?? `Rent a Car ${l.city}`}</span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}

        <section id="contact" className="surface-ink">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:py-28 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="eyebrow text-signal">Contact</p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                Spuneți-ne perioada și vă trimitem tariful
              </h2>
              <p className="mt-4 max-w-lg text-ink-foreground/75">
                Răspundem rapid la telefon și WhatsApp, inclusiv pentru
                rezervări de ultim moment sau curse de la aeroport.
              </p>
              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                <a
                  href="tel:+40742925934"
                  className="flex items-start gap-3 rounded-xl border border-ink-foreground/15 p-4 transition-colors hover:bg-ink-foreground/10"
                >
                  <Phone className="mt-0.5 h-5 w-5 text-signal" />
                  <span>
                    <span className="block text-xs uppercase tracking-widest text-ink-foreground/60">
                      Telefon / WhatsApp
                    </span>
                    <span className="font-semibold">(0742) 925 934</span>
                    <span className="block text-xs text-ink-foreground/60">Ovidiu Danciu</span>
                  </span>
                </a>
                <a
                  href="mailto:Ovidiu_danciu@yahoo.com"
                  className="flex items-start gap-3 rounded-xl border border-ink-foreground/15 p-4 transition-colors hover:bg-ink-foreground/10"
                >
                  <Mail className="mt-0.5 h-5 w-5 text-signal" />
                  <span>
                    <span className="block text-xs uppercase tracking-widest text-ink-foreground/60">
                      E-mail
                    </span>
                    <span className="font-semibold">Ovidiu_danciu@yahoo.com</span>
                  </span>
                </a>
                <div className="flex items-start gap-3 rounded-xl border border-ink-foreground/15 p-4">
                  <MapPin className="mt-0.5 h-5 w-5 text-signal" />
                  <span>
                    <span className="block text-xs uppercase tracking-widest text-ink-foreground/60">
                      Punct de predare
                    </span>
                    <span className="font-semibold">
                      Gilău, județul Cluj (predare personală)
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <BookingForm />

          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-background">
        <div className="mx-auto max-w-6xl px-5 py-8">
          <nav aria-label="Zone și servicii" className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
            {locations.map((l) => (
              <Link
                key={l.slug}
                className="text-muted-foreground transition-colors hover:text-foreground"
                to="/$slug"
                params={{ slug: l.slug }}
              >
                {l.linkTitle ?? `Rent a Car ${l.city}`}
              </Link>
            ))}
            <Link className="text-muted-foreground transition-colors hover:text-foreground" to="/blog">
              Blog
            </Link>
          </nav>

          <div className="mt-6 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
            <p className="font-semibold text-foreground">DCO RENT A CAR CLUJ</p>
            <p>Gilău · Cluj-Napoca · Florești</p>
            <p>© {new Date().getFullYear()} Toate drepturile rezervate.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const FIELD_CLASS =
  "mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/25";

function BookingForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pickup, setPickup] = useState("");
  const [ret, setRet] = useState("");
  const [details, setDetails] = useState("");
  const [sent, setSent] = useState(false);

  const message = [
    "Cerere de rezervare — DCO Rent a Car",
    `Nume / firmă: ${name}`,
    `Telefon: ${phone}`,
    `Preluare: ${pickup || "—"}`,
    `Retur: ${ret || "—"}`,
    `Detalii: ${details || "—"}`,
  ].join("\n");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    window.open(
      `https://wa.me/40742925934?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setSent(true);
  }

  const mailto = `mailto:Ovidiu_danciu@yahoo.com?subject=${encodeURIComponent(
    "Cerere de rezervare — DCO Rent a Car",
  )}&body=${encodeURIComponent(message)}`;

  return (
    <form
      className="rounded-2xl bg-card p-6 text-card-foreground shadow-[var(--shadow-lift)]"
      onSubmit={handleSubmit}
    >
      <h3 className="text-lg font-semibold">Cerere de rezervare</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Completați datele și vă confirmăm disponibilitatea.
      </p>
      <div className="mt-5 space-y-4">
        <label className="block" htmlFor="rezervare-nume">
          <span className="text-sm font-medium">Nume / firmă</span>
          <input
            id="rezervare-nume"
            name="nume"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={FIELD_CLASS}
          />
        </label>
        <label className="block" htmlFor="rezervare-telefon">
          <span className="text-sm font-medium">Telefon</span>
          <input
            id="rezervare-telefon"
            name="telefon"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={FIELD_CLASS}
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block" htmlFor="rezervare-preluare">
            <span className="text-sm font-medium">Preluare</span>
            <input
              id="rezervare-preluare"
              name="preluare"
              type="date"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className={FIELD_CLASS}
            />
          </label>
          <label className="block" htmlFor="rezervare-retur">
            <span className="text-sm font-medium">Retur</span>
            <input
              id="rezervare-retur"
              name="retur"
              type="date"
              value={ret}
              onChange={(e) => setRet(e.target.value)}
              className={FIELD_CLASS}
            />
          </label>
        </div>
        <label className="block" htmlFor="rezervare-detalii">
          <span className="text-sm font-medium">Clasa dorită / detalii</span>
          <textarea
            id="rezervare-detalii"
            name="detalii"
            rows={3}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className={`${FIELD_CLASS} resize-none`}
            placeholder="Ex: VW Passat automat, preluare din Gilău la 18:00, 5 zile"
          />
        </label>

      </div>
      <button type="submit" className="btn-base btn-primary mt-6 w-full">
        Trimite cererea pe WhatsApp
      </button>
      <a href={mailto} className="btn-base btn-outline-ink mt-3 w-full justify-center">
        <Mail className="h-4 w-4" /> Trimite pe e-mail
      </a>
      {sent ? (
        <p className="mt-3 rounded-lg bg-primary/10 px-3 py-2 text-xs font-medium text-foreground">
          Cererea a fost pregătită în WhatsApp. Dacă nu s-a deschis, folosiți butonul de e-mail sau
          sunați direct.
        </p>
      ) : null}
      <p className="mt-3 text-xs text-muted-foreground">
        Sau apelați direct:{" "}
        <a href="tel:+40742925934" className="underline">
          (0742) 925 934
        </a>
      </p>
    </form>
  );
}
