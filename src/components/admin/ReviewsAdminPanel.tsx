import { useEffect, useState } from "react";
import { Check, Copy, Loader2, Star, X } from "lucide-react";

import {
  adminCreateReviewInvite,
  adminListReviews,
  adminModerateReview,
  type AdminReview,
} from "@/lib/vehicle-reviews.functions";
import { formatRangeRo, todayISO, type Booking } from "@/lib/bookings";
import type { Vehicle } from "@/lib/vehicles";

const STATUS: Record<AdminReview["status"], string> = {
  invited: "Link trimis, fără răspuns",
  pending: "Așteaptă aprobarea ta",
  approved: "Publicată",
  rejected: "Respinsă",
};

export function ReviewsAdminPanel({ vehicles, bookings }: { vehicles: Vehicle[]; bookings: Booking[] }) {
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [busy, setBusy] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const names = new Map(vehicles.map((v) => [v.id, v.name]));
  const today = todayISO();
  const finished = bookings.filter((b) => b.start_date <= today).slice(0, 30);
  const byBooking = new Map(reviews.map((r) => [r.booking_id, r]));

  async function load() {
    setReviews(await adminListReviews());
  }
  useEffect(() => {
    void load();
  }, []);

  async function invite(b: Booking) {
    setBusy(b.id);
    try {
      const { token } = await adminCreateReviewInvite({ data: { bookingId: b.id } });
      const url = `${window.location.origin}/recenzie/${token}`;
      await navigator.clipboard?.writeText(url).catch(() => undefined);
      setCopied(b.id);
      await load();
    } finally {
      setBusy(null);
    }
  }

  async function moderate(id: string, status: "approved" | "rejected") {
    setBusy(id);
    try {
      await adminModerateReview({ data: { id, status } });
      await load();
    } finally {
      setBusy(null);
    }
  }

  const waiting = reviews.filter((r) => r.status === "pending");

  return (
    <section aria-label="Recenzii" className="mb-10">
      <div className="flex items-center gap-2">
        <Star className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-bold uppercase tracking-wide">Recenzii clienți</h2>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Doar clienții care au închiriat pot scrie. Apasă „Copiază link”, trimite-l clientului pe WhatsApp, iar
        recenzia apare pe site doar după ce o aprobi.
      </p>

      {waiting.length > 0 && (
        <ul className="mt-4 space-y-3">
          {waiting.map((r) => (
            <li key={r.id} className="rounded-2xl border border-border bg-background p-4 text-sm">
              <p className="font-semibold">
                {r.author} · {"★".repeat(r.rating)} · {names.get(r.vehicle_id) ?? ""}
              </p>
              <p className="mt-1 text-muted-foreground">{r.comment}</p>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <button type="button" disabled={busy === r.id} onClick={() => moderate(r.id, "approved")} className="btn-base btn-primary">
                  <Check className="h-4 w-4" /> Aprob
                </button>
                <button type="button" disabled={busy === r.id} onClick={() => moderate(r.id, "rejected")} className="btn-base btn-outline-ink">
                  <X className="h-4 w-4" /> Resping
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-background">
        <p className="border-b border-border px-5 py-3 text-sm font-semibold">Închirieri pentru care poți cere recenzie</p>
        {finished.length === 0 ? (
          <p className="px-5 py-4 text-sm text-muted-foreground">Încă nu există închirieri începute.</p>
        ) : (
          <ul className="divide-y divide-border">
            {finished.map((b) => {
              const r = byBooking.get(b.id);
              return (
                <li key={b.id} className="flex flex-col gap-2 px-5 py-3 text-sm sm:flex-row sm:items-center">
                  <span className="font-semibold">{names.get(b.vehicle_id) ?? "Mașină ștearsă"}</span>
                  <span className="text-xs text-muted-foreground">{formatRangeRo(b.start_date, b.end_date)}</span>
                  {r && <span className="text-xs font-semibold">{STATUS[r.status]}</span>}
                  {(!r || r.status === "invited") && (
                    <button type="button" onClick={() => invite(b)} disabled={busy === b.id} className="btn-base btn-outline-ink sm:ml-auto">
                      {busy === b.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Copy className="h-4 w-4" />}
                      {copied === b.id ? "Link copiat" : "Copiază link"}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
