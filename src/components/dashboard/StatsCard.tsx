
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
    gradient: "from-app-primary to-app-info",
    bg: "bg-gradient-to-br from-app-primary/10 to-app-info/5",
    border: "border-app-primary/20"
  },
  green: {
    gradient: "from-app-success to-emerald-500",
    bg: "bg-gradient-to-br from-app-success/10 to-emerald-500/5",
    border: "border-app-success/20"
  },
  purple: {
    gradient: "from-app-secondary to-purple-500",
    bg: "bg-gradient-to-br from-app-secondary/10 to-purple-500/5",
    border: "border-app-secondary/20"
  },
  orange: {
    gradient: "from-app-warning to-orange-500",
    bg: "bg-gradient-to-br from-app-warning/10 to-orange-500/5",
    border: "border-app-warning/20"
  }
};

const StatsCard = ({ title, value, change, trend, icon: Icon, color, className, style }: StatsCardProps) => {
  const variant = colorVariants[color];
  
  return (
    <Card 
      className={cn(
        "group hover-lift transition-all duration-300 hover:shadow-elegant-lg border-0 overflow-hidden relative",
        variant.bg,
        className
      )} 
      style={style}
    >
      <div className={cn("absolute inset-0 opacity-50", variant.border, "border")} />
      <CardContent className="p-6 relative">
        <div className="flex items-center justify-between">
          <div className="flex-1 space-y-1">
            <p className="text-app-text-light text-sm font-medium tracking-wide uppercase">
              {title}
            </p>
            <p className="text-3xl font-bold text-foreground tracking-tight">
              {value}
            </p>
          </div>
          <div className={cn(
            "w-14 h-14 rounded-xl bg-gradient-to-br shadow-elegant flex items-center justify-center group-hover:scale-105 transition-transform duration-300",
            variant.gradient
          )}>
            <Icon className="h-7 w-7 text-white drop-shadow-sm" />
          </div>
        </div>
        
        <div className="flex items-center mt-4 gap-2">
          <div className={cn(
            "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
            trend === "up" 
              ? "bg-app-success/10 text-app-success" 
              : "bg-app-error/10 text-app-error"
          )}>
            {trend === "up" ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span>{change}</span>
          </div>
          <span className="text-app-text-light text-xs">vs mois dernier</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
