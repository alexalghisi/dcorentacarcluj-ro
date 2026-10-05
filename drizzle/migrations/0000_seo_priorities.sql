CREATE TABLE public.seo_priorities (
  day date PRIMARY KEY,
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.seo_priorities TO service_role;
ALTER TABLE public.seo_priorities ENABLE ROW LEVEL SECURITY;