
import { Bell, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "../../stores/authStore";
import { useState } from "react";
import SettingsModal from "./SettingsModal";
import NotificationCenter from "../notifications/NotificationCenter";
import { useNavigate } from "react-router-dom";
import { useUnreadNotificationsCount } from "@/hooks/useNotifications";

const Header = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Récupérer le nombre de notifications non lues
  const { data: unreadCount = 0 } = useUnreadNotificationsCount(user?.id);

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
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">
                  {user?.prenom?.[0]}{user?.nom?.[0]}
                </span>
              </div>
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

      <NotificationCenter 
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
