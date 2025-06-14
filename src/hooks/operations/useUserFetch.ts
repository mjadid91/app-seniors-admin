
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
  const fetchUsers = async (): Promise<void> => {
    try {
      console.log('Starting fetchUsers...');
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('Utilisateurs')
        .select('*')
        .order('DateInscription', { ascending: false });

      console.log('Supabase query result:', { data, error: fetchError });

      if (fetchError) {
        console.error('Supabase fetch error:', fetchError);
        throw fetchError;
      }

      const convertedUsers = data?.map(user => {
        console.log('Converting user:', user);
        return convertSupabaseUserToAppUser(user, getRoleFromCategory);
      }) || [];
      
      console.log('Converted users:', convertedUsers);
      setUsers(convertedUsers);
    } catch (err) {
      console.error('Erreur lors de la récupération des utilisateurs:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchUsers
  };
};
