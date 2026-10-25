import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/vehicle-image/$")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const path = decodeURIComponent(params._splat ?? "");
        if (!path || path.includes("..")) {
          return new Response("Not found", { status: 404 });
        }

        const { downloadVehicleImage } = await import("@/lib/admin.server");
        const { data, error } = await downloadVehicleImage(path);
        if (error || !data) {
          return new Response("Not found", { status: 404 });
        }

        return new Response(await data.arrayBuffer(), {
          headers: {
            "content-type": data.type || "image/jpeg",
            "cache-control": "public, max-age=604800, s-maxage=2592000, stale-while-revalidate=2592000",
          },
        });
      },
    },
  },
});
