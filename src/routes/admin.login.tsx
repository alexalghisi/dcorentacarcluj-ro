import { useState, type FormEvent } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Lock, LogIn, Loader2 } from "lucide-react";

import { adminLogin } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
  head: () => ({
    meta: [
      { title: "Autentificare administrator | DCO Rent a Car Cluj" },
      { name: "description", content: "Zonă privată pentru administrarea flotei DCO Rent a Car." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Autentificare administrator" },
      { property: "og:description", content: "Zonă privată DCO Rent a Car." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function AdminLogin() {
  const router = useRouter();
  const login = useServerFn(adminLogin);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await login({ data: { username, password } });
      if (res.ok) {
        await router.navigate({ to: "/admin", replace: true });
      } else {
        setError("Utilizator sau parolă incorecte.");
      }
    } catch {
      setError("Nu am putut verifica datele. Încearcă din nou.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface px-5 py-16">
      <div className="w-full max-w-md rounded-2xl border border-border bg-background p-8 shadow-lg">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Lock className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-xl font-bold">Panou administrare</h1>
            <p className="text-sm text-muted-foreground">DCO Rent a Car Cluj</p>
          </div>
        </div>

        <form className="mt-8 space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="text-sm font-medium" htmlFor="admin-user">
              Utilizator
            </label>
            <input
              id="admin-user"
              autoComplete="username"
              className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="admin-pass">
              Parolă
            </label>
            <input
              id="admin-pass"
              type="password"
              autoComplete="current-password"
              className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
            Intră în panou
          </button>
        </form>
      </div>
    </main>
  );
}
