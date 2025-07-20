
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import AddCagnotteModal from "./AddCagnotteModal";

interface Props {
    onClose: () => void;
    onSuccess: () => void;
}

const AddDonForm = ({ onClose, onSuccess }: Props) => {
    const [donateurId, setDonateurId] = useState("");
    const [montant, setMontant] = useState("");
    const [cagnotteId, setCagnotteId] = useState("");
    const [messageDon, setMessageDon] = useState("");
    const [users, setUsers] = useState<any[]>([]);
    const [cagnottes, setCagnottes] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [showAddCagnotte, setShowAddCagnotte] = useState(false);

    const fetchData = async () => {
        try {
            // Récupérer les utilisateurs
            const { data: usersData, error: usersError } = await supabase
                .from("Utilisateurs")
                .select("IDUtilisateurs, Prenom, Nom, Email");
            
            if (usersError) {
                console.error("Erreur lors du chargement des utilisateurs:", usersError);
            } else {
                setUsers(usersData || []);
            }

            // Récupérer les cagnottes ouvertes
            console.log("Récupération des cagnottes...");
            const { data: cagnottesData, error: cagnottesError } = await supabase
                .from("CagnotteDeces")
                .select("IDCagnotteDeces, Titre, Statut, DateOuverture, DateCloture")
                .in("Statut", ["ouverte", "en cours", "Ouverte", "En cours"])
                .order("DateOuverture", { ascending: false });
            
            console.log("Données cagnottes récupérées:", cagnottesData);
            console.log("Erreur cagnottes:", cagnottesError);
            
            if (cagnottesError) {
                console.error("Erreur lors du chargement des cagnottes:", cagnottesError);
            } else {
                setCagnottes(cagnottesData || []);
                console.log("Cagnottes définies:", cagnottesData);
            }
        } catch (error) {
            console.error("Erreur générale:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!donateurId || !montant || !cagnotteId) return;

        setLoading(true);
        const { error } = await supabase.from("DonCagnotte").insert({
            IDDonateur: parseInt(donateurId),
            IDCagnotteDeces: parseInt(cagnotteId),
            Montant: parseInt(montant),
            DateDon: new Date().toISOString().split("T")[0],
            MessageDon: messageDon || "Don sans message"
        });

        setLoading(false);
        if (error) {
            toast.error("Erreur : " + error.message);
        } else {
            toast.success("Don enregistré avec succès !");
            onSuccess();
            onClose();
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label>Donateur</Label>
                    <select
                        value={donateurId}
                        onChange={(e) => setDonateurId(e.target.value)}
                        className="w-full border border-slate-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                    >
                        <option value="">-- Choisir un donateur --</option>
                        {users.map((user) => (
                            <option key={user.IDUtilisateurs} value={user.IDUtilisateurs}>
                                {user.Prenom} {user.Nom} ({user.Email})
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <Label>Cagnotte</Label>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setShowAddCagnotte(true)}
                            className="h-8 px-3"
                        >
                            <Plus className="h-4 w-4 mr-1" />
                            Nouvelle
                        </Button>
                    </div>
                    <select
                        value={cagnotteId}
                        onChange={(e) => setCagnotteId(e.target.value)}
                        className="w-full border border-slate-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                    >
                        <option value="">-- Choisir une cagnotte --</option>
                        {cagnottes.map((cagnotte) => (
                            <option key={cagnotte.IDCagnotteDeces} value={cagnotte.IDCagnotteDeces}>
                                {cagnotte.Titre} ({cagnotte.Statut})
                            </option>
                        ))}
                    </select>
                    {cagnottes.length === 0 && (
                        <p className="text-sm text-muted-foreground mt-1">
                            Aucune cagnotte disponible. Créez-en une nouvelle.
                        </p>
                    )}
                </div>
                <div>
                    <Label>Montant (€)</Label>
                    <Input
                        type="number"
                        min="1"
                        value={montant}
                        onChange={(e) => setMontant(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <Label>Message (optionnel)</Label>
                    <Input
                        type="text"
                        value={messageDon}
                        onChange={(e) => setMessageDon(e.target.value)}
                        placeholder="Message d'accompagnement du don"
                    />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                    <Button type="button" variant="outline" onClick={onClose}>
                        Annuler
                    </Button>
                    <Button type="submit" disabled={loading}>
                        {loading ? "Enregistrement..." : "Enregistrer le don"}
                    </Button>
                </div>
            </form>

            <AddCagnotteModal
                isOpen={showAddCagnotte}
                onClose={() => setShowAddCagnotte(false)}
                onSuccess={() => {
                    fetchData(); // Recharger les cagnottes
                    setShowAddCagnotte(false);
                }}
            />
        </>
    );
};

export default AddDonForm;
