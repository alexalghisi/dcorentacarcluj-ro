# Pagini locale noi + monitorizare SEO zilnică

## Ce am găsit (analiză)
- Toate paginile locale (inclusiv /rent-a-car-turda) folosesc același șablon: o intrare de date + o singură pagină comună care afișează titlul, textul, flota, prețurile, harta cu zone, FAQ și butoanele Sună / WhatsApp.
- Paginile sunt generate pe server: Google primește textul complet direct în pagină, nu încărcat ulterior. Paginile noi vor funcționa la fel automat.
- Fiecare pagină are deja title, descriere, canonical propriu, Open Graph, FAQPage, BreadcrumbList și AutoRental cu adresa din Gilău.
- Harta site-ului pentru Google se actualizează singură. Fișierul care spune motoarelor de căutare ce pot vizita permite deja totul. Nu e nevoie de modificări.
- /rent-a-car-apahida-baciu rămâne neschimbată. Apahida și Baciu primesc pagini separate noi, iar pagina comună trimite spre ele.

## Pagini propuse (10)

| URL | Distanța aproximativă față de Gilău / ruta | Pe ce se concentrează |
|---|---|---|
| /rent-a-car-dej | ~75 km, ~1h10, DN1C prin Cluj | navetă, Salina Dej, drum spre Bistrița/Maramureș |
| /rent-a-car-gherla | ~60 km, ~55 min, DN1C | navetă spre Cluj, zona industrială, cetatea armenească |
| /rent-a-car-campia-turzii | ~60 km, ~50 min, A3 / DN1-E60 | zona industrială, Cheile Turzii, Salina Turda |
| /rent-a-car-huedin | ~32 km, ~30 min, DN1-E60 spre vest | Apuseni, Bologa, Izvorul Crișului, Oradea |
| /rent-a-car-apahida | ~35 km, ~40 min, centura Cluj / DN1C | aeroport (foarte aproape), zona industrială Jucu |
| /rent-a-car-baciu | ~12 km, ~15 min, DN1 | navetă, Coruș, cartierele noi, Polus/Vivo |
| /rent-a-car-feleacu | ~28 km, ~30 min, DN1-E60 | Pădurea Făget, deal, navetă |
| /rent-a-car-aghiresu | ~22 km, ~25 min, DN1 | zona industrială Aghireșu, navetă |
| /rent-a-car-jucu | ~40 km, ~40 min, centura / DN1C | parcul industrial Tetarom III (Jucu), schimburi în ture |
| /rent-a-car-sanpaul | ~20 km, ~20 min, DN1 / A3 (Gilău) | navetă, ieșirea spre A3, drum spre Huedin |

Distanțele le verific înainte să scriu textul. Pe fiecare pagină apar ca valori aproximative.

## Structura fiecărei pagini (la fel ca la Turda)
- Title de până la ~60 de caractere, descriere de până la ~155 și H1 diferit pe fiecare pagină, de exemplu „Rent a Car Dej | Închirieri auto Dej de la 70 lei/zi”.
- Un text propriu de 450–600 de cuvinte, scris separat pentru fiecare localitate. Conține:
  - drumul și distanța;
  - punctele de întâlnire stabilite la telefon (fără să pretindă că există birou acolo);
  - situațiile în care oamenii de acolo au nevoie de mașină.
- Formularea apare pe toate paginile: „servim clienți din [oraș], predare personală în Gilău sau la un punct stabilit telefonic”.
- Flota, tarifele de la 70 lei/zi, condițiile și butoanele (0742) 925 934 / WhatsApp, așa cum sunt acum.
- 4–6 întrebări frecvente specifice localității.
- Datele structurate pentru Google (FAQPage, BreadcrumbList, AutoRental) au adresa din Gilău, iar zona deservită este localitatea.
- Linkuri spre localitățile vecine, de exemplu Dej ↔ Gherla, Turda ↔ Câmpia Turzii, Huedin ↔ Sânpaul ↔ Aghireșu, Apahida ↔ Jucu, Baciu ↔ Florești. Fiecare pagină are și link spre pagina principală.
- Paginile apar în „Zone deservite” și în subsolul site-ului, doar ca linkuri noi. Designul nu se schimbă.

## Pas 4 – Monitorizare zilnică
- **Cuvinte-cheie:** o listă cu „rent a car / închirieri auto / mașini de închiriat + localitate”, pentru toate localitățile care au pagină (~50 de cuvinte).
- **Verificare zilnică automată:** în fiecare zi, sistemul caută în Google.ro fiecare cuvânt și salvează:
  - poziția noastră;
  - primii 10 concurenți, cu title și descriere;
  - schimbările: concurenți noi, urcări și coborâri, pagini noi ale concurenței.
  Pentru căutările în Google e nevoie de un cont SerpApi (mai simplu) sau DataForSEO, cu cheia pusă de tine în Secrets.
- **Search Console:** se folosește conexiunea existentă. Datele per pagină (afișări, clicuri, CTR, poziție) se salvează o dată pe zi.
- **Pagina /admin/seo**, protejată cu aceeași parolă de admin:
  - graficul pozițiilor pentru fiecare cuvânt și localitate;
  - tabelul cu concurenții care ne depășesc și ce fac diferit (title, lungimea textului, dacă au FAQ, recenzii);
  - recomandări AI pentru fiecare pagină, cu butoanele Aprob / Respins.
  Nimic nu se schimbă automat pe site. După ce aprobi o recomandare, mi-o ceri în chat și o aplic.
- **E-mail:** un rezumat săptămânal și o alertă imediată când ieșim din top 3. Pentru asta trebuie configurat domeniul de e-mail al site-ului. Te ghidez eu când ajungem acolo.

## Detalii tehnice
- Paginile sunt intrări noi în `src/lib/locations.ts`, servite de `$slug.tsx`. Am nevoie de un câmp opțional `nearby` pentru linkurile spre vecini.
- Tabele noi, accesibile doar prin funcțiile de pe server:
  - `seo_keywords`
  - `serp_snapshots` (cuvânt, dată, poziția noastră, top10 jsonb)
  - `serp_changes`
  - `gsc_page_daily`
  - `seo_recommendations` (status pending/approved/rejected)
- Funcția zilnică este un endpoint `/api/public/hooks/serp-check`, apelat de pg_cron și protejat cu o cheie secretă. Proiectul nu folosește Edge Functions, ci serverul aplicației. Un alt endpoint, programat săptămânal, trimite rezumatul.
- Lungimea textului și prezența FAQ la concurenți se află citind pagina lor într-o operație ușoară, cu limită de câte pagini se citesc. Numărul de recenzii apare doar dacă SerpApi îl dă în rezultate.
- Graficul se face cu recharts.

## Recenzii la mașini (idee nouă)
- Doar clienții care au închiriat mașina respectivă pot lăsa o recenzie.
- Cum funcționează:
  1. Când marchezi în admin o rezervare ca încheiată, primești un link unic pentru recenzie.
  2. Îl trimiți clientului pe WhatsApp sau SMS.
  3. Linkul poate fi folosit o singură dată și e legat de mașina închiriată.
- Recenzia are note de la 1 la 5 stele și un comentariu.
- Recenziile apar pe site doar după ce le aprobi tu în admin.
- Pe cardul fiecărei mașini apar nota medie și recenziile aprobate. Google primește și el aceste note, ca date despre mașină.
- Tehnic: un tabel `vehicle_reviews` legat de rezervare, cu cod unic de folosire și starea pending/approved.

## Design pe telefon
- Butoanele nu se mai lipesc de text: au spațiu în jur, colțuri rotunjite și pe telefon se întind pe toată lățimea.
- Verific pe ecran de telefon toate secțiunile principale și repar ce iese strâmb.
