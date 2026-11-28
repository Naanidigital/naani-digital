-- Migration: 20261127000004_hadx_rera_columns.sql
-- Target Database: hadxpgwzmvxqslcyykyw (Public Website Database)
-- Status: PREPARED FOR REVIEW (DO NOT EXECUTE UNTIL EXPLICIT USER APPROVAL)
-- Purpose: Add verified RERA fields to the public projects table to support
--          public authority badges, schema.org structured data, and search filters.

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
END $$;

-- Add index on rera_registration_number
CREATE INDEX IF NOT EXISTS idx_projects_rera_reg_num 
  ON public.projects(rera_registration_number);
CREATE INDEX IF NOT EXISTS idx_projects_verification_status 
  ON public.projects(verification_status);
