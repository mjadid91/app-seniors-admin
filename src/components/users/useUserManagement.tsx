
import { useState, useEffect } from "react";
import { User } from "../../stores/authStore";
import { usePermissions, PERMISSIONS } from "../../hooks/usePermissions";
import { useToast } from "@/hooks/use-toast";

interface UserStats {
  total: number;
  active: number;
  inactive: number;
  admins: number;
}

export const useUserManagement = () => {
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

  // Initialize mock users
  useEffect(() => {
    const mockUsers: User[] = [
      {
        id: '1',
        nom: 'Dubois',
        prenom: 'Marie',
        email: 'admin@appseniors.fr',
        role: 'administrateur',
        dateInscription: '2024-01-15'
      },
      {
        id: '2',
        nom: 'Martin',
        prenom: 'Pierre',
        email: 'support@appseniors.fr',
        role: 'support',
        dateInscription: '2024-02-10'
      },
      {
        id: '3',
        nom: 'Durand',
        prenom: 'Sophie',
        email: 'moderateur@appseniors.fr',
        role: 'moderateur',
        dateInscription: '2024-03-05'
      },
      {
        id: '4',
        nom: 'Leclerc',
        prenom: 'Jean',
        email: 'viewer@appseniors.fr',
        role: 'visualisateur',
        dateInscription: '2024-03-20'
      },
      {
        id: '5',
        nom: 'Moreau',
        prenom: 'Claire',
        email: 'claire.moreau@appseniors.fr',
        role: 'support',
        dateInscription: '2024-04-12'
      }
    ];
    
    setUsers(mockUsers);
    setFilteredUsers(mockUsers);
    
    const newStats = {
      total: mockUsers.length,
      active: mockUsers.length - 1,
      inactive: 1,
      admins: mockUsers.filter(u => u.role === 'administrateur').length
    };
    setStats(newStats);
  }, []);

  // Filter users based on search term
  useEffect(() => {
    const filtered = users.filter(user =>
      user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleRoleChange = (userId: string, newRole: User['role']) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
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
    setStats(prevStats => ({
      ...prevStats,
      total: prevStats.total + 1,
      active: prevStats.active + 1,
      admins: newUser.role === 'administrateur' ? prevStats.admins + 1 : prevStats.admins
    }));
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
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId ? { ...user, ...updatedData } : user
      )
    );
    setStats(prevStats => {
      const updatedUsers = users.map(user => 
        user.id === userId ? { ...user, ...updatedData } : user
      );
      return {
        ...prevStats,
        admins: updatedUsers.filter(u => u.role === 'administrateur').length
      };
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
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    setStats(prevStats => ({
      ...prevStats,
      total: prevStats.total - 1,
      active: prevStats.active - 1,
      admins: userToDelete?.role === 'administrateur' ? prevStats.admins - 1 : prevStats.admins
    }));
    
    toast({
      title: "Utilisateur supprimé",
      description: `L'utilisateur ${userToDelete?.prenom} ${userToDelete?.nom} a été supprimé avec succès.`,
    });
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
