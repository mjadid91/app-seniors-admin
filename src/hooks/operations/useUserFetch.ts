
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '../../stores/authStore';
import { convertSupabaseUserToAppUser } from '../utils/userConversion';

export const useUserFetch = (
  setUsers: (users: User[]) => void,
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void,
  getRoleFromCategory: (categoryId: number) => User['role']
) => {
  // Fonction pour récupérer tous les utilisateurs
  const fetchUsers = useCallback(async (): Promise<void> => {
    try {
      console.log('Starting fetchUsers...');
      setLoading(true);
      setError(null);

      // Ajouter un timeout pour éviter les requêtes qui traînent
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout: Requête trop longue')), 10000)
      );

      const queryPromise = supabase
        .from('Utilisateurs')
        .select('*')
        .order('DateInscription', { ascending: false });

      const { data, error: fetchError } = await Promise.race([queryPromise, timeoutPromise]) as any;

      console.log('Supabase query result:', { data, error: fetchError });

      if (fetchError) {
        console.error('Supabase fetch error:', fetchError);
        throw fetchError;
      }

      if (!data) {
        console.log('No data returned from Supabase');
        setUsers([]);
        return;
      }

      const convertedUsers = data.map((user: any) => {
        console.log('Converting user:', user);
        try {
          return convertSupabaseUserToAppUser(user, getRoleFromCategory);
        } catch (conversionError) {
          console.error('Error converting user:', user, conversionError);
          // Retourner un utilisateur par défaut en cas d'erreur de conversion
          return {
            id: user.IDUtilisateurs?.toString() || 'unknown',
            nom: user.Nom || 'Inconnu',
            prenom: user.Prenom || 'Inconnu',
            email: user.Email || 'email@inconnu.com',
            role: 'visualisateur' as const,
            dateInscription: user.DateInscription || new Date().toISOString()
          };
        }
      });
      
      console.log('Converted users:', convertedUsers);
      setUsers(convertedUsers);
    } catch (err) {
      console.error('Erreur lors de la récupération des utilisateurs:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [setUsers, setLoading, setError, getRoleFromCategory]);

  return {
    fetchUsers
  };
};
