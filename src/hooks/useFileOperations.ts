import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/stores/authStore';

export const useFileOperations = () => {
    const [uploading, setUploading] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const { toast } = useToast();
    const { user, isAuthenticated } = useAuthStore();

    /**
     * UPLOAD : Ajoute un fichier au storage et crée l'entrée en base de données
     */
    const uploadFile = async (
        file: File,
        categoryId: number,
        onSuccess?: () => void,
        utilisateurId?: string
    ) => {
        if (!isAuthenticated || !user) {
            toast({
                title: "Erreur",
                description: "Vous devez être connecté pour uploader un fichier",
                variant: "destructive"
            });
            return;
        }

        setUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `admin_uploads/${fileName}`;

            // 1. Upload direct vers Supabase Storage
            const { error: uploadError } = await supabase.storage
                .from('documents')
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (uploadError) throw uploadError;

            // 2. Récupération de l'URL publique
            const { data: urlData } = supabase.storage
                .from('documents')
                .getPublicUrl(filePath);

            // 3. Insertion des métadonnées dans la table Document
            const { error: insertError } = await supabase
                .from('Document')
                .insert({
                    Titre: file.name,
                    TypeFichier: file.type || 'application/octet-stream',
                    TailleFichier: file.size,
                    URLFichier: urlData.publicUrl,
                    IDCategorieDocument: categoryId,
                    IDUtilisateurs: utilisateurId ? parseInt(utilisateurId) : null,
                    Statut: 'Publié'
                });

            if (insertError) {
                // Nettoyage préventif
                await supabase.storage.from('documents').remove([filePath]);
                throw insertError;
            }

            toast({
                title: "Succès",
                description: `Le fichier "${file.name}" a été ajouté avec succès.`
            });

            if (onSuccess) onSuccess();

        } catch (err) {
            // ✅ CORRECTION 1 : Typage de l'erreur
            const error = err as Error;
            console.error('Erreur upload:', error.message);
            toast({
                title: "Erreur d'upload",
                description: error.message || "Impossible d'uploader le fichier",
                variant: "destructive"
            });
        } finally {
            setUploading(false);
        }
    };

    /**
     * DOWNLOAD : Télécharge le fichier en utilisant le flux binaire
     */
    const downloadFile = async (fileDocument: { URLFichier: string; Titre: string }) => {
        setDownloading(true);
        try {
            const urlParts = fileDocument.URLFichier.split('/documents/');
            const filePath = urlParts[1];

            if (!filePath) throw new Error("Chemin du fichier introuvable dans l'URL");

            const { data, error } = await supabase.storage
                .from('documents')
                .download(filePath);

            if (error) throw error;

            const url = window.URL.createObjectURL(data);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileDocument.Titre);
            document.body.appendChild(link);
            link.click();

            link.remove();
            window.URL.revokeObjectURL(url);

            toast({
                title: "Téléchargement",
                description: `Le fichier "${fileDocument.Titre}" a été récupéré.`
            });

        } catch (err) {
            // ✅ CORRECTION 2 : Typage de l'erreur
            const error = err as Error;
            console.error('Erreur téléchargement:', error.message);
            toast({
                title: "Erreur de téléchargement",
                description: "Le fichier est inaccessible ou n'existe plus sur le serveur.",
                variant: "destructive"
            });
        } finally {
            setDownloading(false);
        }
    };

    return {
        uploadFile,
        downloadFile,
        uploading,
        downloading
    };
};