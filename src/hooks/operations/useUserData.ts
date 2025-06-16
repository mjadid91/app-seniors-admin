
import { useState, useCallback, useRef } from 'react';
import { User } from '../../stores/authStore';
import { useUserCategories } from '../useUserCategories';
import { CreateUserData } from '../../components/users/userTypes';
import { UserHookReturn } from '../types/userTypes';
import { useUserCrud } from './useUserCrud';
import { useUserFetch } from './useUserFetch';

export const useUserData = (): Omit<UserHookReturn, 'users' | 'loading' | 'error'> & {
  users: User[];
  setUsers: (users: User[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  initializeData: () => Promise<void>;
} => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const initializationRef = useRef<{
    hasFetched: boolean;
    isInitializing: boolean;
  }>({
    hasFetched: false,
    isInitializing: false
  });
  
  const { getRoleFromCategory, loading: categoriesLoading, error: categoriesError } = useUserCategories();

  const { fetchUsers, ensureSpecializedEntries } = useUserFetch(setUsers, setLoading, setError, getRoleFromCategory);
  const { addUser, updateUser, deleteUser } = useUserCrud(users, setUsers, getRoleFromCategory);

  // Initialize data once when categories are ready
  const initializeData = useCallback(async () => {
    console.log('initializeData called', {
      categoriesLoading,
      categoriesError,
      hasFetched: initializationRef.current.hasFetched,
      isInitializing: initializationRef.current.isInitializing,
      hasRoleFromCategory: !!getRoleFromCategory
    });

    // Prevent multiple simultaneous initializations
    if (initializationRef.current.isInitializing) {
      console.log('Already initializing, skipping...');
      return;
    }

    // Check if we already initialized successfully
    if (initializationRef.current.hasFetched) {
      console.log('Already fetched, skipping...');
      return;
    }

    // Wait for categories to be ready
    if (categoriesLoading || categoriesError || !getRoleFromCategory) {
      console.log('Categories not ready yet');
      return;
    }

    try {
      initializationRef.current.isInitializing = true;
      console.log('Starting initialization...');
      
      // First ensure specialized entries exist
      await ensureSpecializedEntries();
      
      // Then fetch users
      await fetchUsers();
      
      initializationRef.current.hasFetched = true;
      console.log('Initialization completed successfully');
    } catch (err) {
      console.error('Error during initialization:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      initializationRef.current.isInitializing = false;
    }
  }, [categoriesLoading, categoriesError, getRoleFromCategory, fetchUsers, ensureSpecializedEntries, setError]);

  // Manual refetch function
  const refetchUsers = useCallback(async () => {
    if (!categoriesLoading && !categoriesError && getRoleFromCategory) {
      // Reset initialization state for manual refetch
      initializationRef.current.hasFetched = false;
      initializationRef.current.isInitializing = false;
      await initializeData();
    }
  }, [categoriesLoading, categoriesError, getRoleFromCategory, initializeData]);

  return {
    users,
    setUsers,
    loading,
    setLoading,
    error,
    setError,
    initializeData,
    fetchUsers: refetchUsers,
    addUser,
    updateUser,
    deleteUser
  };
};
