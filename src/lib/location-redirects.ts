/**
 * Landing pages merged in Nov 2026: several pages targeted the same search intent
 * with synonyms ("închirieri mașini", "închiriere mașină", "mașini de închiriat"…),
 * which splits ranking signals and looks like doorway pages. Each old address
 * 301-redirects to the one page that now covers that intent.
 */
export const LOCATION_REDIRECTS: Readonly<Record<string, string>> = {
  "rent-a-car-cluj": "/",
  "inchirieri-masini-cluj": "/inchirieri-auto-cluj",
  "inchirieri-masini": "/inchirieri-auto-cluj",
  "inchiriere-masina-cluj": "/inchirieri-auto-cluj",
  "inchiriere-masina": "/inchirieri-auto-cluj",
  "masini-de-inchiriat": "/masini-de-inchiriat-cluj",
  "flota-masini-inchiriere-cluj": "/masini-de-inchiriat-cluj",
  "inchiriere-masina-cluj-aeroport": "/rent-a-car-aeroport-cluj",
  "car-rental-cluj-napoca": "/car-rental-cluj",
  "rent-a-car-apahida-baciu": "/rent-a-car-apahida",
  "inchiriere-masina-economica-cluj": "/rent-a-car-cluj-ieftin",
  "inchirieri-auto-lunare-cluj": "/inchiriere-masina-termen-lung-cluj",
};
