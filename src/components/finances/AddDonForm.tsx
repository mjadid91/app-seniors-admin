// src/components/finances/forms/AddDonForm.tsx
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Props {
    onClose: () => void;
    onSuccess: () => void;
}

const AddDonForm = ({ onClose, onSuccess }: Props) => {
    const [utilisateurId, setUtilisateurId] = useState("");
    const [montant, setMontant] = useState("");
    const [cagnotteId, setCagnotteId] = useState("");
    const [users, setUsers] = useState<any[]>([]);
    const [cagnottes, setCagnottes] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            const { data: uData } = await supabase
                .from("Utilisateurs")
                .select("IDUtilisateurs, Nom, Prenom, Email");
            if (uData) setUsers(uData);

            const { data: cData } = await supabase
                .from("CagnotteDeces")
                .select("IDCagnotteDeces, Titre");
            if (cData) setCagnottes(cData);
        };
        loadData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!utilisateurId || !montant || !cagnotteId) return;

        setLoading(true);
        const { error } = await supabase.from("DonCagnotte").insert({
            IDDonateur: parseInt(utilisateurId),
            Montant: parseFloat(montant),
            IDCagnotteDeces: parseInt(cagnotteId),
            DateDon: new Date().toISOString().split("T")[0],
            MessageDon: "Don administrateur"
        });

        setLoading(false);
        if (error) {
            toast.error("Erreur lors de l'ajout : " + error.message);
        } else {
            toast.success("Don ajouté avec succès !");
            onSuccess();
            onClose();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label>Donateur</Label>
                <select
                    value={utilisateurId}
                    onChange={(e) => setUtilisateurId(e.target.value)}
                    required
                    className="w-full border rounded px-3 py-2"
                >
                    <option value="">-- Sélectionner --</option>
                    {users.map((u) => (
                        <option key={u.IDUtilisateurs} value={u.IDUtilisateurs}>
                            {u.Prenom} {u.Nom} ({u.Email})
                        </option>
                    ))}
                </select>
            </div>

            <div className="space-y-2">
                <Label>Cagnotte</Label>
                <select
                    value={cagnotteId}
                    onChange={(e) => setCagnotteId(e.target.value)}
                    required
                    className="w-full border rounded px-3 py-2"
                >
                    <option value="">-- Sélectionner --</option>
                    {cagnottes.map((c) => (
                        <option key={c.IDCagnotteDeces} value={c.IDCagnotteDeces}>
                            {c.Titre}
                        </option>
                    ))}
                </select>
            </div>

            <div className="space-y-2">
                <Label>Montant (€)</Label>
                <Input
                    type="number"
                    step="0.01"
                    value={montant}
                    onChange={(e) => setMontant(e.target.value)}
                    required
                />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Ajout..." : "Ajouter"}
            </Button>
        </form>
    );
};

export default AddDonForm;
