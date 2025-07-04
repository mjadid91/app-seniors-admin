-- Lister et supprimer toutes les politiques existantes pour le bucket avatars
DROP POLICY IF EXISTS "Allow public read avatars" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated upload avatars" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated update avatars" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated delete avatars" ON storage.objects;

-- Créer des politiques très permissives pour debug
CREATE POLICY "Public avatars access" 
ON storage.objects 
FOR ALL 
USING (bucket_id = 'avatars')
WITH CHECK (bucket_id = 'avatars');