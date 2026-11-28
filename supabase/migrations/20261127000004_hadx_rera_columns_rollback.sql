-- Rollback Migration: 20261127000004_hadx_rera_columns_rollback.sql
-- Target Database: hadxpgwzmvxqslcyykyw (Public Website Database)
-- Purpose: Safely rollback public RERA columns if required.

-- 1. Drop Indexes
DROP INDEX IF EXISTS public.idx_projects_rera_reg_num;
DROP INDEX IF EXISTS public.idx_projects_verification_status;

-- 2. Drop Columns from public.projects
ALTER TABLE public.projects
  DROP COLUMN IF EXISTS rera_registration_number,
  DROP COLUMN IF EXISTS rera_authority,
  DROP COLUMN IF EXISTS verification_status,
  DROP COLUMN IF EXISTS rera_verification_date,
  DROP COLUMN IF EXISTS official_verification_source,
  DROP COLUMN IF EXISTS verified_promoter,
  DROP COLUMN IF EXISTS registered_project_name,
  DROP COLUMN IF EXISTS rera_verification_evidence;
