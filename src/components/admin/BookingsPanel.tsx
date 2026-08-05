import { useState } from "react";
import { CalendarDays, Loader2, Plus, Trash2 } from "lucide-react";

import { adminDeleteBooking, adminSaveBooking } from "@/lib/admin.functions";
import { formatRangeRo, todayISO, type Booking } from "@/lib/bookings";
import type { Vehicle } from "@/lib/vehicles";

const inputClass =
  "mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-normal normal-case tracking-normal text-foreground";
const labelClass = "text-xs font-semibold uppercase tracking-wide text-muted-foreground";

export function BookingsPanel({
  vehicles,
  bookings,
  onChange,
}: {
  vehicles: Vehicle[];
  bookings: Booking[];
  onChange: () => Promise<void>;
}) {
  const [vehicleId, setVehicleId] = useState(vehicles[0]?.id ?? "");
  const [start, setStart] = useState(todayISO());
  const [end, setEnd] = useState(todayISO());
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const names = new Map(vehicles.map((v) => [v.id, v.name]));
  const today = todayISO();
  const upcoming = bookings.filter((b) => b.end_date >= today);

  async function save() {
    if (!vehicleId) return;
    setSaving(true);
    setError("");
    try {
      const result = await adminSaveBooking({
        data: {
          vehicle_id: vehicleId,
          start_date: start,
          end_date: end < start ? start : end,
          customer_name: "",
          customer_phone: "",
          note: "",
          status: "confirmed",
        },
      });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      await onChange();
    } catch {
      setError("Nu am putut salva. Încearcă din nou.");
    } finally {
      setSaving(false);
    }
  }

  async function remove(b: Booking) {
    if (!window.confirm(`Eliberezi mașina pentru ${formatRangeRo(b.start_date, b.end_date)}?`)) return;
    setBusyId(b.id);
    try {
      await adminDeleteBooking({ data: { id: b.id } });
      await onChange();
    } finally {
      setBusyId(null);
    }
  }

  return (
    <section aria-label="Mașini ocupate" className="mb-10">
      <div className="flex items-center gap-2">
        <CalendarDays className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-bold uppercase tracking-wide">Mașini ocupate</h2>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Alege mașina și perioada. Atât. Pe site apare automat ca indisponibilă în acele zile.
      </p>

      <div className="mt-4 rounded-2xl border border-border bg-background p-5">
        <div className="grid gap-3 md:grid-cols-3">
          <label className={labelClass}>
            Mașina
            <select
              value={vehicleId}
              onChange={(e) => setVehicleId(e.target.value)}
              className={inputClass}
            >
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>
          </label>
          <label className={labelClass}>
            De la
            <input
              type="date"
              value={start}
              onChange={(e) => {
                setStart(e.target.value);
                if (end < e.target.value) setEnd(e.target.value);
              }}
              className={inputClass}
            />
          </label>
          <label className={labelClass}>
            Până la
            <input
              type="date"
              value={end}
              min={start}
              onChange={(e) => setEnd(e.target.value)}
              className={inputClass}
            />
          </label>
        </div>

        {error ? <p className="mt-3 text-sm font-semibold text-destructive">{error}</p> : null}

        <button
          type="button"
          onClick={save}
          disabled={saving || vehicles.length === 0}
          className="btn-base btn-primary mt-4 disabled:opacity-60"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
          Marchează ca ocupată
        </button>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-background">
        <p className="border-b border-border px-5 py-3 text-sm font-semibold">
          Ocupate acum și în viitor ({upcoming.length})
        </p>
        {upcoming.length === 0 ? (
          <p className="px-5 py-4 text-sm text-muted-foreground">
            Toate mașinile sunt disponibile.
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {upcoming.map((b) => (
              <li key={b.id} className="flex flex-wrap items-center gap-3 px-5 py-3 text-sm">
                <span className="font-semibold">{names.get(b.vehicle_id) ?? "Mașină ștearsă"}</span>
                <span className="rounded-full bg-surface px-2.5 py-0.5 text-xs font-semibold">
                  {formatRangeRo(b.start_date, b.end_date)}
                </span>
                <button
                  type="button"
                  onClick={() => remove(b)}
                  disabled={busyId === b.id}
                  aria-label="Eliberează mașina"
                  className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-semibold text-destructive hover:bg-surface"
                >
                  {busyId === b.id ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Trash2 className="h-3.5 w-3.5" />
                  )}
                  Eliberează
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
