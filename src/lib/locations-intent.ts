import type { LocationPage, LocationSection } from "./locations";

/**
 * Intent pages added from the Nov 2026 Google Trends review (RO + județul Cluj):
 * "rent a car cluj" dominates, with long-tail spikes for "non stop", "weekend",
 * "ieftin" and seasonal winter demand. Every claim here mirrors the main pages
 * (70 lei/zi, fără garanție, predare personală, fără suprataxă după program).
 */

const howToBook: LocationSection = {
  heading: "Cum rezervi",
  paragraphs: [
    "Suni sau scrii pe WhatsApp la (0742) 925 934 cu perioada, numărul de pasageri și locul unde ai nevoie de mașină. Confirmăm disponibilitatea și tariful exact înainte de rezervare. La predare ai nevoie doar de buletin sau pașaport și de permis valabil de cel puțin un an.",
  ],
  bullets: [
    "De la 70 lei/zi, mai ieftin la perioade lungi",
    "Fără garanție și fără card de credit",
    "RCA, ITP, rovinietă, AC și anvelope de sezon incluse",
    "Predare personală în Gilău, Florești sau Cluj-Napoca",
  ],
};

export const intentLocations: LocationPage[] = [
  {
    slug: "rent-a-car-cluj-non-stop",
    city: "Cluj (non-stop)",
    navLabel: "Rent a Car Cluj non-stop",
    linkTitle: "Rent a Car Cluj non-stop",
    h1: "Rent a Car Cluj non-stop — predare dimineața devreme sau noaptea, fără suprataxă",
    metaTitle: "Rent a Car Cluj Non-Stop | Predare la orice oră, fără taxă",
    description:
      "Rent a car Cluj cu predare la ora stabilită, inclusiv devreme dimineața sau noaptea, fără suprataxă de program. De la 70 lei/zi, fără garanție. (0742) 925 934.",
    keywords:
      "rent a car cluj non stop, rent a car cluj 24/24, inchirieri auto cluj non stop, inchiriere masina cluj noaptea, rent a car cluj aeroport noaptea",
    intro:
      "Zbor care aterizează la miezul nopții, tren de dimineață sau o urgență în weekend? Nu avem un ghișeu deschis 24/24, dar predăm mașina personal la ora pe care o stabilim împreună — și seara târziu sau dimineața devreme — fără taxa de „după program” pe care o cer firmele mari.",
    highlights: [
      { label: "Tarif de la", value: "70 lei/zi" },
      { label: "Suprataxă de noapte", value: "Fără" },
      { label: "Garanție", value: "Fără" },
      { label: "Rezervare", value: "Telefon / WhatsApp" },
    ],
    sections: [
      {
        heading: "Ce înseamnă „non-stop” la noi",
        paragraphs: [
          "Predarea și returul se fac personal, la o oră stabilită dinainte, nu la un birou cu program fix. Asta ne permite să venim și la 5 dimineața sau după miezul nopții, dacă ne anunți din timp. Nu percepem suprataxă pentru predare în afara orelor obișnuite.",
          "Pentru zboruri cu întârziere, trimite-ne numărul zborului: urmărim ora reală de aterizare și ajustăm întâlnirea.",
        ],
        bullets: [
          "Predare și retur la ora convenită, inclusiv seara și noaptea",
          "Fără taxă de program prelungit",
          "Ora se ajustează după întârzierea zborului",
        ],
      },
      {
        heading: "Rent a car noaptea pentru Aeroportul Cluj",
        paragraphs: [
          "Multe zboruri low-cost aterizează la Cluj seara târziu. Baza noastră e în Gilău, la aproximativ 25 km de Aeroportul Avram Iancu, iar locul de întâlnire îl stabilim telefonic. Dacă pleci dimineața devreme, returul se poate face cu o seară înainte sau la ora zborului, după cum ne înțelegem.",
        ],
      },
      howToBook,
    ],
    faq: [
      {
        q: "Aveți rent a car non-stop în Cluj?",
        a: "Nu avem birou deschis 24/24, dar predăm și preluăm mașina la orice oră stabilită dinainte, inclusiv noaptea, fără suprataxă.",
      },
      {
        q: "Cât costă predarea mașinii noaptea?",
        a: "Nu percepem taxă suplimentară pentru predare sau retur în afara orelor obișnuite. Plătești doar tariful zilnic, de la 70 lei/zi.",
      },
      {
        q: "Ce se întâmplă dacă zborul meu întârzie?",
        a: "Trimite-ne numărul zborului la (0742) 925 934. Ajustăm ora de întâlnire după ora reală de aterizare.",
      },
    ],
    nearby: ["rent-a-car-aeroport-cluj", "inchiriere-masina-cluj-aeroport", "rent-a-car-cluj"],
  },
  {
    slug: "inchiriere-masina-weekend-cluj",
    city: "Cluj (weekend)",
    navLabel: "Mașină de închiriat weekend Cluj",
    linkTitle: "Închiriere mașină weekend Cluj",
    h1: "Închiriere mașină de weekend în Cluj — de vineri până luni, de la 70 lei/zi",
    metaTitle: "Închiriere Mașină Weekend Cluj | De la 70 lei/zi, fără garanție",
    description:
      "Mașină de închiriat pentru weekend în Cluj: de vineri până duminică sau luni, de la 70 lei/zi, fără garanție, rovinietă inclusă. Rezervă la (0742) 925 934.",
    keywords:
      "inchiriere masina weekend cluj, rent a car weekend cluj, masina de inchiriat weekend, inchirieri auto weekend cluj, rent a car cluj o zi",
    intro:
      "Weekendul e perioada cea mai cerută. Închiriem de la o singură zi, așa că poți lua mașina vineri seara și o returnezi duminică seara sau luni dimineața — fără garanție blocată pe card și fără taxe ascunse.",
    highlights: [
      { label: "Durată minimă", value: "1 zi" },
      { label: "Tarif de la", value: "70 lei/zi" },
      { label: "Garanție", value: "Fără" },
      { label: "Rovinietă", value: "Inclusă" },
    ],
    sections: [
      {
        heading: "Idei de weekend cu mașina din Cluj",
        paragraphs: [
          "Din Gilău ești la câteva minute de Lacul Tarnița și de drumul spre Munții Apuseni (Mărișel, Belis, Băișoara). Salina Turda și Cheile Turzii sunt la aproximativ o oră, iar Sighișoara, Alba Iulia sau Transalpina se pot face într-o zi lungă de drum.",
          "Pentru două persoane și puține bagaje ajunge o mașină economică. Pentru familie sau grup de prieteni recomandăm un break sau Volvo XC90 cu 7 locuri.",
        ],
        bullets: [
          "Lacul Tarnița și Apuseni — aproape de Gilău",
          "Salina Turda și Cheile Turzii — ~1 oră",
          "Break sau 7 locuri pentru grupuri",
        ],
      },
      {
        heading: "Rezervă din timp pentru weekend",
        paragraphs: [
          "Vinerea și sâmbăta se ocupă primele mașini, mai ales vara și în minivacanțe. Dacă știi deja perioada, sună-ne cu câteva zile înainte; ora de predare vineri seara și de retur duminică o stabilim împreună.",
        ],
      },
      howToBook,
    ],
    faq: [
      {
        q: "Pot închiria o mașină doar pentru weekend în Cluj?",
        a: "Da, închiriem de la o zi. Pentru weekend recomandăm rezervarea din timp, fiind cea mai cerută perioadă.",
      },
      {
        q: "Cât costă o mașină de închiriat pentru weekend?",
        a: "Tariful pornește de la 70 lei/zi pentru clasa economică. Prețul exact pentru weekendul tău îl confirmăm înainte de rezervare.",
      },
      {
        q: "Pot lua mașina vineri seara?",
        a: "Da. Ora de predare și de retur se stabilesc împreună, fără suprataxă pentru seară.",
      },
    ],
    nearby: ["rent-a-car-cluj", "rent-a-car-gilau", "inchiriere-masina-economica-cluj"],
  },
  {
    slug: "rent-a-car-cluj-ieftin",
    city: "Cluj (ieftin)",
    navLabel: "Rent a Car Cluj ieftin",
    linkTitle: "Rent a Car Cluj ieftin",
    h1: "Rent a Car Cluj ieftin — 70 lei/zi, fără garanție și fără taxe ascunse",
    metaTitle: "Rent a Car Cluj Ieftin | 70 lei/zi, Fără Garanție",
    description:
      "Rent a car ieftin în Cluj, direct de la proprietar: de la 70 lei/zi, fără garanție, fără taxă de aeroport, rovinietă și RCA incluse. Sună (0742) 925 934.",
    keywords:
      "rent a car cluj ieftin, inchirieri auto ieftine cluj, masini de inchiriat ieftine cluj, rent a car ieftin cluj napoca, inchiriere masina ieftina cluj",
    intro:
      "Un rent a car ieftin nu înseamnă doar un tarif mic pe zi, ci și lipsa costurilor adăugate la final. La noi prețul pornește de la 70 lei/zi și include RCA, ITP, rovinietă și aer condiționat — fără taxă de aeroport, fără taxă de birou și fără garanție blocată pe card.",
    highlights: [
      { label: "Tarif de la", value: "70 lei/zi" },
      { label: "Taxă aeroport", value: "Fără" },
      { label: "Garanție", value: "Fără" },
      { label: "Al doilea șofer", value: "Fără taxă" },
    ],
    sections: [
      {
        heading: "De ce suntem mai ieftini decât firmele din aeroport",
        paragraphs: [
          "Nu plătim chirie pentru un birou în terminal și nu lucrăm prin platforme de rezervare cu comision. Mașinile sunt proprii, iar predarea o facem personal. Economia se vede direct în tariful zilnic.",
          "Taxele care umflă de obicei factura — taxa de aeroport, taxa pentru al doilea șofer, suprataxa de program sau franșiza blocată pe card — la noi nu există.",
        ],
        bullets: [
          "Fără comision de platformă",
          "Fără taxă de aeroport sau de birou",
          "Fără taxă pentru al doilea șofer",
          "Reducere pe zi la închirieri de o săptămână sau o lună",
        ],
      },
      {
        heading: "Cea mai ieftină mașină din flotă",
        paragraphs: [
          "Pentru oraș și navetă, Škoda Fabia și Renault Clio Symbol au consum mic și sunt cele mai avantajoase. Pentru perioade lungi, tariful pe zi scade și se negociază în funcție de mașină și durată.",
        ],
      },
      howToBook,
    ],
    faq: [
      {
        q: "Care este cel mai ieftin rent a car din Cluj?",
        a: "La noi tariful pornește de la 70 lei/zi pentru clasa economică, cu RCA, ITP, rovinietă și AC incluse, fără garanție și fără taxe de aeroport.",
      },
      {
        q: "Există costuri ascunse?",
        a: "Nu. Prețul confirmat la rezervare este cel pe care îl plătești. Nu percepem taxă de aeroport, de birou sau pentru al doilea șofer.",
      },
      {
        q: "Este mai ieftin dacă închiriez pentru o lună?",
        a: "Da. Pentru o săptămână sau o lună, tariful pe zi scade. Sună la (0742) 925 934 pentru o ofertă.",
      },
    ],
    nearby: [
      "tarife-inchirieri-auto-cluj",
      "inchiriere-masina-economica-cluj",
      "rent-a-car-cluj-fara-garantie",
    ],
  },
  {
    slug: "inchiriere-masina-iarna-cluj",
    city: "Cluj (iarna)",
    navLabel: "Mașină de închiriat iarna Cluj",
    linkTitle: "Închiriere mașină iarna Cluj",
    h1: "Închiriere mașină iarna în Cluj — anvelope de iarnă incluse, gata de Apuseni",
    metaTitle: "Închiriere Mașină Iarna Cluj | Anvelope de iarnă incluse",
    description:
      "Mașină de închiriat iarna în Cluj, cu anvelope de iarnă incluse în preț: pentru Apuseni, Băișoara, Mărișel sau sărbători. De la 70 lei/zi, fără garanție.",
    keywords:
      "inchiriere masina iarna cluj, rent a car cluj iarna, masina cu anvelope de iarna inchiriere, rent a car apuseni, inchiriere masina craciun cluj, rent a car baisoara",
    intro:
      "Din noiembrie până în martie, toate mașinile noastre circulă pe anvelope de iarnă, incluse în tarif. Baza din Gilău e chiar la poalele Munților Apuseni, deci pleci direct spre Mărișel, Belis sau pârtia de la Băișoara.",
    highlights: [
      { label: "Anvelope de iarnă", value: "Incluse" },
      { label: "Tarif de la", value: "70 lei/zi" },
      { label: "Garanție", value: "Fără" },
      { label: "Bază", value: "Gilău, la poarta Apusenilor" },
    ],
    sections: [
      {
        heading: "Ce mașină alegi pentru drumurile de iarnă",
        paragraphs: [
          "Pentru drumurile din Apuseni și pentru familie cu bagaje de ski, Volvo XC90 cu 7 locuri e cea mai sigură alegere. Pentru oraș și sărbători în familie ajung Škoda Fabia sau Ford Focus. Break-urile VW Passat și Ford Focus au loc pentru schiuri și bagaje.",
        ],
        bullets: [
          "Volvo XC90 — 7 locuri, pentru munte și grupuri",
          "Break-uri pentru schiuri și bagaje",
          "Mașini economice pentru oraș",
        ],
      },
      {
        heading: "Sfaturi pentru condus iarna în județul Cluj",
        paragraphs: [
          "Verifică starea drumurilor înainte de plecare, mai ales spre Mărișel, Belis și Băișoara, unde ninge mai des decât în Cluj-Napoca. Pornește cu rezervorul plin, păstrează distanța și evită frânările bruște pe porțiunile cu polei.",
          "De Crăciun și Revelion cererea crește mult. Rezervă din timp dacă vii acasă de sărbători prin Aeroportul Cluj.",
        ],
      },
      howToBook,
    ],
    faq: [
      {
        q: "Mașinile au anvelope de iarnă?",
        a: "Da. Anvelopele de sezon sunt incluse în tarif, deci iarna mașinile circulă pe anvelope de iarnă.",
      },
      {
        q: "Pot merge cu mașina închiriată la Băișoara sau în Apuseni?",
        a: "Da. Baza noastră e în Gilău, chiar pe drumul spre Apuseni. Pentru drumuri de munte recomandăm Volvo XC90.",
      },
      {
        q: "Trebuie să rezerv din timp de Crăciun?",
        a: "Da. Sărbătorile de iarnă sunt foarte cerute; sună la (0742) 925 934 cât mai devreme.",
      },
    ],
    nearby: ["inchiriere-suv-7-locuri-cluj", "rent-a-car-gilau", "rent-a-car-aeroport-cluj"],
  },
];
