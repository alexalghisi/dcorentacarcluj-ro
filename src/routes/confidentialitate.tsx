import { createFileRoute, Link } from "@tanstack/react-router";
import { Car, Phone } from "lucide-react";
import type { ReactNode } from "react";

import { SponsoredLink } from "@/components/SponsoredLink";
import { SITE_URL, canonical, canonicalLinks, socialImageMeta } from "@/lib/seo";

const SITE = SITE_URL;
const PATH = "/confidentialitate";
const TITLE = "Politica de confidențialitate | DCO Rent a Car Cluj";
const DESCRIPTION =
  "Cum colectează și protejează DCO Rent a Car Cluj datele personale: formular de rezervare, WhatsApp, telefon, cookie-uri, Google AdSense, Adsterra și drepturile tale GDPR.";
const LAST_UPDATED = "7 noiembrie 2026";
const LAST_UPDATED_ISO = "2026-11-07";

const EMAIL = "Ovidiu_danciu@yahoo.com";
const PHONE_DISPLAY = "(0742) 925 934";
const PHONE_HREF = "tel:+40742925934";

export const Route = createFileRoute("/confidentialitate")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: canonical(PATH) },
      { property: "og:locale", content: "ro_RO" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      ...socialImageMeta(),
    ],
    links: canonicalLinks(PATH),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${SITE}${PATH}#webpage`,
          name: "Politica de confidențialitate",
          description: DESCRIPTION,
          inLanguage: "ro-RO",
          url: `${SITE}${PATH}`,
          dateModified: LAST_UPDATED_ISO,
          publisher: { "@id": `${SITE}#business` },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Acasă", item: SITE },
            {
              "@type": "ListItem",
              position: 2,
              name: "Politica de confidențialitate",
              item: `${SITE}${PATH}`,
            },
          ],
        }),
      },
    ],
  }),
  component: PrivacyPolicy,
});

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-xl font-bold tracking-tight">{title}</h2>
      <div className="mt-3 space-y-3 leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

function Ext({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-primary underline-offset-2 hover:underline"
    >
      {children}
    </a>
  );
}

function PrivacyPolicy() {
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
          <a href={PHONE_HREF} className="btn-base btn-primary px-5 py-2.5 text-sm">
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
          <span className="text-foreground">Politica de confidențialitate</span>
        </nav>

        <h1 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Politica de confidențialitate
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Ultima actualizare: <time dateTime={LAST_UPDATED_ISO}>{LAST_UPDATED}</time>
        </p>
        <p className="mt-6 leading-relaxed text-muted-foreground">
          Această politică explică ce date personale prelucrăm atunci când vizitezi site-ul{" "}
          <strong className="text-foreground">dcorentacarcluj.ro</strong> sau ne contactezi pentru o
          închiriere auto, în conformitate cu Regulamentul (UE) 2016/679 privind protecția datelor
          (GDPR) și legislația română aplicabilă.
        </p>

        <Section title="1. Cine operează site-ul">
          <p>
            Operatorul datelor este <strong className="text-foreground">DCO Rent a Car Cluj</strong>{" "}
            (DCO Rent a Car), cu sediul în Gilău, județul Cluj, cod poștal 407310, România.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              Telefon / WhatsApp:{" "}
              <a href={PHONE_HREF} className="font-medium text-primary hover:underline">
                {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              E-mail:{" "}
              <a href={`mailto:${EMAIL}`} className="font-medium text-primary hover:underline">
                {EMAIL}
              </a>
            </li>
          </ul>
          <p>Pentru orice întrebare legată de datele tale ne poți scrie la adresa de mai sus.</p>
        </Section>

        <Section title="2. Ce date colectăm">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-foreground">Cererea de rezervare.</strong> Formularul de pe
              site cere nume / firmă, telefon, data și ora preluării și a returului și detalii
              opționale. Datele nu sunt salvate de site: la trimitere se deschide WhatsApp (sau
              aplicația de e-mail) cu mesajul precompletat, iar tu decizi dacă îl trimiți.
            </li>
            <li>
              <strong className="text-foreground">
                Contact prin telefon, WhatsApp sau e-mail.
              </strong>{" "}
              Primim numărul de telefon, numele și conținutul mesajelor pe care ni le trimiți.
              WhatsApp este un serviciu Meta, cu propria{" "}
              <Ext href="https://www.whatsapp.com/legal/privacy-policy-eea">
                politică de confidențialitate
              </Ext>
              .
            </li>
            <li>
              <strong className="text-foreground">Date de rezervare și contract.</strong> Pentru
              închirierile confirmate păstrăm numele, telefonul, mașina, perioada și observațiile
              rezervării, plus datele cerute de contractul de închiriere și de legislație (de ex.
              act de identitate, permis de conducere, date de facturare).
            </li>
            <li>
              <strong className="text-foreground">Recenzii.</strong> Dacă lași o recenzie prin
              linkul primit după închiriere, salvăm numele afișat, nota și comentariul. Recenziile
              aprobate pot fi publicate pe site.
            </li>
            <li>
              <strong className="text-foreground">Date tehnice.</strong> Adresa IP, tipul de browser
              și dispozitiv, paginile vizitate, statistici agregate de vizite și date colectate prin
              cookie-uri și tehnologii similare (vezi secțiunea 3).
            </li>
          </ul>
        </Section>

        <Section title="3. Cookie-uri și servicii terțe">
          <p>
            Folosim cookie-uri și tehnologii similare pentru funcționarea site-ului, statistici și
            afișarea reclamelor, care ne ajută să menținem site-ul gratuit.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-foreground">Google AdSense.</strong> Google și partenerii săi
              folosesc cookie-uri pentru a afișa reclame, inclusiv reclame personalizate pe baza
              vizitelor tale pe acest site și pe alte site-uri. Pentru vizitatorii din SEE, Regatul
              Unit și Elveția, consimțământul este colectat prin mesajul de consimțământ al Google,
              certificat conform IAB Transparency &amp; Consent Framework (TCF); îți poți modifica
              oricând alegerea din acel mesaj. Detalii:{" "}
              <Ext href="https://policies.google.com/technologies/ads">
                Cum folosește Google cookie-urile în publicitate
              </Ext>
              . Poți dezactiva reclamele personalizate din{" "}
              <Ext href="https://adssettings.google.com">Setările pentru reclame Google</Ext>.
            </li>
            <li>
              <strong className="text-foreground">Adsterra.</strong> Afișăm și reclame Adsterra
              (bannere, banner nativ, Social Bar și un link sponsorizat marcat ca atare). Bannerele
              rulează în cadre izolate (sandbox), iar Adsterra poate folosi cookie-uri și date
              tehnice pentru livrarea și măsurarea reclamelor. Detalii:{" "}
              <Ext href="https://adsterra.com/privacy-policy/">politica Adsterra</Ext>.
            </li>
            <li>
              <strong className="text-foreground">Google Analytics.</strong> Când este activ,
              folosim Google Analytics 4 pentru statistici de trafic și pentru a măsura clicurile pe
              telefon, WhatsApp și trimiterea formularului de rezervare. Detalii:{" "}
              <Ext href="https://policies.google.com/privacy">
                Politica de confidențialitate Google
              </Ext>
              .
            </li>
            <li>
              <strong className="text-foreground">Google Maps.</strong> Linkurile către locația și
              recenziile noastre deschid Google Maps, care prelucrează datele conform politicii
              Google.
            </li>
            <li>
              <strong className="text-foreground">Supabase și găzduire.</strong> Rezervările,
              recenziile, flota și statisticile agregate ale site-ului sunt stocate în baza de date
              Supabase, iar site-ul este găzduit prin platforma Lovable. Acești furnizori acționează
              ca persoane împuternicite și prelucrează datele doar pentru a ne furniza serviciul.
            </li>
          </ul>
          <p>
            Poți bloca sau șterge cookie-urile din setările browserului; unele funcții ale site-ului
            sau ale reclamelor pot funcționa diferit.
          </p>
        </Section>

        <Section title="4. Temeiuri legale (art. 6 GDPR)">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-foreground">Executarea unui contract</strong> sau demersuri la
              cererea ta înainte de încheierea lui — cereri de rezervare, oferte, închirieri (art. 6
              alin. 1 lit. b).
            </li>
            <li>
              <strong className="text-foreground">Obligații legale</strong> — evidențe contabile,
              fiscale și cerințe privind închirierea vehiculelor (art. 6 alin. 1 lit. c).
            </li>
            <li>
              <strong className="text-foreground">Consimțământ</strong> — cookie-uri de publicitate
              personalizată și analiză, recenzii publicate (art. 6 alin. 1 lit. a). Îl poți retrage
              oricând, fără a afecta prelucrarea anterioară.
            </li>
            <li>
              <strong className="text-foreground">Interes legitim</strong> — securitatea site-ului,
              prevenirea fraudelor, statistici agregate și răspunsul la mesaje (art. 6 alin. 1 lit.
              f).
            </li>
          </ul>
        </Section>

        <Section title="5. Cât timp păstrăm datele">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Mesajele și cererile de rezervare neconcretizate: cel mult 12 luni de la ultimul
              contact.
            </li>
            <li>
              Datele contractelor de închiriere și documentele financiar-contabile: pe durata
              prevăzută de lege (în general 5–10 ani).
            </li>
            <li>Recenziile: cât timp sunt publicate sau până ne ceri ștergerea lor.</li>
            <li>
              Cookie-urile: pe durata stabilită de fiecare furnizor (Google, Adsterra), conform
              politicilor lor.
            </li>
          </ul>
        </Section>

        <Section title="6. Cui transmitem datele">
          <p>
            Nu vindem datele personale. Le transmitem doar furnizorilor menționați mai sus (Google,
            Adsterra, Meta/WhatsApp, Supabase, furnizorul de găzduire), consultantului contabil și
            autorităților, atunci când legea o cere. Unii furnizori pot transfera date în afara SEE
            (de ex. în SUA), pe baza deciziilor de adecvare ale Comisiei Europene (EU-US Data
            Privacy Framework) sau a clauzelor contractuale standard.
          </p>
        </Section>

        <Section title="7. Drepturile tale">
          <p>Conform GDPR, ai următoarele drepturi:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>dreptul de acces la datele tale;</li>
            <li>dreptul la rectificarea datelor inexacte;</li>
            <li>dreptul la ștergerea datelor („dreptul de a fi uitat”);</li>
            <li>dreptul la restricționarea prelucrării;</li>
            <li>dreptul de opoziție, inclusiv față de publicitatea personalizată;</li>
            <li>dreptul la portabilitatea datelor;</li>
            <li>dreptul de a-ți retrage oricând consimțământul;</li>
            <li>
              dreptul de a depune o plângere la Autoritatea Națională de Supraveghere a Prelucrării
              Datelor cu Caracter Personal (ANSPDCP) —{" "}
              <Ext href="https://www.dataprotection.ro">www.dataprotection.ro</Ext>.
            </li>
          </ul>
          <p>
            Pentru exercitarea drepturilor scrie-ne la{" "}
            <a href={`mailto:${EMAIL}`} className="font-medium text-primary hover:underline">
              {EMAIL}
            </a>{" "}
            sau sună la{" "}
            <a href={PHONE_HREF} className="font-medium text-primary hover:underline">
              {PHONE_DISPLAY}
            </a>
            . Răspundem în cel mult o lună.
          </p>
        </Section>

        <Section title="8. Securitate și minori">
          <p>
            Folosim conexiune criptată (HTTPS), acces restricționat la panoul de administrare și
            furnizori care aplică măsuri de securitate adecvate. Site-ul nu se adresează copiilor
            sub 16 ani, iar închirierea auto este disponibilă doar persoanelor majore.
          </p>
        </Section>

        <Section title="9. Modificări">
          <p>
            Putem actualiza această politică atunci când se schimbă serviciile sau legislația.
            Versiunea curentă este publicată mereu pe această pagină, cu data ultimei actualizări.
          </p>
        </Section>
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
