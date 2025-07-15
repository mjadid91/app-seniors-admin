
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Aidant } from "../../types/seniors";
import { useToast } from "@/hooks/use-toast";

interface DeleteAidantModalProps {
  isOpen: boolean;
  onClose: () => void;
  aidant: Aidant | null;
  onConfirm: (aidant: Aidant) => void;
}

const DeleteAidantModal = ({ isOpen, onClose, aidant, onConfirm }: DeleteAidantModalProps) => {
  const { toast } = useToast();

  const handleConfirm = () => {
    if (aidant) {
      onConfirm(aidant);
      onClose();
      
      toast({
        title: "Aidant supprimé",
        description: `${aidant.prenom} ${aidant.nom} a été supprimé avec succès.`,
      });
    }
  };

  if (!aidant) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirmer la suppression</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir supprimer l'aidant <strong>{aidant.prenom} {aidant.nom}</strong> ?
            <br />
            <br />
            Cette action est irréversible et supprimera définitivement toutes les données associées à cet aidant.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Supprimer définitivement
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAidantModal;
