
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabaseAuth } from "../hooks/useSupabaseAuth";
import { useAuthStore } from "../stores/authStore";

const Index = () => {
  const { user, isAuthenticated, loading } = useSupabaseAuth();
  const { setUser, setAuthenticated } = useAuthStore();
  const [hasRedirected, setHasRedirected] = useState(false);
  const redirectedRef = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Éviter les redirections multiples
    if (loading || hasRedirected || redirectedRef.current) {
      return;
    }

    console.log('Index: Auth state ready, syncing with store', { 
      user: user ? `${user.prenom} ${user.nom} (${user.role})` : null, 
      isAuthenticated 
    });
    
    // Synchroniser avec le store
    setUser(user);
    setAuthenticated(isAuthenticated);
    
    // Marquer comme redirigé
    redirectedRef.current = true;
    setHasRedirected(true);
    
    // Rediriger selon l'état d'authentification
    if (isAuthenticated && user) {
      console.log('Index: User authenticated, redirecting to dashboard');
      navigate("/dashboard", { replace: true });
    } else {
      console.log('Index: User not authenticated, redirecting to login');
      navigate("/connexion", { replace: true });
    }
  }, [user, isAuthenticated, loading, hasRedirected, navigate, setUser, setAuthenticated]);

  // Afficher l'écran de chargement
  if (loading || !hasRedirected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Chargement de l'application...</p>
          <p className="text-slate-500 text-sm mt-2">Vérification de l'authentification...</p>
        </div>
      </div>
    );
  }

  return null;
};

export default Index;
