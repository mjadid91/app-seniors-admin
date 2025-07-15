
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { AppLogo } from "./AppLogo";
import { FooterContactForm } from "./FooterContactForm";

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
    <footer className="bg-slate-50 border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Bloc logo et description */}
          <div className="space-y-4">
            <AppLogo />
            <p className="text-slate-600 text-sm leading-relaxed">
              AppSeniors Admin — Plateforme de gestion dédiée aux aidants et partenaires des seniors.
            </p>
          </div>

          {/* Bloc liens légaux */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-800">Liens utiles</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-600 hover:text-slate-800 hover:underline text-sm transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Bloc réseaux sociaux */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-800">Suivez-nous</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-slate-800 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            <div className="space-y-2 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>contact@appseniors.fr</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Paris, France</span>
              </div>
            </div>
          </div>

          {/* Bloc formulaire de contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-800">Nous contacter</h3>
            <FooterContactForm />
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-center text-sm text-slate-600">
            © 2025 AppSeniors. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
