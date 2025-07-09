
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabaseAuth } from "../hooks/useSupabaseAuth";
import { useAuthStore } from "../stores/authStore";

const Index = () => {
  const { user, isAuthenticated, loading } = useSupabaseAuth();
  const { setUser, setAuthenticated } = useAuthStore();
  const [isInitializing, setIsInitializing] = useState(true);
  const navigate = useNavigate();

  // Synchroniser l'état d'authentification avec le store global
  useEffect(() => {
    if (!loading) {
      console.log('Index: Synchronizing auth state', { user, isAuthenticated });
      
      // Only update store if the values have actually changed
      const currentUser = useAuthStore.getState().user;
      const currentAuth = useAuthStore.getState().isAuthenticated;
      
      if (currentUser?.id !== user?.id) {
        setUser(user);
      }
      
      if (currentAuth !== isAuthenticated) {
        setAuthenticated(isAuthenticated);
      }
      
      setIsInitializing(false);
      
      // Rediriger vers dashboard si authentifié
      if (isAuthenticated && user) {
        console.log('Index: Redirecting to dashboard');
        navigate("/dashboard");
      } else {
        // Rediriger vers la page de connexion si non authentifié
        console.log('Index: Redirecting to login');
        navigate("/connexion");
      }
    }
  }, [user?.id, isAuthenticated, loading, navigate]); // Use user?.id instead of user object

  // Traite explicitement l'écran de chargement tant que l'auth n'est pas prête
  if (loading || isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Chargement de l'application...</p>
        </div>
      </div>
    );
  }

  // Cette page ne devrait jamais afficher de contenu car elle redirige toujours
  return null;
};

export default Index;
