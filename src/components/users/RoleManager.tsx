import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { User } from '../../stores/authStore';
import { RoleBadge } from '../ui/role-badge';
import { usePermissions, PERMISSIONS } from '../../hooks/usePermissions';
import { Settings, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RoleManagerProps {
  user: User;
  onRoleChange: (userId: string, newRole: User['role']) => void;
}

const RoleManager = ({ user, onRoleChange }: RoleManagerProps) => {
  const [selectedRole, setSelectedRole] = useState<User['role']>(user.role);
  const [isOpen, setIsOpen] = useState(false);
  const { hasPermission } = usePermissions();
  const { toast } = useToast();

  const canManageRoles = hasPermission(PERMISSIONS.MANAGE_ROLES);

  const handleRoleChange = () => {
    if (selectedRole !== user.role) {
      onRoleChange(user.id, selectedRole);
      toast({
        title: "Rôle modifié",
        description: `Le rôle de ${user.prenom} ${user.nom} a été changé en ${selectedRole}.`,
      });
    }
    setIsOpen(false);
  };

  const getRoleDescription = (role: User['role']) => {
    switch (role) {
      case 'administrateur':
        return "Accès complet à toutes les fonctionnalités (EstAdministrateur = true)";
      case 'moderateur':
        return "Modération uniquement - Lecture, suppression et masquage de contenus (EstModerateur = true)";
      case 'support':
        return "Support uniquement - Réponse aux tickets et mise à jour des statuts (EstSupport = true)";
      case 'visualisateur':
        return "Lecture seule sur toutes les pages (tous les flags à false)";
      default:
        return "";
    }
  };

  if (!canManageRoles) {
    return <RoleBadge role={user.role} />;
  }

  return (
    <div className="flex items-center gap-2">
      <RoleBadge role={user.role} />
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
            <Settings className="h-3 w-3" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              Changer les droits
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Utilisateur</Label>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <div className="w-10 h-10 bg-gradient-to-br from-slate-400 to-slate-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {user.prenom[0]}{user.nom[0]}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-slate-800">{user.prenom} {user.nom}</p>
                  <p className="text-sm text-slate-500">{user.email}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role-select" className="text-sm font-medium">
                Nouveau rôle
              </Label>
              <Select value={selectedRole} onValueChange={(value: User['role']) => setSelectedRole(value)}>
                <SelectTrigger id="role-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="administrateur">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      Administrateur
                    </div>
                  </SelectItem>
                  <SelectItem value="moderateur">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      Modérateur
                    </div>
                  </SelectItem>
                  <SelectItem value="support">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      Support
                    </div>
                  </SelectItem>
                  <SelectItem value="visualisateur">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                      Visualisateur
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleRoleChange} disabled={selectedRole === user.role}>
                Appliquer les changements
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoleManager;
