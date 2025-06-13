import { cn } from "@/lib/utils";
import { useAuthStore } from "../../stores/authStore";
import { usePermissions } from "../../hooks/usePermissions";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Shield, 
  Headphones,
  LogOut,
  FileText,
  Building2,
  ShieldCheck,
  DollarSign
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const menuItems = [
  { id: "dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { id: "users", label: "Utilisateurs", icon: Users },
  { id: "prestations", label: "Prestations", icon: Calendar },
  { id: "moderation", label: "Modération", icon: Shield },
  { id: "support", label: "Support", icon: Headphones },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "partners", label: "Partenaires", icon: Building2 },
  { id: "rgpd", label: "RGPD", icon: ShieldCheck },
  { id: "finances", label: "Finances", icon: DollarSign },
];

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const { user, logout } = useAuthStore();
  const { canAccessPage } = usePermissions();

  const handleTabChange = (tabId: string) => {
    if (canAccessPage(tabId)) {
      setActiveTab(tabId);
    }
  };

  const getItemStyle = (itemId: string) => {
    if (!canAccessPage(itemId)) {
      return "text-slate-400 cursor-not-allowed opacity-50";
    }
    
    return activeTab === itemId
      ? "bg-blue-50 text-blue-700 border border-blue-200 shadow-sm"
      : "text-slate-600 hover:bg-slate-50 hover:text-slate-800 cursor-pointer";
  };

  return (
    <div className="w-64 bg-white shadow-lg border-r border-slate-200 flex flex-col">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-sm">AS</span>
          </div>
          <div>
            <h2 className="font-bold text-slate-800">AppSeniors</h2>
            <p className="text-xs text-slate-500">Administration</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isAccessible = canAccessPage(item.id);
          
          return (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              disabled={!isAccessible}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200",
                getItemStyle(item.id)
              )}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span className="font-medium">{item.label}</span>
              {!isAccessible && (
                <div className="ml-auto">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                </div>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg mb-3">
          <div className="w-8 h-8 bg-gradient-to-br from-slate-400 to-slate-500 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-xs">
              {user?.prenom?.[0]}{user?.nom?.[0]}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-slate-800 text-sm truncate">
              {user?.prenom} {user?.nom}
            </p>
            <div className="flex items-center gap-2">
              <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
              <div className={cn(
                "w-2 h-2 rounded-full",
                user?.role === 'administrateur' && "bg-blue-500",
                user?.role === 'moderateur' && "bg-orange-500",
                user?.role === 'support' && "bg-purple-500",
                user?.role === 'visualisateur' && "bg-gray-500"
              )}></div>
            </div>
          </div>
        </div>
        
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
        >
          <LogOut className="h-4 w-4" />
          <span className="text-sm font-medium">Déconnexion</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
