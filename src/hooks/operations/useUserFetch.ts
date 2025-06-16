
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '../../stores/authStore';
import { SupabaseUser } from '../types/userTypes';
import { convertSupabaseUserToAppUser } from '../utils/userConversion';

export const useUserFetch = (
  setUsers: (users: User[]) => void,
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void,
  getRoleFromCategory: (categoryId: number) => User['role']
) => {
  const fetchUsers = useCallback(async () => {
    try {
      console.log('Fetching users from Supabase...');
      setLoading(true);
      setError(null);

      // Filtrer UNIQUEMENT les catégories administratives (5, 6, 7, 8) pour la section utilisateurs
      // Les catégories 1 (Senior) et 4 (Aidant) sont gérées dans leurs sections respectives
      const { data, error: fetchError } = await supabase
        .from('Utilisateurs')
        .select('*')
        .in('IDCatUtilisateurs', [5, 6, 7, 8])
        .order('DateInscription', { ascending: false });

      console.log('Users query result:', { data, error: fetchError });

      if (fetchError) {
        console.error('Users fetch error:', fetchError);
        throw fetchError;
      }

      if (!data || data.length === 0) {
        console.log('No administrative users found with categories 5, 6, 7, 8');
        setUsers([]);
        return;
      }

      console.log('Raw administrative users data:', data);

      const transformedUsers: User[] = data.map((user: SupabaseUser) => 
        convertSupabaseUserToAppUser(user, getRoleFromCategory)
      );

      console.log('Transformed administrative users:', transformedUsers);
      setUsers(transformedUsers);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [setUsers, setLoading, setError, getRoleFromCategory]);

  // Fonction pour créer automatiquement les entrées manquantes dans les tables spécialisées
  const ensureSpecializedEntries = useCallback(async () => {
    try {
      console.log('Checking for missing specialized entries...');
      
      // Vérifier les utilisateurs seniors (catégorie 1)
      const { data: seniorsUsers } = await supabase
        .from('Utilisateurs')
        .select('IDUtilisateurs')
        .eq('IDCatUtilisateurs', 1);

      if (seniorsUsers && seniorsUsers.length > 0) {
        for (const user of seniorsUsers) {
          const { data: existingSenior } = await supabase
            .from('Seniors')
            .select('IDSeniors')
            .eq('IDUtilisateurSenior', user.IDUtilisateurs)
            .maybeSingle();

          if (!existingSenior) {
            console.log(`Creating missing Senior entry for user ${user.IDUtilisateurs}`);
            await supabase
              .from('Seniors')
              .insert({
                IDUtilisateurSenior: user.IDUtilisateurs,
                NiveauAutonomie: 2,
                EstRGPD: false
              });
          }
        }
      }

      // Vérifier les utilisateurs aidants (catégorie 4)
      const { data: aidantsUsers } = await supabase
        .from('Utilisateurs')
        .select('IDUtilisateurs')
        .eq('IDCatUtilisateurs', 4);

      if (aidantsUsers && aidantsUsers.length > 0) {
        for (const user of aidantsUsers) {
          const { data: existingAidant } = await supabase
            .from('Aidant')
            .select('IDAidant')
            .eq('IDUtilisateurs', user.IDUtilisateurs)
            .maybeSingle();

          if (!existingAidant) {
            console.log(`Creating missing Aidant entry for user ${user.IDUtilisateurs}`);
            await supabase
              .from('Aidant')
              .insert({
                IDUtilisateurs: user.IDUtilisateurs,
                Experience: 'Expérience à définir',
                TarifAidant: 0
              });
          }
        }
      }
    } catch (err) {
      console.error('Error ensuring specialized entries:', err);
    }
  }, []);

  return { fetchUsers, ensureSpecializedEntries };
};
