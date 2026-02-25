import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// ✅ CORRECTION 1 : Définition des types pour l'activité et les seniors
export interface ActiviteRemuneree {
    IDActiviteRemuneree?: number;
    DescriptionActivite: string;
    TypeActiviteRemuneree: string;
    TarifHoraire: number;
    Disponibilite: string;
    StatutActiviteRemuneree: string;
    DateCreationActivite: string;
    IDSeniors: number;
    [key: string]: unknown;
}

export interface SeniorOption {
    IDSeniors: number;
    IDUtilisateurSenior: number;
    Utilisateurs?: {
        Nom: string;
        Prenom: string;
    } | null;
}

interface Props {
    onClose: () => void;
    // ✅ CORRECTION 2 : On utilise notre nouvelle interface au lieu de "any"
    onSuccess: (newActivity: ActiviteRemuneree) => void;
}

export const AddActivityForm = ({ onClose, onSuccess }: Props) => {
    const [descriptionActivite, setDescriptionActivite] = useState("");
    const [typeActiviteRemuneree, setTypeActiviteRemuneree] = useState("");
    const [tarifHoraire, setTarifHoraire] = useState("");
    const [disponibilite, setDisponibilite] = useState("");
    const [statutActiviteRemuneree, setStatutActiviteRemuneree] = useState("Disponible");
    const [idSeniors, setIdSeniors] = useState("");

    // ✅ CORRECTION 3 : Typage du state des seniors
    const [seniors, setSeniors] = useState<SeniorOption[]>([]);
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
                // On s'assure que TypeScript comprend la forme des données
                setSeniors((data as unknown as SeniorOption[]) || []);
            }
        };

        fetchSeniors();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!descriptionActivite || !typeActiviteRemuneree || !tarifHoraire || !disponibilite || !idSeniors) {
            toast.error("Veuillez remplir tous les champs obligatoires.");
            return;
        }

        setLoading(true);
        const { data, error } = await supabase.from("ActiviteRemuneree").insert({
            DescriptionActivite: descriptionActivite,
            TypeActiviteRemuneree: typeActiviteRemuneree,
            TarifHoraire: parseFloat(tarifHoraire),
            Disponibilite: disponibilite,
            StatutActiviteRemuneree: statutActiviteRemuneree,
            DateCreationActivite: new Date().toISOString(),
            IDSeniors: parseInt(idSeniors),
        }).select();

        setLoading(false);
        if (error) {
            toast.error("Erreur : " + error.message);
        } else if (data && data.length > 0) {
            toast.success("Activité ajoutée avec succès.");
            // On convertit le retour pour qu'il matche l'interface
            onSuccess(data[0] as unknown as ActiviteRemuneree);
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
                <Select value={typeActiviteRemuneree} onValueChange={setTypeActiviteRemuneree} required>
                    <SelectTrigger>
                        <SelectValue placeholder="-- Sélectionner un type --" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Service à domicile">Service à domicile</SelectItem>
                        <SelectItem value="Accompagnement">Accompagnement</SelectItem>
                        <SelectItem value="Formation">Formation</SelectItem>
                        <SelectItem value="Conseil">Conseil</SelectItem>
                        <SelectItem value="Autre">Autre</SelectItem>
                    </SelectContent>
                </Select>
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
                <Select value={statutActiviteRemuneree} onValueChange={setStatutActiviteRemuneree} required>
                    <SelectTrigger>
                        <SelectValue placeholder="-- Sélectionner un statut --" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Disponible">Disponible</SelectItem>
                        <SelectItem value="Indisponible">Indisponible</SelectItem>
                        <SelectItem value="En cours">En cours</SelectItem>
                    </SelectContent>
                </Select>
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