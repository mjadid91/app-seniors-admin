
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface DeleteTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: any;
  onTransactionDeleted: () => void;
}

const DeleteTransactionModal = ({ isOpen, onClose, transaction, onTransactionDeleted }: DeleteTransactionModalProps) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!transaction) return;

    setLoading(true);
    
    try {
      let deleteResult;
      
      // Déterminer quelle table utiliser selon le type
      if (transaction.type === "Commande") {
        deleteResult = await supabase
          .from("Commande")
          .delete()
          .eq("IDCommande", transaction.id);
      } else if (transaction.type === "Activite") {
        deleteResult = await supabase
          .from("ActiviteRemuneree_Utilisateurs")
          .delete()
          .eq("IDActiviteRemuneree", transaction.id);
      } else if (transaction.type === "PostMortem") {
        deleteResult = await supabase
          .from("ServicePostMortem")
          .delete()
          .eq("IDServicePostMortem", transaction.id);
      }

      if (deleteResult?.error) throw deleteResult.error;

      toast.success("Transaction supprimée avec succès");
      onTransactionDeleted();
      onClose();
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast.error("Erreur lors de la suppression de la transaction");
    } finally {
      setLoading(false);
    }
  };

  if (!transaction) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Confirmer la suppression
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p>Êtes-vous sûr de vouloir supprimer cette transaction ?</p>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <p><strong>Type :</strong> {transaction.type}</p>
            <p><strong>Montant :</strong> {transaction.montant?.toFixed(2)} €</p>
            <p><strong>Utilisateur :</strong> {transaction.utilisateur}</p>
            <p><strong>Date :</strong> {transaction.date}</p>
          </div>
          
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
            <p className="text-red-800 text-sm">
              <strong>Attention :</strong> Cette action est irréversible. La transaction et sa commission associée seront définitivement supprimées.
            </p>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete} 
              disabled={loading}
            >
              {loading ? "Suppression..." : "Supprimer"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTransactionModal;
