-- ==============================================================================
-- Migration: 20261124000003_repair_reconcile_rpc.sql
-- Target: bhwoenqfxbgkbrsmahjt (Staging) / lpbdwmpglwdedqdiovqu (Production)
-- Description: Forward repair migration to ensure public.reconcile_ambiguous_recipient
-- uses pg_catalog.btrim instead of pg_catalog.trim, resolving PostgreSQL 42883.
-- Sets strict security definer, search_path = '', and RBAC execution permissions.
-- ==============================================================================

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
    RAISE EXCEPTION 'Access denied: unauthorized caller role (%)', COALESCE(auth.role(), 'none');
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
