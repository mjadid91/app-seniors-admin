
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, Tag, User, Percent, Clock, Code } from "lucide-react";

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

interface ViewBonPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  bonPlan: BonPlan | null;
}

const ViewBonPlanModal = ({ isOpen, onClose, bonPlan }: ViewBonPlanModalProps) => {
  if (!bonPlan) return null;

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
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Tag className="h-5 w-5 text-purple-600" />
            Détails du bon plan
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">{bonPlan.titre}</h2>
              <div className="flex items-center gap-2 text-slate-600">
                <User className="h-4 w-4" />
                <span>{bonPlan.partenaire}</span>
              </div>
            </div>
            <Badge className={`${getStatutColor(bonPlan.statut)} border`}>
              {bonPlan.statut}
            </Badge>
          </div>

          <div className="bg-slate-50 rounded-lg p-4">
            <h3 className="font-semibold text-slate-800 mb-2">Description</h3>
            <p className="text-slate-600 leading-relaxed">{bonPlan.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Percent className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Réduction</p>
                  <p className="font-semibold text-slate-800">{formatReduction()}</p>
                </div>
              </div>

              {bonPlan.codePromo && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Code className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Code promo</p>
                    <p className="font-semibold text-slate-800 font-mono">{bonPlan.codePromo}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {bonPlan.dateDebutReduction && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Date de début</p>
                    <p className="font-semibold text-slate-800">
                      {new Date(bonPlan.dateDebutReduction).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
              )}

              {bonPlan.dateFinReduction && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Date de fin</p>
                    <p className="font-semibold text-slate-800">
                      {new Date(bonPlan.dateFinReduction).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewBonPlanModal;
