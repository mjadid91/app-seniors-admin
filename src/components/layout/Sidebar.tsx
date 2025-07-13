import { cn } from "@/lib/utils";
import { useAuthStore } from "../../stores/authStore";
import { useSupabaseAuth } from "../../hooks/useSupabaseAuth";
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
import { useNavigate, useLocation } from "react-router-dom";

const menuItems = [
  { id: "dashboard", label: "Tableau de bord", icon: LayoutDashboard, path: "/dashboard" },
  { id: "users", label: "Utilisateurs", icon: Users, path: "/users" },
  { id: "prestations", label: "Prestations", icon: Calendar, path: "/prestations" },
  { id: "moderation", label: "Modération", icon: Shield, path: "/moderation" },
  { id: "support", label: "Support", icon: Headphones, path: "/support" },
  { id: "documents", label: "Documents", icon: FileText, path: "/documents" },
  { id: "partners", label: "Partenaires", icon: Building2, path: "/partners" },
  { id: "rgpd", label: "RGPD", icon: ShieldCheck, path: "/rgpd" },
  { id: "finances", label: "Finances", icon: DollarSign, path: "/finances" },
];

const Sidebar = () => {
  const { user, logout } = useAuthStore();
  const { signOut } = useSupabaseAuth();
  const { canAccessPage } = usePermissions();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (item: typeof menuItems[0]) => {
    if (canAccessPage(item.id)) {
      navigate(item.path);
    }
  };

  const handleLogout = async () => {
    try {
      console.log('Sidebar: Starting logout process...');
      
      // Première étape : déconnecter de Supabase
      await signOut();
      console.log('Sidebar: Supabase logout completed');
      
      // Deuxième étape : nettoyer le store local
      logout();
      console.log('Sidebar: Local store cleared');
      
      // Troisième étape : rediriger vers la page de connexion
      navigate("/connexion", { replace: true });
      console.log('Sidebar: Redirected to login page');
      
    } catch (error) {
      console.error('Sidebar: Logout error:', error);
      // En cas d'erreur, forcer quand même la déconnexion locale
      logout();
      navigate("/connexion", { replace: true });
    }
  };

  const getItemStyle = (item: typeof menuItems[0]) => {
    if (!canAccessPage(item.id)) {
      return "text-slate-400 cursor-not-allowed opacity-50";
    }

    const isActive = location.pathname === item.path;
    return isActive
      ? "bg-blue-50 text-blue-700 border border-blue-200 shadow-sm"
      : "text-slate-600 hover:bg-slate-50 hover:text-slate-800 cursor-pointer";
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'administrateur':
        return "bg-blue-500";
      case 'moderateur':
        return "bg-orange-500";
      case 'support':
        return "bg-purple-500";
      case 'visualisateur':
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'administrateur':
        return '👑';
      case 'moderateur':
        return '🛡️';
      case 'support':
        return '🎧';
      case 'visualisateur':
        return '👁️';
      default:
        return '👤';
    }
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
              onClick={() => handleNavigation(item)}
              disabled={!isAccessible}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200",
                getItemStyle(item)
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
              <span className="text-xs">{getRoleIcon(user?.role || '')}</span>
              <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
              <div className={cn(
                "w-2 h-2 rounded-full",
                getRoleBadgeColor(user?.role || '')
              )}></div>
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
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
