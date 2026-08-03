export interface BlogSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  date: string;
  readingMinutes: number;
  category: string;
  excerpt: string;
  sections: BlogSection[];
}

export const posts: BlogPost[] = [
  {
    slug: "inchirieri-auto-cluj-ghid-complet",
    title: "Închirieri auto în Cluj: ghidul complet pentru 2026",
    metaTitle: "Închirieri auto Cluj 2026: tarife și acte | DCO",
    description:
      "Ghid pentru închirieri auto în Cluj și Gilău: tarife de la 70 lei/zi, actele necesare, kilometraj și sfaturi de rezervare.",

    date: "2026-07-12",
    readingMinutes: 6,
    category: "Ghid",
    excerpt:
      "Cât costă o mașină de închiriat în Cluj, ce acte îți trebuie și ce trebuie verificat înainte de a pleca la drum.",
    sections: [
      {
        heading: "Cât costă închirierea unei mașini în Cluj",
        paragraphs: [
          "Prețurile pentru închirieri auto în zona Cluj-Napoca variază în funcție de clasă, sezon și durata închirierii. La DCO Rent a Car tarifele pornesc de la 70 lei pe zi, iar pentru perioade mai lungi de o săptămână prețul pe zi scade.",
          "Diferența majoră față de firmele mari din aeroport este predarea personală: la noi te întâlnești direct cu proprietarul în Gilău, la 12 km de centrul Clujului, fără birou de terminal.",
        ],
        bullets: [
          "Clasa economică (Škoda Fabia, Renault Clio Symbol): de la 70 lei/zi",
          "Break-uri și berline (Ford Focus, VW Passat, Volvo S40): tarif la cerere",
          "Automate și 7 locuri (Citroën C5, Volvo XC90): tarif la cerere",
          "Reduceri pentru închirieri de peste 7 zile",
        ],
      },
      {
        heading: "Ce acte îți trebuie",
        paragraphs: [
          "Pentru a închiria o mașină în Cluj ai nevoie de carte de identitate sau pașaport și de permis de conducere valabil de minimum un an. Predarea se face personal în Gilău, iar la cerere putem emite factură.",
        ],
      },
      {
        heading: "Cum eviți costurile ascunse",
        paragraphs: [
          "Citește întotdeauna ce include tariful. Verifică limita de kilometri, franșiza în caz de daună, costul combustibilului la predare și dacă se percep taxe suplimentare pentru al doilea șofer sau pentru ieșirea din țară.",
        ],
        bullets: [
          "Întreabă dacă kilometrajul este limitat",
          "Confirmă politica de combustibil (plin la plin)",
          "Fotografiază mașina la preluare și la predare",
          "Cere în scris tariful total, nu doar prețul pe zi",
        ],
      },
      {
        heading: "Când să rezervi",
        paragraphs: [
          "Vara și în perioada sărbătorilor, cererea în Cluj crește semnificativ, mai ales pentru mașini automate. Recomandăm o rezervare cu 3–7 zile înainte; în extrasezon găsești mașini disponibile și de pe o zi pe alta.",
        ],
      },
    ],
  },
  {
    slug: "rute-de-o-zi-plecand-din-cluj",
    title: "7 rute de o zi cu mașina, plecând din Cluj",
    metaTitle: "7 rute de o zi cu mașina din Cluj | DCO Rent a Car",
    description:
      "Excursii de o zi cu mașina din Cluj: Salina Turda, Cheile Turzii, Rimetea, Beliș, Tarnița și Alba Iulia, cu distanțe reale.",

    date: "2026-07-20",
    readingMinutes: 7,
    category: "Rute locale",
    excerpt:
      "Distanțe, timpi de mers și ce vezi pe drum pentru șapte trasee ușoare de o zi în jurul Clujului — perfecte pentru o mașină închiriată.",
    sections: [
      {
        heading: "1. Salina Turda (35 km, ~45 min)",
        paragraphs: [
          "Cea mai accesibilă escapadă din Cluj. Drumul pe E81 este bun, iar salina are parcare proprie. Se combină ușor cu Cheile Turzii în aceeași zi.",
        ],
      },
      {
        heading: "2. Cheile Turzii (35 km, ~50 min)",
        paragraphs: [
          "Traseu de drumeție ușor–mediu, cu parcare la intrarea în chei. Ultimii kilometri sunt pe drum comunal, deci o mașină normală de oraș este suficientă, dar mergi atent.",
        ],
      },
      {
        heading: "3. Rimetea și Colții Trascăului (75 km, ~1h 30min)",
        paragraphs: [
          "Satul cu case albe de la poalele Colților Trascăului este una dintre cele mai fotografiate destinații din Transilvania. Drumul trece prin Buru și Lunca Trascăului.",
        ],
      },
      {
        heading: "4. Lacul Tarnița (35 km, ~50 min)",
        paragraphs: [
          "Cea mai rapidă ieșire la apă din Cluj, pe drumul spre Gilău și Someșul Cald. Plecând din Gilău, ești pe lac în 25 de minute.",
        ],
      },
      {
        heading: "5. Beliș–Fântânele (80 km, ~1h 45min)",
        paragraphs: [
          "Lacul Beliș-Fântânele, în Apuseni, e ideal pentru o zi liniștită. Drumul urmează valea Someșului Cald prin Mărișel; iarna verifică starea carosabilului înainte de plecare.",
        ],
      },
      {
        heading: "6. Alba Iulia (100 km, ~1h 40min)",
        paragraphs: [
          "Cetatea Alba Carolina se vizitează confortabil într-o zi. Drum bun, parcări în apropierea cetății.",
        ],
      },
      {
        heading: "7. Cheile Râmețului și Râmeț (110 km, ~2h)",
        paragraphs: [
          "Pentru cine vrea un traseu mai spectaculos: mănăstirea Râmeț și cheile alăturate. Ultima porțiune de drum e mai îngustă, așa că recomandăm plecarea dimineața.",
        ],
      },
      {
        heading: "Sfaturi pentru drumurile din jurul Clujului",
        paragraphs: [
          "Verifică rovinieta (la noi este inclusă), pornește cu rezervorul plin, iar în Apuseni ia în calcul acoperirea slabă a semnalului GSM — descarcă harta offline.",
        ],
      },
    ],
  },
  {
    slug: "de-la-aeroportul-cluj-la-gilau",
    title: "De la Aeroportul Cluj la Gilău: cum ajungi și de ce merită",
    metaTitle: "Aeroportul Cluj → Gilău: cum ajungi | DCO",
    description:
      "Cum ajungi de la Aeroportul Cluj la Gilău, cât durează și de ce închirierea din Gilău costă mai puțin decât în aeroport.",

    date: "2026-07-26",
    readingMinutes: 4,
    category: "Logistică",
    excerpt:
      "Aeroport → Gilău în aproximativ 35 de minute. Ce variante ai și cum economisești câteva sute de lei la o închiriere de o săptămână.",
    sections: [
      {
        heading: "Distanța și timpul",
        paragraphs: [
          "Aeroportul Internațional Avram Iancu Cluj se află la circa 25 km de Gilău. Cu mașina, drumul durează 30–40 de minute, în funcție de traficul din Cluj-Napoca și de ocolitoarea Florești.",
        ],
      },
      {
        heading: "Opțiuni de transfer",
        paragraphs: [
          "Poți folosi un taxi sau o aplicație de ride-sharing până în Gilău, sau transportul public până în centrul Clujului și apoi un autobuz metropolitan spre Gilău. Pentru grupuri, taxiul rămâne cea mai simplă variantă.",
        ],
        bullets: [
          "Taxi / ride-sharing: 30–40 min",
          "Autobuz metropolitan din Cluj spre Gilău: cursă frecventă",
          "Transfer stabilit direct cu noi, la programare",
        ],
      },
      {
        heading: "De ce e mai ieftin decât în aeroport",
        paragraphs: [
          "Firmele cu birou în terminal includ în tarif costul spațiului și taxele de aeroport. Noi predăm mașinile personal în Gilău, iar diferența de preț pe o săptămână poate depăși valoarea a două zile de închiriere.",
        ],
      },
    ],
  },
  {
    slug: "iarna-in-apuseni-cu-masina-inchiriata",
    title: "Iarna în Apuseni cu mașina închiriată: trasee sigure",
    metaTitle: "Iarna în Apuseni cu mașina închiriată | DCO",
    description:
      "Ce să știi înainte de a urca în Apuseni iarna cu o mașină închiriată din Cluj: anvelope, trasee și reguli de siguranță.",

    date: "2026-07-30",
    readingMinutes: 5,
    category: "Sezon",
    excerpt:
      "Anvelope de iarnă, trasee testate și regulile de bază pentru drumurile de munte din jurul Clujului în sezonul rece.",
    sections: [
      {
        heading: "Dotarea mașinii",
        paragraphs: [
          "Toate mașinile noastre primesc anvelope de iarnă în sezonul rece, racletă și lichid de parbriz antigel. Pentru trasee de munte îți recomandăm să ceri la rezervare o mașină cu gardă la sol mai mare.",
        ],
      },
      {
        heading: "Trasee recomandate iarna",
        paragraphs: [
          "Drumurile spre Tarnița, Mărișel și Beliș sunt de obicei deszăpezite, dar pot fi alunecoase dimineața. Evită drumurile forestiere și pasajele nemarcate fără informații actualizate despre starea carosabilului.",
        ],
        bullets: [
          "Gilău – Tarnița: scurt, panoramic, accesibil",
          "Gilău – Mărișel – Beliș: verifică starea drumului înainte",
          "Băișoara: acces la pârtie, drum întreținut în sezon",
        ],
      },
      {
        heading: "Reguli practice",
        paragraphs: [
          "Pornește cu rezervorul plin, lasă distanțe mai mari, folosește frâna de motor la coborâri și anunță-ne dacă intenționezi să ieși pe drumuri de munte, ca să pregătim mașina potrivită.",
        ],
      },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function formatDateRo(iso: string): string {
  return new Date(iso).toLocaleDateString("ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
