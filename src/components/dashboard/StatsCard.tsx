
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: LucideIcon;
  color: "blue" | "green" | "purple" | "orange";
  className?: string;
  style?: React.CSSProperties;
}

const colorVariants = {
  blue: {
    gradient: "from-blue-500 to-blue-600",
    bg: "bg-blue-50",
    text: "text-blue-700"
  },
  green: {
    gradient: "from-green-500 to-green-600", 
    bg: "bg-green-50",
    text: "text-green-700"
  },
  purple: {
    gradient: "from-purple-500 to-purple-600",
    bg: "bg-purple-50",
    text: "text-purple-700"
  },
  orange: {
    gradient: "from-orange-500 to-orange-600",
    bg: "bg-orange-50",
    text: "text-orange-700"
  }
};

const StatsCard = ({ title, value, change, trend, icon: Icon, color, className, style }: StatsCardProps) => {
  const colorConfig = colorVariants[color];

  return (
    <Card className={cn("dashboard-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1", className)} style={style}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
          </div>
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colorConfig.gradient} flex items-center justify-center shadow-lg`}>
            <Icon className="h-7 w-7 text-white" />
          </div>
        </div>
        
        <div className="flex items-center mt-6 gap-2">
          <div className={`inline-flex items-center px-2 py-1 rounded-full ${colorConfig.bg}`}>
            {trend === "up" ? (
              <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
            ) : (
              <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
            )}
            <span className={`text-xs font-medium ${trend === "up" ? "text-green-600" : "text-red-600"}`}>
              {change}
            </span>
          </div>
          <span className="text-gray-500 text-xs">vs mois dernier</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
