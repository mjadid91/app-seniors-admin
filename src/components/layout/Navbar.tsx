
import { useSupabaseAuth } from "../../hooks/useSupabaseAuth";
import { AppLogo } from "./AppLogo";
import { NavigationLinks } from "./NavigationLinks";
import { ProfileDropdown } from "./ProfileDropdown";
import { MobileMenu } from "./MobileMenu";

const Navbar = () => {
  const { loading, isInitialized, isAuthenticated } = useSupabaseAuth();

  // Don't render navbar if not authenticated
  if (!isInitialized || loading || !isAuthenticated) {
    return null;
  }

  return (
    <nav className="bg-white border-b border-slate-200 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-full mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo et titre - À gauche */}
          <div className="flex items-center space-x-4">
            <AppLogo />
          </div>

          {/* Liens de navigation - Centré (Desktop uniquement) */}
          <div className="hidden lg:flex flex-1 justify-center">
            <NavigationLinks />
          </div>

          {/* Profil utilisateur - À droite (Desktop) */}
          <div className="hidden lg:flex items-center">
            <ProfileDropdown />
          </div>

          {/* Menu Mobile - À droite (Mobile uniquement) */}
          <div className="lg:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
