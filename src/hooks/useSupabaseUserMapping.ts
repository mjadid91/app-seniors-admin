
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

interface UserMapping {
  supabaseUserId: string;
  dbUserId: number;
  nom: string;
  prenom: string;
  email: string;
  role: string;
}

export const useSupabaseUserMapping = () => {
  const { toast } = useToast();
  const [userMapping, setUserMapping] = useState<UserMapping | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const findOrCreateUserMapping = async (supabaseUser: any): Promise<UserMapping | null> => {
    if (!supabaseUser?.id || !supabaseUser?.email) {
      console.warn('useSupabaseUserMapping: Invalid supabase user data', supabaseUser);
      return null;
    }

    setIsLoading(true);
    try {
      console.log('useSupabaseUserMapping: Searching for user with email:', supabaseUser.email);
      
      // Chercher l'utilisateur par email dans notre base de données
      const { data: existingUser, error: searchError } = await supabase
        .from('Utilisateurs')
        .select(`
          IDUtilisateurs,
          Nom,
          Prenom,
          Email,
          CatUtilisateurs:IDCatUtilisateurs (
            EstAdministrateur,
            EstModerateur,
            EstSupport,
            EstSenior,
            EstAidant
          )
        `)
        .eq('Email', supabaseUser.email)
        .single();

      if (searchError && searchError.code !== 'PGRST116') {
        console.error('useSupabaseUserMapping: Error searching for user:', searchError);
        throw searchError;
      }

      if (existingUser) {
        console.log('useSupabaseUserMapping: Found existing user:', existingUser);
        
        // Déterminer le rôle basé sur la catégorie avec logique améliorée
        let role = 'visualisateur'; // rôle par défaut
        if (existingUser.CatUtilisateurs) {
          const cat = existingUser.CatUtilisateurs;
          if (cat.EstAdministrateur) {
            role = 'administrateur';
          } else if (cat.EstModerateur) {
            role = 'moderateur';
          } else if (cat.EstSupport) {
            role = 'support';
          } else {
            role = 'visualisateur';
          }
        }

        console.log('useSupabaseUserMapping: Determined role:', role);

        const mapping: UserMapping = {
          supabaseUserId: supabaseUser.id,
          dbUserId: existingUser.IDUtilisateurs,
          nom: existingUser.Nom || '',
          prenom: existingUser.Prenom || '',
          email: existingUser.Email || '',
          role
        };

        setUserMapping(mapping);
        console.log('useSupabaseUserMapping: User mapping created:', mapping);
        return mapping;
      } else {
        console.log('useSupabaseUserMapping: User not found in database');
        toast({
          title: "Utilisateur non trouvé",
          description: "Cet utilisateur doit être créé dans le panel admin avant de pouvoir se connecter.",
          variant: "destructive",
        });
        return null;
      }
    } catch (error) {
      console.error('useSupabaseUserMapping: Error in findOrCreateUserMapping:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les données utilisateur.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const clearUserMapping = () => {
    console.log('useSupabaseUserMapping: Clearing user mapping');
    setUserMapping(null);
  };

  return {
    userMapping,
    isLoading,
    findOrCreateUserMapping,
    clearUserMapping
  };
};
