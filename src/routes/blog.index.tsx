import { createFileRoute, Link } from "@tanstack/react-router";
import { Car, ArrowRight, Phone, Clock } from "lucide-react";

import { posts, formatDateRo } from "@/lib/blog";
import { SITE_URL, canonical, canonicalLinks, socialImageMeta } from "@/lib/seo";

const SITE = SITE_URL;
const TITLE = "Blog închirieri auto Cluj | DCO Rent a Car";
const DESCRIPTION =
  "Ghiduri rent a car Cluj: închirieri auto ieftine în Cluj-Napoca și Gilău, tarife, acte necesare și rute cu mașina în Transilvania.";


export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "blog inchirieri auto cluj, rent a car cluj sfaturi, rute cu masina din cluj, excursii de o zi cluj, inchiriere auto gilau",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: canonical("/blog") },
      { property: "og:locale", content: "ro_RO" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      ...socialImageMeta(),
    ],
    links: canonicalLinks("/blog"),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          "@id": `${SITE}/blog#blog`,
          name: "Blog DCO Rent a Car Cluj",
          description: DESCRIPTION,
          inLanguage: "ro-RO",
          url: `${SITE}/blog`,
          publisher: { "@id": `${SITE}#business` },
          blogPost: posts.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            description: p.description,
            datePublished: p.date,
            url: `${SITE}/blog/${p.slug}`,
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
            { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
          ],
        }),
      },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
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
          <a href="tel:+40742925934" className="btn-base btn-primary px-5 py-2.5 text-sm">
            <Phone className="h-4 w-4" /> Rezervă
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-14">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            Acasă
          </Link>
          <span className="px-2">/</span>
          <span className="text-foreground">Blog</span>
        </nav>

        <h1 className="mt-5 max-w-3xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Blog: închirieri auto în Cluj și rute locale
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Ghiduri scrise din experiența noastră de zi cu zi în Gilău, Cluj-Napoca și Florești:
          tarife, acte, condiții de închiriere și trasee pe care merită să le faci cu mașina.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg"
            >
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-primary">
                {post.category}
              </span>
              <h2 className="mt-3 font-display text-lg font-bold leading-snug">
                <Link to="/blog/$slug" params={{ slug: post.slug }} className="hover:underline">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
              <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                <time dateTime={post.date}>{formatDateRo(post.date)}</time>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" /> {post.readingMinutes} min
                </span>
              </div>
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5"
              >
                Citește articolul <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </main>

      <footer className="border-t border-border bg-background">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p className="font-semibold text-foreground">DCO RENT A CAR CLUJ</p>
          <p>Gilău · Cluj-Napoca · Florești</p>
          <p>© {new Date().getFullYear()} Toate drepturile rezervate.</p>
        </div>
      </footer>
    </div>
  );
}
