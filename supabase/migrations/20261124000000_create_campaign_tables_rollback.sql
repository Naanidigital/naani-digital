-- ==============================================================================
-- Migration Rollback: 20261124000000_create_campaign_tables_rollback.sql
-- Target Project: lpbdwmpglwdedqdiovqu (Naani Projects Dedicated CRM Backend)
-- Description: Safely rolls back Phase 1 WhatsApp Campaign Manager tables,
-- functions, realtime publications and policies without touching existing CRM
-- tables (crm_leads, crm_conversations, crm_messages, projects, user_roles).
-- ==============================================================================

-- 1. Remove tables from Supabase Realtime publication
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'crm_campaign_events'
  ) THEN
    ALTER PUBLICATION supabase_realtime DROP TABLE public.crm_campaign_events;
  END IF;

  IF EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'crm_campaigns'
  ) THEN
    ALTER PUBLICATION supabase_realtime DROP TABLE public.crm_campaigns;
  END IF;
END $$;

-- 2. Drop campaign triggers and functions
DROP TRIGGER IF EXISTS trg_check_crm_campaign_transitions ON public.crm_campaigns;
DROP FUNCTION IF EXISTS public.check_crm_campaign_transitions() CASCADE;

DROP FUNCTION IF EXISTS public.reconcile_ambiguous_recipient(UUID, TEXT, BOOLEAN, TEXT, TEXT) CASCADE;
DROP FUNCTION IF EXISTS public.reconcile_ambiguous_recipient(UUID, TEXT, TEXT, TEXT) CASCADE;
DROP FUNCTION IF EXISTS public.claim_campaign_recipient_batch(UUID, TEXT, INT, INT) CASCADE;
DROP FUNCTION IF EXISTS public.recover_stale_campaign_leases(UUID) CASCADE;
DROP FUNCTION IF EXISTS public.sync_campaign_counters(UUID) CASCADE;
DROP TRIGGER IF EXISTS trg_sync_crm_message_to_pacing ON public.crm_messages;
DROP FUNCTION IF EXISTS public.sync_crm_message_to_pacing() CASCADE;
DROP FUNCTION IF EXISTS public.check_and_update_recipient_pacing(TEXT, TEXT, UUID, TEXT, INT) CASCADE;

-- 3. Drop tables in reverse dependency order
DROP TABLE IF EXISTS public.crm_whatsapp_recipient_pacing CASCADE;
DROP TABLE IF EXISTS public.crm_campaign_events CASCADE;
DROP TABLE IF EXISTS public.crm_campaign_recipients CASCADE;
DROP TABLE IF EXISTS public.crm_campaign_imports CASCADE;
DROP TABLE IF EXISTS public.crm_campaigns CASCADE;
DROP TABLE IF EXISTS public.crm_whatsapp_templates CASCADE;
DROP TABLE IF EXISTS public.crm_whatsapp_suppressions CASCADE;
