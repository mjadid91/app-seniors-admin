
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabaseAuth } from "../hooks/useSupabaseAuth";
import { useAuthStore } from "../stores/authStore";

const Index = () => {
  const { user, isAuthenticated, loading, isInitialized } = useSupabaseAuth();
  const { setUser, setAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  // Synchroniser l'état d'authentification avec le store global
  useEffect(() => {
    // Attendre que l'authentification soit initialisée
    if (!isInitialized) {
      console.log('Index: Auth not initialized yet, waiting...');
      return;
    }

    console.log('Index: Synchronizing auth state', { 
      user: user ? { id: user.id, role: user.role } : null, 
      isAuthenticated, 
      loading 
    });
    
    // Synchroniser avec le store
    const currentUser = useAuthStore.getState().user;
    const currentAuth = useAuthStore.getState().isAuthenticated;
    
    if (currentUser?.id !== user?.id) {
      console.log('Index: Updating user in store');
      setUser(user);
    }
    
    if (currentAuth !== isAuthenticated) {
      console.log('Index: Updating auth status in store');
      setAuthenticated(isAuthenticated);
    }
    
    // Redirection après synchronisation
    if (!loading) {
      if (isAuthenticated && user) {
        console.log('Index: User authenticated, redirecting to dashboard');
        navigate("/dashboard", { replace: true });
      } else {
        console.log('Index: User not authenticated, redirecting to login');
        navigate("/connexion", { replace: true });
      }
    }
  }, [user?.id, isAuthenticated, loading, isInitialized, navigate, setUser, setAuthenticated]);

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

  // Cette page ne devrait jamais afficher de contenu car elle redirige toujours
  return null;
};

export default Index;
