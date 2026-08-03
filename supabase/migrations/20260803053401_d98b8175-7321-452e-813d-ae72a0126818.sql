ALTER TABLE public.vehicles ADD COLUMN IF NOT EXISTS view_count integer NOT NULL DEFAULT 0;

CREATE TABLE IF NOT EXISTS public.site_metrics (
  key text PRIMARY KEY,
  value bigint NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.site_metrics TO anon;
GRANT SELECT ON public.site_metrics TO authenticated;
GRANT ALL ON public.site_metrics TO service_role;

ALTER TABLE public.site_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Site metrics are publicly readable"
ON public.site_metrics FOR SELECT TO anon, authenticated USING (true);

CREATE TRIGGER update_site_metrics_updated_at
BEFORE UPDATE ON public.site_metrics
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.site_metrics (key, value) VALUES ('site_views', 0)
ON CONFLICT (key) DO NOTHING;

CREATE OR REPLACE FUNCTION public.increment_site_metric(_key text, _delta integer DEFAULT 1)
RETURNS bigint
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _value bigint;
BEGIN
  INSERT INTO public.site_metrics (key, value)
  VALUES (_key, greatest(_delta, 0))
  ON CONFLICT (key) DO UPDATE SET value = public.site_metrics.value + greatest(_delta, 0)
  RETURNING value INTO _value;
  RETURN _value;
END;
$$;

CREATE OR REPLACE FUNCTION public.increment_vehicle_view(_id uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _value integer;
BEGIN
  UPDATE public.vehicles SET view_count = view_count + 1
  WHERE id = _id
  RETURNING view_count INTO _value;
  RETURN coalesce(_value, 0);
END;
$$;

GRANT EXECUTE ON FUNCTION public.increment_site_metric(text, integer) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.increment_vehicle_view(uuid) TO anon, authenticated, service_role;