
import { useState, useEffect } from "react";
import { User } from "../../stores/authStore";
import { usePermissions, PERMISSIONS } from "../../hooks/usePermissions";
import { useToast } from "@/hooks/use-toast";
import { UserStats, UserManagementState, UserManagementActions } from "./userTypes";
import { mockUsers } from "./userMockData";
import { 
  calculateUserStats, 
  updateStatsAfterUserAdded, 
  updateStatsAfterUserDeleted, 
  updateStatsAfterRoleChange 
} from "./userStatsUtils";
import { filterUsers } from "./userFilterUtils";

export const useUserManagement = (): UserManagementState & UserManagementActions => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [stats, setStats] = useState<UserStats>({
    total: 0,
    active: 0,
    inactive: 0,
    admins: 0
  });
  
  const { hasPermission } = usePermissions();
  const { toast } = useToast();
  const canManageUsers = hasPermission(PERMISSIONS.MANAGE_USERS);

  // Initialize users
  useEffect(() => {
    setUsers(mockUsers);
    setFilteredUsers(mockUsers);
    setStats(calculateUserStats(mockUsers));
  }, []);

  // Filter users based on search term
  useEffect(() => {
    const filtered = filterUsers(users, searchTerm);
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleRoleChange = (userId: string, newRole: User['role']) => {
    setUsers(prevUsers => {
      const updatedUsers = prevUsers.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      );
      setStats(updateStatsAfterRoleChange(updatedUsers));
      return updatedUsers;
    });
  };

  const handleAddUser = () => {
    if (!canManageUsers) {
      toast({
        title: "Accès refusé",
        description: "Vous n'avez pas les droits pour ajouter des utilisateurs.",
        variant: "destructive"
      });
      return;
    }
    setIsAddUserModalOpen(true);
  };

  const handleUserAdded = (newUserData: Omit<User, 'id'>) => {
    const newUser: User = {
      ...newUserData,
      id: (users.length + 1).toString()
    };
    setUsers(prevUsers => [...prevUsers, newUser]);
    setStats(prevStats => updateStatsAfterUserAdded(prevStats, newUser));
  };

  const handleEditUser = (user: User) => {
    if (!canManageUsers) {
      toast({
        title: "Accès refusé",
        description: "Vous n'avez pas les droits pour modifier des utilisateurs.",
        variant: "destructive"
      });
      return;
    }
    setSelectedUser(user);
    setIsEditUserModalOpen(true);
  };

  const handleUserEdited = (userId: string, updatedData: Partial<User>) => {
    setUsers(prevUsers => {
      const updatedUsers = prevUsers.map(user => 
        user.id === userId ? { ...user, ...updatedData } : user
      );
      setStats(updateStatsAfterRoleChange(updatedUsers));
      return updatedUsers;
    });
  };

  const handleDeleteUser = (user: User) => {
    if (!canManageUsers) {
      toast({
        title: "Accès refusé",
        description: "Vous n'avez pas les droits pour supprimer des utilisateurs.",
        variant: "destructive"
      });
      return;
    }
    setSelectedUser(user);
    setIsDeleteConfirmOpen(true);
  };

  const handleUserDeleted = (userId: string) => {
    const userToDelete = users.find(u => u.id === userId);
    if (userToDelete) {
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      setStats(prevStats => updateStatsAfterUserDeleted(prevStats, userToDelete));
      
      toast({
        title: "Utilisateur supprimé",
        description: `L'utilisateur ${userToDelete.prenom} ${userToDelete.nom} a été supprimé avec succès.`,
      });
    }
  };

  return {
    // State
    searchTerm,
    users,
    filteredUsers,
    stats,
    isAddUserModalOpen,
    isEditUserModalOpen,
    isDeleteConfirmOpen,
    selectedUser,
    
    // Actions
    setSearchTerm,
    handleRoleChange,
    handleAddUser,
    handleUserAdded,
    handleEditUser,
    handleUserEdited,
    handleDeleteUser,
    handleUserDeleted,
    
    // Modal controls
    setIsAddUserModalOpen,
    setIsEditUserModalOpen,
    setIsDeleteConfirmOpen
  };
};
