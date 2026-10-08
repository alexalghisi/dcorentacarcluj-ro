import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { z } from "zod";
import { posts } from "./blog";

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1";
const MODEL = "openai/gpt-6-astra";
export const POSTS_PER_DAY = 3;

const FACTS = `Fapte reale despre firmă (folosește DOAR acestea, nu inventa altele):
- DCO Rent a Car Cluj, site dcorentacarcluj.ro, telefon/WhatsApp (0742) 925 934.
- Bază și predare personală în Gilău (aprox. 12 km de Cluj-Napoca, ~25 km de Aeroportul Cluj). Predare și la un punct stabilit telefonic în Cluj-Napoca sau Florești. NU există birou în aeroport sau în alte orașe.
- Tarife de la 70 lei/zi; tariful pe zi scade pentru închirieri lungi; prețul final se confirmă la telefon. Nu inventa alte prețuri.
- Fără garanție, fără card de credit. Acte: buletin/pașaport + permis valabil de minimum 1 an.
- RCA, ITP, rovinietă, AC, anvelope de sezon incluse.
- Flota: Škoda Fabia, Renault Clio Symbol (economice), VW Passat Break, Ford Focus Break, Renault Mégane Break (break-uri), Volvo S40, Citroën C5 (cutie automată), Volvo XC90 (7 locuri).
- Factură la cerere.`;

const PostSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]{8,90}$/),
  title: z.string().min(20).max(110),
  metaTitle: z.string().min(20).max(65),
  description: z.string().min(80).max(160),
  category: z.enum(["Ghid", "Sfaturi", "Rute", "Turism"]),
  excerpt: z.string().min(40).max(260),
  readingMinutes: z.number().int().min(3).max(12),
  sections: z
    .array(
      z.object({
        heading: z.string().min(5),
        paragraphs: z.array(z.string().min(40)).min(1).max(4),
        bullets: z.array(z.string()).max(8).optional(),
      }),
    )
    .min(4)
    .max(8),
  faq: z.array(z.object({ q: z.string(), a: z.string() })).min(2).max(5),
});

function today() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Bucharest" }).format(new Date());
}

/** Writes up to POSTS_PER_DAY new articles today. Safe to call repeatedly: it never exceeds the daily cap. */
export async function generateDailyPosts(): Promise<{ created: string[]; skipped: string }> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const day = today();

  const { count } = await supabaseAdmin
    .from("blog_auto_posts")
    .select("id", { count: "exact", head: true })
    .eq("published_on", day);
  const missing = POSTS_PER_DAY - (count ?? 0);
  if (missing <= 0) return { created: [], skipped: "Limita zilnică atinsă." };

  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) throw new Error("AI not configured");
  const provider = createOpenAI({
    baseURL: GATEWAY_URL,
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
  });

  const { data: existing } = await supabaseAdmin.from("blog_auto_posts").select("slug,title").limit(1000);
  const used = [...posts.map((p) => ({ slug: p.slug, title: p.title })), ...(existing ?? [])];
  const created: string[] = [];

  for (let i = 0; i < missing; i++) {
    const taken = [...used.map((u) => `- ${u.title} (${u.slug})`)].join("\n");
    const prompt = `${FACTS}

Articole deja publicate (NU repeta subiectul, alege un unghi clar diferit):
${taken}

Scrie UN articol nou de blog, în română corectă, cu diacritice, pentru oameni care caută închirieri auto în Cluj, Gilău, Florești sau județul Cluj (turiști, localnici, firme). Subiecte posibile: rute și excursii reale din județul Cluj și Transilvania, sfaturi de condus (iarnă, munte, autostradă A3, DN1), acte și reguli, alegerea mașinii, aeroport, evenimente/sezon, costuri de drum. Cuvântul-cheie principal (ex. „rent a car Cluj”, „închirieri auto Cluj”, „mașini de închiriat Cluj”) apare natural în titlu, prima secțiune și o întrebare FAQ, fără înghesuire.
Reguli: util și concret, 700–1000 de cuvinte în total; nu inventa prețuri, distanțe exacte nesigure, reguli locale nesigure sau recenzii — formulează aproximativ („aproximativ”, „verifică indicatorul”) când nu ești sigur; fără superlative false ca „cei mai buni din Cluj”; la final o secțiune scurtă despre cum închiriezi de la DCO.
Răspunde DOAR cu JSON valid, fără markdown, cu forma:
{"slug":"cuvinte-fara-diacritice","title":"...","metaTitle":"max 60 caractere","description":"120-155 caractere","category":"Ghid|Sfaturi|Rute|Turism","excerpt":"...","readingMinutes":6,"sections":[{"heading":"...","paragraphs":["..."],"bullets":["..."]}],"faq":[{"q":"...","a":"..."}]}`;

    try {
      const { text } = await generateText({
        model: provider.responses(MODEL),
        system: "Ești redactor SEO pentru o firmă mică și onestă de închirieri auto din Cluj.",
        prompt,
        maxRetries: 1,
        providerOptions: { openai: { store: false, reasoningEffort: "low" } },
      });
      const json = text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1);
      const p = PostSchema.parse(JSON.parse(json));
      let slug = p.slug;
      if (used.some((u) => u.slug === slug)) slug = `${slug}-${day}`;
      const { error } = await supabaseAdmin.from("blog_auto_posts").insert({
        slug,
        title: p.title,
        meta_title: p.metaTitle,
        description: p.description,
        category: p.category,
        excerpt: p.excerpt,
        reading_minutes: p.readingMinutes,
        sections: p.sections,
        faq: p.faq,
        published_on: day,
      });
      if (!error) {
        created.push(slug);
        used.push({ slug, title: p.title });
      }
    } catch (e) {
      console.error("blog auto post failed", e);
    }
  }
  return { created, skipped: "" };
}
