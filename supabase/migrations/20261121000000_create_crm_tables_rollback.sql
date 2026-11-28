-- ==============================================================================
-- Migration Rollback: 20261121000000_create_crm_tables_rollback.sql
-- Description: Safely rolls back Phase 1 CRM tables, policies, and triggers
-- without affecting any existing tables (projects, user_roles, project_submissions).
-- ==============================================================================

-- 1. Remove tables from Supabase Realtime publication
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'crm_messages'
  ) THEN
    ALTER PUBLICATION supabase_realtime DROP TABLE public.crm_messages;
  END IF;

  IF EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'crm_conversations'
  ) THEN
    ALTER PUBLICATION supabase_realtime DROP TABLE public.crm_conversations;
  END IF;
END $$;

-- 2. Drop tables in cascade order (foreign key dependencies: messages -> conversations -> leads)
DROP TABLE IF EXISTS public.crm_messages CASCADE;
DROP TABLE IF EXISTS public.crm_conversations CASCADE;
DROP TABLE IF EXISTS public.crm_leads CASCADE;

-- 3. Drop normalization helper function
DROP FUNCTION IF EXISTS public.normalize_phone(text);
