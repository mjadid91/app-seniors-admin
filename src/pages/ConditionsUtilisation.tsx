
import { FileText, Users, Shield, AlertTriangle, Scale, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Footer from "../components/layout/Footer";

const ConditionsUtilisation = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <div className="flex-grow">
        {/* Header Section */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto py-12 px-6 sm:px-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-4">Conditions d'utilisation</h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Conditions générales d'utilisation de la plateforme AppSeniors Admin
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-6xl mx-auto py-12 px-6 sm:px-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 space-y-8">
            
            {/* Introduction */}
            <div className="space-y-4">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <p className="text-gray-700 leading-relaxed">
                  Les présentes conditions générales d'utilisation (CGU) régissent l'utilisation de la plateforme <strong>AppSeniors Admin</strong>. En accédant et en utilisant notre service, vous acceptez d'être lié par ces conditions.
                </p>
              </div>
            </div>

            {/* Section 1 - Objet */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-slate-800">Objet du service</h2>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  AppSeniors Admin est une plateforme de gestion administrative dédiée aux professionnels intervenant auprès des seniors. Le service comprend :
                </p>
                <div className="grid gap-4">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-slate-800 mb-2">Gestion des utilisateurs</h3>
                    <p>Administration des comptes seniors, aidants et partenaires</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-slate-800 mb-2">Suivi des prestations</h3>
                    <p>Gestion et supervision des services proposés aux seniors</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-slate-800 mb-2">Outils administratifs</h3>
                    <p>Tableaux de bord, rapports, gestion documentaire et support</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-8" />

            {/* Section 2 - Accès au service */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-slate-800">Accès au service</h2>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  L'accès à la plateforme AppSeniors Admin est strictement réservé aux professionnels autorisés :
                </p>
                <ul className="list-disc ml-6 space-y-2">
                  <li><strong>Administrateurs :</strong> personnel d'AppSeniors habilité</li>
                  <li><strong>Partenaires agréés :</strong> organismes conventionnés avec AppSeniors</li>
                  <li><strong>Professionnels certifiés :</strong> aidants et prestataires de services validés</li>
                </ul>
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                  <p className="text-amber-800">
                    <strong>Vérification d'identité :</strong> Tout accès est soumis à une vérification préalable d'identité et de qualification professionnelle.
                  </p>
                </div>
                <p>
                  Les identifiants de connexion sont personnels et confidentiels. L'utilisateur est responsable de leur sécurité et de leur utilisation.
                </p>
              </div>
            </div>

            <Separator className="my-8" />

            {/* Section 3 - Obligations de l'utilisateur */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-slate-800">Obligations de l'utilisateur</h2>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  L'utilisateur s'engage à :
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <Scale className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-900">Respect de la législation</h4>
                      <p className="text-sm text-green-800">Utiliser la plateforme dans le respect des lois en vigueur et des règles de déontologie professionnelle</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-900">Confidentialité</h4>
                      <p className="text-sm text-green-800">Protéger les données personnelles des seniors et respecter le secret professionnel</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <Users className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-900">Usage approprié</h4>
                      <p className="text-sm text-green-800">Utiliser les fonctionnalités uniquement dans le cadre professionnel prévu</p>
                    </div>
                  </div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-900 mb-2">Usages interdits</h4>
                  <ul className="text-sm text-red-800 space-y-1">
                    <li>• Utilisation à des fins personnelles ou commerciales non autorisées</li>
                    <li>• Partage non autorisé des données ou des accès</li>
                    <li>• Tentative d'accès à des données non autorisées</li>
                    <li>• Utilisation malveillante ou frauduleuse</li>
                  </ul>
                </div>
              </div>
            </div>

            <Separator className="my-8" />

            {/* Section 4 - Responsabilité */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-slate-800">Responsabilité</h2>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <div className="grid gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-900 mb-2">Engagement d'AppSeniors</h3>
                    <p className="text-blue-800">
                      AppSeniors met tout en œuvre pour assurer la continuité, la sécurité et la qualité de ses services. Nous nous engageons à maintenir un niveau de service optimal et à protéger vos données.
                    </p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <h3 className="font-semibold text-amber-900 mb-2">Limites de responsabilité</h3>
                    <p className="text-amber-800">
                      AppSeniors ne peut garantir l'absence totale d'interruptions, d'erreurs ou de dysfonctionnements. Nous ne saurions être tenus responsables des dommages résultant d'une utilisation inappropriée de la plateforme.
                    </p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-slate-800 mb-2">Responsabilité de l'utilisateur</h3>
                    <p className="text-slate-700">
                      L'utilisateur demeure responsable de l'utilisation qu'il fait de la plateforme et des conséquences de ses actions. Il s'engage à utiliser le service de manière conforme à sa finalité.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-8" />

            {/* Section 5 - Modification des conditions */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-800">Modification des conditions</h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>
                  AppSeniors se réserve le droit de modifier les présentes conditions d'utilisation à tout moment. Les utilisateurs seront informés des modifications importantes par :
                </p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Notification par email à l'adresse enregistrée</li>
                  <li>Affichage d'un message lors de la prochaine connexion</li>
                  <li>Publication sur la page dédiée de la plateforme</li>
                </ul>
                <p>
                  L'utilisation continue du service après modification vaut acceptation des nouvelles conditions.
                </p>
              </div>
            </div>

            <Separator className="my-8" />

            {/* Section 6 - Contact */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-slate-800">Contact</h2>
              </div>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>
                  Pour toute question concernant ces conditions d'utilisation ou l'utilisation de la plateforme :
                </p>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p><strong>Support technique :</strong> support@appseniors.fr</p>
                  <p><strong>Questions juridiques :</strong> legal@appseniors.fr</p>
                  <p><strong>Téléphone :</strong> +33 1 23 45 67 89</p>
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
      <Footer />
    </div>
  );
};

export default ConditionsUtilisation;
