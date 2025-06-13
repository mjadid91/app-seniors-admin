import { Tag, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BonPlan {
  id: number;
  titre: string;
  partenaire: string;
  description: string;
  typeReduction: string;
  valeurReduction: number; // Renommé pour cohérence
  dateDebutReduction: string;
  dateFinReduction: string;
  codePromo: string;
  statut: string;
  // Champs système cohérents
  dateCreation?: string;
  dateMiseAJour?: string;
  creePar?: string;
}

interface BonPlanCardProps {
  bonPlan: BonPlan;
  onView: (bonPlan: BonPlan) => void;
  onEdit: (bonPlan: BonPlan) => void;
  onDelete: (bonPlan: BonPlan) => void;
}

const BonPlanCard = ({ bonPlan, onView, onEdit, onDelete }: BonPlanCardProps) => {
  const formatReduction = () => {
    switch (bonPlan.typeReduction) {
      case 'pourcentage':
        return `${bonPlan.valeurReduction}%`;
      case 'montant':
        return `${bonPlan.valeurReduction}€`;
      case 'gratuit':
        return 'Gratuit';
      default:
        return `${bonPlan.valeurReduction}%`;
    }
  };

  const getStatutColor = (statut: string) => {
    switch (statut.toLowerCase()) {
      case 'actif':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'inactif':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'expire':
      case 'expiré':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

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
        <span className={`px-2 py-1 rounded-full text-xs border ${getStatutColor(bonPlan.statut)}`}>
          {bonPlan.statut}
        </span>
      </div>

      <p className="text-slate-600 mb-4 line-clamp-2">{bonPlan.description}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-lg font-bold text-purple-600">{formatReduction()}</p>
            <p className="text-xs text-slate-500">Réduction</p>
          </div>
          {bonPlan.dateFinReduction && (
            <div className="text-center">
              <p className="text-sm font-medium text-slate-700">
                {new Date(bonPlan.dateFinReduction).toLocaleDateString('fr-FR')}
              </p>
              <p className="text-xs text-slate-500">Expire le</p>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => onView(bonPlan)}
            title="Voir les détails"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => onEdit(bonPlan)}
            title="modifier"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => onDelete(bonPlan)}
            title="Supprimer"
            className="hover:bg-red-50 hover:border-red-200"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BonPlanCard;
