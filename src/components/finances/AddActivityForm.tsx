
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
    onClose: () => void;
    onSuccess: (newActivity: any) => void;
}

export const AddActivityForm = ({ onClose, onSuccess }: Props) => {
    const [descriptionActivite, setDescriptionActivite] = useState("");
    const [typeActiviteRemuneree, setTypeActiviteRemuneree] = useState("");
    const [tarifHoraire, setTarifHoraire] = useState("");
    const [disponibilite, setDisponibilite] = useState("");
    const [statutActiviteRemuneree, setStatutActiviteRemuneree] = useState("Disponible");
    const [idSeniors, setIdSeniors] = useState("");
    const [seniors, setSeniors] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSeniors = async () => {
            const { data, error } = await supabase
                .from("Seniors")
                .select(`
                    IDSeniors,
                    IDUtilisateurSenior,
                    Utilisateurs:IDUtilisateurSenior(Nom, Prenom)
                `);
            
            if (error) {
                console.error("Erreur lors du chargement des seniors:", error);
            } else {
                setSeniors(data || []);
            }
        };
        
        fetchSeniors();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!descriptionActivite || !typeActiviteRemuneree || !tarifHoraire || !disponibilite || !idSeniors) return;

        setLoading(true);
        const { data, error } = await supabase.from("ActiviteRemuneree").insert({
            DescriptionActivite: descriptionActivite,
            TypeActiviteRemuneree: typeActiviteRemuneree,
            TarifHoraire: parseFloat(tarifHoraire),
            Disponibilite: disponibilite,
            StatutActiviteRemuneree: statutActiviteRemuneree,
            DateCreationActivite: new Date().toISOString().split("T")[0],
            IDSeniors: parseInt(idSeniors),
        }).select();

        setLoading(false);
        if (error) {
            toast.error("Erreur : " + error.message);
        } else {
            toast.success("Activité ajoutée avec succès.");
            onSuccess(data[0]);
            onClose();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label>Senior concerné</Label>
                <Select value={idSeniors} onValueChange={setIdSeniors} required>
                    <SelectTrigger>
                        <SelectValue placeholder="-- Sélectionner un senior --" />
                    </SelectTrigger>
                    <SelectContent>
                        {seniors.map((senior) => (
                            <SelectItem key={senior.IDSeniors} value={senior.IDSeniors.toString()}>
                                {senior.Utilisateurs?.Nom} {senior.Utilisateurs?.Prenom}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label>Description de l'activité</Label>
                <Input 
                    value={descriptionActivite} 
                    onChange={(e) => setDescriptionActivite(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <Label>Type d'activité</Label>
                <select
                    value={typeActiviteRemuneree}
                    onChange={(e) => setTypeActiviteRemuneree(e.target.value)}
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                >
                    <option value="">-- Sélectionner --</option>
                    <option value="Service à domicile">Service à domicile</option>
                    <option value="Accompagnement">Accompagnement</option>
                    <option value="Formation">Formation</option>
                    <option value="Conseil">Conseil</option>
                    <option value="Autre">Autre</option>
                </select>
            </div>
            <div>
                <Label>Tarif horaire (€)</Label>
                <Input 
                    type="number" 
                    step="0.01"
                    value={tarifHoraire} 
                    onChange={(e) => setTarifHoraire(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <Label>Disponibilité</Label>
                <Input 
                    type="date"
                    value={disponibilite} 
                    onChange={(e) => setDisponibilite(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <Label>Statut</Label>
                <select
                    value={statutActiviteRemuneree}
                    onChange={(e) => setStatutActiviteRemuneree(e.target.value)}
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                >
                    <option value="Disponible">Disponible</option>
                    <option value="Indisponible">Indisponible</option>
                    <option value="En cours">En cours</option>
                </select>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                    Annuler
                </Button>
                <Button type="submit" disabled={loading}>
                    {loading ? "Ajout..." : "Ajouter l'activité"}
                </Button>
            </div>
        </form>
    );
};
