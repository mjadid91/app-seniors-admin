-- Créer des politiques très permissives pour le bucket documents-rgpd
CREATE POLICY "Public storage access for documents-rgpd"
ON storage.objects
FOR ALL 
USING (bucket_id = 'documents-rgpd')
WITH CHECK (bucket_id = 'documents-rgpd');