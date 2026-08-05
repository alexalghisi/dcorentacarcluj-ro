CREATE OR REPLACE VIEW public.vehicle_availability
WITH (security_invoker = true) AS
SELECT vehicle_id, start_date, end_date
FROM public.vehicle_bookings;

GRANT SELECT (vehicle_id, start_date, end_date) ON public.vehicle_bookings TO anon, authenticated;
GRANT SELECT ON public.vehicle_availability TO anon, authenticated, service_role;

CREATE POLICY "Public can read booking availability only"
ON public.vehicle_bookings
FOR SELECT
TO anon, authenticated
USING (true);