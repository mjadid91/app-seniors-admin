
import { useState, useEffect } from 'react';
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
      console.log('Searching for user with email:', supabaseUser.email);
      
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
        console.error('Error searching for user:', searchError);
        return null;
      }

      if (existingUser) {
        console.log('Found existing user:', existingUser);
        
        // Déterminer le rôle basé sur la catégorie
        let role = 'support'; // rôle par défaut
        if (existingUser.CatUtilisateurs) {
          const cat = existingUser.CatUtilisateurs;
          if (cat.EstAdministrateur) role = 'administrateur';
          else if (cat.EstModerateur) role = 'moderateur';
          else if (cat.EstSupport) role = 'support';
          else role = 'visualisateur';
        }

        const mapping: UserMapping = {
          supabaseUserId: supabaseUser.id,
          dbUserId: existingUser.IDUtilisateurs,
          nom: existingUser.Nom || '',
          prenom: existingUser.Prenom || '',
          email: existingUser.Email || '',
          role
        };

        setUserMapping(mapping);
        return mapping;
      } else {
        console.log('User not found in database, user needs to be created in admin panel first');
        toast({
          title: "Utilisateur non trouvé",
          description: "Cet utilisateur doit être créé dans le panel admin.",
          variant: "destructive",
        });
        return null;
      }
    } catch (error) {
      console.error('Error in findOrCreateUserMapping:', error);
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

  return {
    userMapping,
    isLoading,
    findOrCreateUserMapping,
    clearUserMapping: () => setUserMapping(null)
  };
};
