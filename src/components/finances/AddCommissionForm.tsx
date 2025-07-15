
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Props {
    onClose: () => void;
    onSuccess: () => void;
}

export const AddCommissionForm = ({ onClose, onSuccess }: Props) => {
    const [montant, setMontant] = useState("");
    const [moyenVersement, setMoyenVersement] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!montant || !moyenVersement) return;

        setLoading(true);
        const { error } = await supabase.from("VersementCommissions").insert({
            MontantCommission: parseFloat(montant),
            DateVersement: new Date().toISOString().split("T")[0],
            MoyenVersement: moyenVersement,
        });

        setLoading(false);
        if (error) {
            toast.error("Erreur : " + error.message);
        } else {
            toast.success("Commission ajoutée.");
            onSuccess();
            onClose();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label>Montant</Label>
                <Input type="number" value={montant} onChange={(e) => setMontant(e.target.value)} required />
            </div>
            <div>
                <Label>Moyen de versement</Label>
                <select
                    value={moyenVersement}
                    onChange={(e) => setMoyenVersement(e.target.value)}
                    className="w-full border border-slate-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                >
                    <option value="">-- Choisir --</option>
                    <option value="Virement bancaire">Virement bancaire</option>
                    <option value="Chèque">Chèque</option>
                    <option value="Espèces">Espèces</option>
                    <option value="Paypal">Paypal</option>
                    <option value="Carte bancaire">Carte bancaire</option>
                </select>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                    Annuler
                </Button>
                <Button type="submit" disabled={loading}>
                    {loading ? "Ajout..." : "Ajouter commission"}
                </Button>
            </div>
        </form>
    );
};
