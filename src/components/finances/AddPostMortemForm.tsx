
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

export const AddPostMortemForm = ({ onClose, onSuccess }: Props) => {
    const [prestataireId, setPrestataireId] = useState("");
    const [montant, setMontant] = useState("");
    const [prestataires, setPrestataires] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPrestataires = async () => {
            // Essayer d'abord Partenaire, puis Organisme si vide
            const { data: partenaireData } = await supabase
                .from("Partenaire")
                .select("IDPartenaire, RaisonSociale");
            
            if (partenaireData && partenaireData.length > 0) {
                const formattedData = partenaireData.map(p => ({
                    id: p.IDPartenaire,
                    nom: p.RaisonSociale
                }));
                setPrestataires(formattedData);
            } else {
                const { data: orgData } = await supabase
                    .from("Organisme")
                    .select("IDOrganisme, Nom");
                
                if (orgData) {
                    const formattedData = orgData.map(o => ({
                        id: o.IDOrganisme,
                        nom: o.Nom
                    }));
                    setPrestataires(formattedData);
                }
            }
        };
        fetchPrestataires();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prestataireId || !montant) return;

        const selectedPrestataire = prestataires.find(p => p.id.toString() === prestataireId);
        
        setLoading(true);
        try {
            const { error } = await supabase.from("ServicePostMortem").insert({
                NomService: "Service post-mortem",
                Description: "Service post-mortem ajouté manuellement",
                MontantPrestation: montant,
                DateService: new Date().toISOString().split("T")[0],
                Prestataire: selectedPrestataire?.nom || "",
                StatutService: "En attente"
            });

            if (error) {
                console.error("Erreur insertion ServicePostMortem:", error);
                toast.error("Erreur : " + error.message);
            } else {
                toast.success("Service post-mortem ajouté.");
                onSuccess();
                onClose();
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout:", error);
            toast.error("Erreur lors de l'ajout du service");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label>Prestataire</Label>
                <select
                    value={prestataireId}
                    onChange={(e) => setPrestataireId(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    required
                >
                    <option value="">-- Choisir un prestataire --</option>
                    {prestataires.map((p) => (
                        <option key={p.id} value={p.id}>
                            {p.nom}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <Label>Montant</Label>
                <Input type="number" value={montant} onChange={(e) => setMontant(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Ajout..." : "Ajouter service"}
            </Button>
        </form>
    );
};
