-- Politiques pour le bucket avatars (non-public)

-- Politique pour permettre aux utilisateurs de voir leurs propres avatars
CREATE POLICY "Users can view their own avatar" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Politique pour permettre aux utilisateurs d'uploader leur propre avatar
CREATE POLICY "Users can upload their own avatar" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Politique pour permettre aux utilisateurs de mettre à jour leur propre avatar
CREATE POLICY "Users can update their own avatar" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Politique pour permettre aux utilisateurs de supprimer leur propre avatar
CREATE POLICY "Users can delete their own avatar" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);