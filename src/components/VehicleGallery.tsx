import { useState } from "react";
import { BadgeCheck, CalendarX2 } from "lucide-react";

export interface VehicleGalleryProps {
  images: string[];
  name: string;
  busy: boolean;
  busyLabel: string;
  rangeLabel: string;
  freeFromLabel: string;
}

export function VehicleGallery({
  images,
  name,
  busy,
  busyLabel,
  rangeLabel,
  freeFromLabel,
}: VehicleGalleryProps) {
  const list = images.filter(Boolean);
  const [active, setActive] = useState(0);
  const src = list[Math.min(active, Math.max(list.length - 1, 0))] ?? "";

  return (
    <div>
      <div className="relative">
        <img
          src={src}
          alt={`${name} ${busy ? "rezervată" : "disponibilă"} la închiriere în Cluj`}
          width={1200}
          height={900}
          loading="lazy"
          className={`h-48 w-full bg-surface object-cover transition ${busy ? "grayscale" : ""}`}
        />
        {busy ? (
          <>
            <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-destructive px-3 py-1 text-xs font-bold text-destructive-foreground shadow">
              <CalendarX2 className="h-3.5 w-3.5" /> Rezervată
            </span>
            <div className="pointer-events-none absolute inset-0 hidden items-end bg-foreground/75 p-4 text-center opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 sm:flex">
              <p className="w-full text-xs font-semibold leading-relaxed text-background">
                Indisponibilă {rangeLabel}
                <br />
                {busyLabel}
                {freeFromLabel}
              </p>
            </div>
          </>
        ) : (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow">
            <BadgeCheck className="h-3.5 w-3.5" /> Disponibilă
          </span>
        )}
        {list.length > 1 && (
          <span className="absolute bottom-3 right-3 rounded-full bg-foreground/70 px-2.5 py-1 text-[0.7rem] font-semibold text-background">
            {active + 1}/{list.length} foto
          </span>
        )}
      </div>

      {list.length > 1 && (
        <div className="flex gap-2 overflow-x-auto border-b border-border/60 bg-surface/60 px-3 py-2">
          {list.map((img, i) => (
            <button
              key={img + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Fotografia ${i + 1} pentru ${name}`}
              aria-current={i === active}
              className={`shrink-0 overflow-hidden rounded-md border-2 transition ${
                i === active ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={img}
                alt={`${name} – fotografia ${i + 1}`}
                loading="lazy"
                className={`h-12 w-16 object-cover ${busy ? "grayscale" : ""}`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
