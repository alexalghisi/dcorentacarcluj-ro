import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Car, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { SponsoredLink } from "@/components/SponsoredLink";
import { contactMessageSchema } from "@/lib/contact";
import { submitContactMessage } from "@/lib/contact.functions";
import { canonical, canonicalLinks, SITE_URL, socialImageMeta } from "@/lib/seo";

const PATH = "/contact";
const TITLE = "Contact rent a car Cluj | DCO Gilău, Florești, Huedin";
const DESCRIPTION =
  "Contactează DCO Rent a Car pentru închirieri auto în Cluj-Napoca, Florești, Gilău și Huedin. Scrie-ne pe e-mail sau sună la (0742) 925 934.";
const PHONE_DISPLAY = "(0742) 925 934";
const PHONE_HREF = "tel:+40742925934";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "contact rent a car cluj, telefon inchirieri auto cluj, dco rent a car, inchiriere masina cluj napoca, rent a car floresti, rent a car gilau, rent a car huedin",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: canonical(PATH) },
      { property: "og:locale", content: "ro_RO" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      ...socialImageMeta("Contact DCO Rent a Car Cluj"),
    ],
    links: canonicalLinks(PATH),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "@id": `${SITE_URL}${PATH}#webpage`,
          name: TITLE,
          description: DESCRIPTION,
          inLanguage: "ro-RO",
          url: canonical(PATH),
          mainEntity: {
            "@type": "AutoRental",
            name: "DCO Rent a Car Cluj",
            telephone: "+40742925934",
            email: "Ovidiu_danciu@yahoo.com",
            url: SITE_URL,
            address: {
              "@type": "PostalAddress",
              addressLocality: "Gilău",
              addressRegion: "Cluj",
              addressCountry: "RO",
            },
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Acasă", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Contact", item: canonical(PATH) },
          ],
        }),
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const submit = useServerFn(submitContactMessage);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setError("");
    const parsed = contactMessageSchema.safeParse({ name, email, message });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Verifică datele.");
      return;
    }
    setSubmitting(true);
    try {
      const response = await submit({ data: parsed.data });
      if (response.ok) setSent(true);
      else setError(response.error);
    } catch {
      setError("Nu am putut trimite mesajul. Sună la (0742) 925 934.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
          <Link to="/" className="flex items-center gap-2.5">
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
          </Link>
          <Link to="/rezervare" className="btn-base btn-primary px-5 py-2.5 text-sm">
            Rezervă
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-14">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            Acasă
          </Link>
          <span className="px-2">/</span>
          <span className="text-foreground">Contact</span>
        </nav>
        <div className="mt-8 grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="eyebrow">Contact</p>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
              Scrie-ne pentru o mașină de închiriat în Cluj
            </h1>
            <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
              Lasă numele, e-mailul și mesajul. Îl primim direct și îți răspundem pe e-mail. Pentru o
              perioadă anume, poți și{" "}
              <Link to="/rezervare" className="font-semibold text-primary hover:underline">
                rezerva online
              </Link>
              .
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <a
                href={PHONE_HREF}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-accent"
              >
                <Phone className="mt-0.5 h-5 w-5 text-primary" />
                <span>
                  <span className="block text-xs uppercase tracking-widest text-muted-foreground">
                    Telefon
                  </span>
                  <span className="font-semibold">{PHONE_DISPLAY}</span>
                </span>
              </a>
              <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                <span>
                  <span className="block text-xs uppercase tracking-widest text-muted-foreground">
                    Predare
                  </span>
                  <span className="font-semibold">Gilău, Florești sau Cluj-Napoca</span>
                </span>
              </div>
            </div>
          </div>
          <form
            className="rounded-2xl bg-card p-6 text-card-foreground shadow-[var(--shadow-lift)]"
            onSubmit={onSubmit}
          >
            <h2 className="text-lg font-semibold">Mesaj</h2>
            <p className="mt-1 text-sm text-muted-foreground">Nume, e-mail și ce ai nevoie.</p>
            <div className="mt-5 space-y-4">
              <label className="block" htmlFor="contact-nume">
                <span className="text-sm font-medium">Nume</span>
                <input
                  id="contact-nume"
                  name="nume"
                  type="text"
                  required
                  autoComplete="name"
                  maxLength={120}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/25"
                />
              </label>
              <label className="block" htmlFor="contact-email">
                <span className="text-sm font-medium">E-mail</span>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  maxLength={255}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/25"
                />
              </label>
              <label className="block" htmlFor="contact-mesaj">
                <span className="text-sm font-medium">Mesaj</span>
                <textarea
                  id="contact-mesaj"
                  name="mesaj"
                  required
                  rows={5}
                  maxLength={2000}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  className="mt-1.5 w-full resize-none rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/25"
                />
              </label>
            </div>
            <button type="submit" disabled={submitting} className="btn-base btn-primary mt-6 w-full disabled:opacity-60">
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
              {submitting ? "Se trimite…" : "Trimite mesajul"}
            </button>
            {error ? (
              <p role="alert" className="mt-3 text-sm text-destructive">
                {error}
              </p>
            ) : null}
            {sent ? (
              <p className="mt-3 rounded-lg bg-primary/10 px-3 py-2 text-xs font-medium text-foreground">
                Mesajul a plecat. Îți răspundem pe e-mail. Dacă nu primești confirmarea, sună la{" "}
                {PHONE_DISPLAY}.
              </p>
            ) : null}
            <p className="mt-3 text-xs text-muted-foreground">
              Datele din mesaj sunt folosite doar ca să îți răspundem, conform{" "}
              <Link to="/confidentialitate" className="underline">
                politicii de confidențialitate
              </Link>
              .
            </p>
          </form>
        </div>
      </main>
      <footer className="border-t border-border bg-background">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p className="font-semibold text-foreground">DCO RENT A CAR CLUJ</p>
          <p>Gilău · Cluj-Napoca · Florești</p>
          <p>
            © {new Date().getFullYear()} Toate drepturile rezervate.{" "}
            <Link to="/confidentialitate" className="hover:text-foreground hover:underline">
              Politica de confidențialitate
            </Link>{" "}
            <SponsoredLink className="ml-2" />
          </p>
        </div>
      </footer>
    </div>
  );
}
