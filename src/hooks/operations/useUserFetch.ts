
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

      // Filtrer uniquement les catégories 5, 6, 7, 8 pour la section utilisateurs
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
        console.log('No users found with categories 5, 6, 7, 8');
        setUsers([]);
        return;
      }

      console.log('Raw users data:', data);

      const transformedUsers: User[] = data.map((user: SupabaseUser) => 
        convertSupabaseUserToAppUser(user, getRoleFromCategory)
      );

      console.log('Transformed users:', transformedUsers);
      setUsers(transformedUsers);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [setUsers, setLoading, setError, getRoleFromCategory]);

  return { fetchUsers };
};
