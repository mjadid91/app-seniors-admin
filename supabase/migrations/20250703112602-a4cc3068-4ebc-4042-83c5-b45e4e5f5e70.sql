
-- 1. Ajouter la colonne IDAuth à la table Utilisateurs pour lier avec Supabase Auth
ALTER TABLE "Utilisateurs" 
ADD COLUMN "IDAuth" UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- 2. Supprimer la colonne MotDePasse (plus nécessaire avec Supabase Auth)
ALTER TABLE "Utilisateurs" 
DROP COLUMN IF EXISTS "MotDePasse";

-- 3. Créer un index sur IDAuth pour de meilleures performances
CREATE INDEX IF NOT EXISTS idx_utilisateurs_idauth ON "Utilisateurs"("IDAuth");

-- 4. Activer RLS sur la table Utilisateurs
ALTER TABLE "Utilisateurs" ENABLE ROW LEVEL SECURITY;

-- 5. Policy pour que les utilisateurs puissent voir leurs propres données
CREATE POLICY "Utilisateurs peuvent voir leurs données" 
ON "Utilisateurs" 
FOR SELECT 
USING (auth.uid() = "IDAuth");

-- 6. Policy pour que les utilisateurs puissent modifier leurs propres données
CREATE POLICY "Utilisateurs peuvent modifier leurs données" 
ON "Utilisateurs" 
FOR UPDATE 
USING (auth.uid() = "IDAuth");

-- 7. Policy pour l'insertion (lors de l'inscription)
CREATE POLICY "Création profil utilisateur" 
ON "Utilisateurs" 
FOR INSERT 
WITH CHECK (auth.uid() = "IDAuth");

-- 8. RLS sur la table Document
ALTER TABLE "Document" ENABLE ROW LEVEL SECURITY;

-- 9. Policy pour que les utilisateurs voient leurs documents
CREATE POLICY "Accès à ses documents" 
ON "Document" 
FOR SELECT 
USING (auth.uid() = (SELECT "IDAuth" FROM "Utilisateurs" WHERE "IDUtilisateurs" = "Document"."IDUtilisateurs"));

-- 10. Policy pour créer des documents
CREATE POLICY "Créer ses documents" 
ON "Document" 
FOR INSERT 
WITH CHECK (auth.uid() = (SELECT "IDAuth" FROM "Utilisateurs" WHERE "IDUtilisateurs" = "Document"."IDUtilisateurs"));

-- 11. Policy pour modifier ses documents
CREATE POLICY "Modifier ses documents" 
ON "Document" 
FOR UPDATE 
USING (auth.uid() = (SELECT "IDAuth" FROM "Utilisateurs" WHERE "IDUtilisateurs" = "Document"."IDUtilisateurs"));

-- 12. Policy pour supprimer ses documents
CREATE POLICY "Supprimer ses documents" 
ON "Document" 
FOR DELETE 
USING (auth.uid() = (SELECT "IDAuth" FROM "Utilisateurs" WHERE "IDUtilisateurs" = "Document"."IDUtilisateurs"));

-- 13. Créer le bucket documents pour Supabase Storage
INSERT INTO storage.buckets (id, name, public) 
VALUES ('documents', 'documents', false)
ON CONFLICT (id) DO NOTHING;

-- 14. Policy pour uploader des fichiers dans le bucket documents
CREATE POLICY "Utilisateurs connectés peuvent uploader" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'documents' 
  AND auth.role() = 'authenticated'
);

-- 15. Policy pour voir et télécharger ses propres fichiers
CREATE POLICY "Accès aux fichiers uploadés" 
ON storage.objects 
FOR SELECT 
USING (
  bucket_id = 'documents' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- 16. Policy pour supprimer ses propres fichiers
CREATE POLICY "Supprimer ses fichiers" 
ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'documents' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- 17. Fonction pour créer automatiquement un profil utilisateur après inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public."Utilisateurs" (
    "IDAuth",
    "Email",
    "Nom",
    "Prenom",
    "IDCatUtilisateurs",
    "DateInscription"
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'nom', ''),
    COALESCE(NEW.raw_user_meta_data->>'prenom', ''),
    7, -- Visualisateur par défaut
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 18. Trigger pour exécuter la fonction lors de l'inscription
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
