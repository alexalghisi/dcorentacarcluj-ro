import { createFileRoute } from "@tanstack/react-router";
import {
  Recycle,
  Truck,
  Factory,
  FileCheck2,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  Scale,
  Leaf,
} from "lucide-react";

import heroYard from "@/assets/hero-yard.jpg";
import scrapMetal from "@/assets/scrap-metal.jpg";
import collection from "@/assets/collection.jpg";

const TITLE = "Danciu Eco Recycling — Colectare deșeuri reciclabile, Cluj";
const DESCRIPTION =
  "Danciu Eco Recycling SRL, Gilău – Cluj: colectare și valorificare deșeuri nepericuloase, fier vechi, metale, hârtie, carton și plastic. Ridicare rapidă, cântărire corectă, documente legale.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Danciu Eco Recycling SRL",
          description: DESCRIPTION,
          address: {
            "@type": "PostalAddress",
            streetAddress: "Strada Principală nr. 17",
            addressLocality: "Gilău",
            addressRegion: "Cluj",
            postalCode: "407310",
            addressCountry: "RO",
          },
          areaServed: "Județul Cluj",
          taxID: "RO43460142",
        }),
      },
    ],
  }),
});

const services = [
  {
    icon: Recycle,
    title: "Colectare deșeuri nepericuloase",
    text: "Hârtie, carton, folie și plastic, lemn, deșeuri municipale reciclabile — colectate selectiv și pregătite pentru valorificare.",
  },
  {
    icon: Scale,
    title: "Fier vechi și metale",
    text: "Achiziție fier vechi, aluminiu, cupru, inox și baterii auto. Cântărire pe cântar verificat metrologic, plata pe loc.",
  },
  {
    icon: Truck,
    title: "Ridicare cu utilajul nostru",
    text: "Punem la dispoziție containere și transport propriu. Încărcăm, cântărim și eliberăm documentele la fața locului.",
  },
  {
    icon: Factory,
    title: "Servicii pentru firme",
    text: "Contracte de preluare periodică pentru hale, ateliere, șantiere și magazine, cu raportare pentru evidența deșeurilor.",
  },
  {
    icon: FileCheck2,
    title: "Documente și conformitate",
    text: "Formulare de încărcare-descărcare, avize și note de cântar — dosarul dumneavoastră de mediu rămâne în regulă.",
  },
  {
    icon: Leaf,
    title: "Dezmembrări și golire spații",
    text: "Golim curți, poduri și hale de utilaje, țevi, tâmplărie metalică și echipamente scoase din uz.",
  },
];

const steps = [
  {
    n: "01",
    title: "Ne sunați",
    text: "Ne spuneți ce material aveți, cantitatea estimată și locația.",
  },
  {
    n: "02",
    title: "Primiți prețul",
    text: "Vă comunicăm prețul zilei pe kilogram sau pe tonă, fără costuri ascunse.",
  },
  {
    n: "03",
    title: "Ridicăm materialul",
    text: "Venim cu mașina și utilajul potrivit, încărcăm și cântărim în prezența dumneavoastră.",
  },
  {
    n: "04",
    title: "Plată și documente",
    text: "Plata se face imediat, iar firmele primesc toate documentele de trasabilitate.",
  },
];

const materials = [
  "Fier vechi",
  "Aluminiu",
  "Cupru și bronz",
  "Inox",
  "Baterii auto",
  "Hârtie și carton",
  "Folie și PET",
  "Cabluri",
  "Tâmplărie metalică",
  "Utilaje scoase din uz",
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Recycle className="h-5 w-5" strokeWidth={2.4} />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-sm font-bold tracking-tight">
                DANCIU ECO RECYCLING
              </span>
              <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Gilău · Cluj
              </span>
            </span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
            <a className="transition-colors hover:text-foreground" href="#servicii">
              Servicii
            </a>
            <a className="transition-colors hover:text-foreground" href="#materiale">
              Materiale
            </a>
            <a className="transition-colors hover:text-foreground" href="#proces">
              Cum lucrăm
            </a>
            <a className="transition-colors hover:text-foreground" href="#contact">
              Contact
            </a>
          </nav>
          <a href="tel:+40700000000" className="btn-base btn-primary px-5 py-2.5 text-sm">
            <Phone className="h-4 w-4" /> Sună acum
          </a>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="relative isolate overflow-hidden">
          <img
            src={heroYard}
            alt="Platformă de colectare și sortare a deșeurilor reciclabile din județul Cluj"
            width={1600}
            height={1008}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(100deg,oklch(0.19_0.03_150/0.94)_0%,oklch(0.22_0.04_150/0.82)_52%,oklch(0.22_0.04_150/0.35)_100%)]" />
          <div className="relative mx-auto max-w-6xl px-5 py-24 md:py-32">
            <p className="eyebrow text-signal">Reciclare responsabilă din 2020</p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] text-ink-foreground md:text-6xl">
              Deșeurile dumneavoastră au valoare. Le ridicăm, le cântărim corect
              și le trimitem la reciclare.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-foreground/80 md:text-lg">
              Danciu Eco Recycling colectează fier vechi, metale, hârtie, carton
              și plastic de la persoane fizice, firme și șantiere din Gilău,
              Cluj-Napoca și restul județului Cluj.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#contact" className="btn-base btn-signal">
                Cere prețul zilei <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#servicii" className="btn-base btn-outline-ink">
                Vezi serviciile
              </a>
            </div>
            <dl className="mt-14 grid max-w-2xl grid-cols-2 gap-6 border-t border-ink-foreground/15 pt-8 md:grid-cols-4">
              {[
                ["5+", "ani de activitate"],
                ["CAEN 3811", "colectare deșeuri"],
                ["Cluj", "județ acoperit"],
                ["24-48h", "timp de ridicare"],
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

        {/* Servicii */}
        <section id="servicii" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <p className="eyebrow">Servicii</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold md:text-4xl">
            Un singur partener pentru tot ce poate fi reciclat
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map(({ icon: Icon, title, text }) => (
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
        </section>

        {/* Materiale */}
        <section id="materiale" className="bg-surface py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
            <div>
              <p className="eyebrow">Materiale acceptate</p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                Ce preluăm de la dumneavoastră
              </h2>
              <p className="mt-4 text-muted-foreground">
                Preluăm cantități mici de la persoane fizice și volume mari,
                periodice, de la firme. Dacă materialul nu apare în listă,
                întrebați-ne — cel mai probabil îl putem valorifica.
              </p>
              <ul className="mt-8 flex flex-wrap gap-2.5">
                {materials.map((m) => (
                  <li
                    key={m}
                    className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium"
                  >
                    {m}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <p className="text-sm text-muted-foreground">
                  Nu colectăm deșeuri periculoase. Lucrăm exclusiv cu deșeuri
                  nepericuloase, conform codului CAEN 3811.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src={scrapMetal}
                alt="Baluri de metal comprimat pregătite pentru reciclare"
                width={1200}
                height={900}
                loading="lazy"
                className="h-64 w-full rounded-2xl object-cover shadow-[var(--shadow-card)] md:h-80"
              />
              <img
                src={collection}
                alt="Operator care încarcă carton și plastic sortat în container"
                width={1200}
                height={900}
                loading="lazy"
                className="mt-8 h-64 w-full rounded-2xl object-cover shadow-[var(--shadow-card)] md:h-80"
              />
            </div>
          </div>
        </section>

        {/* Proces */}
        <section id="proces" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <p className="eyebrow">Cum lucrăm</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold md:text-4xl">
            Patru pași, fără birocrație inutilă
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
        </section>

        {/* Contact */}
        <section id="contact" className="surface-ink">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:py-28 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="eyebrow text-signal">Contact</p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                Spuneți-ne ce aveți de ridicat
              </h2>
              <p className="mt-4 max-w-lg text-ink-foreground/75">
                Răspundem la telefon în timpul programului și programăm ridicarea
                în 24-48 de ore în zona Gilău – Cluj-Napoca.
              </p>
              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                <a
                  href="tel:+40700000000"
                  className="flex items-start gap-3 rounded-xl border border-ink-foreground/15 p-4 transition-colors hover:bg-ink-foreground/10"
                >
                  <Phone className="mt-0.5 h-5 w-5 text-signal" />
                  <span>
                    <span className="block text-xs uppercase tracking-widest text-ink-foreground/60">
                      Telefon
                    </span>
                    <span className="font-semibold">0700 000 000</span>
                  </span>
                </a>
                <a
                  href="mailto:contact@danciuecorecycling.ro"
                  className="flex items-start gap-3 rounded-xl border border-ink-foreground/15 p-4 transition-colors hover:bg-ink-foreground/10"
                >
                  <Mail className="mt-0.5 h-5 w-5 text-signal" />
                  <span>
                    <span className="block text-xs uppercase tracking-widest text-ink-foreground/60">
                      E-mail
                    </span>
                    <span className="font-semibold">
                      contact@danciuecorecycling.ro
                    </span>
                  </span>
                </a>
                <div className="flex items-start gap-3 rounded-xl border border-ink-foreground/15 p-4">
                  <MapPin className="mt-0.5 h-5 w-5 text-signal" />
                  <span>
                    <span className="block text-xs uppercase tracking-widest text-ink-foreground/60">
                      Punct de lucru
                    </span>
                    <span className="font-semibold">
                      Str. Principală nr. 17, Gilău, Cluj
                    </span>
                  </span>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-ink-foreground/15 p-4">
                  <Clock className="mt-0.5 h-5 w-5 text-signal" />
                  <span>
                    <span className="block text-xs uppercase tracking-widest text-ink-foreground/60">
                      Program
                    </span>
                    <span className="font-semibold">Luni – Sâmbătă, 08:00 – 18:00</span>
                  </span>
                </div>
              </div>
            </div>

            <form
              className="rounded-2xl bg-card p-6 text-card-foreground shadow-[var(--shadow-lift)]"
              onSubmit={(e) => e.preventDefault()}
            >
              <h3 className="text-lg font-semibold">Cerere de ridicare</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Completați datele și vă contactăm cu prețul zilei.
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
                <label className="block">
                  <span className="text-sm font-medium">Material și cantitate</span>
                  <textarea
                    rows={4}
                    className="mt-1.5 w-full resize-none rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/25"
                    placeholder="Ex: aprox. 2 tone fier vechi, curte în Gilău"
                  />
                </label>
              </div>
              <button type="submit" className="btn-base btn-primary mt-6 w-full">
                Trimite cererea
              </button>
              <p className="mt-3 text-xs text-muted-foreground">
                Sau apelați direct: 0700 000 000
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-background">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p className="font-semibold text-foreground">DANCIU ECO RECYCLING S.R.L.</p>
          <p>CUI 43460142 · J12/4198/2020 · Gilău, județul Cluj</p>
          <p>© {new Date().getFullYear()} Toate drepturile rezervate.</p>
        </div>
      </footer>
    </div>
  );
}
