import { countyLocations } from "./locations-county";

export interface LocationSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface LocationPage {
  slug: string;
  city: string;
  navLabel: string;
  /** Text folosit în linkurile interne (implicit „Rent a Car {city}”). */
  linkTitle?: string;
  /** Limba conținutului paginii (implicit „ro”). */
  lang?: "ro" | "en";
  h1: string;
  metaTitle: string;
  description: string;
  keywords: string;
  intro: string;
  highlights: { label: string; value: string }[];
  sections: LocationSection[];
  faq: { q: string; a: string }[];
  /** Sluguri ale localităților învecinate, afișate primele în linkurile interne. */
  nearby?: string[];
}


export const locations: LocationPage[] = [
  {
    slug: "rent-a-car-cluj",
    city: "Cluj",
    navLabel: "Rent a Car Cluj",
    linkTitle: "Rent a Car Cluj",
    h1: "Rent a Car Cluj — mașini de închiriat de la 70 lei/zi, fără garanție",
    metaTitle: "Rent a Car Cluj | Mașini de închiriat de la 70 lei/zi",
    description:
      "Rent a car Cluj direct de la proprietar: mașini de închiriat de la 70 lei/zi, fără garanție, rovinietă și AC incluse, predare în Gilău. Sună (0742) 925 934.",
    keywords:
      "rent a car cluj, rent a car cluj napoca, cluj rent a car, inchirieri auto cluj, masini de inchiriat cluj, rent a car cluj ieftin, rent a car cluj fara garantie",
    intro:
      "DCO Rent a Car este un serviciu local de rent a car în Cluj: închiriezi mașina direct de la proprietar, fără birou de terminal, fără comision de rezervare și fără garanție blocată pe card. Tarifele pornesc de la 70 lei/zi, iar ora de predare o stabilim împreună pe telefon sau WhatsApp.",
    highlights: [
      { label: "Tarif de la", value: "70 lei/zi" },
      { label: "Garanție", value: "Fără" },
      { label: "Predare", value: "Personală" },
      { label: "Acoperire", value: "Cluj · Gilău · Florești" },
    ],
    sections: [
      {
        heading: "Ce include un rent a car în Cluj la noi",
        paragraphs: [
          "Tariful afișat este tariful final: include asigurarea RCA, ITP valabil, rovinieta, aerul condiționat și anvelopele de sezon. Nu percepem taxe de aeroport, taxe de birou, taxe pentru al doilea șofer sau suprataxe pentru predare în afara orelor obișnuite — exact costurile care umflă factura la firmele mari de rent a car din Cluj-Napoca.",
          "Pentru închirieri de mai multe zile, o săptămână sau o lună, tariful pe zi scade. Prețul final se negociază în funcție de mașina aleasă și de durata închirierii, iar disponibilitatea o confirmăm rapid.",
        ],
        bullets: [
          "Tarife de la 70 lei/zi, negociabile pentru perioade lungi",
          "Fără garanție și fără card de credit obligatoriu",
          "Rovinietă, RCA, ITP și AC incluse în preț",
          "Predare personală în Gilău, Florești sau Cluj-Napoca",
        ],
      },
      {
        heading: "Flota de rent a car disponibilă în Cluj",
        paragraphs: [
          "Flota este proprie și verificată înainte de fiecare predare. Pentru oraș și parcări strâmte în centrul Clujului recomandăm Škoda Fabia sau Renault Clio Symbol, cu consum mic. Pentru bagaje, mutări sau drumuri lungi avem break-uri VW Passat și Ford Focus. Pentru confort există Volvo S40 și Citroën C5 cu cutie automată, iar pentru familii sau grupuri, Volvo XC90 cu 7 locuri.",
        ],
        bullets: [
          "Clasă economică pentru oraș și navetă",
          "Break-uri pentru bagaje și transport",
          "Cutie automată disponibilă (Citroën C5)",
          "7 locuri disponibile (Volvo XC90)",
        ],
      },
      {
        heading: "Cum închiriezi mașina în 3 pași",
        paragraphs: [
          "Trimiți perioada dorită și clasa de mașină pe WhatsApp sau suni la (0742) 925 934. Primești confirmarea disponibilității și tariful exact. La predare ai nevoie de buletin și permis de conducere valabil de minimum un an — atât.",
          "Predarea se face personal în Gilău (25 km de Aeroportul Avram Iancu), în Florești sau în Cluj-Napoca, la ora stabilită de comun acord. Tocmai pentru că nu avem birou în terminal, tariful zilnic rămâne mic.",
        ],
      },
      {
        heading: "Rent a car Cluj-Napoca: sfaturi pentru condus și parcare în oraș",
        paragraphs: [
          "În centrul Clujului parcarea se plătește în majoritatea zonelor, de obicei prin SMS sau aplicație. Verifică întotdeauna indicatoarele din zonă. Pentru vizite în centru, o mașină mică e mult mai ușor de parcat decât un SUV sau un break.",
          "Orele de vârf (dimineața și după-amiaza) aglomerează Calea Florești, Calea Turzii, Bulevardul Muncii și drumul spre aeroport. Dacă ai un zbor de prins, pleacă din timp.",
        ],
        bullets: [
          "Mașină mică pentru centru și cartiere aglomerate",
          "Plata parcării prin SMS sau aplicație, după indicatoare",
          "Pleacă din timp spre aeroport în orele de vârf",
        ],
      },
      {
        heading: "Rent a car Cluj pentru turiști, firme și localnici",
        paragraphs: [
          "Turiștii închiriază de obicei pentru Salina Turda, Cheile Turzii, Lacul Tarnița, Munții Apuseni sau Transfăgărășan. Firmele cer mașini pentru angajați detașați sau proiecte de câteva săptămâni, cu factură. Localnicii ne sună cel mai des când mașina proprie e în service sau în daună.",
          "Pentru fiecare situație îți recomandăm mașina potrivită: economică pentru oraș, break pentru bagaje, automată pentru confort sau 7 locuri pentru grupuri.",
        ],
      },
    ],
    faq: [
      {
        q: "Cât costă un rent a car în Cluj?",
        a: "De la 70 lei/zi pentru clasa economică. Pentru închirieri de o săptămână sau o lună, tariful pe zi este mai mic și se negociază în funcție de mașină.",
      },
      {
        q: "Este nevoie de garanție sau de card de credit?",
        a: "Nu. Nu blocăm garanție pe card și nu cerem card de credit. Ai nevoie doar de buletin și permis valabil de cel puțin un an.",
      },
      {
        q: "Unde se face predarea mașinii în Cluj?",
        a: "Predarea este personală, în Gilău, Florești sau Cluj-Napoca, la ora stabilită împreună. Nu există birou în terminalul aeroportului.",
      },
      {
        q: "Aveți mașini cu cutie automată sau de 7 locuri?",
        a: "Da. Citroën C5 are cutie automată, iar Volvo XC90 are 7 locuri. Confirmă disponibilitatea la (0742) 925 934.",
      },
      {
        q: "Puteți preda mașina la Aeroportul Cluj?",
        a: "Nu avem birou în aeroport. Predarea e personală, în Gilău sau la un punct stabilit telefonic, iar ora o adaptăm după zborul tău.",
      },
      {
        q: "Pot închiria o mașină în Cluj pentru o lună?",
        a: "Da. Pentru o lună sau mai mult, tariful pe zi scade și se stabilește în funcție de mașina aleasă. Sună la (0742) 925 934 pentru o ofertă.",
      },
      {
        q: "Pot ieși din țară cu mașina închiriată din Cluj?",
        a: "Întreabă înainte de rezervare, la (0742) 925 934. Condițiile pentru ieșirea din țară se stabilesc separat, pentru fiecare închiriere.",
      },
    ],
  },
  {
    slug: "car-rental-cluj-napoca",
    city: "Cluj-Napoca (English)",
    navLabel: "Car rental Cluj-Napoca (EN)",
    linkTitle: "Car Rental Cluj-Napoca (English)",
    lang: "en",
    h1: "Car Rental Cluj-Napoca — rent a car in Cluj from 70 RON/day",
    metaTitle: "Car Rental Cluj-Napoca | Rent a Car Cluj from 14 €/day",
    description:
      "Car rental in Cluj-Napoca from 70 RON/day (≈14 €). No deposit, no credit card, road tax and A/C included. Call +40 742 925 934.",
    keywords:
      "car rental cluj napoca, rent a car cluj, car hire cluj napoca, cheap car rental cluj, car rental cluj romania, rent a car cluj no deposit",
    intro:
      "Car rental in Cluj-Napoca directly from the owner: no terminal desk, no booking commission and no deposit blocked on your card. Daily rates start at 70 RON (about 14 €) and the pickup time is agreed with you by phone or WhatsApp.",
    highlights: [
      { label: "From", value: "70 RON / day" },
      { label: "Deposit", value: "None" },
      { label: "Pickup", value: "Gilău / Cluj-Napoca" },
      { label: "Included", value: "Road tax + A/C" },
    ],
    sections: [
      {
        heading: "What car rental in Cluj-Napoca includes",
        paragraphs: [
          "The advertised rate is the final rate: RCA insurance, valid technical inspection, the Romanian road tax (rovinietă), air conditioning and seasonal tyres are all included. We charge no airport fee, no office fee, no second-driver fee and no out-of-hours surcharge — the extras that usually double the bill at international car hire desks in Cluj-Napoca.",
          "Rates go down for weekly and monthly rentals. Because we are a small local operator based in Gilău rather than a terminal desk, the daily price stays low all year.",
        ],
        bullets: [
          "From 70 RON (≈14 €) per day, lower for long rentals",
          "No deposit and no credit card required",
          "Road tax, insurance and A/C included",
          "English spoken on WhatsApp and by phone",
        ],
      },
      {
        heading: "Cars available to rent in Cluj",
        paragraphs: [
          "Economy cars (Škoda Fabia, Renault Clio Symbol) are ideal for the narrow streets and paid parking of central Cluj-Napoca. Estates (VW Passat, Ford Focus) take luggage for Transylvania road trips, a Volvo S40 and an automatic Citroën C5 cover comfort, and a 7-seat Volvo XC90 works for families or groups.",
        ],
        bullets: [
          "Automatic transmission available (Citroën C5)",
          "7-seater available (Volvo XC90)",
          "Estates for luggage and long trips",
          "All cars checked before every handover",
        ],
      },
      {
        heading: "How to book and what you need",
        paragraphs: [
          "Send your dates and preferred car class on WhatsApp or call +40 742 925 934. You get availability and the exact price back, usually within minutes. At pickup you need a passport or ID card and a driving licence held for at least one year; non-EU drivers should carry an international driving permit if their licence is not in Latin script.",
          "Handover happens in Gilău (25 km from Cluj Avram Iancu Airport), in Florești or in Cluj-Napoca, at a time we agree together.",
        ],
      },
    ],
    faq: [
      {
        q: "How much is car rental in Cluj-Napoca?",
        a: "From 70 RON (about 14 €) per day for an economy car. Weekly and monthly rentals get a lower daily rate.",
      },
      {
        q: "Do I need a deposit or a credit card?",
        a: "No. We do not block a deposit and we do not require a credit card — only an ID or passport and a driving licence held for at least one year.",
      },
      {
        q: "Can I pick the car up at Cluj Airport?",
        a: "Handover is in Gilău, roughly 25 km (30–40 minutes) from the terminal. Skipping airport fees is what keeps the daily rate low.",
      },
    ],
  },
  {
    slug: "rent-a-car-cluj-napoca",
    city: "Cluj-Napoca",
    navLabel: "Cluj-Napoca",
    h1: "Rent a Car Cluj-Napoca — mașini de închiriat de la 70 lei/zi",
    metaTitle: "Rent a Car Cluj-Napoca | Mașini de la 70 lei/zi",
    description:
      "Rent a car Cluj-Napoca ieftin: mașini de închiriat de la 70 lei/zi, fără garanție, predare personală. Sună (0742) 925 934.",
    keywords:
      "rent a car cluj napoca, inchirieri auto cluj napoca, masini de inchiriat cluj",
    intro:
      "Închiriezi mașina direct de la proprietar, fără birou de terminal. Predare stabilită de comun acord pentru clienții din Cluj-Napoca, mașini verificate înainte de predare.",
    highlights: [
      { label: "Tarif de la", value: "70 lei/zi" },
      { label: "Predare", value: "Personală" },
      { label: "Mașini", value: "Verificate" },
      { label: "Disponibilitate", value: "Rapidă" },
    ],
    sections: [
      {
        heading: "De ce să închiriezi de la noi în Cluj-Napoca",
        paragraphs: [
          "Firmele mari din Cluj-Napoca percep de obicei taxe suplimentare pentru al doilea șofer sau pentru predarea în afara orelor obișnuite. La noi predarea se face personal, iar ora o stabilim împreună.",
          "Flota este alcătuită din mașini întreținute, cu consum mic, potrivite atât pentru oraș, cât și pentru drumuri lungi: Škoda Fabia și Renault Clio Symbol pentru parcări strâmte în centru, Ford Focus break și VW Passat break pentru bagaje, Volvo S40, Citroën C5 automat și Volvo XC90 cu 7 locuri.",
        ],
        bullets: [
          "Predare personală, fără birou de terminal",
          "Mașini verificate, rovinietă inclusă, anvelope de sezon",
          "Permis de conducere valabil de minimum 1 an",
          "Disponibilitate confirmată rapid",
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
        q: "Ce acte îmi trebuie?",
        a: "Ai nevoie doar de buletin sau pașaport și permis valabil de minimum un an.",
      },
      {
        q: "Pot închiria mașina pe firmă?",
        a: "Da, putem emite factură pe firmă la cerere.",
      },
    ],
  },
  {
    slug: "rent-a-car-gilau",
    city: "Gilău",
    navLabel: "Gilău",
    h1: "Rent a Car Gilău — închirieri auto local, predare pe loc",
    metaTitle: "Rent a Car Gilău | Închirieri auto de la 70 lei/zi",
    description:
      "Rent a car Gilău și închirieri auto Cluj: mașini de închiriat de la 70 lei/zi, fără garanție, predare personală. Sună (0742) 925 934.",
    keywords:
      "rent a car gilau, inchirieri auto gilau, masini de inchiriat gilau, inchiriere auto floresti cluj",
    intro:
      "Baza noastră este în Gilău, așa că preluarea mașinii se face rapid, direct de la fața locului, fără drum până în centrul Clujului.",
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
          "Fiind din Gilău, putem preda mașina și în afara orelor obișnuite, iar dacă apare o problemă pe drum ajungem repede. Deservim constant Gilău, Florești, Luna de Sus, Someșu Rece și Căpușu Mare.",
          "Pentru localnici, închirierea pe termen mediu (o lună sau mai mult) are tarif special — util cât timp mașina personală e în service sau când ai nevoie de un al doilea autoturism în familie.",
        ],
        bullets: [
          "Predare și preluare în Gilău, fără taxă de livrare",
          "Ora predării o stabilim împreună, telefonic",
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
          "Flota include variantă automată (Citroën C5), break-uri spațioase (VW Passat, Ford Focus), berline Volvo S40, mașini mici și economice (Škoda Fabia, Renault Clio Symbol) și un Volvo XC90 cu 7 locuri. Sunați pentru disponibilitate în perioada dorită.",
        ],
      },
      {
        heading: "Gilău, poarta spre Apuseni și autostrada A3",
        paragraphs: [
          "Gilău e punctul de plecare ideal pentru drumuri spre vest și spre munte: DN1 spre Huedin și Oradea, drumul spre Lacul Tarnița și Mărișel, iar nodul A3 Gilău te duce rapid spre Turda și Câmpia Turzii fără să intri în traficul din Cluj-Napoca.",
          "Când ridici mașina de la noi din Gilău, eviți complet aglomerația din oraș la plecare. Pentru turiștii care vin cu avionul, stabilim predarea la ora potrivită după aterizare.",
        ],
        bullets: [
          "Acces rapid la nodul A3 Gilău",
          "DN1 spre Huedin, Bologa și Oradea",
          "Drum direct spre Tarnița, Mărișel și Beliș",
        ],
      },
      {
        heading: "Ce mașină alegi pentru drumurile din jurul Gilăului",
        paragraphs: [
          "Pentru drumuri de munte cu bagaje sau mai multe persoane recomandăm un break (VW Passat, Ford Focus, Renault Mégane Break) sau Volvo XC90 cu 7 locuri. Pentru navetă spre Cluj-Napoca sau Florești, o mașină economică precum Škoda Fabia sau Renault Clio Symbol consumă cel mai puțin. Iarna, toate mașinile au anvelope de sezon.",
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
      {
        q: "Cât de departe e Gilău de Aeroportul Cluj?",
        a: "Aproximativ 25 km. De la aeroport traversezi Cluj-Napoca spre vest, pe DN1. Ora de predare o stabilim după ora aterizării tale.",
      },
      {
        q: "Pot ridica mașina în Gilău și pleca direct pe autostrada A3?",
        a: "Da. Nodul A3 Gilău este foarte aproape, deci poți pleca rapid spre Turda sau Târgu Mureș fără să treci prin Cluj-Napoca.",
      },
      {
        q: "Ce acte îmi trebuie pentru închiriere în Gilău?",
        a: "Buletin sau pașaport și permis de conducere valabil de minimum un an. Nu cerem garanție și nici card de credit.",
      },
    ],
  },
  {
    slug: "rent-a-car-aeroport-cluj",
    city: "Aeroport Cluj",
    navLabel: "Aeroport Cluj",
    h1: "Rent a Car Aeroport Cluj — mașină pregătită la aterizare",
    metaTitle: "Rent a Car Aeroport Cluj | Mașini de la 70 lei/zi",
    description:
      "Rent a car Aeroport Cluj-Napoca: mașini de închiriat de la 70 lei/zi, fără garanție, predare personală la aterizare. Sună (0742) 925 934.",
    keywords:
      "rent a car aeroport cluj, inchirieri auto aeroport cluj, masina de inchiriat aeroport cluj napoca",
    intro:
      "Vii cu avionul în Cluj? Pregătim mașina pentru ziua și ora aterizării, cu tarife mai mici decât la ghișeele din terminal, pentru că nu plătim spațiu în aeroport.",
    highlights: [
      { label: "Aeroport – Gilău", value: "~35 min" },
      { label: "Distanță", value: "25 km" },
      { label: "Tarif de la", value: "70 lei/zi" },
      { label: "Predare", value: "Personală" },
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
          "Fără taxe de aeroport",
          "Predare personală în Gilău",
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
  {
    slug: "inchirieri-auto-cluj",
    city: "Cluj",
    navLabel: "Închirieri auto Cluj",
    linkTitle: "Închirieri auto Cluj",
    h1: "Închirieri auto Cluj (rent a car Cluj) — pe zi, săptămână sau lună",
    metaTitle: "Închirieri auto Cluj | Rent a Car Cluj de la 70 lei/zi",
    description:
      "Închirieri auto Cluj ieftine: mașini de închiriat de la 70 lei/zi pe zi, săptămână sau lună, fără garanție. Predare personală. Sună (0742) 925 934.",
    keywords:
      "inchirieri auto cluj, inchiriere masina cluj, inchirieri masini cluj, inchirieri auto cluj pret, inchirieri auto ieftine cluj",
    intro:
      "Închirieri auto în Cluj fără birou de terminal și fără costuri ascunse: tarif de la 70 lei/zi, mașini cu ITP, RCA, rovinietă și aer condiționat, predare personală la ora stabilită împreună.",
    highlights: [
      { label: "Tarif de la", value: "70 lei/zi" },
      { label: "Închiriere", value: "1 zi – 1 lună+" },
      { label: "Rovinietă", value: "Inclusă" },
      { label: "Rezervare", value: "Telefon / WhatsApp" },
    ],
    sections: [
      {
        heading: "Cât costă o închiriere auto în Cluj",
        paragraphs: [
          "Tariful pornește de la 70 lei pe zi pentru clasa economică (Škoda Fabia, Renault Clio Symbol) și crește moderat pentru break-uri, berline sau pentru Volvo XC90 cu 7 locuri. Cu cât perioada este mai lungă, cu atât prețul pe zi scade — pentru închirieri de peste 7 zile și pentru cele lunare facem ofertă separată.",
          "Prețul afișat include ITP, RCA, rovinieta și aerul condiționat. Nu percepem taxă de aeroport, taxă de birou sau comision de rezervare.",
        ],
        bullets: [
          "Clasa economică: de la 70 lei/zi",
          "Break sau berlină pentru bagaje și drumuri lungi",
          "Automat (Citroën C5) la cerere",
          "Tarif redus pentru închirieri săptămânale și lunare",
        ],
      },
      {
        heading: "Închiriere pe zi, pe săptămână sau pe lună",
        paragraphs: [
          "Pentru o zi sau două te ajutăm rapid: confirmăm disponibilitatea telefonic și stabilim ora predării. Pentru o săptămână sau mai mult, primești tarif degresiv — cea mai bună variantă când mașina personală e în service sau în daună.",
          "Închirierea lunară este cerută mai ales de firme care au nevoie de un autoturism suplimentar pentru un proiect și de persoane care se mută temporar în Cluj. Emitem factură pe firmă la cerere.",
        ],
        bullets: [
          "Închiriere pe termen scurt, 1–3 zile",
          "Închiriere săptămânală cu preț pe zi mai mic",
          "Închiriere lunară pentru firme și persoane fizice",
          "Factură pe firmă la cerere",
        ],
      },
      {
        heading: "Ce ai nevoie ca să închiriezi",
        paragraphs: [
          "Permis de conducere valabil de minimum un an și carte de identitate sau pașaport. Fără dosare, fără drumuri suplimentare: ne suni sau scrii pe WhatsApp cu perioada dorită, iar noi îți spunem imediat ce mașini sunt libere.",
        ],
      },
    ],
    faq: [
      {
        q: "Cât costă închirierea unei mașini în Cluj?",
        a: "De la 70 lei pe zi pentru clasa economică. Pentru închirieri de peste o săptămână sau pe lună, tariful pe zi scade — cere o ofertă telefonic.",
      },
      {
        q: "Pot închiria o mașină pe o lună întreagă în Cluj?",
        a: "Da, închirierile lunare au tarif special și se pot factura pe firmă.",
      },
      {
        q: "Se plătesc taxe suplimentare?",
        a: "Nu. Tariful include ITP, RCA, rovinietă și aer condiționat, fără taxe de birou sau comisioane de rezervare.",
      },
    ],
  },
  {
    slug: "masini-de-inchiriat-cluj",
    city: "Cluj (flotă)",
    navLabel: "Mașini de închiriat",
    linkTitle: "Mașini de închiriat Cluj",
    h1: "Mașini de închiriat în Cluj — flota rent a car Cluj disponibilă",
    metaTitle: "Mașini de închiriat Cluj | Rent a Car Cluj, 70 lei/zi",
    description:
      "Mașini de închiriat în Cluj: economice, break, berline, cutie automată și 7 locuri. Toate cu ITP, RCA și rovinietă. De la 70 lei/zi.",
    keywords:
      "masini de inchiriat cluj, inchirieri masini cluj, masina de inchiriat cluj napoca, masini de inchiriat automat cluj, masina 7 locuri de inchiriat cluj",
    intro:
      "Vezi ce mașini de închiriat sunt disponibile în Cluj: de la modele mici și economice pentru oraș, până la break-uri spațioase, o variantă automată și un SUV cu 7 locuri.",
    highlights: [
      { label: "Clase", value: "5 categorii" },
      { label: "Automat", value: "Disponibil" },
      { label: "7 locuri", value: "Volvo XC90" },
      { label: "Tarif de la", value: "70 lei/zi" },
    ],
    sections: [
      {
        heading: "Mașini economice pentru oraș",
        paragraphs: [
          "Škoda Fabia și Renault Clio Symbol sunt cele mai cerute: consum mic, ușor de parcat în centrul Clujului și cel mai bun raport preț/utilitate pentru deplasări zilnice. Sunt varianta potrivită dacă ai nevoie de mașină doar pentru drumuri scurte în oraș și în zona metropolitană.",
        ],
        bullets: [
          "Škoda Fabia — consum mic, ideală în oraș",
          "Renault Clio Symbol — portbagaj util, costuri reduse",
          "Aer condiționat pe toate mașinile",
          "Anvelope de sezon montate",
        ],
      },
      {
        heading: "Break-uri, berline și cutie automată",
        paragraphs: [
          "Pentru bagaje, mutări mici sau drumuri lungi recomandăm Ford Focus break și VW Passat break. Volvo S40 este berlina confortabilă pentru deplasări de business, iar Citroën C5 este varianta cu cutie automată — cea mai căutată de șoferii care conduc doar automat.",
        ],
        bullets: [
          "VW Passat break — spațiu maxim de bagaje",
          "Ford Focus break — echilibru între consum și spațiu",
          "Volvo S40 — berlină confortabilă",
          "Citroën C5 — cutie automată",
        ],
      },
      {
        heading: "Mașină cu 7 locuri de închiriat în Cluj",
        paragraphs: [
          "Volvo XC90 acoperă cererile de familie sau de grup: 7 locuri, tracțiune sigură pe drumurile de munte din Apuseni și portbagaj generos. Fiind o mașină unică în flotă, rezervarea din timp este recomandată, mai ales în weekend și în sezonul de vacanță.",
        ],
      },
    ],
    faq: [
      {
        q: "Aveți mașini automate de închiriat în Cluj?",
        a: "Da, Citroën C5 este cu cutie automată. Fiind singura variantă automată, e bine să o rezervi din timp.",
      },
      {
        q: "Există mașină cu 7 locuri?",
        a: "Da, Volvo XC90 cu 7 locuri. Disponibilitatea se confirmă telefonic pentru perioada dorită.",
      },
      {
        q: "Mașinile au rovinietă și aer condiționat?",
        a: "Toate mașinile au ITP, RCA, rovinietă și aer condiționat incluse în tarif.",
      },
    ],
  },
  {
    slug: "rent-a-car-floresti-cluj",
    city: "Florești",
    navLabel: "Florești",
    h1: "Închirieri auto Florești (Cluj) — mașini de închiriat de la 70 lei/zi",
    metaTitle: "Închirieri auto Florești | Mașini de la 70 lei/zi",
    description:
      "Închirieri auto Florești Cluj: mașini cu predare personală, fără taxă de livrare și fără garanție, de la 70 lei/zi. Sună (0742) 925 934.",
    keywords:
      "inchirieri auto floresti, inchirieri masini floresti, rent a car floresti, inchiriere masina floresti, masini de inchiriat floresti cluj, inchiriere auto de weekend floresti",
    intro:
      "Florești este la 5 km de baza noastră din Gilău, așa că predarea mașinii se face rapid, fără taxă de livrare și fără drum până în centrul Clujului.",
    highlights: [
      { label: "Distanță", value: "5 km" },
      { label: "Livrare", value: "Fără taxă" },
      { label: "Tarif de la", value: "70 lei/zi" },
      { label: "Cluj-Napoca", value: "~15 min" },
    ],
    sections: [
      {
        heading: "De ce Florești e zona noastră principală",
        paragraphs: [
          "Florești are cel mai mare număr de navetiști din județ, iar traficul spre Cluj-Napoca face dintr-o mașină de închiriat o soluție practică atunci când autoturismul personal e în service. Fiind la 5 km, aducem mașina în Florești fără cost suplimentar de livrare.",
          "Deservim toate zonele: Florești centru, Cetatea Fetei, Someșul Rece, Luna de Sus și zona Tăuți.",
        ],
        bullets: [
          "Predare în Florești fără taxă de livrare",
          "Ora predării stabilită telefonic",
          "Mașini cu ITP, RCA, rovinietă și AC",
          "Asistență rapidă, suntem în zonă",
        ],
      },
      {
        heading: "Pentru navetă, service sau weekend",
        paragraphs: [
          "Cele mai frecvente cereri din Florești: mașină de înlocuire cât timp cea personală e în service sau în daună, un al doilea autoturism pentru familie și mașini pentru excursii de weekend la Tarnița, Beliș sau Turda.",
        ],
        bullets: [
          "Mașină de înlocuire pe perioada reparației",
          "Al doilea autoturism în familie, cu tarif lunar",
          "Deplasări de business în Cluj-Napoca",
          "Excursii spre Apuseni și Salina Turda",
        ],
      },
      {
        heading: "Cum rezervi din Florești",
        paragraphs: [
          "Ne suni la (0742) 925 934 sau scrii pe WhatsApp cu perioada și clasa dorită. Confirmăm rapid ce mașini sunt libere și stabilim locul predării în Florești sau la baza din Gilău.",
        ],
      },
      {
        heading: "Navetă Florești – Cluj-Napoca cu mașina închiriată",
        paragraphs: [
          "Drumul dintre Florești și Cluj-Napoca trece prin Calea Florești, unde în orele de vârf coloana poate fi lungă. Dacă închiriezi pentru navetă, o mașină mică și economică e cea mai practică: consum mic în coloană și se parchează ușor în oraș. Dacă preferi să nu schimbi vitezele în trafic, avem și o mașină cu cutie automată.",
          "Pentru drumuri spre centru, zona Mănăștur, Iulius Mall sau spitalele din Cluj, plecarea mai devreme de ora de vârf economisește mult timp. Pentru drumuri spre Aeroportul Cluj, calculează traversarea întregului oraș.",
        ],
        bullets: [
          "Mașină economică pentru coloana de pe Calea Florești",
          "Cutie automată disponibilă (Citroën C5)",
          "Tarif lunar pentru navetă pe termen lung",
        ],
      },
      {
        heading: "Excursii de weekend din Florești",
        paragraphs: [
          "Din Florești ești aproape de ieșirea spre vest: Gilău, Lacul Tarnița, Lacul Beliș-Fântânele și Munții Apuseni. Pentru drumuri de munte cu bagaje sau mai multe persoane, un break (VW Passat, Ford Focus, Renault Mégane) sau Volvo XC90 cu 7 locuri e mai potrivit decât o mașină mică.",
        ],
      },
    ],
    faq: [
      {
        q: "Aduceți mașina în Florești?",
        a: "Da, Florești este la 5 km de baza noastră din Gilău și nu percepem taxă de livrare.",
      },
      {
        q: "Cât costă închirierea pentru locuitorii din Florești?",
        a: "De la 70 lei pe zi, cu tarif redus pentru închirieri săptămânale sau lunare.",
      },
      {
        q: "Pot închiria o mașină pentru navetă spre Cluj-Napoca?",
        a: "Da, închirierile pe termen mediu și lunar au tarif special, potrivit pentru navetă.",
      },
      {
        q: "Pot închiria o mașină doar de weekend?",
        a: "Da, poți închiria mașina doar pentru weekend — o ridici vineri și o returnezi luni, cu tarif de la 70 lei/zi. Ideal pentru excursii la Tarnița, Beliș sau Salina Turda.",
      },
      {
        q: "Se plătește garanție la închirierile din Florești?",
        a: "Nu. La noi nu se percepe garanție și nu blocăm bani pe card — plătești doar tariful de închiriere.",
      },
      {
        q: "Pot închiria o mașină în Florești fără card de credit?",
        a: "Da. Nu cerem card de credit și nu blocăm bani pe card. Ai nevoie doar de buletin și permis valabil de cel puțin un an.",
      },
      {
        q: "Ce mașină recomandați pentru traficul Florești – Cluj-Napoca?",
        a: "Pentru navetă zilnică pe Calea Florești recomandăm o mașină economică (Škoda Fabia sau Renault Clio Symbol). Dacă preferi să nu schimbi vitezele în coloană, întreabă de Citroën C5 cu cutie automată.",
      },
    ],
  },
  {
    slug: "car-rental-cluj",
    city: "Cluj (English)",
    navLabel: "Car rental Cluj (EN)",
    linkTitle: "Car Rental Cluj (English)",
    lang: "en",
    h1: "Car Rental Cluj — rent a car from 70 RON/day (≈14 €)",
    metaTitle: "Car Rental Cluj | Rent a Car from 14 €/day",
    description:
      "Car rental Cluj-Napoca and Gilău from 70 RON/day. Cheap rent a car Cluj with personal handover, no deposit, road tax and A/C included. Call +40742925934.",
    keywords:
      "car rental cluj, rent a car cluj, car hire cluj napoca, rent a car cluj airport, cheap car rental cluj romania",
    intro:
      "Rent a car in Cluj directly from the owner — no terminal desk, no booking commission. Cars are checked before every handover and the pickup time is agreed with you by phone or WhatsApp.",
    highlights: [
      { label: "From", value: "70 RON / day" },
      { label: "Pickup", value: "Gilău / Cluj" },
      { label: "Airport", value: "~35 min" },
      { label: "Road tax", value: "Included" },
    ],
    sections: [
      {
        heading: "Why rent a car in Cluj from us",
        paragraphs: [
          "International desks at Cluj Avram Iancu Airport add terminal fees, second-driver charges and out-of-hours surcharges. We are a small local operator based in Gilău, 25 km from the airport, so the daily rate stays low and the handover is personal.",
          "Every car comes with valid technical inspection, insurance (RCA), the Romanian road tax (rovinietă) and air conditioning. Seasonal tyres are fitted, so winter driving in Transylvania is covered.",
        ],
        bullets: [
          "Rates from 70 RON (≈14 €) per day",
          "No airport, office or booking fees",
          "Road tax, insurance and A/C included",
          "English spoken on WhatsApp and by phone",
        ],
      },
      {
        heading: "Fleet available for rent in Cluj",
        paragraphs: [
          "Economy cars (Škoda Fabia, Renault Clio Symbol) for city driving, estates (VW Passat, Ford Focus) for luggage, a Volvo S40 sedan, an automatic Citroën C5 and a 7-seat Volvo XC90 for families or groups.",
        ],
        bullets: [
          "Automatic transmission available (Citroën C5)",
          "7-seater available (Volvo XC90)",
          "Estate cars for luggage and long trips",
          "Weekly and monthly rates on request",
        ],
      },
      {
        heading: "What you need to rent",
        paragraphs: [
          "A passport or ID card and a driving licence held for at least one year. Non-EU drivers should also carry an international driving permit if the national licence is not in Latin script. Send us your dates on WhatsApp and we confirm availability quickly.",
        ],
      },
    ],
    faq: [
      {
        q: "How much does car rental in Cluj cost?",
        a: "From 70 RON (about 14 €) per day for an economy car. Weekly and monthly rentals get a lower daily rate.",
      },
      {
        q: "Do you deliver to Cluj Airport?",
        a: "Handover is in Gilău, about 25 km (30–40 minutes) from the airport. Avoiding terminal fees is what keeps the price low.",
      },
      {
        q: "Is the Romanian road tax included?",
        a: "Yes. The rovinietă, insurance, technical inspection and air conditioning are all included in the daily rate.",
      },
    ],
  },
  {
    slug: "inchirieri-auto-lunare-cluj",
    city: "Cluj (termen lung)",
    navLabel: "Închirieri lunare",
    linkTitle: "Închirieri auto lunare Cluj",
    h1: "Închirieri auto lunare în Cluj — rent a car Cluj pe termen lung",
    metaTitle: "Închirieri auto lunare Cluj | Rent a Car Cluj lunar",
    description:
      "Închirieri auto lunare Cluj: mașină pe termen lung la tarif degresiv, factură pe firmă, fără garanție. Sună (0742) 925 934.",
    keywords:
      "inchirieri auto lunare cluj, inchiriere masina pe luna cluj, rent a car termen lung cluj, masina de inchiriat pe luna cluj",
    intro:
      "Ai nevoie de o mașină pentru o lună sau mai mult în Cluj? Tariful pe zi scade semnificativ, iar factura se poate emite pe firmă.",
    highlights: [
      { label: "Perioadă", value: "1 lună+" },
      { label: "Tarif", value: "Degresiv" },
      { label: "Factură", value: "Pe firmă" },
      { label: "Rovinietă", value: "Inclusă" },
    ],
    sections: [
      {
        heading: "Cui se potrivește închirierea lunară",
        paragraphs: [
          "Firmele care au un proiect în Cluj și au nevoie de un autoturism suplimentar, persoanele relocate temporar în oraș și șoferii care rămân fără mașină pe perioada unei reparații lungi sau a unei daune plătesc mult mai puțin pe zi decât la o închiriere de 2–3 zile.",
          "Pentru perioade lungi stabilim împreună un tarif fix pe lună, fără surprize: rovinieta, RCA, ITP și aerul condiționat sunt deja incluse.",
        ],
        bullets: [
          "Tarif fix pe lună, agreat în avans",
          "Factură pe firmă la cerere",
          "Mașină de înlocuire pe perioada daunei",
          "Kilometraj generos pentru navetă",
        ],
      },
      {
        heading: "Ce mașini recomandăm pe termen lung",
        paragraphs: [
          "Pentru navetă și consum mic: Škoda Fabia sau Renault Clio Symbol. Pentru firme și drumuri lungi: VW Passat break, Ford Focus break sau Volvo S40. Pentru șoferii care conduc doar automat: Citroën C5.",
        ],
        bullets: [
          "Economic pentru navetă zilnică",
          "Break pentru marfă și bagaje",
          "Automat disponibil la cerere",
          "Volvo XC90 cu 7 locuri pentru echipe",
        ],
      },
      {
        heading: "Cum stabilim tariful lunar",
        paragraphs: [
          "Ne suni sau scrii pe WhatsApp cu perioada, clasa de mașină și kilometrajul estimat. Îți dăm un tarif clar pe lună și rezervăm mașina pentru toată perioada.",
        ],
      },
    ],
    faq: [
      {
        q: "Cât costă o mașină închiriată pe o lună în Cluj?",
        a: "Tariful se stabilește în funcție de clasa mașinii și de kilometraj, iar prețul pe zi este mult mai mic decât la închirierile scurte. Sună pentru o ofertă.",
      },
      {
        q: "Se poate emite factură pe firmă?",
        a: "Da, pentru închirierile lunare emitem factură pe firmă la cerere.",
      },
      {
        q: "Pot prelungi închirierea după prima lună?",
        a: "Da, prelungirea se face simplu, telefonic, dacă mașina nu este deja rezervată.",
      },
    ],
  },
  {
    slug: "rent-a-car",
    city: "Rent a Car",
    navLabel: "Rent a Car",
    linkTitle: "Rent a Car (ghid complet)",
    h1: "Rent a Car — cum închiriezi corect o mașină în România",
    metaTitle: "Rent a Car | Ghid complet de închirieri auto în Cluj",
    description:
      "Rent a car Cluj: ghid complet cu acte necesare, tarife de la 70 lei/zi, fără garanție și fără card de credit. Sună (0742) 925 934.",
    keywords:
      "rent a car, rent a car romania, rent a car cluj, rent a car cluj napoca, inchirieri auto, masini de inchiriat, car rental",
    intro:
      "„Rent a car” înseamnă închirierea unei mașini pe o perioadă stabilită, fără să o cumperi. Mai jos explicăm pe scurt cum funcționează serviciul, ce acte sunt necesare și cum obții cel mai bun tarif — iar dacă ești în Cluj-Napoca, Gilău sau Florești, îți predăm mașina personal, de la 70 lei/zi.",
    highlights: [
      { label: "Tarif de la", value: "70 lei/zi" },
      { label: "Acte", value: "CI + permis" },
      { label: "Predare", value: "Personală" },
      { label: "Zonă", value: "Județul Cluj" },
    ],
    sections: [
      {
        heading: "Ce înseamnă rent a car și cum funcționează",
        paragraphs: [
          "Un serviciu de rent a car îți pune la dispoziție un autoturism pentru o zi, o săptămână sau o lună întreagă. Tu plătești un tarif zilnic, iar mașina vine cu ITP, RCA și rovinietă valabile. La final o returnezi în starea în care ai primit-o, cu același nivel de combustibil.",
          "La firmele mari închirierea trece prin birou și prin proceduri lungi. La DCO Rent a Car procesul este direct: alegi mașina, stabilim tariful și ora predării, apoi ne întâlnim personal în Gilău sau într-un punct convenabil din Cluj-Napoca.",
        ],
        bullets: [
          "Tarif zilnic clar, negociabil pentru perioade lungi",
          "Mașini verificate înainte de fiecare predare",
          "ITP, RCA și rovinietă incluse",
          "Fără taxe ascunse pentru al doilea șofer",
        ],
      },
      {
        heading: "Ce acte sunt necesare pentru un rent a car",
        paragraphs: [
          "Ai nevoie de un permis de conducere valabil de minimum un an și de carte de identitate sau pașaport. Pentru persoane juridice putem emite factură pe firmă.",
        ],
        bullets: [
          "Permis de conducere valabil de minimum 1 an",
          "Carte de identitate sau pașaport",
          "Factură pe firmă la cerere",
        ],
      },
      {
        heading: "Cum se calculează tariful de închiriere",
        paragraphs: [
          "Prețul depinde de clasa mașinii și de durata închirierii. O mașină economică precum Škoda Fabia sau Renault Clio Symbol pornește de la 70 lei/zi, în timp ce un break, o berlină automată sau un SUV cu 7 locuri au tarif mai mare. Cu cât perioada este mai lungă, cu atât tariful zilnic scade.",
        ],
        bullets: [
          "Clasa economică: de la 70 lei/zi",
          "Break-uri și berline: tarif în funcție de model",
          "SUV 7 locuri: la cerere",
          "Reducere pentru închirieri săptămânale și lunare",
        ],
      },
      {
        heading: "Rent a car în Cluj-Napoca, Gilău și Florești",
        paragraphs: [
          "Acoperim tot județul Cluj: oraș, Florești, Gilău și zona aeroportului. Dacă vrei detalii pentru localitatea ta, folosește linkurile din josul paginii — fiecare zonă are propria pagină cu tarife și mod de predare.",
        ],
      },
    ],
    faq: [
      {
        q: "Ce înseamnă rent a car?",
        a: "Rent a car înseamnă închirierea unei mașini pentru o perioadă determinată, contra unui tarif zilnic, fără să devii proprietarul autoturismului.",
      },
      {
        q: "Cât costă un rent a car în Cluj?",
        a: "Tarifele pornesc de la 70 lei pe zi pentru clasa economică și sunt negociabile în funcție de model și de durata închirierii.",
      },
      {
        q: "Am nevoie de card de credit pentru închiriere?",
        a: "Nu. Închirierea se poate face fără card de credit, doar cu buletin sau pașaport și permis valabil de minimum un an.",
      },
      {
        q: "Care este vârsta minimă pentru a închiria o mașină?",
        a: "Este necesar un permis de conducere valabil de cel puțin un an; restul detaliilor le stabilim telefonic.",
      },
    ],
  },
  {
    slug: "rent-a-car-cluj-fara-garantie",
    city: "Cluj (fără garanție)",
    navLabel: "Fără garanție",
    linkTitle: "Rent a Car Cluj fără garanție",
    h1: "Rent a Car Cluj fără garanție și fără card de credit",
    metaTitle: "Rent a Car Cluj Fără Garanție | Fără Card de Credit",
    description:
      "Rent a car Cluj fără garanție și fără card de credit, de la 70 lei/zi. Doar buletin și permis, predare personală. Sună (0742) 925 934.",
    keywords:
      "rent a car cluj fara garantie, inchirieri auto cluj fara garantie, rent a car fara card de credit cluj, masina de inchiriat cluj fara garantie",
    intro:
      "La firmele mari blocarea garanției pe card poate ajunge la câteva mii de lei. La noi nu există garanție blocată și nu ai nevoie de card de credit: plătești doar tariful închirierii.",
    highlights: [
      { label: "Garanție", value: "0 lei" },
      { label: "Card de credit", value: "Nu e necesar" },
      { label: "Tarif de la", value: "70 lei/zi" },
      { label: "Acte", value: "Buletin + permis" },
    ],
    sections: [
      {
        heading: "Ce înseamnă închiriere fără garanție",
        paragraphs: [
          "Nu blocăm nicio sumă pe card și nu cerem depozit în numerar. Închirierea se face direct între tine și proprietarul mașinii, cu date de identificare verificate la predare.",
          "Este soluția potrivită dacă ai doar card de debit, dacă nu vrei sume blocate câteva săptămâni sau dacă ai nevoie de o mașină rapid, fără proceduri lungi de birou.",
        ],
        bullets: [
          "Fără garanție blocată pe card",
          "Fără card de credit — și cardul de debit sau numerarul sunt acceptate",
          "Fără taxe ascunse la predare",
          "ITP, RCA, rovinietă și aer condiționat incluse",
        ],
      },
      {
        heading: "Ce mașini poți lua fără garanție",
        paragraphs: [
          "Toate mașinile din flotă se închiriază în aceleași condiții: Škoda Fabia și Renault Clio Symbol pentru oraș, Ford Focus break și VW Passat break pentru bagaje, Volvo S40, Citroën C5 automat și Volvo XC90 cu 7 locuri pentru familii sau grupuri.",
        ],
      },
      {
        heading: "Cum rezervi",
        paragraphs: [
          "Ne suni la (0742) 925 934 sau scrii pe WhatsApp cu perioada dorită. Confirmăm disponibilitatea, stabilim ora și locul predării în Cluj-Napoca, Florești sau Gilău și semnăm la fața locului.",
        ],
      },
    ],
    faq: [
      {
        q: "Chiar nu se blochează nicio garanție pe card?",
        a: "Nu. Nu blocăm sume pe card și nu cerem depozit în numerar; plătești doar tariful de închiriere.",
      },
      {
        q: "Pot închiria fără card de credit în Cluj?",
        a: "Da. Ai nevoie doar de buletin sau pașaport și de permis valabil de minimum un an.",
      },
      {
        q: "Ce se întâmplă în caz de daună?",
        a: "Discutăm situația direct, pe baza actelor mașinii, care are RCA valabil. Detaliile le stabilim telefonic înainte de predare.",
      },
    ],
  },
  {
    slug: "inchirieri-masini-cluj",
    city: "Cluj (mașini)",
    navLabel: "Închirieri mașini",
    linkTitle: "Închirieri mașini Cluj",
    h1: "Închirieri mașini Cluj — flotă disponibilă de la 70 lei/zi",
    metaTitle: "Închirieri Mașini Cluj | Flotă Disponibilă, 70 lei/zi",
    description:
      "Închirieri mașini în Cluj de la 70 lei/zi: economice, break-uri, automat și SUV 7 locuri. Predare personală, fără garanție. Sună (0742) 925 934.",
    keywords:
      "inchirieri masini cluj, închirieri mașini cluj, inchiriere masina cluj, masini de inchiriat cluj napoca, inchirieri masini cluj napoca",
    intro:
      "Închirieri mașini în Cluj cu predare personală și tarife negociabile după durată. Alegi clasa potrivită, noi confirmăm disponibilitatea pe perioada dorită.",
    highlights: [
      { label: "Clase", value: "4 tipuri" },
      { label: "Tarif de la", value: "70 lei/zi" },
      { label: "Automat", value: "Disponibil" },
      { label: "7 locuri", value: "Disponibil" },
    ],
    sections: [
      {
        heading: "Ce mașini poți închiria în Cluj",
        paragraphs: [
          "Flota acoperă nevoile obișnuite din Cluj: oraș, drumuri lungi, bagaje și grupuri. Toate mașinile au ITP, RCA, rovinietă și aer condiționat, iar anvelopele sunt de sezon.",
        ],
        bullets: [
          "Economic: Škoda Fabia, Renault Clio Symbol — consum mic, parcare ușoară",
          "Break: Ford Focus, VW Passat — spațiu pentru bagaje",
          "Berlină: Volvo S40 și Citroën C5 cu cutie automată",
          "SUV 7 locuri: Volvo XC90 pentru familii sau grupuri",
        ],
      },
      {
        heading: "Cât costă închirierea unei mașini în Cluj",
        paragraphs: [
          "Tariful pornește de la 70 lei/zi la clasa economică și crește la break, berlină automată și SUV. Pentru perioade de peste 7 zile tariful zilnic scade, iar pentru firme emitem factură.",
        ],
      },
      {
        heading: "Zone de predare",
        paragraphs: [
          "Baza este în Gilău, la 12 km de Cluj-Napoca. Predăm mașina în Cluj-Napoca, Florești, Gilău sau în zona aeroportului, la ora stabilită împreună.",
        ],
      },
    ],
    faq: [
      {
        q: "Aveți mașini cu cutie automată de închiriat în Cluj?",
        a: "Da, Citroën C5 este cu cutie automată. Disponibilitatea o confirmăm telefonic pentru perioada dorită.",
      },
      {
        q: "Se poate închiria o mașină cu 7 locuri în Cluj?",
        a: "Da, avem un Volvo XC90 cu 7 locuri, potrivit pentru familii și grupuri.",
      },
      {
        q: "Cât durează rezervarea?",
        a: "Confirmăm disponibilitatea în câteva minute la telefon sau pe WhatsApp, inclusiv în weekend.",
      },
    ],
  },
  {
    slug: "inchiriere-masina-cluj-aeroport",
    city: "Aeroport Cluj (predare)",
    navLabel: "Predare aeroport",
    linkTitle: "Închiriere mașină Cluj aeroport",
    h1: "Închiriere mașină Cluj aeroport — predare la aterizare",
    metaTitle: "Închiriere Mașină Cluj Aeroport | Predare la Aterizare",
    description:
      "Rent a car Aeroport Cluj-Napoca: închiriere mașină la aterizare de la 70 lei/zi, fără garanție. Predare personală. Sună (0742) 925 934.",
    keywords:
      "inchiriere masina cluj aeroport, rent a car aeroport cluj, inchirieri auto aeroport cluj napoca, masina de inchiriat aeroport cluj",
    intro:
      "Zbori spre Cluj și ai nevoie de mașină de la aterizare? Stabilim predarea în funcție de ora zborului, fără cozi la ghișeu și fără garanție blocată pe card.",
    highlights: [
      { label: "Predare", value: "La aterizare" },
      { label: "Tarif de la", value: "70 lei/zi" },
      { label: "Garanție", value: "0 lei" },
      { label: "Zbor întârziat", value: "Reprogramăm" },
    ],
    sections: [
      {
        heading: "Cum funcționează predarea la aeroportul Cluj",
        paragraphs: [
          "Ne trimiți numărul zborului și ora aterizării, iar noi ne sincronizăm cu programul tău. Dacă zborul întârzie, ajustăm ora predării fără costuri suplimentare.",
          "Aeroportul Internațional Avram Iancu se află la circa 20 de minute de Gilău, unde este baza noastră, așa că ajungem rapid la un punct de întâlnire convenabil.",
        ],
        bullets: [
          "Fără cozi la ghișeu și fără taxe de terminal",
          "Predare sincronizată cu ora zborului",
          "Documentele mașinii complete: ITP, RCA, rovinietă",
          "Retur la aeroport la finalul închirierii",
        ],
      },
      {
        heading: "Ce mașină să alegi pentru un zbor",
        paragraphs: [
          "Pentru bagaj de cală recomandăm un break — Ford Focus sau VW Passat. Pentru un city break în Cluj este suficientă o Škoda Fabia sau un Renault Clio Symbol, iar pentru familii avem Volvo XC90 cu 7 locuri.",
        ],
      },
    ],
    faq: [
      {
        q: "Se poate ridica mașina direct de la aeroportul Cluj?",
        a: "Da, stabilim un punct de întâlnire în zona aeroportului la ora aterizării.",
      },
      {
        q: "Ce se întâmplă dacă zborul întârzie?",
        a: "Ne anunți și mutăm ora predării, fără costuri suplimentare.",
      },
      {
        q: "Pot returna mașina la aeroport?",
        a: "Da, returul se poate face în zona aeroportului, la ora stabilită înainte de plecare.",
      },
    ],
  },
  {
    slug: "inchiriere-suv-7-locuri-cluj",
    city: "Cluj (SUV & 7 locuri)",
    navLabel: "SUV & 7 locuri",
    linkTitle: "Închiriere SUV și mașini de 7 locuri Cluj",
    h1: "Închiriere SUV și mașină de 7 locuri — rent a car Cluj",
    metaTitle: "Închiriere SUV 7 locuri Cluj | Rent a Car Cluj",
    description:
      "Închiriere SUV și mașină de 7 locuri în Cluj: Volvo XC90 pentru familie, bagaje și drumuri de munte, predare personală. Sună (0742) 925 934.",
    keywords:
      "inchiriere suv cluj, masina 7 locuri de inchiriat cluj, inchiriere volvo xc90 cluj, rent a car suv cluj",
    intro:
      "Ai nevoie de spațiu pentru toată familia sau pentru bagaje multe? Volvo XC90 cu 7 locuri este mașina potrivită pentru drumurile din Apuseni, transferurile de la aeroport cu grup mare și vacanțele lungi.",
    highlights: [
      { label: "Locuri", value: "7" },
      { label: "Tracțiune", value: "Integrală" },
      { label: "Portbagaj", value: "Foarte mare" },
      { label: "Predare", value: "Personală" },
    ],
    sections: [
      {
        heading: "Când merită să închiriezi un SUV în Cluj",
        paragraphs: [
          "Pentru grupuri de 5–7 persoane, pentru drumurile de munte din Apuseni sau Mărișel și pentru perioadele cu zăpadă, un SUV cu tracțiune integrală este alegerea sigură. Volvo XC90 oferă spațiu real pentru bagaje chiar și cu rândul trei ridicat.",
        ],
        bullets: [
          "7 locuri pentru familii și grupuri",
          "Tracțiune integrală pentru drum de munte și iarnă",
          "Portbagaj generos pentru bagaje de vacanță",
          "Rovinietă inclusă, anvelope de sezon",
        ],
      },
      {
        heading: "Alte variante spațioase din flotă",
        paragraphs: [
          "Dacă nu ai nevoie de 7 locuri, dar vrei portbagaj mare, break-urile Ford Focus și VW Passat sunt mai economice la consum și mai ușor de parcat în Cluj-Napoca.",
        ],
      },
    ],
    faq: [
      {
        q: "Cât costă închirierea unui SUV de 7 locuri în Cluj?",
        a: "Tariful pentru Volvo XC90 se stabilește în funcție de perioadă; sună la (0742) 925 934 pentru un preț exact pe zilele dorite.",
      },
      {
        q: "SUV-ul are scaune pentru copii?",
        a: "Putem monta scaun pentru copil la cerere, dacă anunți la rezervare.",
      },
      {
        q: "Pot ieși din țară cu SUV-ul?",
        a: "Da, cu acordul nostru dinainte și documentele necesare pregătite.",
      },
    ],
  },
  {
    slug: "inchiriere-masina-automata-cluj",
    city: "Cluj (cutie automată)",
    navLabel: "Cutie automată",
    linkTitle: "Închiriere mașină automată Cluj",
    h1: "Închiriere mașină cu cutie automată — rent a car Cluj",
    metaTitle: "Mașină automată de închiriat Cluj | Rent a Car Cluj",
    description:
      "Mașini cu cutie automată de închiriat în Cluj: Citroën C5 automat, confort în trafic urban. Rent a car Cluj fără garanție. Sună (0742) 925 934.",
    keywords:
      "inchiriere masina automata cluj, rent a car cutie automata cluj, masini automate de inchiriat cluj",
    intro:
      "În traficul din Cluj-Napoca, o cutie automată face diferența. Citroën C5 automat este mașina cerută cel mai des de clienții care conduc zilnic în oraș sau care vin din străinătate.",
    highlights: [
      { label: "Transmisie", value: "Automată" },
      { label: "Confort", value: "Berlină" },
      { label: "Tarif de la", value: "70 lei/zi" },
      { label: "Predare", value: "Personală" },
    ],
    sections: [
      {
        heading: "De ce o mașină automată în Cluj-Napoca",
        paragraphs: [
          "Traficul de pe Calea Turzii, Mănăștur și centura orașului înseamnă porniri și opriri constante. Cutia automată reduce oboseala la volan și e ideală pentru șoferii obișnuiți cu mașini automate din alte țări.",
        ],
        bullets: [
          "Ideală pentru trafic urban și deplasări zilnice",
          "Potrivită pentru șoferi veniți din afara țării",
          "Confort de berlină pentru drumuri lungi",
          "Număr limitat de mașini automate — rezervă din timp",
        ],
      },
      {
        heading: "Rezervă din timp",
        paragraphs: [
          "Mașinile automate sunt cele mai căutate în sezon. Recomandăm confirmarea perioadei cu 3–7 zile înainte, mai ales vara și în perioada sărbătorilor.",
        ],
      },
    ],
    faq: [
      {
        q: "Aveți mașini automate disponibile în Cluj?",
        a: "Da, Citroën C5 cu cutie automată. Disponibilitatea se confirmă telefonic la (0742) 925 934.",
      },
      {
        q: "Ce permis îmi trebuie pentru o mașină automată?",
        a: "Permis categoria B valabil de minimum un an.",
      },
    ],
  },
  {
    slug: "inchiriere-masina-economica-cluj",
    city: "Cluj (clasa economică)",
    navLabel: "Clasa economică",
    linkTitle: "Închiriere mașină economică Cluj",
    h1: "Mașină economică de închiriat — rent a car Cluj de la 70 lei/zi",
    metaTitle: "Mașină economică Cluj | Rent a Car Cluj, 70 lei/zi",
    description:
      "Mașini economice de închiriat în Cluj de la 70 lei/zi: Škoda Fabia, Renault Clio Symbol. Rent a car Cluj ieftin, fără garanție. Sună (0742) 925 934.",
    keywords:
      "inchiriere masina economica cluj, masini ieftine de inchiriat cluj, inchiriere auto ieftin cluj",
    intro:
      "Cea mai accesibilă variantă din flotă: mașini mici, cu consum redus, ușor de parcat în centrul Clujului și perfecte pentru deplasări zilnice sau ca înlocuitor cât timp mașina ta este în service.",
    highlights: [
      { label: "Tarif", value: "de la 70 lei/zi" },
      { label: "Consum", value: "Redus" },
      { label: "Parcare", value: "Ușoară în oraș" },
      { label: "Predare", value: "Personală" },
    ],
    sections: [
      {
        heading: "Pentru cine este clasa economică",
        paragraphs: [
          "Škoda Fabia și Renault Clio Symbol acoperă cele mai frecvente nevoi: navetă între Cluj și Florești sau Gilău, drumuri în oraș, deplasări scurte în județ. Consumul mic înseamnă cost total mai mic, nu doar tarif mic pe zi.",
        ],
        bullets: [
          "Cel mai bun raport preț/consum din flotă",
          "Ușor de parcat în centrul Clujului",
          "Ideală ca mașină de înlocuire în perioada de service",
          "Reduceri pentru închirieri de peste 7 zile",
        ],
      },
    ],
    faq: [
      {
        q: "Care este cea mai ieftină mașină de închiriat în Cluj?",
        a: "Clasa economică pornește de la 70 lei pe zi, cu reduceri pentru perioade mai lungi.",
      },
      {
        q: "Kilometrajul este limitat?",
        a: "Discutăm limita de kilometri la rezervare, în funcție de durata închirierii.",
      },
    ],
  },
  {
    slug: "inchiriere-break-transport-auto-cluj",
    city: "Cluj (break & transport)",
    navLabel: "Break & transport",
    linkTitle: "Închiriere break pentru transport auto Cluj",
    h1: "Închiriere break — rent a car Cluj pentru transport și bagaje",
    metaTitle: "Închiriere break Cluj | Rent a Car Cluj pentru bagaje",
    description:
      "Break-uri de închiriat în Cluj pentru transport auto ușor, mutări mici și bagaje: Ford Focus break, VW Passat break.",
    keywords:
      "inchiriere break cluj, transport auto cluj, masina de inchiriat pentru transport cluj, inchiriere auto marfa usoara cluj",
    intro:
      "Când ai de transportat bagaje, marfă ușoară sau lucruri de mutat prin Cluj, un break costă mult mai puțin decât o firmă de transport și îl conduci tu, în ritmul tău.",
    highlights: [
      { label: "Portbagaj", value: "Peste 500 l" },
      { label: "Modele", value: "Focus & Passat" },
      { label: "Predare", value: "Personală" },
      { label: "Rovinietă", value: "Inclusă" },
    ],
    sections: [
      {
        heading: "Transport auto ușor cu un break închiriat",
        paragraphs: [
          "Ford Focus break și VW Passat break au portbagaj generos și banchetă rabatabilă, suficient pentru mutări mici între apartamente din Cluj, transport de echipamente sau bagaje de vacanță.",
        ],
        bullets: [
          "Alternativă ieftină la o firmă de transport",
          "Banchetă rabatabilă pentru obiecte lungi",
          "Consum rezonabil pe drum lung",
          "Închiriere pe zile sau pe lună",
        ],
      },
      {
        heading: "Ce nu transportăm",
        paragraphs: [
          "Mașinile sunt autoturisme, nu utilitare: nu pot fi folosite pentru marfă murdară, materiale de construcții în vrac sau transport comercial de bunuri.",
        ],
      },
    ],
    faq: [
      {
        q: "Pot închiria un break pentru o mutare în Cluj?",
        a: "Da, pentru mutări mici și obiecte curate. Sună la (0742) 925 934 pentru disponibilitate.",
      },
      {
        q: "Se poate închiria doar pentru o zi?",
        a: "Da, închirierea minimă este de o zi.",
      },
    ],
  },
  {
    slug: "tarife-inchirieri-auto-cluj",
    city: "Cluj (tarife & politici)",
    navLabel: "Tarife & politici",
    linkTitle: "Tarife și politici de închiriere Cluj",
    h1: "Tarife rent a car Cluj — prețuri și politici de închiriere auto",
    metaTitle: "Tarife rent a car Cluj 2026 | Prețuri închirieri auto",
    description:
      "Tarife închirieri auto Cluj de la 70 lei/zi, ce include prețul, acte necesare, combustibil și reduceri pentru perioade lungi.",
    keywords:
      "tarife inchirieri auto cluj, preturi rent a car cluj, politica de inchiriere auto cluj, inchiriere auto cluj pret",
    intro:
      "Transparență totală înainte de rezervare: de la ce pornesc tarifele, ce este inclus, ce acte îți trebuie și cum funcționează predarea și returul.",
    highlights: [
      { label: "Tarif de la", value: "70 lei/zi" },
      { label: "Reduceri", value: "peste 7 zile" },
      { label: "Acte", value: "CI + permis" },
      { label: "Factură", value: "La cerere" },
    ],
    sections: [
      {
        heading: "Tarife orientative pe clase",
        paragraphs: [
          "Tariful final depinde de model, de perioadă și de sezon. Cu cât închirierea este mai lungă, cu atât prețul pe zi scade.",
        ],
        bullets: [
          "Clasa economică (Škoda Fabia, Renault Clio Symbol): de la 70 lei/zi",
          "Berline și break-uri (Ford Focus, VW Passat, Volvo S40): tarif la cerere",
          "Cutie automată (Citroën C5): tarif la cerere",
          "SUV 7 locuri (Volvo XC90): tarif la cerere",
          "Închirieri lunare: tarif redus, stabilit individual",
        ],
      },
      {
        heading: "Ce include tariful",
        paragraphs: [
          "Prețul pe zi include mașina pregătită, rovinieta valabilă și anvelopele potrivite sezonului. Combustibilul este pe cheltuiala clientului, cu politica plin la plin.",
        ],
        bullets: [
          "Rovinietă valabilă pentru drumurile naționale",
          "Anvelope de sezon montate",
          "Mașină verificată tehnic înainte de predare",
          "Predare personală, la ora stabilită împreună",
        ],
      },
      {
        heading: "Acte și condiții",
        paragraphs: [
          "Ai nevoie de carte de identitate sau pașaport și de permis de conducere valabil de minimum un an. La cerere emitem factură pe firmă.",
        ],
      },
      {
        heading: "Predare, retur și anulare",
        paragraphs: [
          "Locul și ora predării se stabilesc de comun acord — în Gilău, în Cluj-Napoca, în Florești sau în zona aeroportului. Dacă planurile se schimbă, anunță-ne cât mai repede telefonic ca să eliberăm perioada.",
        ],
      },
    ],
    faq: [
      {
        q: "Cât costă închirierea unei mașini în Cluj pe zi?",
        a: "De la 70 lei pe zi pentru clasa economică. Pentru celelalte clase tariful se comunică telefonic, în funcție de perioadă.",
      },
      {
        q: "Ce politică de combustibil aveți?",
        a: "Plin la plin: primești mașina cu un nivel de combustibil și o returnezi la același nivel.",
      },
      {
        q: "Pot primi factură pe firmă?",
        a: "Da, emitem factură la cerere pentru persoane juridice.",
      },
      {
        q: "Se aplică reduceri pentru perioade lungi?",
        a: "Da, pentru închirieri de peste 7 zile și pentru închirieri lunare tariful pe zi scade.",
      },
    ],
  },
  {
    slug: "inchiriere-masina-cluj",
    city: "Cluj (o mașină)",
    navLabel: "Închiriere mașină",
    linkTitle: "Închiriere mașină Cluj",
    h1: "Închiriere mașină Cluj — de la 70 lei/zi, fără garanție",
    metaTitle: "Închiriere Mașină Cluj | De la 70 lei/zi, Fără Garanție",
    description:
      "Închiriere mașină în Cluj de la 70 lei/zi, fără garanție și fără card de credit. Predare personală în Cluj-Napoca, Florești sau Gilău. (0742) 925 934.",
    keywords:
      "inchiriere masina cluj, inchiriere auto cluj, inchiriez masina cluj, inchiriere masina cluj napoca, inchiriere masina ieftina cluj",
    intro:
      "Ai nevoie de o singură mașină, pentru câteva zile sau pentru o lună? Confirmăm disponibilitatea telefonic în câteva minute, iar predarea se face personal, la ora stabilită împreună.",
    highlights: [
      { label: "Tarif de la", value: "70 lei/zi" },
      { label: "Garanție", value: "0 lei" },
      { label: "Acte", value: "Buletin + permis" },
      { label: "Confirmare", value: "Telefonic, rapid" },
    ],
    sections: [
      {
        heading: "Cât costă să închiriezi o mașină în Cluj",
        paragraphs: [
          "Tariful pornește de la 70 lei pe zi pentru clasa economică, iar pentru perioade de peste 7 zile prețul pe zi scade. Nu există taxe ascunse la predare, iar RCA, ITP și rovinieta sunt incluse.",
          "Pentru închirieri lunare tariful se stabilește telefonic și este semnificativ mai mic decât la firmele mari, care adaugă comisioane de birou, taxe pentru al doilea șofer și garanții blocate pe card.",
        ],
        bullets: [
          "Clasă economică: de la 70 lei/zi",
          "Break sau familie: tarif comunicat telefonic",
          "Reducere pentru închirieri de peste 7 zile",
          "Fără taxă de predare în Cluj-Napoca, Florești sau Gilău",
        ],
      },
      {
        heading: "Ce mașină alegi în funcție de nevoie",
        paragraphs: [
          "Pentru oraș și parcări strâmte recomandăm Škoda Fabia sau Renault Clio Symbol. Pentru bagaje, Ford Focus break sau VW Passat break. Pentru familie sau grup, Volvo XC90 cu 7 locuri, iar dacă vrei cutie automată, Citroën C5.",
        ],
      },
      {
        heading: "Cum închiriezi o mașină în Cluj, pas cu pas",
        paragraphs: [
          "Suni la (0742) 925 934 sau scrii pe WhatsApp perioada dorită. Verificăm disponibilitatea în calendarul flotei, stabilim ora și locul predării și semnăm la fața locului, cu buletin și permis valabil de minimum un an.",
        ],
      },
    ],
    faq: [
      {
        q: "Cât costă închirierea unei mașini în Cluj pe o zi?",
        a: "De la 70 lei pe zi pentru clasa economică. Pentru celelalte clase tariful se comunică telefonic, în funcție de perioadă.",
      },
      {
        q: "Pot închiria o mașină în Cluj pe o lună?",
        a: "Da, facem închirieri lunare cu tarif redus pe zi. Perioada și prețul se stabilesc telefonic.",
      },
      {
        q: "Am nevoie de card de credit?",
        a: "Nu. Nu cerem card de credit și nu blocăm garanție; ai nevoie doar de buletin sau pașaport și permis valabil de minimum un an.",
      },
    ],
  },
  {
    slug: "inchirieri-masini",
    city: "România (Cluj)",
    navLabel: "Închirieri mașini",
    linkTitle: "Închirieri mașini",
    h1: "Închirieri mașini — rent a car Cluj cu flotă proprie, 70 lei/zi",
    metaTitle: "Închirieri mașini | Rent a Car Cluj de la 70 lei/zi",
    description:
      "Închirieri mașini direct de la proprietar: de la 70 lei/zi, fără garanție, predare personală în zona Cluj. Sună la (0742) 925 934.",
    keywords:
      "inchirieri masini, masini de inchiriat, inchirieri auto, inchirieri masini ieftine, inchirieri masini fara garantie",
    intro:
      "Închirieri mașini fără birocrație de corporație: vorbești direct cu proprietarul flotei, primești confirmarea rapid și plătești doar tariful, fără garanție blocată pe card.",
    highlights: [
      { label: "Tarif de la", value: "70 lei/zi" },
      { label: "Zonă", value: "Cluj și județ" },
      { label: "Garanție", value: "0 lei" },
      { label: "Clase", value: "Economic → 7 locuri" },
    ],
    sections: [
      {
        heading: "Ce include tariful",
        paragraphs: [
          "Fiecare mașină este predată cu RCA și ITP valabile, rovinietă și anvelope potrivite sezonului. Politica de combustibil este plin la plin, iar kilometrajul se stabilește de comun acord pentru drumuri lungi.",
        ],
        bullets: [
          "RCA, ITP și rovinietă incluse",
          "Anvelope de sezon",
          "Aer condiționat pe toate mașinile",
          "Al doilea șofer fără taxă suplimentară",
        ],
      },
      {
        heading: "Clase disponibile",
        paragraphs: [
          "Flota acoperă nevoile obișnuite: economic pentru oraș (Škoda Fabia, Renault Clio Symbol), break pentru bagaje (Ford Focus, VW Passat), berlină confortabilă (Volvo S40), automat (Citroën C5) și 7 locuri (Volvo XC90).",
        ],
      },
      {
        heading: "Zonele deservite",
        paragraphs: [
          "Baza este în Gilău, la 12 km de Cluj-Napoca. Predăm personal în Cluj-Napoca, Florești, Luna de Sus, Someșu Rece și în zona aeroportului, iar pentru alte localități din județ stabilim un punct de întâlnire.",
        ],
      },
    ],
    faq: [
      {
        q: "Unde se pot închiria mașinile?",
        a: "În zona Cluj: Gilău, Cluj-Napoca, Florești și zona aeroportului. Predarea se face personal, la ora stabilită împreună.",
      },
      {
        q: "Cât costă cea mai ieftină mașină de închiriat?",
        a: "Clasa economică pornește de la 70 lei pe zi, cu reducere pentru perioade de peste 7 zile.",
      },
      {
        q: "Se cere garanție?",
        a: "Nu. Nu blocăm sume pe card și nu cerem depozit în numerar.",
      },
    ],
  },
  {
    slug: "masini-de-inchiriat",
    city: "Cluj (mașini de închiriat)",
    navLabel: "Mașini de închiriat",
    linkTitle: "Mașini de închiriat",
    h1: "Mașini de închiriat — 8 modele rent a car Cluj disponibile",
    metaTitle: "Mașini de închiriat | Rent a Car Cluj, 8 modele",
    description:
      "Mașini de închiriat în zona Cluj: economic, break, automat și 7 locuri, de la 70 lei/zi, fără garanție. Verifică disponibilitatea la (0742) 925 934.",
    keywords:
      "masini de inchiriat, masini de inchiriat cluj, auto de inchiriat, masini de inchiriat ieftine, masini de inchiriat fara garantie",
    intro:
      "Vezi ce mașini de închiriat sunt disponibile, cu tarif și clasă, și verifică perioada dorită direct în calendarul de disponibilitate de pe prima pagină.",
    highlights: [
      { label: "Modele", value: "9 mașini" },
      { label: "Tarif de la", value: "70 lei/zi" },
      { label: "Cutie", value: "Manuală și automată" },
      { label: "Locuri", value: "5 sau 7" },
    ],
    sections: [
      {
        heading: "Modelele din flotă",
        paragraphs: [
          "Flota este întreținută și verificată înainte de fiecare predare. Fiecare mașină are fotografii reale pe site, nu imagini de catalog, ca să știi exact ce primești.",
        ],
        bullets: [
          "Škoda Fabia și Renault Clio Symbol — consum mic, ideale pentru oraș",
          "Ford Focus break și VW Passat break — portbagaj mare",
          "Volvo S40 — berlină confortabilă pentru drumuri lungi",
          "Citroën C5 — cutie automată",
          "Volvo XC90 — 7 locuri pentru familie sau grup",
        ],
      },
      {
        heading: "Cum verifici disponibilitatea",
        paragraphs: [
          "Pe prima pagină alegi perioada dorită și mașinile deja rezervate apar marcate, cu data la care redevin libere. Astfel nu pierzi timp cu telefoane pentru mașini indisponibile.",
        ],
      },
      {
        heading: "Rezervare",
        paragraphs: [
          "Trimiți cererea prin formular sau scrii pe WhatsApp la (0742) 925 934 cu modelul și perioada. Confirmarea vine rapid, iar predarea se stabilește în Cluj-Napoca, Florești sau Gilău.",
        ],
      },
    ],
    faq: [
      {
        q: "Câte mașini de închiriat aveți?",
        a: "Opt modele: de la clasa economică până la un SUV cu 7 locuri, cu cutie manuală sau automată.",
      },
      {
        q: "Pot vedea dacă o mașină e liberă în perioada mea?",
        a: "Da, pe prima pagină selectezi perioada și mașinile rezervate apar marcate cu data la care devin disponibile.",
      },
      {
        q: "Aveți mașini cu cutie automată?",
        a: "Da, Citroën C5 are cutie automată. Recomandăm rezervarea din timp, fiind cel mai cerut model.",
      },
    ],
  },
  {
    slug: "inchiriere-masina",
    city: "Închiriere mașină",
    navLabel: "Închiriere auto",
    linkTitle: "Închiriere mașină",
    h1: "Închiriere mașină — rent a car Cluj direct de la proprietar",
    metaTitle: "Închiriere mașină | Rent a Car Cluj, fără garanție",
    description:
      "Închiriere mașină de la 70 lei/zi, fără garanție și fără card de credit, cu predare personală în zona Cluj. Sună la (0742) 925 934.",
    keywords:
      "inchiriere masina, inchiriere auto, inchiriere masini, inchiriere masina fara garantie, inchiriere masina ieftina",
    intro:
      "Închiriere mașină simplă: alegi modelul, confirmăm perioada și semnăm la predare. Fără cozi la birou, fără garanție blocată și fără taxe adăugate ulterior.",
    highlights: [
      { label: "Tarif de la", value: "70 lei/zi" },
      { label: "Garanție", value: "0 lei" },
      { label: "Predare", value: "Personală" },
      { label: "Perioadă", value: "1 zi → lunar" },
    ],
    sections: [
      {
        heading: "De ce direct de la proprietar",
        paragraphs: [
          "Vorbești cu persoana care răspunde de mașini, nu cu un call center. Dacă apare o problemă pe drum, ai un număr la care răspunde cineva care poate decide imediat.",
        ],
        bullets: [
          "Fără comision de birou și fără taxe ascunse",
          "Program de predare flexibil, stabilit împreună",
          "Al doilea șofer fără cost suplimentar",
          "Reduceri reale pentru perioade lungi",
        ],
      },
      {
        heading: "Condiții de închiriere",
        paragraphs: [
          "Ai nevoie de buletin sau pașaport și de permis de conducere valabil de minimum un an. Politica de combustibil este plin la plin, iar mașina se returnează la locul stabilit la predare.",
        ],
      },
      {
        heading: "Perioade de închiriere",
        paragraphs: [
          "Închiriem de la o zi până la câteva luni. Pentru mașină de înlocuire cât timp a ta e în service sau în daună, precum și pentru firme care au nevoie de un autoturism suplimentar, tariful lunar este cea mai avantajoasă opțiune.",
        ],
      },
    ],
    faq: [
      {
        q: "Care e perioada minimă de închiriere?",
        a: "O zi. Nu există perioadă minimă impusă pentru clienții din zona Cluj.",
      },
      {
        q: "Cum se plătește?",
        a: "Plata se face la predare, în numerar sau prin transfer bancar; pentru firme emitem factură.",
      },
      {
        q: "Pot închiria o mașină în aceeași zi?",
        a: "Da, dacă modelul dorit este liber. Sună la (0742) 925 934 și confirmăm disponibilitatea imediat.",
      },
    ],
  },
  {
    slug: "inchiriere-masina-de-inlocuire-cluj",
    city: "Mașină de înlocuire Cluj",
    navLabel: "Mașină de înlocuire",
    linkTitle: "Mașină de înlocuire Cluj",
    h1: "Mașină de înlocuire Cluj — rent a car cât timp auto-ul tău e în service",
    metaTitle: "Mașină de înlocuire Cluj | Rent a Car de la 70 lei/zi",
    description:
      "Mașină de înlocuire în Cluj cât timp autoturismul tău e în service sau în daună: de la 70 lei/zi, fără garanție, predare personală. Sună (0742) 925 934.",
    keywords:
      "masina de inlocuire cluj, auto de inlocuire cluj, inchiriere masina service cluj, rent a car daună cluj, masina la schimb cluj",
    intro:
      "Dacă mașina ta e în service, în reparație după un accident sau blocată în constatare, îți dăm un autoturism de înlocuire în aceeași zi, dacă modelul dorit e liber. Tarif de la 70 lei/zi, fără garanție blocată pe card.",
    highlights: [
      { label: "Tarif de la", value: "70 lei/zi" },
      { label: "Disponibil", value: "În aceeași zi" },
      { label: "Garanție", value: "Fără" },
      { label: "Durată", value: "1 zi → lunar" },
    ],
    sections: [
      {
        heading: "Când ai nevoie de o mașină de înlocuire",
        paragraphs: [
          "Reparațiile la un service din Cluj pot dura de la câteva zile la câteva săptămâni, mai ales când se așteaptă piese. În loc să rămâi fără mașină, închiriezi un autoturism pe exact perioada reparației și îl returnezi când îți iei mașina din service.",
        ],
        bullets: [
          "Autoturism pe durata reparației, fără perioadă minimă",
          "Tarif redus pentru închirieri de peste 7 zile",
          "Predare la service, la domiciliu sau la birou",
          "Al doilea șofer inclus, fără cost suplimentar",
        ],
      },
      {
        heading: "Ce ai nevoie ca să pleci cu mașina",
        paragraphs: [
          "Buletin și permis de conducere valabil de minimum un an. Nu blocăm garanție pe card și nu cerem card de credit. Tariful include RCA, ITP, rovinietă și aer condiționat.",
        ],
      },
      {
        heading: "Prelungire fără bătăi de cap",
        paragraphs: [
          "Dacă service-ul întârzie, prelungești printr-un mesaj pe WhatsApp — nu refacem actele și nu percepem taxă de prelungire. Pentru perioade lungi trecem pe tarif săptămânal sau lunar.",
        ],
      },
    ],
    faq: [
      {
        q: "Pot lua mașina de înlocuire în aceeași zi?",
        a: "Da, dacă modelul dorit este liber. Sună la (0742) 925 934 și confirmăm disponibilitatea imediat.",
      },
      {
        q: "Cât costă pe o lună întreagă?",
        a: "Pentru perioade de peste 7 zile și pentru închirieri lunare tariful pe zi scade; prețul exact îl stabilim în funcție de mașină și durată.",
      },
      {
        q: "Predați mașina direct la service?",
        a: "Da, putem preda și prelua autoturismul la service, la domiciliu sau la birou, în Cluj-Napoca, Florești sau Gilău.",
      },
    ],
  },
  {
    slug: "inchirieri-auto-firme-cluj",
    city: "Firme Cluj",
    navLabel: "Închirieri pentru firme",
    linkTitle: "Închirieri auto pentru firme Cluj",
    h1: "Închirieri auto pentru firme în Cluj — flotă la cerere, cu factură",
    metaTitle: "Închirieri Auto Firme Cluj | Rent a Car cu factură",
    description:
      "Închirieri auto pentru firme în Cluj: mașini pentru angajați și delegații, tarif lunar avantajos, factură fiscală. Sună la (0742) 925 934.",
    keywords:
      "inchirieri auto firme cluj, rent a car firme cluj, masini pentru angajati cluj, inchiriere auto cu factura cluj, flota inchiriata cluj",
    intro:
      "Pentru firmele din Cluj care au nevoie de un autoturism suplimentar pentru delegații, teren sau angajați nou-veniți, oferim închiriere pe termen scurt și lunar, cu factură fiscală și tarif fix agreat din start.",
    highlights: [
      { label: "Factură", value: "Da" },
      { label: "Tarif lunar", value: "Negociat" },
      { label: "Șoferi", value: "Multipli" },
      { label: "Predare", value: "La sediu" },
    ],
    sections: [
      {
        heading: "De ce e mai simplu decât leasingul",
        paragraphs: [
          "Nu semnezi contract pe 36 de luni și nu blochezi avans. Iei mașina pe perioada de care ai nevoie — o săptămână, o lună sau un sezon — și renunți la ea când nu-ți mai trebuie. Costul e previzibil, iar mentenanța, ITP-ul, rovinieta și asigurarea rămân la noi.",
        ],
        bullets: [
          "Factură fiscală pentru fiecare închiriere",
          "Mai mulți șoferi pe același autoturism, fără taxă",
          "Mentenanță, ITP, RCA și rovinietă incluse",
          "Înlocuirea mașinii dacă apare o problemă tehnică",
        ],
      },
      {
        heading: "Ce mașini recomandăm pentru firme",
        paragraphs: [
          "Pentru deplasări în oraș și navetă recomandăm clasa economică, cu consum mic. Pentru delegații și drumuri lungi, break-urile VW Passat sau Ford Focus, cu portbagaj mare. Pentru transport de echipe sau clienți, Volvo XC90 cu 7 locuri, iar pentru confort în trafic, Citroën C5 cu cutie automată.",
        ],
      },
      {
        heading: "Cum se derulează colaborarea",
        paragraphs: [
          "Ne trimiți perioada și numărul de mașini necesare, stabilim tariful și predăm autoturismele la sediul firmei, în Cluj-Napoca, Florești sau Gilău. Pentru colaborări repetate păstrăm tariful agreat și prioritate la disponibilitate.",
        ],
      },
    ],
    faq: [
      {
        q: "Emiteți factură pe firmă?",
        a: "Da, emitem factură fiscală pentru fiecare închiriere, pe termen scurt sau lunar.",
      },
      {
        q: "Pot conduce mai mulți angajați aceeași mașină?",
        a: "Da, putem înscrie mai mulți șoferi pe același autoturism, fără cost suplimentar.",
      },
      {
        q: "Ce se întâmplă dacă mașina are o problemă tehnică?",
        a: "Ne ocupăm de intervenție și, dacă e nevoie, punem la dispoziție un alt autoturism din flotă.",
      },
    ],
  },
  {
    slug: "inchiriere-masina-termen-lung-cluj",
    city: "Termen lung Cluj",
    navLabel: "Închiriere pe termen lung",
    linkTitle: "Închiriere pe termen lung Cluj",
    h1: "Închiriere mașină pe termen lung în Cluj — tarif lunar, fără avans",
    metaTitle: "Închiriere Mașină Termen Lung Cluj | Tarif lunar",
    description:
      "Închiriere mașină pe termen lung în Cluj: tarif lunar avantajos, fără avans și fără garanție, mentenanță inclusă. Sună la (0742) 925 934.",
    keywords:
      "inchiriere masina termen lung cluj, inchiriere auto lunara cluj, abonament masina cluj, rent a car luna cluj, masina cu abonament cluj",
    intro:
      "Pentru cei care au nevoie de o mașină câteva luni — proiect de lucru în Cluj, mutare în oraș, mașină în așteptarea unei livrări — închirierea pe termen lung costă mult mai puțin pe zi decât închirierea zilnică.",
    highlights: [
      { label: "Avans", value: "0 lei" },
      { label: "Perioadă", value: "De la 1 lună" },
      { label: "Mentenanță", value: "Inclusă" },
      { label: "Kilometraj", value: "Generos" },
    ],
    sections: [
      {
        heading: "Cum funcționează tariful lunar",
        paragraphs: [
          "Stabilim un tarif fix pe lună în funcție de model și de durata totală. Cu cât perioada e mai lungă, cu atât costul pe zi scade. Nu există avans, nu blocăm garanție și nu percepem taxă de administrare.",
        ],
        bullets: [
          "Preț fix pe lună, agreat înainte de predare",
          "RCA, ITP, rovinietă și revizii incluse",
          "Schimb de anvelope de sezon inclus",
          "Prelungire sau renunțare cu un simplu anunț",
        ],
      },
      {
        heading: "Pentru cine e potrivit",
        paragraphs: [
          "Pentru persoane relocate în Cluj-Napoca pentru un proiect, studenți la master care stau un semestru, familii care au nevoie de a doua mașină temporar și firme care nu vor să intre în leasing.",
        ],
      },
      {
        heading: "Ce mașini sunt disponibile lunar",
        paragraphs: [
          "Clasa economică pentru consum minim, break-urile pentru spațiu și Citroën C5 cu cutie automată pentru confort. Volvo XC90 cu 7 locuri se închiriază lunar doar cu rezervare din timp.",
        ],
      },
    ],
    faq: [
      {
        q: "Care e perioada minimă pentru tariful lunar?",
        a: "O lună. Pentru perioade mai lungi, de 3-6 luni, tariful pe lună scade suplimentar.",
      },
      {
        q: "Există limită de kilometri?",
        a: "Kilometrajul este generos și îl agreăm împreună înainte de predare, în funcție de cum folosești mașina.",
      },
      {
        q: "Cine plătește reviziile?",
        a: "Noi. Reviziile, ITP-ul, rovinieta și schimbul de anvelope de sezon sunt incluse în tariful lunar.",
      },
    ],
  },
  {
    slug: "flota-masini-inchiriere-cluj",
    city: "Flota Cluj",
    navLabel: "Flota de mașini",
    linkTitle: "Flota de mașini disponibile în Cluj",
    h1: "Flota de mașini de închiriat în Cluj — economic, break, automat și 7 locuri",
    metaTitle: "Flota Mașini de Închiriat Cluj | Modele și tarife",
    description:
      "Vezi flota de mașini de închiriat în Cluj: clasă economică, break-uri, cutie automată și SUV de 7 locuri, de la 70 lei/zi. Sună (0742) 925 934.",
    keywords:
      "flota masini inchiriere cluj, modele masini de inchiriat cluj, masini disponibile rent a car cluj, ce masini se inchiriaza cluj",
    intro:
      "Flota este proprie, verificată tehnic și curățată înainte de fiecare predare. Mai jos găsești clasele disponibile în Cluj și pentru ce tip de drum recomandăm fiecare model.",
    highlights: [
      { label: "Clase", value: "4" },
      { label: "Tarif de la", value: "70 lei/zi" },
      { label: "Automat", value: "Disponibil" },
      { label: "7 locuri", value: "Disponibil" },
    ],
    sections: [
      {
        heading: "Clasa economică — oraș și navetă",
        paragraphs: [
          "Škoda Fabia și Renault Clio Symbol sunt cele mai cerute pentru Cluj-Napoca: consum mic, ușor de parcat în centru și pe străzile înguste din Grigorescu sau Mănăștur. Recomandate pentru 1-3 persoane și bagaj de cabină.",
        ],
        bullets: [
          "Consum redus în oraș",
          "Ușor de parcat în centru",
          "Cel mai mic tarif din flotă",
        ],
      },
      {
        heading: "Break-uri — bagaje, mutări și drumuri lungi",
        paragraphs: [
          "VW Passat și Ford Focus break au portbagaj mare și sunt stabile pe autostradă. Alegerea potrivită pentru concedii, transport de marfă ușoară sau mutări între Cluj și alte orașe.",
        ],
        bullets: [
          "Portbagaj mare, banchetă rabatabilă",
          "Confort pe drum lung",
          "Potrivite pentru 4-5 persoane cu bagaje",
        ],
      },
      {
        heading: "Cutie automată și confort",
        paragraphs: [
          "Citroën C5 are cutie automată și suspensie confortabilă — cea mai bună alegere pentru traficul din Cluj-Napoca sau pentru șoferii care conduc doar automat. Volvo S40 rămâne o variantă solidă pentru drum lung.",
        ],
      },
      {
        heading: "7 locuri pentru familii și grupuri",
        paragraphs: [
          "Volvo XC90 are 7 locuri și tracțiune bună pe drumuri de munte — potrivit pentru excursii la Tarnița, Beliș sau Apuseni. Fiind cel mai cerut model, recomandăm rezervarea din timp.",
        ],
      },
    ],
    faq: [
      {
        q: "Pot vedea dacă un model e liber în perioada mea?",
        a: "Da, pe prima pagină selectezi perioada dorită, iar mașinile rezervate apar marcate cu data la care devin disponibile.",
      },
      {
        q: "Ce include tariful pentru fiecare mașină?",
        a: "RCA, ITP valabil, rovinietă, aer condiționat și anvelope de sezon. Nu există taxe de birou sau de al doilea șofer.",
      },
      {
        q: "Aveți mașini cu cutie automată?",
        a: "Da, Citroën C5. Fiind foarte cerut, recomandăm rezervarea cu câteva zile înainte.",
      },
    ],
  },
  {
    slug: "rent-a-car-turda",
    city: "Turda",
    navLabel: "Rent a Car Turda",
    linkTitle: "Rent a Car Turda",
    h1: "Închirieri auto Turda — rent a car de la 70 lei/zi, predare la tine",
    metaTitle: "Închirieri auto Turda | Rent a Car Turda de la 70 lei/zi",
    description:
      "Închirieri auto Turda: mașini de închiriat de la 70 lei/zi, fără garanție, predare personală în Turda și Câmpia Turzii. Sună la (0742) 925 934.",
    keywords:
      "inchirieri auto turda, rent a car turda, masini de inchiriat turda, inchiriere masina campia turzii, rent a car cluj turda",
    intro:
      "Cauți închirieri auto în Turda? Deservim Turda și Câmpia Turzii din baza noastră din Gilău. Aducem mașina la adresa stabilită, cu tarife de la 70 lei/zi și fără garanție blocată pe card.",
    highlights: [
      { label: "Tarif de la", value: "70 lei/zi" },
      { label: "Predare", value: "În Turda" },
      { label: "Garanție", value: "Fără" },
      { label: "Distanță bază", value: "~45 km" },
    ],
    sections: [
      {
        heading: "Închiriere auto în Turda fără drum la Cluj",
        paragraphs: [
          "Nu trebuie să vii până în Cluj-Napoca după mașină. Stabilim ora și adresa, iar autoturismul ajunge la tine în Turda sau Câmpia Turzii. Returnarea se face în același loc, la ora agreată.",
        ],
        bullets: [
          "Predare și preluare în Turda, la adresa ta",
          "Fără garanție și fără card de credit",
          "RCA, ITP, rovinietă și AC incluse",
          "Reduceri pentru închirieri de o săptămână sau mai mult",
        ],
      },
      {
        heading: "Drumuri populare din Turda",
        paragraphs: [
          "Salina Turda și Cheile Turzii sunt la câțiva kilometri, iar pentru vizitatori o mașină închiriată e cea mai simplă variantă de a combina Salina, Cheile Turzii și Cluj-Napoca într-o singură zi. Spre Alba Iulia și Sibiu drumul e direct pe A10 și A1.",
        ],
      },
      {
        heading: "Condiții simple",
        paragraphs: [
          "Buletin sau pașaport și permis valabil de cel puțin un an. Plata se face la predare, în numerar sau prin transfer bancar; pentru firme emitem factură.",
        ],
      },
      {
        heading: "De ce să alegi închirieri auto în Turda de la noi",
        paragraphs: [
          "Suntem o firmă locală, nu un lanț internațional cu proceduri rigide. Discuți direct cu proprietarul, stabilim totul pe un singur apel telefonic, iar mașina ajunge la tine fără taxe ascunse. Pentru cei care caută mașini de închiriat în Turda fără garanție, suntem una dintre puținele variante reale din zonă.",
          "Flota include autoturisme economice pentru oraș și drumuri zilnice, dar și mașini mai spațioase pentru drumuri lungi spre Alba Iulia, Sibiu sau Cluj-Napoca. Toate sunt verificate tehnic, cu ITP și RCA valabile, rovinietă inclusă și anvelope de sezon.",
        ],
        bullets: [
          "Tarife de la 70 lei/zi, cu reducere la perioade lungi",
          "Fără garanție și fără card de credit obligatoriu",
          "Predare în Turda, Câmpia Turzii și împrejurimi",
          "Factură pentru firme și contracte pe termen lung",
        ],
      },
    ],
    faq: [
      {
        q: "Aduceți mașina în Turda?",
        a: "Da, predăm și preluăm autoturismul în Turda și Câmpia Turzii, la adresa și ora stabilite telefonic.",
      },
      {
        q: "Cât costă închirierea unei mașini în Turda pentru o zi?",
        a: "De la 70 lei/zi pentru clasa economică. Pentru perioade mai lungi tariful pe zi scade.",
      },
      {
        q: "Pot închiria o mașină în Turda fără garanție?",
        a: "Da, nu blocăm garanție pe card și nu cerem card de credit. Plata se face la predare, în numerar sau prin transfer.",
      },
      {
        q: "Pot lua mașina din Turda și o returna la aeroportul Cluj?",
        a: "Da, stabilim locul de returnare la rezervare, inclusiv în zona Aeroportului Avram Iancu Cluj.",
      },
      {
        q: "Ce documente îmi trebuie pentru închiriere?",
        a: "Buletin sau pașaport și permis de conducere valabil de cel puțin un an. Pentru firme, datele de facturare.",
      },
    ],
  },
  {
    slug: "rent-a-car-apahida-baciu",
    city: "Apahida & Baciu",
    navLabel: "Rent a Car Apahida",
    linkTitle: "Rent a Car Apahida și Baciu",
    h1: "Rent a Car Apahida și Baciu — mașini de închiriat cu predare la domiciliu",
    metaTitle: "Rent a Car Apahida & Baciu | Închirieri auto Cluj",
    description:
      "Închirieri auto în Apahida și Baciu: mașini de la 70 lei/zi, fără garanție, predare la domiciliu în zona metropolitană Cluj. Sună (0742) 925 934.",
    keywords:
      "rent a car apahida, rent a car baciu, inchirieri auto apahida, masini de inchiriat baciu, inchiriere masina zona metropolitana cluj",
    intro:
      "Apahida, Baciu, Chinteni și Jucu fac parte din zona metropolitană Cluj, iar predarea se face la domiciliu, fără să pierzi timp în traficul spre centrul Clujului.",
    highlights: [
      { label: "Tarif de la", value: "70 lei/zi" },
      { label: "Predare", value: "La domiciliu" },
      { label: "Garanție", value: "Fără" },
      { label: "Zonă", value: "Metropolitan Cluj" },
    ],
    sections: [
      {
        heading: "De ce contează predarea la domiciliu",
        paragraphs: [
          "Din Apahida sau Baciu, un drum dus-întors până la un birou de rent a car din centrul Clujului înseamnă ușor o oră pierdută în trafic. Noi aducem mașina la tine, la ora stabilită, și o preluăm de la aceeași adresă la final.",
        ],
        bullets: [
          "Predare în Apahida, Baciu, Chinteni, Jucu și Florești",
          "Fără garanție blocată și fără card de credit",
          "Rovinietă, RCA, ITP și AC incluse în tarif",
          "Al doilea șofer fără cost suplimentar",
        ],
      },
      {
        heading: "Potrivit pentru navetă și weekend",
        paragraphs: [
          "Pentru naveta zilnică spre Cluj-Napoca recomandăm clasa economică, cu consum mic. Pentru weekend la Tarnița, Beliș sau în Apuseni, break-urile și Volvo XC90 cu 7 locuri sunt cele mai cerute.",
        ],
      },
      {
        heading: "Rezervare rapidă",
        paragraphs: [
          "Trimiți perioada și modelul dorit pe WhatsApp sau suni la (0742) 925 934, iar confirmarea disponibilității vine rapid. La predare ai nevoie doar de buletin și permis valabil de minimum un an.",
        ],
      },
    ],
    faq: [
      {
        q: "Predați mașina în Apahida sau Baciu?",
        a: "Da, predăm și preluăm autoturismul la adresa ta din Apahida, Baciu, Chinteni, Jucu sau Florești.",
      },
      {
        q: "Se percepe taxă pentru livrarea mașinii?",
        a: "Nu în zona metropolitană Cluj. Stabilim adresa și ora la rezervare.",
      },
      {
        q: "Pot închiria doar pentru weekend?",
        a: "Da, închiriem de la o zi. Pentru weekend recomandăm rezervarea din timp, fiind cea mai cerută perioadă.",
      },
    ],
  },
  ...countyLocations,
];




export function getLocation(slug: string): LocationPage | undefined {
  return locations.find((l) => l.slug === slug);
}
