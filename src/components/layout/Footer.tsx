
import { Mail, Phone } from "lucide-react";
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
    <footer className="bg-slate-50 border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Colonne 1 - Présentation */}
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">AppSeniors</h2>
              <p className="text-sm text-slate-600 font-medium">Administration</p>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              Plateforme de gestion dédiée aux aidants et partenaires des seniors. 
              Simplifiez vos démarches administratives.
            </p>
          </div>

          {/* Colonne 2 - Nos services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-800">Nos services</h3>
            <ul className="space-y-3">
              {servicesLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-slate-700 hover:text-blue-600 hover:underline transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 - Liens utiles */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-800">Liens utiles</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-slate-700 hover:text-blue-600 hover:underline transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 - Nous contacter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-800">Nous contacter</h3>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-slate-500" />
                <span className="text-sm text-slate-700">contact@appseniors.fr</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-slate-500" />
                <span className="text-sm text-slate-700">+33 1 23 45 67 89</span>
              </div>
              <Link
                to="/contact"
                className="inline-block text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors mt-2"
              >
                Page de contact
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer final centré */}
      <div className="border-t border-slate-200 bg-slate-100 py-4">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-center text-sm text-slate-700">
            © 2025 AppSeniors. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
