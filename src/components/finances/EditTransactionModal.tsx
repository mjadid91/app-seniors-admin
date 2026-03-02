
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface EditTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: any;
  onTransactionUpdated: () => void;
}

const EditTransactionModal = ({ isOpen, onClose, transaction, onTransactionUpdated }: EditTransactionModalProps) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    montant: "",
    statut: "",
    moyenPaiement: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (transaction) {
      setFormData({
        montant: transaction.montant?.toString() || "",
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
      const montantValue = parseFloat(formData.montant);

      // 💡 Astuce de dev : toujours logger l'objet exact pour vérifier ses clés
      console.log("Payload transaction reçu :", transaction);

      if (transaction.type === "Commande") {
        // On utilise les bonnes clés issues de ta vue (snake_case)
        const targetId = transaction.id_commande || transaction.original_id;

        updateResult = await supabase
            .from("Commande")
            .update({
              MontantTotal: montantValue,
              StatutCommande: formData.statut
            })
            .eq("IDCommande", targetId);

      } else if (transaction.type === "Activité rémunérée") {
        const targetActId = transaction.id_activite_remuneree || transaction.original_id;
        const targetUserId = transaction.id_utilisateurs; // Indispensable !

        updateResult = await supabase
            .from("ActiviteRemuneree_Utilisateurs")
            .update({
              MontantRevenu: montantValue,
              StatutPaiement: formData.statut
            })
            // On cible précisément CETTE transaction pour CET utilisateur
            .eq("IDActiviteRemuneree", targetActId)
            .eq("IDUtilisateurs", targetUserId);

      } else if (transaction.type === "Service post-mortem") {
        const targetId = transaction.id_service_post_mortem || transaction.original_id;

        updateResult = await supabase
            .from("ServicePostMortem")
            .update({
              MontantPrestation: montantValue,
              StatutService: formData.statut
            })
            .eq("IDServicePostMortem", targetId);

      } else if (transaction.type === "Don cagnotte") {
        const targetId = transaction.id_don_cagnotte || transaction.original_id;

        updateResult = await supabase
            .from("DonCagnotte")
            .update({
              Montant: montantValue
            })
            .eq("IDDonCagnotte", targetId);
      }

      // Gestion de l'erreur Supabase (très important pour le debug !)
      if (updateResult?.error) {
        console.error("Erreur SQL Supabase :", updateResult.error);
        throw new Error(updateResult.error.message);
      }

      toast.success("Transaction mise à jour avec succès");

      // Invalidation du cache : excellente pratique !
      // Cela va forcer le front-end (Seniors Admin) à refetcher la vue modifiée.
      // Invalider les caches React Query pour mise à jour automatique
      queryClient.invalidateQueries({ queryKey: ["finances-transactions"] });
      queryClient.invalidateQueries({ queryKey: ["commission-rates"] });
      queryClient.invalidateQueries({ queryKey: ["total-commissions-count"] });
      queryClient.invalidateQueries({ queryKey: ["total-commissions-amount"] });

      onTransactionUpdated();
      onClose();
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      toast.error("Échec de la mise à jour en base de données.");
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
              onChange={(e) => setFormData(prev => ({ ...prev, montant: e.target.value }))}
              required
            />
          </div>
          
          {/* Ne pas afficher le champ statut pour les dons cagnotte */}
          {transaction.type !== "Don cagnotte" && (
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
                  <SelectItem value="Validé">Validé</SelectItem>
                  <SelectItem value="Annulé">Annulé</SelectItem>
                  <SelectItem value="Remboursé">Remboursé</SelectItem>
                  <SelectItem value="En cours">En cours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

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
