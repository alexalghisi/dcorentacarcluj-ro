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
}


export const locations: LocationPage[] = [
  {
    slug: "rent-a-car-cluj-napoca",
    city: "Cluj-Napoca",
    navLabel: "Cluj-Napoca",
    h1: "Rent a Car Cluj-Napoca — mașini de închiriat de la 70 lei/zi",
    metaTitle: "Rent a Car Cluj-Napoca | Mașini de la 70 lei/zi",
    description:
      "Închirieri auto în Cluj-Napoca de la 70 lei/zi, predare personală. Sună (0742) 925 934.",
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
      "Închirieri auto în Gilău: bază locală, predare personală pe loc, tarife de la 70 lei/zi. Deservim și Florești, Luna de Sus și Someșu Rece.",
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
    metaTitle: "Rent a Car Aeroport Cluj | De la 70 lei/zi",
    description:
      "Închirieri auto pentru pasagerii Aeroportului Cluj: mașină pregătită la aterizare, de la 70 lei/zi. Aeroport – Gilău în ~35 de minute.",
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
    h1: "Închirieri auto Cluj — mașini pe zi, săptămână sau lună",
    metaTitle: "Închirieri Auto Cluj | De la 70 lei/zi, fără birou",
    description:
      "Închirieri auto Cluj de la 70 lei/zi: pe zi, pe săptămână sau pe lună, predare personală și mașini verificate. Sună (0742) 925 934.",
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
    h1: "Mașini de închiriat în Cluj — flota disponibilă",
    metaTitle: "Mașini de Închiriat Cluj | Flotă verificată, 70 lei/zi",
    description:
      "Mașini de închiriat în Cluj: economice, break, berline, automat și 7 locuri. Toate cu ITP, RCA și rovinietă. De la 70 lei/zi.",
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
    h1: "Rent a Car Florești (Cluj) — închirieri auto la 5 km",
    metaTitle: "Rent a Car Florești Cluj | Închirieri de la 70 lei/zi",
    description:
      "Închirieri auto pentru Florești, Cluj: predare personală, fără taxă de livrare, tarife de la 70 lei/zi. Sună (0742) 925 934.",
    keywords:
      "rent a car floresti, inchirieri auto floresti cluj, inchiriere masina floresti, masini de inchiriat floresti cluj",
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
      "Car rental in Cluj-Napoca and Gilău from 70 RON (≈14 €) per day. Personal handover, no airport fees, road tax and A/C included.",
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
    h1: "Închirieri auto lunare în Cluj — mașină pe termen lung",
    metaTitle: "Închirieri Auto Lunare Cluj | Tarif pe termen lung",
    description:
      "Închiriere mașină pe lună în Cluj: tarif degresiv, factură pe firmă, mașini verificate cu rovinietă inclusă. Sună (0742) 925 934.",
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
      "Ghid rent a car: ce înseamnă, ce acte îți trebuie, cum se calculează tariful și cum închiriezi o mașină în Cluj de la 70 lei/zi.",
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
];



export function getLocation(slug: string): LocationPage | undefined {
  return locations.find((l) => l.slug === slug);
}
