import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/stores/authStore';

export const useFileOperationsRGPD = () => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuthStore();

  const uploadDocumentRGPD = async (
    file: File,
    titre: string,
    typeDoc: string,
    onSuccess?: () => void
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
      console.log('Début de l\'upload RGPD pour le fichier:', file.name);
      
      // Générer un nom de fichier unique
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `rgpd/${fileName}`;

      console.log('Uploading RGPD file:', { fileName, filePath, size: file.size });

      // Upload vers Supabase Storage (bucket documents-rgpd)
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents-rgpd')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      console.log('RGPD file uploaded successfully:', uploadData);

      // Obtenir l'URL publique du fichier
      const { data: urlData } = supabase.storage
        .from('documents-rgpd')
        .getPublicUrl(filePath);

      console.log('RGPD File URL:', urlData.publicUrl);

      // Insérer l'entrée dans la table DocumentRGPD
      const { data: documentData, error: insertError } = await supabase
        .from('DocumentRGPD')
        .insert({
          Titre: titre,
          TypeDoc: typeDoc,
          URLFichier: urlData.publicUrl
        })
        .select()
        .single();

      if (insertError) {
        console.error('Database insert error:', insertError);
        // Si l'insertion en base échoue, supprimer le fichier uploadé
        await supabase.storage.from('documents-rgpd').remove([filePath]);
        throw insertError;
      }

      console.log('Document RGPD created successfully:', documentData);

      toast({
        title: "Document RGPD ajouté",
        description: `Le document "${titre}" a été ajouté avec succès`
      });

      onSuccess?.();
      return documentData;

    } catch (error) {
      console.error('Error uploading RGPD file:', error);
      toast({
        title: "Erreur d'upload",
        description: error instanceof Error ? error.message : "Impossible d'uploader le fichier",
        variant: "destructive"
      });
      throw error;
    } finally {
      setUploading(false);
    }
  };

  return {
    uploadDocumentRGPD,
    uploading
  };
};