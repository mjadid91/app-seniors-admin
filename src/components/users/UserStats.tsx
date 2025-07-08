
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, UserX, Shield } from "lucide-react";

interface UserStatsProps {
  stats: {
    total: number;
    actifs: number;
    inactifs: number;
    administrateurs: number;
  };
}

const UserStats = ({ stats }: UserStatsProps) => {
  const statsCards = [
    {
      title: "Total utilisateurs",
      value: stats.total,
      icon: Users,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      textColor: "text-blue-700"
    },
    {
      title: "Utilisateurs actifs",
      value: stats.actifs,
      icon: UserCheck,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      textColor: "text-green-700"
    },
    {
      title: "Utilisateurs inactifs",
      value: stats.inactifs,
      icon: UserX,
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      textColor: "text-orange-700"
    },
    {
      title: "Administrateurs",
      value: stats.administrateurs,
      icon: Shield,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      textColor: "text-purple-700"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {statsCards.map((card, index) => (
        <Card key={index} className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              {card.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${card.bgColor}`}>
              <card.icon className={`h-4 w-4 ${card.iconColor}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${card.textColor}`}>
              {card.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserStats;
