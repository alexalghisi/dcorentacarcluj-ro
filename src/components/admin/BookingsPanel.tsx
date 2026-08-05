import { useState } from "react";
import { CalendarDays, Loader2, Plus, Trash2 } from "lucide-react";

import { adminDeleteBooking, adminSaveBooking } from "@/lib/admin.functions";
import {
  BOOKING_STATUS_LABELS,
  formatRangeRo,
  todayISO,
  type Booking,
} from "@/lib/bookings";
import type { Vehicle } from "@/lib/vehicles";

const STATUSES: Booking["status"][] = ["confirmed", "option", "blocked"];

export function BookingsPanel({
  vehicles,
  bookings,
  onChange,
}: {
  vehicles: Vehicle[];
  bookings: Booking[];
  onChange: () => Promise<void>;
}) {
  const [form, setForm] = useState({
    vehicle_id: vehicles[0]?.id ?? "",
    start_date: todayISO(),
    end_date: todayISO(),
    customer_name: "",
    customer_phone: "",
    note: "",
    status: "confirmed" as Booking["status"],
  });
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const names = new Map(vehicles.map((v) => [v.id, v.name]));
  const today = todayISO();
  const upcoming = bookings.filter((b) => b.end_date >= today);
  const past = bookings.filter((b) => b.end_date < today);

  async function save() {
    if (!form.vehicle_id) return;
    setSaving(true);
    setError("");
    try {
      const result = await adminSaveBooking({
        data: {
          vehicle_id: form.vehicle_id,
          start_date: form.start_date,
          end_date: form.end_date < form.start_date ? form.start_date : form.end_date,
          customer_name: form.customer_name,
          customer_phone: form.customer_phone,
          note: form.note,
          status: form.status,
        },
      });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setForm((f) => ({ ...f, customer_name: "", customer_phone: "", note: "" }));
      await onChange();
    } catch {
      setError("Nu am putut salva rezervarea. Încearcă din nou.");
    } finally {
      setSaving(false);
    }
  }

  async function remove(b: Booking) {
    if (!window.confirm(`Ștergi rezervarea ${formatRangeRo(b.start_date, b.end_date)}?`)) return;
    setBusyId(b.id);
    try {
      await adminDeleteBooking({ data: { id: b.id } });
      await onChange();
    } finally {
      setBusyId(null);
    }
  }

  return (
    <section aria-label="Rezervări" className="mb-10">
      <div className="flex items-center gap-2">
        <CalendarDays className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-bold uppercase tracking-wide">Rezervări & disponibilitate</h2>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        O mașină rezervată apare pe site ca indisponibilă pentru perioada respectivă.
      </p>

      <div className="mt-4 rounded-2xl border border-border bg-background p-5">
        <div className="grid gap-3 md:grid-cols-3">
          <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Mașina
            <select
              value={form.vehicle_id}
              onChange={(e) => setForm((f) => ({ ...f, vehicle_id: e.target.value }))}
              className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-normal normal-case tracking-normal text-foreground"
            >
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>
          </label>
          <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            De la
            <input
              type="date"
              value={form.start_date}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  start_date: e.target.value,
                  end_date: f.end_date < e.target.value ? e.target.value : f.end_date,
                }))
              }
              className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-normal normal-case tracking-normal text-foreground"
            />
          </label>
          <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Până la
            <input
              type="date"
              value={form.end_date}
              min={form.start_date}
              onChange={(e) => setForm((f) => ({ ...f, end_date: e.target.value }))}
              className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-normal normal-case tracking-normal text-foreground"
            />
          </label>
          <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Client
            <input
              value={form.customer_name}
              onChange={(e) => setForm((f) => ({ ...f, customer_name: e.target.value }))}
              placeholder="Nume client"
              className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-normal normal-case tracking-normal text-foreground"
            />
          </label>
          <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Telefon
            <input
              value={form.customer_phone}
              onChange={(e) => setForm((f) => ({ ...f, customer_phone: e.target.value }))}
              placeholder="07xx xxx xxx"
              className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-normal normal-case tracking-normal text-foreground"
            />
          </label>
          <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Status
            <select
              value={form.status}
              onChange={(e) =>
                setForm((f) => ({ ...f, status: e.target.value as Booking["status"] }))
              }
              className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-normal normal-case tracking-normal text-foreground"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {BOOKING_STATUS_LABELS[s]}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="mt-3 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Notă internă
          <input
            value={form.note}
            onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
            placeholder="Ex: predare la aeroport, ora 10"
            className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-normal normal-case tracking-normal text-foreground"
          />
        </label>

        {error ? <p className="mt-3 text-sm font-semibold text-destructive">{error}</p> : null}

        <button
          type="button"
          onClick={save}
          disabled={saving || vehicles.length === 0}
          className="btn-base btn-primary mt-4 disabled:opacity-60"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
          Adaugă rezervare
        </button>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-background">
        <p className="border-b border-border px-5 py-3 text-sm font-semibold">
          Rezervări active și viitoare ({upcoming.length})
        </p>
        {upcoming.length === 0 ? (
          <p className="px-5 py-4 text-sm text-muted-foreground">Nicio rezervare înregistrată.</p>
        ) : (
          <ul className="divide-y divide-border">
            {upcoming.map((b) => (
              <li key={b.id} className="flex flex-wrap items-center gap-3 px-5 py-3 text-sm">
                <span className="font-semibold">{names.get(b.vehicle_id) ?? "Mașină ștearsă"}</span>
                <span className="rounded-full bg-surface px-2.5 py-0.5 text-xs font-semibold">
                  {formatRangeRo(b.start_date, b.end_date)}
                </span>
                <span className="text-xs text-muted-foreground">
                  {BOOKING_STATUS_LABELS[b.status]}
                  {b.customer_name ? ` · ${b.customer_name}` : ""}
                  {b.customer_phone ? ` · ${b.customer_phone}` : ""}
                  {b.note ? ` · ${b.note}` : ""}
                </span>
                <button
                  type="button"
                  onClick={() => remove(b)}
                  disabled={busyId === b.id}
                  aria-label="Șterge rezervarea"
                  className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-semibold text-destructive hover:bg-surface"
                >
                  {busyId === b.id ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Trash2 className="h-3.5 w-3.5" />
                  )}
                  Șterge
                </button>
              </li>
            ))}
          </ul>
        )}
        {past.length > 0 ? (
          <p className="border-t border-border px-5 py-3 text-xs text-muted-foreground">
            {past.length} rezervări încheiate (nu mai afectează disponibilitatea).
          </p>
        ) : null}
      </div>
    </section>
  );
}
