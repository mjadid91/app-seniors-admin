
import { Users, Calendar, Euro, Headphones } from "lucide-react";
import StatsCard from "./StatsCard";
import ActivityChart from "./ActivityChart";
import RecentActivity from "./RecentActivity";
import { useDashboardStats } from "./useDashboardStats";

const Dashboard = () => {
  const { stats, loading, error } = useDashboardStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-xl">⚠</span>
          </div>
          <h3 className="text-lg font-medium text-slate-800 mb-2">Erreur de chargement</h3>
          <p className="text-slate-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-800">Tableau de bord</h1>
        <div className="text-sm text-slate-500">
          Dernière mise à jour : {new Date().toLocaleTimeString('fr-FR')}
        </div>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Utilisateurs totaux"
          value={stats.totalUsers}
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Services actifs"
          value={stats.activeServices}
          icon={Calendar}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Revenus (Commissions)"
          value={stats.totalRevenue}
          icon={Euro}
          trend={{ value: 23, isPositive: true }}
          currency={true}
        />
        <StatsCard
          title="Tickets Support"
          value={stats.supportTickets}
          icon={Headphones}
          trend={{ value: 5, isPositive: false }}
        />
      </div>

      {/* Graphique d'activité */}
      <div className="grid gap-4 md:grid-cols-7">
        <div className="md:col-span-4">
          <ActivityChart />
        </div>
        <div className="md:col-span-3">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
