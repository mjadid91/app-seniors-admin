
import { Users, UserCheck, Shield, UserX } from "lucide-react";
import StatsCard from "../dashboard/StatsCard";

interface UserStatsProps {
  stats: {
    total: number;
    active: number;
    inactive: number;
    admins: number;
  };
}

const UserStats = ({ stats }: UserStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Total utilisateurs"
        value={stats.total.toString()}
        change="+12%"
        trend="up"
        icon={Users}
        color="blue"
      />
      <StatsCard
        title="Utilisateurs actifs"
        value={stats.active.toString()}
        change="+8%"
        trend="up"
        icon={UserCheck}
        color="green"
      />
      <StatsCard
        title="Administrateurs"
        value={stats.admins.toString()}
        change="0%"
        trend="up"
        icon={Shield}
        color="purple"
      />
      <StatsCard
        title="Inactifs"
        value={stats.inactive.toString()}
        change="-5%"
        trend="down"
        icon={UserX}
        color="orange"
      />
    </div>
  );
};

export default UserStats;
