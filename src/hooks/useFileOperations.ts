
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/stores/authStore';

export const useFileOperations = () => {
  const [uploading, setUploading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuthStore();

  const ensureSupabaseAuth = async () => {
    if (!isAuthenticated || !user) {
      throw new Error('Utilisateur non connecté');
    }

    // Vérifier si l'utilisateur a déjà un IDAuth dans la base
    const { data: userData, error: userError } = await supabase
      .from('Utilisateurs')
      .select('IDAuth')
      .eq('IDUtilisateurs', parseInt(user.id))
      .single();

    if (userError && userError.code !== 'PGRST116') {
      console.error('Erreur lors de la vérification de l\'utilisateur:', userError);
      throw new Error('Impossible de vérifier l\'utilisateur');
    }

    // Si l'utilisateur n'a pas d'IDAuth, créer un utilisateur Supabase Auth
    if (!userData || !userData.IDAuth) {
      try {
        // Créer un utilisateur Supabase Auth avec un email temporaire
        const tempEmail = `temp_${user.id}_${Date.now()}@appseniors.local`;
        const tempPassword = Math.random().toString(36).substring(2, 15);
        
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: tempEmail,
          password: tempPassword,
          options: {
            data: {
              nom: user.nom,
              prenom: user.prenom,
              internal_user_id: user.id
            }
          }
        });

        if (authError) {
          console.error('Erreur lors de la création de l\'utilisateur Supabase:', authError);
          throw new Error('Impossible de créer l\'utilisateur Supabase');
        }

        // Mettre à jour la table Utilisateurs avec l'IDAuth
        const { error: updateError } = await supabase
          .from('Utilisateurs')
          .update({ IDAuth: authData.user?.id })
          .eq('IDUtilisateurs', parseInt(user.id));

        if (updateError) {
          console.error('Erreur lors de la mise à jour de l\'IDAuth:', updateError);
          throw new Error('Impossible de lier l\'utilisateur');
        }

        console.log('Utilisateur Supabase créé et lié avec succès');
        
        // Connecter l'utilisateur temporairement
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: tempEmail,
          password: tempPassword
        });

        if (signInError) {
          console.error('Erreur de connexion temporaire:', signInError);
          throw new Error('Impossible de se connecter temporairement');
        }
      } catch (error) {
        console.error('Erreur lors de la création/connexion Supabase:', error);
        throw error;
      }
    } else {
      // L'utilisateur a déjà un IDAuth, essayer de se connecter
      console.log('Utilisateur déjà lié, vérification de la session...');
      
      // Vérifier si une session active existe
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session) {
        console.log('Aucune session active, création d\'une session temporaire...');
        // Créer une session temporaire pour cet utilisateur
        const tempEmail = `temp_${user.id}_${Date.now()}@appseniors.local`;
        const tempPassword = Math.random().toString(36).substring(2, 15);
        
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: tempEmail,
          password: tempPassword
        });
        
        if (signInError) {
          console.log('Session temporaire non créée, continuons sans session');
        }
      }
    }
  };

  const uploadFile = async (
    file: File,
    categoryId: number,
    onSuccess?: () => void
  ) => {
    // Vérifier que l'utilisateur est authentifié avec notre système
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
      console.log('Début de l\'upload pour l\'utilisateur:', user.id);
      
      // S'assurer que l'utilisateur est connecté à Supabase Auth
      await ensureSupabaseAuth();

      // Générer un nom de fichier unique
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      console.log('Uploading file:', { fileName, filePath, size: file.size });

      // Upload vers Supabase Storage (bucket public)
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

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
        description: error instanceof Error ? error.message : "Impossible d'uploader le fichier",
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

      // Télécharger le fichier depuis l'URL publique
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
