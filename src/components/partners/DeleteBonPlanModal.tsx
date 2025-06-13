
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BonPlan {
  id: number;
  titre: string;
  partenaire: string;
  description: string;
  typeReduction: string;
  pourcentageReduction: number;
  dateDebutReduction: string;
  dateFinReduction: string;
  codePromo: string;
  statut: string;
}

interface DeleteBonPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  bonPlan: BonPlan | null;
  onDeleteBonPlan: (id: number) => void;
}

const DeleteBonPlanModal = ({ isOpen, onClose, bonPlan, onDeleteBonPlan }: DeleteBonPlanModalProps) => {
  const { toast } = useToast();

  const handleDelete = () => {
    if (bonPlan) {
      onDeleteBonPlan(bonPlan.id);
      toast({
        title: "Bon plan supprimé",
        description: `Le bon plan "${bonPlan.titre}" a été supprimé avec succès.`
      });
      onClose();
    }
  };

  if (!bonPlan) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <DialogTitle>Supprimer le bon plan</DialogTitle>
              <DialogDescription>
                Cette action est irréversible.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-slate-50 rounded-lg p-4">
            <h3 className="font-semibold text-slate-800 mb-1">{bonPlan.titre}</h3>
            <p className="text-sm text-slate-600">{bonPlan.partenaire}</p>
          </div>

          <p className="text-slate-600">
            Êtes-vous sûr de vouloir supprimer ce bon plan ? Cette action ne peut pas être annulée.
          </p>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Supprimer définitivement
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBonPlanModal;
