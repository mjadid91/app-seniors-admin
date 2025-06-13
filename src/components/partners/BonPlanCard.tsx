
import { Tag, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BonPlan {
  id: number;
  titre: string;
  partenaire: string;
  description: string;
  reduction: string;
  dateExpiration: string;
  statut: string;
}

interface BonPlanCardProps {
  bonPlan: BonPlan;
}

const BonPlanCard = ({ bonPlan }: BonPlanCardProps) => {
  return (
    <div className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
            <Tag className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">{bonPlan.titre}</h3>
            <p className="text-sm text-slate-500">{bonPlan.partenaire}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs ${
          bonPlan.statut === 'Actif' 
            ? 'bg-green-100 text-green-700' 
            : 'bg-gray-100 text-gray-700'
        }`}>
          {bonPlan.statut}
        </span>
      </div>

      <p className="text-slate-600 mb-4">{bonPlan.description}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-lg font-bold text-purple-600">{bonPlan.reduction}</p>
            <p className="text-xs text-slate-500">Réduction</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-slate-700">
              {new Date(bonPlan.dateExpiration).toLocaleDateString('fr-FR')}
            </p>
            <p className="text-xs text-slate-500">Expire le</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <Edit className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BonPlanCard;
