
-- Phase 2: Property Publishing Engine
-- Extend projects table with publishing pipeline + submitter metadata.
-- We use publish_status (NOT status) to avoid clobbering the existing
-- construction-status column ("Ready" / "Under Construction" / "Pre-Launch").

ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS publish_status text NOT NULL DEFAULT 'published',
  ADD COLUMN IF NOT EXISTS submitter_name text,
  ADD COLUMN IF NOT EXISTS submitter_phone text,
  ADD COLUMN IF NOT EXISTS submitter_email text,
  ADD COLUMN IF NOT EXISTS submitter_whatsapp text,
  ADD COLUMN IF NOT EXISTS submitted_at timestamptz,
  ADD COLUMN IF NOT EXISTS published_at timestamptz,
  ADD COLUMN IF NOT EXISTS source text DEFAULT 'internal';

-- Validate publish_status values via trigger (avoid CHECK constraint rigidity)
CREATE OR REPLACE FUNCTION public.validate_project_publish_status()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.publish_status NOT IN ('pending','published','rejected','draft') THEN
    RAISE EXCEPTION 'Invalid publish_status: %', NEW.publish_status;
  END IF;
  -- Auto-stamp published_at when a row transitions to published
  IF NEW.publish_status = 'published' AND NEW.published_at IS NULL THEN
    NEW.published_at := now();
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_projects_validate_publish_status ON public.projects;
CREATE TRIGGER trg_projects_validate_publish_status
  BEFORE INSERT OR UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.validate_project_publish_status();

-- Backfill: every existing row is published.
UPDATE public.projects
SET publish_status = 'published',
    published_at = COALESCE(published_at, created_at, now())
WHERE publish_status = 'published' AND published_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_projects_publish_status ON public.projects (publish_status);

-- Tighten RLS: public can only read published rows.
DROP POLICY IF EXISTS "Projects are viewable by everyone" ON public.projects;
CREATE POLICY "Published projects are viewable by everyone"
  ON public.projects FOR SELECT
  TO anon, authenticated
  USING (publish_status = 'published');

-- Allow anonymous submissions, but FORCE the row to start as pending
-- and forbid submitters from setting privileged fields.
CREATE POLICY "Anyone can submit a pending property"
  ON public.projects FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    publish_status = 'pending'
    AND source IS NOT NULL
    AND submitter_phone IS NOT NULL
    AND featured IS NOT TRUE
  );

GRANT SELECT, INSERT ON public.projects TO anon;
GRANT SELECT, INSERT ON public.projects TO authenticated;
GRANT ALL ON public.projects TO service_role;
