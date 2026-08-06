import { useState } from "react";
import { Loader2, RefreshCw } from "lucide-react";

import { adminSyncFleet } from "@/lib/admin.functions";
import { FLEET_SOURCE_URL, type FleetSyncRun } from "@/lib/fleet-sync";

function formatDate(value: string): string {
  return new Date(value).toLocaleString("ro-RO", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function FleetSyncPanel({
  runs,
  onChange,
}: {
  runs: FleetSyncRun[];
  onChange: () => Promise<void>;
}) {
  const [busy, setBusy] = useState(false);
  const last = runs[0];

  async function syncNow() {
    setBusy(true);
    try {
      await adminSyncFleet({ data: undefined });
      await onChange();
    } finally {
      setBusy(false);
    }
  }

  return (
    <section aria-label="Sincronizare flotă" className="mb-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-bold uppercase tracking-wide">
            Sincronizare zilnică din anunț
          </h2>
        </div>
        <button
          type="button"
          onClick={syncNow}
          disabled={busy}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          Sincronizează acum
        </button>
      </div>

      <div className="mt-4 rounded-2xl border border-border bg-background p-5">
        <p className="text-sm text-muted-foreground">
          Flota se actualizează automat o dată pe zi din{" "}
          <a
            href={FLEET_SOURCE_URL}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-primary underline"
          >
            anunțul OLX
          </a>
          . Mașinile pe care le editezi din acest panou sunt blocate și nu mai sunt suprascrise.
        </p>

        {last ? (
          <p className="mt-3 text-sm">
            Ultima rulare: <strong>{formatDate(last.ran_at)}</strong> ·{" "}
            {last.status === "ok" ? (
              <>
                {last.found} mașini în anunț · {last.created} adăugate · {last.updated} actualizate ·{" "}
                {last.skipped} păstrate manual
              </>
            ) : (
              <span className="text-destructive">Eroare: {last.message}</span>
            )}
          </p>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">Nu există încă o rulare înregistrată.</p>
        )}

        {runs.length > 1 && (
          <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
            {runs.slice(1).map((r) => (
              <li key={r.id}>
                {formatDate(r.ran_at)} · {r.status === "ok" ? "reușit" : "eșuat"} · {r.found} mașini
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
