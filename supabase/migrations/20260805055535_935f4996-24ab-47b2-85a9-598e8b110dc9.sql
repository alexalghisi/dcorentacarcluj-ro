CREATE TABLE public.vehicle_bookings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  vehicle_id uuid NOT NULL REFERENCES public.vehicles(id) ON DELETE CASCADE,
  start_date date NOT NULL,
  end_date date NOT NULL,
  customer_name text NOT NULL DEFAULT '',
  customer_phone text NOT NULL DEFAULT '',
  note text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'confirmed',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT vehicle_bookings_dates_check CHECK (end_date >= start_date),
  CONSTRAINT vehicle_bookings_status_check CHECK (status IN ('confirmed','option','blocked'))
);

CREATE INDEX vehicle_bookings_vehicle_range_idx ON public.vehicle_bookings (vehicle_id, start_date, end_date);

GRANT SELECT ON public.vehicle_bookings TO anon;
GRANT SELECT ON public.vehicle_bookings TO authenticated;
GRANT ALL ON public.vehicle_bookings TO service_role;

ALTER TABLE public.vehicle_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Booking periods are publicly readable"
  ON public.vehicle_bookings FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Block client inserts on bookings"
  ON public.vehicle_bookings AS RESTRICTIVE FOR INSERT
  TO anon, authenticated
  WITH CHECK (false);

CREATE POLICY "Block client updates on bookings"
  ON public.vehicle_bookings AS RESTRICTIVE FOR UPDATE
  TO anon, authenticated
  USING (false) WITH CHECK (false);

CREATE POLICY "Block client deletes on bookings"
  ON public.vehicle_bookings AS RESTRICTIVE FOR DELETE
  TO anon, authenticated
  USING (false);

CREATE TRIGGER update_vehicle_bookings_updated_at
  BEFORE UPDATE ON public.vehicle_bookings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.vehicle_bookings_no_overlap()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM public.vehicle_bookings b
    WHERE b.vehicle_id = NEW.vehicle_id
      AND b.id <> COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::uuid)
      AND NEW.start_date <= b.end_date
      AND NEW.end_date >= b.start_date
  ) THEN
    RAISE EXCEPTION 'Perioada se suprapune cu o rezervare existenta pentru aceasta masina';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER vehicle_bookings_no_overlap_trg
  BEFORE INSERT OR UPDATE ON public.vehicle_bookings
  FOR EACH ROW EXECUTE FUNCTION public.vehicle_bookings_no_overlap();