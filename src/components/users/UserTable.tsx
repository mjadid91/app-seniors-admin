
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { User } from "../../stores/authStore";
import RoleManager from "./RoleManager";
import { usePermissions, PERMISSIONS } from "../../hooks/usePermissions";
import { useUserActivation } from "../../hooks/useUserActivation";

interface UserTableProps {
  users: User[];
  onRoleChange: (userId: string, newRole: User['role']) => void;
  onEditUser: (user: User) => void;
  onDeleteUser: (user: User) => void;
  onRefresh?: () => void;
}

const UserTable = ({ users, onRoleChange, onEditUser, onDeleteUser, onRefresh }: UserTableProps) => {
  const { hasPermission, isViewer } = usePermissions();
  const canManageUsers = hasPermission(PERMISSIONS.MANAGE_USERS);
  const { toggleUserActivation, isLoading } = useUserActivation();
  const [userToToggle, setUserToToggle] = useState<User | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleToggleActivationClick = (user: User) => {
    setUserToToggle(user);
    setIsDialogOpen(true);
  };

  const handleConfirmToggleActivation = async () => {
    if (!userToToggle) return;
    
    console.log('handleToggleActivation called for user:', userToToggle);
    const shouldDeactivate = !userToToggle.estDesactive;
    const success = await toggleUserActivation(userToToggle.id, shouldDeactivate);
    
    if (success && onRefresh) {
      onRefresh();
    }
    
    setIsDialogOpen(false);
    setUserToToggle(null);
  };

  const handleCancelToggleActivation = () => {
    setIsDialogOpen(false);
    setUserToToggle(null);
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

  const getActionText = (user: User) => {
    return user.estDesactive ? "Réactiver" : "Désactiver";
  };

  const getDialogContent = () => {
    if (!userToToggle) return { title: "", description: "" };
    
    if (userToToggle.estDesactive) {
      return {
        title: "Réactiver le compte",
        description: `Êtes-vous sûr de vouloir réactiver le compte de ${userToToggle.prenom} ${userToToggle.nom} ?`
      };
    } else {
      return {
        title: "Désactiver le compte",
        description: `Êtes-vous sûr de vouloir désactiver le compte de ${userToToggle.prenom} ${userToToggle.nom} ? L'utilisateur ne pourra plus se connecter.`
      };
    }
  };

  const getInitials = (prenom: string, nom: string) => {
    return `${prenom?.[0] || ''}${nom?.[0] || ''}`;
  };

  const dialogContent = getDialogContent();

  return (
    <>
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
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.photo || undefined} alt="Photo de profil" />
                    <AvatarFallback className="bg-gradient-to-br from-slate-400 to-slate-500 text-white font-medium text-sm">
                      {getInitials(user.prenom, user.nom)}
                    </AvatarFallback>
                  </Avatar>
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
                        onClick={() => handleToggleActivationClick(user)}
                      >
                        {getActionText(user)}
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

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{dialogContent.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {dialogContent.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelToggleActivation}>
              Annuler
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmToggleActivation}>
              Confirmer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default UserTable;
