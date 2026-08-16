
-- Public read on property-media (we'll serve images via signed/public URLs)
CREATE POLICY "Public read property-media"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'property-media');

-- Public uploads to property-media (submitters)
CREATE POLICY "Public upload property-media"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'property-media');
