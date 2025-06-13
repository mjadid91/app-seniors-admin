
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, User, Bell, Shield, Palette } from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-blue-600" />
            Paramètres de l'administration
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[60vh] overflow-y-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="h-4 w-4" />
                Profil administrateur
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="admin-name">Nom complet</Label>
                <Input id="admin-name" defaultValue="Administrateur Principal" />
              </div>
              <div>
                <Label htmlFor="admin-email">Email</Label>
                <Input id="admin-email" type="email" defaultValue="admin@example.com" />
              </div>
              <div>
                <Label htmlFor="admin-phone">Téléphone</Label>
                <Input id="admin-phone" defaultValue="+33 1 23 45 67 89" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bell className="h-4 w-4" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications-email">Notifications par email</Label>
                <Switch id="notifications-email" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications-sms">Notifications SMS</Label>
                <Switch id="notifications-sms" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications-push">Notifications push</Label>
                <Switch id="notifications-push" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications-moderation">Alertes de modération</Label>
                <Switch id="notifications-moderation" defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="h-4 w-4" />
                Sécurité
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="two-factor">Authentification à deux facteurs</Label>
                <Switch id="two-factor" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="session-timeout">Déconnexion automatique</Label>
                <Switch id="session-timeout" defaultChecked />
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Changer le mot de passe
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Palette className="h-4 w-4" />
                Interface
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode">Mode sombre</Label>
                <Switch id="dark-mode" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="compact-view">Vue compacte</Label>
                <Switch id="compact-view" />
              </div>
              <div>
                <Label htmlFor="language">Langue</Label>
                <select className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button>
            Sauvegarder
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
