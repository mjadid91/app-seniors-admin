
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff, Archive, TrendingUp } from "lucide-react";
import { useModerationStats } from "./useModerationStats";

const ModerationStats = () => {
  const { data: stats, isLoading, error } = useModerationStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-xl animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-24 animate-pulse mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-red-200 shadow-sm">
          <CardContent className="p-6">
            <div className="text-center text-red-500 text-sm">
              Erreur de chargement des statistiques
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const statCards = [
    {
      title: "Signalements",
      value: stats?.signalements ?? 0,
      icon: Eye,
      color: "red",
      gradient: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      iconColor: "text-red-600"
    },
    {
      title: "Contenus masqués",
      value: stats?.masques ?? 0,
      icon: EyeOff,
      color: "yellow",
      gradient: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600"
    },
    {
      title: "Contenus archivés",
      value: stats?.archives ?? 0,
      icon: Archive,
      color: "gray",
      gradient: "from-slate-500 to-slate-600",
      bgColor: "bg-slate-50",
      iconColor: "text-slate-600"
    },
    {
      title: "Activité (7j)",
      value: (stats?.signalements ?? 0) + (stats?.masques ?? 0),
      icon: TrendingUp,
      color: "blue",
      gradient: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <Card key={index} className="border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 group">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-600 truncate">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {stat.value.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ModerationStats;
