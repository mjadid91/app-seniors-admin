
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Shield,
  Headphones,
  FileText,
  Building2,
  ShieldCheck,
  DollarSign,
  Menu,
  X,
  LogOut,
  Settings,
  Bell,
  User
} from "lucide-react";
import { useAuthStore } from "../../stores/authStore";
import { useSupabaseAuth } from "../../hooks/useSupabaseAuth";
import { usePermissions } from "../../hooks/usePermissions";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useNotifications } from "@/hooks/useNotifications";
import { cn } from "@/lib/utils";

const navigation = [
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

const AppNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const { signOut } = useSupabaseAuth();
  const { canAccessPage } = usePermissions();
  const { profile } = useUserProfile();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await signOut();
      logout();
      navigate("/connexion", { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
      logout();
      navigate("/connexion", { replace: true });
    }
  };

  const filteredNavigation = navigation.filter(item => canAccessPage(item.id));

  const isActiveRoute = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-border shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AS</span>
              </div>
              <span className="text-xl font-bold text-foreground">AppSeniors</span>
              <span className="text-sm text-muted-foreground hidden sm:block">Admin</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {filteredNavigation.map((item) => {
              const Icon = item.icon;
              const isActive = isActiveRoute(item.path);
              
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right side - User menu */}
          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative hidden sm:flex">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 border-2 border-border">
                    <AvatarImage src={profile?.photo || undefined} alt="Photo de profil" />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-blue-600 text-primary-foreground font-medium">
                      {user?.prenom?.[0]}{user?.nom?.[0]}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium text-sm">
                      {user?.prenom} {user?.nom}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user?.email}
                    </p>
                    <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-2 py-0.5 text-xs font-medium">
                      {user?.role}
                    </span>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Paramètres</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Déconnexion</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {filteredNavigation.map((item) => {
                const Icon = item.icon;
                const isActive = isActiveRoute(item.path);
                
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AppNavbar;
