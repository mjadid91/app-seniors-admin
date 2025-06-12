
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "../../stores/authStore";
import { Download, Plus } from "lucide-react";
import { usePermissions, PERMISSIONS } from "../../hooks/usePermissions";
import ProtectedRoute from "../auth/ProtectedRoute";
import { useToast } from "@/hooks/use-toast";
import AddUserModal from "./AddUserModal";
import UserStats from "./UserStats";
import UserSearch from "./UserSearch";
import UserTable from "./UserTable";

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    admins: 0
  });
  
  const { hasPermission, isViewer } = usePermissions();
  const { toast } = useToast();

  const canManageUsers = hasPermission(PERMISSIONS.MANAGE_USERS);
  const canExportData = hasPermission(PERMISSIONS.EXPORT_DATA);

  useEffect(() => {
    // Simulation des données utilisateurs avec différents rôles
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
    
    // Calcul des statistiques
    const stats = {
      total: mockUsers.length,
      active: mockUsers.length - 1, // Simulation
      inactive: 1,
      admins: mockUsers.filter(u => u.role === 'administrateur').length
    };
    setStats(stats);
  }, []);

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

  const handleExport = () => {
    if (!canExportData) {
      toast({
        title: "Accès refusé",
        description: "Vous n'avez pas les droits pour exporter des données.",
        variant: "destructive"
      });
      return;
    }
    
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Nom,Prénom,Email,Rôle,Date d'inscription\n" +
      users.map(user => `${user.nom},${user.prenom},${user.email},${user.role},${user.dateInscription}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "utilisateurs_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export réussi",
      description: "La liste des utilisateurs a été exportée.",
    });
  };

  return (
    <ProtectedRoute requiredPage="users">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-800">Gestion des utilisateurs</h1>
          <div className="flex items-center gap-3">
            {canExportData && (
              <Button variant="outline" onClick={handleExport} disabled={isViewer()}>
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </Button>
            )}
            {canManageUsers && (
              <Button onClick={handleAddUser} disabled={isViewer()}>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un utilisateur
              </Button>
            )}
          </div>
        </div>

        <UserStats stats={stats} />

        <Card>
          <CardHeader>
            <CardTitle>Liste des utilisateurs</CardTitle>
          </CardHeader>
          <CardContent>
            <UserSearch 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
            <UserTable 
              users={filteredUsers}
              onRoleChange={handleRoleChange}
            />
          </CardContent>
        </Card>

        <AddUserModal 
          isOpen={isAddUserModalOpen}
          onClose={() => setIsAddUserModalOpen(false)}
          onAddUser={handleUserAdded}
        />
      </div>
    </ProtectedRoute>
  );
};

export default UserManagement;
