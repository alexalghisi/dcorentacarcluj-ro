import type { LocationPage, LocationSection } from "./locations";

const conditions = (city: string): LocationSection => ({
  heading: `Tarife și condiții pentru clienții din ${city}`,
  paragraphs: [
    `Tariful pornește de la 70 lei/zi pentru clasa economică și scade la închirierile de o săptămână sau mai mult. Nu blocăm garanție pe card și nu cerem card de credit. Ai nevoie de buletin sau pașaport și de permis valabil de cel puțin un an. Plata se face la predare, cash sau prin transfer, iar pentru firme emitem factură.`,
    `Rezervarea se face direct cu Ovidiu, la (0742) 925 934, telefonic sau pe WhatsApp. Spui perioada, câți pasageri sunteți și de unde pleci, iar noi confirmăm mașina potrivită și locul de predare.`,
  ],
  bullets: [
    "De la 70 lei/zi, reduceri la perioade lungi",
    "Fără garanție, fără card de credit",
    "RCA, ITP, rovinietă și aer condiționat incluse",
    "Predare personală în Gilău sau la un punct stabilit telefonic",
  ],
});

const honest = (city: string) =>
  `Nu avem birou în ${city}. Servim clienți din ${city}, cu predare personală în Gilău sau la un punct stabilit telefonic.`;

export const countyLocations: LocationPage[] = [
  {
    slug: "rent-a-car-dej",
    city: "Dej",
    navLabel: "Rent a Car Dej",
    h1: "Rent a Car Dej — mașini de închiriat pentru drumurile din nordul județului",
    metaTitle: "Rent a Car Dej | Închirieri auto Dej de la 70 lei/zi",
    description:
      "Închirieri auto pentru clienți din Dej: mașini de la 70 lei/zi, fără garanție, predare personală în Gilău sau la un punct stabilit. Sună (0742) 925 934.",
    keywords: "rent a car dej, inchirieri auto dej, masini de inchiriat dej, inchiriere masina dej",
    intro: `Locuiești în Dej sau ai treabă în nordul județului Cluj și ai nevoie de o mașină câteva zile? ${honest("Dej")}`,
    highlights: [
      { label: "Tarif de la", value: "70 lei/zi" },
      { label: "Distanță față de Gilău", value: "~75 km" },
      { label: "Timp de drum", value: "~1h 10 min" },
      { label: "Rută", value: "DN1 + DN1C" },
    ],
    sections: [
      {
        heading: "Cum ajungi din Dej la mașină",
        paragraphs: [
          "Dej e la aproximativ 75 km de baza noastră din Gilău. Drumul trece prin Cluj-Napoca: DN1C de la Dej prin Bonțida și Apahida, apoi centura și DN1 spre vest. Fără trafic durează cam o oră și zece minute. La orele de vârf, traversarea Clujului poate adăuga încă 20–30 de minute.",
          "Pentru mulți clienți din Dej e mai simplu să ne întâlnim la un punct de pe traseu, de exemplu în zona Aeroportului Cluj sau la ieșirea spre Apahida. Locul și ora le stabilim la telefon, înainte de rezervare.",
        ],
      },
      {
        heading: "Pentru ce închiriază oamenii din Dej o mașină",
        paragraphs: [
          "Cererile cele mai dese vin de la cei care au mașina proprie în service și trebuie să ajungă la serviciu, de la cei care primesc rude venite din străinătate prin Aeroportul Cluj și de la cei care pleacă spre Bistrița, Năsăud sau Maramureș.",
          "Turiștii care vizitează Salina Dej sau cetatea Ciceului combină de obicei drumul cu Cluj-Napoca și Salina Turda. Pentru asemenea trasee, un break sau Volvo XC90 cu 7 locuri e mai comod decât o mașină mică.",
        ],
        bullets: [
          "Mașină de înlocuire cât timp a ta e în service",
          "Preluare rude de la Aeroportul Cluj",
          "Drumuri spre Bistrița, Baia Mare și Maramureș",
          "Excursii la Salina Dej și în împrejurimi",
        ],
      },
      conditions("Dej"),
    ],
    faq: [
      { q: "Aveți birou în Dej?", a: "Nu. Servim clienți din Dej, cu predare personală în Gilău sau la un punct stabilit telefonic, de exemplu în zona Aeroportului Cluj." },
      { q: "Cât durează drumul din Dej până la voi?", a: "Aproximativ o oră și zece minute pe DN1C și DN1, prin Cluj-Napoca. La orele de vârf poate dura mai mult." },
      { q: "Pot lua mașina pentru un drum spre Maramureș?", a: "Da, mașinile pot circula în toată țara. Spune-ne traseul la rezervare, ca să recomandăm modelul potrivit." },
      { q: "Ce mașină recomandați pentru o familie din Dej?", a: "Un break, de exemplu Ford Focus Break sau VW Passat Break, ori Volvo XC90 cu 7 locuri pentru grupuri mai mari." },
      { q: "Cât costă o zi?", a: "De la 70 lei/zi pentru clasa economică. Prețul final îl confirmăm telefonic înainte de rezervare." },
    ],
    nearby: ["rent-a-car-gherla", "rent-a-car-jucu", "rent-a-car-apahida", "rent-a-car-cluj-napoca"],
  },
  {
    slug: "rent-a-car-gherla",
    city: "Gherla",
    navLabel: "Rent a Car Gherla",
    h1: "Rent a Car Gherla — închirieri auto pentru navetă și drumuri lungi",
    metaTitle: "Rent a Car Gherla | Închirieri auto Gherla, 70 lei/zi",
    description:
      "Mașini de închiriat pentru clienți din Gherla, de la 70 lei/zi, fără garanție. Predare în Gilău sau la un punct stabilit telefonic. (0742) 925 934.",
    keywords: "rent a car gherla, inchirieri auto gherla, masini de inchiriat gherla, inchiriere masina gherla",
    intro: `Gherla e la mai puțin de o oră de Cluj-Napoca, iar mulți locuitori fac zilnic drumul spre oraș. ${honest("Gherla")}`,
    highlights: [
      { label: "Tarif de la", value: "70 lei/zi" },
      { label: "Distanță față de Gilău", value: "~60 km" },
      { label: "Timp de drum", value: "~55 min" },
      { label: "Rută", value: "DN1C + centura Cluj" },
    ],
    sections: [
      {
        heading: "Drumul Gherla – Gilău",
        paragraphs: [
          "Din Gherla ajungi la noi pe DN1C, prin Iclod, Bonțida și Apahida, apoi pe centura Clujului și pe DN1 spre Gilău. Sunt în jur de 60 km și aproximativ 55 de minute fără aglomerație. Dimineața, intrarea în Cluj prin Apahida e de obicei cea mai lentă porțiune.",
          "Dacă oricum vii în Cluj cu autobuzul sau trenul, putem stabili predarea la un punct de pe drumul tău, ca să nu mai mergi până în Gilău. Punctul îl alegem împreună la telefon.",
        ],
      },
      {
        heading: "Situații tipice pentru clienții din Gherla",
        paragraphs: [
          "Naveta e motivul principal: oameni care lucrează în Cluj-Napoca sau în parcul industrial de la Jucu și rămân fără mașină câteva zile. O mașină economică, cu consum mic, face drumul zilnic mult mai ieftin decât un taxi.",
          "Mai sunt cei care primesc oaspeți, fac un drum la Aeroportul Cluj sau vor să vadă Gherla și împrejurimile: catedrala armeano-catolică, centrul vechi construit de armeni și satele de pe Valea Someșului.",
        ],
        bullets: [
          "Navetă zilnică spre Cluj-Napoca sau Jucu",
          "Mașină temporară cât timp a ta e în reparație",
          "Transfer la Aeroportul Cluj, la ~45 km",
          "Weekend în Apuseni sau spre Bistrița",
        ],
      },
      conditions("Gherla"),
    ],
    faq: [
      { q: "Livrați mașina în Gherla?", a: "Nu avem birou în Gherla. Predarea se face personal în Gilău sau la un punct stabilit telefonic, de obicei pe traseul spre Cluj-Napoca." },
      { q: "Merită o mașină închiriată pentru naveta Gherla – Cluj?", a: "Da, pentru câteva zile sau săptămâni o mașină economică iese mai ieftin decât taxiul. La perioade lungi tariful pe zi scade." },
      { q: "Pot închiria fără card de credit?", a: "Da. Nu cerem card de credit și nu blocăm garanție. Plata se face la predare." },
      { q: "Pot returna mașina la Aeroportul Cluj?", a: "Da, stabilim locul de returnare la rezervare, inclusiv în zona aeroportului." },
    ],
    nearby: ["rent-a-car-dej", "rent-a-car-jucu", "rent-a-car-apahida", "rent-a-car-cluj-napoca"],
  },
  {
    slug: "rent-a-car-campia-turzii",
    city: "Câmpia Turzii",
    navLabel: "Rent a Car Câmpia Turzii",
    h1: "Rent a Car Câmpia Turzii — mașini de închiriat lângă A3",
    metaTitle: "Rent a Car Câmpia Turzii | Închirieri auto, 70 lei/zi",
    description:
      "Închirieri auto pentru clienți din Câmpia Turzii: de la 70 lei/zi, fără garanție. Predare în Gilău sau la un punct stabilit, acces rapid pe A3.",
    keywords: "rent a car campia turzii, inchirieri auto campia turzii, masini de inchiriat campia turzii",
    intro: `Câmpia Turzii are acces direct la Autostrada Transilvania, așa că drumul până la noi e rapid. ${honest("Câmpia Turzii")}`,
    highlights: [
      { label: "Tarif de la", value: "70 lei/zi" },
      { label: "Distanță față de Gilău", value: "~60 km" },
      { label: "Timp de drum", value: "~50 min" },
      { label: "Rută", value: "A3" },
    ],
    sections: [
      {
        heading: "Pe A3, de la Câmpia Turzii la Gilău",
        paragraphs: [
          "Varianta cea mai rapidă e Autostrada Transilvania (A3): intri pe nodul Turda / Câmpia Turzii și ieși la Gilău, fără să treci prin Cluj-Napoca. Sunt aproximativ 60 km și în jur de 50 de minute. Pe DN1 prin Turda și Cluj drumul e mai scurt pe hartă, dar durează mai mult din cauza traficului.",
          "Pentru că A3 trece chiar pe lângă Gilău, mulți clienți preferă să vină direct la noi. Dacă nu ai cum să ajungi, stabilim un punct de întâlnire la telefon.",
        ],
      },
      {
        heading: "De ce au nevoie de mașină locuitorii din Câmpia Turzii",
        paragraphs: [
          "Orașul are o tradiție industrială puternică, iar mulți lucrează în ture, la Câmpia Turzii, Turda sau Cluj. Când mașina proprie se strică, o mașină închiriată pe câteva zile rezolvă drumul la serviciu.",
          "Zona e bună și pentru turism: Salina Turda e la aproximativ 15 km, Cheile Turzii la încă 10 km, iar spre Alba Iulia și Sibiu ajungi repede pe A10 și A1.",
        ],
        bullets: [
          "Drum la serviciu în ture, inclusiv dimineața devreme",
          "Excursii la Salina Turda și Cheile Turzii",
          "Drumuri pe A3, A10 și A1 spre Alba Iulia și Sibiu",
          "Mașină de înlocuire după un accident",
        ],
      },
      conditions("Câmpia Turzii"),
    ],
    faq: [
      { q: "Aveți punct de închiriere în Câmpia Turzii?", a: "Nu. Servim clienți din Câmpia Turzii, cu predare personală în Gilău sau la un punct stabilit telefonic." },
      { q: "Cât durează drumul până la Gilău?", a: "Aproximativ 50 de minute pe A3, fără să treci prin Cluj-Napoca." },
      { q: "Pot folosi mașina pe autostradă?", a: "Da. Rovinieta e inclusă, iar mașinile pot circula pe toate autostrăzile din România." },
      { q: "Ce mașină recomandați pentru Salina și Cheile Turzii?", a: "Orice mașină din flotă e potrivită. Pentru grupuri de 5–7 persoane recomandăm un break sau Volvo XC90." },
      { q: "Pot închiria pentru o singură zi?", a: "Da, închiriem de la o zi, de la 70 lei/zi." },
    ],
    nearby: ["rent-a-car-turda", "rent-a-car-feleacu", "rent-a-car-cluj-napoca", "rent-a-car-gilau"],
  },
  {
    slug: "rent-a-car-huedin",
    city: "Huedin",
    navLabel: "Rent a Car Huedin",
    h1: "Rent a Car Huedin — mașini de închiriat pentru Apuseni și Valea Crișului",
    metaTitle: "Rent a Car Huedin | Închirieri auto Huedin, 70 lei/zi",
    description:
      "Închirieri auto pentru clienți din Huedin: de la 70 lei/zi, fără garanție, la ~30 min pe DN1. Predare în Gilău sau la un punct stabilit.",
    keywords: "rent a car huedin, inchirieri auto huedin, masini de inchiriat huedin, inchiriere masina apuseni",
    intro: `Huedin e cel mai aproape oraș de noi pe direcția vest, pe DN1 spre Oradea. ${honest("Huedin")}`,
    highlights: [
      { label: "Tarif de la", value: "70 lei/zi" },
      { label: "Distanță față de Gilău", value: "~32 km" },
      { label: "Timp de drum", value: "~30 min" },
      { label: "Rută", value: "DN1 (E60)" },
    ],
    sections: [
      {
        heading: "Huedin – Gilău, direct pe DN1",
        paragraphs: [
          "Între Huedin și Gilău sunt aproximativ 32 km pe DN1 (E60), prin Izvorul Crișului și Căpușu Mare. Drumul durează cam o jumătate de oră și nu trece prin niciun oraș mare, deci traficul e de obicei lejer. Din Huedin ajungi la noi mai repede decât mulți locuitori din Cluj-Napoca.",
          "Dacă preferi, ne putem întâlni la un punct de pe DN1, între Huedin și Gilău. Îl stabilim la telefon când faci rezervarea.",
        ],
      },
      {
        heading: "Mașină pentru munte, sate și drumuri spre Oradea",
        paragraphs: [
          "Huedin e poarta spre Munții Apuseni: Beliș-Fântânele, Mărișel, Răchițele și Cascada Vălul Miresei sunt la mai puțin de o oră. Drumurile de munte au urcări și serpentine, așa că pentru grupuri cu bagaje recomandăm o mașină mai puternică, de exemplu VW Passat sau Volvo XC90.",
          "Mai închiriază de la noi oameni care lucrează în Cluj-Napoca și fac naveta, familii care merg spre Oradea sau granița cu Ungaria și cei care au rude în satele din jurul Huedinului.",
        ],
        bullets: [
          "Excursii în Apuseni: Beliș, Mărișel, Răchițele",
          "Navetă Huedin – Cluj-Napoca",
          "Drumuri spre Oradea și granița de vest",
          "Vizite la Castelul Bánffy din Bonțida sau Cetatea Bologa",
        ],
      },
      conditions("Huedin"),
    ],
    faq: [
      { q: "Aveți birou în Huedin?", a: "Nu. Servim clienți din Huedin, cu predare personală în Gilău, la ~30 de minute pe DN1, sau la un punct stabilit telefonic." },
      { q: "Ce mașină recomandați pentru Apuseni?", a: "Pentru drumuri de munte cu bagaje recomandăm VW Passat Break sau Volvo XC90. Pentru doi oameni ajunge și o mașină economică." },
      { q: "Pot ieși din țară cu mașina, spre Ungaria?", a: "Spune-ne la rezervare. Stabilim împreună condițiile pentru drumuri în afara țării." },
      { q: "Cât costă o săptămână?", a: "De la 70 lei/zi, cu tarif redus pe zi la închirierea pentru o săptămână. Prețul exact îl confirmăm telefonic." },
    ],
    nearby: ["rent-a-car-sanpaul", "rent-a-car-aghiresu", "rent-a-car-gilau", "rent-a-car-floresti-cluj"],
  },
  {
    slug: "rent-a-car-apahida",
    city: "Apahida",
    navLabel: "Rent a Car Apahida",
    h1: "Rent a Car Apahida — mașini de închiriat lângă Aeroportul Cluj",
    metaTitle: "Rent a Car Apahida | Închirieri auto Apahida, 70 lei/zi",
    description:
      "Mașini de închiriat pentru clienți din Apahida, aproape de Aeroportul Cluj: de la 70 lei/zi, fără garanție. Predare în Gilău sau la un punct stabilit.",
    keywords: "rent a car apahida, inchirieri auto apahida, masini de inchiriat apahida, inchiriere masina apahida",
    intro: `Apahida e la câțiva kilometri de Aeroportul Internațional Cluj și de parcul industrial Jucu. ${honest("Apahida")}`,
    highlights: [
      { label: "Tarif de la", value: "70 lei/zi" },
      { label: "Distanță față de Gilău", value: "~35 km" },
      { label: "Timp de drum", value: "~40 min" },
      { label: "Rută", value: "Centura Cluj / DN1" },
    ],
    sections: [
      {
        heading: "Din Apahida până la Gilău",
        paragraphs: [
          "Apahida e la est de Cluj-Napoca, iar Gilău la vest, deci drumul traversează zona metropolitană: aproximativ 35 km, pe centura Clujului (Vâlcele – Apahida) sau prin oraș, apoi pe DN1. Fără trafic durează cam 40 de minute. O variantă la fel de bună e A3: intri la Vâlcele și ieși la Gilău.",
          "Pentru că Aeroportul Cluj e la doar câțiva kilometri de Apahida, punctul de întâlnire ales cel mai des de clienții de aici este zona aeroportului. Ora exactă o stabilim telefonic.",
        ],
      },
      {
        heading: "Cine închiriază mașini în Apahida",
        paragraphs: [
          "Apahida a crescut mult în ultimii ani, cu cartiere noi în Sânnicoara și Câmpenești. Mulți locuitori lucrează în Cluj-Napoca sau la Jucu și au nevoie de o a doua mașină când partenerul pleacă cu cea a familiei.",
          "Apoi sunt cei care aterizează la Cluj și vor să aibă mașina gata, fără să mai treacă prin centrul orașului, și firmele din zona industrială care primesc colegi sau parteneri pentru câteva zile.",
        ],
        bullets: [
          "Predare în zona Aeroportului Cluj",
          "A doua mașină pentru familie, pe termen scurt",
          "Mașini pentru angajați și parteneri ai firmelor din zonă",
          "Factură pentru persoane juridice",
        ],
      },
      conditions("Apahida"),
    ],
    faq: [
      { q: "Aveți sediu în Apahida?", a: "Nu. Servim clienți din Apahida, cu predare personală în Gilău sau la un punct stabilit telefonic, de obicei în zona Aeroportului Cluj." },
      { q: "Pot lua mașina direct de la aeroport?", a: "Da, stabilim predarea în zona Aeroportului Avram Iancu Cluj, la ora sosirii tale." },
      { q: "Închiriați mașini firmelor din Apahida?", a: "Da, emitem factură și avem tarife speciale pentru închirieri lungi." },
      { q: "Cât costă?", a: "De la 70 lei/zi pentru clasa economică, fără garanție și fără card de credit." },
    ],
    nearby: ["rent-a-car-jucu", "rent-a-car-aeroport-cluj", "rent-a-car-cluj-napoca", "rent-a-car-gherla"],
  },
  {
    slug: "rent-a-car-baciu",
    city: "Baciu",
    navLabel: "Rent a Car Baciu",
    h1: "Rent a Car Baciu — mașini de închiriat la 15 minute de tine",
    metaTitle: "Rent a Car Baciu | Închirieri auto Baciu de la 70 lei/zi",
    description:
      "Închirieri auto pentru clienți din Baciu și Coruș: de la 70 lei/zi, fără garanție, la ~15 min de Gilău pe DN1. Sună (0742) 925 934.",
    keywords: "rent a car baciu, inchirieri auto baciu, masini de inchiriat baciu, inchiriere masina corus",
    intro: `Baciu e una dintre localitățile cele mai apropiate de noi: ajungi în Gilău în aproximativ un sfert de oră. ${honest("Baciu")}`,
    highlights: [
      { label: "Tarif de la", value: "70 lei/zi" },
      { label: "Distanță față de Gilău", value: "~12 km" },
      { label: "Timp de drum", value: "~15 min" },
      { label: "Rută", value: "DN1 / A3" },
    ],
    sections: [
      {
        heading: "Cel mai scurt drum: Baciu – Gilău",
        paragraphs: [
          "Din Baciu ajungi la noi pe DN1, prin Florești, sau pe A3, prin nodul Nădășelu. Sunt cam 12–15 km, adică aproximativ 15 minute. Dimineața, DN1 prin Florești e aglomerat, așa că recomandăm A3 sau o oră mai lejeră.",
          "Pentru clienții din Baciu, Coruș, Suceagu sau Rădaia stabilim de obicei predarea direct în Gilău, iar când e nevoie, la un punct convenit la telefon.",
        ],
      },
      {
        heading: "Pentru ce e bună o mașină închiriată în Baciu",
        paragraphs: [
          "Baciu e în mare parte o zonă rezidențială, cu mulți locuitori care lucrează în Cluj-Napoca, în zona Polus sau în centrul orașului. Când mașina e în service sau ai nevoie de una în plus pentru o săptămână, o mașină economică rezolvă naveta.",
          "Weekendul, mulți pleacă spre Apuseni sau spre lacurile Tarnița și Beliș, la mai puțin de o oră. Pentru asta, break-urile din flotă au loc pentru tot bagajul.",
        ],
        bullets: [
          "Navetă spre Cluj-Napoca și zona Vivo/Polus",
          "Weekend la Tarnița, Beliș sau în Apuseni",
          "Mașină pentru oaspeții veniți la Cluj",
          "Închiriere de la o zi până la câteva luni",
        ],
      },
      conditions("Baciu"),
    ],
    faq: [
      { q: "Aveți birou în Baciu?", a: "Nu. Servim clienți din Baciu, cu predare personală în Gilău, la ~15 minute, sau la un punct stabilit telefonic." },
      { q: "Pot închiria pe termen lung?", a: "Da, închiriem și lunar, cu tarif mai mic pe zi." },
      { q: "Pot închiria azi pentru mâine?", a: "De obicei da, în funcție de mașinile libere. Sună la (0742) 925 934 ca să verificăm." },
      { q: "Trebuie să las garanție?", a: "Nu. Nu blocăm garanție și nu cerem card de credit." },
    ],
    nearby: ["rent-a-car-floresti-cluj", "rent-a-car-gilau", "rent-a-car-sanpaul", "rent-a-car-cluj-napoca"],
  },
  {
    slug: "rent-a-car-feleacu",
    city: "Feleacu",
    navLabel: "Rent a Car Feleacu",
    h1: "Rent a Car Feleacu — închirieri auto pe dealul de lângă Cluj",
    metaTitle: "Rent a Car Feleacu | Închirieri auto Feleacu, 70 lei/zi",
    description:
      "Mașini de închiriat pentru clienți din Feleacu și Vâlcele: de la 70 lei/zi, fără garanție. Predare în Gilău sau la un punct stabilit telefonic.",
    keywords: "rent a car feleacu, inchirieri auto feleacu, masini de inchiriat feleacu, inchiriere masina valcele",
    intro: `Feleacu e pe dealul de la sud de Cluj-Napoca, pe drumul spre Turda. ${honest("Feleacu")}`,
    highlights: [
      { label: "Tarif de la", value: "70 lei/zi" },
      { label: "Distanță față de Gilău", value: "~28 km" },
      { label: "Timp de drum", value: "~30 min" },
      { label: "Rută", value: "A3 (nod Vâlcele)" },
    ],
    sections: [
      {
        heading: "Feleacu – Gilău, pe autostradă",
        paragraphs: [
          "Din Feleacu cel mai rapid ajungi pe DN1 (E60) până la nodul Vâlcele, apoi pe A3 până la Gilău. Sunt aproximativ 28 km și cam o jumătate de oră. Varianta prin Cluj-Napoca, pe Calea Turzii, e mai scurtă, dar durează mai mult din cauza traficului din oraș.",
          "Ne putem întâlni și la un punct de pe drum, de exemplu la nodul Vâlcele. Stabilim locul la telefon.",
        ],
      },
      {
        heading: "Viața între pădure și oraș",
        paragraphs: [
          "Feleacu, Gheorghieni și Vâlcele s-au umplut în ultimii ani de case noi. Locuitorii fac zilnic drumul în Cluj-Napoca, iar transportul public e rar. De aceea, o mașină închiriată pe câteva zile e adesea singura variantă practică atunci când mașina familiei lipsește.",
          "Zona e bună pentru plimbări în Pădurea Făget și pentru excursii scurte spre Turda și Cheile Turzii, la sub 30 de minute. Iarna, dealul Feleacului poate fi alunecos, iar mașinile noastre au anvelope de sezon.",
        ],
        bullets: [
          "Navetă spre Cluj-Napoca când lipsește mașina familiei",
          "Excursii la Salina Turda și Cheile Turzii",
          "Anvelope de iarnă incluse în sezonul rece",
          "Drumuri pe A3 spre Turda, Alba Iulia și Sibiu",
        ],
      },
      conditions("Feleacu"),
    ],
    faq: [
      { q: "Aveți punct de închiriere în Feleacu?", a: "Nu. Servim clienți din Feleacu, cu predare personală în Gilău sau la un punct stabilit telefonic, de exemplu la nodul Vâlcele." },
      { q: "Mașinile au anvelope de iarnă?", a: "Da, în sezonul rece toate mașinile au anvelope de iarnă, incluse în preț." },
      { q: "Cât durează drumul din Feleacu până la voi?", a: "Aproximativ 30 de minute pe A3, prin nodul Vâlcele." },
      { q: "Pot închiria doar pentru weekend?", a: "Da, închiriem de la o zi. Recomandăm să rezervi din timp pentru weekend." },
    ],
    nearby: ["rent-a-car-turda", "rent-a-car-campia-turzii", "rent-a-car-cluj-napoca", "rent-a-car-apahida"],
  },
  {
    slug: "rent-a-car-aghiresu",
    city: "Aghireșu",
    navLabel: "Rent a Car Aghireșu",
    h1: "Rent a Car Aghireșu — mașini de închiriat pentru drumul la serviciu",
    metaTitle: "Rent a Car Aghireșu | Închirieri auto de la 70 lei/zi",
    description:
      "Închirieri auto pentru clienți din Aghireșu și Aghireșu-Fabrici: de la 70 lei/zi, fără garanție, la ~25 min de Gilău. Sună (0742) 925 934.",
    keywords: "rent a car aghiresu, inchirieri auto aghiresu, masini de inchiriat aghiresu, inchiriere masina aghiresu fabrici",
    intro: `Aghireșu e pe DN1, între Gilău și Huedin, cu acces rapid spre Cluj-Napoca. ${honest("Aghireșu")}`,
    highlights: [
      { label: "Tarif de la", value: "70 lei/zi" },
      { label: "Distanță față de Gilău", value: "~22 km" },
      { label: "Timp de drum", value: "~25 min" },
      { label: "Rută", value: "DN1 (E60)" },
    ],
    sections: [
      {
        heading: "Aghireșu – Gilău, un drum scurt pe DN1",
        paragraphs: [
          "Între Aghireșu și Gilău sunt aproximativ 22 km pe DN1, prin Nădășelu sau pe drumul județean prin Leghia. Drumul durează cam 25 de minute. Din Aghireșu-Fabrici e la fel, pe DN1, prin Căpușu Mic.",
          "Majoritatea clienților din zonă vin direct în Gilău, pentru că e în drumul lor spre Cluj-Napoca. Dacă nu poți, stabilim la telefon un punct de întâlnire.",
        ],
      },
      {
        heading: "Mașină pentru lucru în ture și drumuri în familie",
        paragraphs: [
          "Aghireșu-Fabrici are tradiție industrială, iar mulți locuitori lucrează în ture la firmele din zonă sau în Cluj-Napoca. Când mașina proprie se strică, transportul public nu se potrivește mereu cu programul turelor, așa că o mașină închiriată rezolvă problema.",
          "Pentru familii, Aghireșu e un punct de plecare bun spre Apuseni, Huedin sau Zalău. Pentru drumuri lungi, break-urile din flotă au portbagaj mare.",
        ],
        bullets: [
          "Drum la serviciu în ture, la orice oră",
          "Mașină temporară cât timp a ta e în reparație",
          "Drumuri spre Zalău, Huedin și Apuseni",
          "Factură pentru firmele din zonă",
        ],
      },
      conditions("Aghireșu"),
    ],
    faq: [
      { q: "Aveți birou în Aghireșu?", a: "Nu. Servim clienți din Aghireșu, cu predare personală în Gilău, la ~25 minute, sau la un punct stabilit telefonic." },
      { q: "Pot lua mașina dimineața devreme, pentru tura de noapte?", a: "Stabilim ora la telefon. Încercăm să ne adaptăm programului tău." },
      { q: "Închiriați mașini firmelor din Aghireșu?", a: "Da, emitem factură pentru persoane juridice." },
      { q: "Cât costă?", a: "De la 70 lei/zi pentru clasa economică, fără garanție." },
    ],
    nearby: ["rent-a-car-huedin", "rent-a-car-sanpaul", "rent-a-car-gilau", "rent-a-car-baciu"],
  },
  {
    slug: "rent-a-car-jucu",
    city: "Jucu",
    navLabel: "Rent a Car Jucu",
    h1: "Rent a Car Jucu — mașini de închiriat pentru parcul industrial",
    metaTitle: "Rent a Car Jucu | Închirieri auto Jucu de la 70 lei/zi",
    description:
      "Mașini de închiriat pentru angajații și firmele din Jucu și Tetarom III: de la 70 lei/zi, fără garanție. Predare în Gilău sau la un punct stabilit.",
    keywords: "rent a car jucu, inchirieri auto jucu, masini de inchiriat jucu, inchiriere masina tetarom",
    intro: `Jucu găzduiește unul dintre cele mai mari parcuri industriale din Transilvania. ${honest("Jucu")}`,
    highlights: [
      { label: "Tarif de la", value: "70 lei/zi" },
      { label: "Distanță față de Gilău", value: "~40 km" },
      { label: "Timp de drum", value: "~40 min" },
      { label: "Rută", value: "DN1C + A3" },
    ],
    sections: [
      {
        heading: "Din Jucu la Gilău",
        paragraphs: [
          "Jucu e pe DN1C, între Apahida și Bonțida. Până la Gilău sunt aproximativ 40 km: prin Apahida, pe centura Clujului și DN1, sau pe A3, cu intrare la Vâlcele. Drumul durează în jur de 40 de minute.",
          "Pentru angajații parcului industrial, punctul de întâlnire cel mai practic e de obicei zona Aeroportului Cluj sau Apahida, pe drumul spre casă. Detaliile le stabilim telefonic.",
        ],
      },
      {
        heading: "Mașini pentru angajați, ture și delegații",
        paragraphs: [
          "Parcul industrial Tetarom III din Jucu are mii de angajați care lucrează în ture, mulți veniți din alte localități. Când cineva rămâne fără mașină sau un coleg nou are nevoie de transport în primele săptămâni, o mașină închiriată pe termen scurt e soluția cea mai simplă.",
          "Firmele din parc ne cer mașini pentru delegații, pentru specialiști veniți din străinătate și pentru drumuri la Aeroportul Cluj, aflat la aproximativ 15 km. Emitem factură și facem tarif special la închirieri lungi.",
        ],
        bullets: [
          "Mașini pentru angajați în primele săptămâni de lucru",
          "Delegații și specialiști veniți din străinătate",
          "Transfer la Aeroportul Cluj, la ~15 km",
          "Contracte lunare cu factură",
        ],
      },
      conditions("Jucu"),
    ],
    faq: [
      { q: "Aveți punct de predare în parcul industrial Jucu?", a: "Nu avem birou în Jucu. Predarea se face personal în Gilău sau la un punct stabilit telefonic, de exemplu în zona Aeroportului Cluj." },
      { q: "Pot închiria o mașină pentru o lună?", a: "Da, avem tarife lunare, cu preț mai mic pe zi." },
      { q: "Firma mea poate primi factură?", a: "Da, emitem factură pentru toate închirierile făcute de firme." },
      { q: "Trebuie card de credit?", a: "Nu. Nu cerem card de credit și nu blocăm garanție." },
      { q: "Pot lua mașina după tura de noapte?", a: "Stabilim ora la telefon și încercăm să ne potrivim cu programul tău." },
    ],
    nearby: ["rent-a-car-apahida", "rent-a-car-gherla", "rent-a-car-dej", "rent-a-car-aeroport-cluj"],
  },
  {
    slug: "rent-a-car-sanpaul",
    city: "Sânpaul",
    navLabel: "Rent a Car Sânpaul",
    h1: "Rent a Car Sânpaul — mașini de închiriat la 20 de minute de Gilău",
    metaTitle: "Rent a Car Sânpaul | Închirieri auto Sânpaul, 70 lei/zi",
    description:
      "Închirieri auto pentru clienți din Sânpaul și Topa Mică: de la 70 lei/zi, fără garanție, aproape de Gilău și A3. Sună la (0742) 925 934.",
    keywords: "rent a car sanpaul, inchirieri auto sanpaul, masini de inchiriat sanpaul, inchiriere masina sanpaul cluj",
    intro: `Sânpaul e la vest de Gilău, aproape de DN1 și de A3. ${honest("Sânpaul")}`,
    highlights: [
      { label: "Tarif de la", value: "70 lei/zi" },
      { label: "Distanță față de Gilău", value: "~20 km" },
      { label: "Timp de drum", value: "~20 min" },
      { label: "Rută", value: "DN1 / DJ" },
    ],
    sections: [
      {
        heading: "Sânpaul – Gilău",
        paragraphs: [
          "Din Sânpaul ajungi la noi pe drumul județean până la DN1, apoi spre est, prin Nădășelu, până în Gilău. Sunt aproximativ 20 km și în jur de 20 de minute. Gilău e chiar la ieșirea de pe A3, deci după predare ai drum direct spre Cluj-Napoca, Turda sau Oradea.",
          "Pentru satele comunei, de exemplu Topa Mică, Mihăiești sau Șardu, stabilim la telefon fie predarea în Gilău, fie un punct convenabil pe DN1.",
        ],
      },
      {
        heading: "Când ai nevoie de o mașină în Sânpaul",
        paragraphs: [
          "În comunele mici, transportul public spre Cluj-Napoca e rar, iar fără mașină drumurile la medic, la serviciu sau la cumpărături devin greu de făcut. O mașină închiriată pe câteva zile e soluția când mașina familiei e în service.",
          "Vara, mulți folosesc mașina pentru drumuri spre Apuseni, prin Huedin, sau pentru a lua rude de la Aeroportul Cluj. Pentru grupuri mari avem Volvo XC90 cu 7 locuri.",
        ],
        bullets: [
          "Drumuri la Cluj-Napoca pentru serviciu sau medic",
          "Mașină cât timp a ta e în reparație",
          "Preluare rude de la Aeroportul Cluj",
          "Excursii spre Huedin și Apuseni",
        ],
      },
      conditions("Sânpaul"),
    ],
    faq: [
      { q: "Aveți birou în Sânpaul?", a: "Nu. Servim clienți din Sânpaul, cu predare personală în Gilău, la ~20 de minute, sau la un punct stabilit telefonic." },
      { q: "Pot închiria o mașină cu 7 locuri?", a: "Da, avem Volvo XC90 cu 7 locuri, în funcție de disponibilitate." },
      { q: "Cât costă o zi?", a: "De la 70 lei/zi pentru clasa economică. Prețul final îl confirmăm la telefon." },
      { q: "Ce acte îmi trebuie?", a: "Buletin sau pașaport și permis de conducere valabil de cel puțin un an." },
    ],
    nearby: ["rent-a-car-gilau", "rent-a-car-aghiresu", "rent-a-car-huedin", "rent-a-car-baciu"],
  },
];
