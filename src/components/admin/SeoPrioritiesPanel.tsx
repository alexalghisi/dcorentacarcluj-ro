import { useEffect, useState } from "react";
import { Loader2, RefreshCw, Sparkles } from "lucide-react";

import { adminSeoPriorities } from "@/lib/admin.functions";

type State =
  | { status: "loading" }
  | { status: "error"; error: string }
  | { status: "ready"; content: string; created_at: string };

export function SeoPrioritiesPanel() {
  const [state, setState] = useState<State>({ status: "loading" });

  async function load(force: boolean) {
    setState({ status: "loading" });
    try {
      const res = await adminSeoPriorities({ data: { force } });
      setState(res.ok ? { status: "ready", content: res.content, created_at: res.created_at } : { status: "error", error: res.error });
    } catch {
      setState({ status: "error", error: "Nu am putut genera prioritățile." });
    }
  }

  useEffect(() => {
    void load(false);
  }, []);

  return (
    <section aria-label="Priorități SEO" className="mb-10 rounded-2xl border border-border bg-background p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-bold uppercase tracking-wide">Prioritățile SEO de azi</h2>
        </div>
        <button
          type="button"
          disabled={state.status === "loading"}
          onClick={() => load(true)}
          className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-semibold hover:bg-surface disabled:opacity-50"
        >
          <RefreshCw className="h-4 w-4" /> Regenerează
        </button>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        Generate cu AI din datele reale Google Search Console (clicuri, afișări, poziții), o dată pe zi.
      </p>

      {state.status === "loading" && (
        <p className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Analizez datele din Google…
        </p>
      )}
      {state.status === "error" && <p className="mt-5 text-sm text-destructive">{state.error}</p>}
      {state.status === "ready" && (
        <>
          <div className="mt-5 whitespace-pre-wrap text-sm leading-relaxed">
            {state.content.replace(/\*\*/g, "")}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Generat: {new Date(state.created_at).toLocaleString("ro-RO", { timeZone: "Europe/Bucharest" })}
          </p>
        </>
      )}
    </section>
  );
}
