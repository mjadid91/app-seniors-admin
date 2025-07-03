
-- Politiques RLS pour la table Document
ALTER TABLE public."Document" ENABLE ROW LEVEL SECURITY;

-- Permettre aux utilisateurs de voir leurs propres documents
CREATE POLICY "Users can view their own documents" ON public."Document"
    FOR SELECT USING (
        auth.uid()::text = "IDUtilisateurs"::text 
        OR EXISTS (
            SELECT 1 FROM public."Utilisateurs" u 
            JOIN public."CatUtilisateurs" c ON u."IDCatUtilisateurs" = c."IDCatUtilisateurs"
            WHERE u."IDUtilisateurs"::text = auth.uid()::text 
            AND c."EstAdministrateur" = true
        )
    );

-- Permettre aux utilisateurs d'insérer leurs propres documents
CREATE POLICY "Users can insert their own documents" ON public."Document"
    FOR INSERT WITH CHECK (
        auth.uid()::text = "IDUtilisateurs"::text
        OR EXISTS (
            SELECT 1 FROM public."Utilisateurs" u 
            JOIN public."CatUtilisateurs" c ON u."IDCatUtilisateurs" = c."IDCatUtilisateurs"
            WHERE u."IDUtilisateurs"::text = auth.uid()::text 
            AND c."EstAdministrateur" = true
        )
    );

-- Permettre aux utilisateurs de modifier leurs propres documents
CREATE POLICY "Users can update their own documents" ON public."Document"
    FOR UPDATE USING (
        auth.uid()::text = "IDUtilisateurs"::text
        OR EXISTS (
            SELECT 1 FROM public."Utilisateurs" u 
            JOIN public."CatUtilisateurs" c ON u."IDCatUtilisateurs" = c."IDCatUtilisateurs"
            WHERE u."IDUtilisateurs"::text = auth.uid()::text 
            AND c."EstAdministrateur" = true
        )
    );

-- Permettre aux utilisateurs de supprimer leurs propres documents
CREATE POLICY "Users can delete their own documents" ON public."Document"
    FOR DELETE USING (
        auth.uid()::text = "IDUtilisateurs"::text
        OR EXISTS (
            SELECT 1 FROM public."Utilisateurs" u 
            JOIN public."CatUtilisateurs" c ON u."IDCatUtilisateurs" = c."IDCatUtilisateurs"
            WHERE u."IDUtilisateurs"::text = auth.uid()::text 
            AND c."EstAdministrateur" = true
        )
    );

-- Politiques pour Supabase Storage sur le bucket 'documents'
-- Permettre aux utilisateurs de voir leurs propres fichiers
CREATE POLICY "Documents access policy" ON storage.objects
    FOR SELECT USING (
        bucket_id = 'documents' 
        AND (
            auth.uid()::text = (storage.foldername(name))[1]
            OR EXISTS (
                SELECT 1 FROM public."Utilisateurs" u 
                JOIN public."CatUtilisateurs" c ON u."IDCatUtilisateurs" = c."IDCatUtilisateurs"
                WHERE u."IDUtilisateurs"::text = auth.uid()::text 
                AND c."EstAdministrateur" = true
            )
        )
    );

-- Permettre aux utilisateurs d'uploader dans leur dossier
CREATE POLICY "Documents upload policy" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'documents' 
        AND (
            auth.uid()::text = (storage.foldername(name))[1]
            OR EXISTS (
                SELECT 1 FROM public."Utilisateurs" u 
                JOIN public."CatUtilisateurs" c ON u."IDCatUtilisateurs" = c."IDCatUtilisateurs"
                WHERE u."IDUtilisateurs"::text = auth.uid()::text 
                AND c."EstAdministrateur" = true
            )
        )
    );

-- Permettre aux utilisateurs de supprimer leurs propres fichiers
CREATE POLICY "Documents delete policy" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'documents' 
        AND (
            auth.uid()::text = (storage.foldername(name))[1]
            OR EXISTS (
                SELECT 1 FROM public."Utilisateurs" u 
                JOIN public."CatUtilisateurs" c ON u."IDCatUtilisateurs" = c."IDCatUtilisateurs"
                WHERE u."IDUtilisateurs"::text = auth.uid()::text 
                AND c."EstAdministrateur" = true
            )
        )
    );

-- Rendre le bucket 'documents' privé (si ce n'est pas déjà fait)
UPDATE storage.buckets SET public = false WHERE id = 'documents';
