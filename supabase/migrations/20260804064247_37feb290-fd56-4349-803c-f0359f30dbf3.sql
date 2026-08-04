-- 1. Vehicles: explicitly deny all writes to anon/authenticated (admin panel uses service role, which bypasses RLS)
REVOKE INSERT, UPDATE, DELETE ON public.vehicles FROM anon, authenticated;
GRANT SELECT ON public.vehicles TO anon, authenticated;
GRANT ALL ON public.vehicles TO service_role;

DROP POLICY IF EXISTS "Block client inserts on vehicles" ON public.vehicles;
CREATE POLICY "Block client inserts on vehicles" ON public.vehicles
  AS RESTRICTIVE FOR INSERT TO anon, authenticated WITH CHECK (false);

DROP POLICY IF EXISTS "Block client updates on vehicles" ON public.vehicles;
CREATE POLICY "Block client updates on vehicles" ON public.vehicles
  AS RESTRICTIVE FOR UPDATE TO anon, authenticated USING (false) WITH CHECK (false);

DROP POLICY IF EXISTS "Block client deletes on vehicles" ON public.vehicles;
CREATE POLICY "Block client deletes on vehicles" ON public.vehicles
  AS RESTRICTIVE FOR DELETE TO anon, authenticated USING (false);

-- 2. Site metrics: reads stay public, writes go through the security-definer counter / service role
REVOKE INSERT, UPDATE, DELETE ON public.site_metrics FROM anon, authenticated;
GRANT SELECT ON public.site_metrics TO anon, authenticated;
GRANT ALL ON public.site_metrics TO service_role;

DROP POLICY IF EXISTS "Block client inserts on site metrics" ON public.site_metrics;
CREATE POLICY "Block client inserts on site metrics" ON public.site_metrics
  AS RESTRICTIVE FOR INSERT TO anon, authenticated WITH CHECK (false);

DROP POLICY IF EXISTS "Block client updates on site metrics" ON public.site_metrics;
CREATE POLICY "Block client updates on site metrics" ON public.site_metrics
  AS RESTRICTIVE FOR UPDATE TO anon, authenticated USING (false) WITH CHECK (false);

DROP POLICY IF EXISTS "Block client deletes on site metrics" ON public.site_metrics;
CREATE POLICY "Block client deletes on site metrics" ON public.site_metrics
  AS RESTRICTIVE FOR DELETE TO anon, authenticated USING (false);

-- 3. Storage: explicit policies for the private 'vehicles' bucket.
--    Images are served through a server route using the service role, so no client access is needed.
DROP POLICY IF EXISTS "Vehicles bucket is not client readable" ON storage.objects;
CREATE POLICY "Vehicles bucket is not client readable" ON storage.objects
  AS RESTRICTIVE FOR SELECT TO anon, authenticated
  USING (bucket_id <> 'vehicles');

DROP POLICY IF EXISTS "Vehicles bucket blocks client uploads" ON storage.objects;
CREATE POLICY "Vehicles bucket blocks client uploads" ON storage.objects
  AS RESTRICTIVE FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id <> 'vehicles');

DROP POLICY IF EXISTS "Vehicles bucket blocks client updates" ON storage.objects;
CREATE POLICY "Vehicles bucket blocks client updates" ON storage.objects
  AS RESTRICTIVE FOR UPDATE TO anon, authenticated
  USING (bucket_id <> 'vehicles') WITH CHECK (bucket_id <> 'vehicles');

DROP POLICY IF EXISTS "Vehicles bucket blocks client deletes" ON storage.objects;
CREATE POLICY "Vehicles bucket blocks client deletes" ON storage.objects
  AS RESTRICTIVE FOR DELETE TO anon, authenticated
  USING (bucket_id <> 'vehicles');