
-- Créer les politiques de stockage pour le bucket 'documents' public
-- Politique pour permettre aux utilisateurs de voir leurs propres fichiers + admins voient tout
CREATE POLICY "Users can view their own files and admins can view all"
ON storage.objects
FOR SELECT 
USING (
  bucket_id = 'documents' AND (
    -- L'utilisateur peut voir ses propres fichiers (le chemin commence par son ID)
    (auth.uid()::text = (string_to_array(name, '/'))[1])
    OR
    -- Les administrateurs peuvent voir tous les fichiers
    EXISTS (
      SELECT 1 FROM "Utilisateurs" u
      JOIN "CatUtilisateurs" c ON u."IDCatUtilisateurs" = c."IDCatUtilisateurs"
      WHERE u."IDUtilisateurs"::text = auth.uid()::text 
      AND c."EstAdministrateur" = true
    )
  )
);

-- Politique pour permettre aux utilisateurs d'uploader dans leur dossier
CREATE POLICY "Users can upload to their own folder"
ON storage.objects
FOR INSERT 
WITH CHECK (
  bucket_id = 'documents' AND 
  auth.uid()::text = (string_to_array(name, '/'))[1]
);

-- Politique pour permettre aux utilisateurs de supprimer leurs propres fichiers + admins suppriment tout
CREATE POLICY "Users can delete their own files and admins can delete all"
ON storage.objects
FOR DELETE 
USING (
  bucket_id = 'documents' AND (
    -- L'utilisateur peut supprimer ses propres fichiers
    (auth.uid()::text = (string_to_array(name, '/'))[1])
    OR
    -- Les administrateurs peuvent supprimer tous les fichiers
    EXISTS (
      SELECT 1 FROM "Utilisateurs" u
      JOIN "CatUtilisateurs" c ON u."IDCatUtilisateurs" = c."IDCatUtilisateurs"
      WHERE u."IDUtilisateurs"::text = auth.uid()::text 
      AND c."EstAdministrateur" = true
    )
  )
);
