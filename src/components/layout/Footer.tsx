
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { AppLogo } from "./AppLogo";

const Footer = () => {
  const legalLinks = [
    { name: "Mentions légales", href: "/mentions-legales" },
    { name: "Politique de confidentialité", href: "/politique-confidentialite" },
    { name: "Conditions d'utilisation", href: "/conditions-utilisation" },
    { name: "Support technique", href: "/support" },
  ];

  const socialLinks = [
    { name: "Facebook", href: "https://facebook.com/appseniors", icon: Facebook },
    { name: "Twitter", href: "https://twitter.com/appseniors", icon: Twitter },
    { name: "LinkedIn", href: "https://linkedin.com/company/appseniors", icon: Linkedin },
  ];

  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-8">
          {/* Logo et description */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <AppLogo />
              <span className="text-xl font-semibold text-slate-800">AppSeniors Admin</span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
              Plateforme de gestion dédiée aux aidants et partenaires des seniors. 
              Simplifiez vos démarches administratives.
            </p>
          </div>

          {/* Liens utiles */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800">Liens utiles</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-slate-600 hover:text-blue-600 hover:underline transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Réseaux sociaux et contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800">Restez connecté</h3>
            
            {/* Réseaux sociaux */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            {/* Informations de contact */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-slate-500" />
                <span className="text-sm text-slate-600">contact@appseniors.fr</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-slate-500" />
                <span className="text-sm text-slate-600">+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-slate-500" />
                <span className="text-sm text-slate-600">Paris, France</span>
              </div>
            </div>

            {/* Lien vers la page de contact */}
            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors"
              >
                <Mail className="h-4 w-4" />
                Contactez-nous
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-slate-200 bg-slate-50 py-6">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-center text-sm text-slate-500">
            © 2025 AppSeniors. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
