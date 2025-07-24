
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", window.location.pathname);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-app-background via-app-surface to-app-background flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Illustration d'erreur 404 */}
        <div className="mb-8 relative">
          <div className="w-32 h-32 bg-gradient-to-br from-app-primary/20 to-app-accent/20 rounded-full mx-auto mb-6 flex items-center justify-center">
            <Search className="h-16 w-16 text-app-primary/40" />
          </div>
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
            <div className="text-8xl font-bold text-app-primary/20">404</div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-app-text mb-4">
            Page introuvable
          </h1>
          <p className="text-xl text-app-text-light mb-8 leading-relaxed">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
            <br />
            Vérifiez l'URL ou retournez à l'accueil.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild className="min-w-[200px]">
              <Link to="/dashboard">
                <Home className="h-4 w-4 mr-2" />
                Retour au tableau de bord
              </Link>
            </Button>
            <Button variant="outline" onClick={() => window.history.back()} className="min-w-[200px]">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Page précédente
            </Button>
          </div>
        </div>

        {/* Footer informatif */}
        <div className="mt-16 p-6 bg-app-surface/50 backdrop-blur-sm border border-app-border rounded-xl">
          <h3 className="font-semibold text-app-text mb-2">Besoin d'aide ?</h3>
          <p className="text-app-text-light text-sm">
            Si vous pensez qu'il s'agit d'une erreur, contactez l'administrateur système.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
