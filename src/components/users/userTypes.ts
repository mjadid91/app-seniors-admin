
import { User } from "../../stores/authStore";

export interface UserStats {
  total: number;
  active: number;
  inactive: number;
  admins: number;
}

export interface UserManagementState {
  searchTerm: string;
  users: User[];
  filteredUsers: User[];
  isAddUserModalOpen: boolean;
  isEditUserModalOpen: boolean;
  isDeleteConfirmOpen: boolean;
  selectedUser: User | null;
  stats: UserStats;
}

export interface UserManagementActions {
  setSearchTerm: (term: string) => void;
  handleRoleChange: (userId: string, newRole: User['role']) => void;
  handleAddUser: () => void;
  handleUserAdded: (newUserData: Omit<User, 'id'>) => void;
  handleEditUser: (user: User) => void;
  handleUserEdited: (userId: string, updatedData: Partial<User>) => void;
  handleDeleteUser: (user: User) => void;
  handleUserDeleted: (userId: string) => void;
  setIsAddUserModalOpen: (open: boolean) => void;
  setIsEditUserModalOpen: (open: boolean) => void;
  setIsDeleteConfirmOpen: (open: boolean) => void;
}
