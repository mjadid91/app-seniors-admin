
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Shield } from "lucide-react";

const SecuritySection = () => {
  const { toast } = useToast();
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive"
      });
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast({
        title: "Erreur",
        description: "Le mot de passe doit contenir au moins 8 caractères.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Mot de passe modifié",
      description: "Votre mot de passe a été mis à jour avec succès.",
    });
    
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setShowPasswordForm(false);
    setIsLoading(false);
  };

  const handleTwoFactorToggle = async (enabled: boolean) => {
    setTwoFactorEnabled(enabled);
    
    toast({
      title: enabled ? "Authentification à deux facteurs activée" : "Authentification à deux facteurs désactivée",
      description: enabled 
        ? "Votre compte est maintenant plus sécurisé." 
        : "L'authentification à deux facteurs a été désactivée.",
    });
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="space-y-6">
      {/* Change Password Card */}
      <Card className="animate-scale-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-xl">🔒</span>
            Changer le mot de passe
          </CardTitle>
          <CardDescription>
            Modifiez votre mot de passe pour sécuriser votre compte
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!showPasswordForm ? (
            <Button 
              onClick={() => setShowPasswordForm(true)}
              variant="outline"
              className="transition-all duration-200 hover:scale-105"
            >
              Changer le mot de passe
            </Button>
          ) : (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showPasswords.current ? "text" : "password"}
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                    className="pr-10 transition-all duration-200 focus:scale-[1.02]"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('current')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showPasswords.new ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                    className="pr-10 transition-all duration-200 focus:scale-[1.02]"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('new')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showPasswords.confirm ? "text" : "password"}
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="pr-10 transition-all duration-200 focus:scale-[1.02]"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirm')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button 
                  onClick={handlePasswordChange}
                  disabled={isLoading}
                  className="transition-all duration-200 hover:scale-105"
                >
                  {isLoading ? "Modification..." : "Modifier le mot de passe"}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowPasswordForm(false);
                    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
                  }}
                  disabled={isLoading}
                >
                  Annuler
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Two-Factor Authentication Card */}
      <Card className="animate-scale-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Authentification à deux facteurs
          </CardTitle>
          <CardDescription>
            Ajoutez une couche de sécurité supplémentaire à votre compte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">Activer l'authentification à deux facteurs</p>
              <p className="text-sm text-slate-600">
                {twoFactorEnabled 
                  ? "L'authentification à deux facteurs est activée" 
                  : "Protégez votre compte avec une vérification en deux étapes"
                }
              </p>
            </div>
            <Switch
              checked={twoFactorEnabled}
              onCheckedChange={handleTwoFactorToggle}
              className="transition-all duration-200"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecuritySection;
