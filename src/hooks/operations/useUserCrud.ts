
import { User } from '../../stores/authStore';
import { CreateUserData } from '../../components/users/userTypes';
import { useUserCreation } from './useUserCreation';
import { useUserUpdate } from './useUserUpdate';
import { useUserDeletion } from './useUserDeletion';

export const useUserCrud = (
  users: User[],
  setUsers: (users: User[]) => void,
  getRoleFromCategory: (categoryId: number) => User['role']
) => {
  const { addUser } = useUserCreation(users, setUsers, getRoleFromCategory);
  const { updateUser } = useUserUpdate(users, setUsers, getRoleFromCategory);
  const { deleteUser } = useUserDeletion(users, setUsers);

  return {
    addUser,
    updateUser,
    deleteUser
  };
};
