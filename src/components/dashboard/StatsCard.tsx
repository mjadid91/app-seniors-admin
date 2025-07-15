
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
  blue: "from-blue-500 to-blue-600",
  green: "from-green-500 to-green-600", 
  purple: "from-purple-500 to-purple-600",
  orange: "from-orange-500 to-orange-600"
};

const StatsCard = ({ title, value, change, trend, icon: Icon, color, className, style }: StatsCardProps) => {
  return (
    <Card className={cn("hover:shadow-lg transition-all duration-300 hover:-translate-y-1", className)} style={style}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-slate-600 text-sm font-medium">{title}</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">{value}</p>
          </div>
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorVariants[color]} flex items-center justify-center shadow-lg`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
        
        <div className="flex items-center mt-4 gap-1">
          {trend === "up" ? (
            <TrendingUp className="h-4 w-4 text-green-600" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-600" />
          )}
          <span className={`text-sm font-medium ${trend === "up" ? "text-green-600" : "text-red-600"}`}>
            {change}
          </span>
          <span className="text-slate-500 text-sm ml-1">vs mois dernier</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
