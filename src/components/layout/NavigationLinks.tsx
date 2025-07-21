
import { useNavigate, useLocation } from "react-router-dom";
import { usePermissions } from "../../hooks/usePermissions";
import { useAuthStore } from "../../stores/authStore";
import { cn } from "@/lib/utils";

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

interface NavigationLinksProps {
  className?: string;
  onItemClick?: () => void;
}

export const NavigationLinks = ({ className, onItemClick }: NavigationLinksProps) => {
  const { canAccessPage } = usePermissions();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (item: typeof menuItems[0]) => {
    let hasAccess = canAccessPage(item.id);
    
    // Protection spéciale pour Support : utiliser directement le rôle du user
    if (item.id === 'support' && user) {
      hasAccess = ['administrateur', 'support', 'visualisateur'].includes(user.role);
    }
    
    if (hasAccess) {
      navigate(item.path);
      onItemClick?.();
    }
  };

  const getItemStyle = (item: typeof menuItems[0]) => {
    let hasAccess = canAccessPage(item.id);
    
    // Protection spéciale pour Support : utiliser directement le rôle du user
    if (item.id === 'support' && user) {
      hasAccess = ['administrateur', 'support', 'visualisateur'].includes(user.role);
    }
    
    if (!hasAccess) {
      return "text-gray-400 cursor-not-allowed opacity-50";
    }

    const isActive = location.pathname === item.path;
    return isActive
      ? "text-primary font-semibold border-b-2 border-primary"
      : "text-gray-700 hover:text-primary hover:bg-gray-50";
  };

  return (
    <nav className={cn("flex items-center space-x-2", className)}>
      {menuItems.map((item) => {
        let isAccessible = canAccessPage(item.id);
        
        // Appliquer la même protection spéciale pour Support
        if (item.id === 'support' && user) {
          isAccessible = ['administrateur', 'support', 'visualisateur'].includes(user.role);
        }

        return (
          <button
            key={item.id}
            onClick={() => handleNavigation(item)}
            disabled={!isAccessible}
            className={cn(
              "px-3 py-2 text-sm font-medium transition-all duration-200 rounded-t-lg whitespace-nowrap",
              getItemStyle(item)
            )}
          >
            {item.label}
          </button>
        );
      })}
    </nav>
  );
};
