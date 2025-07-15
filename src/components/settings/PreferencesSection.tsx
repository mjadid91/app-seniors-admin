
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun, Monitor, Globe, Palette, Settings, Bell } from "lucide-react";

const PreferencesSection = () => {
  const { toast } = useToast();
  const { theme, setTheme, actualTheme } = useTheme();
  
  const [preferences, setPreferences] = useState({
    darkMode: false,
    language: "fr",
    region: "FR",
    timezone: "Europe/Paris",
    dateFormat: "dd/MM/yyyy",
    currency: "EUR",
    notifications: {
      desktop: true,
      sounds: false,
      preview: true,
      compact: false
    },
    interface: {
      animations: true,
      compactMode: false,
      showAvatars: true,
      autoSave: true
    }
  });

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    toast({
      title: "Thème modifié",
      description: `Thème ${newTheme === 'light' ? 'clair' : newTheme === 'dark' ? 'sombre' : 'système'} appliqué.`,
    });
  };

  const handleLanguageChange = (language: string) => {
    setPreferences(prev => ({ ...prev, language }));
    toast({
      title: "Langue modifiée",
      description: "La langue de l'interface a été mise à jour.",
    });
  };

  const handleRegionChange = (region: string) => {
    setPreferences(prev => ({ ...prev, region }));
    toast({
      title: "Région modifiée",
      description: "Les paramètres régionaux ont été mis à jour.",
    });
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: value }
    }));
  };

  const handleInterfaceChange = (key: string, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      interface: { ...prev.interface, [key]: value }
    }));
  };

  const themeOptions = [
    { value: "light", label: "Clair", icon: Sun, description: "Interface claire" },
    { value: "dark", label: "Sombre", icon: Moon, description: "Interface sombre" },
    { value: "system", label: "Système", icon: Monitor, description: "Suit les préférences du système" }
  ];

  return (
    <div className="space-y-6">
      {/* Theme Settings */}
      <Card className="animate-scale-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-purple-600" />
            Thème de l'interface
          </CardTitle>
          <CardDescription>
            Personnalisez l'apparence de l'interface administrateur
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label className="text-base font-medium">Mode d'affichage</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {themeOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = theme === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => handleThemeChange(option.value as "light" | "dark" | "system")}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                      isSelected
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50 bg-card text-card-foreground"
                    }`}
                  >
                    <Icon className="h-6 w-6 mx-auto mb-2" />
                    <p className="text-sm font-medium">{option.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">{option.description}</p>
                  </button>
                );
              })}
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2">
                {actualTheme === "dark" ? (
                  <Moon className="h-4 w-4 text-blue-600" />
                ) : (
                  <Sun className="h-4 w-4 text-yellow-600" />
                )}
                <span className="text-sm font-medium">
                  Thème actuel : {actualTheme === "dark" ? "Sombre" : "Clair"}
                </span>
              </div>
              {theme === "system" && (
                <span className="text-xs text-muted-foreground">
                  (Détecté automatiquement)
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base font-medium">Mode sombre automatique</Label>
              <p className="text-sm text-muted-foreground">
                Active automatiquement le mode sombre selon l'heure
              </p>
            </div>
            <Switch
              checked={preferences.darkMode}
              onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, darkMode: checked }))}
              className="transition-all duration-200"
            />
          </div>
        </CardContent>
      </Card>

      {/* Language and Region Settings */}
      <Card className="animate-scale-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-green-600" />
            Langue et région
          </CardTitle>
          <CardDescription>
            Configurez la langue et les paramètres régionaux
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Langue de l'interface</Label>
              <Select value={preferences.language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="transition-all duration-200 hover:border-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">🇫🇷 Français</SelectItem>
                  <SelectItem value="en">🇺🇸 English</SelectItem>
                  <SelectItem value="es">🇪🇸 Español</SelectItem>
                  <SelectItem value="de">🇩🇪 Deutsch</SelectItem>
                  <SelectItem value="it">🇮🇹 Italiano</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Région</Label>
              <Select value={preferences.region} onValueChange={handleRegionChange}>
                <SelectTrigger className="transition-all duration-200 hover:border-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FR">France</SelectItem>
                  <SelectItem value="BE">Belgique</SelectItem>
                  <SelectItem value="CH">Suisse</SelectItem>
                  <SelectItem value="CA">Canada</SelectItem>
                  <SelectItem value="US">États-Unis</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Fuseau horaire</Label>
              <Select 
                value={preferences.timezone} 
                onValueChange={(value) => setPreferences(prev => ({ ...prev, timezone: value }))}
              >
                <SelectTrigger className="transition-all duration-200 hover:border-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Europe/Paris">Paris (UTC+1)</SelectItem>
                  <SelectItem value="Europe/Brussels">Bruxelles (UTC+1)</SelectItem>
                  <SelectItem value="Europe/Zurich">Zurich (UTC+1)</SelectItem>
                  <SelectItem value="America/Montreal">Montréal (UTC-5)</SelectItem>
                  <SelectItem value="America/New_York">New York (UTC-5)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Format de date</Label>
              <Select 
                value={preferences.dateFormat} 
                onValueChange={(value) => setPreferences(prev => ({ ...prev, dateFormat: value }))}
              >
                <SelectTrigger className="transition-all duration-200 hover:border-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dd/MM/yyyy">DD/MM/YYYY</SelectItem>
                  <SelectItem value="MM/dd/yyyy">MM/DD/YYYY</SelectItem>
                  <SelectItem value="yyyy-MM-dd">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Devise</Label>
            <Select 
              value={preferences.currency} 
              onValueChange={(value) => setPreferences(prev => ({ ...prev, currency: value }))}
            >
              <SelectTrigger className="transition-all duration-200 hover:border-primary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EUR">Euro (€)</SelectItem>
                <SelectItem value="USD">Dollar US ($)</SelectItem>
                <SelectItem value="GBP">Livre Sterling (£)</SelectItem>
                <SelectItem value="CHF">Franc Suisse (CHF)</SelectItem>
                <SelectItem value="CAD">Dollar Canadien (CAD)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Interface Preferences */}
      <Card className="animate-scale-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-blue-600" />
            Préférences d'interface
          </CardTitle>
          <CardDescription>
            Personnalisez le comportement de l'interface
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="animations"
              checked={preferences.interface.animations}
              onCheckedChange={(checked) => handleInterfaceChange('animations', checked as boolean)}
            />
            <div className="space-y-1">
              <Label htmlFor="animations" className="font-medium">
                Animations d'interface
              </Label>
              <p className="text-sm text-muted-foreground">
                Activer les animations et transitions fluides
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Checkbox
              id="compact-mode"
              checked={preferences.interface.compactMode}
              onCheckedChange={(checked) => handleInterfaceChange('compactMode', checked as boolean)}
            />
            <div className="space-y-1">
              <Label htmlFor="compact-mode" className="font-medium">
                Mode compact
              </Label>
              <p className="text-sm text-muted-foreground">
                Réduire l'espacement pour afficher plus d'informations
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Checkbox
              id="show-avatars"
              checked={preferences.interface.showAvatars}
              onCheckedChange={(checked) => handleInterfaceChange('showAvatars', checked as boolean)}
            />
            <div className="space-y-1">
              <Label htmlFor="show-avatars" className="font-medium">
                Afficher les avatars
              </Label>
              <p className="text-sm text-muted-foreground">
                Afficher les photos de profil dans les listes
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Checkbox
              id="auto-save"
              checked={preferences.interface.autoSave}
              onCheckedChange={(checked) => handleInterfaceChange('autoSave', checked as boolean)}
            />
            <div className="space-y-1">
              <Label htmlFor="auto-save" className="font-medium">
                Sauvegarde automatique
              </Label>
              <p className="text-sm text-muted-foreground">
                Sauvegarder automatiquement les modifications
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card className="animate-scale-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-yellow-600" />
            Préférences de notifications
          </CardTitle>
          <CardDescription>
            Configurez comment vous souhaitez recevoir les notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="desktop-notifications"
              checked={preferences.notifications.desktop}
              onCheckedChange={(checked) => handleNotificationChange('desktop', checked as boolean)}
            />
            <div className="space-y-1">
              <Label htmlFor="desktop-notifications" className="font-medium">
                Notifications du bureau
              </Label>
              <p className="text-sm text-muted-foreground">
                Afficher les notifications sur le bureau du système
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Checkbox
              id="notification-sounds"
              checked={preferences.notifications.sounds}
              onCheckedChange={(checked) => handleNotificationChange('sounds', checked as boolean)}
            />
            <div className="space-y-1">
              <Label htmlFor="notification-sounds" className="font-medium">
                Sons de notification
              </Label>
              <p className="text-sm text-muted-foreground">
                Jouer un son lors de la réception de notifications
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Checkbox
              id="notification-preview"
              checked={preferences.notifications.preview}
              onCheckedChange={(checked) => handleNotificationChange('preview', checked as boolean)}
            />
            <div className="space-y-1">
              <Label htmlFor="notification-preview" className="font-medium">
                Aperçu des notifications
              </Label>
              <p className="text-sm text-muted-foreground">
                Afficher un aperçu du contenu dans les notifications
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Checkbox
              id="compact-notifications"
              checked={preferences.notifications.compact}
              onCheckedChange={(checked) => handleNotificationChange('compact', checked as boolean)}
            />
            <div className="space-y-1">
              <Label htmlFor="compact-notifications" className="font-medium">
                Notifications compactes
              </Label>
              <p className="text-sm text-muted-foreground">
                Afficher les notifications dans un format plus compact
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PreferencesSection;
