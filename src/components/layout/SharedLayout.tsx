
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useSupabaseAuth } from "../../hooks/useSupabaseAuth";

const SharedLayout = () => {
  const { loading, isInitialized, isAuthenticated } = useSupabaseAuth();

  console.log('SharedLayout: Current state:', { loading, isInitialized, isAuthenticated });

  // Afficher le chargement global si l'auth n'est pas prête
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-app-background to-app-primary/5">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-app-primary/20 border-t-app-primary mx-auto"></div>
          <div className="space-y-2">
            <div className="h-2 w-48 bg-app-primary/10 rounded-full animate-pulse mx-auto"></div>
            <p className="text-app-text-light text-sm">Initialisation de l'interface...</p>
          </div>
        </div>
      </div>
    );
  }

  // Si encore en chargement après initialisation
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-app-background to-app-primary/5">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-app-primary/20 border-t-app-primary mx-auto"></div>
          <div className="space-y-2">
            <div className="h-2 w-56 bg-app-primary/10 rounded-full animate-pulse mx-auto"></div>
            <p className="text-app-text-light text-sm">Chargement des données utilisateur...</p>
          </div>
        </div>
      </div>
    );
  }

  // Si pas authentifié à ce stade, ne pas afficher le layout
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-app-background to-app-primary/5">
        <div className="text-center space-y-4">
          <div className="animate-pulse-subtle rounded-full h-12 w-12 bg-app-primary/20 mx-auto"></div>
          <div className="space-y-2">
            <div className="h-2 w-64 bg-app-primary/10 rounded-full animate-pulse mx-auto"></div>
            <p className="text-app-text-light text-sm">Redirection vers la page de connexion...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-app-background flex flex-col">
      <Navbar />
      <main className="pt-16 flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default SharedLayout;
