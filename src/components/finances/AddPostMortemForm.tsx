
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Props {
    onClose: () => void;
    onSuccess: () => void;
}

interface Utilisateur {
    IDUtilisateurs: number;
    Nom: string;
    Prenom: string;
}

interface Cagnotte {
    IDCagnotteDeces: number;
    Titre: string;
}

export const AddPostMortemForm = ({ onClose, onSuccess }: Props) => {
    const [formData, setFormData] = useState({
        nomService: "",
        description: "",
        montantPrestation: "",
        dateService: new Date().toISOString().split('T')[0],
        prestataire: "",
        idCreateur: "",
        idCagnotteDeces: ""
    });
    const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([]);
    const [cagnottes, setCagnottes] = useState<Cagnotte[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            // Récupérer les utilisateurs Aidant et Admin (IDCatUtilisateur 4 et 5)
            const { data: utilisateursData } = await supabase
                .from("Utilisateurs")
                .select("IDUtilisateurs, Nom, Prenom, IDCatUtilisateurs")
                .in("IDCatUtilisateurs", [4, 5]);
            
            if (utilisateursData) {
                setUtilisateurs(utilisateursData);
            }

            // Récupérer les cagnottes disponibles
            const { data: cagnottesData } = await supabase
                .from("CagnotteDeces")
                .select("IDCagnotteDeces, Titre")
                .in("Statut", ["Ouverte", "En cours"]);
            
            if (cagnottesData) {
                setCagnottes(cagnottesData);
            }
        };
        
        fetchData();
    }, []);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.nomService || !formData.description || !formData.montantPrestation || 
            !formData.dateService || !formData.prestataire || !formData.idCreateur) {
            toast.error("Veuillez remplir tous les champs obligatoires");
            return;
        }

        setLoading(true);
        try {
            const insertData: any = {
                NomService: formData.nomService,
                Description: formData.description,
                MontantPrestation: parseFloat(formData.montantPrestation),
                DateService: formData.dateService,
                Prestataire: formData.prestataire,
                StatutService: "En attente",
                IDCreateur: parseInt(formData.idCreateur)
            };

            // Ajouter IDCagnotteDeces seulement s'il est sélectionné
            if (formData.idCagnotteDeces) {
                insertData.IDCagnotteDeces = parseInt(formData.idCagnotteDeces);
            }

            const { error } = await supabase
                .from("ServicePostMortem")
                .insert(insertData);

            if (error) {
                console.error("Erreur insertion ServicePostMortem:", error);
                toast.error("Erreur : " + error.message);
            } else {
                toast.success("Service post-mortem ajouté avec succès");
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
                <Label htmlFor="nomService">Nom du service *</Label>
                <Input
                    id="nomService"
                    value={formData.nomService}
                    onChange={(e) => handleInputChange("nomService", e.target.value)}
                    placeholder="Ex: Crémation, Inhumation..."
                    maxLength={50}
                    required
                />
            </div>

            <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Description du service"
                    maxLength={50}
                    required
                    className="resize-none h-20"
                />
            </div>

            <div>
                <Label htmlFor="montantPrestation">Montant de la prestation (€) *</Label>
                <Input
                    id="montantPrestation"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.montantPrestation}
                    onChange={(e) => handleInputChange("montantPrestation", e.target.value)}
                    required
                />
            </div>

            <div>
                <Label htmlFor="dateService">Date du service *</Label>
                <Input
                    id="dateService"
                    type="date"
                    value={formData.dateService}
                    onChange={(e) => handleInputChange("dateService", e.target.value)}
                    required
                />
            </div>

            <div>
                <Label htmlFor="prestataire">Prestataire *</Label>
                <Input
                    id="prestataire"
                    value={formData.prestataire}
                    onChange={(e) => handleInputChange("prestataire", e.target.value)}
                    placeholder="Nom du prestataire"
                    maxLength={50}
                    required
                />
            </div>

            <div>
                <Label htmlFor="idCreateur">Créateur *</Label>
                <select
                    id="idCreateur"
                    value={formData.idCreateur}
                    onChange={(e) => handleInputChange("idCreateur", e.target.value)}
                    className="w-full border border-input bg-background px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    required
                >
                    <option value="">-- Sélectionner un créateur --</option>
                    {utilisateurs.map((user) => (
                        <option key={user.IDUtilisateurs} value={user.IDUtilisateurs}>
                            {user.Prenom} {user.Nom}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <Label htmlFor="idCagnotteDeces">Cagnotte associée (optionnel)</Label>
                <select
                    id="idCagnotteDeces"
                    value={formData.idCagnotteDeces}
                    onChange={(e) => handleInputChange("idCagnotteDeces", e.target.value)}
                    className="w-full border border-input bg-background px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                >
                    <option value="">-- Aucune cagnotte --</option>
                    {cagnottes.map((cagnotte) => (
                        <option key={cagnotte.IDCagnotteDeces} value={cagnotte.IDCagnotteDeces}>
                            {cagnotte.Titre}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                    Annuler
                </Button>
                <Button type="submit" disabled={loading}>
                    {loading ? "Ajout en cours..." : "Ajouter le service"}
                </Button>
            </div>
        </form>
    );
};
