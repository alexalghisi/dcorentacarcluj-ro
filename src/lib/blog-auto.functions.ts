import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { BlogPost } from "./blog";

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

type Row = {
  slug: string;
  title: string;
  meta_title: string;
  description: string;
  category: string;
  excerpt: string;
  reading_minutes: number;
  sections: unknown;
  faq: unknown;
  published_on: string;
};

const COLS = "slug,title,meta_title,description,category,excerpt,reading_minutes,sections,faq,published_on";

function toPost(r: Row): BlogPost {
  return {
    slug: r.slug,
    title: r.title,
    metaTitle: r.meta_title,
    description: r.description,
    date: r.published_on,
    readingMinutes: r.reading_minutes,
    category: r.category,
    excerpt: r.excerpt,
    sections: (r.sections as BlogPost["sections"]) ?? [],
    faq: (r.faq as BlogPost["faq"]) ?? [],
  };
}

/** Daily auto-written articles, newest first. */
export const listAutoPosts = createServerFn({ method: "GET" }).handler(async (): Promise<BlogPost[]> => {
  try {
    const { data } = await publicClient()
      .from("blog_auto_posts")
      .select(COLS)
      .order("published_on", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(500);
    return ((data ?? []) as Row[]).map(toPost);
  } catch {
    return [];
  }
});

export const getAutoPost = createServerFn({ method: "GET" })
  .inputValidator((d) => z.object({ slug: z.string().max(200) }).parse(d))
  .handler(async ({ data }): Promise<BlogPost | null> => {
    const { data: row } = await publicClient().from("blog_auto_posts").select(COLS).eq("slug", data.slug).maybeSingle();
    return row ? toPost(row as Row) : null;
  });
