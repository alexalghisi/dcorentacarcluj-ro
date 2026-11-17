/**
 * html lang for landing pages not written in Romanian. Kept tiny so the root
 * layout does not bundle all page copy; locations.test.ts checks it matches
 * the lang field in src/lib/locations*.ts.
 */
export const LOCATION_LANGS: ReadonlyMap<string, string> = new Map([
  ["/car-rental-cluj", "en"],
  ["/car-rental-cluj-napoca", "en"],
  ["/cluj-airport-car-rental", "en"],
  ["/autoberles-kolozsvar", "hu"],
]);
