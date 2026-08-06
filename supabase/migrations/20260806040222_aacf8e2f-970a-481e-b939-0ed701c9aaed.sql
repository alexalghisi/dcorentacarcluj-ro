DROP POLICY IF EXISTS "Public can read booking availability only" ON public.vehicle_bookings;

REVOKE SELECT ON public.vehicle_bookings FROM anon, authenticated;

ALTER VIEW public.vehicle_availability SET (security_invoker = false, security_barrier = true);

GRANT SELECT ON public.vehicle_availability TO anon, authenticated;