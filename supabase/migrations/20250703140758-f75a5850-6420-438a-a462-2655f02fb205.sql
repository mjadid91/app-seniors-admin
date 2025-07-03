
-- Supprimer les anciennes politiques RLS sur storage.objects
DROP POLICY IF EXISTS "Users can view their own files via IDAuth and admins can view all" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload files for any user" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own files via IDAuth and admins can delete all" ON storage.objects;

-- Créer des politiques RLS plus permissives pour storage.objects
-- Politique SELECT : tous les utilisateurs authentifiés peuvent voir les fichiers du bucket documents
CREATE POLICY "Authenticated users can view documents"
ON storage.objects
FOR SELECT 
USING (
  bucket_id = 'documents' AND auth.uid() IS NOT NULL
);

-- Politique INSERT : tous les utilisateurs authentifiés peuvent uploader dans le bucket documents
CREATE POLICY "Authenticated users can upload documents"
ON storage.objects
FOR INSERT 
WITH CHECK (
  bucket_id = 'documents' AND auth.uid() IS NOT NULL
);

-- Politique DELETE : tous les utilisateurs authentifiés peuvent supprimer dans le bucket documents
CREATE POLICY "Authenticated users can delete documents"
ON storage.objects
FOR DELETE 
USING (
  bucket_id = 'documents' AND auth.uid() IS NOT NULL
);

-- Mettre à jour les politiques sur la table Document pour être plus permissives
DROP POLICY IF EXISTS "Admins can insert documents for any user" ON "Document";

-- Nouvelle politique INSERT plus permissive pour la table Document
CREATE POLICY "Authenticated admins can insert documents" 
ON "Document"
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM "Utilisateurs" u
    JOIN "CatUtilisateurs" c ON u."IDCatUtilisateurs" = c."IDCatUtilisateurs"
    WHERE u."IDUtilisateurs" = "IDUtilisateurs" 
    AND c."EstAdministrateur" = true
  )
);
