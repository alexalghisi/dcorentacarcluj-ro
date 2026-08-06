import { createFileRoute } from "@tanstack/react-router";

/**
 * Daily fleet sync trigger (called by the scheduler).
 * Public prefix, so the caller must present the project's anon key.
 */
export const Route = createFileRoute("/api/public/hooks/sync-fleet")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const expected =
          process.env["SUPABASE_PUBLISHABLE_KEY"] ?? process.env["SUPABASE_ANON_KEY"] ?? "";
        const provided =
          request.headers.get("apikey") ??
          request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ??
          "";

        if (!expected || provided !== expected) {
          return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
          });
        }

        const { runFleetSync } = await import("@/lib/fleet-sync.server");
        const result = await runFleetSync();
        return Response.json(result, { status: result.ok ? 200 : 500 });
      },
    },
  },
});
