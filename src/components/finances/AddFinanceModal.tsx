
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const AddFinanceModal = ({ isOpen, onClose }: Props) => {
    const [type, setType] = useState("don");
    const [montant, setMontant] = useState("");
    const [utilisateurId, setUtilisateurId] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAdd = async () => {
        if (!montant || !utilisateurId) return;

        setLoading(true);
        try {
            const date = new Date().toISOString().split("T")[0];

            if (type === "don") {
                const { error } = await supabase.from("DonCagnotte").insert({
                    Montant: parseFloat(montant),
                    DateDon: date,
                    IDDonateur: parseInt(utilisateurId),
                    MessageDon: "Ajout manuel",
                    IDCagnotteDeces: 1,
                });
                if (error) throw error;
            } else if (type === "commande") {
                const { error } = await supabase.from("Commande").insert({
                    MontantTotal: parseFloat(montant),
                    DateCommande: date,
                    StatutCommande: "Validée",
                    IDUtilisateurPayeur: parseInt(utilisateurId),
                });
                if (error) throw error;
            } else if (type === "commission") {
                const { error } = await supabase.from("VersementCommissions").insert({
                    MontantCommission: parseFloat(montant),
                    DateVersement: date,
                    MoyenVersement: "manuel",
                });
                if (error) throw error;
            }

            onClose();
        } catch (err) {
            console.error("Erreur d'ajout :", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Ajouter une transaction</DialogTitle>
                    <DialogDescription>
                        Insérez un don, une commande ou une commission.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <Label>Type</Label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="don">Don</option>
                            <option value="commande">Commande</option>
                            <option value="commission">Commission</option>
                        </select>
                    </div>

                    {(type === "don" || type === "commande") && (
                        <div>
                            <Label>ID Utilisateur</Label>
                            <Input
                                type="number"
                                value={utilisateurId}
                                onChange={(e) => setUtilisateurId(e.target.value)}
                            />
                        </div>
                    )}

                    <div>
                        <Label>Montant (€)</Label>
                        <Input
                            type="number"
                            value={montant}
                            onChange={(e) => setMontant(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={onClose}>Annuler</Button>
                        <Button disabled={loading} onClick={handleAdd}>
                            {loading ? "Ajout..." : "Ajouter"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AddFinanceModal;
