-- ==============================================================================
-- Verification Script: 20261121000001_verify_schema_and_storage.sql
-- Target: lpbdwmpglwdedqdiovqu (Naani.in Primary Production Backend)
-- Description: Comprehensive read-only audit verifying that all tables, functions,
-- RLS policies, storage buckets, and Realtime publications are correctly installed.
-- ==============================================================================

-- 1. Verify Public Tables and RLS Status
SELECT 
  tablename AS "Table Name",
  rowsecurity AS "RLS Enabled",
  CASE WHEN rowsecurity THEN 'PASS' ELSE 'FAIL' END AS "RLS Status"
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('projects', 'user_roles', 'upload_tickets', 'project_submissions', 'crm_leads', 'crm_conversations', 'crm_messages')
ORDER BY tablename;

-- 2. Verify Custom Database Functions
SELECT 
  proname AS "Function Name",
  prosecdef AS "Security Definer",
  provolatile AS "Volatility",
  'INSTALLED' AS "Status"
FROM pg_proc 
WHERE proname IN ('set_updated_at', 'normalize_phone', 'has_role', 'is_valid_upload_ticket')
  AND pronamespace = 'public'::regnamespace
ORDER BY proname;

-- 3. Verify Custom Enums
SELECT 
  t.typname AS "Enum Name",
  string_agg(e.enumlabel, ', ' ORDER BY e.enumsortorder) AS "Enum Values",
  'INSTALLED' AS "Status"
FROM pg_type t 
JOIN pg_enum e ON t.oid = e.enumtypid 
WHERE t.typname = 'app_role'
GROUP BY t.typname;

-- 4. Verify Active RLS Policies Across All Tables
SELECT 
  tablename AS "Table",
  policyname AS "Policy Name",
  cmd AS "Command",
  roles::text AS "Roles",
  'ACTIVE' AS "Status"
FROM pg_policies 
WHERE schemaname = 'public' 
ORDER BY tablename, cmd, policyname;

-- 5. Verify Storage Buckets
SELECT 
  id AS "Bucket Name",
  public AS "Is Public",
  file_size_limit / 1048576 AS "Size Limit (MB)",
  allowed_mime_types AS "Allowed MIME Types",
  CASE 
    WHEN id = 'property-media' AND public = true THEN 'PASS (Public Catalog)'
    WHEN id = 'property-documents' AND public = false THEN 'PASS (Private Deeds)'
    ELSE 'CHECK REQUIRED'
  END AS "Security Verification"
FROM storage.buckets 
WHERE id IN ('property-media', 'property-documents')
ORDER BY id;

-- 6. Verify Storage RLS Policies
SELECT 
  policyname AS "Storage Policy Name",
  cmd AS "Command",
  roles::text AS "Target Roles",
  'ACTIVE' AS "Status"
FROM pg_policies 
WHERE schemaname = 'storage' AND tablename = 'objects'
ORDER BY cmd, policyname;

-- 7. Verify Realtime Publication
SELECT 
  tablename AS "Realtime Published Table",
  schemaname AS "Schema",
  'REALTIME ACTIVE' AS "Status"
FROM pg_publication_tables 
WHERE pubname = 'supabase_realtime' 
  AND tablename IN ('projects', 'crm_conversations', 'crm_messages')
ORDER BY tablename;
