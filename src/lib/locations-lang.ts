import type { LocationPage } from "./locations";

/**
 * Pages for searches in other languages that the Romanian pages cannot rank for:
 * English airport searches ("cluj airport car rental", "car hire cluj airport")
 * and Hungarian searches ("autóbérlés Kolozsvár"), where the results are almost
 * only aggregators. Claims mirror the main pages: 70 lei/zi, no deposit, personal
 * handover, no terminal desk. We do not claim Hungarian is spoken.
 */
export const languageLocations: LocationPage[] = [
  {
    slug: "cluj-airport-car-rental",
    city: "Cluj Airport (English)",
    navLabel: "Cluj Airport car rental (EN)",
    linkTitle: "Cluj Airport Car Rental (English)",
    lang: "en",
    h1: "Cluj Airport Car Rental — from 70 RON/day, no deposit",
    metaTitle: "Cluj Airport Car Rental | No Deposit, from 14 €/day",
    description:
      "Car rental for Cluj Avram Iancu Airport (CLJ) from 70 RON (≈14 €) a day. No deposit, no credit card, road tax and insurance included. WhatsApp +40742925934.",
    keywords:
      "cluj airport car rental, car hire cluj airport, rent a car cluj airport, cluj napoca airport car rental, CLJ car rental, car rental cluj no deposit",
    intro:
      "Flying into Cluj-Napoca? We are a small local rental company based in Gilău, 25 km west of Avram Iancu Airport (CLJ). There is no desk in the terminal: you send us your flight time, we agree the handover point and the car is ready when you land. No terminal fees, no deposit blocked on a card.",
    highlights: [
      { label: "From", value: "70 RON / day" },
      { label: "Deposit", value: "None" },
      { label: "Airport – base", value: "25 km" },
      { label: "Credit card", value: "Not needed" },
    ],
    sections: [
      {
        heading: "How the airport handover works",
        paragraphs: [
          "Message us on WhatsApp or call +40 742 925 934 with your flight number, landing time and return date. We confirm the car and the exact price before you book. On arrival day we agree where we meet — near the airport or at our base in Gilău — and we adjust to delays, because we track the flight time you sent us.",
          "Returning works the same way: tell us your departure time and we agree the drop-off so you are not rushing to the check-in desk.",
        ],
        bullets: [
          "Handover time agreed around your landing",
          "No queue at a terminal desk",
          "Price confirmed before you book",
          "Same arrangement for the return flight",
        ],
      },
      {
        heading: "Why it costs less than the terminal desks",
        paragraphs: [
          "Rental desks inside Cluj Airport pay for terminal space, and that shows up as airport surcharges, a large security deposit on a credit card and extra fees for a second driver or out-of-hours pickup. We have none of those costs, so the daily rate starts at 70 RON (about 14 €) and there is no deposit at all.",
          "The rate includes compulsory insurance (RCA), a valid technical inspection (ITP), the Romanian road vignette (rovinietă), air conditioning and seasonal tyres.",
        ],
        bullets: [
          "No airport surcharge",
          "No deposit and no credit card required",
          "Road vignette and insurance included",
          "Lower daily rate for weekly and monthly rentals",
        ],
      },
      {
        heading: "Cars available at Cluj Airport",
        paragraphs: [
          "Economy cars (Škoda Fabia, Renault Clio Symbol) for the city, estate cars (VW Passat, Ford Focus, Renault Mégane) for luggage and ski gear, Volvo S40 sedans, an automatic Citroën C5 and a 7-seat Volvo XC90 for families and groups.",
        ],
        bullets: [
          "Automatic available: Citroën C5",
          "7 seats: Volvo XC90",
          "Estates for heavy luggage",
          "Each car has its own page with real photos",
        ],
      },
      {
        heading: "Driving from Cluj Airport",
        paragraphs: [
          "The airport is on the east side of Cluj-Napoca. The city centre is about 9 km away, but crossing the city at rush hour (around 7:30–9:30 and 16:00–19:00) can take 40 minutes or more. From the airport you are close to the A3 motorway towards Turda and the Turda Salt Mine; Gilău, Lake Tarnița and the Apuseni Mountains are west of the city on the DN1.",
          "Parking in central Cluj is paid in most zones, usually by SMS or app — check the signs. Headlights must be on outside towns, and a Romanian road vignette is required on national roads (it is already included with our cars).",
        ],
      },
      {
        heading: "What you need",
        paragraphs: [
          "A passport or national ID card and a driving licence held for at least one year. Drivers from outside the EU should also carry an International Driving Permit if their licence is not in Latin script. Ask before booking if you plan to leave Romania — cross-border trips are agreed separately for each rental.",
        ],
      },
    ],
    faq: [
      {
        q: "Do you have a desk at Cluj Airport?",
        a: "No. We are a local company based in Gilău, 25 km from the airport. The handover is personal, at a place and time agreed with you around your landing. Not paying for terminal space is what keeps the price low.",
      },
      {
        q: "How much is car rental at Cluj Airport?",
        a: "From 70 RON (about 14 €) per day for an economy car. Weekly and monthly rentals get a lower daily rate. We confirm the exact price before you book.",
      },
      {
        q: "Do I need a credit card or a deposit?",
        a: "No. We do not block a deposit and you do not need a credit card — only a passport or ID card and a driving licence held for at least one year.",
      },
      {
        q: "What if my flight is delayed?",
        a: "Send us your flight number when you book. We follow the landing time and adjust the handover, with no extra charge.",
      },
      {
        q: "Can I rent an automatic or a 7-seater?",
        a: "Yes: the Citroën C5 is automatic and the Volvo XC90 has 7 seats. Availability is limited, so book early, especially in summer.",
      },
      {
        q: "Do you speak English?",
        a: "Yes, by phone and on WhatsApp at +40 742 925 934.",
      },
    ],
    nearby: ["car-rental-cluj", "rent-a-car-aeroport-cluj", "autoberles-kolozsvar"],
  },
  {
    slug: "autoberles-kolozsvar",
    city: "Kolozsvár (magyar)",
    navLabel: "Autóbérlés Kolozsvár (HU)",
    linkTitle: "Autóbérlés Kolozsvár (magyarul)",
    lang: "hu",
    h1: "Autóbérlés Kolozsváron — napi 70 lejtől, kaució nélkül",
    metaTitle: "Autóbérlés Kolozsvár | Kaució nélkül, napi 70 lejtől",
    description:
      "Autóbérlés Kolozsváron, Gyalun és Szászfenesen napi 70 lejtől. Nincs kaució, nem kell hitelkártya, autópálya-matrica és biztosítás az árban. +40742925934.",
    keywords:
      "autóbérlés kolozsvár, autókölcsönző kolozsvár, autóbérlés kolozsvár repülőtér, rent a car kolozsvár, autóbérlés gyalu, olcsó autóbérlés kolozsvár",
    intro:
      "Helyi autókölcsönző vagyunk Gyalun (Gilău), Kolozsvártól nyugatra. Az autót személyesen adjuk át, az időpontot telefonon vagy WhatsAppon egyeztetjük. Nincs kaució, nincs foglalási díj, és nem kell hitelkártya.",
    highlights: [
      { label: "Ár", value: "napi 70 lejtől" },
      { label: "Kaució", value: "Nincs" },
      { label: "Átadás", value: "Személyesen" },
      { label: "Repülőtér – Gyalu", value: "25 km" },
    ],
    sections: [
      {
        heading: "Mit tartalmaz az ár",
        paragraphs: [
          "A napidíj 70 lejtől (kb. 14 eurótól) indul, a pontos árat foglalás előtt megerősítjük. Az árban benne van a kötelező biztosítás (RCA), az érvényes műszaki vizsga (ITP), a román úthasználati matrica (rovinietă), a légkondicionáló és az évszaknak megfelelő gumi. Nincs repülőtéri felár, nincs díj a második sofőrért.",
          "Hosszabb bérlésnél — egy hét, egy hónap — a napidíj alacsonyabb, az autótól és az időtartamtól függően.",
        ],
        bullets: [
          "Napi 70 lejtől, hosszabb bérlésre kedvezmény",
          "Nincs kaució, nem kell hitelkártya",
          "Matrica, biztosítás és klíma az árban",
          "Személyes átadás Gyalun, Szászfenesen vagy Kolozsváron",
        ],
      },
      {
        heading: "Átvétel a kolozsvári repülőtéren",
        paragraphs: [
          "A kolozsvári Avram Iancu repülőtéren (CLJ) nincs pultunk. Küldje el a járatszámot és az érkezés idejét, mi pedig egyeztetjük az átadás helyét — a repülőtér közelében vagy gyalui telephelyünkön. Késés esetén igazodunk az érkezéshez.",
        ],
      },
      {
        heading: "Autóink",
        paragraphs: [
          "Városba gazdaságos autók (Škoda Fabia, Renault Clio Symbol), csomagokhoz kombik (VW Passat, Ford Focus, Renault Mégane), Volvo S40 szedánok, automata váltós Citroën C5 és 7 személyes Volvo XC90 családoknak, csoportoknak.",
        ],
        bullets: [
          "Automata váltó: Citroën C5",
          "7 ülés: Volvo XC90",
          "Kombik sok csomaghoz",
          "Minden autónak saját oldala van valódi fotókkal",
        ],
      },
      {
        heading: "Hová érdemes autóval menni Kolozsvárról",
        paragraphs: [
          "Gyaluban áll a Wass–Bánffy-kastély, innen pár perc a Tarnica-tó és a Gyalui-havasok. Nyugatra, a DN1-en át érhető el Bánffyhunyad és a Kalotaszeg, majd Nagyvárad felé a határ. Délre az A3-as autópályán gyorsan eljut Tordára, a Tordai sóbányához és a Tordai-hasadékhoz.",
        ],
      },
      {
        heading: "Hogyan foglaljon",
        paragraphs: [
          "Hívjon vagy írjon WhatsAppon a +40 742 925 934 számra a kívánt időszakkal és az autó típusával. Románul vagy angolul válaszolunk. Átvételkor személyi igazolvány vagy útlevél, valamint legalább egy éve érvényes jogosítvány kell.",
        ],
      },
    ],
    faq: [
      {
        q: "Mennyibe kerül az autóbérlés Kolozsváron?",
        a: "Gazdaságos autó napi 70 lejtől (kb. 14 eurótól). Heti vagy havi bérlésnél a napidíj alacsonyabb. A pontos árat foglalás előtt megerősítjük.",
      },
      {
        q: "Kell kaució vagy hitelkártya?",
        a: "Nem. Nem zárolunk kauciót, és nem kell hitelkártya. Csak személyi igazolvány vagy útlevél és legalább egy éve érvényes jogosítvány.",
      },
      {
        q: "Átvehetem az autót a repülőtéren?",
        a: "A terminálban nincs pultunk. Az átadás helyét és idejét az érkezésához igazítva egyeztetjük: a repülőtér közelében vagy Gyalun, 25 km-re.",
      },
      {
        q: "Milyen nyelven lehet foglalni?",
        a: "Románul vagy angolul, telefonon és WhatsAppon a +40 742 925 934 számon.",
      },
      {
        q: "Kimehetek az autóval az országból, például Magyarországra?",
        a: "Foglalás előtt kérdezze meg a +40 742 925 934 számon. A külföldi utat minden bérlésnél külön egyeztetjük.",
      },
    ],
    nearby: ["rent-a-car-gilau", "rent-a-car-floresti-cluj", "cluj-airport-car-rental"],
  },
];
