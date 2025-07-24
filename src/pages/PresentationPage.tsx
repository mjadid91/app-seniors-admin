import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Download, 
  Calendar, 
  Users, 
  Settings,
  Shield,
  Heart,
  BarChart3,
  RefreshCw
} from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
// import ProjectFooter from "@/components/ui/project-footer";

const PresentationPage = () => {
  const [currentDate] = useState(new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }));

  const features = [
    {
      icon: Users,
      title: "Gestion des utilisateurs",
      description: "Interface complète pour gérer seniors, aidants et partenaires",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Shield,
      title: "Sécurité RGPD",
      description: "Conformité RGPD avec gestion des consentements et données",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: BarChart3,
      title: "Analyses et statistiques",
      description: "Tableaux de bord détaillés avec métriques en temps réel",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Heart,
      title: "Support intégré",
      description: "Système de tickets et assistance dédiée",
      color: "bg-pink-100 text-pink-600"
    },
    {
      icon: FileText,
      title: "Gestion documentaire",
      description: "Stockage sécurisé et organisation des documents",
      color: "bg-orange-100 text-orange-600"
    },
    {
      icon: Settings,
      title: "Administration avancée",
      description: "Contrôles fins et personnalisation complète",
      color: "bg-gray-100 text-gray-600"
    }
  ];

  const stats = [
    { label: "Utilisateurs actifs", value: "2,847", trend: "+12%" },
    { label: "Prestations mensuelles", value: "1,264", trend: "+8%" },
    { label: "Taux de satisfaction", value: "98.5%", trend: "+2%" },
    { label: "Temps de réponse moyen", value: "< 2h", trend: "-15%" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-app-background via-app-surface to-app-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative z-10 container mx-auto px-6 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-app-primary/10 text-app-primary border-app-primary/20">
              Version 2.0 • Janvier 2025
            </Badge>
            <h1 className="text-5xl font-bold text-app-text mb-6 leading-tight">
              AppSeniors Admin
            </h1>
            <p className="text-2xl text-app-text-light mb-8 font-light">
              Plateforme d'administration moderne pour l'écosystème digital des seniors
            </p>
            <p className="text-lg text-app-text-light mb-12 max-w-2xl mx-auto leading-relaxed">
              Interface complète de gestion dédiée aux administrateurs, équipes support et modérateurs 
              pour superviser l'ensemble des services et utilisateurs de la plateforme AppSeniors.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-4">
                <Shield className="h-5 w-5 mr-2" />
                Accéder à l'administration
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                <Download className="h-5 w-5 mr-2" />
                Documentation complète
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats rapides */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={stat.label} className="text-center hover-lift">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-app-primary mb-2">{stat.value}</div>
                <div className="text-app-text-light mb-2">{stat.label}</div>
                <Badge variant="secondary" className="text-green-600 bg-green-50">
                  {stat.trend}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Fonctionnalités principales */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-app-text mb-4">
            Fonctionnalités principales
          </h2>
          <p className="text-app-text-light text-lg max-w-2xl mx-auto">
            Une suite complète d'outils pour gérer efficacement votre plateforme senior
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={feature.title} className="hover-lift border-elegant-hover">
              <CardHeader>
                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-app-text-light">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Informations techniques */}
        <Card className="mb-16 shadow-elegant">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Settings className="h-6 w-6" />
              Stack technique
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-app-text mb-3">Frontend</h4>
              <ul className="space-y-2 text-app-text-light">
                <li>• React 18 + TypeScript</li>
                <li>• Tailwind CSS + shadcn/ui</li>
                <li>• TanStack Query</li>
                <li>• React Router Dom</li>
                <li>• Vite (Build tool)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-app-text mb-3">Backend</h4>
              <ul className="space-y-2 text-app-text-light">
                <li>• Supabase (PostgreSQL)</li>
                <li>• Row Level Security (RLS)</li>
                <li>• Edge Functions</li>
                <li>• Supabase Auth</li>
                <li>• Stockage sécurisé</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Status et informations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Informations du projet
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-app-text-light">Date de génération:</span>
                <span className="font-medium">{currentDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-app-text-light">Version:</span>
                <Badge>v2.0.0</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-app-text-light">Status:</span>
                <Badge className="bg-green-100 text-green-800">Production Ready</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-app-text-light">Sécurité:</span>
                <Badge className="bg-blue-100 text-blue-800">RGPD Compliant</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5" />
                Système en temps réel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-app-text-light">Base de données:</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-600 font-medium">En ligne</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-app-text-light">Authentification:</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-600 font-medium">Opérationnel</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-app-text-light">API:</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-600 font-medium">Disponible</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer projet */}
      {/* <ProjectFooter /> */}
    </div>
  );
};

export default PresentationPage;