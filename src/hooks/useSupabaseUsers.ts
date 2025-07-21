
import { useState, useEffect, useCallback } from 'react';
import { User } from '../stores/authStore';
import { useUserCategories } from './useUserCategories';
import { CreateUserData } from '../components/users/userTypes';
import { UserHookReturn } from './types/userTypes';
import { useUserCrud } from './operations/useUserCrud';
import { useUserFetch } from './operations/useUserFetch';

export const useSupabaseUsers = (): UserHookReturn => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasFetched, setHasFetched] = useState(false);
  
  const { getRoleFromCategory, loading: categoriesLoading, error: categoriesError } = useUserCategories();

  const { fetchUsers, ensureSpecializedEntries } = useUserFetch(setUsers, setLoading, setError, getRoleFromCategory);
  const { addUser, updateUser, deleteUser } = useUserCrud(users, setUsers, getRoleFromCategory);

  // Utiliser useCallback pour éviter les re-créations de fonction
  const fetchUsersOnce = useCallback(async () => {
    if (!categoriesLoading && !categoriesError && getRoleFromCategory && !hasFetched) {
      console.log('Fetching users once...');
      setHasFetched(true);
      
      // D'abord s'assurer que les entrées spécialisées existent
      await ensureSpecializedEntries();
      
      // Puis récupérer les utilisateurs
      await fetchUsers();
    }
  }, [categoriesLoading, categoriesError, getRoleFromCategory, hasFetched, fetchUsers, ensureSpecializedEntries]);

  useEffect(() => {
    console.log('useSupabaseUsers useEffect triggered', { 
      categoriesLoading, 
      categoriesError, 
      hasFetched,
      getRoleFromCategory: !!getRoleFromCategory 
    });
    
    if (categoriesError) {
      console.error('Error loading categories:', categoriesError);
      setError(categoriesError);
      setLoading(false);
      return;
    }

    fetchUsersOnce();
  }, [categoriesError, fetchUsersOnce]);

  // Fonction pour refetch manuellement
  const refetchUsers = useCallback(async () => {
    if (!categoriesLoading && !categoriesError && getRoleFromCategory) {
      setHasFetched(false);
      await ensureSpecializedEntries();
      await fetchUsers();
      setHasFetched(true);
    }
  }, [categoriesLoading, categoriesError, getRoleFromCategory, fetchUsers, ensureSpecializedEntries]);

  // Rafraîchissement automatique toutes les 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      if (!loading && !categoriesLoading && !categoriesError) {
        console.log('Rafraîchissement automatique des utilisateurs...');
        refetchUsers();
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [loading, categoriesLoading, categoriesError, refetchUsers]);

  return {
    users,
    loading: loading || categoriesLoading,
    error: error || categoriesError,
    fetchUsers: refetchUsers,
    addUser,
    updateUser,
    deleteUser
  };
};

// Re-export types for backward compatibility
export type { SupabaseUser } from './types/userTypes';
