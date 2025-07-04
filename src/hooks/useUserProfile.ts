
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuthStore } from '../stores/authStore';
import { useToast } from './use-toast';

interface UserProfile {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  photo?: string;
  languePreferee: string;
  langueId: number;
  devise: string;
  deviseId: number;
  niveauLangue: number;
}

export const useUserProfile = () => {
  const { user } = useAuthStore();
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile>({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    photo: '',
    languePreferee: 'Français',
    langueId: 1,
    devise: 'Euro (€)',
    deviseId: 1,
    niveauLangue: 5
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Charger le profil utilisateur depuis la base de données
  const loadProfile = async () => {
    if (!user?.id) return;

    setIsLoading(true);
    try {
      console.log('Chargement du profil pour l\'utilisateur ID:', user.id);
      
      // Charger les données utilisateur de base
      const { data: userData, error: userError } = await supabase
        .from('Utilisateurs')
        .select(`
          Nom,
          Prenom,
          Email,
          Telephone,
          Photo
        `)
        .eq('IDUtilisateurs', parseInt(user.id))
        .single();

      if (userError) {
        console.error('Erreur lors du chargement des données utilisateur:', userError);
        toast({
          title: "Erreur",
          description: "Impossible de charger vos informations de base.",
          variant: "destructive",
        });
        return;
      }

      // Charger la langue de l'utilisateur
      const { data: langueData, error: langueError } = await supabase
        .from('Langue_Utilisateurs')
        .select(`
          IDLangue,
          NiveauLangue,
          Langue:IDLangue (
            Titre
          )
        `)
        .eq('IDUtilisateurs', parseInt(user.id))
        .single();

      if (langueError && langueError.code !== 'PGRST116') {
        console.error('Erreur lors du chargement de la langue:', langueError);
      }

      // Charger la devise de l'utilisateur
      const { data: deviseData, error: deviseError } = await supabase
        .from('Devise_Utilisateurs')
        .select(`
          IDDevise,
          Devise:IDDevise (
            Titre
          )
        `)
        .eq('IDUtilisateurs', parseInt(user.id))
        .single();

      if (deviseError && deviseError.code !== 'PGRST116') {
        console.error('Erreur lors du chargement de la devise:', deviseError);
      }

      console.log('Données chargées:', { userData, langueData, deviseData });

      // Décoder l'URL de la photo si elle est en format hexadécimal
      let photoUrl = userData?.Photo || '';
      if (photoUrl && photoUrl.startsWith('\\x')) {
        try {
          // Convertir la chaîne hexadécimale en URL
          const hexString = photoUrl.slice(2); // Enlever le préfixe \\x
          const bytes = hexString.match(/.{2}/g)?.map(byte => parseInt(byte, 16)) || [];
          photoUrl = String.fromCharCode(...bytes);
          console.log('URL de la photo décodée:', photoUrl);
        } catch (error) {
          console.error('Erreur lors du décodage de l\'URL de la photo:', error);
          photoUrl = '';
        }
      }

      setProfile({
        nom: userData?.Nom || '',
        prenom: userData?.Prenom || '',
        email: userData?.Email || '',
        telephone: userData?.Telephone || '',
        photo: photoUrl,
        languePreferee: langueData?.Langue?.Titre || 'Français',
        langueId: langueData?.IDLangue || 1,
        devise: deviseData?.Devise?.Titre || 'Euro (€)',
        deviseId: deviseData?.IDDevise || 1,
        niveauLangue: langueData?.NiveauLangue || 5
      });

    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Sauvegarder le profil utilisateur dans la base de données
  const saveProfile = async (updatedProfile: Partial<UserProfile>) => {
    if (!user?.id) return false;

    setIsSaving(true);
    try {
      console.log('Sauvegarde du profil:', updatedProfile);
      
      // Mettre à jour les données utilisateur de base (sans la photo qui est gérée par useProfileImage)
      const { error: userError } = await supabase
        .from('Utilisateurs')
        .update({
          Nom: updatedProfile.nom,
          Prenom: updatedProfile.prenom,
          Email: updatedProfile.email,
          Telephone: updatedProfile.telephone,
          DateModification: new Date().toISOString()
        })
        .eq('IDUtilisateurs', parseInt(user.id));

      if (userError) {
        console.error('Erreur lors de la mise à jour utilisateur:', userError);
        toast({
          title: "Erreur",
          description: "Échec de la mise à jour des informations de base",
          variant: "destructive",
        });
        return false;
      }

      // Gérer la langue si elle a changé
      if (updatedProfile.langueId !== undefined) {
        // Vérifier si une entrée existe déjà
        const { data: existingLangue } = await supabase
          .from('Langue_Utilisateurs')
          .select('IDUtilisateurs')
          .eq('IDUtilisateurs', parseInt(user.id))
          .single();

        if (existingLangue) {
          // Mettre à jour
          const { error: langueUpdateError } = await supabase
            .from('Langue_Utilisateurs')
            .update({
              IDLangue: updatedProfile.langueId,
              NiveauLangue: updatedProfile.niveauLangue || 5
            })
            .eq('IDUtilisateurs', parseInt(user.id));

          if (langueUpdateError) {
            console.error('Erreur mise à jour langue:', langueUpdateError);
          }
        } else {
          // Insérer
          const { error: langueInsertError } = await supabase
            .from('Langue_Utilisateurs')
            .insert({
              IDUtilisateurs: parseInt(user.id),
              IDLangue: updatedProfile.langueId,
              NiveauLangue: updatedProfile.niveauLangue || 5
            });

          if (langueInsertError) {
            console.error('Erreur insertion langue:', langueInsertError);
          }
        }
      }

      // Gérer la devise si elle a changé
      if (updatedProfile.deviseId !== undefined) {
        // Vérifier si une entrée existe déjà
        const { data: existingDevise } = await supabase
          .from('Devise_Utilisateurs')
          .select('IDUtilisateurs')
          .eq('IDUtilisateurs', parseInt(user.id))
          .single();

        if (existingDevise) {
          // Mettre à jour
          const { error: deviseUpdateError } = await supabase
            .from('Devise_Utilisateurs')
            .update({
              IDDevise: updatedProfile.deviseId
            })
            .eq('IDUtilisateurs', parseInt(user.id));

          if (deviseUpdateError) {
            console.error('Erreur mise à jour devise:', deviseUpdateError);
          }
        } else {
          // Insérer
          const { error: deviseInsertError } = await supabase
            .from('Devise_Utilisateurs')
            .insert({
              IDUtilisateurs: parseInt(user.id),
              IDDevise: updatedProfile.deviseId
            });

          if (deviseInsertError) {
            console.error('Erreur insertion devise:', deviseInsertError);
          }
        }
      }

      // Mettre à jour l'état local
      setProfile(prev => ({ ...prev, ...updatedProfile }));
      
      toast({
        title: "Profil mis à jour",
        description: "Vos infos ont bien été enregistrées.",
      });
      
      return true;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  // Charger le profil au montage du composant
  useEffect(() => {
    if (user?.id) {
      loadProfile();
    }
  }, [user?.id]);

  return {
    profile,
    isLoading,
    isSaving,
    saveProfile,
    reloadProfile: loadProfile
  };
};
