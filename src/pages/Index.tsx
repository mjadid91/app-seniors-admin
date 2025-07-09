
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabaseAuth } from "../hooks/useSupabaseAuth";
import { useAuthStore } from "../stores/authStore";

const Index = () => {
  const { user, isAuthenticated, loading } = useSupabaseAuth();
  const { setUser, setAuthenticated } = useAuthStore();
  const [hasInitialized, setHasInitialized] = useState(false);
  const navigate = useNavigate();

  // Synchroniser l'état d'authentification avec le store global une seule fois
  useEffect(() => {
    if (!loading && !hasInitialized) {
      console.log('Index: Synchronizing auth state', { user, isAuthenticated });
      setUser(user);
      setAuthenticated(isAuthenticated);
      setHasInitialized(true);
    }
  }, [loading, hasInitialized]); // Retirer setUser et setAuthenticated des dépendances

  // Gérer la redirection une fois que l'initialisation est terminée
  useEffect(() => {
    if (hasInitialized) {
      if (isAuthenticated && user) {
        console.log('Index: Redirecting to dashboard');
        navigate("/dashboard");
      } else {
        console.log('Index: Redirecting to login');
        navigate("/connexion");
      }
    }
  }, [hasInitialized, isAuthenticated, user, navigate]);

  // Afficher l'écran de chargement
  if (loading || !hasInitialized) {
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
