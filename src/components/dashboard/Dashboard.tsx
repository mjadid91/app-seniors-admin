
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StatsCard from "./StatsCard";
import ActivityChart from "./ActivityChart";
import RecentActivity from "./RecentActivity";
import { useDashboardStats } from "./useDashboardStats";
import { useRecentActivities } from "./useRecentActivities";
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  Heart,
  ArrowRight,
  Activity,
  Clock
} from "lucide-react";

const Dashboard = () => {
  const { stats, loading: statsLoading, error: statsError } = useDashboardStats();
  const { activities, loading: activitiesLoading, error: activitiesError } = useRecentActivities();

  if (statsLoading || activitiesLoading) {
    return (
      <div className="space-y-8 animate-fade-in">
        <div className="space-y-2">
          <div className="h-8 bg-muted rounded-lg w-64 animate-pulse"></div>
          <div className="h-4 bg-muted rounded w-96 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-muted rounded-xl animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (statsError || activitiesError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="p-8 text-center">
          <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-destructive text-xl">⚠</span>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Erreur de chargement</h3>
          <p className="text-muted-foreground mb-4">
            {statsError || activitiesError}
          </p>
          <Button onClick={() => window.location.reload()}>
            Réessayer
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Tableau de bord</h1>
        <p className="text-muted-foreground">
          Vue d'ensemble de l'activité de la plateforme AppSeniors
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Utilisateurs actifs"
          value={stats?.utilisateurs?.toString() || "0"}
          change="+12%"
          trend="up"
          icon={Users}
          color="blue"
        />
        <StatsCard
          title="Prestations"
          value={stats?.prestations?.toString() || "0"}
          change="+8%"
          trend="up"
          icon={Calendar}
          color="green"
        />
        <StatsCard
          title="Revenus"
          value={`${stats?.revenus || 0}€`}
          change="+15%"
          trend="up"
          icon={TrendingUp}
          color="purple"
        />
        <StatsCard
          title="Messages"
          value={stats?.messages?.toString() || "0"}
          change="+5%"
          trend="up"
          icon={Heart}
          color="orange"
        />
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Activité des 30 derniers jours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ActivityChart />
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Activités récentes
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-primary">
                Voir tout
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <RecentActivity activities={activities} />
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Gérer les utilisateurs</h3>
              <p className="text-sm text-muted-foreground">Ajouter, modifier ou supprimer des comptes</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Nouvelles prestations</h3>
              <p className="text-sm text-muted-foreground">Suivre les demandes en cours</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center group-hover:bg-amber-200 transition-colors">
              <TrendingUp className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Rapports financiers</h3>
              <p className="text-sm text-muted-foreground">Consulter les statistiques de revenus</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
