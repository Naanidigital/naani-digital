-- Migration: 20261127000003_project_publishing_workflow.sql
-- Target Database: lpbdwmpglwdedqdiovqu (Master Property Repository & CRM)
-- Status: PREPARED FOR REVIEW (DO NOT EXECUTE UNTIL EXPLICIT USER APPROVAL)
-- Purpose: Implement dedicated RERA verification structure, approval governance,
--          HADX public synchronization status, and audit logging.

-- 1. Create Project Publishing Audit Log Table
CREATE TABLE IF NOT EXISTS public.project_publishing_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  project_slug TEXT NOT NULL,
  action TEXT NOT NULL,
  from_status TEXT NOT NULL,
  to_status TEXT NOT NULL,
  performed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  performer_email TEXT,
  reason TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index audit logs for rapid filtering and timeline queries
CREATE INDEX IF NOT EXISTS idx_publishing_audit_project_id 
  ON public.project_publishing_audit_logs(project_id);
CREATE INDEX IF NOT EXISTS idx_publishing_audit_created_at 
  ON public.project_publishing_audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_publishing_audit_slug 
  ON public.project_publishing_audit_logs(project_slug);

-- Enable RLS on audit logs
ALTER TABLE public.project_publishing_audit_logs ENABLE ROW LEVEL SECURITY;

-- Audit Log RLS Policies: Admins and staff only
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'project_publishing_audit_logs' 
      AND policyname = 'Admins can view publishing audit logs'
  ) THEN
    CREATE POLICY "Admins can view publishing audit logs"
      ON public.project_publishing_audit_logs
      FOR SELECT
      TO authenticated
      USING (
        (auth.uid() IS NOT NULL) AND 
        (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'moderator'::app_role))
      );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'project_publishing_audit_logs' 
      AND policyname = 'Admins can insert publishing audit logs'
  ) THEN
    CREATE POLICY "Admins can insert publishing audit logs"
      ON public.project_publishing_audit_logs
      FOR INSERT
      TO authenticated
      WITH CHECK (
        (auth.uid() IS NOT NULL) AND 
        (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'moderator'::app_role))
      );
  END IF;
END $$;

-- 2. Extend public.projects Table with Dedicated RERA & Governance Columns
DO $$
BEGIN
  -- 1. RERA registration number
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='projects' AND column_name='rera_registration_number') THEN
    ALTER TABLE public.projects ADD COLUMN rera_registration_number TEXT;
  END IF;

  -- 2. RERA authority
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='projects' AND column_name='rera_authority') THEN
    ALTER TABLE public.projects ADD COLUMN rera_authority TEXT DEFAULT 'TG RERA';
  END IF;

  -- 3. Verification status
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='projects' AND column_name='verification_status') THEN
    ALTER TABLE public.projects ADD COLUMN verification_status TEXT DEFAULT 'unverified';
  END IF;

  -- 4. Verification date
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='projects' AND column_name='rera_verification_date') THEN
    ALTER TABLE public.projects ADD COLUMN rera_verification_date TIMESTAMPTZ;
  END IF;

  -- 5. Official verification source
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='projects' AND column_name='official_verification_source') THEN
    ALTER TABLE public.projects ADD COLUMN official_verification_source TEXT DEFAULT 'https://rera.telangana.gov.in/';
  END IF;

  -- 6. Verified promoter name
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='projects' AND column_name='verified_promoter') THEN
    ALTER TABLE public.projects ADD COLUMN verified_promoter TEXT;
  END IF;

  -- 7. Registered project name
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='projects' AND column_name='registered_project_name') THEN
    ALTER TABLE public.projects ADD COLUMN registered_project_name TEXT;
  END IF;

  -- 8. Verification evidence
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='projects' AND column_name='rera_verification_evidence') THEN
    ALTER TABLE public.projects ADD COLUMN rera_verification_evidence TEXT;
  END IF;

  -- 9. Review notes
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='projects' AND column_name='review_notes') THEN
    ALTER TABLE public.projects ADD COLUMN review_notes TEXT;
  END IF;

  -- Approval governance columns
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='projects' AND column_name='approval_status') THEN
    ALTER TABLE public.projects ADD COLUMN approval_status TEXT DEFAULT 'pending';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='projects' AND column_name='approved_by') THEN
    ALTER TABLE public.projects ADD COLUMN approved_by UUID REFERENCES auth.users(id) ON DELETE SET NULL;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='projects' AND column_name='approval_timestamp') THEN
    ALTER TABLE public.projects ADD COLUMN approval_timestamp TIMESTAMPTZ;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='projects' AND column_name='approval_notes') THEN
    ALTER TABLE public.projects ADD COLUMN approval_notes TEXT;
  END IF;

  -- Publication & HADX synchronization tracking
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='projects' AND column_name='publication_timestamp') THEN
    ALTER TABLE public.projects ADD COLUMN publication_timestamp TIMESTAMPTZ;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='projects' AND column_name='synchronization_status') THEN
    ALTER TABLE public.projects ADD COLUMN synchronization_status TEXT DEFAULT 'pending';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='projects' AND column_name='last_synchronization_error') THEN
    ALTER TABLE public.projects ADD COLUMN last_synchronization_error TEXT;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='projects' AND column_name='last_synchronized_at') THEN
    ALTER TABLE public.projects ADD COLUMN last_synchronized_at TIMESTAMPTZ;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='projects' AND column_name='public_database_record_id') THEN
    ALTER TABLE public.projects ADD COLUMN public_database_record_id UUID;
  END IF;
END $$;

-- 3. Add Performance Indexes on Status & RERA Columns
CREATE INDEX IF NOT EXISTS idx_projects_rera_reg_num 
  ON public.projects(rera_registration_number);
CREATE INDEX IF NOT EXISTS idx_projects_publish_status 
  ON public.projects(publish_status);
CREATE INDEX IF NOT EXISTS idx_projects_verification_status 
  ON public.projects(verification_status);
CREATE INDEX IF NOT EXISTS idx_projects_approval_status 
  ON public.projects(approval_status);

-- 4. Initial Idempotent Backfill of Existing Published Projects
-- Safe idempotent backfill: sets verification_status = 'verified' and approval_status = 'approved'
-- for existing production records that are already published.
UPDATE public.projects
SET 
  verification_status = 'verified',
  approval_status = 'approved',
  synchronization_status = 'synced',
  publication_timestamp = COALESCE(publication_timestamp, updated_at, created_at)
WHERE publish_status = 'published' 
  AND (verification_status IS NULL OR verification_status = 'unverified');

-- Ensure Casagrand Evon remains strictly 'draft' and 'unverified'
UPDATE public.projects
SET 
  verification_status = 'unverified',
  approval_status = 'pending',
  synchronization_status = 'pending',
  publish_status = 'draft'
WHERE slug = 'casagrand-evon-kompally';
