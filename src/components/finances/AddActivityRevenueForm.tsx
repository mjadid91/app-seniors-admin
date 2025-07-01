import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Props {
    onClose: () => void;
    onSuccess: () => void;
}

const AddActivityRevenueForm = ({ onClose, onSuccess }: Props) => {
    const [utilisateurId, setUtilisateurId] = useState("");
    const [montant, setMontant] = useState("");
    const [activiteId, setActiviteId] = useState("");
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<any[]>([]);
    const [activites, setActivites] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data: usersData } = await supabase
                .from("Utilisateurs")
                .select("IDUtilisateurs, Prenom, Nom, Email");
            if (usersData) setUsers(usersData);

            const { data: activiteData } = await supabase
                .from("ActiviteRemuneree")
                .select("IDActiviteRemuneree, DescriptionActivite");
            if (activiteData) setActivites(activiteData);
        };

        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!utilisateurId || !montant || !activiteId) {
            toast.error("Veuillez remplir tous les champs.");
            return;
        }

        setLoading(true);

        const { error } = await supabase.from("ActiviteRemuneree_Utilisateurs").insert({
            IDUtilisateurs: parseInt(utilisateurId),
            IDActiviteRemuneree: parseInt(activiteId),
            MontantRevenu: parseFloat(montant),
            DateTransaction: new Date().toISOString().split("T")[0],
            StatutPaiement: "En attente"
        });

        setLoading(false);

        if (error) {
            toast.error("Erreur : " + error.message);
        } else {
            toast.success("Transaction enregistrée !");
            onSuccess();
            onClose();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label>Utilisateur</Label>
                <select
                    value={utilisateurId}
                    onChange={(e) => setUtilisateurId(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                    <option value="">-- Sélectionner --</option>
                    {users.map((user) => (
                        <option key={user.IDUtilisateurs} value={user.IDUtilisateurs}>
                            {user.Prenom} {user.Nom} ({user.Email})
                        </option>
                    ))}
                </select>
            </div>

            <div className="space-y-2">
                <Label>Activité</Label>
                <select
                    value={activiteId}
                    onChange={(e) => setActiviteId(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                    <option value="">-- Sélectionner --</option>
                    {activites.map((a) => (
                        <option key={a.IDActiviteRemuneree} value={a.IDActiviteRemuneree}>
                            {a.DescriptionActivite}
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
                {loading ? "Ajout en cours..." : "Ajouter"}
            </Button>
        </form>
    );
};

export default AddActivityRevenueForm;
