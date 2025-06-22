
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
      setUser(user);
      setAuthenticated(isAuthenticated);
      setIsInitializing(false);
      
      // Rediriger vers dashboard si authentifié
      if (isAuthenticated && user) {
        navigate("/dashboard");
      } else {
        // Rediriger vers la page de connexion si non authentifié
        navigate("/connexion");
      }
    }
  }, [user, isAuthenticated, loading, setUser, setAuthenticated, navigate]);

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
