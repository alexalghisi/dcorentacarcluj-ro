-- 1. Remove the permissive public SELECT policy on the base table
DROP POLICY IF EXISTS "Public can read booking availability only" ON public.vehicle_bookings;

CREATE POLICY "No direct client reads on bookings"
  ON public.vehicle_bookings FOR SELECT
  TO anon, authenticated
  USING (false);

-- 2. Revoke every column-level and table-level privilege from public roles
REVOKE ALL ON public.vehicle_bookings FROM anon, authenticated;
GRANT ALL ON public.vehicle_bookings TO service_role;

-- 3. Availability view runs with owner rights so it can still read the busy ranges
DROP VIEW IF EXISTS public.vehicle_availability;
CREATE VIEW public.vehicle_availability
WITH (security_invoker = off) AS
  SELECT vehicle_id, start_date, end_date
  FROM public.vehicle_bookings;

GRANT SELECT ON public.vehicle_availability TO anon, authenticated, service_role;