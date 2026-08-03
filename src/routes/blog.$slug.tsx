import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Car, Phone, Clock, ArrowLeft, ArrowRight } from "lucide-react";

import { getPost, posts, formatDateRo } from "@/lib/blog";
import type { BlogPost, BlogSection } from "@/lib/blog";
import { SITE_URL, canonical, canonicalLinks } from "@/lib/seo";

const SITE = SITE_URL;

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Articol indisponibil | DCO Rent a Car Cluj" }, { name: "robots", content: "noindex" }],
      };
    }
    const { post } = loaderData;
    const url = `${SITE}/blog/${post.slug}`;
    return {
      meta: [
        { title: post.metaTitle },
        { name: "description", content: post.description },
        { name: "robots", content: "index, follow, max-image-preview:large" },
        { property: "og:type", content: "article" },
        { property: "og:title", content: post.metaTitle },
        { property: "og:description", content: post.description },
        { property: "og:url", content: url },
        { property: "og:locale", content: "ro_RO" },
        { property: "article:published_time", content: post.date },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: post.metaTitle },
        { name: "twitter:description", content: post.description },
      ],
      links: [
        { rel: "canonical", href: url },
        { rel: "alternate", hrefLang: "ro-RO", href: url },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            dateModified: post.date,
            inLanguage: "ro-RO",
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            author: { "@type": "Organization", name: "DCO Rent a Car Cluj", url: SITE },
            publisher: { "@type": "Organization", name: "DCO Rent a Car Cluj", url: SITE },
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
              { "@type": "ListItem", position: 3, name: post.title, item: url },
            ],
          }),
        },
      ],
    };
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post } = Route.useLoaderData() as { post: BlogPost };
  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

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

      <main className="mx-auto max-w-3xl px-5 py-14">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            Acasă
          </Link>
          <span className="px-2">/</span>
          <Link to="/blog" className="hover:text-foreground">
            Blog
          </Link>
        </nav>

        <span className="mt-6 block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-primary">
          {post.category}
        </span>
        <h1 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          {post.title}
        </h1>
        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <time dateTime={post.date}>{formatDateRo(post.date)}</time>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" /> {post.readingMinutes} min de citit
          </span>
        </div>

        <p className="mt-7 text-lg text-muted-foreground">{post.excerpt}</p>

        <div className="mt-10 space-y-10">
          {post.sections.map((section: BlogSection) => (
            <section key={section.heading}>
              <h2 className="font-display text-xl font-bold tracking-tight">{section.heading}</h2>
              {section.paragraphs.map((p: string) => (
                <p key={p} className="mt-3 leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
              {section.bullets ? (
                <ul className="mt-4 space-y-2">
                  {section.bullets.map((b: string) => (
                    <li key={b} className="flex gap-2.5 text-sm text-muted-foreground">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {b}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        <aside className="mt-14 rounded-2xl border border-border bg-card p-7">
          <h2 className="font-display text-lg font-bold">Ai nevoie de o mașină în Cluj?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Tarife de la 70 lei/zi, predare personală în Gilău, mașini verificate pentru drumurile din Cluj.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href="tel:+40742925934" className="btn-base btn-primary px-5 py-2.5 text-sm">
              <Phone className="h-4 w-4" /> (0742) 925 934
            </a>
            <Link to="/" hash="contact" className="btn-base px-5 py-2.5 text-sm border border-border">
              Cere o ofertă <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </aside>

        {others.length > 0 ? (
          <section className="mt-14">
            <h2 className="font-display text-lg font-bold">Citește și</h2>
            <ul className="mt-4 space-y-3">
              {others.map((p) => (
                <li key={p.slug}>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: p.slug }}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                  >
                    {p.title} <ArrowRight className="h-4 w-4" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <Link
          to="/blog"
          className="mt-12 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Toate articolele
        </Link>
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
