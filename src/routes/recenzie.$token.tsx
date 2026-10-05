import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Star } from "lucide-react";

import { getReviewInvite, submitReview } from "@/lib/vehicle-reviews.functions";

export const Route = createFileRoute("/recenzie/$token")({
  loader: ({ params }) => getReviewInvite({ data: { token: params.token } }).catch(() => ({ ok: false as const })),
  head: () => ({
    meta: [
      { title: "Lasă o recenzie — DCO Rent a Car Cluj" },
      { name: "description", content: "Spune-ne cum a fost mașina închiriată de la DCO Rent a Car Cluj." },
      { property: "og:title", content: "Lasă o recenzie — DCO Rent a Car Cluj" },
      { property: "og:description", content: "Recenzie pentru clienții DCO Rent a Car Cluj." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  errorComponent: () => <Shell><p>Linkul nu poate fi deschis acum.</p></Shell>,
  notFoundComponent: () => <Shell><p>Link inexistent.</p></Shell>,
  component: ReviewPage,
});

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-surface px-4 py-12">
      <div className="mx-auto max-w-lg rounded-2xl border border-border bg-background p-6 sm:p-8">
        {children}
        <Link to="/" className="mt-6 inline-block text-sm font-semibold text-primary">
          ← Înapoi la site
        </Link>
      </div>
    </main>
  );
}

function ReviewPage() {
  const invite = Route.useLoaderData();
  const { token } = Route.useParams();
  const [rating, setRating] = useState(5);
  const [author, setAuthor] = useState("");
  const [comment, setComment] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  if (!invite.ok) return <Shell><h1 className="text-2xl font-bold">Link invalid</h1><p className="mt-2 text-muted-foreground">Acest link de recenzie nu există.</p></Shell>;
  if (invite.used || state === "done")
    return <Shell><h1 className="text-2xl font-bold">Mulțumim!</h1><p className="mt-2 text-muted-foreground">Recenzia ta a fost primită și va apărea pe site după verificare.</p></Shell>;

  async function send(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    try {
      const r = await submitReview({ data: { token, author, rating, comment } });
      if (!r.ok) { setError(r.error); setState("error"); return; }
      setState("done");
    } catch {
      setError("Verifică numele (min. 2 litere) și comentariul (min. 5 caractere).");
      setState("error");
    }
  }

  return (
    <Shell>
      <h1 className="text-2xl font-bold">Cum a fost {invite.vehicle}?</h1>
      <p className="mt-2 text-sm text-muted-foreground">Ai închiriat această mașină de la noi. Spune-le și altora cum a fost.</p>
      <form onSubmit={send} className="mt-6 space-y-4">
        <div role="radiogroup" aria-label="Nota" className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} type="button" role="radio" aria-checked={rating === n} aria-label={`${n} stele`} onClick={() => setRating(n)} className="p-1">
              <Star className={`h-8 w-8 ${n <= rating ? "fill-accent text-accent" : "text-muted-foreground"}`} />
            </button>
          ))}
        </div>
        <label className="block text-sm font-semibold">
          Numele tău
          <input value={author} onChange={(e) => setAuthor(e.target.value)} maxLength={60} required className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 font-normal" />
        </label>
        <label className="block text-sm font-semibold">
          Comentariu
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} maxLength={1000} required rows={4} className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 font-normal" />
        </label>
        {state === "error" && <p className="text-sm font-semibold text-destructive">{error}</p>}
        <button type="submit" disabled={state === "sending"} className="btn-base btn-primary w-full">
          {state === "sending" ? "Se trimite…" : "Trimite recenzia"}
        </button>
      </form>
    </Shell>
  );
}
