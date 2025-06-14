
import { useState, useEffect } from 'react';
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
  const { getRoleFromCategory } = useUserCategories();

  const { fetchUsers } = useUserFetch(setUsers, setLoading, setError, getRoleFromCategory);
  const { addUser, updateUser, deleteUser } = useUserCrud(users, setUsers, getRoleFromCategory);

  useEffect(() => {
    fetchUsers();
  }, [getRoleFromCategory]);

  return {
    users,
    loading,
    error,
    fetchUsers,
    addUser,
    updateUser,
    deleteUser
  };
};

// Re-export types for backward compatibility
export type { SupabaseUser } from './types/userTypes';
