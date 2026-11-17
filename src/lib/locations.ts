import { countyLocations } from "./locations-county";
import { intentLocations } from "./locations-intent";
import { languageLocations } from "./locations-lang";

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
  lang?: "ro" | "en" | "hu";
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
          "Ne suni sau trimiți o cerere prin formular, confirmăm disponibilitatea mașinii și stabilim locul și ora predării. Baza noastră este în Gilău, în vestul Clujului, la circa 20 de minute de centrul Cluj-Napoca, iar pentru clienții din oraș găsim un punct convenabil de întâlnire.",
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
      { label: "Până la Cluj", value: "~20 min" },
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
      "rent a car aeroport cluj, inchirieri auto aeroport cluj, masina de inchiriat aeroport cluj napoca, inchiriere masina cluj aeroport, rent a car cluj aeroport",
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
          "Ne trimiți numărul zborului sau ora aterizării și confirmăm mașina. Nu avem birou în terminal: locul predării (în zona aeroportului sau la baza din Gilău, la 30–40 de minute de Aeroportul Internațional Avram Iancu) și ora le stabilim împreună, în funcție de zbor.",
          "Pentru că nu plătim spațiu în terminal, tariful este semnificativ mai mic decât la firmele cu birou în terminal: pe o închiriere de o săptămână diferența poate depăși valoarea a două zile.",
        ],
        bullets: [
          "Confirmăm disponibilitatea în funcție de ora aterizării",
          "Fără taxe de aeroport",
          "Predare personală, la locul stabilit telefonic",
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
      {
        heading: "Ce mașină alegi după sosire",
        paragraphs: [
          "Dacă vii singur sau în doi, o mașină economică precum Skoda Fabia sau Renault Clio e suficientă pentru oraș și drumuri scurte. Pentru familie și bagaje mari, break-urile Ford Focus și VW Passat au portbagaj generos. Grupurile de până la 7 persoane pot alege Volvo XC90.",
          "Dacă ești obișnuit doar cu cutia automată, cere Citroën C5 automat și rezervă din timp, pentru că mașinile automate sunt cerute des de cei care vin din străinătate.",
        ],
        bullets: [
          "Economice pentru oraș: Skoda Fabia, Renault Clio",
          "Break-uri pentru bagaje: Ford Focus, VW Passat",
          "Automată: Citroën C5",
          "7 locuri: Volvo XC90",
        ],
      },
      {
        heading: "Ce include prețul",
        paragraphs: [
          "Tarifele pornesc de la 70 lei pe zi, iar prețul exact pentru perioada ta îl confirmăm înainte de predare. Nu blocăm garanție pe card, rovinieta este inclusă și nu plătești taxe de aeroport sau de ghișeu.",
          "Pentru că predarea e personală, poți pune întrebări direct celui care îți dă mașina: despre drum, despre parcare în Cluj-Napoca sau despre traseele pe care vrei să le faci.",
        ],
        bullets: [
          "De la 70 lei/zi",
          "Fără garanție blocată pe card",
          "Rovinietă inclusă",
          "Fără taxe de aeroport",
        ],
      },
      {
        heading: "Pași simpli de la aterizare până la volan",
        paragraphs: [
          "Mai întâi ne trimiți data, ora aterizării și mașina dorită, la telefon sau pe WhatsApp la (0742) 925 934. Confirmăm disponibilitatea și locul predării. După aterizare ne anunți că ai ajuns, ne întâlnim în locul și la ora stabilite. Verificăm mașina împreună, notăm kilometrajul și pleci la drum.",
        ],
      },
      {
        heading: "Întoarcerea la aeroport",
        paragraphs: [
          "La final predai mașina în Gilău sau la un punct stabilit telefonic. Calculează circa 30–40 de minute până la terminal și un timp suplimentar pentru check-in. Dacă zborul tău e foarte devreme dimineața, stabilim ora predării înainte, ca să nu fii în criză de timp.",
        ],
      },
    ],
    faq: [
      {
        q: "Livrați mașina în terminalul Aeroportului Cluj?",
        a: "Nu avem birou în terminal. Locul predării, în zona aeroportului sau în Gilău, și ora le stabilim telefonic, în funcție de zbor. Așa evităm taxele de terminal și păstrăm tariful mic.",
      },
      {
        q: "Cum ajung de la aeroport la Gilău?",
        a: "Dacă stabilim predarea în Gilău: cu taxi sau ride-sharing în 30–40 de minute, ori cu autobuzul metropolitan prin Cluj-Napoca.",
      },
      {
        q: "Pot rezerva în avans pentru data zborului?",
        a: "Da. Trimiteți data și ora aterizării prin formular sau telefonic și blocăm mașina dorită.",
      },
      {
        q: "Ce se întâmplă dacă zborul meu are întârziere?",
        a: "Anunță-ne la (0742) 925 934 sau pe WhatsApp și mutăm ora predării în funcție de noua oră a aterizării.",
      },
      {
        q: "Pot închiria dacă vin din afara Uniunii Europene?",
        a: "Da, cu pașaport și permis de conducere valabil de cel puțin un an. Dacă permisul nu e în alfabet latin, recomandăm și permisul internațional.",
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
      "inchirieri auto cluj, inchiriere masina cluj, inchirieri masini cluj, inchirieri auto cluj pret, inchirieri auto ieftine cluj, inchirieri masini cluj, inchiriere masina cluj, inchirieri masini, inchiriere masina",
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
      {
        q: "Cât durează rezervarea?",
        a: "Confirmăm disponibilitatea în câteva minute la telefon sau pe WhatsApp, inclusiv în weekend.",
      },
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
      {
        q: "Unde se pot închiria mașinile?",
        a: "În zona Cluj: Gilău, Cluj-Napoca, Florești și zona aeroportului. Predarea se face personal, la ora stabilită împreună.",
      },
      {
        q: "Am nevoie de card de credit?",
        a: "Nu. Nu cerem card de credit și nu blocăm garanție; ai nevoie doar de buletin sau pașaport și permis valabil de minimum un an.",
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
      "masini de inchiriat cluj, inchirieri masini cluj, masina de inchiriat cluj napoca, masini de inchiriat automat cluj, masina 7 locuri de inchiriat cluj, masini de inchiriat, flota masini inchiriere cluj",
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
      {
        q: "Câte mașini de închiriat aveți?",
        a: "Opt modele: de la clasa economică până la un SUV cu 7 locuri, cu cutie manuală sau automată.",
      },
      {
        q: "Pot vedea dacă o mașină e liberă în perioada mea?",
        a: "Da, pe prima pagină selectezi perioada și mașinile rezervate apar marcate cu data la care devin disponibile.",
      },
      {
        q: "Ce include tariful pentru fiecare mașină?",
        a: "RCA, ITP valabil, rovinietă, aer condiționat și anvelope de sezon. Nu există taxe de birou sau de al doilea șofer.",
      },
    ],
  },
  {
    slug: "rent-a-car-floresti-cluj",
    city: "Florești",
    navLabel: "Florești",
    h1: "Închirieri auto Florești (Cluj) — mașini de închiriat de la 70 lei/zi",
    metaTitle: "Rent a Car Florești Cluj | Închirieri auto de la 70 lei/zi",
    description:
      "Rent a car Florești: predare în Florești fără taxă de livrare, fără garanție și fără card de credit, de la 70 lei/zi. Sună sau scrie pe WhatsApp: (0742) 925 934.",
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
        heading: "Preluare și cost în Florești",
        paragraphs: [
          "Preluare: ne suni sau ne scrii pe WhatsApp la (0742) 925 934, stabilim ora, iar mașina ți-o predăm personal în Florești (inclusiv Cetatea Fetei, Someșul Rece, Luna de Sus, Tăuți) sau la baza noastră din Gilău, la 5 km. Ai nevoie doar de buletin și permis valabil de cel puțin un an.",
          "Cost: tariful pornește de la 70 lei/zi, cu preț redus pentru închirieri săptămânale sau lunare. Livrarea în Florești nu se plătește, nu cerem garanție și nu blocăm bani pe card. Prețul final pentru mașina și perioada ta ți-l confirmăm la telefon, înainte de rezervare.",
        ],
      },
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
      "car rental cluj, rent a car cluj, car hire cluj napoca, rent a car cluj airport, cheap car rental cluj romania, car rental cluj-napoca, car hire cluj-napoca",
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
        a: "There is no terminal desk: we agree the handover point (near the airport or at our base in Gilău, 30–40 minutes away) and the time by phone or WhatsApp. Avoiding terminal fees is what keeps the price low.",
      },
      {
        q: "Is the Romanian road tax included?",
        a: "Yes. The rovinietă, insurance, technical inspection and air conditioning are all included in the daily rate.",
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
      {
        heading: "Trasee pentru care alegi un SUV din Cluj",
        paragraphs: [
          "Drumul spre Mărișel, Beliș-Fântânele sau Arieșeni urcă și coboară mult, iar iarna poate fi acoperit de zăpadă. Tracțiunea integrală și garda la sol mai mare dau siguranță acolo unde o mașină mică se descurcă greu.",
          "Pentru grupurile care vin la nunți, botezuri sau evenimente în Cluj și în satele din jur, o singură mașină de 7 locuri înseamnă un singur șofer, o singură parcare și costuri de combustibil împărțite.",
        ],
        bullets: [
          "Apuseni: Mărișel, Beliș, Arieșeni, Padiș",
          "Transferuri de grup de la Aeroportul Cluj",
          "Evenimente de familie în județ",
          "Vacanțe lungi cu bagaje multe",
        ],
      },
      {
        heading: "SUV sau break: cum alegi",
        paragraphs: [
          "Alege SUV-ul de 7 locuri dacă sunteți mai mult de cinci persoane, dacă mergi pe drumuri de munte sau iarna ori dacă vrei garda la sol mai mare. Pentru patru-cinci persoane cu bagaje, un break Ford Focus sau VW Passat oferă loc suficient la un consum mai mic.",
          "Gândește-te și la parcare: în centrul Clujului și în cartierele aglomerate, o mașină mai mică se parchează mai ușor. Dacă ai dubii, sună-ne și îți spunem sincer ce variantă se potrivește drumului tău.",
        ],
      },
      {
        heading: "Ce include închirierea SUV-ului",
        paragraphs: [
          "Rovinieta și anvelopele de sezon sunt incluse, nu blocăm garanție pe card și predarea se face personal. Scaunul pentru copil se montează la cerere, dacă îl anunți la rezervare. Prețul exact pe zilele dorite îl confirmăm telefonic înainte de predare.",
          "Pentru ieșirea din țară avem nevoie de acordul nostru dinainte, ca să pregătim documentele necesare.",
        ],
        bullets: [
          "Rovinietă inclusă",
          "Anvelope de sezon",
          "Fără garanție blocată pe card",
          "Scaun pentru copil la cerere",
        ],
      },
      {
        heading: "Documente necesare",
        paragraphs: [
          "Ai nevoie de carte de identitate sau pașaport și de permis de conducere valabil de minimum un an. Dacă mai mulți șoferi vor conduce pe drum lung, anunță-ne la rezervare.",
        ],
      },
      {
        heading: "Cum rezervi SUV-ul",
        paragraphs: [
          "Avem un singur SUV de 7 locuri în flotă, așa că rezervarea din timp contează. Sună sau scrie pe WhatsApp la (0742) 925 934 cu perioada și numărul de pasageri. Predarea se face personal în Gilău sau la un punct stabilit telefonic.",
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
      {
        q: "Este SUV-ul potrivit pentru drumuri de munte iarna?",
        a: "Da. Volvo XC90 are tracțiune integrală și vine cu anvelope de sezon, potrivite pentru drumurile din Apuseni.",
      },
      {
        q: "Cu cât timp înainte trebuie să rezerv SUV-ul?",
        a: "Cât mai devreme, pentru că avem un singur SUV de 7 locuri. În sezon și de sărbători recomandăm câteva săptămâni.",
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
      {
        heading: "Pentru cine e potrivită o mașină automată",
        paragraphs: [
          "Pentru turiștii și românii din diaspora care conduc acasă doar automat, pentru șoferii cu permis recent care vor să se concentreze pe drum și pentru oricine petrece mult timp în coloanele din Cluj-Napoca la orele de vârf.",
          "Pe drumurile lungi, spre Sibiu, Oradea sau Brașov, cutia automată face călătoria mai relaxantă, iar confortul unei berline se simte după câteva ore de condus.",
        ],
        bullets: [
          "Vizite acasă din diaspora",
          "Deplasări de serviciu prin oraș",
          "Excursii în Transilvania",
          "Șoferi cu experiență mai mică în trafic aglomerat",
        ],
      },
      {
        heading: "Cât costă o mașină automată și ce include prețul",
        paragraphs: [
          "Tarifele flotei pornesc de la 70 lei pe zi. Prețul exact pentru Citroën C5 automat depinde de perioadă și de numărul de zile, așa că îl confirmăm telefonic la (0742) 925 934 înainte de rezervare. Cu cât închiriezi mai multe zile, cu atât costul pe zi scade.",
          "Nu blocăm garanție pe card, iar rovinieta este inclusă. Predarea se face personal, așa că nu plătești taxe de ghișeu sau de aeroport.",
        ],
        bullets: [
          "Tarife de la 70 lei/zi în flotă",
          "Fără garanție blocată pe card",
          "Rovinietă inclusă",
          "Preț confirmat înainte de predare",
        ],
      },
      {
        heading: "Sfaturi dacă nu ai mai condus o mașină automată",
        paragraphs: [
          "Folosești doar piciorul drept, pentru accelerație și frână. Pornești motorul cu piciorul pe frână, treci maneta în D pentru mers înainte și în R pentru marșarier, iar la oprire o treci în P și tragi frâna de mână.",
          "În primele minute mașina tinde să se miște singură când ridici piciorul de pe frână, deci apasă ușor și progresiv. La predare îți arătăm aceste comenzi pe loc, ca să pleci liniștit.",
        ],
      },
      {
        heading: "Documente necesare",
        paragraphs: [
          "Ai nevoie de carte de identitate sau pașaport și de permis de conducere categoria B valabil de minimum un an. Pentru cetățenii din afara UE recomandăm și permisul internațional, dacă permisul național nu este în alfabet latin.",
        ],
      },
      {
        heading: "Dacă mașina automată nu e liberă",
        paragraphs: [
          "Avem un număr limitat de mașini automate, așa că uneori Citroën C5 este deja rezervat pe zilele tale. În acest caz îți spunem sincer la telefon și îți propunem fie altă perioadă, fie o mașină cu cutie manuală din flotă, de exemplu o mașină economică pentru oraș sau un break pentru bagaje.",
        ],
      },
      {
        heading: "Cum preiei mașina",
        paragraphs: [
          "Ne suni sau ne scrii pe WhatsApp la (0742) 925 934 cu perioada dorită. Confirmăm disponibilitatea, apoi predarea se face personal în Gilău sau la un punct stabilit telefonic. La predare îți arătăm comenzile cutiei automate și verificăm împreună mașina.",
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
      {
        q: "Pot conduce o mașină automată dacă am permis obținut pe manual?",
        a: "Da. Permisul categoria B obținut pe cutie manuală îți permite să conduci și mașini automate.",
      },
      {
        q: "Cât de devreme trebuie să rezerv mașina automată?",
        a: "Ideal cu 3–7 zile înainte, iar în sezon și mai devreme, pentru că avem un număr limitat de mașini automate.",
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
      "inchiriere masina termen lung cluj, inchiriere auto lunara cluj, abonament masina cluj, rent a car luna cluj, masina cu abonament cluj, inchirieri auto lunare cluj, inchiriere masina lunar cluj",
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
      {
        heading: "Termen lung sau leasing: ce alegi",
        paragraphs: [
          "Leasingul presupune avans, contract pe mai mulți ani, asigurare CASCO plătită separat și grija reviziilor. Închirierea pe termen lung e mai simplă: plătești o sumă fixă pe lună, iar costurile de întreținere obișnuite rămân la noi.",
          "Diferența cea mai mare este flexibilitatea. Dacă proiectul se termină mai devreme sau nu mai ai nevoie de mașină, anunți și o predai, fără penalități de leasing și fără să vinzi o mașină second-hand.",
        ],
        bullets: [
          "Fără avans și fără garanție blocată pe card",
          "Fără angajament pe ani de zile",
          "Fără grija reviziilor, ITP-ului și a anvelopelor",
          "Un singur cost lunar, ușor de bugetat",
        ],
      },
      {
        heading: "Ce costuri sunt incluse și ce plătești tu",
        paragraphs: [
          "În tariful lunar intră RCA, ITP, rovinieta, reviziile și schimbul anvelopelor de sezon. Tu plătești doar combustibilul și eventualele taxe de drum din afara rovinietei, de exemplu taxa de pod sau de autostradă în alte țări.",
          "Prețul exact se stabilește înainte de predare, în funcție de model și de numărul de luni, și rămâne fix pe toată perioada agreată. Nu apar costuri ascunse la final și nu ai de plătit taxă de administrare.",
        ],
      },
      {
        heading: "Documente necesare pentru închirierea pe termen lung",
        paragraphs: [
          "Ai nevoie de carte de identitate sau pașaport și de permis de conducere valabil de minimum un an, la fel ca la închirierea zilnică. Dacă mașina va fi condusă și de altă persoană, anunță-ne de la început ca să trecem și datele ei.",
          "Pentru firmele care închiriază lunar pentru un angajat, spune-ne la rezervare, ca să stabilim împreună cine conduce mașina și pe ce date se face documentul de închiriere.",
        ],
      },
      {
        heading: "Cum se face predarea pentru o închiriere lunară",
        paragraphs: [
          "Predarea se face personal în Gilău sau la un punct stabilit telefonic în Cluj-Napoca ori Florești. Verificăm împreună mașina, notăm kilometrajul și nivelul de combustibil și îți explicăm tot ce trebuie să știi despre model.",
          "Pe durata închirierii poți lua legătura direct cu noi la (0742) 925 934 sau pe WhatsApp pentru prelungire, schimbul anvelopelor de sezon sau programarea reviziei.",
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
      {
        q: "Pot prelungi închirierea lunară?",
        a: "Da. Anunță-ne din timp, la telefon sau pe WhatsApp, și confirmăm prelungirea cu același model, dacă este disponibil.",
      },
      {
        q: "Ce se întâmplă dacă mașina are o problemă tehnică?",
        a: "Ne suni la (0742) 925 934 și stabilim împreună soluția: rezolvarea problemei sau, când se poate, o mașină de schimb din flotă.",
      },
      {
        q: "Se poate emite factură pe firmă?",
        a: "Da, pentru închirierile lunare emitem factură pe firmă la cerere.",
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
  ...countyLocations,
  ...intentLocations,
  ...languageLocations,
];




export function getLocation(slug: string): LocationPage | undefined {
  return locations.find((l) => l.slug === slug);
}
