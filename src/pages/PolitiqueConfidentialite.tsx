
import { Shield, Eye, Lock, Users, FileText, Settings } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Footer from "../components/layout/Footer";

const PolitiqueConfidentialite = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <div className="flex-grow">
        {/* Header Section */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto py-12 px-6 sm:px-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-4">Politique de confidentialité</h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Protection et traitement de vos données personnelles sur la plateforme AppSeniors Admin
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
                  <strong>AppSeniors</strong> s'engage à protéger la confidentialité et la sécurité de vos données personnelles. Cette politique explique comment nous collectons, utilisons et protégeons vos informations dans le cadre de l'utilisation de notre plateforme administrative.
                </p>
              </div>
            </div>

            {/* Section 1 - Collecte des données */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Eye className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-slate-800">Collecte des données</h2>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Nous collectons uniquement les données nécessaires au fonctionnement de notre plateforme et à l'amélioration de nos services :
                </p>
                <ul className="list-disc ml-6 space-y-2">
                  <li><strong>Données d'identification :</strong> nom, prénom, adresse email, téléphone</li>
                  <li><strong>Données de connexion :</strong> adresse IP, dates et heures de connexion, navigateur utilisé</li>
                  <li><strong>Données d'utilisation :</strong> pages visitées, actions effectuées, préférences utilisateur</li>
                  <li><strong>Données professionnelles :</strong> fonction, organisation, domaine d'activité</li>
                </ul>
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                  <p className="text-amber-800">
                    <strong>Principe de minimisation :</strong> Nous ne collectons que les données strictement nécessaires à nos services.
                  </p>
                </div>
              </div>
            </div>

            <Separator className="my-8" />

            {/* Section 2 - Utilisation des données */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Settings className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-slate-800">Utilisation des données</h2>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Vos données sont utilisées exclusivement pour :
                </p>
                <div className="grid gap-4">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-slate-800 mb-2">Fonctionnement du service</h3>
                    <p>Authentification, gestion des comptes, personnalisation de l'interface</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-slate-800 mb-2">Amélioration continue</h3>
                    <p>Analyse des usages, optimisation des performances, développement de nouvelles fonctionnalités</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-slate-800 mb-2">Communication</h3>
                    <p>Notifications importantes, support technique, informations sur les évolutions</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-8" />

            {/* Section 3 - Protection des données */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-slate-800">Protection des données</h2>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Nous mettons en place toutes les mesures techniques et organisationnelles nécessaires pour protéger vos données personnelles :
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h3 className="font-semibold text-green-800 mb-2">Sécurité technique</h3>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Chiffrement SSL/TLS</li>
                      <li>• Authentification renforcée</li>
                      <li>• Sauvegardes régulières</li>
                      <li>• Surveillance continue</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h3 className="font-semibold text-green-800 mb-2">Sécurité organisationnelle</h3>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Accès restreint aux données</li>
                      <li>• Formation du personnel</li>
                      <li>• Politique de confidentialité</li>
                      <li>• Audit régulier</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-8" />

            {/* Section 4 - Vos droits */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-slate-800">Vos droits</h2>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900">Droit d'accès</h4>
                      <p className="text-sm text-blue-800">Obtenir une copie de vos données personnelles</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <Settings className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900">Droit de rectification</h4>
                      <p className="text-sm text-blue-800">Corriger ou mettre à jour vos données</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900">Droit à l'effacement</h4>
                      <p className="text-sm text-blue-800">Demander la suppression de vos données</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <Eye className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900">Droit à la portabilité</h4>
                      <p className="text-sm text-blue-800">Récupérer vos données dans un format structuré</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-8" />

            {/* Section 5 - Conservation des données */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-800">Conservation des données</h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>
                  Vos données sont conservées pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées :
                </p>
                <ul className="list-disc ml-6 space-y-2">
                  <li><strong>Données de compte :</strong> pendant toute la durée d'utilisation du service</li>
                  <li><strong>Données de connexion :</strong> 12 mois maximum</li>
                  <li><strong>Données de support :</strong> 3 ans après la résolution du problème</li>
                  <li><strong>Données légales :</strong> selon les obligations légales en vigueur</li>
                </ul>
              </div>
            </div>

            <Separator className="my-8" />

            {/* Section 6 - Contact */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-800">Exercer vos droits</h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>
                  Pour exercer vos droits ou pour toute question concernant cette politique de confidentialité :
                </p>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p><strong>Email :</strong> dpo@appseniors.fr</p>
                  <p><strong>Courrier :</strong> DPO AppSeniors, 123 Avenue de la République, 75011 Paris</p>
                </div>
                <p className="text-sm">
                  Vous pouvez également contacter la Commission Nationale de l'Informatique et des Libertés (CNIL) si vous estimez que vos droits ne sont pas respectés.
                </p>
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

export default PolitiqueConfidentialite;
