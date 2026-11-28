-- ==============================================================================
-- Storage Setup: 20261121000003_storage_property_media.sql
-- Target: lpbdwmpglwdedqdiovqu (Naani.in Primary Production Backend)
-- Description: Strict dual-bucket storage architecture separating:
--   1. property-media (PUBLIC) - Catalog photos, brochures, and approved floor plans
--   2. property-documents (PRIVATE) - Title deeds, identity proofs, confidential submissions
--
-- Upload Path Restrictions (Enforced strictly on property-media):
--   - submissions/{ticket_id}/{filename}
--   - submissions/{ticket_id}/hero/{filename}
--   - submissions/{ticket_id}/gallery/{filename}
--   - submissions/{ticket_id}/brochure/{filename}
--   - submissions/{ticket_id}/floor-plans/{filename}
-- All arbitrary folders, nested paths, invalid categories, and expired tickets are REJECTED.
--
-- Security Guarantee on property-documents:
--   - ZERO anonymous uploads allowed (Only authenticated staff: admin/moderator).
--   - ZERO anonymous reads/listings allowed (Only authenticated staff: admin/moderator).
--
-- Note on RLS: storage.objects has Row Level Security enabled by default by Supabase.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. BUCKET DEFINITIONS
-- ------------------------------------------------------------------------------

-- Bucket A: property-media (Public project catalog assets & marketing media)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'property-media',
  'property-media',
  true,
  52428800, -- 50 MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 52428800,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf'];

-- Bucket B: property-documents (PRIVATE confidential documents & customer deeds)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'property-documents',
  'property-documents',
  false, -- STRICTLY PRIVATE (No direct URL downloads)
  52428800, -- 50 MB limit
  ARRAY['application/pdf', 'image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
  public = false,
  file_size_limit = 52428800,
  allowed_mime_types = ARRAY['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];

-- ------------------------------------------------------------------------------
-- 2. POLICIES FOR 'property-media' (PUBLIC BUCKET)
-- ------------------------------------------------------------------------------

-- Policy 1: Ticketed Submissions Upload into property-media
-- Strictly enforces the 5 exact allowed upload path structures
DROP POLICY IF EXISTS "Ticketed submissions upload property-media" ON storage.objects;
CREATE POLICY "Ticketed submissions upload property-media"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (
  bucket_id = 'property-media'
  AND (storage.foldername(name))[1] = 'submissions'
  AND public.is_valid_upload_ticket((storage.foldername(name))[2])
  AND (
    -- Path format 1: submissions/{ticket_id}/{filename}
    array_length(storage.foldername(name), 1) = 2
    OR
    -- Path format 2: submissions/{ticket_id}/{category}/{filename}
    (
      array_length(storage.foldername(name), 1) = 3
      AND (storage.foldername(name))[3] = ANY (ARRAY['hero', 'gallery', 'brochure', 'floor-plans'])
    )
  )
  AND lower(storage.extension(name)) = ANY (ARRAY['jpg','jpeg','png','webp','gif','pdf'])
);

-- Policy 2: Public Read for property-media catalog
DROP POLICY IF EXISTS "Read submission media property-media" ON storage.objects;
CREATE POLICY "Read submission media property-media"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (
  bucket_id = 'property-media'
);

-- Policy 3: Admin Management for property-media
DROP POLICY IF EXISTS "Admins can manage property-media" ON storage.objects;
CREATE POLICY "Admins can manage property-media"
ON storage.objects FOR ALL
TO authenticated
USING (
  bucket_id = 'property-media'
  AND (auth.uid() IS NOT NULL AND public.has_role(auth.uid(), 'admin'))
)
WITH CHECK (
  bucket_id = 'property-media'
  AND (auth.uid() IS NOT NULL AND public.has_role(auth.uid(), 'admin'))
);

-- ------------------------------------------------------------------------------
-- 3. POLICIES FOR 'property-documents' (STRICTLY PRIVATE BUCKET)
-- ------------------------------------------------------------------------------

-- Policy 4: Staff-Only Upload for confidential property documents
-- Anonymous users are strictly DENIED upload into property-documents.
-- Only authenticated staff (admins & moderators) can upload sensitive deeds/documents.
DROP POLICY IF EXISTS "Staff upload private property-documents" ON storage.objects;
DROP POLICY IF EXISTS "Ticketed upload private property-documents" ON storage.objects;
CREATE POLICY "Staff upload private property-documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'property-documents'
  AND auth.uid() IS NOT NULL
  AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator'))
  AND lower(storage.extension(name)) = ANY (ARRAY['pdf','jpg','jpeg','png','webp'])
);

-- Policy 5: Staff-Only SELECT for private property documents
-- Anonymous users and standard users are strictly DENIED SELECT (HTTP 403).
-- Authorized staff (admins & moderators) only.
DROP POLICY IF EXISTS "Staff read private property-documents" ON storage.objects;
CREATE POLICY "Staff read private property-documents"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'property-documents'
  AND auth.uid() IS NOT NULL
  AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator'))
);

-- Policy 6: Admin Management for private property documents (UPDATE & DELETE)
DROP POLICY IF EXISTS "Admin manage private property-documents" ON storage.objects;
CREATE POLICY "Admin manage private property-documents"
ON storage.objects FOR ALL
TO authenticated
USING (
  bucket_id = 'property-documents'
  AND auth.uid() IS NOT NULL
  AND public.has_role(auth.uid(), 'admin')
)
WITH CHECK (
  bucket_id = 'property-documents'
  AND auth.uid() IS NOT NULL
  AND public.has_role(auth.uid(), 'admin')
);
