
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

const AddDonForm = ({ onClose, onSuccess }: Props) => {
    const [donateurId, setDonateurId] = useState("");
    const [montant, setMontant] = useState("");
    const [cagnotteId, setCagnotteId] = useState("");
    const [messageDon, setMessageDon] = useState("");
    const [users, setUsers] = useState<any[]>([]);
    const [cagnottes, setCagnottes] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            // Récupérer les utilisateurs
            const { data: usersData } = await supabase
                .from("Utilisateurs")
                .select("IDUtilisateurs, Prenom, Nom, Email");
            if (usersData) setUsers(usersData);

            // Récupérer les cagnottes ouvertes
            const { data: cagnottesData } = await supabase
                .from("CagnotteDeces")
                .select("IDCagnotteDeces, Titre, Statut")
                .in("Statut", ["ouverte", "en cours"]);
            if (cagnottesData) setCagnottes(cagnottesData);
        };

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
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label>Donateur</Label>
                <select
                    value={donateurId}
                    onChange={(e) => setDonateurId(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
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
                <Label>Cagnotte</Label>
                <select
                    value={cagnotteId}
                    onChange={(e) => setCagnotteId(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    required
                >
                    <option value="">-- Choisir une cagnotte --</option>
                    {cagnottes.map((cagnotte) => (
                        <option key={cagnotte.IDCagnotteDeces} value={cagnotte.IDCagnotteDeces}>
                            {cagnotte.Titre} ({cagnotte.Statut})
                        </option>
                    ))}
                </select>
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
            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Enregistrement..." : "Enregistrer le don"}
            </Button>
        </form>
    );
};

export default AddDonForm;
