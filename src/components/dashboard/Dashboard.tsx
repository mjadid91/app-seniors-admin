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
import DemoDataInfo from "@/components/ui/demo-data-info";

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
      iconColor: "text-blue-600",
    },
    {
      icon: Calendar,
      title: "Suivre les prestations",
      desc: "Consulter et valider les services",
      onClick: () => navigate("/prestations"),
      iconColor: "text-green-600",
    },
    {
      icon: Shield,
      title: "Modération",
      desc: "Examiner les signalements",
      onClick: () => navigate("/moderation"),
      iconColor: "text-orange-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Info données de démonstration */}
      <DemoDataInfo />
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h1 className="text-3xl font-bold text-slate-800">Tableau de bord</h1>
        <div className="flex items-center gap-2 text-sm text-slate-500 mt-2 sm:mt-0">
          <Activity className="h-4 w-4" />
          <span>
            Dernière mise à jour :&nbsp;
            <span className="font-semibold text-blue-700">
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
          <div className="col-span-5 text-center text-slate-500 py-12">
            <span>Chargement des statistiques…</span>
          </div>
        ) : error ? (
          <div className="col-span-5 text-center text-red-500 py-12">
            <span>{error}</span>
          </div>
        ) : (
          statCards.map((stat, index) => (
            <StatsCard
              key={stat.title}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
              {...stat}
            />
          ))
        )}
      </div>

      {/* Grille Activité récente + Actions rapides */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-slate-800">
              Activité récente
            </h2>
          </div>
          {/* Affichage activité */}
          <RecentActivity />
        </div>

        {/* Actions rapides */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Actions rapides
          </h2>
          <div className="space-y-3">
            {quickActions.map((action, idx) => (
              <button
                key={action.title}
                className="w-full text-left p-3 rounded-lg hover:bg-slate-50 transition-colors border border-slate-100 flex items-center gap-3"
                onClick={action.onClick}
                type="button"
              >
                <action.icon className={`h-5 w-5 ${action.iconColor}`} />
                <div>
                  <p className="font-medium text-slate-800">{action.title}</p>
                  <p className="text-sm text-slate-500">{action.desc}</p>
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
