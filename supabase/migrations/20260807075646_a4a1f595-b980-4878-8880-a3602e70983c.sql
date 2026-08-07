DROP POLICY IF EXISTS "Public can read availability columns only" ON public.vehicle_bookings;

CREATE POLICY "Block client reads on bookings"
ON public.vehicle_bookings
FOR SELECT
TO anon, authenticated
USING (false);

REVOKE ALL ON public.vehicle_bookings FROM anon, authenticated;

ALTER VIEW public.vehicle_availability SET (security_invoker = off);
GRANT SELECT ON public.vehicle_availability TO anon, authenticated;