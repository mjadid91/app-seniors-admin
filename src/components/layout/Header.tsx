
import { Bell, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "../../stores/authStore";
import { useState } from "react";
import NotificationsModal from "./NotificationsModal";
import SettingsModal from "./SettingsModal";
import { useNavigate } from "react-router-dom";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useNotifications } from "@/hooks/useNotifications";

const Header = () => {
  const { user } = useAuthStore();
  const { profile } = useUserProfile();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <header className="bg-white shadow-sm border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-800">
              Tableau de bord administrateur
            </h1>
            <p className="text-sm text-slate-600">
              Bienvenue, {user?.prenom} {user?.nom}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowNotifications(true)}
              className="relative"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/settings")}
              className="flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              Paramètres
            </Button>

            <div className="flex items-center gap-2 ml-3 pl-3 border-l border-slate-200">
              <Avatar className="h-8 w-8">
                <AvatarImage src={profile?.photo || undefined} alt="Photo de profil" />
                <AvatarFallback className="text-sm bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                  {user?.prenom?.[0]}{user?.nom?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-slate-800">
                  {user?.prenom} {user?.nom}
                </p>
                <p className="text-xs text-slate-600 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <NotificationsModal 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />

      <SettingsModal 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />
    </>
  );
};

export default Header;
