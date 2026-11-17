import { createFileRoute, notFound, redirect } from "@tanstack/react-router";

import { LocationLanding } from "@/components/LocationLanding";
import { getLocation } from "@/lib/locations";
import { LOCATION_REDIRECTS } from "@/lib/location-redirects";
import type { LocationPage } from "@/lib/locations";
import { getPublicVehicles } from "@/lib/admin.functions";
import { vehicleSlug } from "@/lib/vehicle-seo";
import { SITE_URL, canonical, canonicalLinks, socialImageMeta } from "@/lib/seo";

const SITE = SITE_URL;

export const Route = createFileRoute("/$slug")({
  loader: async ({ params }) => {
    const merged = LOCATION_REDIRECTS[params.slug];
    if (merged) throw redirect({ href: merged, statusCode: 301 });
    const page = getLocation(params.slug);
    if (!page) throw notFound();
    // The fleet list is a bonus; a database hiccup must not turn an indexable page into a 500.
    const vehicles = await getPublicVehicles().catch(() => []);
    return { page, fleet: vehicles.map((v) => ({ name: v.name, slug: vehicleSlug(v) })) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Pagină indisponibilă | DCO Rent a Car Cluj" }, { name: "robots", content: "noindex" }],
      };
    }
    const { page } = loaderData;
    const url = canonical(`/${page.slug}`);
    const lang = page.lang ?? "ro";
    const isEn = lang === "en";
    const htmlLang = lang === "ro" ? "ro-RO" : lang;
    const ogLocale = { ro: "ro_RO", en: "en_GB", hu: "hu_HU" }[lang];
    return {
      meta: [
        { title: page.metaTitle },
        { name: "description", content: page.description },
        { name: "keywords", content: page.keywords },
        { name: "robots", content: "index, follow, max-image-preview:large" },
        { property: "og:type", content: "website" },
        { property: "og:title", content: page.metaTitle },
        { property: "og:description", content: page.description },
        { property: "og:url", content: url },
        { property: "og:locale", content: ogLocale },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: page.metaTitle },
        { name: "twitter:description", content: page.description },
        ...socialImageMeta(`${page.h1} — DCO Rent a Car`),
      ],
      links: canonicalLinks(`/${page.slug}`, isEn, htmlLang),
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": `${url}#service`,
            name: page.h1,
            serviceType: isEn ? "Car rental" : "Închirieri auto",
            description: page.description,
            url,
            inLanguage: htmlLang,
            // One real business (declared on the homepage); landing pages describe
            // what it offers in an area instead of inventing a new business per page.
            provider: {
              "@type": ["AutoRental", "LocalBusiness"],
              "@id": `${SITE}#business`,
              name: "DCO Rent a Car Cluj",
              url: SITE,
              telephone: "+40742925934",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Gilău",
                addressRegion: "Cluj",
                postalCode: "407310",
                addressCountry: "RO",
              },
            },
            areaServed: { "@type": "Place", name: page.city.replace(/ \((English|magyar)\)$/, "") },
            offers: {
              "@type": "Offer",
              priceCurrency: "RON",
              availability: "https://schema.org/InStock",
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: 70,
                minPrice: 70,
                priceCurrency: "RON",
                unitCode: "DAY",
              },
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "@id": `${url}#faq`,
            url,
            name: `Întrebări frecvente — ${page.city}`,
            inLanguage: htmlLang,
            isPartOf: { "@id": `${SITE}#website` },
            about: { "@id": `${url}#service` },
            mainEntity: page.faq.map((f) => ({
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
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "DCO Rent a Car Cluj", item: `${SITE}/` },
              { "@type": "ListItem", position: 2, name: page.linkTitle ?? `Rent a Car ${page.city}`, item: url },
            ],
          }),
        },
      ],
    };
  },
  component: LocationRoute,
});

function LocationRoute() {
  const { page, fleet } = Route.useLoaderData();
  return <LocationLanding page={page} fleet={fleet} />;
}
