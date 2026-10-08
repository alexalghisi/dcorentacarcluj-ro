CREATE TABLE public.blog_auto_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  meta_title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL DEFAULT 'Ghid',
  excerpt text NOT NULL,
  reading_minutes int NOT NULL DEFAULT 5,
  sections jsonb NOT NULL,
  faq jsonb NOT NULL DEFAULT '[]'::jsonb,
  published_on date NOT NULL DEFAULT (now() AT TIME ZONE 'Europe/Bucharest')::date,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.blog_auto_posts TO anon, authenticated;
GRANT ALL ON public.blog_auto_posts TO service_role;
ALTER TABLE public.blog_auto_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read blog posts" ON public.blog_auto_posts FOR SELECT TO anon, authenticated USING (true);
CREATE INDEX blog_auto_posts_published_idx ON public.blog_auto_posts (published_on DESC);