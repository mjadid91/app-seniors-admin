
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Moon, Sun, Monitor } from "lucide-react";

const PreferencesSection = () => {
  const { toast } = useToast();
  
  const [preferences, setPreferences] = useState({
    theme: "system",
    darkMode: false,
    language: "fr",
    notifications: {
      desktop: true,
      sounds: false,
      preview: true,
      compact: false
    }
  });

  const handleThemeChange = (theme: string) => {
    setPreferences(prev => ({ ...prev, theme }));
    toast({
      title: "Thème modifié",
      description: `Thème ${theme === 'light' ? 'clair' : theme === 'dark' ? 'sombre' : 'système'} appliqué.`,
    });
  };

  const handleLanguageChange = (language: string) => {
    setPreferences(prev => ({ ...prev, language }));
    toast({
      title: "Langue modifiée",
      description: "La langue de l'interface a été mise à jour.",
    });
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: value }
    }));
  };

  const themeOptions = [
    { value: "light", label: "Clair", icon: Sun },
    { value: "dark", label: "Sombre", icon: Moon },
    { value: "system", label: "Système", icon: Monitor }
  ];

  return (
    <div className="space-y-6">
      {/* Theme Settings */}
      <Card className="animate-scale-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-xl">🎨</span>
            Apparence
          </CardTitle>
          <CardDescription>
            Personnalisez l'apparence de l'interface
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label className="text-base font-medium">Thème de l'interface</Label>
            <div className="grid grid-cols-3 gap-3">
              {themeOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.value}
                    onClick={() => handleThemeChange(option.value)}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                      preferences.theme === option.value
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <Icon className="h-6 w-6 mx-auto mb-2" />
                    <p className="text-sm font-medium">{option.label}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base font-medium">Mode sombre automatique</Label>
              <p className="text-sm text-slate-600">
                Active automatiquement le mode sombre la nuit
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

      {/* Language Settings */}
      <Card className="animate-scale-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-xl">🌍</span>
            Langue et région
          </CardTitle>
          <CardDescription>
            Configurez la langue de l'interface
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label>Langue de l'interface</Label>
            <Select value={preferences.language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="transition-all duration-200 hover:border-blue-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fr">🇫🇷 Français</SelectItem>
                <SelectItem value="en">🇺🇸 English</SelectItem>
                <SelectItem value="es">🇪🇸 Español</SelectItem>
                <SelectItem value="de">🇩🇪 Deutsch</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Interface Preferences */}
      <Card className="animate-scale-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-xl">⚙️</span>
            Préférences d'interface
          </CardTitle>
          <CardDescription>
            Personnalisez le comportement de l'interface
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
              <p className="text-sm text-slate-600">
                Afficher les notifications sur le bureau
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
              <p className="text-sm text-slate-600">
                Jouer un son lors des notifications
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
              <p className="text-sm text-slate-600">
                Afficher un aperçu du contenu dans les notifications
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Checkbox
              id="compact-interface"
              checked={preferences.notifications.compact}
              onCheckedChange={(checked) => handleNotificationChange('compact', checked as boolean)}
            />
            <div className="space-y-1">
              <Label htmlFor="compact-interface" className="font-medium">
                Interface compacte
              </Label>
              <p className="text-sm text-slate-600">
                Réduire l'espacement pour afficher plus d'informations
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PreferencesSection;
