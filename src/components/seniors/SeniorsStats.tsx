
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, Heart, Frown } from "lucide-react";

interface SeniorsStatsProps {
  stats: {
    totalSeniors: number;
    seniorsActifs: number;
    totalAidants: number;
    aidantsActifs: number;
    humeurPositive: number;
    humeurNegative: number;
  };
}

const SeniorsStats = ({ stats }: SeniorsStatsProps) => {
  const statsCards = [
    {
      title: "Total Seniors",
      value: stats.totalSeniors,
      subtitle: `${stats.seniorsActifs} actifs`,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Total Aidants",
      value: stats.totalAidants,
      subtitle: `${stats.aidantsActifs} actifs`,
      icon: UserCheck,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Humeur Positive",
      value: stats.humeurPositive,
      subtitle: "aujourd'hui",
      icon: Heart,
      color: "text-pink-600",
      bgColor: "bg-pink-50"
    },
    {
      title: "Humeur Négative",
      value: stats.humeurNegative,
      subtitle: "à surveiller",
      icon: Frown,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
              <p className="text-xs text-slate-500 mt-1">{stat.subtitle}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default SeniorsStats;
