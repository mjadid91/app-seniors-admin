
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Index = () => {
  const { isAuthenticated, isLoading, isInitialized } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Attendre que l'authentification soit initialisée
    if (!isInitialized || isLoading) {
      console.log('Index: Waiting for auth initialization...');
      return;
    }

    console.log('Index: Auth state:', { isAuthenticated, isLoading, isInitialized });

    // Navigation basée sur l'état d'authentification
    if (isAuthenticated) {
      console.log('Index: User authenticated, redirecting to dashboard');
      navigate("/dashboard", { replace: true });
    } else {
      console.log('Index: User not authenticated, redirecting to login');
      navigate("/connexion", { replace: true });
    }
  }, [isAuthenticated, isInitialized, isLoading, navigate]);

  // Afficher le loading pendant l'initialisation
  if (!isInitialized || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">
            Initialisation de l'application...
          </p>
        </div>
      </div>
    );
  }

  // Cette partie ne devrait jamais être atteinte grâce à useEffect
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-slate-600">Redirection en cours...</p>
      </div>
    </div>
  );
};

export default Index;
