import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Bell, Mail, Smartphone, Shield, Users, AlertTriangle } from "lucide-react";

const NotificationsSection = () => {
  const { toast } = useToast();
  
  const [notifications, setNotifications] = useState({
    email: {
      enabled: true,
      newUsers: true,
      moderationAlerts: true,
      systemUpdates: false,
      weeklyReports: true
    },
    sms: {
      enabled: false,
      urgentAlerts: true,
      moderationCritical: false
    },
    push: {
      enabled: true,
      realTime: true,
      mentions: true,
      comments: false
    },
    moderation: {
      enabled: true,
      reportedContent: true,
      autoModeration: true,
      userBans: true,
      contentFlags: false
    }
  });

  const handleMainToggle = (category: string, enabled: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [category]: { ...prev[category as keyof typeof prev], enabled }
    }));
    
    toast({
      title: `Notifications ${enabled ? 'activées' : 'désactivées'}`,
      description: `Les notifications ${category === 'email' ? 'par email' : category === 'sms' ? 'SMS' : category === 'push' ? 'push' : 'de modération'} ont été ${enabled ? 'activées' : 'désactivées'}.`,
    });
  };

  const handleSubToggle = (category: string, subcategory: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [category]: { 
        ...prev[category as keyof typeof prev], 
        [subcategory]: value 
      }
    }));
  };

  const saveSettings = () => {
    toast({
      title: "Paramètres sauvegardés",
      description: "Vos préférences de notification ont été enregistrées.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Email Notifications */}
      <Card className="animate-scale-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Notifications par email
          </CardTitle>
          <CardDescription>
            Gérez les notifications envoyées par email
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div>
              <Label className="text-base font-medium">Activer les notifications email</Label>
              <p className="text-sm text-slate-600">Recevoir des notifications par email</p>
            </div>
            <Switch
              checked={notifications.email.enabled}
              onCheckedChange={(enabled) => handleMainToggle('email', enabled)}
              className="transition-all duration-200"
            />
          </div>

          {notifications.email.enabled && (
            <div className="space-y-3 animate-fade-in">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="email-new-users"
                  checked={notifications.email.newUsers}
                  onCheckedChange={(checked) => handleSubToggle('email', 'newUsers', checked as boolean)}
                />
                <Label htmlFor="email-new-users" className="text-sm">
                  Nouveaux utilisateurs inscrits
                </Label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="email-moderation"
                  checked={notifications.email.moderationAlerts}
                  onCheckedChange={(checked) => handleSubToggle('email', 'moderationAlerts', checked as boolean)}
                />
                <Label htmlFor="email-moderation" className="text-sm">
                  Alertes de modération
                </Label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="email-system"
                  checked={notifications.email.systemUpdates}
                  onCheckedChange={(checked) => handleSubToggle('email', 'systemUpdates', checked as boolean)}
                />
                <Label htmlFor="email-system" className="text-sm">
                  Mises à jour système
                </Label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="email-reports"
                  checked={notifications.email.weeklyReports}
                  onCheckedChange={(checked) => handleSubToggle('email', 'weeklyReports', checked as boolean)}
                />
                <Label htmlFor="email-reports" className="text-sm">
                  Rapports hebdomadaires
                </Label>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* SMS Notifications */}
      <Card className="animate-scale-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Notifications SMS
          </CardTitle>
          <CardDescription>
            Configurez les alertes SMS pour les événements critiques
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div>
              <Label className="text-base font-medium">Activer les notifications SMS</Label>
              <p className="text-sm text-slate-600">Recevoir des alertes critiques par SMS</p>
            </div>
            <Switch
              checked={notifications.sms.enabled}
              onCheckedChange={(enabled) => handleMainToggle('sms', enabled)}
              className="transition-all duration-200"
            />
          </div>

          {notifications.sms.enabled && (
            <div className="space-y-3 animate-fade-in">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="sms-urgent"
                  checked={notifications.sms.urgentAlerts}
                  onCheckedChange={(checked) => handleSubToggle('sms', 'urgentAlerts', checked as boolean)}
                />
                <Label htmlFor="sms-urgent" className="text-sm">
                  Alertes urgentes
                </Label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="sms-moderation-critical"
                  checked={notifications.sms.moderationCritical}
                  onCheckedChange={(checked) => handleSubToggle('sms', 'moderationCritical', checked as boolean)}
                />
                <Label htmlFor="sms-moderation-critical" className="text-sm">
                  Modération critique
                </Label>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Push Notifications */}
      <Card className="animate-scale-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications push
          </CardTitle>
          <CardDescription>
            Notifications en temps réel dans le navigateur
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div>
              <Label className="text-base font-medium">Activer les notifications push</Label>
              <p className="text-sm text-slate-600">Notifications en temps réel</p>
            </div>
            <Switch
              checked={notifications.push.enabled}
              onCheckedChange={(enabled) => handleMainToggle('push', enabled)}
              className="transition-all duration-200"
            />
          </div>

          {notifications.push.enabled && (
            <div className="space-y-3 animate-fade-in">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="push-realtime"
                  checked={notifications.push.realTime}
                  onCheckedChange={(checked) => handleSubToggle('push', 'realTime', checked as boolean)}
                />
                <Label htmlFor="push-realtime" className="text-sm">
                  Notifications en temps réel
                </Label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="push-mentions"
                  checked={notifications.push.mentions}
                  onCheckedChange={(checked) => handleSubToggle('push', 'mentions', checked as boolean)}
                />
                <Label htmlFor="push-mentions" className="text-sm">
                  Mentions et interactions
                </Label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="push-comments"
                  checked={notifications.push.comments}
                  onCheckedChange={(checked) => handleSubToggle('push', 'comments', checked as boolean)}
                />
                <Label htmlFor="push-comments" className="text-sm">
                  Nouveaux commentaires
                </Label>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Moderation Alerts */}
      <Card className="animate-scale-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Alertes de modération
          </CardTitle>
          <CardDescription>
            Notifications spécifiques aux activités de modération
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div>
              <Label className="text-base font-medium">Activer les alertes de modération</Label>
              <p className="text-sm text-slate-600">Notifications pour les actions de modération</p>
            </div>
            <Switch
              checked={notifications.moderation.enabled}
              onCheckedChange={(enabled) => handleMainToggle('moderation', enabled)}
              className="transition-all duration-200"
            />
          </div>

          {notifications.moderation.enabled && (
            <div className="space-y-3 animate-fade-in">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="mod-reported"
                  checked={notifications.moderation.reportedContent}
                  onCheckedChange={(checked) => handleSubToggle('moderation', 'reportedContent', checked as boolean)}
                />
                <Label htmlFor="mod-reported" className="text-sm">
                  Contenu signalé
                </Label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="mod-auto"
                  checked={notifications.moderation.autoModeration}
                  onCheckedChange={(checked) => handleSubToggle('moderation', 'autoModeration', checked as boolean)}
                />
                <Label htmlFor="mod-auto" className="text-sm">
                  Actions de modération automatique
                </Label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="mod-bans"
                  checked={notifications.moderation.userBans}
                  onCheckedChange={(checked) => handleSubToggle('moderation', 'userBans', checked as boolean)}
                />
                <Label htmlFor="mod-bans" className="text-sm">
                  Bannissements d'utilisateurs
                </Label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="mod-flags"
                  checked={notifications.moderation.contentFlags}
                  onCheckedChange={(checked) => handleSubToggle('moderation', 'contentFlags', checked as boolean)}
                />
                <Label htmlFor="mod-flags" className="text-sm">
                  Signalements de contenu
                </Label>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="pt-4">
        <Button 
          onClick={saveSettings}
          className="w-full md:w-auto transition-all duration-200 hover:scale-105"
        >
          Enregistrer les paramètres
        </Button>
      </div>
    </div>
  );
};

export default NotificationsSection;
