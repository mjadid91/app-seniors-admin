
import { useEffect, useRef } from 'react';
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
  
  const hasTriggeredInit = useRef(false);

  useEffect(() => {
    console.log('useSupabaseUsers useEffect triggered', { 
      categoriesLoading, 
      categoriesError,
      hasTriggeredInit: hasTriggeredInit.current
    });
    
    if (categoriesError) {
      console.error('Error loading categories:', categoriesError);
      return;
    }

    // Ne déclencher l'initialisation qu'une seule fois
    if (!categoriesLoading && !hasTriggeredInit.current) {
      hasTriggeredInit.current = true;
      initializeData();
    }
  }, [categoriesLoading, categoriesError, initializeData]);

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
