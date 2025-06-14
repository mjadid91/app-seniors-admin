
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
  handleUserAdded: (newUserData: CreateUserData, userPassword: string) => void;
  handleEditUser: (user: User) => void;
  handleUserEdited: (userId: string, updatedData: Partial<User>) => void;
  handleDeleteUser: (user: User) => void;
  handleUserDeleted: (userId: string) => void;
  setIsAddUserModalOpen: (open: boolean) => void;
  setIsEditUserModalOpen: (open: boolean) => void;
  setIsDeleteConfirmOpen: (open: boolean) => void;
}

// Extension for the new user data structure that includes category ID
export interface UserWithCategory extends Omit<User, 'role'> {
  categoryId: number;
  categoryLabel: string;
}

export interface CreateUserData {
  nom: string;
  prenom: string;
  email: string;
  categoryId: number;
  dateInscription: string;
}
