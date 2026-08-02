import { createFileRoute } from "@tanstack/react-router";
import {
  Car,
  KeyRound,
  ShieldCheck,
  Plane,
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
} from "lucide-react";

import heroCar from "@/assets/hero-car.jpg";
import carEconomy from "@/assets/car-economy.jpg";
import carSedan from "@/assets/car-sedan.jpg";
import carVan from "@/assets/car-van.jpg";

const SITE = "https://dcorentacarcluj.ro";
const TITLE = "Rent a Car Cluj & Gilău | Închirieri auto Aeroport Cluj – DCO";
const DESCRIPTION =
  "Închirieri auto Cluj de la 22 €/zi: predare gratuită la Aeroportul Cluj, Gilău și Cluj-Napoca. Kilometraj nelimitat, garanție mică, rezervare în 10 minute.";

const faq = [
  {
    q: "Cât costă închirierea unei mașini în Cluj?",
    a: "Tarifele DCO Rent a Car pornesc de la 22 €/zi pentru clasa economy, 39 €/zi pentru clasa business și 55 €/zi pentru minivanul de 7 locuri. Prețul include RCA, rovinieta și kilometraj nelimitat în România.",
  },
  {
    q: "Pot ridica mașina de la Aeroportul Internațional Cluj?",
    a: "Da. Predăm și preluăm mașina în parcarea Aeroportului Cluj la ora aterizării sau a plecării, fără costuri suplimentare, 24/7.",
  },
  {
    q: "Ce documente sunt necesare pentru închiriere?",
    a: "Aveți nevoie de permis de conducere valabil de minimum 1 an, carte de identitate sau pașaport și vârsta minimă de 21 de ani.",
  },
  {
    q: "Cât este garanția?",
    a: "Garanția este mică, iar cu pachetul full cover puteți închiria fără blocarea unei sume pe card.",
  },
  {
    q: "Pot ieși din țară cu mașina închiriată?",
    a: "Da, pe baza unui acord scris solicitat înainte de plecare. Vă pregătim documentele necesare pentru trecerea frontierei.",
  },
  {
    q: "Cum rezerv o mașină în Gilău sau Cluj-Napoca?",
    a: "Ne sunați la (0742) 925 934, ne scrieți pe WhatsApp sau completați formularul de pe site. Confirmăm disponibilitatea în aproximativ 10 minute.",
  },
];

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "rent a car cluj, inchirieri auto cluj, inchirieri auto gilau, rent a car aeroport cluj, masini de inchiriat cluj napoca",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "author", content: "DCO Rent a Car Cluj" },
      { name: "geo.region", content: "RO-CJ" },
      { name: "geo.placename", content: "Gilău, Cluj" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE },
      { property: "og:locale", content: "ro_RO" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [
      { rel: "canonical", href: SITE },
      { rel: "alternate", hrefLang: "ro-RO", href: SITE },
      { rel: "alternate", hrefLang: "x-default", href: SITE },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AutoRental",
          "@id": `${SITE}#business`,
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
            { "@type": "AdministrativeArea", name: "Județul Cluj" },
          ],
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ],
              opens: "08:00",
              closes: "20:00",
            },
          ],
          makesOffer: [
            {
              "@type": "Offer",
              name: "Închiriere auto clasa Economy",
              price: "22",
              priceCurrency: "EUR",
              eligibleDuration: { "@type": "QuantitativeValue", value: 1, unitCode: "DAY" },
            },
            {
              "@type": "Offer",
              name: "Închiriere auto clasa Business",
              price: "39",
              priceCurrency: "EUR",
              eligibleDuration: { "@type": "QuantitativeValue", value: 1, unitCode: "DAY" },
            },
            {
              "@type": "Offer",
              name: "Închiriere minivan 7 locuri",
              price: "55",
              priceCurrency: "EUR",
              eligibleDuration: { "@type": "QuantitativeValue", value: 1, unitCode: "DAY" },
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
    ],
  }),
});

const fleet = [
  {
    img: carEconomy,
    name: "Clasa Economy",
    example: "VW Polo, Skoda Fabia sau similar",
    price: "de la 22 €/zi",
    specs: ["4 locuri", "Manuală", "Benzină 5.2 l"],
  },
  {
    img: carSedan,
    name: "Clasa Business",
    example: "Skoda Octavia, VW Passat sau similar",
    price: "de la 39 €/zi",
    specs: ["5 locuri", "Automată", "Diesel 5.8 l"],
  },
  {
    img: carVan,
    name: "Minivan 7 locuri",
    example: "VW Touran, Opel Zafira sau similar",
    price: "de la 55 €/zi",
    specs: ["7 locuri", "Manuală", "Diesel 6.4 l"],
  },
];

const perks = [
  {
    icon: Plane,
    title: "Predare la Aeroportul Cluj",
    text: "Vă așteptăm cu mașina în parcarea aeroportului, la ora aterizării. Predare și retur fără costuri suplimentare.",
  },
  {
    icon: CreditCard,
    title: "Tarife clare, fără surprize",
    text: "Prețul include asigurarea RCA, rovinieta și kilometraj nelimitat în România. Fără taxe ascunse la retur.",
  },
  {
    icon: ShieldCheck,
    title: "Garanție mică sau zero",
    text: "Alegeți pachetul full cover și plecați fără blocarea unei sume mari pe card.",
  },
  {
    icon: BadgeCheck,
    title: "Mașini verificate",
    text: "Fiecare auto trece prin service și curățenie completă înainte de fiecare închiriere.",
  },
  {
    icon: Clock,
    title: "Rezervare în 10 minute",
    text: "Un telefon sau un mesaj și confirmăm disponibilitatea pe loc, inclusiv în weekend.",
  },
  {
    icon: KeyRound,
    title: "Închirieri lungi",
    text: "Tarife speciale pentru perioade de peste 7, 30 sau 90 de zile, pentru persoane fizice și firme.",
  },
];

const steps = [
  { n: "01", title: "Alegeți mașina", text: "Ne spuneți perioada și clasa dorită." },
  { n: "02", title: "Confirmăm", text: "Primiți tariful final și confirmarea rezervării." },
  { n: "03", title: "Preluați auto", text: "În Gilău, Cluj-Napoca sau la aeroport." },
  { n: "04", title: "Returnați simplu", text: "Verificare rapidă și eliberarea garanției." },
];

const conditions = [
  "Vârstă minimă 21 de ani",
  "Permis auto valabil de minimum 1 an",
  "Carte de identitate sau pașaport",
  "Kilometraj nelimitat în România",
  "Ieșire din țară pe bază de acord scris",
  "Plata cash sau card",
];

function Index() {
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
            alt="Mașină de închiriat de la DCO Rent a Car pe un drum din județul Cluj la apus"
            width={1600}
            height={1008}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(100deg,oklch(0.17_0.03_262/0.95)_0%,oklch(0.2_0.05_262/0.85)_52%,oklch(0.2_0.05_262/0.3)_100%)]" />
          <div className="relative mx-auto max-w-6xl px-5 py-24 md:py-32">
            <p className="eyebrow text-signal">Închirieri auto în județul Cluj</p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] text-ink-foreground md:text-6xl">
              Mașina potrivită, pregătită de plecare când aterizați în Cluj.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-foreground/80 md:text-lg">
              DCO Rent a Car Cluj închiriază mașini verificate, cu tarife clare
              și kilometraj nelimitat. Predare în Gilău, Cluj-Napoca sau direct
              la Aeroportul Internațional Cluj.
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
                ["22 €", "tarif de la / zi"],
                ["0 km", "limită de rulaj"],
                ["24/7", "predare la aeroport"],
                ["10 min", "confirmare rezervare"],
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
            Trei clase care acoperă orice drum din Transilvania
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {fleet.map((c) => (
              <article key={c.name} className="card-eco overflow-hidden">
                <img
                  src={c.img}
                  alt={`${c.name} disponibilă la închiriere în Cluj`}
                  width={1200}
                  height={900}
                  loading="lazy"
                  className="h-48 w-full bg-surface object-cover"
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
                  <a
                    href="#contact"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                  >
                    Verifică disponibilitatea <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Modelele sunt orientative, în funcție de disponibilitatea din flotă
            la data rezervării.
          </p>
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
                      Gilău, Cluj · Aeroport Cluj
                    </span>
                  </span>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-ink-foreground/15 p-4">
                  <Clock className="mt-0.5 h-5 w-5 text-signal" />
                  <span>
                    <span className="block text-xs uppercase tracking-widest text-ink-foreground/60">
                      Program
                    </span>
                    <span className="font-semibold">Luni – Duminică, 08:00 – 20:00</span>
                  </span>
                </div>
              </div>
            </div>

            <form
              className="rounded-2xl bg-card p-6 text-card-foreground shadow-[var(--shadow-lift)]"
              onSubmit={(e) => e.preventDefault()}
            >
              <h3 className="text-lg font-semibold">Cerere de rezervare</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Completați datele și vă confirmăm disponibilitatea.
              </p>
              <div className="mt-5 space-y-4">
                <label className="block">
                  <span className="text-sm font-medium">Nume / firmă</span>
                  <input
                    type="text"
                    required
                    className="mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/25"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium">Telefon</span>
                  <input
                    type="tel"
                    required
                    className="mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/25"
                  />
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-medium">Preluare</span>
                    <input
                      type="date"
                      className="mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/25"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium">Retur</span>
                    <input
                      type="date"
                      className="mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/25"
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="text-sm font-medium">Clasa dorită / detalii</span>
                  <textarea
                    rows={3}
                    className="mt-1.5 w-full resize-none rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/25"
                    placeholder="Ex: minivan 7 locuri, preluare de la Aeroport Cluj la 21:30"
                  />
                </label>
              </div>
              <button type="submit" className="btn-base btn-primary mt-6 w-full">
                Trimite cererea
              </button>
              <p className="mt-3 text-xs text-muted-foreground">
                Sau apelați direct: <a href="tel:+40742925934" className="underline">(0742) 925 934</a>
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-background">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p className="font-semibold text-foreground">DCO RENT A CAR CLUJ</p>
          <p>Gilău · Cluj-Napoca · Aeroport Internațional Cluj</p>
          <p>© {new Date().getFullYear()} Toate drepturile rezervate.</p>
        </div>
      </footer>
    </div>
  );
}
