CREATE TABLE IF NOT EXISTS public.upload_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.upload_tickets TO anon, authenticated;
GRANT ALL ON public.upload_tickets TO service_role;

ALTER TABLE public.upload_tickets ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can create an upload ticket" ON public.upload_tickets;
CREATE POLICY "Anyone can create an upload ticket"
ON public.upload_tickets FOR INSERT TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can read upload tickets" ON public.upload_tickets;
CREATE POLICY "Admins can read upload tickets"
ON public.upload_tickets FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.is_valid_upload_ticket(_ticket text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.upload_tickets t
    WHERE _ticket ~ '^[0-9a-f-]{36}$'
      AND t.id = _ticket::uuid
      AND t.created_at > now() - interval '2 hours'
  )
$$;

REVOKE ALL ON FUNCTION public.is_valid_upload_ticket(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_valid_upload_ticket(text) TO anon, authenticated, service_role;

DROP POLICY IF EXISTS "Scoped submissions upload property-media" ON storage.objects;
CREATE POLICY "Ticketed submissions upload property-media"
ON storage.objects FOR INSERT TO anon, authenticated
WITH CHECK (
  bucket_id = 'property-media'
  AND (storage.foldername(name))[1] = 'submissions'
  AND array_length(storage.foldername(name), 1) BETWEEN 3 AND 4
  AND public.is_valid_upload_ticket((storage.foldername(name))[2])
  AND lower(storage.extension(name)) = ANY (ARRAY['jpg','jpeg','png','webp','gif','pdf'])
);