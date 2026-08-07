import { useState } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowUp,
  Car,
  Eye,
  EyeOff,
  Loader2,
  LogOut,
  Pencil,
  Plus,
  Trash2,
  ExternalLink,
  BarChart3,

  Eye as EyeIcon,
} from "lucide-react";

import {
  adminDeleteVehicle,
  adminListVehicles,
  adminLogout,
  adminReorderVehicles,
  adminListBookings,
  adminStats,
  adminToggleVehicle,
} from "@/lib/admin.functions";
import { BookingsPanel } from "@/components/admin/BookingsPanel";
import type { Booking } from "@/lib/bookings";
import { VehicleDialog } from "@/components/admin/VehicleDialog";
import {
  displayViews,
  vehicleImageSrc,

  type Vehicle,
} from "@/lib/vehicles";

export const Route = createFileRoute("/admin/")({
  ssr: false,
  loader: async () => {
    const [vehicles, stats, bookings] = await Promise.all([
      adminListVehicles(),
      adminStats(),
      adminListBookings(),
    ]);
    return { vehicles, stats, bookings };
  },

  component: AdminDashboard,
  errorComponent: () => (
    <main className="flex min-h-screen items-center justify-center p-8 text-center">
      <div>
        <h1 className="text-xl font-bold">Nu am putut încărca flota</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Reîncarcă pagina sau autentifică-te din nou.
        </p>
      </div>
    </main>
  ),
  notFoundComponent: () => (
    <main className="p-8 text-center">Pagina de administrare nu a fost găsită.</main>
  ),
  head: () => ({
    meta: [
      { title: "Administrare flotă | DCO Rent a Car Cluj" },
      {
        name: "description",
        content: "Panou de administrare pentru flota DCO Rent a Car Cluj.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Administrare flotă DCO Rent a Car" },
      { property: "og:description", content: "Panou privat de administrare a flotei." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function AdminDashboard() {
  const { vehicles, stats, search, bookings } = Route.useLoaderData() as {
    vehicles: Vehicle[];
    stats: { siteViews: number; vehicleViews: number; vehicles: number };
    bookings: Booking[];
  };

  const router = useRouter();
  const [dialog, setDialog] = useState<{ open: boolean; vehicle: Vehicle | null }>({
    open: false,
    vehicle: null,
  });
  const [busyId, setBusyId] = useState<string | null>(null);

  const active = vehicles.filter((v) => v.is_active).length;
  const nextSortOrder = (vehicles.at(-1)?.sort_order ?? 0) + 10;

  async function refresh() {
    await router.invalidate();
  }

  async function toggle(v: Vehicle) {
    setBusyId(v.id);
    try {
      await adminToggleVehicle({ data: { id: v.id, is_active: !v.is_active } });
      await refresh();
    } finally {
      setBusyId(null);
    }
  }

  async function remove(v: Vehicle) {
    if (!window.confirm(`Ștergi definitiv „${v.name}” din flotă?`)) return;
    setBusyId(v.id);
    try {
      await adminDeleteVehicle({ data: { id: v.id } });
      await refresh();
    } finally {
      setBusyId(null);
    }
  }

  async function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= vehicles.length) return;
    const ids = vehicles.map((v) => v.id);
    const current = ids[index]!;
    ids[index] = ids[target]!;
    ids[target] = current;
    setBusyId(current);
    try {
      await adminReorderVehicles({ data: { ids } });
      await refresh();
    } finally {
      setBusyId(null);
    }
  }

  async function signOut() {
    await adminLogout({ data: undefined });
    await router.navigate({ to: "/admin/login", replace: true });
  }

  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Car className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold">Administrare flotă</p>
              <p className="text-xs text-muted-foreground">DCO Rent a Car Cluj</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/#flota"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-semibold hover:bg-surface"
            >
              <ExternalLink className="h-4 w-4" /> Vezi site-ul
            </a>
            <button
              type="button"
              onClick={signOut}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-semibold text-muted-foreground hover:bg-surface"
            >
              <LogOut className="h-4 w-4" /> Ieși
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10">
        <section aria-label="Statistici" className="mb-10">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-bold uppercase tracking-wide">Statistici</h2>
          </div>
          <dl className="mt-4 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Vizualizări site", value: displayViews(stats.siteViews, "site") },
              { label: "Vizualizări mașini", value: displayViews(stats.vehicleViews, "vehicle") },
              { label: "Vehicule în flotă", value: String(stats.vehicles) },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-border bg-background p-5">
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {s.label}
                </dt>
                <dd className="mt-2 text-3xl font-bold">{s.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-xs text-muted-foreground">
            Cifre estimate (ajustate pentru afișare), nu numărătoare exactă.
          </p>

        </section>

        <BookingsPanel vehicles={vehicles} bookings={bookings} onChange={refresh} />

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">Vehicule</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {vehicles.length} vehicule în total · {active} afișate pe site
            </p>
          </div>
          <button
            type="button"
            onClick={() => setDialog({ open: true, vehicle: null })}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            <Plus className="h-4 w-4" /> Adaugă vehicul
          </button>
        </div>

        {vehicles.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-border bg-background p-12 text-center">
            <p className="font-semibold">Încă nu ai vehicule adăugate</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Apasă „Adaugă vehicul” pentru a publica prima mașină pe site.
            </p>
          </div>
        ) : (
          <ul className="mt-8 space-y-3">
            {vehicles.map((v, i) => (
              <li
                key={v.id}
                className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-background p-4"
              >
                {v.image_url ? (
                  <img
                    src={vehicleImageSrc(v.image_url)}
                    alt={v.name}
                    className="h-20 w-28 rounded-lg bg-surface object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-20 w-28 items-center justify-center rounded-lg bg-surface text-xs text-muted-foreground">
                    Fără poză
                  </div>
                )}

                <div className="min-w-48 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-semibold">{v.name}</h2>
                    <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                      {v.price_label}
                    </span>
                    {!v.is_active && (
                      <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                        Ascuns
                      </span>
                    )}
                  </div>
                  <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{v.tagline}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {v.seats} · {v.transmission} · {v.fuel}
                  </p>
                  <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                    <EyeIcon className="h-3.5 w-3.5" />
                    {displayViews(v.view_count ?? 0, "vehicle")} vizualizări
                  </p>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    aria-label="Mută mai sus"
                    disabled={i === 0 || busyId === v.id}
                    onClick={() => move(i, -1)}
                    className="rounded-lg border border-border p-2 hover:bg-surface disabled:opacity-40"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Mută mai jos"
                    disabled={i === vehicles.length - 1 || busyId === v.id}
                    onClick={() => move(i, 1)}
                    className="rounded-lg border border-border p-2 hover:bg-surface disabled:opacity-40"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    aria-label={v.is_active ? "Ascunde de pe site" : "Afișează pe site"}
                    disabled={busyId === v.id}
                    onClick={() => toggle(v)}
                    className="rounded-lg border border-border p-2 hover:bg-surface disabled:opacity-40"
                  >
                    {busyId === v.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : v.is_active ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setDialog({ open: true, vehicle: v })}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-semibold hover:bg-surface"
                  >
                    <Pencil className="h-4 w-4" /> Editează
                  </button>
                  <button
                    type="button"
                    aria-label="Șterge vehiculul"
                    disabled={busyId === v.id}
                    onClick={() => remove(v)}
                    className="rounded-lg border border-border p-2 text-destructive hover:bg-destructive/10 disabled:opacity-40"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>

      {dialog.open && (
        <VehicleDialog
          vehicle={dialog.vehicle}
          nextSortOrder={nextSortOrder}
          onClose={() => setDialog({ open: false, vehicle: null })}
          onSaved={async () => {
            setDialog({ open: false, vehicle: null });
            await refresh();
          }}
        />
      )}
    </div>
  );
}
