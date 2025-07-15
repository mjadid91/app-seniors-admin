
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Prestation } from "./PrestationTable";

interface EditPrestationModalProps {
  isOpen: boolean;
  onClose: () => void;
  prestation: Prestation | null;
  onSuccess: () => void;
}

interface Domaine {
  IDDomaine: number;
  DomaineTitre: string;
}

const EditPrestationModal = ({ isOpen, onClose, prestation, onSuccess }: EditPrestationModalProps) => {
  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    tarif: "",
    domaine: "",
    statut: "",
  });
  const [domaines, setDomaines] = useState<Domaine[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Options de statut disponibles
  const statutOptions = [
    { value: "en_attente", label: "En attente" },
    { value: "acceptee", label: "Acceptée" },
    { value: "refusee", label: "Refusée" },
    { value: "en_cours", label: "En cours" },
    { value: "terminee", label: "Terminée" },
    { value: "annulee", label: "Annulée" },
  ];

  // Charger les domaines disponibles
  useEffect(() => {
    const fetchDomaines = async () => {
      const { data, error } = await supabase
          .from("Domaine")
          .select("IDDomaine, DomaineTitre")
          .order("DomaineTitre");

      if (error) {
        console.error("Erreur lors du chargement des domaines:", error);
        return;
      }

      setDomaines(data || []);
    };

    if (isOpen) {
      fetchDomaines();
    }
  }, [isOpen]);

  // Initialiser le formulaire avec les données de la prestation
  useEffect(() => {
    const fetchPrestationDetails = async () => {
      if (prestation && isOpen) {
        // Récupérer les détails de la prestation depuis la table Prestation
        const { data: prestationData, error: prestationError } = await supabase
          .from("Prestation")
          .select("*")
          .eq("IDPrestation", parseInt(prestation.id))
          .single();

        if (prestationError) {
          console.error("Erreur lors du chargement de la prestation:", prestationError);
          return;
        }

        // Récupérer le statut depuis MiseEnRelation
        const { data: miseEnRelationData, error: miseEnRelationError } = await supabase
          .from("MiseEnRelation")
          .select("Statut")
          .eq("IDPrestation", parseInt(prestation.id))
          .single();

        if (miseEnRelationError && miseEnRelationError.code !== 'PGRST116') {
          console.error("Erreur lors du chargement du statut:", miseEnRelationError);
        }

        setFormData({
          titre: prestationData?.Titre || prestation.typePrestation,
          description: prestationData?.Description || "",
          tarif: prestationData?.TarifIndicatif?.toString() || prestation.tarif.toString(),
          domaine: prestationData?.IDDomaine?.toString() || "",
          statut: miseEnRelationData?.Statut || "en_attente",
        });
      }
    };

    fetchPrestationDetails();
  }, [prestation, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prestation) return;

    setIsLoading(true);
    try {
      // Mettre à jour la table Prestation
      const updateData: any = {
        Titre: formData.titre,
        TarifIndicatif: parseFloat(formData.tarif),
      };

      if (formData.description) {
        updateData.Description = formData.description;
      }

      if (formData.domaine) {
        updateData.IDDomaine = parseInt(formData.domaine);
      }

      const { error: prestationError } = await supabase
          .from("Prestation")
          .update(updateData)
          .eq("IDPrestation", parseInt(prestation.id));

      if (prestationError) {
        throw prestationError;
      }

      // Mettre à jour le statut dans MiseEnRelation
      const { error: statutError } = await supabase
        .from("MiseEnRelation")
        .update({ Statut: formData.statut })
        .eq("IDPrestation", parseInt(prestation.id));

      if (statutError) {
        throw statutError;
      }

      toast({
        title: "Succès",
        description: "La prestation a été modifiée avec succès",
      });

      onSuccess();
      onClose();
    } catch (error: any) {
      console.error("Erreur lors de la modification:", error);
      toast({
        title: "Erreur",
        description: "Impossible de modifier la prestation: " + error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Modifier la prestation #{prestation?.id}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="titre">Titre de la prestation *</Label>
                <Input
                    id="titre"
                    value={formData.titre}
                    onChange={(e) => handleInputChange("titre", e.target.value)}
                    placeholder="Ex: Aide ménagère"
                    required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tarif">Tarif indicatif (€) *</Label>
                <Input
                    id="tarif"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.tarif}
                    onChange={(e) => handleInputChange("tarif", e.target.value)}
                    placeholder="0.00"
                    required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="domaine">Domaine</Label>
                <Select value={formData.domaine} onValueChange={(value) => handleInputChange("domaine", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un domaine" />
                  </SelectTrigger>
                  <SelectContent>
                    {domaines.map((domaine) => (
                        <SelectItem key={domaine.IDDomaine} value={domaine.IDDomaine.toString()}>
                          {domaine.DomaineTitre}
                        </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="statut">Statut *</Label>
                <Select value={formData.statut} onValueChange={(value) => handleInputChange("statut", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    {statutOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Description détaillée de la prestation"
                  rows={3}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Annuler
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Modification..." : "Modifier"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
  );
};

export default EditPrestationModal;
