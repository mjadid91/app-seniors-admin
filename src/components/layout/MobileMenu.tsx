
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavigationLinks } from "./NavigationLinks";
import { ProfileDropdown } from "./ProfileDropdown";

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={toggleMenu}
        className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-lg z-50">
          <div className="px-6 py-4">
            <NavigationLinks 
              className="flex-col space-y-2 space-x-0" 
              onItemClick={closeMenu}
            />
            <div className="border-t border-slate-200 pt-4 mt-4">
              <ProfileDropdown />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
