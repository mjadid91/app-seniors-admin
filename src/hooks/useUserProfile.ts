
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
  devise: string;
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
    languePreferee: 'fr',
    devise: 'EUR'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Charger le profil utilisateur depuis la base de données
  const loadProfile = async () => {
    if (!user?.id) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('Utilisateurs')
        .select(`
          Nom,
          Prenom,
          Email,
          Telephone,
          Photo,
          LangueSite
        `)
        .eq('IDUtilisateurs', parseInt(user.id))
        .single();

      if (error) {
        console.error('Erreur lors du chargement du profil:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger votre profil.",
          variant: "destructive",
        });
        return;
      }

      if (data) {
        setProfile({
          nom: data.Nom || '',
          prenom: data.Prenom || '',
          email: data.Email || '',
          telephone: data.Telephone || '',
          photo: data.Photo || '',
          languePreferee: data.LangueSite || 'fr',
          devise: 'EUR'
        });
      }
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
      const { error } = await supabase
        .from('Utilisateurs')
        .update({
          Nom: updatedProfile.nom,
          Prenom: updatedProfile.prenom,
          Email: updatedProfile.email,
          Telephone: updatedProfile.telephone,
          Photo: updatedProfile.photo,
          LangueSite: updatedProfile.languePreferee,
          DateModification: new Date().toISOString()
        })
        .eq('IDUtilisateurs', parseInt(user.id));

      if (error) {
        console.error('Erreur lors de la sauvegarde:', error);
        toast({
          title: "Erreur",
          description: "Impossible de sauvegarder vos modifications.",
          variant: "destructive",
        });
        return false;
      }

      // Mettre à jour l'état local
      setProfile(prev => ({ ...prev, ...updatedProfile }));
      
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été enregistrées avec succès.",
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
