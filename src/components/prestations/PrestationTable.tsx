import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

// Export Prestation interface for usage in other files
export interface Prestation {
  id: string;
  seniorNom: string;
  aidantNom: string;
  typePrestation: string;
  dateCreation: string;
  tarif: number;
  statut: 'en_attente' | 'en_cours' | 'terminee' | 'refusee' | 'annulee';
  evaluation?: number;
}

interface PrestationTableProps {
  prestations: Prestation[];
  onVoirPrestation: (prestation: Prestation) => void;
}

const PrestationTable = ({ prestations, onVoirPrestation }: PrestationTableProps) => {
  const getStatutBadgeColor = (statut: string) => {
    switch (statut) {
      case 'en_attente': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'en_cours': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'terminee': return 'bg-green-100 text-green-700 border-green-200';
      case 'refusee': return 'bg-red-100 text-red-700 border-red-200';
      case 'annulee': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatutLabel = (statut: string) => {
    switch (statut) {
      case 'en_attente': return 'En attente';
      case 'en_cours': return 'En cours';
      case 'terminee': return 'Terminée';
      case 'refusee': return 'Refusée';
      case 'annulee': return 'Annulée';
      default: return statut;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="text-left py-3 px-4 font-medium text-slate-700">ID</th>
            <th className="text-left py-3 px-4 font-medium text-slate-700">Senior</th>
            <th className="text-left py-3 px-4 font-medium text-slate-700">Aidant</th>
            <th className="text-left py-3 px-4 font-medium text-slate-700">Type</th>
            <th className="text-left py-3 px-4 font-medium text-slate-700">Date</th>
            <th className="text-left py-3 px-4 font-medium text-slate-700">Tarif</th>
            <th className="text-left py-3 px-4 font-medium text-slate-700">Statut</th>
            <th className="text-left py-3 px-4 font-medium text-slate-700">Évaluation</th>
            <th className="text-left py-3 px-4 font-medium text-slate-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {prestations.map((prestation) => (
            <tr key={prestation.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
              <td className="py-4 px-4 font-mono text-sm text-slate-600">{prestation.id}</td>
              <td className="py-4 px-4">
                <p className="font-medium text-slate-800">{prestation.seniorNom}</p>
              </td>
              <td className="py-4 px-4">
                <p className="font-medium text-slate-800">{prestation.aidantNom}</p>
              </td>
              <td className="py-4 px-4 text-slate-600">{prestation.typePrestation}</td>
              <td className="py-4 px-4 text-slate-600">
                {new Date(prestation.dateCreation).toLocaleDateString('fr-FR')}
              </td>
              <td className="py-4 px-4 font-medium text-slate-800">{prestation.tarif.toFixed(2)}€</td>
              <td className="py-4 px-4">
                <Badge className={getStatutBadgeColor(prestation.statut)}>
                  {getStatutLabel(prestation.statut)}
                </Badge>
              </td>
              <td className="py-4 px-4">
                {prestation.evaluation ? (
                  <div className="flex items-center gap-1">
                    {renderStars(prestation.evaluation)}
                    <span className="text-sm text-slate-600 ml-1">{prestation.evaluation}</span>
                  </div>
                ) : (
                  <span className="text-sm text-slate-400">Non évaluée</span>
                )}
              </td>
              <td className="py-4 px-4">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onVoirPrestation(prestation)}
                  title="Voir détails"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrestationTable;
