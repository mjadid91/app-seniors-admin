
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

    // Convert user ID to integer, but validate it first
    const userId = parseInt(user.id);
    if (isNaN(userId)) {
      console.warn('useProfileImage: Cannot convert user ID to integer:', user.id);
      toast({
        title: "Erreur",
        description: "ID utilisateur invalide pour l'upload",
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

      // Obtenir l'URL publique du fichier (pour bucket public)
      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      if (!urlData?.publicUrl) {
        throw new Error('Impossible de générer l\'URL de l\'image');
      }

      console.log('Image URL generated:', urlData.publicUrl);

      // Mettre à jour la table Utilisateurs
      const { error: updateError } = await supabase
        .from('Utilisateurs')
        .update({
          Photo: urlData.publicUrl,
          DateModification: new Date().toISOString()
        })
        .eq('IDUtilisateurs', userId);

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

      return urlData.publicUrl;

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

    // Convert user ID to integer, but validate it first
    const userId = parseInt(user.id);
    if (isNaN(userId)) {
      console.warn('useProfileImage: Cannot convert user ID to integer for removal:', user.id);
      toast({
        title: "Erreur",
        description: "ID utilisateur invalide pour la suppression",
        variant: "destructive"
      });
      return false;
    }

    setUploading(true);
    try {
      console.log('Removing profile image for user:', userId);

      // Obtenir d'abord l'URL actuelle de la photo pour supprimer le fichier
      const { data: userData, error: fetchError } = await supabase
        .from('Utilisateurs')
        .select('Photo')
        .eq('IDUtilisateurs', userId)
        .single();

      if (fetchError) {
        console.error('Error fetching user data:', fetchError);
        // Continuer même si on ne peut pas récupérer les données
      }

      // Supprimer le champ Photo de la table Utilisateurs (utiliser chaîne vide à cause de contrainte NOT NULL)
      const { error: updateError } = await supabase
        .from('Utilisateurs')
        .update({
          Photo: '',
          DateModification: new Date().toISOString()
        })
        .eq('IDUtilisateurs', userId);

      if (updateError) {
        console.error('Database update error:', updateError);
        throw updateError;
      }

      console.log('Profile image removed from database successfully');

      // Optionnel: essayer de supprimer les fichiers du bucket
      // Même si ça échoue, on considère que la suppression est réussie
      try {
        if (userData?.Photo) {
          // Extraire le chemin du fichier de l'URL
          const url = userData.Photo;
          const matches = url.match(/avatars\/(.+)$/);
          if (matches && matches[1]) {
            const filePath = matches[1];
            console.log('Attempting to remove file:', filePath);
            
            const { error: deleteError } = await supabase.storage
              .from('avatars')
              .remove([filePath]);
            
            if (deleteError) {
              console.warn('Could not delete file from storage:', deleteError);
              // Ne pas faire échouer l'opération pour ça
            } else {
              console.log('File deleted from storage successfully');
            }
          }
        }
      } catch (storageError) {
        console.warn('Storage deletion failed, but continuing:', storageError);
        // Ne pas faire échouer l'opération principale
      }

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
