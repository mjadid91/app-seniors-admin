
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useSupabaseDomaines } from "../../hooks/useSupabaseDomaines";
import type { Prestation } from "./PrestationTable";

interface EditPrestationModalProps {
  isOpen: boolean;
  onClose: () => void;
  prestation: Prestation | null;
  onSuccess: () => void;
}

const EditPrestationModal = ({ isOpen, onClose, prestation, onSuccess }: EditPrestationModalProps) => {
  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    tarif: "",
    domaine: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  // Charger les domaines disponibles
  const { data: domaines = [], isLoading: domainesLoading } = useSupabaseDomaines();

  // Initialiser le formulaire avec les données de la prestation
  useEffect(() => {
    if (prestation && isOpen) {
      console.log("Initializing form with prestation:", prestation);
      
      const initializeForm = async () => {
        // Récupérer les détails complets de la prestation depuis la table Prestation
        const { data: prestationData, error } = await supabase
          .from("Prestation")
          .select("*")
          .eq("IDPrestation", parseInt(prestation.id))
          .single();

        if (error) {
          console.error("Error fetching prestation details:", error);
          toast({
            title: "Erreur",
            description: "Impossible de charger les détails de la prestation",
            variant: "destructive",
          });
          return;
        }

        console.log("Prestation details loaded:", prestationData);

        setFormData({
          titre: prestationData.Titre || prestation.typePrestation,
          description: prestationData.Description || "",
          tarif: prestationData.TarifIndicatif?.toString() || prestation.tarif.toString(),
          domaine: prestationData.IDDomaine?.toString() || "",
        });
      };

      initializeForm();
    }
  }, [prestation, isOpen, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prestation) return;

    setIsLoading(true);
    try {
      const updateData: any = {
        Titre: formData.titre,
        TarifIndicatif: parseFloat(formData.tarif),
        Description: formData.description,
      };

      if (formData.domaine) {
        updateData.IDDomaine = parseInt(formData.domaine);
      } else {
        updateData.IDDomaine = null;
      }

      console.log("Updating prestation with data:", updateData);

      const { error } = await supabase
        .from("Prestation")
        .update(updateData)
        .eq("IDPrestation", parseInt(prestation.id));

      if (error) {
        throw error;
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

          <div className="space-y-2">
            <Label htmlFor="domaine">Domaine</Label>
            <Select 
              value={formData.domaine} 
              onValueChange={(value) => handleInputChange("domaine", value)}
              disabled={domainesLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder={domainesLoading ? "Chargement..." : "Sélectionner un domaine"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Aucun domaine</SelectItem>
                {domaines.map((domaine) => (
                  <SelectItem key={domaine.IDDomaine} value={domaine.IDDomaine.toString()}>
                    {domaine.DomaineTitre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
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
