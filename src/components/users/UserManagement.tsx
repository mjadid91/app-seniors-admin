import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, useAuthStore } from "../../stores/authStore";
import { Search, Plus, Download, Users, UserCheck, UserX, Eye } from "lucide-react";
import { usePermissions, PERMISSIONS } from "../../hooks/usePermissions";
import { RoleBadge } from "../ui/role-badge";
import RoleManager from "./RoleManager";
import ProtectedRoute from "../auth/ProtectedRoute";
import { useToast } from "@/hooks/use-toast";
import AddUserModal from "./AddUserModal";

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

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total utilisateurs</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Actifs</CardTitle>
              <UserCheck className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inactifs</CardTitle>
              <UserX className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.inactive}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Administrateurs</CardTitle>
              <Eye className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.admins}</div>
            </CardContent>
          </Card>
        </div>

        {/* Recherche */}
        <Card>
          <CardHeader>
            <CardTitle>Liste des utilisateurs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom, email ou rôle..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Utilisateur</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead>Date d'inscription</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-slate-400 to-slate-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {user.prenom[0]}{user.nom[0]}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{user.prenom} {user.nom}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <RoleManager 
                        user={user}
                        onRoleChange={handleRoleChange}
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(user.dateInscription).toLocaleDateString('fr-FR')}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        Actif
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" disabled={isViewer()}>
                          Modifier
                        </Button>
                        {canManageUsers && !isViewer() && (
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            Supprimer
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
