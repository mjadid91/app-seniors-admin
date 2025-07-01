import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Props {
    onClose: () => void;
    onSuccess: () => void;
}

export const AddCommandeForm = ({ onClose, onSuccess }: Props) => {
    const [utilisateurId, setUtilisateurId] = useState("");
    const [montant, setMontant] = useState("");
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        supabase
            .from("Utilisateurs")
            .select("IDUtilisateurs, Nom, Prenom")
            .then(({ data }) => setUsers(data || []));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!utilisateurId || !montant) return;

        setLoading(true);
        const { error } = await supabase.from("Commande").insert({
            IDUtilisateurPayeur: parseInt(utilisateurId),
            MontantTotal: parseFloat(montant),
            DateCommande: new Date().toISOString().split("T")[0],
            StatutCommande: "En cours",
        });

        setLoading(false);
        if (error) {
            toast.error("Erreur : " + error.message);
        } else {
            toast.success("Commande ajoutée.");
            onSuccess();
            onClose();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label>Utilisateur</Label>
                <select
                    value={utilisateurId}
                    onChange={(e) => setUtilisateurId(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    required
                >
                    <option value="">-- Choisir --</option>
                    {users.map((u) => (
                        <option key={u.IDUtilisateurs} value={u.IDUtilisateurs}>
                            {u.Prenom} {u.Nom}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <Label>Montant</Label>
                <Input type="number" value={montant} onChange={(e) => setMontant(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Ajout..." : "Ajouter commande"}
            </Button>
        </form>
    );
};
