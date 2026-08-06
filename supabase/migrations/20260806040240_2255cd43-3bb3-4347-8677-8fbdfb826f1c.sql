ALTER VIEW public.vehicle_availability SET (security_invoker = true);

CREATE POLICY "Public can read booking availability only"
ON public.vehicle_bookings
FOR SELECT
TO anon, authenticated
USING (true);

GRANT SELECT (vehicle_id, start_date, end_date) ON public.vehicle_bookings TO anon, authenticated;