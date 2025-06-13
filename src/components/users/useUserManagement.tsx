
import { useState, useEffect } from "react";
import { User } from "../../stores/authStore";
import { usePermissions, PERMISSIONS } from "../../hooks/usePermissions";
import { useToast } from "@/hooks/use-toast";
import { UserStats, UserManagementState, UserManagementActions, CreateUserData } from "./userTypes";
import { useSupabaseUsers } from "../../hooks/useSupabaseUsers";
import { 
  calculateUserStats, 
  updateStatsAfterUserAdded, 
  updateStatsAfterUserDeleted, 
  updateStatsAfterRoleChange 
} from "./userStatsUtils";
import { filterUsers } from "./userFilterUtils";

export const useUserManagement = (): UserManagementState & UserManagementActions => {
  const [searchTerm, setSearchTerm] = useState("");
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
  const { users, loading, error, addUser, updateUser, deleteUser } = useSupabaseUsers();
  const canManageUsers = hasPermission(PERMISSIONS.MANAGE_USERS);

  // Calculate stats when users change
  useEffect(() => {
    if (users.length > 0) {
      setStats(calculateUserStats(users));
    }
  }, [users]);

  // Filter users based on search term
  useEffect(() => {
    const filtered = filterUsers(users, searchTerm);
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleRoleChange = async (userId: string, newRole: User['role']) => {
    try {
      await updateUser(userId, { role: newRole });
      toast({
        title: "Rôle modifié",
        description: "Le rôle de l'utilisateur a été mis à jour avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de modifier le rôle de l'utilisateur.",
        variant: "destructive"
      });
    }
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

  const handleUserAdded = async (newUserData: CreateUserData) => {
    try {
      await addUser(newUserData);
      toast({
        title: "Utilisateur créé",
        description: "L'utilisateur a été créé avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer l'utilisateur.",
        variant: "destructive"
      });
    }
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

  const handleUserEdited = async (userId: string, updatedData: Partial<User>) => {
    try {
      await updateUser(userId, updatedData);
      toast({
        title: "Utilisateur modifié",
        description: "L'utilisateur a été modifié avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de modifier l'utilisateur.",
        variant: "destructive"
      });
    }
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

  const handleUserDeleted = async (userId: string) => {
    try {
      const userToDelete = users.find(u => u.id === userId);
      await deleteUser(userId);
      
      if (userToDelete) {
        toast({
          title: "Utilisateur supprimé",
          description: `L'utilisateur ${userToDelete.prenom} ${userToDelete.nom} a été supprimé avec succès.`,
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'utilisateur.",
        variant: "destructive"
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
