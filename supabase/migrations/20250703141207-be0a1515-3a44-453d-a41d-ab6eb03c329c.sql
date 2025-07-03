-- Supprimer les politiques RLS actuelles sur storage.objects
DROP POLICY IF EXISTS "Authenticated users can view documents" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload documents" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete documents" ON storage.objects;

-- Créer des politiques RLS très permissives pour storage.objects
-- Permettre à tous de voir les fichiers du bucket documents
CREATE POLICY "Allow all to view documents"
ON storage.objects
FOR SELECT 
USING (bucket_id = 'documents');

-- Permettre à tous d'uploader dans le bucket documents
CREATE POLICY "Allow all to upload documents"
ON storage.objects
FOR INSERT 
WITH CHECK (bucket_id = 'documents');

-- Permettre à tous de supprimer dans le bucket documents
CREATE POLICY "Allow all to delete documents"
ON storage.objects
FOR DELETE 
USING (bucket_id = 'documents');

-- Simplifier la politique INSERT pour la table Document
DROP POLICY IF EXISTS "Authenticated admins can insert documents" ON "Document";

-- Nouvelle politique INSERT très permissive pour la table Document
CREATE POLICY "Allow all to insert documents" 
ON "Document"
FOR INSERT 
WITH CHECK (true);