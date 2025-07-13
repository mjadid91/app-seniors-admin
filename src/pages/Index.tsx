
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabaseAuth } from "../hooks/useSupabaseAuth";
import { useAuthStore } from "../stores/authStore";

const Index = () => {
  const { user, isAuthenticated, loading, isInitialized } = useSupabaseAuth();
  const { setUser, setAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const [hasNavigated, setHasNavigated] = useState(false);

  // Synchroniser l'état d'authentification avec le store global
  useEffect(() => {
    if (!isInitialized) {
      console.log('Index: Auth not initialized yet, waiting...');
      return;
    }

    console.log('Index: Synchronizing auth state', { 
      user: user ? { id: user.id, role: user.role } : null, 
      isAuthenticated, 
      loading,
      hasNavigated
    });
    
    // Synchroniser avec le store
    const currentUser = useAuthStore.getState().user;
    const currentAuth = useAuthStore.getState().isAuthenticated;
    
    if (isAuthenticated && user) {
      if (currentUser?.id !== user.id) {
        console.log('Index: Updating user in store');
        setUser(user);
      }
      
      if (!currentAuth) {
        console.log('Index: Updating auth status to true in store');
        setAuthenticated(true);
      }
    } else {
      // Si pas authentifié, nettoyer le store
      if (currentAuth || currentUser) {
        console.log('Index: Clearing auth state in store');
        logout();
      }
    }
  }, [user?.id, isAuthenticated, isInitialized, setUser, setAuthenticated, logout]);

  // Gérer la navigation une seule fois
  useEffect(() => {
    if (!isInitialized || loading || hasNavigated) {
      return;
    }

    console.log('Index: Checking navigation', { isAuthenticated, user: !!user });

    if (isAuthenticated && user) {
      console.log('Index: User authenticated, redirecting to dashboard');
      setHasNavigated(true);
      navigate("/dashboard", { replace: true });
    } else {
      console.log('Index: User not authenticated, redirecting to login');
      setHasNavigated(true);
      navigate("/connexion", { replace: true });
    }
  }, [user, isAuthenticated, loading, isInitialized, navigate, hasNavigated]);

  // Afficher le loading tant que l'auth n'est pas initialisée ou en cours de chargement
  if (!isInitialized || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">
            {!isInitialized ? 'Initialisation de l\'application...' : 'Chargement...'}
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export default Index;
