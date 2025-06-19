
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface AddPrestationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddPrestationModal = ({ isOpen, onClose, onSuccess }: AddPrestationModalProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    domaineId: "",
    tarifIndicatif: ""
  });

  // Récupérer les domaines
  const { data: domaines = [] } = useQuery({
    queryKey: ['domaines'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Domaine')
        .select('IDDomaine, DomaineTitre')
        .order('DomaineTitre');
      
      if (error) throw error;
      return data;
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('Prestation')
        .insert({
          Titre: formData.titre,
          Description: formData.description,
          IDDomaine: parseInt(formData.domaineId),
          TarifIndicatif: parseFloat(formData.tarifIndicatif),
          DateCreation: new Date().toISOString().split('T')[0]
        });

      if (error) throw error;

      toast({
        title: "Prestation créée",
        description: "La prestation a été créée avec succès"
      });

      onSuccess();
      onClose();
      setFormData({
        titre: "",
        description: "",
        domaineId: "",
        tarifIndicatif: ""
      });
    } catch (error) {
      console.error('Erreur lors de la création de la prestation:', error);
      toast({
        title: "Erreur",
        description: "Impossible de créer la prestation",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Ajouter une prestation</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Titre de la prestation</label>
            <Input
              value={formData.titre}
              onChange={(e) => setFormData(prev => ({ ...prev, titre: e.target.value }))}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Domaine</label>
            <Select value={formData.domaineId} onValueChange={(value) => setFormData(prev => ({ ...prev, domaineId: value }))}>
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

          <div>
            <label className="block text-sm font-medium mb-1">Tarif indicatif (€)</label>
            <Input
              type="number"
              step="0.01"
              value={formData.tarifIndicatif}
              onChange={(e) => setFormData(prev => ({ ...prev, tarifIndicatif: e.target.value }))}
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Création..." : "Créer"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPrestationModal;
