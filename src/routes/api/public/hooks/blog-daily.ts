import { createFileRoute } from "@tanstack/react-router";

/** Daily blog writer, called by the scheduled job. Capped per day, so repeated calls add nothing. */
export const Route = createFileRoute("/api/public/hooks/blog-daily")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const token = request.headers.get("authorization")?.replace("Bearer ", "");
        if (!token) return new Response("Unauthorized", { status: 401 });
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
