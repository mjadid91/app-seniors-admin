
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User } from "../../stores/authStore";
import RoleManager from "./RoleManager";
import { usePermissions, PERMISSIONS } from "../../hooks/usePermissions";
import { useUserActivation } from "../../hooks/useUserActivation";

interface UserTableProps {
  users: User[];
  onRoleChange: (userId: string, newRole: User['role']) => void;
  onEditUser: (user: User) => void;
  onDeleteUser: (user: User) => void;
  onRefresh?: () => void; // Nouvelle prop pour recharger les données
}

const UserTable = ({ users, onRoleChange, onEditUser, onDeleteUser, onRefresh }: UserTableProps) => {
  const { hasPermission, isViewer } = usePermissions();
  const canManageUsers = hasPermission(PERMISSIONS.MANAGE_USERS);
  const { toggleUserActivation, isLoading } = useUserActivation();

  const handleToggleActivation = async (user: User) => {
    console.log('handleToggleActivation called for user:', user);
    const success = await toggleUserActivation(user.id, !user.estDesactive);
    if (success && onRefresh) {
      // Recharger la liste des utilisateurs
      onRefresh();
    }
  };

  const getStatusBadge = (user: User) => {
    if (user.estDesactive) {
      return (
        <Badge variant="destructive" className="bg-red-50 text-red-700 border-red-200">
          Désactivé
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
        Actif
      </Badge>
    );
  };

  return (
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
        {users.map((user) => (
          <TableRow key={user.id} className={user.estDesactive ? "opacity-60" : ""}>
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
                onRoleChange={onRoleChange}
              />
            </TableCell>
            <TableCell>
              {new Date(user.dateInscription).toLocaleDateString('fr-FR')}
            </TableCell>
            <TableCell>
              {getStatusBadge(user)}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  disabled={isViewer() || user.estDesactive}
                  onClick={() => onEditUser(user)}
                >
                  Modifier
                </Button>
                {canManageUsers && !isViewer() && (
                  <>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      disabled={isLoading}
                      className={user.estDesactive ? "text-green-600 hover:text-green-700" : "text-orange-600 hover:text-orange-700"}
                      onClick={() => handleToggleActivation(user)}
                    >
                      {user.estDesactive ? "Réactiver" : "Désactiver"}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-600 hover:text-red-700"
                      disabled={user.estDesactive}
                      onClick={() => onDeleteUser(user)}
                    >
                      Supprimer
                    </Button>
                  </>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;
