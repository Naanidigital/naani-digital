-- ==============================================================================
-- Migration: 20261125000000_crm_whatsapp_templates_lifecycle.sql
-- Target Project: lpbdwmpglwdedqdiovqu (Dedicated CRM Backend)
-- Description: Gate 7 WhatsApp Template Lifecycle & Meta Approval Synchronization
--
-- Note: Prepared migration file. Under Gate 7 boundary rules, do NOT apply
--       to production database without separate approval.
-- ==============================================================================

-- 1. Allow meta_template_id to be NULL for draft templates
ALTER TABLE public.crm_whatsapp_templates
  ALTER COLUMN meta_template_id DROP NOT NULL;

-- 2. Update status check constraint to include DRAFT and SUBMITTED
ALTER TABLE public.crm_whatsapp_templates
  DROP CONSTRAINT IF EXISTS crm_whatsapp_templates_status_check;

ALTER TABLE public.crm_whatsapp_templates
  ADD CONSTRAINT crm_whatsapp_templates_status_check
  CHECK (status = ANY (ARRAY[
    'DRAFT'::text,
    'SUBMITTED'::text,
    'PENDING'::text,
    'APPROVED'::text,
    'REJECTED'::text,
    'PAUSED'::text,
    'DISABLED'::text
  ]));

-- 3. Add lifecycle, metadata, and rejection tracking columns
ALTER TABLE public.crm_whatsapp_templates
  ADD COLUMN IF NOT EXISTS description TEXT,
  ADD COLUMN IF NOT EXISTS rejection_reason TEXT,
  ADD COLUMN IF NOT EXISTS quality_score TEXT DEFAULT 'UNKNOWN',
  ADD COLUMN IF NOT EXISTS raw_meta_response JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS submission_error JSONB DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- 4. Create index on status, category, and language for fast filtering
CREATE INDEX IF NOT EXISTS idx_crm_templates_status ON public.crm_whatsapp_templates(status);
CREATE INDEX IF NOT EXISTS idx_crm_templates_category ON public.crm_whatsapp_templates(category);
CREATE INDEX IF NOT EXISTS idx_crm_templates_name_lang ON public.crm_whatsapp_templates(template_name, language);

-- 5. Enable Row Level Security (RLS)
ALTER TABLE public.crm_whatsapp_templates ENABLE ROW LEVEL SECURITY;

-- Staff Read Policy: Authenticated users with admin or moderator role can read templates
DROP POLICY IF EXISTS "Staff read crm_whatsapp_templates" ON public.crm_whatsapp_templates;
CREATE POLICY "Staff read crm_whatsapp_templates" ON public.crm_whatsapp_templates
  FOR SELECT
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin') OR
    public.has_role(auth.uid(), 'moderator')
  );

-- Staff Insert Policy: Staff can create templates
DROP POLICY IF EXISTS "Staff insert crm_whatsapp_templates" ON public.crm_whatsapp_templates;
CREATE POLICY "Staff insert crm_whatsapp_templates" ON public.crm_whatsapp_templates
  FOR INSERT
  TO authenticated
  WITH CHECK (
    public.has_role(auth.uid(), 'admin') OR
    public.has_role(auth.uid(), 'moderator')
  );

-- Staff Update Policy: Staff can update drafts or trigger sync
DROP POLICY IF EXISTS "Staff update crm_whatsapp_templates" ON public.crm_whatsapp_templates;
CREATE POLICY "Staff update crm_whatsapp_templates" ON public.crm_whatsapp_templates
  FOR UPDATE
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin') OR
    public.has_role(auth.uid(), 'moderator')
  )
  WITH CHECK (
    public.has_role(auth.uid(), 'admin') OR
    public.has_role(auth.uid(), 'moderator')
  );

-- Service Role Full Access (for background workers and Edge Functions)
DROP POLICY IF EXISTS "Service role full access crm_whatsapp_templates" ON public.crm_whatsapp_templates;
CREATE POLICY "Service role full access crm_whatsapp_templates" ON public.crm_whatsapp_templates
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 6. Helper RPC: Upsert Template from Meta API Sync
CREATE OR REPLACE FUNCTION public.sync_meta_whatsapp_template(
  p_meta_template_id TEXT,
  p_template_name TEXT,
  p_language TEXT,
  p_category TEXT,
  p_status TEXT,
  p_header_type TEXT DEFAULT 'NONE',
  p_components JSONB DEFAULT '[]'::jsonb,
  p_variable_placeholders TEXT[] DEFAULT '{}'::text[],
  p_rejection_reason TEXT DEFAULT NULL,
  p_quality_score TEXT DEFAULT 'UNKNOWN',
  p_raw_response JSONB DEFAULT '{}'::jsonb
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_template_id UUID;
BEGIN
  -- Verify caller is service_role or admin/moderator
  IF auth.role() = 'service_role' THEN
    NULL;
  ELSIF auth.role() = 'authenticated' AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')) THEN
    NULL;
  ELSE
    RAISE EXCEPTION 'Access denied: caller does not have template manager privileges';
  END IF;

  INSERT INTO public.crm_whatsapp_templates (
    meta_template_id,
    template_name,
    language,
    category,
    status,
    header_type,
    components,
    variable_placeholders,
    rejection_reason,
    quality_score,
    raw_meta_response,
    last_synced_at,
    updated_at
  ) VALUES (
    p_meta_template_id,
    p_template_name,
    p_language,
    p_category,
    p_status,
    p_header_type,
    p_components,
    p_variable_placeholders,
    p_rejection_reason,
    p_quality_score,
    p_raw_response,
    pg_catalog.now(),
    pg_catalog.now()
  )
  ON CONFLICT (template_name, language) DO UPDATE
  SET
    meta_template_id = EXCLUDED.meta_template_id,
    category = EXCLUDED.category,
    status = EXCLUDED.status,
    header_type = EXCLUDED.header_type,
    components = EXCLUDED.components,
    variable_placeholders = EXCLUDED.variable_placeholders,
    rejection_reason = EXCLUDED.rejection_reason,
    quality_score = EXCLUDED.quality_score,
    raw_meta_response = EXCLUDED.raw_meta_response,
    last_synced_at = pg_catalog.now(),
    updated_at = pg_catalog.now()
  RETURNING id INTO v_template_id;

  RETURN v_template_id;
END;
$$;
