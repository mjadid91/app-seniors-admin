
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  currency?: boolean;
}

const StatsCard = ({ title, value, icon: Icon, trend, currency = false }: StatsCardProps) => {
  const formatValue = (val: string | number) => {
    if (currency && typeof val === 'number') {
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
      }).format(val);
    }
    return val.toLocaleString('fr-FR');
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-600">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-slate-400" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-slate-800">
          {formatValue(value)}
        </div>
        {trend && (
          <p className={`text-xs ${trend.isPositive ? 'text-green-600' : 'text-red-600'} flex items-center mt-1`}>
            {trend.isPositive ? '↗' : '↘'} {trend.value}%
            <span className="text-slate-500 ml-1">vs mois dernier</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
