const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";
const TARGET_URL = "https://dcorentacarcluj.ro/";

export interface SearchConsoleRow {
  key: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface SearchConsoleStats {
  available: boolean;
  message?: string;
  property?: string;
  startDate?: string;
  endDate?: string;
  totals?: { clicks: number; impressions: number; ctr: number; position: number };
  queries?: SearchConsoleRow[];
  pages?: SearchConsoleRow[];
}

function headers() {
  const lovableApiKey = process.env["LOVABLE_API_KEY"];
  const connectionApiKey = process.env["GOOGLE_SEARCH_CONSOLE_API_KEY"];
  if (!lovableApiKey || !connectionApiKey) return null;
  return {
    Authorization: `Bearer ${lovableApiKey}`,
    "X-Connection-Api-Key": connectionApiKey,
    "Content-Type": "application/json",
  };
}

function coversTarget(siteUrl: string, target: URL) {
  if (siteUrl.startsWith("sc-domain:")) {
    const domain = siteUrl.slice("sc-domain:".length).toLowerCase();
    const host = target.hostname.toLowerCase();
    return host === domain || host.endsWith(`.${domain}`);
  }
  try {
    const prefix = new URL(siteUrl);
    return target.href.startsWith(prefix.href);
  } catch {
    return false;
  }
}

function isoDaysAgo(days: number) {
  const d = new Date(Date.now() - days * 86_400_000);
  return d.toISOString().slice(0, 10);
}

async function query(
  h: Record<string, string>,
  siteUrl: string,
  body: Record<string, unknown>,
) {
  const res = await fetch(
    `${GATEWAY}/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
    { method: "POST", headers: h, body: JSON.stringify(body) },
  );
  if (!res.ok) {
    const text = await res.text();
    console.error(`Search Console query failed [${res.status}]: ${text}`);
    throw new Error(`Search Console query failed [${res.status}]: ${text}`);
  }
  return (await res.json()) as {
    rows?: { keys?: string[]; clicks: number; impressions: number; ctr: number; position: number }[];
  };
}

function mapRows(rows: NonNullable<Awaited<ReturnType<typeof query>>["rows"]>): SearchConsoleRow[] {
  return rows.map((r) => ({
    key: r.keys?.[0] ?? "",
    clicks: r.clicks,
    impressions: r.impressions,
    ctr: r.ctr,
    position: r.position,
  }));
}

/** Reads real Google Search Console performance for the site's verified property. */
export async function fetchSearchConsoleStats(): Promise<SearchConsoleStats> {
  const h = headers();
  if (!h) {
    return { available: false, message: "Conexiunea Google Search Console nu este configurată." };
  }

  try {
    const sitesRes = await fetch(`${GATEWAY}/webmasters/v3/sites`, { headers: h });
    if (!sitesRes.ok) {
      const text = await sitesRes.text();
      console.error(`Search Console sites failed [${sitesRes.status}]: ${text}`);
      return { available: false, message: "Nu am putut citi proprietățile din Search Console." };
    }
    const { siteEntry = [] } = (await sitesRes.json()) as {
      siteEntry?: { siteUrl: string; permissionLevel?: string }[];
    };
    const target = new URL(TARGET_URL);
    const matches = siteEntry.filter(
      (e) => e.permissionLevel !== "siteUnverifiedUser" && coversTarget(e.siteUrl, target),
    );
    if (matches.length === 0) {
      return {
        available: false,
        message: "Nicio proprietate verificată din Search Console nu acoperă acest domeniu.",
      };
    }
    const siteUrl = matches[0]!.siteUrl;

    const startDate = isoDaysAgo(30);
    const endDate = isoDaysAgo(2);
    const range = { startDate, endDate };

    const [totalsRes, queriesRes, pagesRes] = await Promise.all([
      query(h, siteUrl, { ...range }),
      query(h, siteUrl, { ...range, dimensions: ["query"], rowLimit: 15 }),
      query(h, siteUrl, { ...range, dimensions: ["page"], rowLimit: 15 }),
    ]);

    const t = totalsRes.rows?.[0];
    return {
      available: true,
      property: siteUrl,
      startDate,
      endDate,
      totals: {
        clicks: t?.clicks ?? 0,
        impressions: t?.impressions ?? 0,
        ctr: t?.ctr ?? 0,
        position: t?.position ?? 0,
      },
      queries: mapRows(queriesRes.rows ?? []),
      pages: mapRows(pagesRes.rows ?? []),
    };
  } catch (error) {
    console.error("Search Console stats error", error);
    return {
      available: false,
      message: "Datele din Search Console nu sunt disponibile momentan.",
    };
  }
}
