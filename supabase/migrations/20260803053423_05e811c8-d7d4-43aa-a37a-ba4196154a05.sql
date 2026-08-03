REVOKE ALL ON FUNCTION public.increment_site_metric(text, integer) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.increment_vehicle_view(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.increment_site_metric(text, integer) TO service_role;
GRANT EXECUTE ON FUNCTION public.increment_vehicle_view(uuid) TO service_role;