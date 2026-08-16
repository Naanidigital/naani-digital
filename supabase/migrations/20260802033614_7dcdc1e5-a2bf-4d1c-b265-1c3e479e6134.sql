-- 1. Private table for submitter PII
CREATE TABLE public.project_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL,
  submitter_name text,
  submitter_phone text NOT NULL,
  submitter_email text,
  submitter_whatsapp text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.project_submissions TO anon, authenticated;
GRANT ALL ON public.project_submissions TO service_role;

ALTER TABLE public.project_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact details"
  ON public.project_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (submitter_phone IS NOT NULL);

CREATE TRIGGER project_submissions_set_updated_at
  BEFORE UPDATE ON public.project_submissions
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 2. Migrate existing PII then drop the public columns
INSERT INTO public.project_submissions (project_id, submitter_name, submitter_phone, submitter_email, submitter_whatsapp, created_at)
SELECT id, submitter_name, coalesce(submitter_phone, 'unknown'), submitter_email, submitter_whatsapp, coalesce(submitted_at, now())
FROM public.projects
WHERE submitter_phone IS NOT NULL OR submitter_email IS NOT NULL OR submitter_name IS NOT NULL OR submitter_whatsapp IS NOT NULL;

DROP POLICY IF EXISTS "Anyone can submit a pending property" ON public.projects;

ALTER TABLE public.projects
  DROP COLUMN submitter_name,
  DROP COLUMN submitter_phone,
  DROP COLUMN submitter_email,
  DROP COLUMN submitter_whatsapp;

CREATE POLICY "Anyone can submit a pending property"
  ON public.projects FOR INSERT
  TO anon, authenticated
  WITH CHECK (publish_status = 'pending' AND source IS NOT NULL AND featured IS NOT TRUE);

-- 3. Tighten storage uploads
DROP POLICY IF EXISTS "Scoped submissions upload property-media" ON storage.objects;

CREATE POLICY "Scoped submissions upload property-media"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    bucket_id = 'property-media'
    AND (storage.foldername(name))[1] = 'submissions'
    AND array_length(storage.foldername(name), 1) BETWEEN 3 AND 4
    AND lower(storage.extension(name)) = ANY (ARRAY['jpg','jpeg','png','webp','gif','pdf'])
  );