import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  TrendingUp,
  Users,
  FileText,
  Shield,
  Heart,
  Sparkles
} from "lucide-react";

const DemoDataInfo = () => {
  const [showDetails, setShowDetails] = useState(false);

  const demoFeatures = [
    {
      category: "Gestion des utilisateurs",
      description: "Comptes de démonstration avec différents rôles et profils complets",
      status: "active",
      count: "50+ utilisateurs de test"
    },
    {
      category: "Données financières",
      description: "Transactions, commissions et statistiques de revenus simulées",
      status: "active", 
      count: "200+ transactions"
    },
    {
      category: "Support client",
      description: "Tickets de support avec différents statuts et priorités",
      status: "active",
      count: "30+ tickets"
    },
    {
      category: "Documents RGPD",
      description: "Exemples de consentements et demandes de suppression",
      status: "active",
      count: "15+ documents"
    },
    {
      category: "Prestations",
      description: "Services et activités avec historique et évaluations",
      status: "active",
      count: "80+ prestations"
    }
  ];

  return (
    <div className="space-y-6">
      <Alert className="border-blue-200 bg-blue-50">
        <Sparkles className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Mode démonstration :</strong> Cette plateforme contient des données de test pour présenter 
          toutes les fonctionnalités. Les informations affichées ne sont pas réelles et servent uniquement 
          à des fins de démonstration.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Données de démonstration incluses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {demoFeatures.map((feature, index) => (
              <div key={index} className="p-4 border rounded-lg bg-gray-50">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{feature.category}</h4>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-600">Actif</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{feature.description}</p>
                <span className="text-xs text-blue-600 font-medium">{feature.count}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-800 mb-1">Note importante</h4>
                <p className="text-sm text-yellow-700">
                  Pour une utilisation en production, remplacez ces données de test par de vraies données 
                  utilisateur et configurez les paramètres de sécurité selon vos besoins spécifiques.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DemoDataInfo;