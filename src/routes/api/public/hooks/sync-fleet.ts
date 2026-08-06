/**
 * Daily fleet sync watchdog (called by the scheduled job).
 *
 * It checks that the OLX source listing is reachable and that vehicle data can
 * still be extracted from it. Every run is written to `fleet_sync_runs`, and any
 * failure (network error, blocked page, layout change, zero vehicles found)
 * triggers an automatic alert email to the owner.
 */
import { createFileRoute } from "@tanstack/react-router";

const SOURCE_URL =
  "https://www.olx.ro/d/oferta/inchiriez-masini-masini-de-inchiriat-rent-a-car-cluj-gilau-floresti-IDgPPvn.html";

function alertEmail() {
  return process.env["SYNC_ALERT_EMAIL"] ?? "Ovidiu_danciu@yahoo.com";
}

type SyncOutcome = {
  status: "ok" | "error";
  found: number;
  message: string;
};

async function probeSource(): Promise<SyncOutcome> {
  let html = "";
  try {
    const response = await fetch(SOURCE_URL, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
        "accept-language": "ro-RO,ro;q=0.9",
      },
    });
    if (!response.ok) {
      return {
        status: "error",
        found: 0,
        message: `Sursa OLX a răspuns cu status ${response.status}.`,
      };
    }
    html = await response.text();
  } catch (error) {
    return {
      status: "error",
      found: 0,
      message: `Sursa OLX nu a putut fi accesată: ${
        error instanceof Error ? error.message : String(error)
      }`,
    };
  }

  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
  const prices = [...text.matchAll(/(\d{2,4})\s*(?:lei|RON)\s*\/?\s*(?:zi|day)?/gi)]
    .map((m) => Number(m[1]))
    .filter((n) => n >= 40 && n <= 2000);
  const models = [
    "citroen",
    "citroën",
    "passat",
    "focus",
    "fabia",
    "octavia",
    "golf",
    "xc90",
    "volvo",
    "skoda",
    "škoda",
    "renault",
    "dacia",
  ].filter((model) => text.toLowerCase().includes(model));

  if (models.length === 0 && prices.length === 0) {
    return {
      status: "error",
      found: 0,
      message:
        "Pagina OLX a fost accesată, dar nu s-au putut extrage date (anunț șters, blocat sau structură modificată).",
    };
  }

  const minPrice = prices.length ? Math.min(...prices) : null;
  return {
    status: "ok",
    found: models.length,
    message: minPrice
      ? `Sursă validă. Modele detectate: ${models.length}. Preț minim în anunț: ${minPrice} lei/zi.`
      : `Sursă validă. Modele detectate: ${models.length}.`,
  };
}

async function logRun(outcome: SyncOutcome) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("fleet_sync_runs")
    .insert({
      status: outcome.status,
      found: outcome.found,
      created: 0,
      updated: 0,
      skipped: 0,
      message: outcome.message.slice(0, 500),
    })
    .select("id, ran_at")
    .single();
  if (error) throw new Error(error.message);
  return data as { id: string; ran_at: string };
}

/** Avoids daily duplicate alerts for a failure that is already known. */
async function alreadyAlerted(message: string, currentRunId: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const since = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();
  const { data } = await supabaseAdmin
    .from("fleet_sync_runs")
    .select("id, message")
    .eq("status", "error")
    .gte("ran_at", since)
    .neq("id", currentRunId)
    .order("ran_at", { ascending: false })
    .limit(5);
  return (data ?? []).some((row) => row.message === message.slice(0, 500));
}

async function notifyFailure(outcome: SyncOutcome, run: { id: string; ran_at: string }) {
  if (await alreadyAlerted(outcome.message, run.id)) return false;
  const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");
  try {
    await sendTemplateEmail("sync-alert", alertEmail(), {
      templateData: {
        reason: outcome.message,
        ranAt: new Date(run.ran_at).toLocaleString("ro-RO", {
          timeZone: "Europe/Bucharest",
        }),
        found: outcome.found,
        sourceUrl: SOURCE_URL,
      },
      idempotencyKey: `sync-alert-${run.id}`,
    });
    return true;
  } catch (error) {
    console.error("Nu s-a putut trimite alerta de sincronizare", error);
    return false;
  }
}

export const Route = createFileRoute("/api/public/hooks/sync-fleet")({
  server: {
    handlers: {
      POST: async () => {
        const outcome = await probeSource();
        const run = await logRun(outcome);
        const alerted = outcome.status === "error" ? await notifyFailure(outcome, run) : false;
        return Response.json({
          status: outcome.status,
          found: outcome.found,
          message: outcome.message,
          alerted,
        });
      },
      GET: async () => Response.json({ ok: true, source: SOURCE_URL }),
    },
  },
});
