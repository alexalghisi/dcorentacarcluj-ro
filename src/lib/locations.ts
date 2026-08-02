export interface LocationSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface LocationPage {
  slug: string;
  city: string;
  navLabel: string;
  h1: string;
  metaTitle: string;
  description: string;
  keywords: string;
  intro: string;
  highlights: { label: string; value: string }[];
  sections: LocationSection[];
  faq: { q: string; a: string }[];
}

export const locations: LocationPage[] = [
  {
    slug: "rent-a-car-cluj-napoca",
    city: "Cluj-Napoca",
    navLabel: "Cluj-Napoca",
    h1: "Rent a Car Cluj-Napoca — mașini de închiriat de la 70 lei/zi",
    metaTitle: "Rent a Car Cluj-Napoca | Mașini de închiriat de la 70 lei/zi, fără garanție",
    description:
      "Închirieri auto în Cluj-Napoca fără garanție blocată pe card: de la 70 lei/zi, contract și factură, predare personală. Sună (0742) 925 934.",
    keywords:
      "rent a car cluj napoca, inchirieri auto cluj napoca, masini de inchiriat cluj, inchiriere auto fara garantie cluj",
    intro:
      "Închiriezi mașina direct de la proprietar, fără birou de terminal și fără garanție blocată pe card. Predare stabilită de comun acord pentru clienții din Cluj-Napoca, cu contract și factură emise pe loc.",
    highlights: [
      { label: "Tarif de la", value: "70 lei/zi" },
      { label: "Garanție", value: "0 lei" },
      { label: "Contract", value: "+ factură" },
      { label: "Predare", value: "Personală" },
    ],
    sections: [
      {
        heading: "De ce să închiriezi de la noi în Cluj-Napoca",
        paragraphs: [
          "Firmele mari din Cluj-Napoca cer de obicei o garanție de câteva mii de lei blocată pe cardul de credit și percep taxe suplimentare pentru al doilea șofer sau pentru predarea în afara programului. La noi nu se blochează bani, iar programul îl stabilim împreună.",
          "Flota este alcătuită din mașini întreținute, cu consum mic, potrivite atât pentru oraș, cât și pentru drumuri lungi: Citroën C5 automat, VW Passat break, Ford Focus break și Škoda Fabia pentru parcări strâmte în centru.",
        ],
        bullets: [
          "Fără garanție și fără card de credit",
          "Contract de închiriere și factură, inclusiv pentru firme",
          "Rovinietă inclusă, anvelope de sezon",
          "Permis de conducere valabil de minimum 1 an",
        ],
      },
      {
        heading: "Pentru ce folosesc clienții din Cluj mașinile noastre",
        paragraphs: [
          "Cele mai frecvente cereri vin de la persoane care își au mașina în service, de la firme care au nevoie de un autoturism suplimentar pentru câteva zile și de la vizitatori care vor să exploreze Transilvania pe cont propriu.",
        ],
        bullets: [
          "Înlocuitor cât timp mașina este în service sau în daună",
          "Deplasări de business în Cluj și în județ",
          "Excursii de weekend în Apuseni, Turda sau Alba Iulia",
          "Închirieri lunare la tarif redus",
        ],
      },
      {
        heading: "Cum se face predarea în Cluj-Napoca",
        paragraphs: [
          "Ne suni sau trimiți o cerere prin formular, confirmăm disponibilitatea mașinii și stabilim locul și ora predării. Baza noastră este în Gilău, la 12 km de Cluj-Napoca, iar pentru clienții din oraș găsim un punct convenabil de întâlnire.",
        ],
      },
    ],
    faq: [
      {
        q: "Cât costă o mașină de închiriat în Cluj-Napoca?",
        a: "Tarifele pornesc de la 70 lei pe zi pentru clasa economică. Pentru închirieri de peste 7 zile prețul pe zi scade.",
      },
      {
        q: "Trebuie card de credit sau garanție?",
        a: "Nu. Nu blocăm garanție pe card. Ai nevoie doar de buletin sau pașaport și permis valabil de minimum un an.",
      },
      {
        q: "Pot închiria mașina pe firmă?",
        a: "Da, emitem factură pe firmă și semnăm contract de închiriere.",
      },
    ],
  },
  {
    slug: "rent-a-car-gilau",
    city: "Gilău",
    navLabel: "Gilău",
    h1: "Rent a Car Gilău — închirieri auto local, predare pe loc",
    metaTitle: "Rent a Car Gilău | Închirieri auto de la 70 lei/zi, predare în Gilău",
    description:
      "Închirieri auto în Gilău: bază locală, predare personală pe loc, tarife de la 70 lei/zi, fără garanție. Deservim și Florești, Luna de Sus și Someșu Rece.",
    keywords:
      "rent a car gilau, inchirieri auto gilau, masini de inchiriat gilau, inchiriere auto floresti cluj",
    intro:
      "Baza noastră este în Gilău, așa că preluarea mașinii se face rapid, direct de la fața locului, fără drum până în centrul Clujului și fără garanție blocată pe card.",
    highlights: [
      { label: "Bază", value: "Gilău" },
      { label: "Tarif de la", value: "70 lei/zi" },
      { label: "Până la Cluj", value: "12 km" },
      { label: "Lacul Tarnița", value: "25 min" },
    ],
    sections: [
      {
        heading: "Avantajul unei firme locale din Gilău",
        paragraphs: [
          "Fiind din Gilău, putem preda mașina și în afara programului obișnuit, iar dacă apare o problemă pe drum ajungem repede. Deservim constant Gilău, Florești, Luna de Sus, Someșu Rece și Căpușu Mare.",
          "Pentru localnici, închirierea pe termen mediu (o lună sau mai mult) are tarif special — util cât timp mașina personală e în service sau când ai nevoie de un al doilea autoturism în familie.",
        ],
        bullets: [
          "Predare și preluare în Gilău, fără taxă de livrare",
          "Program flexibil, stabilit prin telefon",
          "Tarife reduse pentru închirieri lunare",
          "Asistență rapidă în zonă",
        ],
      },
      {
        heading: "Ideal pentru drumurile din zonă",
        paragraphs: [
          "Din Gilău ajungi în 25 de minute la Lacul Tarnița, într-o oră și jumătate la Beliș-Fântânele și în mai puțin de o oră la Salina Turda. Mașinile noastre au anvelope de sezon și rovinietă inclusă, așa că poți pleca imediat.",
        ],
        bullets: [
          "Gilău – Tarnița: ~25 min",
          "Gilău – Cluj-Napoca: ~20 min",
          "Gilău – Beliș-Fântânele: ~1h 30min",
          "Gilău – Salina Turda: ~50 min",
        ],
      },
      {
        heading: "Ce mașini sunt disponibile",
        paragraphs: [
          "Flota include variantă automată (Citroën C5), break-uri spațioase (VW Passat, Ford Focus) și o mașină mică, economică (Škoda Fabia). Sunați pentru disponibilitate în perioada dorită.",
        ],
      },
    ],
    faq: [
      {
        q: "Unde se face predarea mașinii?",
        a: "În Gilău, la baza noastră. Stabilim locul exact și ora prin telefon, fără taxă suplimentară.",
      },
      {
        q: "Închiriați și pentru Florești?",
        a: "Da. Deservim Florești, Luna de Sus, Someșu Rece și restul comunelor din zonă.",
      },
      {
        q: "Există tarif pentru o lună întreagă?",
        a: "Da, pentru închirieri lungi tariful pe zi scade semnificativ. Sunați pentru o ofertă.",
      },
    ],
  },
  {
    slug: "rent-a-car-aeroport-cluj",
    city: "Aeroport Cluj",
    navLabel: "Aeroport Cluj",
    h1: "Rent a Car Aeroport Cluj — mașină pregătită la aterizare",
    metaTitle: "Rent a Car Aeroport Cluj | Mașini de închiriat de la 70 lei/zi, fără garanție",
    description:
      "Închirieri auto pentru pasagerii Aeroportului Cluj: mașină pregătită la aterizare, fără garanție pe card, de la 70 lei/zi. Aeroport – Gilău în ~35 de minute.",
    keywords:
      "rent a car aeroport cluj, inchirieri auto aeroport cluj, masina de inchiriat aeroport cluj napoca",
    intro:
      "Vii cu avionul în Cluj? Pregătim mașina pentru ziua și ora aterizării, cu tarife mai mici decât la ghișeele din terminal, pentru că nu plătim spațiu în aeroport și nu blocăm garanție pe card.",
    highlights: [
      { label: "Aeroport – Gilău", value: "~35 min" },
      { label: "Distanță", value: "25 km" },
      { label: "Tarif de la", value: "70 lei/zi" },
      { label: "Garanție", value: "0 lei" },
    ],
    sections: [
      {
        heading: "Cum funcționează pentru pasagerii care aterizează în Cluj",
        paragraphs: [
          "Ne trimiți numărul zborului sau ora aterizării și confirmăm mașina. Preluarea se face în Gilău, la circa 25 km de Aeroportul Internațional Avram Iancu — un drum de 30–40 de minute cu taxi, ride-sharing sau autobuz metropolitan.",
          "În schimbul acestui transfer scurt, tariful este semnificativ mai mic decât la firmele cu birou în terminal: pe o închiriere de o săptămână diferența poate depăși valoarea a două zile.",
        ],
        bullets: [
          "Confirmăm disponibilitatea în funcție de ora aterizării",
          "Fără taxe de aeroport și fără garanție pe card",
          "Contract și factură la predare",
          "Rovinietă inclusă, kilometraj generos",
        ],
      },
      {
        heading: "Ce documente îți trebuie la sosire",
        paragraphs: [
          "Ai nevoie de carte de identitate sau pașaport și de permis de conducere valabil de minimum un an. Pentru cetățenii din afara UE recomandăm și permisul internațional, dacă permisul național nu este în alfabet latin.",
        ],
      },
      {
        heading: "Unde poți merge din Cluj cu mașina închiriată",
        paragraphs: [
          "Aeroportul Cluj este poarta de intrare spre Transilvania: Salina Turda la 45 de minute, Rimetea la o oră și jumătate, Apusenii și Lacul Beliș la două ore, Sighișoara și Alba Iulia la câteva ore de drum bun.",
        ],
      },
    ],
    faq: [
      {
        q: "Livrați mașina în terminalul Aeroportului Cluj?",
        a: "Predarea se face în Gilău, la circa 25 km de aeroport (30–40 de minute). Astfel evităm taxele de terminal și păstrăm tariful mic.",
      },
      {
        q: "Cum ajung de la aeroport la Gilău?",
        a: "Cu taxi sau ride-sharing în 30–40 de minute, ori cu autobuzul metropolitan din Cluj-Napoca spre Gilău.",
      },
      {
        q: "Pot rezerva în avans pentru data zborului?",
        a: "Da. Trimiteți data și ora aterizării prin formular sau telefonic și blocăm mașina dorită.",
      },
    ],
  },
];

export function getLocation(slug: string): LocationPage | undefined {
  return locations.find((l) => l.slug === slug);
}
