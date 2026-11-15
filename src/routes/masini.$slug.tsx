import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Phone, MessageCircle, MapPin } from "lucide-react";
import { getPublicVehicles } from "@/lib/admin.functions";
import { VEHICLE_LOCAL_AREAS, vehicleSeo, vehicleSlug } from "@/lib/vehicle-seo";
import { canonical, canonicalLinks } from "@/lib/seo";
import { publicVehicleImageSrc } from "@/lib/vehicles";
import { PrivateVehiclePhoto } from "@/components/PrivateVehiclePhoto";
import { Button } from "@/components/ui/button";
import { AdsterraSlot } from "@/components/AdsterraSlot";
import { SponsoredLink } from "@/components/SponsoredLink";

export const Route = createFileRoute("/masini/$slug")({
  loader: async ({ params }) => {
    const vehicles = await getPublicVehicles();
    const vehicle = vehicles.find((v) => vehicleSlug(v) === params.slug);
    if (!vehicle) throw notFound();
    return { vehicle, others: vehicles.filter((v) => v.id !== vehicle.id) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Mașină indisponibilă | DCO Rent a Car Cluj" }, { name: "robots", content: "noindex" }] };
    const seo = vehicleSeo(loaderData.vehicle);
    return {
      meta: [
        { title: seo.title }, { name: "description", content: seo.description },
        { name: "robots", content: "index, follow, max-image-preview:large" },
        { property: "og:title", content: seo.title }, { property: "og:description", content: seo.description },
        { property: "og:type", content: "website" }, { property: "og:url", content: seo.url },
        { property: "og:locale", content: "ro_RO" },
        { name: "twitter:card", content: "summary" }, { name: "twitter:title", content: seo.title },
        { name: "twitter:description", content: seo.description },
      ],
      links: canonicalLinks(seo.path),
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(seo.schema) },
        { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Acasă", item: canonical("/") },
          { "@type": "ListItem", position: 2, name: loaderData.vehicle.name, item: seo.url },
        ] }) },
      ],
    };
  },
  component: VehiclePage,
});

function VehiclePage() {
  const { vehicle, others } = Route.useLoaderData();
  const photos = [...new Set([vehicle.image_url, ...vehicle.gallery].filter(Boolean))];
  const whatsapp = `https://wa.me/40742925934?text=${encodeURIComponent(`Bună ziua! Doresc să închiriez ${vehicle.name}. Localitatea și perioada: `)}`;
  return <div className="min-h-screen bg-background">
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-5 py-4">
        <Link to="/" className="font-display font-bold">DCO RENT A CAR CLUJ</Link>
        <Button asChild><a href="tel:+40742925934"><Phone /> Sună</a></Button>
      </div>
    </header>
    <main className="mx-auto max-w-4xl px-5 py-8">
      <Link to="/" hash="flota" className="inline-flex items-center gap-2 text-sm text-muted-foreground"><ArrowLeft className="h-4 w-4" /> Toate mașinile</Link>
      <h1 className="mt-5 font-display text-3xl font-bold leading-tight break-words">{vehicle.name} de închiriat în Cluj</h1>
      <p className="mt-3 text-muted-foreground">{vehicle.tagline}</p>
      {photos[0] && <PrivateVehiclePhoto src={publicVehicleImageSrc(photos[0])} alt={`${vehicle.name} de închiriat în Cluj, Florești și Gilău`} className="mt-6 aspect-[4/3] max-h-[420px] w-full" />}
      <div className="mt-5 flex flex-wrap gap-3">
        <Button asChild><Link to="/rezervare" search={{ masina: vehicle.id }}>Rezervă online</Link></Button>
        <Button asChild><a href={whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle /> Cere disponibilitatea</a></Button>
        <Button asChild variant="outline"><a href="tel:+40742925934"><Phone /> (0742) 925 934</a></Button>
      </div>
      {vehicle.description && <p className="mt-6 leading-relaxed text-muted-foreground">{vehicle.description}</p>}
      <dl className="mt-6 grid grid-cols-2 gap-5 border-y border-border py-5 sm:grid-cols-4">
        {[['Tarif afișat', vehicle.price_label], ['Locuri', vehicle.seats], ['Cutie de viteze', vehicle.transmission], ['Combustibil', vehicle.fuel]].map(([label, value]) => value && <div key={label}><dt className="text-sm text-muted-foreground">{label}</dt><dd className="mt-1 font-semibold">{value}</dd></div>)}
      </dl>
      <section className="py-8">
        <h2 className="font-display text-2xl font-bold">Preluare și cost pentru {vehicle.name}</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">Închiriezi {vehicle.name} direct de la DCO Rent a Car, cu baza în Gilău, județul Cluj. Pentru Cluj-Napoca și Florești stabilim telefonic locul și ora predării. Dacă vii din Huedin sau din altă localitate, preluarea se face în Gilău ori la un punct convenit înainte de rezervare; nu presupune existența unui birou în localitatea ta.</p>
        <p className="mt-3 leading-relaxed text-muted-foreground">Tariful exact pentru această mașină depinde de perioada solicitată și se confirmă înainte de rezervare, împreună cu disponibilitatea și eventualele condiții de predare. Cere oferta pentru o zi, un weekend, o săptămână sau o lună.</p>
      </section>
      <AdsterraSlot placement="vehicle-mid-content" />
      <section className="py-8">
        <h2 className="font-display text-2xl font-bold">{vehicle.name} pentru Cluj și localitățile apropiate</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">Cauți o mașină în Florești, Cluj-Napoca, Gilău sau Huedin? Consultă informațiile locale și contactează-ne pentru preluare. Pentru drumuri din satele apropiate, inclusiv Luna de Sus, Căpușu Mare, Someșu Rece și Tăuți, punctul de întâlnire se discută telefonic.</p>
        <ul className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
          {VEHICLE_LOCAL_AREAS.map((area) => <li key={area.slug}><Link to="/$slug" params={{ slug: area.slug }} className="inline-flex items-center gap-2 text-primary hover:underline"><MapPin className="h-4 w-4 shrink-0" /> Închirieri auto {area.city}</Link></li>)}
        </ul>
        <h3 className="mt-7 text-lg font-semibold">Drumuri către orașele mari din România</h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">Pentru o călătorie din Cluj spre Oradea, Alba Iulia, Sibiu, Târgu Mureș, Brașov, Timișoara sau București, discută înainte de rezervare traseul, durata și condițiile de utilizare. Aceste destinații nu reprezintă birouri locale și nu implică livrare gratuită sau returnare în alt oraș.</p>
      </section>
      {photos.length > 1 && <section className="py-6"><h2 className="font-display text-2xl font-bold">Fotografii {vehicle.name}</h2><div className="mt-5 grid gap-4 sm:grid-cols-2">{photos.slice(1).map((photo, i) => <PrivateVehiclePhoto key={photo} src={publicVehicleImageSrc(photo)} alt={`${vehicle.name} — fotografia ${i + 2}`} className="aspect-[4/3] w-full" />)}</div></section>}
      <section className="py-8"><h2 className="font-display text-2xl font-bold">Alte mașini de închiriat în Cluj</h2><ul className="mt-5 grid gap-3 sm:grid-cols-2">{others.map((v) => <li key={v.id}><Link to="/masini/$slug" params={{ slug: vehicleSlug(v) }} className="inline-flex items-center gap-2 text-primary hover:underline">{v.name}<ArrowRight className="h-4 w-4" /></Link></li>)}</ul></section>
    </main>
    <AdsterraSlot placement="vehicle-before-footer" />
    <footer className="border-t border-border px-5 py-6 text-center text-sm text-muted-foreground">DCO Rent a Car · Gilău · Cluj-Napoca · Florești · <Link to="/confidentialitate" className="hover:underline">Confidențialitate</Link> <SponsoredLink /></footer>
  </div>;
}