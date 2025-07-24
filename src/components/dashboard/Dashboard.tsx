import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Calendar,
  Shield,
  FileText,
  DollarSign,
  MessageSquare,
  Activity,
} from "lucide-react";
import StatsCard from "./StatsCard";
import RecentActivity from "./RecentActivity";
import { useDashboardStats } from "./useDashboardStats";

const Dashboard = () => {
  const { stats, loading, error } = useDashboardStats();
  const navigate = useNavigate();

  const statCards = [
    {
      title: "Utilisateurs actifs",
      value: stats ? stats.utilisateurs.toLocaleString("fr-FR") : "-",
      change: "",
      trend: "up" as const,
      icon: Users,
      color: "blue" as const,
    },
    {
      title: "Prestations ce mois",
      value: stats ? stats.prestations.toLocaleString("fr-FR") : "-",
      change: "",
      trend: "up" as const,
      icon: Calendar,
      color: "green" as const,
    },
    {
      title: "Messages actifs",
      value: stats ? stats.messages.toLocaleString("fr-FR") : "-",
      change: "",
      trend: "up" as const,
      icon: MessageSquare,
      color: "purple" as const,
    },
    {
      title: "Signalements",
      value: stats ? stats.signalements.toLocaleString("fr-FR") : "-",
      change: "",
      trend: "down" as const,
      icon: Shield,
      color: "orange" as const,
    },
    {
      title: "Revenus",
      value: stats ? "€" + stats.revenus.toLocaleString("fr-FR") : "-",
      change: "",
      trend: "up" as const,
      icon: DollarSign,
      color: "green" as const,
    },
  ];

  // Actions rapides : routes mises à jour
  const quickActions = [
    {
      icon: Users,
      title: "Gérer les utilisateurs",
      desc: "Ajouter, modifier ou supprimer des comptes",
      onClick: () => navigate("/users"),
    },
    {
      icon: Calendar,
      title: "Suivre les prestations",
      desc: "Consulter et valider les services",
      onClick: () => navigate("/prestations"),
    },
    {
      icon: Shield,
      title: "Modération",
      desc: "Examiner les signalements",
      onClick: () => navigate("/moderation"),
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-gradient-subtle rounded-xl border-elegant">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-app-text">Tableau de bord</h1>
          <p className="text-app-text-light">Gérez votre plateforme en temps réel</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-app-text-light bg-app-surface/80 backdrop-blur-sm px-4 py-2 rounded-lg border-elegant">
          <Activity className="h-4 w-4 text-app-primary" />
          <span>
            Dernière mise à jour :&nbsp;
            <span className="font-semibold text-app-primary">
              {new Date().toLocaleString("fr-FR", {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </span>
          </span>
        </div>
      </div>

      {/* Cartes statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6">
        {loading ? (
          <div className="col-span-5 text-center py-12">
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-2 border-app-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="text-app-text-light">Chargement des statistiques…</span>
            </div>
          </div>
        ) : error ? (
          <div className="col-span-5 text-center py-12">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 bg-app-error/10 rounded-full flex items-center justify-center">
                <Activity className="h-6 w-6 text-app-error" />
              </div>
              <span className="text-app-error">{error}</span>
            </div>
          </div>
        ) : (
          statCards.map((stat, index) => (
            <StatsCard
              key={stat.title}
              className="animate-fade-in-up hover-lift"
              style={{ animationDelay: `${index * 100}ms` }}
              {...stat}
            />
          ))
        )}
      </div>

      {/* Grille Activité récente + Actions rapides */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-app-surface rounded-xl shadow-elegant border-elegant p-6 hover-lift animate-slide-in-left">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-app-primary/10 to-app-secondary/10 rounded-lg flex items-center justify-center">
              <Activity className="h-5 w-5 text-app-primary" />
            </div>
            <h2 className="text-lg font-semibold text-app-text">
              Activité récente
            </h2>
          </div>
          {/* Affichage activité */}
          <RecentActivity />
        </div>

        {/* Actions rapides */}
        <div className="bg-app-surface rounded-xl shadow-elegant border-elegant p-6 hover-lift animate-slide-in-right">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-app-primary/10 to-app-secondary/10 rounded-lg flex items-center justify-center">
              <Shield className="h-5 w-5 text-app-primary" />
            </div>
            <h2 className="text-lg font-semibold text-app-text">
              Actions rapides
            </h2>
          </div>
          <div className="space-y-3">
            {quickActions.map((action, idx) => (
              <button
                key={action.title}
                className="w-full text-left p-4 rounded-lg hover:bg-app-primary/5 transition-all duration-200 border-elegant hover:border-app-primary/20 hover:shadow-elegant-md flex items-center gap-4 group"
                onClick={action.onClick}
                type="button"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-app-primary/10 to-app-secondary/10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                  <action.icon className="h-6 w-6 text-app-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-app-text group-hover:text-app-primary transition-colors duration-200">{action.title}</p>
                  <p className="text-sm text-app-text-light">{action.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
