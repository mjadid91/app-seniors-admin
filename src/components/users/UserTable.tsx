
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User } from "../../stores/authStore";
import RoleManager from "./RoleManager";
import { usePermissions, PERMISSIONS } from "../../hooks/usePermissions";

interface UserTableProps {
  users: User[];
  onRoleChange: (userId: string, newRole: User['role']) => void;
}

const UserTable = ({ users, onRoleChange }: UserTableProps) => {
  const { hasPermission, isViewer } = usePermissions();
  const canManageUsers = hasPermission(PERMISSIONS.MANAGE_USERS);

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
                onRoleChange={onRoleChange}
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
  );
};

export default UserTable;
