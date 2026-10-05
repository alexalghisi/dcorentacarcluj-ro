CREATE TABLE public.vehicle_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL UNIQUE REFERENCES public.vehicle_bookings(id) ON DELETE CASCADE,
  vehicle_id uuid NOT NULL REFERENCES public.vehicles(id) ON DELETE CASCADE,
  token text NOT NULL UNIQUE,
  author text NOT NULL DEFAULT '',
  rating integer,
  comment text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'invited',
  submitted_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.vehicle_reviews TO service_role;
ALTER TABLE public.vehicle_reviews ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER update_vehicle_reviews_updated_at BEFORE UPDATE ON public.vehicle_reviews
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();