
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useSupabaseAuth } from "../../hooks/useSupabaseAuth";

const SharedLayout = () => {
  const { loading, isInitialized, isAuthenticated } = useSupabaseAuth();

  console.log('SharedLayout: Current state:', { loading, isInitialized, isAuthenticated });

  // Afficher le chargement global si l'auth n'est pas prête
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Initialisation de l'interface...</p>
        </div>
      </div>
    );
  }

  // Si encore en chargement après initialisation
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Chargement des données utilisateur...</p>
        </div>
      </div>
    );
  }

  // Si pas authentifié à ce stade, ne pas afficher le layout
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Redirection vers la page de connexion...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default SharedLayout;
