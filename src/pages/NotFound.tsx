
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Shield, ArrowLeft, LayoutDashboard, HelpCircle } from "lucide-react";
import Footer from "../components/layout/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-app-background via-app-surface to-app-background">
      <div className="flex-grow flex items-center justify-center relative overflow-hidden">
        {/* Fond décoratif */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-app-primary rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-32 right-20 w-40 h-40 bg-app-secondary rounded-full blur-3xl animate-pulse delay-300"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-app-primary rounded-full blur-2xl animate-pulse delay-700"></div>
        </div>
        
        <div className="max-w-2xl mx-auto px-6 lg:px-8 py-8 relative z-10">
          <div className="text-center space-y-8 animate-fade-in">
            {/* Illustration 404 */}
            <div className="relative">
              <div className="text-9xl md:text-[12rem] font-bold text-app-primary/20 select-none">
                404
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-gradient-to-br from-app-primary to-app-secondary rounded-2xl flex items-center justify-center shadow-elegant-xl">
                  <Shield className="h-12 w-12 text-white" />
                </div>
              </div>
            </div>
            
            {/* Texte principal */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-app-text">
                Page introuvable
              </h1>
              <p className="text-lg text-app-text-light leading-relaxed max-w-md mx-auto">
                La page que vous recherchez n'existe pas ou a été déplacée.
              </p>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <a 
                href="/" 
                className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-app-primary to-app-secondary text-white rounded-lg font-medium hover:shadow-elegant-lg hover:-translate-y-1 transition-all duration-200 group"
              >
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
                Retour à l'accueil
              </a>
              <a 
                href="/dashboard" 
                className="inline-flex items-center gap-3 px-6 py-3 bg-app-surface border-elegant text-app-text rounded-lg font-medium hover:bg-app-primary/5 hover:border-app-primary/20 hover:shadow-elegant-md transition-all duration-200 group"
              >
                <LayoutDashboard className="h-5 w-5" />
                Tableau de bord
              </a>
            </div>
            
            {/* Message d'aide */}
            <div className="mt-12 p-6 bg-app-surface/50 backdrop-blur-sm border-elegant rounded-xl max-w-md mx-auto">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-app-info/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <HelpCircle className="h-4 w-4 text-app-info" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-app-text mb-1">Besoin d'aide ?</h3>
                  <p className="text-sm text-app-text-light">
                    Si vous pensez qu'il s'agit d'une erreur, contactez notre support technique.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
