
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
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            const { data: usersData } = await supabase
                .from("Utilisateurs")
                .select("IDUtilisateurs, Prenom, Nom, Email");
            if (usersData) setUsers(usersData);
        };
        fetchUsers();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!utilisateurId || !montant || !typeCommande) return;

        setLoading(true);

        try {
            // D'abord créer un moyen de paiement unique
            const moyenPaiementId = Date.now(); // Utiliser timestamp pour éviter les doublons
            const { data: moyenPaiement, error: moyenError } = await supabase
                .from("MoyenPaiement")
                .insert({
                    MoyenPaiement: `Commande-${moyenPaiementId}`,
                    DatePaiement: new Date().toISOString()
                })
                .select()
                .single();

            if (moyenError) {
                console.error("Erreur moyen de paiement:", moyenError);
                throw moyenError;
            }

            // Ensuite créer la commande
            const { data: commande, error: commandeError } = await supabase
                .from("Commande")
                .insert({
                    IDUtilisateurPayeur: parseInt(utilisateurId),
                    MontantTotal: parseFloat(montant),
                    DateCommande: new Date().toISOString().split("T")[0],
                    StatutCommande: "En attente",
                    TypeCommande: typeCommande,
                    IDMoyenPaiement: moyenPaiement.IDMoyenPaiement
                })
                .select()
                .single();

            if (commandeError) {
                console.error("Erreur commande:", commandeError);
                throw commandeError;
            }

            toast.success("Commande créée avec succès !");
            onSuccess();
            onClose();
        } catch (error: any) {
            console.error("Erreur lors de la création:", error);
            toast.error("Erreur : " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label>Utilisateur payeur</Label>
                <select
                    value={utilisateurId}
                    onChange={(e) => setUtilisateurId(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    required
                >
                    <option value="">-- Choisir un utilisateur --</option>
                    {users.map((user) => (
                        <option key={user.IDUtilisateurs} value={user.IDUtilisateurs}>
                            {user.Prenom} {user.Nom} ({user.Email})
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
                    <option value="">-- Choisir un type --</option>
                    <option value="Produit">Produit</option>
                    <option value="Service">Service</option>
                    <option value="Prestation">Prestation</option>
                    <option value="Autre">Autre</option>
                </select>
            </div>
            <div>
                <Label>Montant (€)</Label>
                <Input
                    type="number"
                    step="0.01"
                    value={montant}
                    onChange={(e) => setMontant(e.target.value)}
                    required
                />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Création..." : "Créer la commande"}
            </Button>
        </form>
    );
};
