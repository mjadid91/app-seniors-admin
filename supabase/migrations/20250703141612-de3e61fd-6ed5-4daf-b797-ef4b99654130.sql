-- Supprimer toutes les politiques RLS existantes sur la table Document
DROP POLICY IF EXISTS "Users can view their own documents via IDAuth" ON "Document";
DROP POLICY IF EXISTS "Users can update their own documents via IDAuth" ON "Document";
DROP POLICY IF EXISTS "Users can delete their own documents via IDAuth" ON "Document";
DROP POLICY IF EXISTS "Allow all to insert documents" ON "Document";
DROP POLICY IF EXISTS "Authenticated admins can insert documents" ON "Document";

-- Créer des politiques RLS très permissives pour la table Document
-- Permettre à tous de voir les documents
CREATE POLICY "Public can view documents"
ON "Document"
FOR SELECT 
USING (true);

-- Permettre à tous d'insérer des documents
CREATE POLICY "Public can insert documents"
ON "Document"
FOR INSERT 
WITH CHECK (true);

-- Permettre à tous de modifier des documents
CREATE POLICY "Public can update documents"
ON "Document"
FOR UPDATE 
USING (true);

-- Permettre à tous de supprimer des documents
CREATE POLICY "Public can delete documents"
ON "Document"
FOR DELETE 
USING (true);

-- Supprimer aussi les politiques sur storage.objects et les recréer de manière permissive
DROP POLICY IF EXISTS "Users can view their own files via IDAuth and admins can view all" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload files for any user" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own files via IDAuth and admins can delete all" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can view documents" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload documents" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete documents" ON storage.objects;
DROP POLICY IF EXISTS "Allow all to view documents" ON storage.objects;
DROP POLICY IF EXISTS "Allow all to upload documents" ON storage.objects;
DROP POLICY IF EXISTS "Allow all to delete documents" ON storage.objects;

-- Créer des politiques très permissives pour storage.objects
CREATE POLICY "Public storage access"
ON storage.objects
FOR ALL 
USING (bucket_id = 'documents')
WITH CHECK (bucket_id = 'documents');