
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface RoleBadgeProps {
  role: 'administrateur' | 'moderateur' | 'support' | 'visualisateur';
  className?: string;
}

const roleConfig = {
  administrateur: {
    label: 'Administrateur',
    variant: 'default' as const,
    className: 'bg-blue-100 text-blue-800 hover:bg-blue-200'
  },
  moderateur: {
    label: 'Modérateur',
    variant: 'secondary' as const,
    className: 'bg-orange-100 text-orange-800 hover:bg-orange-200'
  },
  support: {
    label: 'Support',
    variant: 'secondary' as const,
    className: 'bg-purple-100 text-purple-800 hover:bg-purple-200'
  },
  visualisateur: {
    label: 'Visualisateur',
    variant: 'outline' as const,
    className: 'bg-gray-100 text-gray-800 hover:bg-gray-200'
  }
};

export const RoleBadge = ({ role, className }: RoleBadgeProps) => {
  const config = roleConfig[role];
  
  return (
    <Badge 
      variant={config.variant}
      className={cn(config.className, className)}
    >
      {config.label}
    </Badge>
  );
};
