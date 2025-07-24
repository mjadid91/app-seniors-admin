
import { Mail, Phone, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const servicesLinks = [
    { name: "Tableau de bord", href: "/dashboard" },
    { name: "Gestion des utilisateurs", href: "/users" },
    { name: "Suivi des prestations", href: "/prestations" },
    { name: "Support client", href: "/support" },
  ];

  const legalLinks = [
    { name: "Mentions légales", href: "/mentions-legales" },
    { name: "Politique de confidentialité", href: "/politique-confidentialite" },
    { name: "Conditions d'utilisation", href: "/conditions-utilisation" },
    { name: "Support technique", href: "/support" },
  ];

  return (
    <footer className="bg-gradient-subtle border-t border-elegant mt-auto relative overflow-hidden">
      {/* Fond décoratif */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-20 w-32 h-32 bg-app-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-40 h-40 bg-app-secondary rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Colonne 1 - Présentation */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-app-primary/20 to-app-secondary/20 rounded-lg flex items-center justify-center">
                  <Shield className="h-4 w-4 text-app-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-app-text">AppSeniors</h2>
                  <p className="text-xs text-app-text-light font-medium">Administration</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-app-text-light leading-relaxed">
              Plateforme de gestion dédiée aux aidants et partenaires des seniors. 
              Simplifiez vos démarches administratives.
            </p>
          </div>

          {/* Colonne 2 - Nos services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-app-text flex items-center gap-2">
              <div className="w-2 h-6 bg-gradient-to-b from-app-primary to-app-secondary rounded-full"></div>
              Nos services
            </h3>
            <ul className="space-y-3">
              {servicesLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-app-text-light hover:text-app-primary hover:translate-x-1 transition-all duration-200 flex items-center gap-2 group"
                  >
                    <div className="w-1 h-1 bg-app-text-light group-hover:bg-app-primary rounded-full transition-colors duration-200"></div>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 - Liens utiles */}
          <div className="space-y-4">
            <h3 className="font-semibold text-app-text flex items-center gap-2">
              <div className="w-2 h-6 bg-gradient-to-b from-app-primary to-app-secondary rounded-full"></div>
              Liens utiles
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-app-text-light hover:text-app-primary hover:translate-x-1 transition-all duration-200 flex items-center gap-2 group"
                  >
                    <div className="w-1 h-1 bg-app-text-light group-hover:bg-app-primary rounded-full transition-colors duration-200"></div>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 - Nous contacter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-app-text flex items-center gap-2">
              <div className="w-2 h-6 bg-gradient-to-b from-app-primary to-app-secondary rounded-full"></div>
              Nous contacter
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-app-surface/50 backdrop-blur-sm rounded-lg border-elegant hover-lift">
                <div className="w-8 h-8 bg-gradient-to-br from-app-primary/10 to-app-secondary/10 rounded-lg flex items-center justify-center">
                  <Mail className="h-4 w-4 text-app-primary" />
                </div>
                <span className="text-sm text-app-text">contact@appseniors.fr</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-app-surface/50 backdrop-blur-sm rounded-lg border-elegant hover-lift">
                <div className="w-8 h-8 bg-gradient-to-br from-app-primary/10 to-app-secondary/10 rounded-lg flex items-center justify-center">
                  <Phone className="h-4 w-4 text-app-primary" />
                </div>
                <span className="text-sm text-app-text">+33 1 23 45 67 89</span>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-sm text-app-primary hover:text-app-primary/80 transition-colors duration-200 font-medium mt-2 group"
              >
                Page de contact
                <div className="w-4 h-4 rounded-full bg-app-primary/10 flex items-center justify-center group-hover:bg-app-primary/20 transition-colors duration-200">
                  <ArrowRight className="h-2 w-2" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer final centré */}
      <div className="border-t border-elegant bg-app-surface/30 backdrop-blur-sm py-6 relative">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-center sm:text-left text-sm text-app-text-light">
              © 2025 AppSeniors. Tous droits réservés.
            </p>
            <div className="flex items-center gap-2 text-xs text-app-text-light">
              <div className="w-2 h-2 bg-app-success rounded-full animate-pulse"></div>
              <span>Version 1.0 - Système opérationnel</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
