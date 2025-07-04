-- Supprimer les anciennes politiques pour le bucket avatars
DROP POLICY IF EXISTS "Users can view their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own avatar" ON storage.objects;

-- Créer de nouvelles politiques plus permissives pour le bucket avatars
-- Politique pour permettre la lecture des avatars (public)
CREATE POLICY "Allow public read avatars" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'avatars');

-- Politique pour permettre l'upload d'avatars (authentifié via votre système)
CREATE POLICY "Allow authenticated upload avatars" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'avatars');

-- Politique pour permettre la mise à jour d'avatars
CREATE POLICY "Allow authenticated update avatars" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'avatars');

-- Politique pour permettre la suppression d'avatars
CREATE POLICY "Allow authenticated delete avatars" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'avatars');