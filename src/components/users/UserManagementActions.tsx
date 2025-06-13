
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";
import { usePermissions, PERMISSIONS } from "../../hooks/usePermissions";
import { useToast } from "@/hooks/use-toast";
import { User } from "../../stores/authStore";

interface UserManagementActionsProps {
  users: User[];
  onAddUser: () => void;
}

const UserManagementActions = ({ users, onAddUser }: UserManagementActionsProps) => {
  const { hasPermission, isViewer } = usePermissions();
  const { toast } = useToast();
  
  const canManageUsers = hasPermission(PERMISSIONS.MANAGE_USERS);
  const canExportData = hasPermission(PERMISSIONS.EXPORT_DATA);

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
    <div className="flex items-center gap-3">
      {canExportData && (
        <Button variant="outline" onClick={handleExport} disabled={isViewer()}>
          <Download className="h-4 w-4 mr-2" />
          Exporter
        </Button>
      )}
      {canManageUsers && (
        <Button onClick={onAddUser} disabled={isViewer()}>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un utilisateur
        </Button>
      )}
    </div>
  );
};

export default UserManagementActions;
