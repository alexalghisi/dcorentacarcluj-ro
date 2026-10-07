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
  /** Întrebări frecvente afișate la finalul articolului (intră și în schema FAQPage). */
  faq?: { q: string; a: string }[];

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
  {
    slug: "cluj-in-3-zile-cu-masina-inchiriata",
    title: "Cluj-Napoca în 3 zile cu mașina închiriată: itinerariu complet",
    metaTitle: "Cluj în 3 zile cu mașina închiriată | itinerariu",
    description:
      "Itinerariu de 3 zile în Cluj și împrejurimi cu mașina închiriată: centrul orașului, Salina Turda, Cheile Turzii și Apuseni.",
    date: "2026-08-04",
    readingMinutes: 7,
    category: "Ghid de călătorie",
    excerpt:
      "Ce vizitezi în Cluj și în jurul orașului în trei zile, cu distanțe, timpi de mers și unde parchezi.",
    sections: [
      {
        heading: "Ziua 1 — centrul Clujului și parcarea",
        paragraphs: [
          "Prima zi merită petrecută pe jos: Piața Unirii, Catedrala Sfântul Mihail, Muzeul de Artă, strada Potaissa și Cetățuia pentru priveliște. Lasă mașina într-o parcare supraterană din centru sau în zona Iulius Mall și mergi pe jos — centrul are zone cu taxare pe oră.",
        ],
        bullets: [
          "Piața Unirii și Catedrala Sfântul Mihail",
          "Grădina Botanică Alexandru Borza",
          "Cetățuia, pentru panorama orașului la apus",
          "Parcare recomandată: centre comerciale sau parcări supraterane",
        ],
      },
      {
        heading: "Ziua 2 — Salina Turda și Cheile Turzii",
        paragraphs: [
          "Turda este la aproximativ 35 km de Cluj-Napoca, circa 40 de minute pe DN1. Salina Turda se vizitează în 2–3 ore, iar după-amiaza poți continua spre Cheile Turzii pentru o drumeție ușoară. Ambele obiective sunt mult mai comode cu mașină proprie decât cu transportul public.",
        ],
        bullets: [
          "Cluj — Turda: ~35 km, ~40 min",
          "Salina Turda: 2–3 ore de vizită",
          "Cheile Turzii: traseu ușor, încălțăminte de drumeție",
          "Opțional: Băile Sărate Turda pentru relaxare",
        ],
      },
      {
        heading: "Ziua 3 — Apuseni și lacul Tarnița",
        paragraphs: [
          "A treia zi te scoate din oraș spre Gilău, Someșul Cald, lacul Tarnița și mai departe spre Mărișel sau Belis. Drumurile sunt asfaltate, dar au multe curbe — o mașină cu consum mic sau un SUV pentru zăpadă sunt cele mai potrivite, în funcție de sezon.",
        ],
        bullets: [
          "Cluj — Tarnița: ~35 km, drum de curbe",
          "Gilău, punctul nostru de predare, este pe traseu",
          "Belis-Fântânele pentru priveliști și cazare de weekend",
          "Iarna: verifică starea drumului înainte de plecare",
        ],
      },
      {
        heading: "De ce mașina închiriată schimbă itinerariul",
        paragraphs: [
          "Cu transport public, majoritatea obiectivelor din jurul Clujului îți consumă o zi întreagă fiecare. Cu o mașină închiriată de la 70 lei pe zi, poți combina două sau trei obiective într-o singură zi și te întorci în oraș la ora care îți convine.",
        ],
      },
    ],
  },
  {
    slug: "transfer-aeroport-cluj-optiuni",
    title: "Transfer de la Aeroportul Cluj: taxi, ride-sharing sau mașină închiriată?",
    metaTitle: "Transfer Aeroport Cluj: ce variantă costă mai puțin",
    description:
      "Comparație între taxi, ride-sharing și mașină închiriată pentru transferul de la Aeroportul Cluj spre oraș, Florești sau Gilău.",
    date: "2026-08-05",
    readingMinutes: 5,
    category: "Ghid",
    excerpt:
      "Cât costă și cât durează fiecare variantă de transfer de la Aeroportul Internațional Cluj, și când e mai ieftin să închiriezi.",
    sections: [
      {
        heading: "Distanțe reale de la aeroport",
        paragraphs: [
          "Aeroportul Internațional Avram Iancu este la aproximativ 9 km de centrul Clujului, la circa 20 km de Florești și 25 km de Gilău. Traficul de pe strada Traian Vuia poate dubla timpul de deplasare la orele de vârf.",
        ],
        bullets: [
          "Aeroport — centru Cluj: ~9 km, 15–30 min",
          "Aeroport — Florești: ~20 km",
          "Aeroport — Gilău: ~25 km",
        ],
      },
      {
        heading: "Când e mai ieftină mașina închiriată",
        paragraphs: [
          "Dacă stai o singură noapte și nu ieși din oraș, un taxi sau ride-sharing este suficient. Din momentul în care ai două sau mai multe deplasări pe zi, sau vrei să vezi Turda, Apusenii ori satele din jur, costul cumulat al transferurilor depășește rapid tariful zilnic de închiriere.",
        ],
        bullets: [
          "1 zi în oraș, fără ieșiri: taxi/ride-sharing",
          "2+ zile sau ieșiri din oraș: mașină închiriată",
          "Grup de 5–7 persoane: SUV de 7 locuri, cost pe persoană mult mai mic",
          "Bagaje multe: break, nu autoturism mic",
        ],
      },
      {
        heading: "Cum funcționează predarea la aeroport",
        paragraphs: [
          "Confirmăm telefonic ora aterizării și stabilim punctul de întâlnire în zona aeroportului. Nu există birou de terminal și nu plătești taxe de aeroport suplimentare — predarea se face personal, direct de la proprietar.",
        ],
      },
    ],
  },
  {
    slug: "masina-manuala-sau-automata-de-inchiriat-cluj",
    title: "Mașină manuală sau automată de închiriat în Cluj: care ți se potrivește",
    metaTitle: "Manuală sau automată de închiriat în Cluj? | DCO",
    description:
      "Comparație între mașinile manuale și automate de închiriat în Cluj: consum, confort în trafic, preț pe zi și pe ce drumuri contează diferența.",
    date: "2026-08-01",
    readingMinutes: 9,
    category: "Comparație",
    excerpt:
      "Diferențele reale între o cutie manuală și una automată când închiriezi în Cluj: cost, consum, trafic urban și drumuri de munte.",
    sections: [
      {
        heading: "De ce contează alegerea cutiei într-un oraș ca Cluj-Napoca",
        paragraphs: [
          "Clujul are câteva particularități care schimbă complet experiența de condus: trafic dens pe Calea Turzii, pe Bulevardul Muncii și pe centura de vest la orele de vârf, plus străzi în pantă în Grigorescu, Zorilor și Andrei Mureșanu. Într-un asemenea context, cutia de viteze nu este un detaliu de confort, ci factorul care decide cât de obositoare e o zi la volan.",
          "Într-o mașină manuală, un traseu de 8 km prin centru la ora 17:00 poate însemna câteva sute de schimbări de treaptă și zeci de porniri din rampă. Într-una automată, aceleași 8 km cer doar accelerație și frână. Dacă rămâi în oraș, diferența se simte din prima zi.",
          "În schimb, dacă planul tău e să ieși din oraș — Apuseni, Tarnița, Beliș, Alba Iulia — o cutie manuală bine folosită îți dă control mai bun la coborâri lungi, unde frâna de motor contează, și un consum ușor mai mic pe drum deschis.",
        ],
        bullets: [
          "Trafic urban intens și pante: avantaj clar pentru automată",
          "Drumuri de munte cu coborâri lungi: manuala oferă frână de motor mai previzibilă",
          "Autostradă și drum național: diferența de consum este mică, sub 0,5 l/100 km",
          "Șoferi cu permis recent: automata reduce semnificativ stresul",
        ],
      },
      {
        heading: "Consum: cât de mare e diferența în realitate",
        paragraphs: [
          "Mitul „automata consumă mult mai mult” vine din generațiile vechi de cutii hidraulice cu 3 sau 4 trepte. Automatele moderne cu 6 trepte sau mai multe, cum e cea de pe Citroënul C5 din flota noastră, se apropie foarte mult de echivalentele manuale. În oraș, diferența tipică ajunge la 0,5–1 l/100 km; pe drum lung devine aproape nesemnificativă.",
          "Mai important decât cutia este masa mașinii și stilul de condus. Un break VW Passat încărcat cu patru persoane și bagaje va consuma mai mult decât o Škoda Fabia, indiferent de tipul cutiei. Pe o închiriere de 3 zile în zona Cluj, diferența de combustibil între manuală și automată rareori depășește 30–50 de lei.",
        ],
      },
      {
        heading: "Preț și disponibilitate în Cluj",
        paragraphs: [
          "Pe piața locală, mașinile automate sunt mai puține și se rezervă primele, mai ales vara și în perioada sărbătorilor. Firmele mari aplică de obicei un supliment pentru automat. La DCO Rent a Car tarifele pornesc de la 70 lei/zi și sunt negociabile în funcție de mașina aleasă și de durata închirierii, iar pentru perioade mai lungi de 7 zile prețul pe zi scade.",
          "Recomandarea practică: dacă ai nevoie de automată, anunță din prima discuție telefonică. Disponibilitatea o confirmăm rapid, dar o singură mașină automată nu poate fi în două locuri deodată.",
        ],
        bullets: [
          "Automatele se rezervă cel mai repede în iulie–august și în decembrie",
          "Rezervă cu 3–7 zile înainte dacă ai nevoie de cutie automată",
          "Pentru închirieri lunare, tariful pe zi scade indiferent de tipul cutiei",
        ],
      },
      {
        heading: "Ce alegi în funcție de scenariu",
        paragraphs: [
          "Cel mai simplu mod de a decide este să pornești de la traseul dominant, nu de la preferință. Dacă 80% din kilometri sunt în oraș, ia automată. Dacă 80% sunt pe drum deschis și ești obișnuit cu manuala, nu plăti în plus.",
        ],
        bullets: [
          "Deplasări de business în Cluj-Napoca, multe opriri: automată",
          "Vizitator străin obișnuit cu automata: automată, fără compromis",
          "Excursie în Apuseni, buget strâns: manuală economică",
          "Familie cu bagaje, drum lung: break manual sau berlină automată",
          "Înlocuitor cât timp mașina personală e în service: alege același tip cu al tău",
        ],
      },
      {
        heading: "Verificări specifice la preluare",
        paragraphs: [
          "Indiferent ce alegi, fă un test scurt înainte de plecare. La o manuală, verifică dacă ambreiajul prinde la mijlocul cursei și dacă treapta de marșarier intră ușor. La o automată, verifică dacă trecerile între trepte sunt line la accelerație moderată și dacă mașina nu tresare la trecerea din P în D.",
          "Predarea se face personal, așa că poți pune întrebări direct proprietarului și poți face un tur scurt înainte de a pleca la drum.",
        ],
      },
    ],
    faq: [
      {
        q: "Se poate închiria o mașină automată în Cluj de pe o zi pe alta?",
        a: "Da, în extrasezon de multe ori există disponibilitate imediată. Vara și în perioada sărbătorilor recomandăm o rezervare cu 3–7 zile înainte, pentru că automatele se ocupă primele.",
      },
      {
        q: "Costă mai mult o mașină automată de închiriat?",
        a: "Tarifele pornesc de la 70 lei/zi și sunt negociabile în funcție de mașina aleasă și de durata închirierii. Pentru perioade de peste 7 zile prețul pe zi scade.",
      },
      {
        q: "Ce permis îmi trebuie pentru o mașină automată?",
        a: "Un permis categoria B valabil de minimum un an. Dacă permisul tău este obținut doar pe cutie automată, poți conduce exclusiv mașini automate.",
      },
    ],
  },
  {
    slug: "checklist-preluare-masina-inchiriata",
    title: "Checklist complet la preluarea unei mașini închiriate",
    metaTitle: "Checklist preluare mașină închiriată | DCO Cluj",
    description:
      "Ce verifici pas cu pas când preiei o mașină de închiriat: caroserie, anvelope, lichide, documente, combustibil și fotografii care te protejează.",
    date: "2026-08-02",
    readingMinutes: 8,
    category: "Ghid",
    excerpt:
      "Zece minute de verificări la preluare îți economisesc discuții neplăcute la predare. Iată lista completă, în ordinea corectă.",
    sections: [
      {
        heading: "De ce contează primele zece minute",
        paragraphs: [
          "Majoritatea disputelor dintre chiriaș și proprietar pornesc de la lucruri care existau deja pe mașină, dar nu au fost consemnate: o zgârietură pe bara spate, o jantă frecată de bordură, o lampă cu apă în interior. Zece minute de verificare atentă, cu fotografii, elimină aproape complet acest risc.",
          "Avantajul unei predări personale, cum facem în Gilău, este că poți parcurge lista împreună cu proprietarul, pe loc, și poți clarifica orice nelămurire înainte de plecare.",
        ],
      },
      {
        heading: "1. Caroseria și geamurile",
        paragraphs: [
          "Începe din față și fă un tur complet al mașinii în sensul acelor de ceasornic. Uită-te la fiecare panou din două unghiuri: din față și dintr-o parte, pentru că majoritatea loviturilor se văd doar în lumină oblică.",
        ],
        bullets: [
          "Bare de protecție față și spate, inclusiv colțurile de jos",
          "Praguri și jante — cele mai frecvente urme de bordură",
          "Parbriz: caută lovituri de piatră, chiar și mici, pentru că se pot fisura",
          "Oglinzi, faruri și stopuri: fisuri sau condens în interior",
          "Fotografiază fiecare defect găsit, cu telefonul, la lumină bună",
        ],
      },
      {
        heading: "2. Anvelope și presiune",
        paragraphs: [
          "Anvelopele sunt singurul contact cu drumul și, în același timp, elementul cel mai ușor de ignorat. Verifică adâncimea profilului — indicatorii de uzură din canale îți spun imediat dacă mai are rezervă — și uită-te la flancuri, unde umflăturile sunt semn de lovitură anterioară.",
          "Presiunea corectă e trecută de obicei pe eticheta din tocul ușii șoferului. O presiune mai mică cu 0,5 bar crește consumul și distanța de frânare, iar pe drumurile din Apuseni contează.",
        ],
        bullets: [
          "Profil vizibil peste indicatorii de uzură, pe toate cele patru anvelope",
          "Anvelope potrivite sezonului — iarna sunt obligatorii pe drumuri cu zăpadă",
          "Roata de rezervă sau kitul de pană prezent în portbagaj",
          "Cric și cheie de roți la locul lor",
        ],
      },
      {
        heading: "3. Interior, lichide și funcții",
        paragraphs: [
          "Pornește motorul și lasă-l câteva secunde la ralanti. Toate martorii de pe bord trebuie să se stingă: check engine, ABS, airbag, presiune ulei. Un martor rămas aprins e o discuție de purtat înainte de plecare, nu după.",
        ],
        bullets: [
          "Aer condiționat: pornește-l și verifică dacă suflă rece în 1–2 minute",
          "Ștergătoare și lichid de parbriz — esențiale pe drumurile de țară",
          "Faruri, faza lungă, semnalizatoare, stopuri de frână",
          "Nivel de combustibil notat exact, ca să știi cu cât îl predai",
          "Curățenie interioară — fotografiaz-o, ca reper la predare",
        ],
      },
      {
        heading: "4. Documentele mașinii",
        paragraphs: [
          "Mașina trebuie să aibă la bord actele valabile. Verifică-le înainte de a pleca, mai ales dacă intenționezi să circuli pe drumuri naționale sau autostradă. Toate mașinile din flota noastră au ITP, RCA, rovinietă și aer condiționat incluse în tarif.",
        ],
        bullets: [
          "Certificat de înmatriculare (talon) în original sau copie conformă",
          "Asigurare RCA valabilă",
          "ITP valabil",
          "Rovinietă activă pentru drumurile naționale",
          "Triunghiuri reflectorizante, trusă medicală, stingător, vestă",
        ],
      },
      {
        heading: "5. Ce stabilești verbal, dar clar",
        paragraphs: [
          "Înainte de plecare, pune trei întrebări simple și notează răspunsurile: cum se returnează combustibilul, ce se întâmplă dacă întârzii câteva ore și pe cine suni dacă apare o problemă pe drum. Fiind o firmă locală, cu bază în Gilău, ajungem repede dacă e nevoie de ajutor în zona Cluj.",
        ],
      },
      {
        heading: "6. Aceleași verificări la predare",
        paragraphs: [
          "Repetă turul mașinii la returnare și fă un al doilea set de fotografii, în același loc și în aceleași unghiuri. Dacă ai și primul set, orice discuție se închide în treizeci de secunde. E cea mai ieftină asigurare pe care ți-o poți face.",
        ],
      },
    ],
    faq: [
      {
        q: "Ce fac dacă găsesc o zgârietură la preluare?",
        a: "Arat-o proprietarului pe loc și fotografiaz-o. La o predare personală lucrul acesta se rezolvă în câteva secunde și e consemnat înainte de plecare.",
      },
      {
        q: "Cum returnez combustibilul?",
        a: "Regula uzuală este plin la plin: preiei mașina cu un anumit nivel și o predai cu același nivel. Notează indicația de la bord la preluare.",
      },
      {
        q: "Ce fac dacă am o pană pe drum?",
        a: "Sună imediat la (0742) 925 934. Baza fiind în Gilău, la 12 km de Cluj-Napoca, ajungem rapid în zona Cluj.",
      },
    ],
  },
  {
    slug: "inchiriere-pe-termen-lung-vs-masina-proprie-cluj",
    title: "Închiriere pe termen lung vs. mașină proprie în Cluj: calculul real",
    metaTitle: "Închiriere lunară sau mașină proprie în Cluj? | DCO",
    description:
      "Comparație de costuri între închirierea lunară a unei mașini în Cluj și deținerea uneia proprii: asigurări, ITP, service, depreciere și flexibilitate.",
    date: "2026-08-03",
    readingMinutes: 9,
    category: "Comparație",
    excerpt:
      "Cât te costă, cu adevărat, o mașină proprie pe lună în Cluj — și când închirierea pe termen lung iese mai ieftină.",
    sections: [
      {
        heading: "Costul ascuns al mașinii proprii",
        paragraphs: [
          "Când oamenii compară cele două variante, pun de obicei față în față tariful de închiriere și rata la mașină. Comparația e greșită, pentru că o mașină proprie are un șir întreg de costuri care nu apar în rată: RCA, casco opțional, ITP, rovinietă, revizii, anvelope de vară și de iarnă, plus deprecierea, care e cel mai mare cost și cel mai puțin vizibil.",
          "Pentru un autoturism obișnuit din segmentul mediu, costurile fixe anuale — asigurări, ITP, revizie, două seturi de anvelope amortizate — se adună la câteva mii de lei, înainte de a pune un litru de combustibil în rezervor. Peste ele se adaugă reparațiile neprevăzute, care în cazul mașinilor mai vechi de zece ani devin regulă, nu excepție.",
        ],
        bullets: [
          "RCA și eventual casco",
          "ITP și rovinietă",
          "Revizii periodice și consumabile",
          "Două seturi de anvelope, plus depozitare",
          "Depreciere — cel mai mare cost anual al unei mașini",
          "Reparații neprevăzute și imobilizări în service",
        ],
      },
      {
        heading: "Ce include, în schimb, o închiriere lunară",
        paragraphs: [
          "La o închiriere pe termen lung plătești o singură sumă previzibilă. Mașina vine cu ITP, RCA, rovinietă și aer condiționat incluse, iar dacă apare o defecțiune, problema nu e a ta. Dispare complet și riscul de depreciere: predai mașina și ai încheiat.",
          "Pentru perioade de peste 7 zile tariful zilnic scade, iar pentru închirieri lunare avem tarif special. Pentru firme putem emite factură, ceea ce transformă costul într-o cheltuială deductibilă, cu evidență clară.",
        ],
      },
      {
        heading: "Cine câștigă din închiriere pe termen lung",
        paragraphs: [
          "Nu există un răspuns universal, dar există profiluri clare pentru care închirierea lunară este decizia rațională, nu doar comodă.",
        ],
        bullets: [
          "Persoane mutate temporar în Cluj pentru un proiect de câteva luni",
          "Firme care au nevoie de o mașină suplimentară în sezon, fără să o cumpere",
          "Familii care au mașina în service sau în daună pentru o perioadă lungă",
          "Freelanceri care rulează mult câteva luni pe an și aproape deloc în rest",
          "Cei care vor un al doilea autoturism fără a-și dubla costurile fixe",
        ],
      },
      {
        heading: "Când mașina proprie rămâne alegerea corectă",
        paragraphs: [
          "Dacă faci peste 25.000–30.000 km pe an, conduci zilnic și ai deja o mașină achitată și fiabilă, deținerea rămâne varianta mai ieftină pe termen lung. La fel, dacă ai nevoie de o configurație foarte specifică — cârlig de remorcare, scaune speciale, dotări de lucru — o mașină proprie e mai potrivită.",
          "Punctul de echilibru se mută însă rapid în favoarea închirierii când folosirea e sezonieră sau temporară, pentru că plătești doar perioada în care chiar folosești mașina.",
        ],
      },
      {
        heading: "Cum arată practic o închiriere lunară la DCO",
        paragraphs: [
          "Stabilim telefonic perioada și mașina potrivită, confirmăm disponibilitatea și facem predarea personal în Gilău sau într-un punct convenabil din Cluj-Napoca ori Florești. Flota include Škoda Fabia și Renault Clio Symbol pentru consum mic, Ford Focus break și VW Passat break pentru bagaje, Volvo S40, Citroën C5 automat și Volvo XC90 cu 7 locuri.",
          "Pentru închirieri lungi recomandăm o discuție scurtă despre kilometrajul estimat, ca să găsim varianta cea mai avantajoasă pentru tine.",
        ],
      },
    ],
    faq: [
      {
        q: "Care e durata minimă pentru un tarif de închiriere lunară?",
        a: "Pentru perioade de peste 7 zile tariful zilnic scade, iar pentru închirieri de o lună sau mai mult avem tarif special. Sună la (0742) 925 934 pentru o ofertă concretă.",
      },
      {
        q: "Se poate factura pe firmă?",
        a: "Da, emitem factură pe firmă la cerere, ceea ce face costul ușor de justificat contabil.",
      },
      {
        q: "Cine plătește reviziile și asigurarea la o închiriere lungă?",
        a: "Mașinile vin cu ITP, RCA, rovinietă și aer condiționat incluse, iar întreținerea periodică este în sarcina noastră.",
      },
    ],
  },
  {
    slug: "condus-in-romania-ghid-pentru-turisti",
    title: "Condus în România: ghid practic pentru vizitatorii care închiriază în Cluj",
    metaTitle: "Condus în România: ghid pentru turiști | DCO Cluj",
    description:
      "Reguli de circulație, limite de viteză, rovinietă, parcare în Cluj-Napoca și sfaturi pentru drumurile de munte, pentru cei care închiriază o mașină.",
    date: "2026-08-04",
    readingMinutes: 8,
    category: "Ghid",
    excerpt:
      "Ce trebuie să știi înainte de a conduce în România: limite, rovinietă, parcare în Cluj și particularitățile drumurilor din Apuseni.",
    sections: [
      {
        heading: "Documente și cerințe de bază",
        paragraphs: [
          "Pentru a închiria și a conduce o mașină în România ai nevoie de permis de conducere valabil de minimum un an și de un act de identitate — carte de identitate sau pașaport. Permisele emise în Uniunea Europeană sunt recunoscute direct; pentru cele din afara UE, un permis internațional te scutește de discuții la un eventual control.",
          "La DCO Rent a Car închirierea se face fără garanție și fără card de credit, ceea ce simplifică mult lucrurile pentru vizitatorii care nu vor un blocaj de sumă pe card.",
        ],
      },
      {
        heading: "Limite de viteză și reguli esențiale",
        paragraphs: [
          "Limitele standard sunt 50 km/h în localitate, 90 km/h în afara localității pe drum național, 100 km/h pe drum expres și 130 km/h pe autostradă. Semnalizarea locală are întotdeauna prioritate față de regula generală, iar în zona Cluj există multe tronsoane cu limite reduse temporar din cauza lucrărilor.",
        ],
        bullets: [
          "Luminile de întâlnire sunt obligatorii ziua în afara localităților",
          "Centura de siguranță este obligatorie pe toate locurile",
          "Alcoolemia admisă la volan este zero",
          "Telefonul se folosește doar hands-free",
          "Copiii sub 12 ani și 150 cm au nevoie de scaun sau înălțător",
        ],
      },
      {
        heading: "Rovinieta și taxele de drum",
        paragraphs: [
          "Rovinieta este taxa de utilizare a drumurilor naționale și a autostrăzilor și este obligatorie. Toate mașinile din flota noastră au rovinieta inclusă, deci nu trebuie să cumperi nimic suplimentar pentru drumurile din jurul Clujului.",
          "Atenție la podurile cu taxă separată, cum este cel de la Fetești pe drumul spre litoral — acolo taxa se plătește distinct, nu e acoperită de rovinietă.",
        ],
      },
      {
        heading: "Parcarea în Cluj-Napoca",
        paragraphs: [
          "Zona centrală a Clujului este cu plată în timpul zilei, iar locurile libere pe stradă sunt rare între 9:00 și 18:00. Cea mai simplă soluție este să folosești parcările supraetajate sau parcările din apropierea marilor centre comerciale și să te deplasezi pe jos în centrul istoric, care e compact.",
          "Cartierele în pantă — Grigorescu, Zorilor, Andrei Mureșanu — au străzi înguste cu parcare pe ambele părți. O mașină mică, de tipul Škoda Fabia sau Renault Clio Symbol, îți simplifică viața considerabil.",
        ],
      },
      {
        heading: "Drumurile de munte din Apuseni",
        paragraphs: [
          "Traseele spre Tarnița, Beliș, Padiș sau Cheile Turzii sunt spectaculoase, dar cer atenție. Carosabilul e îngust, cu serpentine și, pe unele porțiuni, cu gropi după iarnă. Iarna, unele drumuri secundare pot fi acoperite cu zăpadă bătătorită, iar anvelopele de iarnă devin obligatorii.",
          "Regula practică: pleacă dimineața, calculează dublu timpul indicat de aplicațiile de navigație pentru drumurile secundare și alimentează în oraș, pentru că benzinăriile din zona montană sunt rare.",
        ],
        bullets: [
          "Alimentează plin înainte de a intra în munți",
          "Folosește frâna de motor la coborâri lungi",
          "Semnalul telefonic lipsește pe porțiuni întinse — descarcă harta offline",
          "Iarna, verifică prognoza înainte de a urca spre Padiș sau Beliș",
        ],
      },
      {
        heading: "În caz de accident sau pană",
        paragraphs: [
          "Numărul unic de urgență este 112. Pentru evenimente ușoare, fără victime, se poate folosi constatarea amiabilă. În orice situație, primul apel după 112 ar trebui să fie către noi, la (0742) 925 934 — fiind o firmă locală din Gilău, putem ajunge rapid în zona Cluj și te ajutăm cu pașii următori.",
        ],
      },
    ],
    faq: [
      {
        q: "Pot conduce în România cu permis din afara UE?",
        a: "Da, cu permis valabil de minimum un an; pentru permisele din afara UE recomandăm și un permis internațional de conducere.",
      },
      {
        q: "Trebuie să cumpăr rovinietă separat?",
        a: "Nu. Toate mașinile noastre au rovinieta inclusă în tarif.",
      },
      {
        q: "Am nevoie de card de credit pentru închiriere?",
        a: "Nu. Închirierea se face fără garanție și fără card de credit — ai nevoie doar de permis valabil de minimum un an și de un act de identitate.",
      },
    ],
  },
  {
    slug: "masina-la-schimb-cat-timp-a-ta-e-in-service-cluj",
    title: "Mașină la schimb cât timp a ta e în service sau în daună, în Cluj",
    metaTitle: "Mașină la schimb cât e a ta în service | Cluj",
    description:
      "Cum obții rapid o mașină de închiriat în Cluj cât timp a ta e în service sau în daună: ce acte îți trebuie, cât durează și cum ții costul mic.",
    date: "2026-08-05",
    readingMinutes: 7,
    category: "Ghid",
    excerpt:
      "Mașina ta e imobilizată în service. Iată cum rezolvi mobilitatea în aceeași zi, în Cluj și Gilău, fără garanție și fără card de credit.",
    sections: [
      {
        heading: "Situația tipică: reparația durează mai mult decât ți s-a spus",
        paragraphs: [
          "Cea mai frecventă cerere pe care o primim nu vine de la turiști, ci de la localnici din Cluj-Napoca, Florești și Gilău care au rămas fără mașină pentru câteva zile. Fie e o reparație care așteaptă o piesă comandată, fie o daună în care constatarea și aprobarea se lungesc peste estimarea inițială.",
          "Problema reală nu e reparația, ci golul de mobilitate: serviciul, școala copiilor, drumurile la aprovizionare. Un autoturism de schimb pentru o săptămână rezolvă tot, la un cost previzibil.",
        ],
      },
      {
        heading: "Cât de repede poți avea o mașină",
        paragraphs: [
          "În extrasezon, de multe ori se poate în aceeași zi. Confirmăm telefonic ce mașină este liberă, stabilim ora și locul predării și îți predăm autoturismul personal. Nu există birou de terminal și nu pierzi timp cu formalități lungi.",
          "În perioadele aglomerate — vară, sărbători — disponibilitatea e mai strânsă, mai ales la mașinile automate, așa că un telefon dat devreme contează.",
        ],
        bullets: [
          "Un singur apel la (0742) 925 934 pentru confirmarea disponibilității",
          "Acte necesare: permis valabil de minimum un an și buletin sau pașaport",
          "Fără garanție și fără card de credit",
          "Predare personală în Gilău sau într-un punct stabilit în Cluj-Napoca ori Florești",
        ],
      },
      {
        heading: "Cum ții costul cât mai mic",
        paragraphs: [
          "Primul sfat este să estimezi realist durata. Dacă service-ul spune „trei zile”, pregătește-te pentru cinci. O închiriere pe o perioadă mai lungă, stabilită de la început, e mai ieftină pe zi decât prelungirile succesive din zi în zi.",
          "Al doilea sfat: alege clasa potrivită nevoii reale, nu obiceiului. Dacă în perioada respectivă faci doar drumuri urbane, o mașină economică de tip Škoda Fabia sau Renault Clio Symbol acoperă totul la consumul cel mai mic. Tarifele pornesc de la 70 lei/zi și sunt negociabile în funcție de mașina aleasă și de durata închirierii.",
        ],
        bullets: [
          "Stabilește durata estimată de la început, nu din zi în zi",
          "Pentru peste 7 zile, tariful zilnic scade",
          "Alege clasa economică dacă rulezi doar prin oraș",
          "Cere factură dacă mașina e folosită în interes de serviciu",
        ],
      },
      {
        heading: "Dacă mașina ta e în daună",
        paragraphs: [
          "În cazul unei daune, în multe situații costul mașinii de schimb poate fi recuperat în cadrul dosarului, dacă vinovăția aparține celuilalt participant la trafic. Păstrează factura și documentele închirierii și discută cu firma de asigurări înainte, ca să știi exact ce se decontează.",
          "Emitem factură la cerere, tocmai pentru ca aceste situații să fie ușor de documentat.",
        ],
      },
      {
        heading: "De ce contează o firmă locală",
        paragraphs: [
          "Baza noastră e în Gilău, la 12 km de Cluj-Napoca. Practic, asta înseamnă că ora de predare o stabilim împreună, inclusiv în afara programului obișnuit, iar dacă apare o problemă pe drum ajungem repede. Pentru cineva care are deja o mașină imobilizată în service, ultimul lucru de care are nevoie este o a doua bătaie de cap.",
        ],
      },
    ],
    faq: [
      {
        q: "Pot închiria o mașină chiar azi în Cluj?",
        a: "De multe ori da, în funcție de disponibilitate. Sună la (0742) 925 934 și confirmăm rapid ce mașină este liberă.",
      },
      {
        q: "Îmi trebuie garanție sau card de credit?",
        a: "Nu. Ai nevoie doar de permis de conducere valabil de minimum un an și de carte de identitate sau pașaport.",
      },
      {
        q: "Pot prelungi închirierea dacă service-ul întârzie?",
        a: "Da, prelungirea se face printr-un simplu telefon, în limita disponibilității mașinii respective.",
      },
    ],
  },
  {
    slug: "parcare-in-cluj-napoca-ghid-pentru-soferi",
    title: "Parcare în Cluj-Napoca: ghid practic pentru șoferii cu mașină închiriată",
    metaTitle: "Parcare în Cluj-Napoca: ghid pentru șoferi | DCO",
    description:
      "Cum parchezi în Cluj-Napoca cu o mașină închiriată: zone cu plată, parcări cu etaj, ce mașină alegi pentru centru și cum eviți amenzile.",
    date: "2026-10-08",
    readingMinutes: 5,
    category: "Ghid",
    excerpt:
      "Sfaturi simple ca să parchezi fără stres în Cluj-Napoca: cum plătești, unde cauți loc și de ce o mașină mică te ajută în centru.",
    sections: [
      {
        heading: "Parcarea în centru se plătește",
        paragraphs: [
          "În majoritatea zonelor centrale din Cluj-Napoca parcarea pe stradă se plătește. Plata se face de obicei prin SMS, aplicație sau la automat. Tarifele și orele de plată diferă de la o zonă la alta, așa că citește mereu indicatorul de pe stradă înainte să pleci de lângă mașină.",
          "Dacă stai mai multe ore în centru, o parcare cu etaj sau subterană e adesea mai simplă decât să cauți loc pe stradă.",
        ],
        bullets: [
          "Citește indicatorul zonei înainte de a parca",
          "Păstrează confirmarea plății (SMS sau aplicație)",
          "Pentru vizite lungi, caută o parcare cu etaj",
        ],
      },
      {
        heading: "Ce mașină închiriezi dacă stai mult prin oraș",
        paragraphs: [
          "Străzile din centrul vechi și din cartierele mai aglomerate sunt înguste, iar locurile de parcare sunt mici. O mașină economică precum Škoda Fabia sau Renault Clio Symbol se parchează mult mai ușor și consumă puțin în trafic. Un break sau un SUV e mai potrivit pentru drumuri lungi și bagaje.",
        ],
      },
      {
        heading: "Cum eviți amenzile și ridicarea mașinii",
        paragraphs: [
          "Nu parca pe trecerile de pietoni, în stații, pe pistele de biciclete sau pe locurile rezervate. Mașinile parcate neregulamentar pot fi ridicate. Amenzile primite pe perioada închirierii rămân în sarcina șoferului, așa că merită să fii atent.",
        ],
      },
      {
        heading: "Alternativa: lași mașina în afara centrului",
        paragraphs: [
          "Dacă stai în Gilău sau Florești, poți intra în oraș cu mașina până la o zonă cu parcare mai ușoară și continua cu transportul public. Așa folosești mașina închiriată pentru excursiile din afara Clujului, unde e cu adevărat utilă.",
        ],
      },
    ],
    faq: [
      {
        q: "Cum plătesc parcarea în Cluj-Napoca?",
        a: "În majoritatea zonelor prin SMS, aplicație sau la automat. Metoda și tariful sunt afișate pe indicatorul zonei.",
      },
      {
        q: "Cine plătește amenda de parcare primită cu mașina închiriată?",
        a: "Amenzile primite în perioada închirierii sunt în sarcina șoferului care a închiriat mașina.",
      },
    ],
  },
  {
    slug: "ce-masina-sa-inchiriezi-in-cluj-oras-munte-familie",
    title: "Ce mașină să închiriezi în Cluj: pentru oraș, munte sau familie",
    metaTitle: "Ce mașină să închiriezi în Cluj: oraș, munte, familie",
    description:
      "Cum alegi mașina potrivită la un rent a car în Cluj: economică pentru oraș, break pentru bagaje, automată pentru confort sau 7 locuri pentru familie.",
    date: "2026-10-08",
    readingMinutes: 5,
    category: "Sfaturi",
    excerpt:
      "Mașina potrivită îți scade costul și îți face drumul mai ușor. Iată cum alegi în funcție de drum, bagaje și numărul de persoane.",
    sections: [
      {
        heading: "Pentru oraș și navetă: mașină economică",
        paragraphs: [
          "Dacă rulezi mai ales prin Cluj-Napoca, Florești sau Gilău, o mașină mică precum Škoda Fabia sau Renault Clio Symbol e alegerea cea mai ieftină: consum mic în trafic și parcare ușoară. Tarifele pornesc de la 70 lei/zi.",
        ],
      },
      {
        heading: "Pentru bagaje și drumuri lungi: break",
        paragraphs: [
          "Pentru vacanțe cu bagaje, mutări mici sau drumuri lungi pe A3 și DN1, un break oferă mult spațiu. În flotă avem VW Passat Break, Ford Focus Break și Renault Mégane Break.",
        ],
      },
      {
        heading: "Pentru confort: cutie automată",
        paragraphs: [
          "Dacă nu ești obișnuit cu schimbătorul manual sau stai mult în coloană, alege o mașină automată. Citroën C5 are cutie automată, iar disponibilitatea o confirmăm la telefon.",
        ],
      },
      {
        heading: "Pentru familie și grupuri: 7 locuri",
        paragraphs: [
          "Pentru 5–7 persoane sau drumuri spre Apuseni cu toată familia, Volvo XC90 cu 7 locuri e cea mai potrivită. Rezervă din timp în vacanțe și sărbători.",
        ],
        bullets: [
          "Oraș: Škoda Fabia, Renault Clio Symbol",
          "Bagaje: VW Passat, Ford Focus, Renault Mégane Break",
          "Automată: Citroën C5",
          "7 locuri: Volvo XC90",
        ],
      },
    ],
    faq: [
      {
        q: "Care e cea mai ieftină mașină de închiriat în Cluj?",
        a: "Clasa economică (Škoda Fabia, Renault Clio Symbol), de la 70 lei/zi.",
      },
      {
        q: "Aveți mașină de 7 locuri în Cluj?",
        a: "Da, Volvo XC90. Sună la (0742) 925 934 pentru disponibilitate.",
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
