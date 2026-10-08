import { createFileRoute } from "@tanstack/react-router";

/**
 * Daily SERP position check, called by the scheduled job.
 * Verified with the publishable key, like the fleet sync hook.
 * One snapshot per keyword per day, so repeated calls cost nothing extra.
 */
export const Route = createFileRoute("/api/public/hooks/serp-check")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const key = request.headers.get("apikey") ?? "";
        if (!key || key !== process.env["SUPABASE_PUBLISHABLE_KEY"]) {
          return new Response("Unauthorized", { status: 401 });
        }
        const { runSerpCheck } = await import("@/lib/serp-monitor.server");
        try {
          const result = await runSerpCheck();
          return Response.json({ ok: true, ...result });
        } catch (e) {
          console.error(e);
          return Response.json(
            { ok: false, error: e instanceof Error ? e.message : "Eroare necunoscută" },
            { status: 500 },
          );
        }
      },
    },
  },
});
