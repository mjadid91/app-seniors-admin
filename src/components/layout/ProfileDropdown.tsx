
import { useState } from "react";
import { Settings, LogOut, ChevronDown } from "lucide-react";
import { useAuthStore } from "../../stores/authStore";
import { useSupabaseAuth } from "../../hooks/useSupabaseAuth";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const ProfileDropdown = () => {
  const { user, logout } = useAuthStore();
  const { signOut } = useSupabaseAuth();
  const navigate = useNavigate();

  const handleSettings = () => {
    navigate("/settings");
  };

  const handleLogout = async () => {
    try {
      console.log('ProfileDropdown: Starting logout process...');
      
      await signOut();
      console.log('ProfileDropdown: Supabase logout completed');
      
      logout();
      console.log('ProfileDropdown: Local store cleared');
      
      navigate("/connexion", { replace: true });
      console.log('ProfileDropdown: Redirected to login page');
      
    } catch (error) {
      console.error('ProfileDropdown: Logout error:', error);
      logout();
      navigate("/connexion", { replace: true });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary text-primary-foreground font-medium text-xs">
            {user?.prenom?.[0]}{user?.nom?.[0]}
          </AvatarFallback>
        </Avatar>
        <div className="text-left">
          <p className="font-medium text-gray-900 text-sm">
            {user?.prenom} {user?.nom}
          </p>
          <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
        </div>
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-56 bg-white border shadow-lg">
        <DropdownMenuItem onClick={handleSettings} className="cursor-pointer">
          <Settings className="h-4 w-4 mr-2" />
          Paramètres
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50">
          <LogOut className="h-4 w-4 mr-2" />
          Se déconnecter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
