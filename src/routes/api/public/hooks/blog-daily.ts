import { createFileRoute } from "@tanstack/react-router";

/**
 * Daily blog writer, called by the scheduled job.
 * Auto-publishing is switched off: mass-generated posts risk a Google
 * "scaled content" penalty for the whole domain. Posts are now written by hand
 * and published from the admin. Set AUTO_PUBLISH = true only to re-enable.
 */
const AUTO_PUBLISH = false;

export const Route = createFileRoute("/api/public/hooks/blog-daily")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const token = request.headers.get("authorization")?.replace("Bearer ", "");
        if (!token) return new Response("Unauthorized", { status: 401 });
        if (!AUTO_PUBLISH) return Response.json({ ok: true, skipped: "auto-publish disabled" });
        const { generateDailyPosts } = await import("@/lib/blog-auto.server");
        try {
          const result = await generateDailyPosts();
          return Response.json({ ok: true, ...result });
        } catch (e) {
          console.error(e);
          return Response.json({ ok: false }, { status: 500 });
        }
      },
    },
  },
});
