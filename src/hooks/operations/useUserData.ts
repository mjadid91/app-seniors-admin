
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
  const hasInitialized = useRef(false);
  const isInitializing = useRef(false);
  
  const { getRoleFromCategory, loading: categoriesLoading, error: categoriesError } = useUserCategories();

  const { fetchUsers, ensureSpecializedEntries } = useUserFetch(setUsers, setLoading, setError, getRoleFromCategory);
  const { addUser, updateUser, deleteUser } = useUserCrud(users, setUsers, getRoleFromCategory);

  // Initialize data once when categories are ready
  const initializeData = useCallback(async () => {
    // Empêcher l'initialisation multiple
    if (hasInitialized.current || isInitializing.current || categoriesLoading || categoriesError || !getRoleFromCategory) {
      return;
    }

    hasInitialized.current = true;
    isInitializing.current = true;
    
    try {
      console.log('Initializing user data...');
      
      // First ensure specialized entries exist
      await ensureSpecializedEntries();
      
      // Then fetch users
      await fetchUsers();
    } catch (err) {
      console.error('Error initializing user data:', err);
    } finally {
      isInitializing.current = false;
    }
  }, [categoriesLoading, categoriesError, getRoleFromCategory, fetchUsers, ensureSpecializedEntries]);

  // Manual refetch function
  const refetchUsers = useCallback(async () => {
    if (!categoriesLoading && !categoriesError && getRoleFromCategory && !isInitializing.current) {
      await ensureSpecializedEntries();
      await fetchUsers();
    }
  }, [categoriesLoading, categoriesError, getRoleFromCategory, fetchUsers, ensureSpecializedEntries]);

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
