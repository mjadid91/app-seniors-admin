
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "../../stores/authStore";
import { useSupabaseAuth } from "../../hooks/useSupabaseAuth";
import { usePermissions } from "../../hooks/usePermissions";
import { LogOut, Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const menuItems = [
  { id: "dashboard", label: "Dashboard", path: "/dashboard" },
  { id: "users", label: "Utilisateurs", path: "/users" },
  { id: "prestations", label: "Prestations", path: "/prestations" },
  { id: "moderation", label: "Modération", path: "/moderation" },
  { id: "support", label: "Support", path: "/support" },
  { id: "documents", label: "Documents", path: "/documents" },
  { id: "partners", label: "Partenaires", path: "/partners" },
  { id: "rgpd", label: "RGPD", path: "/rgpd" },
  { id: "finances", label: "Finances", path: "/finances" },
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
      return "text-muted-foreground cursor-not-allowed opacity-50";
    }

    const isActive = location.pathname === item.path;
    return isActive
      ? "text-primary font-semibold bg-primary/10"
      : "text-foreground hover:text-primary hover:bg-muted/50";
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
    <nav className="bg-background border-b border-border shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Left */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-primary-foreground font-bold text-lg">AS</span>
            </div>
            <div className="hidden sm:block min-w-0">
              <h1 className="font-bold text-foreground text-lg truncate">AppSeniors</h1>
              <p className="text-sm text-muted-foreground -mt-1 truncate">Administration</p>
            </div>
          </div>

          {/* Navigation - Center (Desktop) */}
          <div className="hidden lg:flex items-center justify-center flex-1 max-w-4xl mx-8">
            <div className="flex items-center space-x-1">
              {menuItems.map((item) => {
                const isAccessible = canAccessPage(item.id);

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item)}
                    disabled={!isAccessible}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      getItemStyle(item)
                    )}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* User Menu - Right */}
          <div className="flex items-center gap-4">
            {/* Desktop User Menu */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-3 px-3 py-2 bg-muted/50 rounded-lg">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground font-medium text-xs">
                    {user?.prenom?.[0]}{user?.nom?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="font-medium text-foreground text-sm truncate">
                    {user?.prenom} {user?.nom}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs">{getRoleIcon(user?.role || '')}</span>
                    <p className="text-xs text-muted-foreground capitalize truncate">{user?.role}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors duration-200"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm font-medium">Déconnexion</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary/20"
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
        <div className="lg:hidden border-t border-border bg-background">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => {
              const isAccessible = canAccessPage(item.id);

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item)}
                  disabled={!isAccessible}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200",
                    getItemStyle(item)
                  )}
                >
                  {item.label}
                </button>
              );
            })}
            
            {/* Mobile User Info & Logout */}
            <div className="border-t border-border pt-4 mt-4">
              <div className="flex items-center gap-3 px-3 py-2 mb-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground font-medium text-xs">
                    {user?.prenom?.[0]}{user?.nom?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="font-medium text-foreground text-sm truncate">
                    {user?.prenom} {user?.nom}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs">{getRoleIcon(user?.role || '')}</span>
                    <p className="text-xs text-muted-foreground capitalize truncate">{user?.role}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors duration-200"
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
