import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, CheckCircle2, Loader2, Send } from "lucide-react";
import { format } from "date-fns";
import { ro } from "date-fns/locale";
import type { DateRange } from "react-day-picker";
import { getPublicVehicles, getBusyRanges } from "@/lib/admin.functions";
import { submitBookingRequest } from "@/lib/booking-request.functions";
import { bookingRequestSchema, bucharestNow } from "@/lib/booking-request";
import { addDaysISO, conflictsFor, type BookingRange } from "@/lib/bookings";
import { publicVehicleImageSrc } from "@/lib/vehicles";
import { PrivateVehiclePhoto } from "@/components/PrivateVehiclePhoto";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { canonical, canonicalLinks, SITE_URL, socialImageMeta } from "@/lib/seo";

const PATH = "/rezervare";
const TITLE = "Rezervare rent a car Cluj | Online, de la 70 lei/zi";
const DESCRIPTION =
  "Rezervă online o mașină în Cluj-Napoca, Florești, Gilău sau Huedin. Weekend, non-stop, ieftin sau iarna, de la 70 lei/zi, fără garanție.";
const HANDOVER_HOURS = [
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
];
const TREND_LINKS = [
  ["rent-a-car-cluj-napoca", "Cluj-Napoca"],
  ["rent-a-car-floresti-cluj", "Florești"],
  ["rent-a-car-gilau", "Gilău"],
  ["rent-a-car-huedin", "Huedin"],
  ["inchirieri-auto-cluj", "Închirieri auto Cluj"],
  ["rent-a-car-cluj-non-stop", "Non-stop"],
  ["inchiriere-masina-weekend-cluj", "Weekend"],
  ["rent-a-car-cluj-ieftin", "Ieftin"],
  ["inchiriere-masina-iarna-cluj", "Iarna și Crăciun"],
  ["rent-a-car-aeroport-cluj", "Aeroport"],
] as const;
const FAQ = [
  {
    q: "Rezervarea online este definitivă?",
    a: "Nu. Cererea nu blochează mașina. Tariful, disponibilitatea și locul de predare se confirmă separat, telefonic sau pe WhatsApp.",
  },
  {
    q: "Pot alege ora de preluare?",
    a: "Da. În calendar alegi o zi liberă și una dintre orele afișate. Pentru o oră în afara listei, inclusiv dimineața devreme sau seara, scrie-o la observații: nu percepem suprataxă de program.",
  },
  {
    q: "Unde preiau mașina în Cluj?",
    a: "Predarea este personală, în Gilău, Florești, Cluj-Napoca sau la un punct stabilit împreună, inclusiv în zona Aeroportului Avram Iancu. Nu avem ghișeu în terminal.",
  },
];

export const Route = createFileRoute("/rezervare")({
  validateSearch: (input: Record<string, unknown>): { masina?: string } =>
    typeof input.masina === "string" ? { masina: input.masina } : {},
  loader: async () => {
    const [vehicles, busy] = await Promise.all([getPublicVehicles(), getBusyRanges()]);
    return { vehicles, busy };
  },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "rezervare rent a car cluj, inchiriere masina cluj, rent a car cluj napoca, rent a car floresti, rent a car gilau, rent a car huedin, rent a car cluj non stop, inchiriere masina weekend cluj, rent a car cluj ieftin, inchiriere masina iarna cluj, rent a car aeroport cluj",
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
      ...socialImageMeta("Rezervare rent a car Cluj — DCO Rent a Car"),
    ],
    links: canonicalLinks(PATH),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${SITE_URL}${PATH}#webpage`,
          name: TITLE,
          description: DESCRIPTION,
          inLanguage: "ro-RO",
          url: canonical(PATH),
          isPartOf: { "@id": `${SITE_URL}#website` },
          about: { "@type": "Service", name: "Închirieri auto Cluj", areaServed: "Cluj" },
          potentialAction: {
            "@type": "ReserveAction",
            name: "Cerere de rezervare",
            target: canonical(PATH),
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Acasă", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Rezervare", item: canonical(PATH) },
          ],
        }),
      },
    ],
  }),
  component: BookingPage,
});

function bookedDays(ranges: BookingRange[], vehicleId: string): Set<string> {
  const days = new Set<string>();
  if (!vehicleId) return days;
  for (const range of ranges) {
    if (range.vehicle_id !== vehicleId) continue;
    for (let day = range.start_date; day <= range.end_date; day = addDaysISO(day, 1)) days.add(day);
  }
  return days;
}

function HourChoices({
  label,
  value,
  onChange,
  disabledHour,
}: {
  label: string;
  value: string;
  onChange: (hour: string) => void;
  disabledHour: (hour: string) => boolean;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-medium">{label}</legend>
      <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-6">
        {HANDOVER_HOURS.map((hour) => {
          const selected = value === hour;
          return (
            <button
              key={hour}
              type="button"
              aria-pressed={selected}
              disabled={disabledHour(hour)}
              onClick={() => onChange(hour)}
              className={
                selected
                  ? "btn-base btn-primary px-2 py-1.5 text-sm"
                  : "btn-base border border-border bg-card px-2 py-1.5 text-sm text-foreground disabled:opacity-40"
              }
            >
              {hour}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function BookingPage() {
  const { vehicles, busy } = Route.useLoaderData();
  const { masina } = Route.useSearch();
  const [vehicleId, setVehicleId] = useState(masina ?? "");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("10:00");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ reference: string; customerEmailSent: boolean } | null>(
    null,
  );
  const submit = useServerFn(submitBookingRequest);
  const vehicle = vehicles.find((item) => item.id === vehicleId);
  const now = bucharestNow();
  const today = now.slice(0, 10);
  const booked = bookedDays(busy, vehicleId);
  const unavailable = !!(
    startDate &&
    endDate &&
    conflictsFor(busy, vehicleId, startDate, endDate).length
  );

  function onRange(next: DateRange | undefined) {
    const from = next?.from ? format(next.from, "yyyy-MM-dd") : "";
    const to = next?.to ? format(next.to, "yyyy-MM-dd") : "";
    if (from && to && conflictsFor(busy, vehicleId, from, to).length) {
      setStartDate(from);
      setEndDate("");
      return;
    }
    setStartDate(from);
    setEndDate(to);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setError("");
    const values = Object.fromEntries(new FormData(event.currentTarget));
    const parsed = bookingRequestSchema.safeParse({
      ...values,
      vehicle_id: vehicleId,
      start_date: startDate,
      end_date: endDate,
      start_time: startTime,
      end_time: endTime,
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Verifică datele.");
      return;
    }
    setSubmitting(true);
    try {
      const response = await submit({ data: parsed.data });
      if (response.ok) setResult(response);
      else setError(response.error);
    } catch {
      setError("Nu am putut trimite cererea. Încearcă din nou sau sună la (0742) 925 934.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-5 py-5">
          <Link to="/" className="font-display text-sm font-bold">
            DCO RENT A CAR CLUJ
          </Link>
          <Link
            to="/"
            className="btn-base border border-border bg-background px-4 py-2 text-sm text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Acasă
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-5 py-9 sm:py-12">
        <h1 className="font-display text-3xl font-bold tracking-normal">
          Rezervare rent a car Cluj
        </h1>
        <p className="mt-3 text-muted-foreground">Cluj-Napoca · Florești · Gilău · Huedin</p>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
          Alege mașina, zilele libere și ora. Tariful pornește de la 70 lei/zi, fără garanție și
          fără taxă de aeroport. Pentru weekend, predare non-stop sau drum de iarnă, confirmăm
          aceeași ofertă ca pe paginile locale.
        </p>
        <nav aria-label="Căutări frecvente" className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {TREND_LINKS.map(([slug, label]) => (
            <Link
              key={slug}
              to="/$slug"
              params={{ slug }}
              className="font-semibold text-primary hover:underline"
            >
              {label}
            </Link>
          ))}
          <Link to="/contact" className="font-semibold text-primary hover:underline">
            Contact
          </Link>
        </nav>
        {result ? (
          <section className="mt-10 max-w-2xl space-y-4" aria-live="polite">
            <CheckCircle2 className="h-10 w-10 text-primary" />
            <h2 className="text-2xl font-semibold">Cererea ta a fost primită</h2>
            <p>
              {result.customerEmailSent
                ? "Am trimis pe e-mail detaliile cererii."
                : "Cererea este salvată, dar e-mailul nu a putut fi trimis. Pentru detalii, sună la (0742) 925 934."}
            </p>
            <p className="text-muted-foreground">
              Disponibilitatea, tariful și locul de predare se confirmă separat cu echipa DCO.
            </p>
            <p className="break-all text-sm text-muted-foreground">Referință: {result.reference}</p>
            <Link to="/" className="btn-base btn-primary px-5 py-2.5 text-sm">
              Înapoi la mașini
            </Link>
          </section>
        ) : (
          <div className="mt-9 grid gap-10 md:grid-cols-[minmax(0,1fr)_300px]">
            <form onSubmit={onSubmit} className="min-w-0 space-y-7">
              <div className="space-y-2">
                <Label htmlFor="vehicle">Mașina</Label>
                <Select value={vehicleId} onValueChange={setVehicleId}>
                  <SelectTrigger id="vehicle" className="w-full">
                    <SelectValue placeholder="Alege mașina" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicles.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <section className="space-y-4">
                <h2 className="text-lg font-semibold">Zile și ore disponibile</h2>
                <p className="text-sm text-muted-foreground">
                  {vehicle
                    ? `Zilele tăiate sunt ocupate pentru ${vehicle.name}. Prima zi aleasă este preluarea, a doua este returnarea.`
                    : "Alege mai întâi mașina, ca să vezi zilele ocupate."}
                </p>
                <Calendar
                  mode="range"
                  locale={ro}
                  selected={
                    startDate
                      ? {
                          from: new Date(`${startDate}T12:00:00`),
                          to: endDate ? new Date(`${endDate}T12:00:00`) : undefined,
                        }
                      : undefined
                  }
                  onSelect={onRange}
                  disabled={(date) => {
                    const iso = format(date, "yyyy-MM-dd");
                    return iso < today || booked.has(iso);
                  }}
                  modifiers={{ booked: [...booked].map((iso) => new Date(`${iso}T12:00:00`)) }}
                  modifiersClassNames={{
                    booked: "[&_button]:line-through [&_button]:text-destructive",
                  }}
                  className="rounded-xl border border-border"
                />
                {startDate ? (
                  <p className="text-sm text-muted-foreground">
                    Preluare:{" "}
                    {format(new Date(`${startDate}T12:00:00`), "dd MMM yyyy", { locale: ro })}
                    {endDate
                      ? ` · Returnare: ${format(new Date(`${endDate}T12:00:00`), "dd MMM yyyy", { locale: ro })}`
                      : " · Alege și ziua de returnare."}
                  </p>
                ) : null}
                <HourChoices
                  label="Ora preluării"
                  value={startTime}
                  onChange={setStartTime}
                  disabledHour={(hour) => !startDate || `${startDate}T${hour}` <= now}
                />
                <HourChoices
                  label="Ora returnării"
                  value={endTime}
                  onChange={setEndTime}
                  disabledHour={(hour) =>
                    !endDate ||
                    `${endDate}T${hour}` <= now ||
                    (startDate === endDate && hour <= startTime)
                  }
                />
                <p className="text-sm text-muted-foreground">
                  Orele de mai sus se pot selecta direct. Pentru o altă oră, scrie-o la observații.
                </p>
              </section>
              <section className="space-y-4">
                <h2 className="text-lg font-semibold">Locul preluării</h2>
                <Label htmlFor="pickup_location">Adresă sau zonă</Label>
                <Input
                  id="pickup_location"
                  name="pickup_location"
                  placeholder="Gilău, Florești, Cluj-Napoca…"
                  maxLength={200}
                  required
                />
              </section>
              {unavailable && (
                <p role="alert" className="text-sm text-destructive">
                  Mașina este rezervată în această perioadă. Alege alte date sau altă mașină.
                </p>
              )}
              <section className="space-y-4 border-t border-border pt-6">
                <h2 className="text-lg font-semibold">Date de contact</h2>
                <div className="space-y-2">
                  <Label htmlFor="customer_name">Nume și prenume</Label>
                  <Input
                    id="customer_name"
                    name="customer_name"
                    autoComplete="name"
                    maxLength={120}
                    required
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="customer_email">E-mail</Label>
                    <Input
                      id="customer_email"
                      name="customer_email"
                      type="email"
                      autoComplete="email"
                      maxLength={255}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customer_phone">Telefon</Label>
                    <Input
                      id="customer_phone"
                      name="customer_phone"
                      type="tel"
                      autoComplete="tel"
                      minLength={6}
                      maxLength={40}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="note">Observații (opțional)</Label>
                  <Textarea id="note" name="note" maxLength={600} />
                </div>
              </section>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Cererea nu constituie o rezervare definitivă. Tariful și disponibilitatea se
                confirmă separat. Datele sunt folosite pentru această solicitare, conform{" "}
                <Link to="/confidentialitate" className="text-primary underline">
                  politicii de confidențialitate
                </Link>
                .
              </p>
              {error && (
                <p role="alert" className="text-sm text-destructive">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={submitting || unavailable || !vehicles.length}
                className="btn-base btn-primary w-full px-5 py-2.5 text-sm disabled:opacity-60 sm:w-auto"
              >
                {submitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                {submitting ? "Se trimite…" : "Trimite cererea de rezervare"}
              </button>
            </form>
            <aside className="min-w-0 border-t border-border pt-6 md:border-l md:border-t-0 md:pl-7 md:pt-0">
              {vehicle ? (
                <>
                  <PrivateVehiclePhoto
                    src={publicVehicleImageSrc(vehicle.image_url)}
                    alt={vehicle.name}
                    className="aspect-[4/3] w-full"
                  />
                  <h2 className="mt-4 text-xl font-semibold">{vehicle.name}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {vehicle.seats} · {vehicle.transmission} · {vehicle.fuel}
                  </p>
                  <p className="mt-3 font-semibold">{vehicle.price_label}</p>
                </>
              ) : (
                <h2 className="text-lg font-semibold">DCO Rent a Car Cluj</h2>
              )}
              <p className="mt-5 text-sm text-muted-foreground">
                Prețul final depinde de mașină și de perioada solicitată.
              </p>
              <a href="tel:+40742925934" className="mt-5 inline-block font-semibold text-primary">
                (0742) 925 934
              </a>
            </aside>
          </div>
        )}
        <section className="mt-12 max-w-2xl">
          <h2 className="font-display text-2xl font-bold">Întrebări despre rezervare</h2>
          <dl className="mt-5 space-y-4">
            {FAQ.map((item) => (
              <div key={item.q}>
                <dt className="font-semibold">{item.q}</dt>
                <dd className="mt-1 leading-relaxed text-muted-foreground">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>
      <footer className="mt-8 border-t border-border px-5 py-6 text-center text-sm text-muted-foreground">
        DCO Rent a Car · Gilău · Cluj ·{" "}
        <Link to="/contact" className="hover:underline">
          Contact
        </Link>
        {" · "}
        <Link to="/confidentialitate" className="hover:underline">
          Confidențialitate
        </Link>
      </footer>
    </div>
  );
}
