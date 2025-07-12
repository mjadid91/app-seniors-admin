
import { useState, useCallback } from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface UserMapping {
  dbUserId: number;
  nom: string;
  prenom: string;
  email: string;
  role: string;
}

export const useSupabaseUserMapping = () => {
  const [userMapping, setUserMapping] = useState<UserMapping | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const findOrCreateUserMapping = useCallback(async (supabaseUser: SupabaseUser) => {
    console.log('useSupabaseUserMapping: Starting mapping process for:', supabaseUser.email);
    setIsLoading(true);
    
    try {
      // D'abord, chercher l'utilisateur par email dans la table Utilisateurs
      console.log('Searching for user with email:', supabaseUser.email);
      
      const { data: userData, error: userError } = await supabase
        .from('Utilisateurs')
        .select(`
          IDUtilisateurs,
          Nom,
          Prenom,
          Email,
          IDCatUtilisateurs,
          CatUtilisateurs!inner(
            EstAdministrateur,
            EstModerateur,
            EstSupport
          )
        `)
        .eq('Email', supabaseUser.email)
        .single();

      if (userError) {
        console.error('useSupabaseUserMapping: Error finding user:', userError);
        
        // Si l'utilisateur n'existe pas, essayer de le créer automatiquement
        if (userError.code === 'PGRST116') {
          console.log('useSupabaseUserMapping: User not found, attempting to create...');
          
          // Pour les administrateurs, on va créer l'utilisateur avec le rôle admin (IDCatUtilisateurs = 5)
          const { data: newUser, error: createError } = await supabase
            .from('Utilisateurs')
            .insert({
              Email: supabaseUser.email,
              Nom: supabaseUser.user_metadata?.last_name || 'Admin',
              Prenom: supabaseUser.user_metadata?.first_name || 'User',
              IDCatUtilisateurs: 5, // Administrateur
              MotDePasse: 'auto-generated', // Mot de passe temporaire
              DateInscription: new Date().toISOString(),
              EstActif: true
            })
            .select(`
              IDUtilisateurs,
              Nom,
              Prenom,
              Email,
              IDCatUtilisateurs,
              CatUtilisateurs!inner(
                EstAdministrateur,
                EstModerateur,
                EstSupport
              )
            `)
            .single();

          if (createError) {
            console.error('useSupabaseUserMapping: Error creating user:', createError);
            setUserMapping(null);
            setIsLoading(false);
            return;
          }

          userData = newUser;
          console.log('useSupabaseUserMapping: User created successfully:', newUser);
        } else {
          setUserMapping(null);
          setIsLoading(false);
          return;
        }
      }

      if (!userData) {
        console.error('useSupabaseUserMapping: No user data found');
        setUserMapping(null);
        setIsLoading(false);
        return;
      }

      console.log('useSupabaseUserMapping: User found:', userData);

      // Déterminer le rôle basé sur CatUtilisateurs
      let role = 'visualisateur'; // rôle par défaut
      
      if (userData.CatUtilisateurs?.EstAdministrateur) {
        role = 'administrateur';
      } else if (userData.CatUtilisateurs?.EstModerateur) {
        role = 'moderateur';
      } else if (userData.CatUtilisateurs?.EstSupport) {
        role = 'support';
      }

      const mapping: UserMapping = {
        dbUserId: userData.IDUtilisateurs,
        nom: userData.Nom,
        prenom: userData.Prenom,
        email: userData.Email,
        role: role
      };

      console.log('useSupabaseUserMapping: Mapping created:', mapping);
      setUserMapping(mapping);
      
    } catch (error) {
      console.error('useSupabaseUserMapping: Unexpected error:', error);
      setUserMapping(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearUserMapping = useCallback(() => {
    console.log('useSupabaseUserMapping: Clearing user mapping');
    setUserMapping(null);
    setIsLoading(false);
  }, []);

  return {
    userMapping,
    isLoading,
    findOrCreateUserMapping,
    clearUserMapping
  };
};
