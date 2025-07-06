
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Props {
    onClose: () => void;
    onSuccess: (newCagnotte: any) => void;
}

export const AddCagnotteForm = ({ onClose, onSuccess }: Props) => {
    const [titre, setTitre] = useState("");
    const [description, setDescription] = useState("");
    const [dateCloture, setDateCloture] = useState("");
    const [idSeniors, setIdSeniors] = useState("");
    const [seniors, setSeniors] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSeniors = async () => {
            try {
                // Récupérer tous les seniors avec leurs informations utilisateur
                // En spécifiant explicitement quelle relation utiliser
                const { data: seniorsData, error } = await supabase
                    .from("Seniors")
                    .select(`
                        IDSeniors,
                        IDUtilisateurSenior,
                        Utilisateurs!Seniors_IDUtilisateurSenior_fkey (
                            Nom,
                            Prenom
                        )
                    `);

                if (error) {
                    console.error("Erreur lors de la récupération des seniors:", error);
                    toast.error("Erreur lors du chargement des seniors");
                    return;
                }

                if (seniorsData) {
                    console.log("Seniors récupérés:", seniorsData);
                    setSeniors(seniorsData);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des seniors:", error);
                toast.error("Erreur lors du chargement des seniors");
            }
        };
        fetchSeniors();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!titre || !description || !dateCloture) return;

        setLoading(true);
        const { data, error } = await supabase.from("CagnotteDeces").insert({
            Titre: titre,
            Description: description,
            DateCloture: dateCloture,
            IDSeniors: idSeniors ? parseInt(idSeniors) : null,
            Statut: "Ouverte",
            DateOuverture: new Date().toISOString().split("T")[0],
            MontantTotal: 0
        }).select();

        setLoading(false);
        if (error) {
            toast.error("Erreur : " + error.message);
        } else {
            toast.success("Cagnotte créée avec succès.");
            onSuccess(data[0]);
            onClose();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label>Titre</Label>
                <Input 
                    value={titre} 
                    onChange={(e) => setTitre(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <Label>Description</Label>
                <Textarea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <Label>Date de clôture</Label>
                <Input 
                    type="date"
                    value={dateCloture} 
                    onChange={(e) => setDateCloture(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <Label>Senior (optionnel)</Label>
                <select
                    value={idSeniors}
                    onChange={(e) => setIdSeniors(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white z-50"
                >
                    <option value="">-- Aucun senior spécifique --</option>
                    {seniors.map((senior) => (
                        <option key={senior.IDSeniors} value={senior.IDSeniors}>
                            {senior.Utilisateurs?.Prenom} {senior.Utilisateurs?.Nom}
                        </option>
                    ))}
                </select>
                {seniors.length === 0 && (
                    <p className="text-sm text-gray-500 mt-1">
                        Aucun senior trouvé. Vérifiez que des seniors sont enregistrés dans le système.
                    </p>
                )}
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Création..." : "Créer la cagnotte"}
            </Button>
        </form>
    );
};
