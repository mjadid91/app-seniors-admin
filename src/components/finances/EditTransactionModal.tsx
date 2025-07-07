
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface EditTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: any;
  onTransactionUpdated: () => void;
}

const EditTransactionModal = ({ isOpen, onClose, transaction, onTransactionUpdated }: EditTransactionModalProps) => {
  const [formData, setFormData] = useState({
    montant: 0,
    statut: "",
    moyenPaiement: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (transaction) {
      setFormData({
        montant: transaction.montant || 0,
        statut: transaction.statut || "",
        moyenPaiement: transaction.moyenPaiement || ""
      });
    }
  }, [transaction]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transaction) return;

    setLoading(true);
    
    try {
      let updateResult;
      
      // Déterminer quelle table mettre à jour selon le type
      if (transaction.type === "Commande") {
        updateResult = await supabase
          .from("Commande")
          .update({
            MontantTotal: formData.montant,
            StatutCommande: formData.statut
          })
          .eq("IDCommande", transaction.id);
      } else if (transaction.type === "Activite") {
        updateResult = await supabase
          .from("ActiviteRemuneree_Utilisateurs")
          .update({
            MontantRevenu: formData.montant,
            StatutPaiement: formData.statut
          })
          .eq("IDActiviteRemuneree", transaction.id);
      } else if (transaction.type === "PostMortem") {
        updateResult = await supabase
          .from("ServicePostMortem")
          .update({
            MontantUtilise: formData.montant.toString(),
            StatutService: formData.statut
          })
          .eq("IDServicePostMortem", transaction.id);
      }

      if (updateResult?.error) throw updateResult.error;

      toast.success("Transaction mise à jour avec succès");
      onTransactionUpdated();
      onClose();
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      toast.error("Erreur lors de la mise à jour de la transaction");
    } finally {
      setLoading(false);
    }
  };

  if (!transaction) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier la transaction</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="montant">Montant (€)</Label>
            <Input
              id="montant"
              type="number"
              step="0.01"
              value={formData.montant}
              onChange={(e) => setFormData(prev => ({ ...prev, montant: parseFloat(e.target.value) }))}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="statut">Statut</Label>
            <Select
              value={formData.statut}
              onValueChange={(value) => setFormData(prev => ({ ...prev, statut: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="En attente">En attente</SelectItem>
                <SelectItem value="Payé">Payé</SelectItem>
                <SelectItem value="Annulé">Annulé</SelectItem>
                <SelectItem value="Remboursé">Remboursé</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Mise à jour..." : "Mettre à jour"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTransactionModal;
