-- Rollback Migration: 20261127000003_project_publishing_workflow_rollback.sql
-- Target Database: lpbdwmpglwdedqdiovqu (Master Property Repository & CRM)
-- Purpose: Safely rollback RERA verification and publishing governance changes if required.

-- 1. Drop Indexes
DROP INDEX IF EXISTS public.idx_projects_rera_reg_num;
DROP INDEX IF EXISTS public.idx_projects_verification_status;
DROP INDEX IF EXISTS public.idx_projects_approval_status;
DROP INDEX IF EXISTS public.idx_publishing_audit_slug;
DROP INDEX IF EXISTS public.idx_publishing_audit_created_at;
DROP INDEX IF EXISTS public.idx_publishing_audit_project_id;

-- 2. Drop Audit Log Table & Policies
DROP TABLE IF EXISTS public.project_publishing_audit_logs CASCADE;

-- 3. Drop Governance Columns from public.projects
ALTER TABLE public.projects
  DROP COLUMN IF EXISTS rera_registration_number,
  DROP COLUMN IF EXISTS rera_authority,
  DROP COLUMN IF EXISTS verification_status,
  DROP COLUMN IF EXISTS rera_verification_date,
  DROP COLUMN IF EXISTS official_verification_source,
  DROP COLUMN IF EXISTS verified_promoter,
  DROP COLUMN IF EXISTS registered_project_name,
  DROP COLUMN IF EXISTS rera_verification_evidence,
  DROP COLUMN IF EXISTS review_notes,
  DROP COLUMN IF EXISTS approval_status,
  DROP COLUMN IF EXISTS approved_by,
  DROP COLUMN IF EXISTS approval_timestamp,
  DROP COLUMN IF EXISTS approval_notes,
  DROP COLUMN IF EXISTS publication_timestamp,
  DROP COLUMN IF EXISTS synchronization_status,
  DROP COLUMN IF EXISTS last_synchronization_error,
  DROP COLUMN IF EXISTS last_synchronized_at,
  DROP COLUMN IF EXISTS public_database_record_id;
