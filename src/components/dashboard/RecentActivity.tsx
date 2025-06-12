
import { User, Headphones, Star, Building2 } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "user",
    title: "Nouvel utilisateur inscrit",
    subtitle: "Marie Dubois",
    time: "Il y a 2 minutes",
    icon: User,
    color: "blue"
  },
  {
    id: 2,
    type: "support",
    title: "Ticket résolu",
    subtitle: "Support #1247",
    time: "Il y a 15 minutes",
    icon: Headphones,
    color: "green"
  },
  {
    id: 3,
    type: "evaluation",
    title: "Évaluation 5 étoiles",
    subtitle: "Jean Martin",
    time: "Il y a 1 heure",
    icon: Star,
    color: "orange"
  },
  {
    id: 4,
    type: "partnership",
    title: "Nouveau partenariat",
    subtitle: "Pharmacie Centrale",
    time: "Il y a 2 heures",
    icon: Building2,
    color: "purple"
  }
];

const colorVariants = {
  blue: "bg-blue-100 text-blue-600",
  green: "bg-green-100 text-green-600",
  orange: "bg-orange-100 text-orange-600",
  purple: "bg-purple-100 text-purple-600"
};

const RecentActivity = () => {
  return (
    <div className="space-y-4">
      {activities.map((activity) => {
        const Icon = activity.icon;
        return (
          <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorVariants[activity.color as keyof typeof colorVariants]}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-slate-800 text-sm">{activity.title}</p>
              <p className="text-slate-600 text-sm">{activity.subtitle}</p>
              <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecentActivity;
