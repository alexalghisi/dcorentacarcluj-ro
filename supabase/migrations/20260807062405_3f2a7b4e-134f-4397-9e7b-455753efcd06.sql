DROP VIEW IF EXISTS public.vehicle_availability;
CREATE VIEW public.vehicle_availability
WITH (security_invoker = on) AS
  SELECT vehicle_id, start_date, end_date
  FROM public.vehicle_bookings;

GRANT SELECT ON public.vehicle_availability TO anon, authenticated, service_role;

-- Allow row access, but only for the three non-sensitive columns
DROP POLICY IF EXISTS "No direct client reads on bookings" ON public.vehicle_bookings;
CREATE POLICY "Public can read availability columns only"
  ON public.vehicle_bookings FOR SELECT
  TO anon, authenticated
  USING (true);

REVOKE ALL ON public.vehicle_bookings FROM anon, authenticated;
GRANT SELECT (vehicle_id, start_date, end_date) ON public.vehicle_bookings TO anon, authenticated;
GRANT ALL ON public.vehicle_bookings TO service_role;