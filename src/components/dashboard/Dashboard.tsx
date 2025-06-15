
import { useState, useEffect } from "react";
import { Users, Calendar, Shield, FileText, DollarSign, MessageSquare, Activity } from "lucide-react";
import StatsCard from "./StatsCard";
import RecentActivity from "./RecentActivity";

const Dashboard = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    // Simulation des statistiques
    const mockStats = [
      {
        title: "Utilisateurs actifs",
        value: "1 234",
        change: "+12%",
        trend: "up" as const,
        icon: Users,
        color: "blue" as const
      },
      {
        title: "Prestations ce mois",
        value: "456",
        change: "+8%",
        trend: "up" as const,
        icon: Calendar,
        color: "green" as const
      },
      {
        title: "Messages actifs",
        value: "789",
        change: "+22%",
        trend: "up" as const,
        icon: MessageSquare,
        color: "purple" as const
      },
      {
        title: "Signalements",
        value: "23",
        change: "-5%",
        trend: "down" as const,
        icon: Shield,
        color: "orange" as const
      },
      {
        title: "Revenus",
        value: "€12 345",
        change: "+15%",
        trend: "up" as const,
        icon: DollarSign,
        color: "green" as const
      }
    ];
    setStats(mockStats);
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h1 className="text-3xl font-bold text-slate-800">Tableau de bord</h1>
        <div className="flex items-center gap-2 text-sm text-slate-500 mt-2 sm:mt-0">
          <Activity className="h-4 w-4" />
          <span>Dernière mise à jour :&nbsp;
            <span className="font-semibold text-blue-700">
              {new Date().toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' })}
            </span>
          </span>
        </div>
      </div>

      {/* Cartes statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6">
        {stats.length > 0 ? (
          stats.map((stat, index) => (
            <StatsCard
              key={stat.title}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
              {...stat}
            />
          ))
        ) : (
          <div className="col-span-5 text-center text-slate-500 py-12">
            <span>Aucune statistique à afficher pour le moment.</span>
          </div>
        )}
      </div>

      {/* Grille Activité récente + Actions rapides */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-slate-800">Activité récente</h2>
          </div>
          {/* Affichage activité */}
          <RecentActivity />
        </div>

        {/* Actions rapides */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Actions rapides</h2>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg hover:bg-slate-50 transition-colors border border-slate-100 flex items-center gap-3">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium text-slate-800">Gérer les utilisateurs</p>
                <p className="text-sm text-slate-500">Ajouter, modifier ou supprimer des comptes</p>
              </div>
            </button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-slate-50 transition-colors border border-slate-100 flex items-center gap-3">
              <Calendar className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-slate-800">Suivre les prestations</p>
                <p className="text-sm text-slate-500">Consulter et valider les services</p>
              </div>
            </button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-slate-50 transition-colors border border-slate-100 flex items-center gap-3">
              <Shield className="h-5 w-5 text-orange-600" />
              <div>
                <p className="font-medium text-slate-800">Modération</p>
                <p className="text-sm text-slate-500">Examiner les signalements</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

