
import { Building, Shield, Globe, FileText, Mail, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const MentionsLegales = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto py-12 px-6 sm:px-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">Mentions légales</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Informations légales et responsabilités liées à l'utilisation de la plateforme AppSeniors Admin
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto py-12 px-6 sm:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 space-y-8">
          
          {/* Section 1 - Éditeur */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Building className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-slate-800">Éditeur du site</h2>
            </div>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>
                <strong>Raison sociale :</strong> AppSeniors SAS
              </p>
              <p>
                <strong>Forme juridique :</strong> Société par Actions Simplifiée
              </p>
              <p>
                <strong>Capital social :</strong> 10 000 euros
              </p>
              <p>
                <strong>Siège social :</strong> 123 Avenue de la République, 75011 Paris, France
              </p>
              <p>
                <strong>RCS :</strong> Paris B 123 456 789
              </p>
              <p>
                <strong>SIRET :</strong> 123 456 789 00012
              </p>
              <p>
                <strong>TVA intracommunautaire :</strong> FR12 123456789
              </p>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Section 2 - Directeur de publication */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-slate-800">Directeur de la publication</h2>
            </div>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>
                Le directeur de la publication est le représentant légal de la société AppSeniors SAS.
              </p>
              <p>
                <strong>Responsable éditorial :</strong> [Nom du représentant légal]
              </p>
              <p>
                <strong>Contact :</strong> direction@appseniors.fr
              </p>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Section 3 - Hébergement */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-slate-800">Hébergement</h2>
            </div>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>
                Le site AppSeniors Admin est hébergé par :
              </p>
              <div className="bg-slate-50 p-4 rounded-lg">
                <p><strong>Hébergeur :</strong> OVH SAS</p>
                <p><strong>Adresse :</strong> 2 rue Kellermann, 59100 Roubaix, France</p>
                <p><strong>Téléphone :</strong> 09 72 10 10 07</p>
                <p><strong>Site web :</strong> <a href="https://www.ovh.com" className="text-blue-600 hover:underline">www.ovh.com</a></p>
              </div>
              <p>
                L'hébergement est conforme aux normes européennes de protection des données (RGPD).
              </p>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Section 4 - Propriété intellectuelle */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-slate-800">Propriété intellectuelle</h2>
            </div>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>
                L'ensemble des contenus présents sur le site AppSeniors Admin (textes, images, logos, graphismes, vidéos, sons, etc.) sont protégés par le droit d'auteur et appartiennent à AppSeniors SAS ou à ses partenaires.
              </p>
              <p>
                Toute reproduction, distribution, modification, adaptation, retransmission ou publication, même partielle, de ces différents éléments est strictement interdite sans l'accord exprès par écrit d'AppSeniors SAS.
              </p>
              <p>
                Le nom "AppSeniors" et le logo sont des marques déposées d'AppSeniors SAS.
              </p>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Section 5 - Responsabilité */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-800">Responsabilité</h2>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>
                AppSeniors SAS met tout en œuvre pour assurer la continuité et la sécurité de ses services, mais ne peut garantir l'absence totale d'interruptions ou d'erreurs.
              </p>
              <p>
                L'utilisateur reconnaît utiliser le site AppSeniors Admin à ses propres risques et sous sa responsabilité exclusive.
              </p>
              <p>
                AppSeniors SAS ne saurait être tenue responsable des dommages directs ou indirects qui pourraient résulter de l'utilisation du site.
              </p>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Section 6 - Contact */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-800">Nous contacter</h2>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>
                Pour toute question concernant ces mentions légales, vous pouvez nous contacter :
              </p>
              <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-blue-600" />
                  <span><strong>Email :</strong> contact@appseniors.fr</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-blue-600" />
                  <span><strong>Téléphone :</strong> +33 1 23 45 67 89</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              Dernière mise à jour : 15 juillet 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentionsLegales;
