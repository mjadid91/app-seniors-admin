
import { useState, useCallback } from 'react';
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
  const [hasFetched, setHasFetched] = useState(false);
  
  const { getRoleFromCategory, loading: categoriesLoading, error: categoriesError } = useUserCategories();

  const { fetchUsers, ensureSpecializedEntries } = useUserFetch(setUsers, setLoading, setError, getRoleFromCategory);
  const { addUser, updateUser, deleteUser } = useUserCrud(users, setUsers, getRoleFromCategory);

  // Initialize data once when categories are ready
  const initializeData = useCallback(async () => {
    if (!categoriesLoading && !categoriesError && getRoleFromCategory && !hasFetched) {
      console.log('Initializing user data...');
      setHasFetched(true);
      
      // First ensure specialized entries exist
      await ensureSpecializedEntries();
      
      // Then fetch users
      await fetchUsers();
    }
  }, [categoriesLoading, categoriesError, getRoleFromCategory, hasFetched, fetchUsers, ensureSpecializedEntries]);

  // Manual refetch function
  const refetchUsers = useCallback(async () => {
    if (!categoriesLoading && !categoriesError && getRoleFromCategory) {
      setHasFetched(false);
      await ensureSpecializedEntries();
      await fetchUsers();
      setHasFetched(true);
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
