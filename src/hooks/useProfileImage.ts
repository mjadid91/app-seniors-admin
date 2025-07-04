import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/stores/authStore';

export const useProfileImage = () => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuthStore();

  const uploadProfileImage = async (file: File): Promise<string | null> => {
    if (!user?.id) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour uploader une photo",
        variant: "destructive"
      });
      return null;
    }

    // Vérifier le type de fichier
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un fichier image valide (.jpg, .png, .jpeg)",
        variant: "destructive"
      });
      return null;
    }

    // Vérifier la taille du fichier (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Erreur",
        description: "La taille du fichier ne doit pas dépasser 5MB",
        variant: "destructive"
      });
      return null;
    }

    setUploading(true);
    try {
      // Générer un nom de fichier unique
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      console.log('Uploading profile image:', { fileName, filePath, size: file.size });

      // Upload vers Supabase Storage (bucket avatars)
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      console.log('Image uploaded successfully:', uploadData);

      // Obtenir l'URL privée du fichier (pour bucket non-public)
      const { data: urlData, error: urlError } = await supabase.storage
        .from('avatars')
        .createSignedUrl(filePath, 60 * 60 * 24 * 365); // URL valide 1 an

      if (urlError || !urlData?.signedUrl) {
        throw new Error(urlError?.message || 'Impossible de générer l\'URL de l\'image');
      }

      console.log('Image URL generated:', urlData.signedUrl);

      // Mettre à jour la table Utilisateurs
      const { error: updateError } = await supabase
        .from('Utilisateurs')
        .update({
          Photo: urlData.signedUrl,
          DateModification: new Date().toISOString()
        })
        .eq('IDUtilisateurs', parseInt(user.id));

      if (updateError) {
        console.error('Database update error:', updateError);
        // Supprimer le fichier uploadé si la mise à jour en base échoue
        await supabase.storage.from('avatars').remove([filePath]);
        throw updateError;
      }

      console.log('User profile updated successfully');

      toast({
        title: "Photo mise à jour",
        description: "Votre photo de profil a été mise à jour avec succès"
      });

      return urlData.signedUrl;

    } catch (error) {
      console.error('Error uploading profile image:', error);
      toast({
        title: "Erreur d'upload",
        description: error instanceof Error ? error.message : "Impossible d'uploader la photo",
        variant: "destructive"
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const removeProfileImage = async (): Promise<boolean> => {
    if (!user?.id) {
      toast({
        title: "Erreur", 
        description: "Vous devez être connecté pour supprimer votre photo",
        variant: "destructive"
      });
      return false;
    }

    setUploading(true);
    try {
      // Supprimer le champ Photo de la table Utilisateurs
      const { error: updateError } = await supabase
        .from('Utilisateurs')
        .update({
          Photo: null,
          DateModification: new Date().toISOString()
        })
        .eq('IDUtilisateurs', parseInt(user.id));

      if (updateError) {
        console.error('Database update error:', updateError);
        throw updateError;
      }

      // Optionnel: supprimer les fichiers du bucket (on garde pour l'historique)
      // const { data: files } = await supabase.storage
      //   .from('avatars')
      //   .list(user.id);
      // 
      // if (files && files.length > 0) {
      //   const filePaths = files.map(file => `${user.id}/${file.name}`);
      //   await supabase.storage.from('avatars').remove(filePaths);
      // }

      toast({
        title: "Photo supprimée",
        description: "Votre photo de profil a été supprimée avec succès"
      });

      return true;

    } catch (error) {
      console.error('Error removing profile image:', error);
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Impossible de supprimer la photo",
        variant: "destructive"
      });
      return false;
    } finally {
      setUploading(false);
    }
  };

  return {
    uploadProfileImage,
    removeProfileImage,
    uploading
  };
};