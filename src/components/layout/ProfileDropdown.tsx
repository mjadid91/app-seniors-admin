
import { Settings, LogOut, ChevronDown } from "lucide-react";
import { useAuthStore } from "../../stores/authStore";
import { useSupabaseAuth } from "../../hooks/useSupabaseAuth";
import { useUserProfile } from "../../hooks/useUserProfile";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  const { profile } = useUserProfile();
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

  // Utiliser les données du profil si disponibles, sinon utiliser les données du user
  const displayName = `${profile?.prenom || user?.prenom || ''} ${profile?.nom || user?.nom || ''}`.trim();
  const profilePhoto = profile?.photo || user?.photo;
  const initials = `${(profile?.prenom || user?.prenom)?.[0] || ''}${(profile?.nom || user?.nom)?.[0] || ''}`;

  console.log('ProfileDropdown: Profile data:', {
    profilePhoto,
    userPhoto: user?.photo,
    profileFromHook: profile?.photo,
    initials,
    displayName
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20">
        <Avatar className="h-8 w-8">
          <AvatarImage src={profilePhoto || undefined} alt="Photo de profil" />
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-medium text-xs">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start">
          <span className="font-medium text-gray-900 text-sm">
            {displayName}
          </span>
          <span className="text-xs text-gray-500 capitalize">{user?.role}</span>
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
