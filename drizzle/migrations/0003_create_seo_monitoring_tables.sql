CREATE TABLE public.seo_keywords (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  keyword TEXT NOT NULL,
  locality TEXT NOT NULL DEFAULT 'Cluj',
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (keyword, locality)
);
GRANT SELECT ON public.seo_keywords TO authenticated;
GRANT ALL ON public.seo_keywords TO service_role;
ALTER TABLE public.seo_keywords ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.serp_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  keyword_id UUID NOT NULL REFERENCES public.seo_keywords(id) ON DELETE CASCADE,
  checked_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  our_position INTEGER,
  our_url TEXT,
  competitors JSONB NOT NULL DEFAULT '[]'::jsonb
);
GRANT SELECT ON public.serp_snapshots TO authenticated;
GRANT ALL ON public.serp_snapshots TO service_role;
ALTER TABLE public.serp_snapshots ENABLE ROW LEVEL SECURITY;
CREATE INDEX serp_snapshots_keyword_date ON public.serp_snapshots (keyword_id, checked_at DESC);

CREATE TABLE public.serp_changes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  keyword_id UUID NOT NULL REFERENCES public.seo_keywords(id) ON DELETE CASCADE,
  detected_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  change_type TEXT NOT NULL,
  details JSONB NOT NULL DEFAULT '{}'::jsonb
);
GRANT SELECT ON public.serp_changes TO authenticated;
GRANT ALL ON public.serp_changes TO service_role;
ALTER TABLE public.serp_changes ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.gsc_page_daily (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page TEXT NOT NULL,
  date DATE NOT NULL,
  clicks INTEGER NOT NULL DEFAULT 0,
  impressions INTEGER NOT NULL DEFAULT 0,
  ctr NUMERIC(6,4) NOT NULL DEFAULT 0,
  position NUMERIC(6,2) NOT NULL DEFAULT 0,
  UNIQUE (page, date)
);
GRANT SELECT ON public.gsc_page_daily TO authenticated;
GRANT ALL ON public.gsc_page_daily TO service_role;
ALTER TABLE public.gsc_page_daily ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.seo_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page TEXT,
  keyword TEXT,
  recommendation TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  decided_at TIMESTAMPTZ
);
GRANT SELECT, UPDATE ON public.seo_recommendations TO authenticated;
GRANT ALL ON public.seo_recommendations TO service_role;
ALTER TABLE public.seo_recommendations ENABLE ROW LEVEL SECURITY;

INSERT INTO public.seo_keywords (keyword, locality) VALUES
  ('rent a car cluj', 'Cluj-Napoca'),
  ('cluj rent a car', 'Cluj-Napoca'),
  ('car rental cluj napoca', 'Cluj-Napoca'),
  ('rent a car cluj napoca', 'Cluj-Napoca'),
  ('inchirieri auto cluj', 'Cluj-Napoca'),
  ('masini de inchiriat cluj', 'Cluj-Napoca'),
  ('rent a car gilau', 'Gilău'),
  ('inchirieri auto gilau', 'Gilău'),
  ('rent a car floresti', 'Florești'),
  ('inchirieri auto floresti', 'Florești'),
  ('rent a car aeroport cluj', 'Aeroport Cluj'),
  ('rent a car cluj fara garantie', 'Cluj-Napoca');