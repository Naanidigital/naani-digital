-- ==============================================================================
-- Migration: 20261124000001_repair_pacing_functions.sql
-- Description: Stage 5B Step 2.2 Repair for Pacing Functions & Grants.
--
-- 1. Replaces pg_catalog.greatest(...) with language-level GREATEST(...) in:
--    - public.check_and_update_recipient_pacing()
--    - public.sync_crm_message_to_pacing()
--    In PostgreSQL, GREATEST is a conditional expression construct, not a function
--    in pg_catalog.
-- 2. Grants minimum required privileges on public.crm_whatsapp_recipient_pacing
--    to service_role and authenticated staff (governed by RLS), explicitly
--    revoking all privileges from anon.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. REPAIR FUNCTION: check_and_update_recipient_pacing
-- ------------------------------------------------------------------------------
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
    IF v_elapsed_sec < GREATEST(p_cooldown_seconds, v_rec.cooldown_seconds) THEN
      v_remaining_sec := GREATEST(p_cooldown_seconds, v_rec.cooldown_seconds) - v_elapsed_sec;
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
-- 2. REPAIR FUNCTION & TRIGGER: sync_crm_message_to_pacing
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
        last_dispatched_at = GREATEST(
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

-- ------------------------------------------------------------------------------
-- 3. PERMISSIONS FOR crm_whatsapp_recipient_pacing
-- Aligns with section 11 permissions for all other campaign tables.
-- ------------------------------------------------------------------------------
GRANT ALL ON public.crm_whatsapp_recipient_pacing TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.crm_whatsapp_recipient_pacing TO authenticated;
REVOKE ALL ON public.crm_whatsapp_recipient_pacing FROM anon;
