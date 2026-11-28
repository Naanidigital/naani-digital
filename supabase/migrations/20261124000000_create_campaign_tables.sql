-- ==============================================================================
-- Migration: 20261124000000_create_campaign_tables.sql
-- Target Project: lpbdwmpglwdedqdiovqu (Naani Projects Dedicated CRM Backend)
-- Description: Phase 1 Database Foundation for Naani WhatsApp Campaign Manager.
--
-- Security & Reliability Hardening (Stage 1.3 Technical Verification):
-- 1. crm_campaigns: Lifecycle management, approval gates, aggregate counters.
-- 2. crm_campaign_recipients: Recipient snapshot, variables, delivery statuses,
--    atomic queue locks, 'sending_unknown' quarantine for ambiguous timeouts,
--    and dispatch correlation tokens for Meta webhook matching.
-- 3. crm_campaign_imports: CSV/Excel contact import history and mapping audit.
-- 4. crm_whatsapp_templates: Synchronized Meta approved marketing templates.
-- 5. crm_whatsapp_suppressions: Global customer opt-out suppression register.
-- 6. crm_campaign_events: Comprehensive audit trail for campaign lifecycle.
-- 7. High-concurrency atomic batch claiming via FOR UPDATE SKIP LOCKED.
-- 8. Stale lease recovery with ambiguous dispatch protection (prevents duplicates).
-- 9. Explicit service_role vs authenticated caller validation in all functions.
-- 10. Database-level trigger enforcement for admin-only campaign approvals.
-- 11. Strict consent ('opted_in') and suppression checks at time of claim.
-- 12. Strict Row Level Security (RLS) enforcing admin/moderator staff boundaries.
-- 13. SET search_path = '' with fully qualified object references in all functions.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. GLOBAL WHATSAPP SUPPRESSION LIST (OPT-OUT REGISTER)
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.crm_whatsapp_suppressions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  normalized_phone TEXT UNIQUE NOT NULL,
  reason TEXT NOT NULL DEFAULT 'customer_opt_out' CHECK (
    reason IN (
      'customer_opt_out',
      'inbound_stop_keyword',
      'manual_admin_suppression',
      'bounce_undeliverable',
      'spam_report'
    )
  ),
  source TEXT NOT NULL DEFAULT 'whatsapp_webhook' CHECK (
    source IN ('whatsapp_webhook', 'admin_crm', 'csv_import', 'customer_portal')
  ),
  notes TEXT,
  suppressed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  suppressed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_crm_suppress_norm_phone ON public.crm_whatsapp_suppressions(normalized_phone);
CREATE INDEX IF NOT EXISTS idx_crm_suppress_reason ON public.crm_whatsapp_suppressions(reason);
CREATE INDEX IF NOT EXISTS idx_crm_suppress_created_at ON public.crm_whatsapp_suppressions(created_at DESC);

ALTER TABLE public.crm_whatsapp_suppressions ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- 2. WHATSAPP TEMPLATES (SYNCED FROM META BUSINESS MANAGER)
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.crm_whatsapp_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meta_template_id TEXT UNIQUE NOT NULL,
  template_name TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'en',
  category TEXT NOT NULL CHECK (category IN ('MARKETING', 'UTILITY', 'AUTHENTICATION')),
  status TEXT NOT NULL CHECK (status IN ('APPROVED', 'PENDING', 'REJECTED', 'PAUSED', 'DISABLED')),
  header_type TEXT CHECK (header_type IN ('TEXT', 'IMAGE', 'VIDEO', 'DOCUMENT', 'NONE')),
  components JSONB NOT NULL DEFAULT '[]'::jsonb,
  variable_placeholders TEXT[] DEFAULT '{}',
  last_synced_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT uq_crm_template_name_lang UNIQUE (template_name, language)
);

CREATE INDEX IF NOT EXISTS idx_crm_templates_meta_id ON public.crm_whatsapp_templates(meta_template_id);
CREATE INDEX IF NOT EXISTS idx_crm_templates_status ON public.crm_whatsapp_templates(status);
CREATE INDEX IF NOT EXISTS idx_crm_templates_category ON public.crm_whatsapp_templates(category);

DROP TRIGGER IF EXISTS crm_templates_set_updated_at ON public.crm_whatsapp_templates;
CREATE TRIGGER crm_templates_set_updated_at
  BEFORE UPDATE ON public.crm_whatsapp_templates
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.crm_whatsapp_templates ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- 3. CRM CAMPAIGNS
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.crm_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  campaign_type TEXT NOT NULL DEFAULT 'promotional' CHECK (
    campaign_type IN ('promotional', 'project_launch', 'newsletter', 'event_invitation', 'custom')
  ),
  template_name TEXT NOT NULL,
  template_language TEXT NOT NULL DEFAULT 'en',
  template_snapshot JSONB NOT NULL DEFAULT '{}'::jsonb,
  audience_source TEXT NOT NULL DEFAULT 'crm' CHECK (
    audience_source IN ('crm', 'csv_import', 'combined')
  ),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (
    status IN (
      'draft',
      'awaiting_approval',
      'scheduled',
      'queued',
      'running',
      'paused',
      'completed',
      'partially_completed',
      'failed',
      'cancelled'
    )
  ),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  approved_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  approved_at TIMESTAMPTZ,
  scheduled_at TIMESTAMPTZ,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  total_recipients INT NOT NULL DEFAULT 0,
  eligible_recipients INT NOT NULL DEFAULT 0,
  queued_count INT NOT NULL DEFAULT 0,
  sending_count INT NOT NULL DEFAULT 0,
  unknown_count INT NOT NULL DEFAULT 0,
  sent_count INT NOT NULL DEFAULT 0,
  delivered_count INT NOT NULL DEFAULT 0,
  read_count INT NOT NULL DEFAULT 0,
  failed_count INT NOT NULL DEFAULT 0,
  excluded_count INT NOT NULL DEFAULT 0,
  opted_out_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_crm_campaigns_status ON public.crm_campaigns(status);
CREATE INDEX IF NOT EXISTS idx_crm_campaigns_project_id ON public.crm_campaigns(project_id);
CREATE INDEX IF NOT EXISTS idx_crm_campaigns_created_at ON public.crm_campaigns(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_crm_campaigns_scheduled_at ON public.crm_campaigns(scheduled_at);

DROP TRIGGER IF EXISTS crm_campaigns_set_updated_at ON public.crm_campaigns;
CREATE TRIGGER crm_campaigns_set_updated_at
  BEFORE UPDATE ON public.crm_campaigns
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Database-Level Enforcement of Campaign Approval & Activation
CREATE OR REPLACE FUNCTION public.check_crm_campaign_transitions()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Transitioning to scheduled, queued, or running, or setting approved_by requires admin privileges
  IF (NEW.status IN ('scheduled', 'queued', 'running') AND OLD.status IN ('draft', 'awaiting_approval'))
     OR (NEW.approved_by IS DISTINCT FROM OLD.approved_by AND NEW.approved_by IS NOT NULL) THEN
    
    -- Distinguish service_role from authenticated callers
    IF auth.role() = 'service_role' THEN
      NULL; -- Allowed for trusted automated workers
    ELSIF auth.role() = 'authenticated' AND auth.uid() IS NOT NULL THEN
      IF NOT public.has_role(auth.uid(), 'admin') THEN
        RAISE EXCEPTION 'Campaign approval and activation requires administrator privileges';
      END IF;
    ELSE
      RAISE EXCEPTION 'Access denied: unauthorized caller role (%)', pg_catalog.coalesce(auth.role(), 'none');
    END IF;

    -- Automatically record approved_at timestamp
    IF NEW.approved_by IS NOT NULL AND NEW.approved_at IS NULL THEN
      NEW.approved_at := pg_catalog.now();
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_check_crm_campaign_transitions ON public.crm_campaigns;
CREATE TRIGGER trg_check_crm_campaign_transitions
  BEFORE UPDATE ON public.crm_campaigns
  FOR EACH ROW EXECUTE FUNCTION public.check_crm_campaign_transitions();

ALTER TABLE public.crm_campaigns ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- 4. CRM CAMPAIGN IMPORTS (AUDIT TRAIL FOR EXCEL/CSV UPLOADS)
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.crm_campaign_imports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES public.crm_campaigns(id) ON DELETE SET NULL,
  original_filename TEXT NOT NULL,
  file_size_bytes BIGINT,
  total_rows INT NOT NULL DEFAULT 0,
  valid_rows INT NOT NULL DEFAULT 0,
  invalid_rows INT NOT NULL DEFAULT 0,
  duplicate_rows INT NOT NULL DEFAULT 0,
  excluded_rows INT NOT NULL DEFAULT 0,
  consent_eligible_rows INT NOT NULL DEFAULT 0,
  column_mapping JSONB DEFAULT '{}'::jsonb,
  error_report JSONB DEFAULT '[]'::jsonb,
  imported_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_crm_imports_campaign_id ON public.crm_campaign_imports(campaign_id);
CREATE INDEX IF NOT EXISTS idx_crm_imports_created_at ON public.crm_campaign_imports(created_at DESC);

ALTER TABLE public.crm_campaign_imports ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- 5. CRM CAMPAIGN RECIPIENTS (RECIPIENT SNAPSHOT & ATOMIC DISPATCH QUEUE)
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.crm_campaign_recipients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES public.crm_campaigns(id) ON DELETE CASCADE,
  normalized_phone TEXT NOT NULL,
  customer_name TEXT,
  crm_lead_id UUID REFERENCES public.crm_leads(id) ON DELETE SET NULL,
  imported_contact_id UUID,
  template_variables JSONB NOT NULL DEFAULT '{}'::jsonb,
  consent_status TEXT NOT NULL DEFAULT 'unverified' CHECK (
    consent_status IN ('opted_in', 'unverified', 'opted_out', 'suppressed')
  ),
  consent_source TEXT,
  consent_captured_at TIMESTAMPTZ,
  consent_proof_metadata JSONB DEFAULT '{}'::jsonb,
  status TEXT NOT NULL DEFAULT 'queued' CHECK (
    status IN (
      'queued',
      'sending',
      'sending_unknown',
      'sent',
      'delivered',
      'read',
      'failed',
      'suppressed',
      'skipped',
      'opted_out',
      'cancelled'
    )
  ),
  meta_message_id TEXT UNIQUE,
  dispatch_correlation_token TEXT UNIQUE DEFAULT gen_random_uuid()::text,
  meta_marketing_capped BOOLEAN NOT NULL DEFAULT false,
  deferral_retry_until TIMESTAMPTZ,
  attempt_count INT NOT NULL DEFAULT 0,
  max_retries INT NOT NULL DEFAULT 3,
  locked_until TIMESTAMPTZ,
  locked_by TEXT,
  last_error_code TEXT,
  last_error_message TEXT,
  reconciled_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reconciled_at TIMESTAMPTZ,
  reconciliation_notes TEXT,
  queued_at TIMESTAMPTZ DEFAULT now(),
  sent_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  read_at TIMESTAMPTZ,
  failed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT uq_campaign_recipient_phone UNIQUE (campaign_id, normalized_phone)
);

CREATE INDEX IF NOT EXISTS idx_crm_recipients_queue ON public.crm_campaign_recipients(campaign_id, status, locked_until);
CREATE INDEX IF NOT EXISTS idx_crm_recipients_meta_id ON public.crm_campaign_recipients(meta_message_id);
CREATE INDEX IF NOT EXISTS idx_crm_recipients_token ON public.crm_campaign_recipients(dispatch_correlation_token);
CREATE INDEX IF NOT EXISTS idx_crm_recipients_phone ON public.crm_campaign_recipients(normalized_phone);
CREATE INDEX IF NOT EXISTS idx_crm_recipients_lead_id ON public.crm_campaign_recipients(crm_lead_id);
CREATE INDEX IF NOT EXISTS idx_crm_recipients_consent ON public.crm_campaign_recipients(campaign_id, consent_status);

DROP TRIGGER IF EXISTS crm_recipients_set_updated_at ON public.crm_campaign_recipients;
CREATE TRIGGER crm_recipients_set_updated_at
  BEFORE UPDATE ON public.crm_campaign_recipients
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.crm_campaign_recipients ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- 6. CRM CAMPAIGN EVENTS (AUDIT TRAIL & LIFECYCLE TIMELINE)
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.crm_campaign_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES public.crm_campaigns(id) ON DELETE CASCADE,
  recipient_id UUID REFERENCES public.crm_campaign_recipients(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL CHECK (
    event_type IN (
      'created',
      'approved',
      'scheduled',
      'started',
      'batch_claimed',
      'message_sent',
      'message_delivered',
      'message_read',
      'message_failed',
      'lease_expired_ambiguous',
      'reconciled_sent',
      'reconciled_failed',
      'manual_retry',
      'paused',
      'resumed',
      'cancelled',
      'completed',
      'opt_out',
      'retry'
    )
  ),
  event_data JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_crm_events_campaign_id ON public.crm_campaign_events(campaign_id, created_at ASC);
CREATE INDEX IF NOT EXISTS idx_crm_events_recipient_id ON public.crm_campaign_events(recipient_id);

ALTER TABLE public.crm_campaign_events ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- 7. ATOMIC QUEUE CLAIMING FUNCTION (CONCURRENCY-SAFE BATCH LEASING)
-- ------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.claim_campaign_recipient_batch(
  p_campaign_id UUID,
  p_worker_id TEXT,
  p_batch_size INT DEFAULT 50,
  p_lease_seconds INT DEFAULT 90
)
RETURNS SETOF public.crm_campaign_recipients
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- 1. Caller Privilege Verification (distinguish service_role from authenticated)
  IF auth.role() = 'service_role' THEN
    NULL; -- Trusted worker
  ELSIF auth.role() = 'authenticated' AND auth.uid() IS NOT NULL THEN
    IF NOT (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')) THEN
      RAISE EXCEPTION 'Access denied: caller does not have campaign manager privileges';
    END IF;
  ELSE
    RAISE EXCEPTION 'Access denied: unauthorized caller role (%)', pg_catalog.coalesce(auth.role(), 'none');
  END IF;

  -- 2. Verify the campaign is currently running
  IF NOT EXISTS (
    SELECT 1 FROM public.crm_campaigns
    WHERE id = p_campaign_id AND status = 'running'
  ) THEN
    RETURN;
  END IF;

  -- 3. Atomically claim eligible recipients:
  --    - Status must be 'queued'
  --    - Consent MUST strictly be 'opted_in' (unverified contacts are NEVER claimed)
  --    - Must NOT be suppressed on global suppression list at execution time
  --    - Must NOT be currently locked by another active worker lease
  RETURN QUERY
  WITH claimable AS (
    SELECT r.id
    FROM public.crm_campaign_recipients r
    WHERE r.campaign_id = p_campaign_id
      AND r.status = 'queued'
      AND r.consent_status = 'opted_in'
      AND (r.locked_until IS NULL OR r.locked_until < pg_catalog.now())
      AND (r.deferral_retry_until IS NULL OR r.deferral_retry_until <= pg_catalog.now())
      AND r.attempt_count < r.max_retries
      AND NOT EXISTS (
        SELECT 1 FROM public.crm_whatsapp_suppressions s
        WHERE s.normalized_phone = r.normalized_phone
      )
      AND NOT EXISTS (
        SELECT 1 FROM public.crm_whatsapp_recipient_pacing p
        WHERE p.normalized_phone = r.normalized_phone
          AND p.last_dispatched_at > (pg_catalog.now() - (p.cooldown_seconds || ' seconds')::interval)
      )
    ORDER BY r.created_at ASC
    LIMIT p_batch_size
    FOR UPDATE SKIP LOCKED
  )
  UPDATE public.crm_campaign_recipients r
  SET 
    status = 'sending',
    locked_until = pg_catalog.now() + (p_lease_seconds || ' seconds')::interval,
    locked_by = p_worker_id,
    attempt_count = r.attempt_count + 1,
    updated_at = pg_catalog.now()
  FROM claimable
  WHERE r.id = claimable.id
  RETURNING r.*;
END;
$$;

REVOKE ALL ON FUNCTION public.claim_campaign_recipient_batch(UUID, TEXT, INT, INT) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.claim_campaign_recipient_batch(UUID, TEXT, INT, INT) FROM anon;
GRANT EXECUTE ON FUNCTION public.claim_campaign_recipient_batch(UUID, TEXT, INT, INT) TO authenticated, service_role;

-- ------------------------------------------------------------------------------
-- 8. STALE LEASE RECOVERY (AMBIGUOUS DISPATCH DUPLICATE PREVENTION)
-- ------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.recover_stale_campaign_leases(
  p_campaign_id UUID
)
RETURNS INT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_recovered INT := 0;
  r_rec RECORD;
BEGIN
  -- 1. Caller Privilege Verification (distinguish service_role from authenticated)
  IF auth.role() = 'service_role' THEN
    NULL; -- Trusted worker
  ELSIF auth.role() = 'authenticated' AND auth.uid() IS NOT NULL THEN
    IF NOT (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')) THEN
      RAISE EXCEPTION 'Access denied: caller does not have campaign manager privileges';
    END IF;
  ELSE
    RAISE EXCEPTION 'Access denied: unauthorized caller role (%)', pg_catalog.coalesce(auth.role(), 'none');
  END IF;

  -- 2. Identify expired worker leases in 'sending' state
  --    CRITICAL SAFETY RULE:
  --    When worker times out during Meta API dispatch, meta_message_id is NULL.
  --    We CANNOT assume Meta rejected the message! It may have been delivered.
  --    Therefore, we NEVER automatically re-queue ambiguous records.
  --    Instead, transition to 'sending_unknown' to quarantine and prevent duplicate sends.
  FOR r_rec IN
    SELECT id, campaign_id, normalized_phone, attempt_count, locked_by
    FROM public.crm_campaign_recipients
    WHERE campaign_id = p_campaign_id
      AND status = 'sending'
      AND locked_until < pg_catalog.now()
      AND meta_message_id IS NULL
    FOR UPDATE SKIP LOCKED
  LOOP
    UPDATE public.crm_campaign_recipients
    SET 
      status = 'sending_unknown',
      locked_until = NULL,
      locked_by = NULL,
      last_error_code = 'LEASE_TIMEOUT_AMBIGUOUS',
      last_error_message = 'Worker lease expired during dispatch. Meta dispatch outcome is unknown; quarantined to prevent duplicate sends.',
      updated_at = pg_catalog.now()
    WHERE id = r_rec.id;

    -- Record audit event for the ambiguous timeout
    INSERT INTO public.crm_campaign_events (
      campaign_id,
      recipient_id,
      event_type,
      event_data
    ) VALUES (
      r_rec.campaign_id,
      r_rec.id,
      'lease_expired_ambiguous',
      pg_catalog.jsonb_build_object(
        'normalized_phone', r_rec.normalized_phone,
        'previous_worker', r_rec.locked_by,
        'attempt_count', r_rec.attempt_count,
        'action_taken', 'quarantined_to_sending_unknown'
      )
    );

    v_recovered := v_recovered + 1;
  END LOOP;

  RETURN v_recovered;
END;
$$;

REVOKE ALL ON FUNCTION public.recover_stale_campaign_leases(UUID) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.recover_stale_campaign_leases(UUID) FROM anon;
GRANT EXECUTE ON FUNCTION public.recover_stale_campaign_leases(UUID) TO authenticated, service_role;

-- ------------------------------------------------------------------------------
-- 9. RECONCILIATION FUNCTION FOR AMBIGUOUS RECIPIENTS (ADMINISTRATOR ONLY)
-- ------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.reconcile_ambiguous_recipient(
  p_recipient_id UUID,
  p_action TEXT, -- 'confirm_sent', 'mark_failed', 'retry_send'
  p_confirmed_non_delivery BOOLEAN DEFAULT FALSE,
  p_meta_message_id TEXT DEFAULT NULL,
  p_notes TEXT DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_rec public.crm_campaign_recipients%ROWTYPE;
BEGIN
  -- Strict Admin Verification
  IF auth.role() = 'service_role' THEN
    NULL; -- Trusted worker
  ELSIF auth.role() = 'authenticated' AND auth.uid() IS NOT NULL THEN
    IF NOT public.has_role(auth.uid(), 'admin') THEN
      RAISE EXCEPTION 'Access denied: reconciliation of ambiguous dispatches requires administrator privileges';
    END IF;
  ELSE
    RAISE EXCEPTION 'Access denied: unauthorized caller role (%)', pg_catalog.coalesce(auth.role(), 'none');
  END IF;

  -- Mandatory explanation notes (minimum 10 characters)
  IF p_notes IS NULL OR pg_catalog.length(pg_catalog.btrim(p_notes)) < 10 THEN
    RAISE EXCEPTION 'Reconciliation requires explicit explanation notes (minimum 10 characters)';
  END IF;

  SELECT * INTO v_rec FROM public.crm_campaign_recipients
  WHERE id = p_recipient_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Recipient record not found';
  END IF;

  IF v_rec.status != 'sending_unknown' THEN
    RAISE EXCEPTION 'Recipient is not in sending_unknown quarantine status (current status: %)', v_rec.status;
  END IF;

  IF p_action = 'confirm_sent' THEN
    IF p_meta_message_id IS NULL OR pg_catalog.length(pg_catalog.btrim(p_meta_message_id)) < 5 THEN
      RAISE EXCEPTION 'confirm_sent requires a valid Meta message ID (wamid...)';
    END IF;
    UPDATE public.crm_campaign_recipients
    SET 
      status = 'sent',
      meta_message_id = p_meta_message_id,
      sent_at = pg_catalog.now(),
      reconciled_by = auth.uid(),
      reconciled_at = pg_catalog.now(),
      reconciliation_notes = p_notes,
      last_error_code = NULL,
      last_error_message = p_notes,
      updated_at = pg_catalog.now()
    WHERE id = p_recipient_id;

    INSERT INTO public.crm_campaign_events (
      campaign_id, recipient_id, event_type, event_data
    ) VALUES (
      v_rec.campaign_id, p_recipient_id, 'reconciled_sent',
      pg_catalog.jsonb_build_object(
        'meta_message_id', p_meta_message_id,
        'reconciled_by', auth.uid(),
        'notes', p_notes
      )
    );

  ELSIF p_action = 'mark_failed' THEN
    UPDATE public.crm_campaign_recipients
    SET 
      status = 'failed',
      failed_at = pg_catalog.now(),
      reconciled_by = auth.uid(),
      reconciled_at = pg_catalog.now(),
      reconciliation_notes = p_notes,
      last_error_code = 'MANUALLY_MARKED_FAILED',
      last_error_message = p_notes,
      updated_at = pg_catalog.now()
    WHERE id = p_recipient_id;

    INSERT INTO public.crm_campaign_events (
      campaign_id, recipient_id, event_type, event_data
    ) VALUES (
      v_rec.campaign_id, p_recipient_id, 'reconciled_failed',
      pg_catalog.jsonb_build_object(
        'reconciled_by', auth.uid(),
        'notes', p_notes
      )
    );

  ELSIF p_action = 'retry_send' THEN
    -- STRICT NON-DELIVERY CONFIRMATION SAFEGUARD:
    -- System never silently retries an ambiguous outcome.
    -- Admin must affirmatively certify that message was verified as not delivered.
    IF p_confirmed_non_delivery IS NOT TRUE THEN
      RAISE EXCEPTION 'retry_send requires explicit affirmative confirmation (p_confirmed_non_delivery = true) that the message was not received by Meta or delivered to the customer';
    END IF;

    UPDATE public.crm_campaign_recipients
    SET 
      status = 'queued',
      locked_until = NULL,
      locked_by = NULL,
      reconciled_by = auth.uid(),
      reconciled_at = pg_catalog.now(),
      reconciliation_notes = p_notes,
      last_error_code = NULL,
      last_error_message = 'Admin authorized retry after verifying non-delivery: ' || p_notes,
      updated_at = pg_catalog.now()
    WHERE id = p_recipient_id;

    INSERT INTO public.crm_campaign_events (
      campaign_id, recipient_id, event_type, event_data
    ) VALUES (
      v_rec.campaign_id, p_recipient_id, 'manual_retry',
      pg_catalog.jsonb_build_object(
        'authorized_by', auth.uid(),
        'confirmed_non_delivery', true,
        'notes', p_notes
      )
    );

  ELSE
    RAISE EXCEPTION 'Invalid reconciliation action: %. Must be confirm_sent, mark_failed, or retry_send', p_action;
  END IF;
END;
$$;

REVOKE ALL ON FUNCTION public.reconcile_ambiguous_recipient(UUID, TEXT, BOOLEAN, TEXT, TEXT) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.reconcile_ambiguous_recipient(UUID, TEXT, BOOLEAN, TEXT, TEXT) FROM anon;
GRANT EXECUTE ON FUNCTION public.reconcile_ambiguous_recipient(UUID, TEXT, BOOLEAN, TEXT, TEXT) TO authenticated, service_role;

-- ------------------------------------------------------------------------------
-- 10. ATOMIC CAMPAIGN COUNTER RECONCILIATION
-- ------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.sync_campaign_counters(
  p_campaign_id UUID
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Caller Privilege Verification (distinguish service_role from authenticated)
  IF auth.role() = 'service_role' THEN
    NULL; -- Trusted worker
  ELSIF auth.role() = 'authenticated' AND auth.uid() IS NOT NULL THEN
    IF NOT (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')) THEN
      RAISE EXCEPTION 'Access denied: caller does not have campaign manager privileges';
    END IF;
  ELSE
    RAISE EXCEPTION 'Access denied: unauthorized caller role (%)', pg_catalog.coalesce(auth.role(), 'none');
  END IF;

  UPDATE public.crm_campaigns c
  SET 
    queued_count = (SELECT pg_catalog.count(*) FROM public.crm_campaign_recipients WHERE campaign_id = p_campaign_id AND status = 'queued'),
    sending_count = (SELECT pg_catalog.count(*) FROM public.crm_campaign_recipients WHERE campaign_id = p_campaign_id AND status = 'sending'),
    unknown_count = (SELECT pg_catalog.count(*) FROM public.crm_campaign_recipients WHERE campaign_id = p_campaign_id AND status = 'sending_unknown'),
    sent_count = (SELECT pg_catalog.count(*) FROM public.crm_campaign_recipients WHERE campaign_id = p_campaign_id AND status = 'sent'),
    delivered_count = (SELECT pg_catalog.count(*) FROM public.crm_campaign_recipients WHERE campaign_id = p_campaign_id AND status = 'delivered'),
    read_count = (SELECT pg_catalog.count(*) FROM public.crm_campaign_recipients WHERE campaign_id = p_campaign_id AND status = 'read'),
    failed_count = (SELECT pg_catalog.count(*) FROM public.crm_campaign_recipients WHERE campaign_id = p_campaign_id AND status = 'failed'),
    opted_out_count = (SELECT pg_catalog.count(*) FROM public.crm_campaign_recipients WHERE campaign_id = p_campaign_id AND status = 'opted_out'),
    excluded_count = (SELECT pg_catalog.count(*) FROM public.crm_campaign_recipients WHERE campaign_id = p_campaign_id AND status = 'suppressed'),
    updated_at = pg_catalog.now()
  WHERE c.id = p_campaign_id;
END;
$$;

REVOKE ALL ON FUNCTION public.sync_campaign_counters(UUID) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.sync_campaign_counters(UUID) FROM anon;
GRANT EXECUTE ON FUNCTION public.sync_campaign_counters(UUID) TO authenticated, service_role;

-- ------------------------------------------------------------------------------
-- 11. ROLE-BASED ACCESS CONTROL (RLS POLICIES)
-- ------------------------------------------------------------------------------

-- Grants to service_role (Full access for server-side dispatch workers and webhooks)
GRANT ALL ON public.crm_whatsapp_suppressions TO service_role;
GRANT ALL ON public.crm_whatsapp_templates TO service_role;
GRANT ALL ON public.crm_campaigns TO service_role;
GRANT ALL ON public.crm_campaign_imports TO service_role;
GRANT ALL ON public.crm_campaign_recipients TO service_role;
GRANT ALL ON public.crm_campaign_events TO service_role;

-- Grants to authenticated staff (Governed by RLS)
GRANT SELECT, INSERT, UPDATE, DELETE ON public.crm_whatsapp_suppressions TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.crm_whatsapp_templates TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.crm_campaigns TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.crm_campaign_imports TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.crm_campaign_recipients TO authenticated;
GRANT SELECT, INSERT ON public.crm_campaign_events TO authenticated;

-- Explicitly revoke all public/anonymous privileges
REVOKE ALL ON public.crm_whatsapp_suppressions FROM anon;
REVOKE ALL ON public.crm_whatsapp_templates FROM anon;
REVOKE ALL ON public.crm_campaigns FROM anon;
REVOKE ALL ON public.crm_campaign_imports FROM anon;
REVOKE ALL ON public.crm_campaign_recipients FROM anon;
REVOKE ALL ON public.crm_campaign_events FROM anon;

-- A. Policies for crm_whatsapp_suppressions
DROP POLICY IF EXISTS "Staff can read suppressions" ON public.crm_whatsapp_suppressions;
CREATE POLICY "Staff can read suppressions"
  ON public.crm_whatsapp_suppressions FOR SELECT TO authenticated
  USING (auth.uid() IS NOT NULL AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')));

DROP POLICY IF EXISTS "Staff can insert suppressions" ON public.crm_whatsapp_suppressions;
CREATE POLICY "Staff can insert suppressions"
  ON public.crm_whatsapp_suppressions FOR INSERT TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')));

DROP POLICY IF EXISTS "Staff can update suppressions" ON public.crm_whatsapp_suppressions;
CREATE POLICY "Staff can update suppressions"
  ON public.crm_whatsapp_suppressions FOR UPDATE TO authenticated
  USING (auth.uid() IS NOT NULL AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')))
  WITH CHECK (auth.uid() IS NOT NULL AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')));

DROP POLICY IF EXISTS "Admins can delete suppressions" ON public.crm_whatsapp_suppressions;
CREATE POLICY "Admins can delete suppressions"
  ON public.crm_whatsapp_suppressions FOR DELETE TO authenticated
  USING (auth.uid() IS NOT NULL AND public.has_role(auth.uid(), 'admin'));

-- B. Policies for crm_whatsapp_templates
DROP POLICY IF EXISTS "Staff can read templates" ON public.crm_whatsapp_templates;
CREATE POLICY "Staff can read templates"
  ON public.crm_whatsapp_templates FOR SELECT TO authenticated
  USING (auth.uid() IS NOT NULL AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')));

DROP POLICY IF EXISTS "Staff can insert templates" ON public.crm_whatsapp_templates;
CREATE POLICY "Staff can insert templates"
  ON public.crm_whatsapp_templates FOR INSERT TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')));

DROP POLICY IF EXISTS "Staff can update templates" ON public.crm_whatsapp_templates;
CREATE POLICY "Staff can update templates"
  ON public.crm_whatsapp_templates FOR UPDATE TO authenticated
  USING (auth.uid() IS NOT NULL AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')))
  WITH CHECK (auth.uid() IS NOT NULL AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')));

DROP POLICY IF EXISTS "Admins can delete templates" ON public.crm_whatsapp_templates;
CREATE POLICY "Admins can delete templates"
  ON public.crm_whatsapp_templates FOR DELETE TO authenticated
  USING (auth.uid() IS NOT NULL AND public.has_role(auth.uid(), 'admin'));

-- C. Policies for crm_campaigns
DROP POLICY IF EXISTS "Staff can read campaigns" ON public.crm_campaigns;
CREATE POLICY "Staff can read campaigns"
  ON public.crm_campaigns FOR SELECT TO authenticated
  USING (auth.uid() IS NOT NULL AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')));

DROP POLICY IF EXISTS "Staff can insert campaigns" ON public.crm_campaigns;
CREATE POLICY "Staff can insert campaigns"
  ON public.crm_campaigns FOR INSERT TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')));

DROP POLICY IF EXISTS "Staff can update campaigns" ON public.crm_campaigns;
CREATE POLICY "Staff can update campaigns"
  ON public.crm_campaigns FOR UPDATE TO authenticated
  USING (auth.uid() IS NOT NULL AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')))
  WITH CHECK (auth.uid() IS NOT NULL AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')));

DROP POLICY IF EXISTS "Admins can delete campaigns" ON public.crm_campaigns;
CREATE POLICY "Admins can delete campaigns"
  ON public.crm_campaigns FOR DELETE TO authenticated
  USING (auth.uid() IS NOT NULL AND public.has_role(auth.uid(), 'admin'));

-- D. Policies for crm_campaign_imports
DROP POLICY IF EXISTS "Staff can read imports" ON public.crm_campaign_imports;
CREATE POLICY "Staff can read imports"
  ON public.crm_campaign_imports FOR SELECT TO authenticated
  USING (auth.uid() IS NOT NULL AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')));

DROP POLICY IF EXISTS "Staff can insert imports" ON public.crm_campaign_imports;
CREATE POLICY "Staff can insert imports"
  ON public.crm_campaign_imports FOR INSERT TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')));

DROP POLICY IF EXISTS "Staff can update imports" ON public.crm_campaign_imports;
CREATE POLICY "Staff can update imports"
  ON public.crm_campaign_imports FOR UPDATE TO authenticated
  USING (auth.uid() IS NOT NULL AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')))
  WITH CHECK (auth.uid() IS NOT NULL AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')));

DROP POLICY IF EXISTS "Admins can delete imports" ON public.crm_campaign_imports;
CREATE POLICY "Admins can delete imports"
  ON public.crm_campaign_imports FOR DELETE TO authenticated
  USING (auth.uid() IS NOT NULL AND public.has_role(auth.uid(), 'admin'));

-- E. Policies for crm_campaign_recipients
DROP POLICY IF EXISTS "Staff can read campaign recipients" ON public.crm_campaign_recipients;
CREATE POLICY "Staff can read campaign recipients"
  ON public.crm_campaign_recipients FOR SELECT TO authenticated
  USING (auth.uid() IS NOT NULL AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')));

DROP POLICY IF EXISTS "Staff can insert campaign recipients" ON public.crm_campaign_recipients;
CREATE POLICY "Staff can insert campaign recipients"
  ON public.crm_campaign_recipients FOR INSERT TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')));

DROP POLICY IF EXISTS "Staff can update campaign recipients" ON public.crm_campaign_recipients;
CREATE POLICY "Staff can update campaign recipients"
  ON public.crm_campaign_recipients FOR UPDATE TO authenticated
  USING (auth.uid() IS NOT NULL AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')))
  WITH CHECK (auth.uid() IS NOT NULL AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')));

DROP POLICY IF EXISTS "Admins can delete campaign recipients" ON public.crm_campaign_recipients;
CREATE POLICY "Admins can delete campaign recipients"
  ON public.crm_campaign_recipients FOR DELETE TO authenticated
  USING (auth.uid() IS NOT NULL AND public.has_role(auth.uid(), 'admin'));

-- F. Policies for crm_campaign_events (Append-only audit trail)
DROP POLICY IF EXISTS "Staff can read campaign events" ON public.crm_campaign_events;
CREATE POLICY "Staff can read campaign events"
  ON public.crm_campaign_events FOR SELECT TO authenticated
  USING (auth.uid() IS NOT NULL AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')));

DROP POLICY IF EXISTS "Staff can insert campaign events" ON public.crm_campaign_events;
CREATE POLICY "Staff can insert campaign events"
  ON public.crm_campaign_events FOR INSERT TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')));

-- ------------------------------------------------------------------------------
-- 12. REALTIME PUBLICATION EXTENSION
-- ------------------------------------------------------------------------------

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'crm_campaigns'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.crm_campaigns;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'crm_campaign_events'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.crm_campaign_events;
  END IF;
END $$;

-- ------------------------------------------------------------------------------
-- 13. CROSS-CAMPAIGN SENDER-RECIPIENT PAIR PACING (STAGE 4.3 CORRECTION)
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.crm_whatsapp_recipient_pacing (
  normalized_phone TEXT PRIMARY KEY,
  last_dispatched_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  source_type TEXT NOT NULL CHECK (source_type IN ('campaign', 'crm_inbox', 'worker')),
  source_campaign_id UUID REFERENCES public.crm_campaigns(id) ON DELETE SET NULL,
  source_worker_id TEXT,
  cooldown_seconds INT NOT NULL DEFAULT 60,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_crm_pacing_phone ON public.crm_whatsapp_recipient_pacing(normalized_phone);
CREATE INDEX IF NOT EXISTS idx_crm_pacing_last_dispatched ON public.crm_whatsapp_recipient_pacing(last_dispatched_at);

ALTER TABLE public.crm_whatsapp_recipient_pacing ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can view pacing records"
  ON public.crm_whatsapp_recipient_pacing FOR SELECT TO authenticated
  USING (auth.uid() IS NOT NULL AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')));

CREATE POLICY "Staff can modify pacing records"
  ON public.crm_whatsapp_recipient_pacing FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')))
  WITH CHECK (auth.uid() IS NOT NULL AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')));

-- Atomic Check and Update Function with Row-Level Lock
CREATE OR REPLACE FUNCTION public.check_and_update_recipient_pacing(
  p_phone TEXT,
  p_source_type TEXT DEFAULT 'campaign',
  p_source_campaign_id UUID DEFAULT NULL,
  p_source_worker_id TEXT DEFAULT NULL,
  p_cooldown_seconds INT DEFAULT 60
)
RETURNS TABLE (
  can_dispatch BOOLEAN,
  seconds_remaining INT,
  last_dispatched_at TIMESTAMPTZ,
  previous_source TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_rec RECORD;
  v_now TIMESTAMPTZ := pg_catalog.now();
  v_elapsed_sec INT;
  v_remaining_sec INT;
BEGIN
  -- Caller Privilege Verification (Admin/Moderator or Service Role Only)
  IF auth.role() = 'service_role' THEN
    NULL; -- Trusted worker
  ELSIF auth.role() = 'authenticated' AND auth.uid() IS NOT NULL THEN
    IF NOT (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')) THEN
      RAISE EXCEPTION 'Access denied: caller does not have campaign manager or CRM staff privileges';
    END IF;
  ELSE
    RAISE EXCEPTION 'Access denied: unauthorized caller role (%)', pg_catalog.coalesce(auth.role(), 'none');
  END IF;

  -- Row-level lock on pacing record for atomic cross-worker/cross-campaign coordination
  SELECT * INTO v_rec
  FROM public.crm_whatsapp_recipient_pacing
  WHERE normalized_phone = p_phone
  FOR UPDATE;

  IF FOUND THEN
    v_elapsed_sec := pg_catalog.date_part('epoch', (v_now - v_rec.last_dispatched_at))::INT;
    IF v_elapsed_sec < pg_catalog.greatest(p_cooldown_seconds, v_rec.cooldown_seconds) THEN
      v_remaining_sec := pg_catalog.greatest(p_cooldown_seconds, v_rec.cooldown_seconds) - v_elapsed_sec;
      RETURN QUERY SELECT false, v_remaining_sec, v_rec.last_dispatched_at, v_rec.source_type;
      RETURN;
    ELSE
      -- Cooldown expired: atomically update timestamp
      UPDATE public.crm_whatsapp_recipient_pacing
      SET
        last_dispatched_at = v_now,
        source_type = p_source_type,
        source_campaign_id = p_source_campaign_id,
        source_worker_id = p_source_worker_id,
        cooldown_seconds = p_cooldown_seconds,
        updated_at = v_now
      WHERE normalized_phone = p_phone;

      RETURN QUERY SELECT true, 0, v_rec.last_dispatched_at, v_rec.source_type;
      RETURN;
    END IF;
  ELSE
    -- First dispatch to this phone: insert new pacing record
    INSERT INTO public.crm_whatsapp_recipient_pacing (
      normalized_phone,
      last_dispatched_at,
      source_type,
      source_campaign_id,
      source_worker_id,
      cooldown_seconds,
      updated_at
    ) VALUES (
      p_phone,
      v_now,
      p_source_type,
      p_source_campaign_id,
      p_source_worker_id,
      p_cooldown_seconds,
      v_now
    );

    RETURN QUERY SELECT true, 0, NULL::TIMESTAMPTZ, NULL::TEXT;
    RETURN;
  END IF;
END;
$$;

REVOKE ALL ON FUNCTION public.check_and_update_recipient_pacing(TEXT, TEXT, UUID, TEXT, INT) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.check_and_update_recipient_pacing(TEXT, TEXT, UUID, TEXT, INT) FROM anon;
GRANT EXECUTE ON FUNCTION public.check_and_update_recipient_pacing(TEXT, TEXT, UUID, TEXT, INT) TO authenticated, service_role;

-- ------------------------------------------------------------------------------
-- 14. CRM INBOX OUTBOUND PACING RECONCILIATION TRIGGER (STAGE 4.5 SAFETY NET)
-- Serves as a secondary reconciliation safety net for qualifying outbound sent
-- WhatsApp messages. Primary pre-send reservation is enforced inside the Edge Function.
-- Strictly filters out inbound, failed, draft, and pending messages.
-- ------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.sync_crm_message_to_pacing()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_wa_id TEXT;
BEGIN
  IF NEW.direction = 'outbound' AND NEW.status = 'sent' THEN
    SELECT c.wa_id INTO v_wa_id
    FROM public.crm_conversations c
    WHERE c.id = NEW.conversation_id;

    IF v_wa_id IS NOT NULL THEN
      INSERT INTO public.crm_whatsapp_recipient_pacing (
        normalized_phone,
        last_dispatched_at,
        source_type,
        cooldown_seconds,
        updated_at
      ) VALUES (
        v_wa_id,
        pg_catalog.coalesce(NEW.created_at, pg_catalog.now()),
        'crm_inbox',
        60,
        pg_catalog.now()
      )
      ON CONFLICT (normalized_phone) DO UPDATE
      SET
        last_dispatched_at = pg_catalog.greatest(
          public.crm_whatsapp_recipient_pacing.last_dispatched_at,
          EXCLUDED.last_dispatched_at
        ),
        source_type = CASE
          WHEN EXCLUDED.last_dispatched_at >= public.crm_whatsapp_recipient_pacing.last_dispatched_at
          THEN 'crm_inbox'
          ELSE public.crm_whatsapp_recipient_pacing.source_type
        END,
        updated_at = pg_catalog.now();
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.sync_crm_message_to_pacing() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.sync_crm_message_to_pacing() FROM anon;
GRANT EXECUTE ON FUNCTION public.sync_crm_message_to_pacing() TO authenticated, service_role;

DROP TRIGGER IF EXISTS trg_sync_crm_message_to_pacing ON public.crm_messages;
CREATE TRIGGER trg_sync_crm_message_to_pacing
  AFTER INSERT ON public.crm_messages
  FOR EACH ROW
  WHEN (NEW.direction = 'outbound' AND NEW.status = 'sent')
  EXECUTE FUNCTION public.sync_crm_message_to_pacing();
