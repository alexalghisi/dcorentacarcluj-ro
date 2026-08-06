ALTER TABLE public.vehicles
  ADD COLUMN IF NOT EXISTS source_key text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS synced_at timestamp with time zone,
  ADD COLUMN IF NOT EXISTS manual_lock boolean NOT NULL DEFAULT false;

CREATE INDEX IF NOT EXISTS vehicles_source_key_idx ON public.vehicles (source_key) WHERE source_key <> '';

CREATE TABLE IF NOT EXISTS public.fleet_sync_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ran_at timestamp with time zone NOT NULL DEFAULT now(),
  status text NOT NULL DEFAULT 'ok',
  found integer NOT NULL DEFAULT 0,
  created integer NOT NULL DEFAULT 0,
  updated integer NOT NULL DEFAULT 0,
  skipped integer NOT NULL DEFAULT 0,
  message text NOT NULL DEFAULT '',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT ALL ON public.fleet_sync_runs TO service_role;

ALTER TABLE public.fleet_sync_runs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Block client reads on fleet sync runs"
  ON public.fleet_sync_runs FOR SELECT TO anon, authenticated USING (false);
CREATE POLICY "Block client inserts on fleet sync runs"
  ON public.fleet_sync_runs AS RESTRICTIVE FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY "Block client updates on fleet sync runs"
  ON public.fleet_sync_runs AS RESTRICTIVE FOR UPDATE TO anon, authenticated USING (false) WITH CHECK (false);
CREATE POLICY "Block client deletes on fleet sync runs"
  ON public.fleet_sync_runs AS RESTRICTIVE FOR DELETE TO anon, authenticated USING (false);

CREATE TRIGGER update_fleet_sync_runs_updated_at
  BEFORE UPDATE ON public.fleet_sync_runs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();