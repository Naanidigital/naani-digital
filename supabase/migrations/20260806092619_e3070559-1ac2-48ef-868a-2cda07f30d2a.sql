DELETE FROM public.project_submissions WHERE submitter_name='a' AND submitter_phone='9705080909';
DELETE FROM public.projects WHERE name='T' AND source='list-your-property';

DROP POLICY IF EXISTS "Read submission media property-media" ON storage.objects;
CREATE POLICY "Read submission media property-media"
ON storage.objects FOR SELECT TO anon, authenticated
USING (
  bucket_id = 'property-media'
  AND (storage.foldername(name))[1] = 'submissions'
);