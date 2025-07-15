
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
  blue: "from-primary to-blue-600",
  green: "from-green-500 to-green-600", 
  purple: "from-blue-500 to-blue-600",
  orange: "from-amber-500 to-amber-600"
};

const StatsCard = ({ title, value, change, trend, icon: Icon, color, className, style }: StatsCardProps) => {
  return (
    <Card className={cn("hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0", className)} style={style}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-muted-foreground text-sm font-medium mb-1">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
          </div>
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorVariants[color]} flex items-center justify-center shadow-sm`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
        
        <div className="flex items-center mt-4 gap-2">
          {trend === "up" ? (
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">{change}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-red-600">
              <TrendingDown className="h-4 w-4" />
              <span className="text-sm font-medium">{change}</span>
            </div>
          )}
          <span className="text-muted-foreground text-sm">vs mois dernier</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
