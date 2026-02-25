import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';
import { User as SupabaseUser } from '@supabase/supabase-js';

export interface UserMapping {
  supabaseUserId: string;
  dbUserId: number;
  nom: string;
  prenom: string;
  email: string;
  role: 'administrateur' | 'moderateur' | 'support' | 'visualisateur';
}

export const useSupabaseUserMapping = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const findOrCreateUserMapping = useCallback(async (supabaseUser: SupabaseUser | null): Promise<UserMapping | null> => {
    if (!supabaseUser?.id || !supabaseUser?.email) return null;

    setIsLoading(true);
    try {
      const { data, error: searchError } = await supabase
          .from('Utilisateurs')
          .select(`
          IDUtilisateurs, Nom, Prenom, Email, EstDesactive,
          CatUtilisateurs:IDCatUtilisateurs (
            EstAdministrateur, EstModerateur, EstSupport
          )
        `)
          .eq('Email', supabaseUser.email)
          .single();

      if (searchError) {
        if (searchError.code === 'PGRST116') {
          console.warn("Utilisateur non trouvé dans la table Utilisateurs");
        }
        throw searchError;
      }

      if (data) {
        if (data.EstDesactive) {
          toast({
            title: "Compte désactivé",
            description: "Contactez l'administrateur.",
            variant: "destructive",
          });
          return null;
        }

        let role: UserMapping['role'] = 'visualisateur';
        const cat = data.CatUtilisateurs as any;
        if (cat?.EstAdministrateur) role = 'administrateur';
        else if (cat?.EstModerateur) role = 'moderateur';
        else if (cat?.EstSupport) role = 'support';

        return {
          supabaseUserId: supabaseUser.id,
          dbUserId: data.IDUtilisateurs,
          nom: data.Nom || '',
          prenom: data.Prenom || '',
          email: data.Email || '',
          role
        };
      }
      return null;
    } catch (error) {
      console.error('Erreur Mapping:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  return { isLoading, findOrCreateUserMapping };
};