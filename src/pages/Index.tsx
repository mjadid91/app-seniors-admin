import { useState, useEffect } from "react";
import LoginPage from "../components/auth/LoginPage";
import DashboardLayout from "../components/layout/DashboardLayout";
import { useSupabaseAuth } from "../hooks/useSupabaseAuth";
import { useAuthStore } from "../stores/authStore";

const Index = () => {
  const { user, isAuthenticated, loading } = useSupabaseAuth();
  const { setUser, setAuthenticated } = useAuthStore();
  const [isInitializing, setIsInitializing] = useState(true);

  // Synchroniser l'état d'authentification avec le store global
  useEffect(() => {
    if (!loading) {
      setUser(user);
      setAuthenticated(isAuthenticated);
      setIsInitializing(false);
    }
  }, [user, isAuthenticated, loading, setUser, setAuthenticated]);

  // Traite explicitement l'écran de chargement tant que l'auth n’est pas prête
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

  // Si non authentifié : affiche login
  if (!isAuthenticated || !user) {
    return <LoginPage />;
  }

  // Si authentifié
  return <DashboardLayout />;
};

export default Index;
