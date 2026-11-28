-- ==============================================================================
-- Migration: 20261122000000_trg_crm_inbound_unread_count.sql
-- Description: High-concurrency atomic PostgreSQL trigger to increment
-- crm_conversations.unread_count and update conversation metadata on inbound
-- messages. Eliminates TOCTOU race conditions and count inflation.
--
-- Security:
-- 1. SECURITY DEFINER with hardened search_path = pg_catalog, public, pg_temp.
-- 2. Revokes execution from PUBLIC, anon, authenticated, and service_role.
-- 3. Grants EXECUTE strictly to postgres (trigger owner/creator).
-- 4. Excluded from PostgREST RPC routing (returns TRIGGER).
-- 5. Idempotent and safe to apply without modifying existing conversation data.
-- ==============================================================================

-- 1. Create or replace the trigger function
CREATE OR REPLACE FUNCTION public.sync_crm_conversation_on_inbound()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public, pg_temp
AS $$
BEGIN
  -- Only increment and update on inbound customer messages
  IF NEW.direction = 'inbound' THEN
    UPDATE public.crm_conversations
    SET 
      unread_count = COALESCE(unread_count, 0) + 1,
      last_message_text = NEW.content,
      last_message_at = COALESCE(NEW.created_at, now()),
      status = 'open',
      updated_at = now()
    WHERE id = NEW.conversation_id;

    -- If the parent conversation row does not exist, raise an exception to roll back the insert
    IF NOT FOUND THEN
      RAISE EXCEPTION 'Parent conversation % not found for message %', NEW.conversation_id, NEW.id;
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

-- 2. Restrict function permissions to prevent direct RPC execution
REVOKE ALL ON FUNCTION public.sync_crm_conversation_on_inbound() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.sync_crm_conversation_on_inbound() FROM anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.sync_crm_conversation_on_inbound() TO postgres;

-- 3. Bind the trigger to crm_messages AFTER INSERT
DROP TRIGGER IF EXISTS trg_crm_inbound_message ON public.crm_messages;
CREATE TRIGGER trg_crm_inbound_message
  AFTER INSERT ON public.crm_messages
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_crm_conversation_on_inbound();
