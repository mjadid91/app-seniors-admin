
import { useState } from "react";
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
  DollarSign,
  Menu,
  X
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { id: "users", label: "Utilisateurs", icon: Users, path: "/users" },
  { id: "prestations", label: "Prestations", icon: Calendar, path: "/prestations" },
  { id: "moderation", label: "Modération", icon: Shield, path: "/moderation" },
  { id: "support", label: "Support", icon: Headphones, path: "/support" },
  { id: "documents", label: "Documents", icon: FileText, path: "/documents" },
  { id: "partners", label: "Partenaires", icon: Building2, path: "/partners" },
  { id: "rgpd", label: "RGPD", icon: ShieldCheck, path: "/rgpd" },
  { id: "finances", label: "Finances", icon: DollarSign, path: "/finances" },
];

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const { signOut } = useSupabaseAuth();
  const { canAccessPage } = usePermissions();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigation = (item: typeof menuItems[0]) => {
    if (canAccessPage(item.id)) {
      navigate(item.path);
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      console.log('Navbar: Starting logout process...');
      
      await signOut();
      console.log('Navbar: Supabase logout completed');
      
      logout();
      console.log('Navbar: Local store cleared');
      
      navigate("/connexion", { replace: true });
      console.log('Navbar: Redirected to login page');
      
    } catch (error) {
      console.error('Navbar: Logout error:', error);
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
      ? "text-blue-600 bg-blue-50 border-blue-200"
      : "text-slate-700 hover:text-blue-600 hover:bg-slate-50";
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
    <nav className="bg-white border-b border-slate-200 shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AS</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-slate-800 text-lg">AppSeniors</h1>
                <p className="text-xs text-slate-500 -mt-1">Administration</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isAccessible = canAccessPage(item.id);

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item)}
                    disabled={!isAccessible}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                      getItemStyle(item)
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden lg:inline">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center gap-3 px-3 py-2 bg-slate-50 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-br from-slate-400 to-slate-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-xs">
                  {user?.prenom?.[0]}{user?.nom?.[0]}
                </span>
              </div>
              <div className="min-w-0">
                <p className="font-medium text-slate-800 text-sm truncate">
                  {user?.prenom} {user?.nom}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs">{getRoleIcon(user?.role || '')}</span>
                  <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <LogOut className="h-4 w-4" />
              <span className="text-sm">Déconnexion</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-slate-800 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-slate-200">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isAccessible = canAccessPage(item.id);

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item)}
                  disabled={!isAccessible}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-md text-left text-base font-medium transition-colors duration-200",
                    getItemStyle(item)
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            
            {/* Mobile User Info & Logout */}
            <div className="border-t border-slate-200 pt-4 mt-4">
              <div className="flex items-center gap-3 px-3 py-2 mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-slate-400 to-slate-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-xs">
                    {user?.prenom?.[0]}{user?.nom?.[0]}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-slate-800 text-sm">
                    {user?.prenom} {user?.nom}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs">{getRoleIcon(user?.role || '')}</span>
                    <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
              >
                <LogOut className="h-5 w-5" />
                <span className="text-base font-medium">Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
