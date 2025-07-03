
-- Supprimer les anciennes politiques RLS sur la table Document
DROP POLICY IF EXISTS "Users can view their own documents" ON "Document";
DROP POLICY IF EXISTS "Users can insert their own documents" ON "Document";
DROP POLICY IF EXISTS "Users can update their own documents" ON "Document";
DROP POLICY IF EXISTS "Users can delete their own documents" ON "Document";

-- Supprimer les anciennes politiques RLS sur storage.objects
DROP POLICY IF EXISTS "Users can view their own files and admins can view all" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload to their own folder" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own files and admins can delete all" ON storage.objects;

-- Créer les nouvelles politiques RLS pour la table Document
-- Politique SELECT : utilisateurs voient leurs propres documents + admins voient tout
CREATE POLICY "Users can view their own documents via IDAuth" 
ON "Document"
FOR SELECT 
USING (
  -- L'utilisateur connecté correspond à l'utilisateur du document
  EXISTS (
    SELECT 1 FROM "Utilisateurs" u
    WHERE u."IDAuth" = auth.uid() 
    AND u."IDUtilisateurs" = "Document"."IDUtilisateurs"
  )
  OR
  -- Les administrateurs peuvent voir tous les documents
  EXISTS (
    SELECT 1 FROM "Utilisateurs" u
    JOIN "CatUtilisateurs" c ON u."IDCatUtilisateurs" = c."IDCatUtilisateurs"
    WHERE u."IDAuth" = auth.uid() 
    AND c."EstAdministrateur" = true
  )
);

-- Politique INSERT : seuls les admins peuvent insérer des documents
CREATE POLICY "Admins can insert documents for any user" 
ON "Document"
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM "Utilisateurs" u
    JOIN "CatUtilisateurs" c ON u."IDCatUtilisateurs" = c."IDCatUtilisateurs"
    WHERE u."IDAuth" = auth.uid() 
    AND c."EstAdministrateur" = true
  )
);

-- Politique UPDATE : utilisateurs peuvent modifier leurs propres documents + admins peuvent tout modifier
CREATE POLICY "Users can update their own documents via IDAuth" 
ON "Document"
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM "Utilisateurs" u
    WHERE u."IDAuth" = auth.uid() 
    AND u."IDUtilisateurs" = "Document"."IDUtilisateurs"
  )
  OR
  EXISTS (
    SELECT 1 FROM "Utilisateurs" u
    JOIN "CatUtilisateurs" c ON u."IDCatUtilisateurs" = c."IDCatUtilisateurs"
    WHERE u."IDAuth" = auth.uid() 
    AND c."EstAdministrateur" = true
  )
);

-- Politique DELETE : utilisateurs peuvent supprimer leurs propres documents + admins peuvent tout supprimer
CREATE POLICY "Users can delete their own documents via IDAuth" 
ON "Document"
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM "Utilisateurs" u
    WHERE u."IDAuth" = auth.uid() 
    AND u."IDUtilisateurs" = "Document"."IDUtilisateurs"
  )
  OR
  EXISTS (
    SELECT 1 FROM "Utilisateurs" u
    JOIN "CatUtilisateurs" c ON u."IDCatUtilisateurs" = c."IDCatUtilisateurs"
    WHERE u."IDAuth" = auth.uid() 
    AND c."EstAdministrateur" = true
  )
);

-- Créer les nouvelles politiques RLS pour storage.objects
-- Politique SELECT : utilisateurs voient leurs propres fichiers + admins voient tout
CREATE POLICY "Users can view their own files via IDAuth and admins can view all"
ON storage.objects
FOR SELECT 
USING (
  bucket_id = 'documents' AND (
    -- L'utilisateur peut voir ses propres fichiers (le chemin commence par son IDUtilisateurs)
    EXISTS (
      SELECT 1 FROM "Utilisateurs" u
      WHERE u."IDAuth" = auth.uid() 
      AND u."IDUtilisateurs"::text = (string_to_array(name, '/'))[1]
    )
    OR
    -- Les administrateurs peuvent voir tous les fichiers
    EXISTS (
      SELECT 1 FROM "Utilisateurs" u
      JOIN "CatUtilisateurs" c ON u."IDCatUtilisateurs" = c."IDCatUtilisateurs"
      WHERE u."IDAuth" = auth.uid() 
      AND c."EstAdministrateur" = true
    )
  )
);

-- Politique INSERT : seuls les admins peuvent uploader des fichiers
CREATE POLICY "Admins can upload files for any user"
ON storage.objects
FOR INSERT 
WITH CHECK (
  bucket_id = 'documents' AND 
  EXISTS (
    SELECT 1 FROM "Utilisateurs" u
    JOIN "CatUtilisateurs" c ON u."IDCatUtilisateurs" = c."IDCatUtilisateurs"
    WHERE u."IDAuth" = auth.uid() 
    AND c."EstAdministrateur" = true
  )
);

-- Politique DELETE : utilisateurs peuvent supprimer leurs propres fichiers + admins suppriment tout
CREATE POLICY "Users can delete their own files via IDAuth and admins can delete all"
ON storage.objects
FOR DELETE 
USING (
  bucket_id = 'documents' AND (
    -- L'utilisateur peut supprimer ses propres fichiers
    EXISTS (
      SELECT 1 FROM "Utilisateurs" u
      WHERE u."IDAuth" = auth.uid() 
      AND u."IDUtilisateurs"::text = (string_to_array(name, '/'))[1]
    )
    OR
    -- Les administrateurs peuvent supprimer tous les fichiers
    EXISTS (
      SELECT 1 FROM "Utilisateurs" u
      JOIN "CatUtilisateurs" c ON u."IDCatUtilisateurs" = c."IDCatUtilisateurs"
      WHERE u."IDAuth" = auth.uid() 
      AND c."EstAdministrateur" = true
    )
  )
);
