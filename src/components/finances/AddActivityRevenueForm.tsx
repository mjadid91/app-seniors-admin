import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
// ✅ CORRECTION 1 : On importe ton interface fraîchement créée !
import { AddActivityForm, ActiviteRemuneree } from "./AddActivityForm";

interface Props {
    onClose: () => void;
    onSuccess: () => void;
}

// ✅ CORRECTION 2 : Définition des types pour les requêtes Supabase
interface SimpleUser {
    IDUtilisateurs: number;
    Prenom: string;
    Nom: string;
    Email: string;
}

interface SimpleActivity {
    IDActiviteRemuneree: number;
    DescriptionActivite: string;
}

const AddActivityRevenueForm = ({ onClose, onSuccess }: Props) => {
    const [utilisateurId, setUtilisateurId] = useState("");
    const [montant, setMontant] = useState("");
    const [activiteId, setActiviteId] = useState("");
    const [loading, setLoading] = useState(false);

    // ✅ CORRECTION 3 : On remplace les <any[]> par nos interfaces
    const [users, setUsers] = useState<SimpleUser[]>([]);
    const [activites, setActivites] = useState<SimpleActivity[]>([]);

    const [isAddActivityModalOpen, setIsAddActivityModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const { data: usersData } = await supabase
                .from("Utilisateurs")
                .select("IDUtilisateurs, Prenom, Nom, Email");
            if (usersData) setUsers(usersData as SimpleUser[]);

            const { data: activiteData } = await supabase
                .from("ActiviteRemuneree")
                .select("IDActiviteRemuneree, DescriptionActivite");
            if (activiteData) setActivites(activiteData as SimpleActivity[]);
        };

        fetchData();
    }, []);

    const refetchActivites = async () => {
        const { data: activiteData } = await supabase
            .from("ActiviteRemuneree")
            .select("IDActiviteRemuneree, DescriptionActivite");
        if (activiteData) setActivites(activiteData as SimpleActivity[]);
    };

    // ✅ CORRECTION 4 : On type newActivity avec ton interface importée
    const handleAddActivitySuccess = (newActivity: ActiviteRemuneree) => {
        if (newActivity.IDActiviteRemuneree) {
            setActivites(prev => [...prev, {
                IDActiviteRemuneree: newActivity.IDActiviteRemuneree as number,
                DescriptionActivite: newActivity.DescriptionActivite
            }]);
            setActiviteId(newActivity.IDActiviteRemuneree.toString());
        }
    };

    const handleActiviteChange = (value: string) => {
        if (value === "add_new") {
            setIsAddActivityModalOpen(true);
        } else {
            setActiviteId(value);
        }
    };

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
        <>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label>Utilisateur</Label>
                    <select
                        value={utilisateurId}
                        onChange={(e) => setUtilisateurId(e.target.value)}
                        required
                        className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
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
                        onChange={(e) => handleActiviteChange(e.target.value)}
                        required
                        className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        <option value="">-- Sélectionner --</option>
                        {activites.map((a) => (
                            <option key={a.IDActiviteRemuneree} value={a.IDActiviteRemuneree}>
                                {a.DescriptionActivite}
                            </option>
                        ))}
                        <option value="add_new">+ Ajouter une activité</option>
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

                <div className="flex justify-end space-x-3 pt-4">
                    <Button type="button" variant="outline" onClick={onClose}>
                        Annuler
                    </Button>
                    <Button type="submit" disabled={loading}>
                        {loading ? "Ajout en cours..." : "Ajouter"}
                    </Button>
                </div>
            </form>

            <Dialog open={isAddActivityModalOpen} onOpenChange={setIsAddActivityModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Ajouter une nouvelle activité</DialogTitle>
                    </DialogHeader>
                    <AddActivityForm
                        onClose={() => setIsAddActivityModalOpen(false)}
                        onSuccess={handleAddActivitySuccess}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AddActivityRevenueForm;