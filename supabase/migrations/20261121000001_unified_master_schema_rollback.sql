-- ==============================================================================
-- Rollback Migration for Step 1: 20261121000001_unified_master_schema_rollback.sql
-- Target: lpbdwmpglwdedqdiovqu (ONLY)
-- Description: Completely tears down all tables, functions, triggers, and storage
-- policies created by 20261121000001 and 20261121000003, restoring clean slate.
-- NEVER RUN ON PRODUCTION hadxpgwzmvxqslcyykyw!
-- ==============================================================================

-- 1. Remove Realtime Publications
ALTER PUBLICATION supabase_realtime DROP TABLE IF EXISTS public.crm_messages;
ALTER PUBLICATION supabase_realtime DROP TABLE IF EXISTS public.crm_conversations;
ALTER PUBLICATION supabase_realtime DROP TABLE IF EXISTS public.projects;

-- 2. Drop Storage Policies & Buckets
DROP POLICY IF EXISTS "Ticketed submissions upload property-media" ON storage.objects;
DROP POLICY IF EXISTS "Read submission media property-media" ON storage.objects;
DROP POLICY IF EXISTS "Admins can manage property-media" ON storage.objects;
DROP POLICY IF EXISTS "Staff upload private property-documents" ON storage.objects;
DROP POLICY IF EXISTS "Staff read private property-documents" ON storage.objects;
DROP POLICY IF EXISTS "Admin manage private property-documents" ON storage.objects;

DELETE FROM storage.buckets WHERE id IN ('property-media', 'property-documents');

-- 3. Drop CRM & Application Tables (in reverse dependency order)
DROP TABLE IF EXISTS public.crm_messages CASCADE;
DROP TABLE IF EXISTS public.crm_conversations CASCADE;
DROP TABLE IF EXISTS public.crm_leads CASCADE;
DROP TABLE IF EXISTS public.project_submissions CASCADE;
DROP TABLE IF EXISTS public.projects CASCADE;
DROP TABLE IF EXISTS public.upload_tickets CASCADE;
DROP TABLE IF EXISTS public.user_roles CASCADE;

-- 4. Drop Types and Enums
DROP TYPE IF EXISTS public.app_role CASCADE;

-- 5. Drop Functions
DROP FUNCTION IF EXISTS public.set_updated_at() CASCADE;
DROP FUNCTION IF EXISTS public.normalize_phone(text) CASCADE;
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role) CASCADE;
DROP FUNCTION IF EXISTS public.is_valid_upload_ticket(text) CASCADE;
