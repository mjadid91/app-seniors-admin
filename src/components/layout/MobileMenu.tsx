
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { NavigationLinks } from "./NavigationLinks";
import { ProfileDropdown } from "./ProfileDropdown";
import { useIsMobile } from "../../hooks/use-mobile";

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Fermer le menu lors du redimensionnement vers desktop
  useEffect(() => {
    if (!isMobile && isOpen) {
      closeMenu();
    }
  }, [isMobile, isOpen]);

  // Bloquer le scroll du body quand le menu est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={toggleMenu}
        className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
        aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Menu mobile */}
      <div className={`
        fixed top-14 sm:top-16 right-0 h-full w-80 max-w-full bg-white shadow-xl z-50 lg:hidden
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex flex-col h-full overflow-y-auto">
          <div className="p-6 border-b border-slate-200">
            <ProfileDropdown />
          </div>
          
          <div className="flex-1 p-6">
            <NavigationLinks 
              className="flex-col space-y-4 space-x-0" 
              onItemClick={closeMenu}
            />
          </div>
        </div>
      </div>
    </>
  );
};
