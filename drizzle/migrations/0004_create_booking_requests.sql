CREATE TABLE public.booking_requests (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 vehicle_id uuid NOT NULL REFERENCES public.vehicles(id),
 customer_name text NOT NULL CHECK (char_length(customer_name) BETWEEN 1 AND 120),
 customer_email text NOT NULL CHECK (char_length(customer_email) <= 255),
 customer_phone text NOT NULL CHECK (char_length(customer_phone) BETWEEN 6 AND 40),
 start_date date NOT NULL,
 start_time time NOT NULL,
 end_date date NOT NULL,
 end_time time NOT NULL,
 pickup_location text NOT NULL DEFAULT '' CHECK (char_length(pickup_location) <= 200),
 note text NOT NULL DEFAULT '' CHECK (char_length(note) <= 600),
 status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','declined')),
 created_at timestamptz NOT NULL DEFAULT now(),
 CHECK (end_date + end_time > start_date + start_time)
);
GRANT ALL ON public.booking_requests TO service_role;
ALTER TABLE public.booking_requests ENABLE ROW LEVEL SECURITY;
CREATE INDEX booking_requests_email_created ON public.booking_requests(customer_email, created_at);
CREATE OR REPLACE FUNCTION public.validate_booking_request() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
 PERFORM pg_advisory_xact_lock(hashtextextended(lower(NEW.customer_email), 0));
 IF NEW.start_date + NEW.start_time <= (now() AT TIME ZONE 'Europe/Bucharest') THEN
 RAISE EXCEPTION 'booking_in_past';
 END IF;
 IF (SELECT count(*) FROM public.booking_requests WHERE lower(customer_email) = lower(NEW.customer_email) AND created_at > now() - interval '1 hour') >= 3 THEN
 RAISE EXCEPTION 'booking_rate_limit';
 END IF;
 RETURN NEW;
END;
$$;
CREATE TRIGGER validate_booking_request BEFORE INSERT ON public.booking_requests FOR EACH ROW EXECUTE FUNCTION public.validate_booking_request();