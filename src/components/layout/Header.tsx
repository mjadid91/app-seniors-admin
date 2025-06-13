
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "../../stores/authStore";
import { Bell, Search, Settings, User } from "lucide-react";
import NotificationsModal from "./NotificationsModal";
import SettingsModal from "./SettingsModal";

const Header = () => {
  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Recherche:", searchQuery);
    // Logique de recherche à implémenter
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    console.log("Notifications toggle");
  };

  const openAllNotifications = () => {
    setShowNotifications(false);
    setIsNotificationsModalOpen(true);
  };

  const openSettings = () => {
    setIsSettingsModalOpen(true);
    console.log("Ouverture des paramètres");
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-slate-800">
              Interface d'Administration
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </form>
            
            <div className="relative">
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative"
                onClick={toggleNotifications}
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </Button>
              
              {showNotifications && (
                <div className="absolute right-0 top-12 w-80 bg-white border border-slate-200 rounded-lg shadow-lg z-50">
                  <div className="p-4 border-b border-slate-200">
                    <h3 className="font-semibold text-slate-800">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    <div className="p-4 border-b border-slate-100 hover:bg-slate-50 cursor-pointer">
                      <p className="text-sm font-medium text-slate-800">Nouveau signalement</p>
                      <p className="text-xs text-slate-500">Il y a 5 minutes</p>
                    </div>
                    <div className="p-4 border-b border-slate-100 hover:bg-slate-50 cursor-pointer">
                      <p className="text-sm font-medium text-slate-800">Demande RGPD en attente</p>
                      <p className="text-xs text-slate-500">Il y a 1 heure</p>
                    </div>
                    <div className="p-4 hover:bg-slate-50 cursor-pointer">
                      <p className="text-sm font-medium text-slate-800">Nouveau partenaire inscrit</p>
                      <p className="text-xs text-slate-500">Il y a 2 heures</p>
                    </div>
                  </div>
                  <div className="p-4 border-t border-slate-200">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full"
                      onClick={openAllNotifications}
                    >
                      Voir toutes les notifications
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={openSettings}
            >
              <Settings className="h-5 w-5" />
            </Button>

            <div className="flex items-center gap-2 pl-4 border-l border-slate-200">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <NotificationsModal 
        isOpen={isNotificationsModalOpen}
        onClose={() => setIsNotificationsModalOpen(false)}
      />

      <SettingsModal 
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />
    </>
  );
};

export default Header;
