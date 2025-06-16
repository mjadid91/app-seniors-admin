
import { User } from '../../stores/authStore';

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
  stats: UserStats;
  isAddUserModalOpen: boolean;
  isEditUserModalOpen: boolean;
  isDeleteConfirmOpen: boolean;
  selectedUser: User | null;
}

export interface UserManagementActions {
  setSearchTerm: (searchTerm: string) => void;
  handleRoleChange: (userId: string, newRole: User['role']) => void;
  handleAddUser: () => void;
  handleUserAdded: (newUserData: CreateUserData, userPassword: string) => void;
  handleEditUser: (user: User) => void;
  handleUserEdited: (userId: string, updatedData: Partial<User>) => void;
  handleDeleteUser: (user: User) => void;
  handleUserDeleted: (userId: string) => void;
  setIsAddUserModalOpen: (isOpen: boolean) => void;
  setIsEditUserModalOpen: (isOpen: boolean) => void;
  setIsDeleteConfirmOpen: (isOpen: boolean) => void;
}

export interface CreateUserData {
  nom: string;
  prenom: string;
  email: string;
  categoryId: number;
  dateInscription: string;
}
