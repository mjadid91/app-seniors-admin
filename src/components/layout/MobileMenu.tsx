
import { Menu, X } from "lucide-react";
import { NavigationLinks } from "./NavigationLinks";
import { ProfileDropdown } from "./ProfileDropdown";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  return (
    <>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-lg z-50">
          <div className="px-6 py-4">
            <NavigationLinks 
              className="flex-col space-y-2 space-x-0" 
              onItemClick={onClose}
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
