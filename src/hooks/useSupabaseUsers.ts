
import { useEffect } from 'react';
import { UserHookReturn } from './types/userTypes';
import { useUserData } from './operations/useUserData';
import { useUserCategories } from './useUserCategories';

export const useSupabaseUsers = (): UserHookReturn => {
  const { loading: categoriesLoading, error: categoriesError } = useUserCategories();
  const {
    users,
    loading,
    error,
    initializeData,
    fetchUsers,
    addUser,
    updateUser,
    deleteUser
  } = useUserData();

  useEffect(() => {
    console.log('useSupabaseUsers useEffect triggered', { 
      categoriesLoading, 
      categoriesError
    });
    
    if (categoriesError) {
      console.error('Error loading categories:', categoriesError);
      return;
    }

    initializeData();
  }, [categoriesError, initializeData]);

  return {
    users,
    loading: loading || categoriesLoading,
    error: error || categoriesError,
    fetchUsers,
    addUser,
    updateUser,
    deleteUser
  };
};

// Re-export types for backward compatibility
export type { SupabaseUser } from './types/userTypes';
