import { useRef, useState, type FormEvent } from "react";
import { Loader2, Upload, X } from "lucide-react";

import { adminSaveVehicle, adminUploadImage } from "@/lib/admin.functions";
import { FUELS, SEATS, TRANSMISSIONS, vehicleImageSrc, type Vehicle } from "@/lib/vehicles";
import { vehicleTurntable } from "@/lib/vehicle-turntables";

const inputClass =
  "mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary";

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result ?? "");
      resolve(result.slice(result.indexOf(",") + 1));
    };
    reader.onerror = () => reject(new Error("Nu am putut citi fișierul."));
    reader.readAsDataURL(file);
  });
}

export interface VehicleDialogProps {
  vehicle: Vehicle | null;
  nextSortOrder: number;
  onClose: () => void;
  onSaved: () => void;
}

export function VehicleDialog({ vehicle, nextSortOrder, onClose, onSaved }: VehicleDialogProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(vehicle?.name ?? "");
  const [tagline, setTagline] = useState(vehicle?.tagline ?? "");
  const [description, setDescription] = useState(vehicle?.description ?? "");
  const [priceLabel, setPriceLabel] = useState(vehicle?.price_label ?? "de la 70 lei/zi");
  const [seats, setSeats] = useState(vehicle?.seats ?? "5 locuri");
  const [transmission, setTransmission] = useState(vehicle?.transmission ?? "Manuală");
  const [fuel, setFuel] = useState(vehicle?.fuel ?? "Diesel");
  const [imageUrl, setImageUrl] = useState(vehicle?.image_url ?? "");
  const [gallery, setGallery] = useState<string[]>(vehicle?.gallery ?? []);
  const [isActive, setIsActive] = useState(vehicle?.is_active ?? true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(files: File[]) {
    setUploading(true);
    setError(null);
    try {
      for (const file of files) {
        if (file.size > 8 * 1024 * 1024) {
          setError(`„${file.name}” depășește 8 MB și a fost ignorată.`);
          continue;
        }
        const base64 = await fileToBase64(file);
        const res = await adminUploadImage({
          data: { fileName: file.name, contentType: file.type || "image/jpeg", base64 },
        });
        const path = res.path;
        setImageUrl((current) => {
          if (!current) return path;
          setGallery((list) => (list.includes(path) ? list : [...list, path]));
          return current;
        });
      }
    } catch {
      setError("Încărcarea imaginii a eșuat. Încearcă din nou.");
    } finally {
      setUploading(false);
    }
  }

  function removePhoto(path: string) {
    if (path === imageUrl) {
      const [next, ...rest] = gallery;
      setImageUrl(next ?? "");
      setGallery(rest);
      return;
    }
    setGallery((list) => list.filter((p) => p !== path));
  }

  function makeCover(path: string) {
    const rest = [imageUrl, ...gallery].filter((p) => p && p !== path) as string[];
    setImageUrl(path);
    setGallery(rest);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await adminSaveVehicle({
        data: {
          ...(vehicle ? { id: vehicle.id } : {}),
          name,
          tagline,
          description,
          price_label: priceLabel,
          seats,
          transmission,
          fuel,
          image_url: imageUrl,
          gallery,
          sort_order: vehicle?.sort_order ?? nextSortOrder,
          is_active: isActive,
        },
      });
      onSaved();
    } catch {
      setError("Salvarea a eșuat. Verifică datele și încearcă din nou.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-foreground/60 p-4 backdrop-blur-sm">
      <div className="my-8 w-full max-w-2xl rounded-2xl border border-border bg-background shadow-xl">
        <header className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-lg font-bold">
            {vehicle ? `Editează ${vehicle.name}` : "Adaugă vehicul"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Închide"
            className="rounded-lg p-2 text-muted-foreground hover:bg-surface"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <form onSubmit={onSubmit} className="space-y-5 px-6 py-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="text-sm font-medium" htmlFor="v-name">
                Nume vehicul *
              </label>
              <input
                id="v-name"
                className={inputClass}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ex. VW Passat Break"
                required
                maxLength={80}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-sm font-medium" htmlFor="v-tagline">
                Subtitlu scurt
              </label>
              <input
                id="v-tagline"
                className={inputClass}
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="ex. Spațios și confortabil, ideal pentru familie"
                maxLength={160}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-sm font-medium" htmlFor="v-desc">
                Descriere detaliată
              </label>
              <textarea
                id="v-desc"
                className={`${inputClass} min-h-28 resize-y`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detalii despre dotări, consum, recomandări de utilizare…"
                maxLength={1200}
              />
            </div>

            <div>
              <label className="text-sm font-medium" htmlFor="v-price">
                Preț afișat *
              </label>
              <input
                id="v-price"
                className={inputClass}
                value={priceLabel}
                onChange={(e) => setPriceLabel(e.target.value)}
                placeholder="de la 70 lei/zi"
                required
                maxLength={60}
              />
            </div>

            <div>
              <label className="text-sm font-medium" htmlFor="v-seats">
                Locuri
              </label>
              <input
                id="v-seats"
                list="seats-options"
                className={inputClass}
                value={seats}
                onChange={(e) => setSeats(e.target.value)}
                required
              />
              <datalist id="seats-options">
                {SEATS.map((s) => (
                  <option key={s} value={s} />
                ))}
              </datalist>
            </div>

            <div>
              <label className="text-sm font-medium" htmlFor="v-trans">
                Transmisie
              </label>
              <select
                id="v-trans"
                className={inputClass}
                value={transmission}
                onChange={(e) => setTransmission(e.target.value)}
              >
                {TRANSMISSIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium" htmlFor="v-fuel">
                Combustibil
              </label>
              <select
                id="v-fuel"
                className={inputClass}
                value={fuel}
                onChange={(e) => setFuel(e.target.value)}
              >
                {FUELS.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="rounded-xl border border-dashed border-border p-4">
            <p className="text-sm font-medium">Fotografii</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Poți încărca mai multe poze. Prima este poza principală afișată pe site.
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {[imageUrl, ...gallery].filter(Boolean).map((path, i) => (
                <div key={path} className="relative">
                  <img
                    src={vehicleImageSrc(path)}
                    alt={`${name || "Vehicul"} – poza ${i + 1}`}
                    className="h-24 w-36 rounded-lg bg-surface object-cover"
                  />
                  {i === 0 ? (
                    <span className="absolute left-1.5 top-1.5 rounded-full bg-primary px-2 py-0.5 text-[0.65rem] font-bold text-primary-foreground">
                      Principală
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => makeCover(path)}
                      className="absolute left-1.5 top-1.5 rounded-full bg-background/90 px-2 py-0.5 text-[0.65rem] font-semibold hover:bg-background"
                    >
                      Fă principală
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => removePhoto(path)}
                    aria-label="Șterge poza"
                    className="absolute right-1.5 top-1.5 rounded-full bg-background/90 p-1 text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
              {!imageUrl && gallery.length === 0 && (
                <div className="flex h-24 w-36 items-center justify-center rounded-lg bg-surface text-xs text-muted-foreground">
                  Fără poze
                </div>
              )}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => {
                  const files = Array.from(e.target.files ?? []);
                  if (files.length > 0) void handleFiles(files);
                  e.target.value = "";
                }}
              />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-semibold hover:bg-surface disabled:opacity-60"
              >
                {uploading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4" />
                )}
                Adaugă poze
              </button>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              JPG sau PNG, maximum 8 MB fiecare. Recomandat orizontal (ex. 1200×900 px).
            </p>
          </div>

          <label className="flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              className="h-4 w-4 accent-[hsl(var(--primary))]"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            Afișează vehiculul pe site
          </label>

          {error && (
            <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>
          )}

          <div className="flex justify-end gap-3 border-t border-border pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-border px-4 py-2.5 text-sm font-semibold hover:bg-surface"
            >
              Anulează
            </button>
            <button
              type="submit"
              disabled={saving || uploading}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60"
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              {vehicle ? "Salvează modificările" : "Adaugă vehiculul"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
