
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { Partner } from "./types";

interface DeletePartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  partner: Partner | null;
  onDeletePartner: (id: number) => void;
}

const DeletePartnerModal = ({ isOpen, onClose, partner, onDeletePartner }: DeletePartnerModalProps) => {
  const handleDelete = () => {
    if (partner) {
      onDeletePartner(partner.id);
      onClose();
    }
  };

  if (!partner) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Supprimer le partenaire
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800 mb-2">
              <strong>Attention :</strong> Cette action est irréversible.
            </p>
            <p className="text-sm text-red-700">
              La suppression de ce partenaire entraînera également la suppression de :
            </p>
            <ul className="text-sm text-red-700 mt-2 list-disc list-inside">
              <li>Tous les bons plans associés</li>
              <li>Les services proposés</li>
              <li>L'historique des relations</li>
            </ul>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg">
            <h4 className="font-medium text-slate-800 mb-2">Partenaire à supprimer :</h4>
            <div className="space-y-1 text-sm text-slate-600">
              <p><strong>Nom :</strong> {partner.raisonSociale}</p>
              <p><strong>Email :</strong> {partner.email}</p>
              <p><strong>Téléphone :</strong> {partner.telephone}</p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Supprimer définitivement
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePartnerModal;
