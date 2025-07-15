
import { Users, Calendar, Shield, Clock, AlertCircle } from "lucide-react";
import { RecentActivity as RecentActivityType } from "./useRecentActivities";

// Associe les types d'activités à des icônes et des couleurs
const ICON_MAP: Record<
  string,
  { icon: any; color: string }
> = {
  user: { icon: Users, color: "blue" },
  prestation: { icon: Calendar, color: "green" },
  report: { icon: Shield, color: "orange" },
};

const colorVariants = {
  blue: "bg-blue-100 text-blue-600",
  green: "bg-green-100 text-green-600",
  orange: "bg-orange-100 text-orange-600",
  gray: "bg-slate-200 text-slate-500",
};

interface RecentActivityProps {
  activities: RecentActivityType[];
}

const RecentActivity = ({ activities }: RecentActivityProps) => {
  if (!activities.length) {
    return (
      <div className="py-8 text-center text-slate-400">
        <Clock className="h-7 w-7 mx-auto mb-2" />
        Aucune activité récente à afficher.
      </div>
    );
  }

  return (
    <div className="max-h-96 overflow-y-auto space-y-4 p-2 border rounded-md bg-white shadow-sm">
      {activities.map((activity) => {
        const mapping = ICON_MAP[activity.type] || {
          icon: Clock,
          color: "gray",
        };
        const Icon = mapping.icon;
        const colorClass =
          colorVariants[mapping.color as keyof typeof colorVariants] ||
          colorVariants.gray;

        // Formate la date de façon lisible
        let timeDisplay = activity.datetime
          ? new Date(activity.datetime).toLocaleString("fr-FR", {
              dateStyle: "short",
              timeStyle: "short",
            })
          : "";

        return (
          <div
            key={activity.id + "-" + activity.type}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClass}`}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-slate-800 text-sm">{activity.title}</p>
              <p className="text-slate-600 text-sm">{activity.subtitle}</p>
              <p className="text-xs text-slate-400 mt-1">{timeDisplay}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecentActivity;
