
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
    const [moyenPaiement, setMoyenPaiement] = useState("");
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    // Options statiques pour les moyens de paiement
    const moyensPaiementOptions = [
        "Carte bancaire",
        "Virement bancaire", 
        "Chèque",
        "PayPal",
        "Espèces"
    ];

    useEffect(() => {
        const fetchUsers = async () => {
            const { data: usersData } = await supabase
                .from("Utilisateurs")
                .select("IDUtilisateurs, Nom, Prenom");
            if (usersData) setUsers(usersData);
        };
        fetchUsers();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!utilisateurId || !montant || !typeCommande) return;

        setLoading(true);
        
        try {
            let moyenPaiementId = null;

            // Si un moyen de paiement est sélectionné, créer l'enregistrement
            if (moyenPaiement) {
                const { data: moyenPaiementData, error: moyenPaiementError } = await supabase
                    .from("MoyenPaiement")
                    .insert({
                        MoyenPaiement: moyenPaiement,
                        DatePaiement: new Date().toISOString()
                    })
                    .select()
                    .single();

                if (moyenPaiementError) {
                    toast.error("Erreur lors de la création du moyen de paiement : " + moyenPaiementError.message);
                    setLoading(false);
                    return;
                }

                moyenPaiementId = moyenPaiementData.IDMoyenPaiement;
            }

            // Créer la commande
            const { error: commandeError } = await supabase.from("Commande").insert({
                IDUtilisateurPayeur: parseInt(utilisateurId),
                MontantTotal: parseFloat(montant),
                DateCommande: new Date().toISOString().split("T")[0],
                StatutCommande: "En cours",
                TypeCommande: typeCommande,
                IDMoyenPaiement: moyenPaiementId,
            });

            if (commandeError) {
                toast.error("Erreur : " + commandeError.message);
            } else {
                toast.success("Commande ajoutée avec succès.");
                onSuccess();
                onClose();
            }
        } catch (error) {
            toast.error("Erreur inattendue : " + error);
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label>Utilisateur</Label>
                <select
                    value={utilisateurId}
                    onChange={(e) => setUtilisateurId(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white z-50"
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
                    className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white z-50"
                    required
                >
                    <option value="">-- Choisir --</option>
                    <option value="Prestation">Prestation</option>
                    <option value="Produit">Produit</option>
                    <option value="Autre">Autre</option>
                </select>
            </div>
            <div>
                <Label>Moyen de paiement (optionnel)</Label>
                <select
                    value={moyenPaiement}
                    onChange={(e) => setMoyenPaiement(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white z-50"
                >
                    <option value="">-- Optionnel --</option>
                    {moyensPaiementOptions.map((moyen) => (
                        <option key={moyen} value={moyen}>
                            {moyen}
                        </option>
                    ))}
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
                {loading ? "Ajout..." : "Ajouter commande"}
            </Button>
        </form>
    );
};
