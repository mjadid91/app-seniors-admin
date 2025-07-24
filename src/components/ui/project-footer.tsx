import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ExternalLink,
  Github,
  FileText,
  Settings,
  Eye,
  Shield,
  Sparkles
} from "lucide-react";

const ProjectFooter = () => {
  return (
    <div className="mt-16 py-12 border-t border-app-border bg-app-surface/50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Informations projet */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Projet réalisé
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Statut:</span>
                <Badge className="bg-green-100 text-green-800">Livrable prêt</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Version:</span>
                <Badge variant="outline">v2.0.0</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Type:</span>
                <span className="text-sm">Interface d'administration</span>
              </div>
            </CardContent>
          </Card>

          {/* Fonctionnalités clés */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Fonctionnalités incluses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2">
                <li>✅ Gestion complète des utilisateurs</li>
                <li>✅ Système de rôles et permissions</li>
                <li>✅ Interface de modération</li>
                <li>✅ Conformité RGPD</li>
                <li>✅ Tableau de bord analytique</li>
                <li>✅ Support client intégré</li>
              </ul>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Actions disponibles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" size="sm">
                <Shield className="h-4 w-4 mr-2" />
                Tester l'interface
              </Button>
              <Button variant="outline" className="w-full" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Documentation
              </Button>
              <Button variant="outline" className="w-full" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                Démo en ligne
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Bas de page */}
        <div className="mt-12 pt-8 border-t border-app-border text-center">
          <p className="text-app-text-light">
            <strong>AppSeniors Admin</strong> - Interface d'administration moderne pour l'écosystème digital des seniors
          </p>
          <p className="text-sm text-app-text-light mt-2">
            Développé avec React, TypeScript, Tailwind CSS et Supabase
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectFooter;