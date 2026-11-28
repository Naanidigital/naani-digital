-- ==============================================================================
-- Migration Rollback: 20261125000000_crm_whatsapp_templates_lifecycle_rollback.sql
-- Target Project: lpbdwmpglwdedqdiovqu (Dedicated CRM Backend)
-- Description: Reverts Gate 7 schema additions on crm_whatsapp_templates
-- ==============================================================================

DROP FUNCTION IF EXISTS public.sync_meta_whatsapp_template(TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, JSONB, TEXT[], TEXT, TEXT, JSONB);

DROP POLICY IF EXISTS "Staff read crm_whatsapp_templates" ON public.crm_whatsapp_templates;
DROP POLICY IF EXISTS "Staff insert crm_whatsapp_templates" ON public.crm_whatsapp_templates;
DROP POLICY IF EXISTS "Staff update crm_whatsapp_templates" ON public.crm_whatsapp_templates;
DROP POLICY IF EXISTS "Service role full access crm_whatsapp_templates" ON public.crm_whatsapp_templates;

DROP INDEX IF EXISTS public.idx_crm_templates_status;
DROP INDEX IF EXISTS public.idx_crm_templates_category;
DROP INDEX IF EXISTS public.idx_crm_templates_name_lang;

ALTER TABLE public.crm_whatsapp_templates
  DROP COLUMN IF EXISTS description,
  DROP COLUMN IF EXISTS rejection_reason,
  DROP COLUMN IF EXISTS quality_score,
  DROP COLUMN IF EXISTS raw_meta_response,
  DROP COLUMN IF EXISTS submission_error,
  DROP COLUMN IF EXISTS created_by,
  DROP COLUMN IF EXISTS updated_by;

ALTER TABLE public.crm_whatsapp_templates
  DROP CONSTRAINT IF EXISTS crm_whatsapp_templates_status_check;

ALTER TABLE public.crm_whatsapp_templates
  ADD CONSTRAINT crm_whatsapp_templates_status_check
  CHECK (status = ANY (ARRAY[
    'APPROVED'::text,
    'PENDING'::text,
    'REJECTED'::text,
    'PAUSED'::text,
    'DISABLED'::text
  ]));
