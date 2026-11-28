-- ==============================================================================
-- Migration: 20261124000004_human_priority_pacing.sql
-- Target: bhwoenqfxbgkbrsmahjt (Staging) / lpbdwmpglwdedqdiovqu (Production)
-- Description: Stage 5K Human Agent Priority Pacing Implementation.
--
-- BUSINESS RULES:
-- 1. RULE A (Human Agent Priority): CRM inbox agents are NEVER blocked by
--    campaign cooldowns (can_dispatch = true always for crm_inbox).
-- 2. RULE B (Campaign Protection): Campaigns defer if a CRM message was sent
--    to the recipient within the cooldown window (default 60s).
-- 3. RULE C (Campaign-to-Campaign Pacing): Preserves 60s cooldown between
--    automated campaigns and serializes concurrent campaign workers.
-- 4. RULE D (Pre-Dispatch Priority Check): Exposes priority check helper so
--    workers can verify no human message arrived before Meta API dispatch.
-- ==============================================================================

-- 1. Schema Enhancement on crm_whatsapp_recipient_pacing
ALTER TABLE public.crm_whatsapp_recipient_pacing
  ADD COLUMN IF NOT EXISTS last_crm_message_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS last_campaign_message_at TIMESTAMPTZ;

-- Backfill legacy records
UPDATE public.crm_whatsapp_recipient_pacing
SET last_crm_message_at = last_dispatched_at
WHERE source_type = 'crm_inbox' AND last_crm_message_at IS NULL;

UPDATE public.crm_whatsapp_recipient_pacing
SET last_campaign_message_at = last_dispatched_at
WHERE source_type = 'campaign' AND last_campaign_message_at IS NULL;

-- ------------------------------------------------------------------------------
-- 2. REPAIR FUNCTION: check_and_update_recipient_pacing (Human Priority Edition)
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
  v_effective_cooldown INT;
BEGIN
  -- 1. Caller Privilege Verification (Admin/Moderator or Service Role Only)
  IF auth.role() = 'service_role' THEN
    NULL; -- Trusted worker / backend edge function
  ELSIF auth.role() = 'authenticated' AND auth.uid() IS NOT NULL THEN
    IF NOT (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')) THEN
      RAISE EXCEPTION 'Access denied: caller does not have campaign manager or CRM staff privileges';
    END IF;
  ELSE
    RAISE EXCEPTION 'Access denied: unauthorized caller role (%)', COALESCE(auth.role(), 'none');
  END IF;

  -- 2. Transaction-Scoped Advisory Lock on Normalized Phone Hash (Dedicated Namespace 424242)
  -- Serializes concurrent calls for the exact same phone across workers/agents.
  PERFORM pg_catalog.pg_advisory_xact_lock(424242, pg_catalog.hashtext(p_phone));

  -- 3. Row-Level Lock on pacing record
  SELECT * INTO v_rec
  FROM public.crm_whatsapp_recipient_pacing
  WHERE normalized_phone = p_phone
  FOR UPDATE;

  -- =========================================================================
  -- BRANCH 1: HUMAN CRM AGENT DISPATCH (RULE A: HUMAN PRIORITY)
  -- Human CRM inbox messages ALWAYS proceed. They are NEVER blocked by cooldown.
  -- =========================================================================
  IF p_source_type = 'crm_inbox' THEN
    IF FOUND THEN
      UPDATE public.crm_whatsapp_recipient_pacing
      SET
        last_dispatched_at = v_now,
        last_crm_message_at = v_now,
        source_type = 'crm_inbox',
        source_campaign_id = NULL,
        source_worker_id = p_source_worker_id,
        cooldown_seconds = p_cooldown_seconds,
        updated_at = v_now
      WHERE normalized_phone = p_phone;

      RETURN QUERY SELECT true, 0, v_rec.last_dispatched_at, v_rec.source_type;
      RETURN;
    ELSE
      INSERT INTO public.crm_whatsapp_recipient_pacing (
        normalized_phone,
        last_dispatched_at,
        last_crm_message_at,
        source_type,
        source_campaign_id,
        source_worker_id,
        cooldown_seconds,
        updated_at
      ) VALUES (
        p_phone,
        v_now,
        v_now,
        'crm_inbox',
        NULL,
        p_source_worker_id,
        p_cooldown_seconds,
        v_now
      )
      ON CONFLICT (normalized_phone) DO UPDATE
      SET
        last_dispatched_at = v_now,
        last_crm_message_at = v_now,
        source_type = 'crm_inbox',
        source_campaign_id = NULL,
        source_worker_id = p_source_worker_id,
        cooldown_seconds = p_cooldown_seconds,
        updated_at = v_now;

      RETURN QUERY SELECT true, 0, NULL::TIMESTAMPTZ, NULL::TEXT;
      RETURN;
    END IF;

  -- =========================================================================
  -- BRANCH 2: CAMPAIGN WORKER DISPATCH (RULE B: DEFER IF RECENT CRM OR CAMPAIGN)
  -- =========================================================================
  ELSE
    IF FOUND THEN
      v_effective_cooldown := GREATEST(p_cooldown_seconds, v_rec.cooldown_seconds);

      -- Check 2a: Recent CRM Agent Message (Human Priority Protection)
      IF v_rec.last_crm_message_at IS NOT NULL THEN
        v_elapsed_sec := pg_catalog.date_part('epoch', (v_now - v_rec.last_crm_message_at))::INT;
        IF v_elapsed_sec < v_effective_cooldown THEN
          v_remaining_sec := v_effective_cooldown - v_elapsed_sec;
          RETURN QUERY SELECT false, v_remaining_sec, v_rec.last_crm_message_at, 'crm_inbox'::TEXT;
          RETURN;
        END IF;
      END IF;

      -- Check 2b: Recent Campaign Message (Campaign-to-Campaign Pacing)
      IF v_rec.last_campaign_message_at IS NOT NULL THEN
        v_elapsed_sec := pg_catalog.date_part('epoch', (v_now - v_rec.last_campaign_message_at))::INT;
        IF v_elapsed_sec < v_effective_cooldown THEN
          v_remaining_sec := v_effective_cooldown - v_elapsed_sec;
          RETURN QUERY SELECT false, v_remaining_sec, v_rec.last_campaign_message_at, 'campaign'::TEXT;
          RETURN;
        END IF;
      END IF;

      -- Fallback Check 2c: Legacy last_dispatched_at (for rows without split timestamps)
      IF v_rec.last_crm_message_at IS NULL AND v_rec.last_campaign_message_at IS NULL THEN
        v_elapsed_sec := pg_catalog.date_part('epoch', (v_now - v_rec.last_dispatched_at))::INT;
        IF v_elapsed_sec < v_effective_cooldown THEN
          v_remaining_sec := v_effective_cooldown - v_elapsed_sec;
          RETURN QUERY SELECT false, v_remaining_sec, v_rec.last_dispatched_at, v_rec.source_type;
          RETURN;
        END IF;
      END IF;

      -- Both cooldowns expired: atomically grant reservation to campaign worker
      UPDATE public.crm_whatsapp_recipient_pacing
      SET
        last_dispatched_at = v_now,
        last_campaign_message_at = v_now,
        source_type = 'campaign',
        source_campaign_id = p_source_campaign_id,
        source_worker_id = p_source_worker_id,
        cooldown_seconds = p_cooldown_seconds,
        updated_at = v_now
      WHERE normalized_phone = p_phone;

      RETURN QUERY SELECT true, 0, v_rec.last_dispatched_at, v_rec.source_type;
      RETURN;
    ELSE
      -- First dispatch to this phone: grant reservation to campaign worker
      INSERT INTO public.crm_whatsapp_recipient_pacing (
        normalized_phone,
        last_dispatched_at,
        last_campaign_message_at,
        source_type,
        source_campaign_id,
        source_worker_id,
        cooldown_seconds,
        updated_at
      ) VALUES (
        p_phone,
        v_now,
        v_now,
        'campaign',
        p_source_campaign_id,
        p_source_worker_id,
        p_cooldown_seconds,
        v_now
      )
      ON CONFLICT (normalized_phone) DO NOTHING;

      -- Concurrency edge case safety: re-check if another worker inserted simultaneously
      IF NOT FOUND THEN
        SELECT * INTO v_rec
        FROM public.crm_whatsapp_recipient_pacing
        WHERE normalized_phone = p_phone
        FOR UPDATE;

        IF FOUND THEN
          v_effective_cooldown := GREATEST(p_cooldown_seconds, v_rec.cooldown_seconds);

          -- Check recent CRM
          IF v_rec.last_crm_message_at IS NOT NULL THEN
            v_elapsed_sec := pg_catalog.date_part('epoch', (v_now - v_rec.last_crm_message_at))::INT;
            IF v_elapsed_sec < v_effective_cooldown THEN
              v_remaining_sec := v_effective_cooldown - v_elapsed_sec;
              RETURN QUERY SELECT false, v_remaining_sec, v_rec.last_crm_message_at, 'crm_inbox'::TEXT;
              RETURN;
            END IF;
          END IF;

          -- Check recent campaign
          IF v_rec.last_campaign_message_at IS NOT NULL THEN
            v_elapsed_sec := pg_catalog.date_part('epoch', (v_now - v_rec.last_campaign_message_at))::INT;
            IF v_elapsed_sec < v_effective_cooldown THEN
              v_remaining_sec := v_effective_cooldown - v_elapsed_sec;
              RETURN QUERY SELECT false, v_remaining_sec, v_rec.last_campaign_message_at, 'campaign'::TEXT;
              RETURN;
            END IF;
          END IF;

          v_elapsed_sec := pg_catalog.date_part('epoch', (v_now - v_rec.last_dispatched_at))::INT;
          IF v_elapsed_sec < v_effective_cooldown THEN
            v_remaining_sec := v_effective_cooldown - v_elapsed_sec;
            RETURN QUERY SELECT false, v_remaining_sec, v_rec.last_dispatched_at, v_rec.source_type;
            RETURN;
          END IF;
        END IF;
      END IF;

      RETURN QUERY SELECT true, 0, NULL::TIMESTAMPTZ, NULL::TEXT;
      RETURN;
    END IF;
  END IF;
END;
$$;

-- ------------------------------------------------------------------------------
-- 3. REPAIR FUNCTION: sync_crm_message_to_pacing (Human Priority Edition)
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.sync_crm_message_to_pacing()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_wa_id TEXT;
  v_now TIMESTAMPTZ := pg_catalog.now();
  v_sent_at TIMESTAMPTZ;
BEGIN
  IF NEW.direction = 'outbound' AND NEW.status = 'sent' THEN
    SELECT c.wa_id INTO v_wa_id
    FROM public.crm_conversations c
    WHERE c.id = NEW.conversation_id;

    IF v_wa_id IS NOT NULL THEN
      v_sent_at := pg_catalog.coalesce(NEW.created_at, v_now);
      INSERT INTO public.crm_whatsapp_recipient_pacing (
        normalized_phone,
        last_dispatched_at,
        last_crm_message_at,
        source_type,
        cooldown_seconds,
        updated_at
      ) VALUES (
        v_wa_id,
        v_sent_at,
        v_sent_at,
        'crm_inbox',
        60,
        v_now
      )
      ON CONFLICT (normalized_phone) DO UPDATE
      SET
        last_dispatched_at = GREATEST(
          public.crm_whatsapp_recipient_pacing.last_dispatched_at,
          EXCLUDED.last_dispatched_at
        ),
        last_crm_message_at = GREATEST(
          pg_catalog.coalesce(public.crm_whatsapp_recipient_pacing.last_crm_message_at, '-infinity'::timestamptz),
          EXCLUDED.last_crm_message_at
        ),
        source_type = 'crm_inbox',
        cooldown_seconds = 60,
        updated_at = v_now;
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

-- ------------------------------------------------------------------------------
-- 4. NEW HELPER FUNCTION: check_campaign_dispatch_priority (Rule D)
-- Allows a campaign worker to re-check immediately before Meta API dispatch
-- whether a human CRM agent sent a message while batch processing was underway.
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.check_campaign_dispatch_priority(
  p_phone TEXT,
  p_max_age_seconds INT DEFAULT 60
)
RETURNS TABLE (
  can_proceed BOOLEAN,
  reason TEXT,
  seconds_remaining INT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_rec RECORD;
  v_now TIMESTAMPTZ := pg_catalog.now();
  v_elapsed INT;
BEGIN
  SELECT * INTO v_rec
  FROM public.crm_whatsapp_recipient_pacing
  WHERE normalized_phone = p_phone;

  IF NOT FOUND THEN
    RETURN QUERY SELECT true, 'no_pacing_record'::TEXT, 0;
    RETURN;
  END IF;

  IF v_rec.last_crm_message_at IS NOT NULL THEN
    v_elapsed := pg_catalog.date_part('epoch', (v_now - v_rec.last_crm_message_at))::INT;
    IF v_elapsed < p_max_age_seconds THEN
      RETURN QUERY SELECT false, 'recent_crm_message'::TEXT, (p_max_age_seconds - v_elapsed);
      RETURN;
    END IF;
  END IF;

  RETURN QUERY SELECT true, 'ok'::TEXT, 0;
  RETURN;
END;
$$;

-- ------------------------------------------------------------------------------
-- 5. GRANTS & REVOKES
-- ------------------------------------------------------------------------------
REVOKE ALL ON FUNCTION public.check_and_update_recipient_pacing(TEXT, TEXT, UUID, TEXT, INT) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.check_and_update_recipient_pacing(TEXT, TEXT, UUID, TEXT, INT) FROM anon;
GRANT EXECUTE ON FUNCTION public.check_and_update_recipient_pacing(TEXT, TEXT, UUID, TEXT, INT) TO authenticated, service_role;

REVOKE ALL ON FUNCTION public.sync_crm_message_to_pacing() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.sync_crm_message_to_pacing() FROM anon;
GRANT EXECUTE ON FUNCTION public.sync_crm_message_to_pacing() TO authenticated, service_role;

REVOKE ALL ON FUNCTION public.check_campaign_dispatch_priority(TEXT, INT) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.check_campaign_dispatch_priority(TEXT, INT) FROM anon;
GRANT EXECUTE ON FUNCTION public.check_campaign_dispatch_priority(TEXT, INT) TO authenticated, service_role;
