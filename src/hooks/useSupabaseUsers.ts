
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

  const effectRef = useRef({
    hasTriggered: false
  });

  useEffect(() => {
    console.log('useSupabaseUsers useEffect triggered', { 
      categoriesLoading, 
      categoriesError,
      hasTriggered: effectRef.current.hasTriggered
    });

    // Prevent multiple effect triggers
    if (effectRef.current.hasTriggered) {
      console.log('Effect already triggered, skipping...');
      return;
    }
    
    if (categoriesError) {
      console.error('Error loading categories:', categoriesError);
      return;
    }

    if (!categoriesLoading) {
      effectRef.current.hasTriggered = true;
      console.log('Categories loaded, initializing data...');
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
