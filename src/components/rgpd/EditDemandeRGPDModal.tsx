
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useTraiterDemandeRGPD, type DemandeRGPD } from "@/hooks/useSupabaseRGPD";

interface EditDemandeRGPDModalProps {
  isOpen: boolean;
  onClose: () => void;
  demande: DemandeRGPD | null;
  onSuccess: () => void;
}

const EditDemandeRGPDModal = ({ isOpen, onClose, demande, onSuccess }: EditDemandeRGPDModalProps) => {
  const { toast } = useToast();
  const [statut, setStatut] = useState("");

  const traiterDemandeMutation = useTraiterDemandeRGPD();

  useEffect(() => {
    if (demande) {
      setStatut(demande.Statut);
    }
  }, [demande]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!demande) return;

    try {
      await traiterDemandeMutation.mutateAsync({
        demandeId: demande.IDDemandeRGPD,
        statut: statut,
        traitePar: 1 // TODO: Utiliser l'ID de l'utilisateur connecté
      });

      toast({
        title: "Demande mise à jour",
        description: "Le statut de la demande a été modifié avec succès"
      });

      onSuccess();
      onClose();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de modifier la demande",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Modifier la demande RGPD</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Utilisateur</label>
            <p className="text-sm text-gray-600">{demande?.user_nom} ({demande?.user_email})</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Type de demande</label>
            <p className="text-sm text-gray-600">{demande?.TypeDemande}</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Statut</label>
            <Select value={statut} onValueChange={setStatut}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="En attente">En attente</SelectItem>
                <SelectItem value="En cours">En cours</SelectItem>
                <SelectItem value="Traité">Traité</SelectItem>
                <SelectItem value="Refusé">Refusé</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={traiterDemandeMutation.isPending}>
              {traiterDemandeMutation.isPending ? "Modification..." : "Modifier"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDemandeRGPDModal;
