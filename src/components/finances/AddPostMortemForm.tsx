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

export const AddPostMortemForm = ({ onClose, onSuccess }: Props) => {
    const [prestataire, setPrestataire] = useState("");
    const [montant, setMontant] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prestataire || !montant) return;

        setLoading(true);
        const { error } = await supabase.from("ServicePostMortem").insert({
            NomService: "Service post-mortem",
            Description: "Ajout manuel",
            MontantUtilise: montant,
            DateService: new Date().toISOString().split("T")[0],
            Prestataire: prestataire,
        });

        setLoading(false);
        if (error) {
            toast.error("Erreur : " + error.message);
        } else {
            toast.success("Service post-mortem ajouté.");
            onSuccess();
            onClose();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label>Prestataire</Label>
                <Input value={prestataire} onChange={(e) => setPrestataire(e.target.value)} required />
            </div>
            <div>
                <Label>Montant</Label>
                <Input type="number" value={montant} onChange={(e) => setMontant(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Ajout..." : "Ajouter service"}
            </Button>
        </form>
    );
};
