import { createFileRoute, notFound } from "@tanstack/react-router";

import { LocationLanding } from "@/components/LocationLanding";
import { getLocation } from "@/lib/locations";
import type { LocationPage } from "@/lib/locations";
import { SITE_URL, canonical, canonicalLinks } from "@/lib/seo";

const SITE = SITE_URL;

export const Route = createFileRoute("/$slug")({
  loader: ({ params }) => {
    const page = getLocation(params.slug);
    if (!page) throw notFound();
    return { page };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Pagină indisponibilă | DCO Rent a Car Cluj" }, { name: "robots", content: "noindex" }],
      };
    }
    const { page } = loaderData;
    const url = canonical(`/${page.slug}`);
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
        { property: "og:locale", content: "ro_RO" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: page.metaTitle },
        { name: "twitter:description", content: page.description },
      ],
      links: canonicalLinks(`/${page.slug}`),
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["LocalBusiness", "AutoRental"],
            "@id": `${url}#business`,
            parentOrganization: { "@id": `${SITE}#organization` },
            name: `DCO Rent a Car — ${page.city}`,
            description: page.description,
            url,
            telephone: "+40742925934",
            email: "Ovidiu_danciu@yahoo.com",
            priceRange: "de la 70 RON/zi",
            areaServed: { "@type": "Place", name: page.city },

            address: {
              "@type": "PostalAddress",
              addressLocality: "Gilău",
              addressRegion: "Cluj",
              addressCountry: "RO",
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
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
              { "@type": "ListItem", position: 1, name: "Acasă", item: SITE },
              { "@type": "ListItem", position: 2, name: `Rent a Car ${page.city}`, item: url },
            ],
          }),
        },
      ],
    };
  },
  component: LocationRoute,
});

function LocationRoute() {
  const { page } = Route.useLoaderData() as { page: LocationPage };
  return <LocationLanding page={page} />;
}
