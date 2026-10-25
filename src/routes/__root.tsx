import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  useRouterState,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { ServiceSuspended } from "../components/ServiceSuspended";
import { ADSENSE_ACCOUNT, ADSENSE_SCRIPT } from "@/lib/advertising";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: unknown; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "google-adsense-account", content: ADSENSE_ACCOUNT },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "DCO Rent a Car Cluj — Mașini de închiriat Gilău & Florești" },
      {
        name: "description",
        content:
          "Rent a car Cluj: închirieri auto Cluj-Napoca, Gilău și Florești de la 70 lei/zi. Mașini de închiriat fără garanție, cu predare personală. Sună (0742) 925 934.",
      },
      { property: "og:site_name", content: "DCO Rent a Car Cluj" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "ro_RO" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0f172a" },
      { name: "msapplication-TileColor", content: "#0f172a" },
      { name: "msapplication-TileImage", content: "/favicon.png?v=4" },
      { name: "format-detection", content: "telephone=yes" },
      { name: "referrer", content: "strict-origin-when-cross-origin" },
      { name: "geo.region", content: "RO-CJ" },
      { name: "geo.placename", content: "Gilău, Cluj-Napoca, Florești" },
      { name: "ICBM", content: "46.7469, 23.3736" },
      { name: "geo.position", content: "46.7469;23.3736" },
      {
        name: "google-site-verification",
        content: "UW2UIJZUQUMespjpb7XSUv84mQrN6bldqmX99sOYRUY",
      },
    ],
    scripts: [
      { src: ADSENSE_SCRIPT, async: true, crossOrigin: "anonymous" },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "DCO Rent a Car Cluj",
          "@id": "https://dcorentacarcluj.ro#website",
          url: "https://dcorentacarcluj.ro",
          inLanguage: "ro-RO",
        }),
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "manifest", href: "/manifest.json" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "dns-prefetch", href: "https://www.google.com" },
      { rel: "dns-prefetch", href: "https://maps.googleapis.com" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Manrope:wght@400;500;600;700&display=swap",
      },
      { rel: "icon", type: "image/png", sizes: "64x64", href: "/favicon.png?v=4" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/favicon.png?v=4" },
      { rel: "shortcut icon", href: "/favicon.png?v=4" },
      { rel: "shortlink", href: "https://dcorentacarcluj.ro/" },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

/** Pages whose content is in English (see lang: "en" in src/lib/locations.ts). */
const EN_PATHS = new Set(["/car-rental-cluj", "/car-rental-cluj-napoca"]);

function RootShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const lang = EN_PATHS.has(pathname.replace(/\/+$/, "")) ? "en" : "ro";
  return (
    <html lang={lang}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

// Site activ. Pentru suspendare temporară, setează SITE_SUSPENDED = true.
const SITE_SUSPENDED = false;

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    import("../lib/conversions").then((m) => {
      cleanup = m.initConversionTracking(
        import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY"] as string | undefined,
      );
    });
    return () => cleanup?.();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      {SITE_SUSPENDED ? <ServiceSuspended /> : <Outlet />}
      {!SITE_SUSPENDED && <WhatsAppButton />}
    </QueryClientProvider>
  );
}

const WHATSAPP_URL =
  "https://wa.me/40742925934?text=" +
  encodeURIComponent("Bună ziua, aș dori o mașină de închiriat în perioada ");

/** Floating click-to-chat button, shown on every public page. */
function WhatsAppButton() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname.startsWith("/admin")) return null;
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Scrie-ne pe WhatsApp"
      className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
        <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36a9.39 9.39 0 0 1-1.44-5.01c0-5.2 4.23-9.43 9.44-9.43 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.23 9.43-9.44 9.43zm8.03-17.46A11.27 11.27 0 0 0 12.05.72C5.79.72.7 5.81.7 12.07c0 2 .52 3.95 1.52 5.67L.6 23.28l5.67-1.49a11.3 11.3 0 0 0 5.78 1.47h.01c6.26 0 11.35-5.09 11.35-11.35 0-3.03-1.18-5.88-3.33-8.02z" />
      </svg>
      <span>WhatsApp</span>
    </a>
  );
}
