
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Headphones, Calendar, User } from "lucide-react";
import StatsCard from "./StatsCard";
import ActivityChart from "./ActivityChart";

const Dashboard = () => {
  const stats = [
    {
      title: "Utilisateurs Actifs",
      value: "2,847",
      change: "+12%",
      trend: "up" as const,
      icon: Users,
      color: "blue"
    },
    {
      title: "Tickets Support",
      value: "23",
      change: "-8%",
      trend: "down" as const,
      icon: Headphones,
      color: "green"
    },
    {
      title: "Prestations ce mois",
      value: "156",
      change: "+24%",
      trend: "up" as const,
      icon: Calendar,
      color: "purple"
    },
    {
      title: "Nouveaux membres",
      value: "89",
      change: "+16%",
      trend: "up" as const,
      icon: User,
      color: "orange"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Tableau de bord</h2>
          <p className="text-slate-600 mt-1">Vue d'ensemble de la plateforme AppSeniors</p>
        </div>
        <div className="text-sm text-slate-500">
          Dernière mise à jour: {new Date().toLocaleString('fr-FR')}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard
            key={stat.title}
            {...stat}
            className={`animate-scale-in`}
            style={{ animationDelay: `${index * 100}ms` }}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="animate-scale-in" style={{ animationDelay: '400ms' }}>
          <CardHeader>
            <CardTitle className="text-slate-800">Activité des 7 derniers jours</CardTitle>
          </CardHeader>
          <CardContent>
            <ActivityChart />
          </CardContent>
        </Card>

        <Card className="animate-scale-in" style={{ animationDelay: '500ms' }}>
          <CardHeader>
            <CardTitle className="text-slate-800">Tickets récents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "#2847", subject: "Problème de connexion", status: "En cours", priority: "Haute" },
                { id: "#2846", subject: "Question sur les prestations", status: "Résolu", priority: "Normale" },
                { id: "#2845", subject: "Demande de modification profil", status: "En attente", priority: "Basse" }
              ].map((ticket, index) => (
                <div key={ticket.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                  <div>
                    <p className="font-medium text-slate-800">{ticket.subject}</p>
                    <p className="text-sm text-slate-500">{ticket.id}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      ticket.status === 'Résolu' ? 'bg-green-100 text-green-700' :
                      ticket.status === 'En cours' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {ticket.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
