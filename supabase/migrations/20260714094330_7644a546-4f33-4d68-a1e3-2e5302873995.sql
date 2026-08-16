
-- 1) Column-level revoke of submitter PII from public API roles
REVOKE SELECT (submitter_name, submitter_phone, submitter_email, submitter_whatsapp)
  ON public.projects FROM anon, authenticated;

-- 2) Storage: drop overly-broad read policy (signed URLs bypass RLS via service role)
DROP POLICY IF EXISTS "Public read property-media" ON storage.objects;

-- 3) Storage: replace unrestricted upload policy with scoped, extension-limited one
DROP POLICY IF EXISTS "Public upload property-media" ON storage.objects;

CREATE POLICY "Scoped submissions upload property-media"
  ON storage.objects
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    bucket_id = 'property-media'
    AND lower(storage.extension(name)) = ANY (
      ARRAY['jpg','jpeg','png','webp','gif','pdf']
    )
  );
