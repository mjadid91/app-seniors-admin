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
    const [typeCommande, setTypeCommande] = useState("");
    const [moyenPaiementId, setMoyenPaiementId] = useState("");
    const [users, setUsers] = useState<any[]>([]);
    const [moyensPaiement, setMoyensPaiement] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const { data: usersData } = await supabase
                .from("Utilisateurs")
                .select("IDUtilisateurs, Nom, Prenom");
            if (usersData) setUsers(usersData);

            const { data: moyensData } = await supabase
                .from("MoyenPaiement")
                .select("IDMoyenPaiement, MoyenPaiement");
            if (moyensData) setMoyensPaiement(moyensData);
        };
        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!utilisateurId || !montant || !typeCommande) return;

        setLoading(true);
        const { error } = await supabase.from("Commande").insert({
            IDUtilisateurPayeur: parseInt(utilisateurId),
            MontantTotal: parseFloat(montant),
            DateCommande: new Date().toISOString().split("T")[0],
            StatutCommande: "En cours",
            TypeCommande: typeCommande,
            IDMoyenPaiement: moyenPaiementId ? parseInt(moyenPaiementId) : null,
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
                <Label>Type de commande</Label>
                <select
                    value={typeCommande}
                    onChange={(e) => setTypeCommande(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    required
                >
                    <option value="">-- Choisir --</option>
                    <option value="Prestation">Prestation</option>
                    <option value="Produit">Produit</option>
                    <option value="Autre">Autre</option>
                </select>
            </div>
            <div>
                <Label>Moyen de paiement</Label>
                <select
                    value={moyenPaiementId}
                    onChange={(e) => setMoyenPaiementId(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                >
                    <option value="">-- Optionnel --</option>
                    {moyensPaiement.map((m) => (
                        <option key={m.IDMoyenPaiement} value={m.IDMoyenPaiement}>
                            {m.MoyenPaiement}
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
