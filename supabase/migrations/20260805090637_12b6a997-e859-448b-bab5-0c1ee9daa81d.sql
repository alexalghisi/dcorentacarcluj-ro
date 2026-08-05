DROP POLICY IF EXISTS "Booking periods are publicly readable" ON public.vehicle_bookings;

REVOKE SELECT ON public.vehicle_bookings FROM anon, authenticated;
GRANT ALL ON public.vehicle_bookings TO service_role;

CREATE OR REPLACE VIEW public.vehicle_availability
WITH (security_invoker = false) AS
SELECT vehicle_id, start_date, end_date
FROM public.vehicle_bookings;

GRANT SELECT ON public.vehicle_availability TO anon, authenticated, service_role;