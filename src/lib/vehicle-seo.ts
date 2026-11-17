import type { Vehicle } from "./vehicles";
import { canonical } from "./seo";

export const VEHICLE_LOCAL_AREAS = [
  { city: "Cluj", slug: "inchirieri-auto-cluj" },
  { city: "Cluj-Napoca", slug: "rent-a-car-cluj-napoca" },
  { city: "Florești", slug: "rent-a-car-floresti-cluj" },
  { city: "Gilău", slug: "rent-a-car-gilau" },
  { city: "Huedin", slug: "rent-a-car-huedin" },
  { city: "Turda", slug: "rent-a-car-turda" },
  { city: "Dej", slug: "rent-a-car-dej" },
  { city: "Gherla", slug: "rent-a-car-gherla" },
  { city: "Câmpia Turzii", slug: "rent-a-car-campia-turzii" },
  { city: "Apahida", slug: "rent-a-car-apahida" },
  { city: "Baciu", slug: "rent-a-car-baciu" },
  { city: "Feleacu", slug: "rent-a-car-feleacu" },
  { city: "Aghireșu", slug: "rent-a-car-aghiresu" },
  { city: "Jucu", slug: "rent-a-car-jucu" },
  { city: "Sânpaul", slug: "rent-a-car-sanpaul" },
] as const;

export function vehicleSlug(vehicle: Pick<Vehicle, "id" | "name">): string {
  const name = vehicle.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `${name || "masina"}-${vehicle.id}`;
}

export function vehicleSeo(vehicle: Vehicle) {
  const title = `${vehicle.name} de închiriat în Cluj | DCO Rent a Car`;
  const description = `Închiriază ${vehicle.name} pentru Cluj-Napoca, Florești, Gilău și Huedin. Preluare stabilită telefonic, tarif și disponibilitate confirmate pentru perioada ta.`;
  const path = `/masini/${vehicleSlug(vehicle)}`;
  const url = canonical(path);
  return {
    title, description, path, url,
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${url}#rental`,
      name: `Închiriere ${vehicle.name} în Cluj`,
      description,
      url,
      serviceType: "Închiriere auto",
      provider: { "@type": "AutoRental", "@id": `${canonical("/")}#organization`, name: "DCO Rent a Car Cluj", telephone: "+40742925934" },
      areaServed: VEHICLE_LOCAL_AREAS.map(({ city }) => ({ "@type": "Place", name: city })),
    },
  };
}