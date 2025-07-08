
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Senior } from "../../types/seniors";
import { useToast } from "@/hooks/use-toast";

interface DeleteSeniorModalProps {
  isOpen: boolean;
  onClose: () => void;
  senior: Senior | null;
  onConfirm: (senior: Senior) => void;
}

const DeleteSeniorModal = ({ isOpen, onClose, senior, onConfirm }: DeleteSeniorModalProps) => {
  const { toast } = useToast();

  const handleConfirm = () => {
    if (senior) {
      onConfirm(senior);
      onClose();
      
      toast({
        title: "Senior supprimé",
        description: `${senior.prenom} ${senior.nom} a été supprimé avec succès.`,
      });
    }
  };

  if (!senior) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirmer la suppression</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir supprimer le senior <strong>{senior.prenom} {senior.nom}</strong> ?
            <br />
            <br />
            Cette action est irréversible et supprimera définitivement toutes les données associées à ce senior.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 pt-4">
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

export default DeleteSeniorModal;
