
import { useState, useEffect } from "react";
import { Users, Calendar, Shield, FileText, DollarSign, TrendingUp, Activity } from "lucide-react";
import StatsCard from "./StatsCard";
import ActivityChart from "./ActivityChart";

const Dashboard = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    // Simulation des statistiques
    const mockStats = [
      {
        title: "Utilisateurs actifs",
        value: "1,234",
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
        title: "Signalements",
        value: "23",
        change: "-5%",
        trend: "down" as const,
        icon: Shield,
        color: "orange" as const
      },
      {
        title: "Revenus",
        value: "€12,345",
        change: "+15%",
        trend: "up" as const,
        icon: DollarSign,
        color: "purple" as const
      }
    ];
    setStats(mockStats);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-800">Tableau de bord</h1>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Activity className="h-4 w-4" />
          <span>Dernière mise à jour: {new Date().toLocaleString('fr-FR')}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard
            key={stat.title}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
            {...stat}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-slate-800">Activité récente</h2>
          </div>
          <ActivityChart />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Actions rapides</h2>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-slate-800">Gérer les utilisateurs</p>
                  <p className="text-sm text-slate-500">Ajouter, modifier ou supprimer des comptes</p>
                </div>
              </div>
            </button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-slate-800">Suivre les prestations</p>
                  <p className="text-sm text-slate-500">Consulter et valider les services</p>
                </div>
              </div>
            </button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="font-medium text-slate-800">Modération</p>
                  <p className="text-sm text-slate-500">Examiner les signalements</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
