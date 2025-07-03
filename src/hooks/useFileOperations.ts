
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/stores/authStore';

export const useFileOperations = () => {
  const [uploading, setUploading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuthStore();

  const uploadFile = async (
    file: File,
    categoryId: number,
    onSuccess?: () => void
  ) => {
    if (!user) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour uploader un fichier",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    try {
      // Générer un nom de fichier unique
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      console.log('Uploading file:', { fileName, filePath, size: file.size });

      // Upload vers Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      console.log('File uploaded successfully:', uploadData);

      // Obtenir l'URL publique du fichier
      const { data: urlData } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath);

      console.log('File URL:', urlData.publicUrl);

      // Insérer l'entrée dans la table Document
      const { data: documentData, error: insertError } = await supabase
        .from('Document')
        .insert({
          Titre: file.name,
          TypeFichier: file.type || 'application/octet-stream',
          TailleFichier: file.size,
          URLFichier: urlData.publicUrl,
          IDCategorieDocument: categoryId,
          IDUtilisateurs: parseInt(user.id),
          Statut: 'Publié'
        })
        .select()
        .single();

      if (insertError) {
        console.error('Database insert error:', insertError);
        // Si l'insertion en base échoue, supprimer le fichier uploadé
        await supabase.storage.from('documents').remove([filePath]);
        throw insertError;
      }

      console.log('Document created successfully:', documentData);

      toast({
        title: "Fichier uploadé",
        description: `Le fichier "${file.name}" a été uploadé avec succès`
      });

      onSuccess?.();
      return documentData;

    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Erreur d'upload",
        description: "Impossible d'uploader le fichier",
        variant: "destructive"
      });
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const downloadFile = async (fileDocument: { URLFichier: string; Titre: string }) => {
    setDownloading(true);
    try {
      console.log('Downloading file:', fileDocument.URLFichier);

      // Télécharger le fichier depuis l'URL
      const response = await fetch(fileDocument.URLFichier);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      
      // Créer un lien de téléchargement
      const url = window.URL.createObjectURL(blob);
      const link = window.document.createElement('a');
      link.href = url;
      link.download = fileDocument.Titre;
      window.document.body.appendChild(link);
      link.click();
      
      // Nettoyer
      window.URL.revokeObjectURL(url);
      window.document.body.removeChild(link);

      toast({
        title: "Téléchargement",
        description: `Le fichier "${fileDocument.Titre}" a été téléchargé`
      });

    } catch (error) {
      console.error('Error downloading file:', error);
      toast({
        title: "Erreur de téléchargement",
        description: "Impossible de télécharger le fichier",
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
