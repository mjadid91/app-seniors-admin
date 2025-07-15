
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useSupabaseAuth } from "../../hooks/useSupabaseAuth";

const SharedLayout = () => {
  const { loading, isInitialized, isAuthenticated } = useSupabaseAuth();

  console.log('SharedLayout: Current state:', { loading, isInitialized, isAuthenticated });

  // Afficher le chargement global si l'auth n'est pas prête
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Initialisation de l'interface...</p>
        </div>
      </div>
    );
  }

  // Si encore en chargement après initialisation
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Chargement des données utilisateur...</p>
        </div>
      </div>
    );
  }

  // Si pas authentifié à ce stade, ne pas afficher le layout
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Redirection vers la page de connexion...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default SharedLayout;
