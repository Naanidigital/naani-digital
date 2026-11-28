-- ==============================================================================
-- Migration: 20261124000002_atomic_pacing_advisory_lock.sql
-- Description: Stage 5B Step 3.1 Concurrency Hardening for Recipient Pacing.
--
-- Adds transaction-scoped PostgreSQL advisory locking on normalized_phone
-- hash combined with ON CONFLICT DO NOTHING safety in:
-- public.check_and_update_recipient_pacing()
--
-- Guarantees that concurrent first-time reservation attempts for the same phone
-- cleanly serialize without throwing duplicate-key exceptions (SQLSTATE 23505).
-- Exactly one transaction succeeds (can_dispatch = true), and all simultaneous
-- callers receive a controlled denial (can_dispatch = false) with remaining cooldown.
-- ==============================================================================

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
  -- 1. Caller Privilege Verification (Admin/Moderator or Service Role Only)
  IF auth.role() = 'service_role' THEN
    NULL; -- Trusted worker
  ELSIF auth.role() = 'authenticated' AND auth.uid() IS NOT NULL THEN
    IF NOT (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')) THEN
      RAISE EXCEPTION 'Access denied: caller does not have campaign manager or CRM staff privileges';
    END IF;
  ELSE
    RAISE EXCEPTION 'Access denied: unauthorized caller role (%)', pg_catalog.coalesce(auth.role(), 'none');
  END IF;

  -- 2. Transaction-Scoped Advisory Lock on Normalized Phone Hash
  -- Dedicated lock namespace 424242 prevents collisions with other advisory locks.
  -- Serializes concurrent reservations for the same recipient across workers/campaigns.
  PERFORM pg_catalog.pg_advisory_xact_lock(424242, pg_catalog.hashtext(p_phone));

  -- 3. Row-Level Lock on pacing record for atomic cross-worker/cross-campaign coordination
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
    -- 4. First dispatch to this phone: insert new pacing record
    -- ON CONFLICT DO NOTHING ensures complete safety against edge-case races.
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
    )
    ON CONFLICT (normalized_phone) DO NOTHING;

    -- If another concurrent operation somehow inserted right before, re-fetch and evaluate cooldown
    IF NOT FOUND THEN
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
        END IF;
      END IF;
    END IF;

    RETURN QUERY SELECT true, 0, NULL::TIMESTAMPTZ, NULL::TEXT;
    RETURN;
  END IF;
END;
$$;

REVOKE ALL ON FUNCTION public.check_and_update_recipient_pacing(TEXT, TEXT, UUID, TEXT, INT) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.check_and_update_recipient_pacing(TEXT, TEXT, UUID, TEXT, INT) FROM anon;
GRANT EXECUTE ON FUNCTION public.check_and_update_recipient_pacing(TEXT, TEXT, UUID, TEXT, INT) TO authenticated, service_role;
