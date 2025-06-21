import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
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
    tarifIndicatif: "",
    seniorId: "",
    aidantId: "",
  });

  const { data: domaines = [] } = useQuery({
    queryKey: ["domaines"],
    queryFn: async () => {
      const { data, error } = await supabase
          .from("Domaine")
          .select("IDDomaine, DomaineTitre")
          .order("DomaineTitre");
      if (error) throw error;
      return data;
    },
  });

  const { data: seniors = [] } = useQuery({
    queryKey: ["seniors"],
    queryFn: async () => {
      const { data, error } = await supabase
          .from("Utilisateurs")
          .select("IDUtilisateurs, Nom, Prenom")
          .eq("IDCatUtilisateurs", 1);
      if (error) throw error;
      return data;
    },
  });

  const { data: aidants = [] } = useQuery({
    queryKey: ["aidants"],
    queryFn: async () => {
      const { data, error } = await supabase
          .from("Utilisateurs")
          .select("IDUtilisateurs, Nom, Prenom")
          .eq("IDCatUtilisateurs", 4);
      if (error) throw error;
      return data;
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data: prestationData, error: prestationError } = await supabase
          .from("Prestation")
          .insert({
            Titre: formData.titre,
            Description: formData.description,
            IDDomaine: parseInt(formData.domaineId),
            TarifIndicatif: parseFloat(formData.tarifIndicatif),
            DateCreation: new Date().toISOString().split("T")[0],
          })
          .select()
          .single();

      if (prestationError || !prestationData) throw prestationError;
      const idPrestation = prestationData.IDPrestation;

      const { data: relationData, error: relationError } = await supabase
          .from("MiseEnRelation")
          .insert({
            IDSeniors: parseInt(formData.seniorId),
            IDAidant: parseInt(formData.aidantId),
            IDPrestation: idPrestation,
            DatePrestation: new Date().toISOString(),
            DatePaiement: new Date().toISOString(),
            DateRefusPaiement: new Date().toISOString(),
            DurePrestation: 1,
            TarifPreste: parseFloat(formData.tarifIndicatif),
            Statut: "en_attente",
          })
          .select()
          .single();

      if (relationError || !relationData) throw relationError;
      const idMiseEnRelation = relationData.IDMiseEnRelation;

      const { error: liaisonError } = await supabase
          .from("MiseEnRelation_Prestation")
          .insert({
            IDPrestation: idPrestation,
            IDMiseEnRelation: idMiseEnRelation,
          });

      if (liaisonError) throw liaisonError;

      toast({
        title: "Prestation créée",
        description: "La prestation et la mise en relation ont été créées avec succès",
      });

      onSuccess();
      onClose();
      setFormData({
        titre: "",
        description: "",
        domaineId: "",
        tarifIndicatif: "",
        seniorId: "",
        aidantId: "",
      });
    } catch (error) {
      console.error("Erreur lors de la création:", error);
      toast({
        title: "Erreur",
        description: "Impossible de créer la prestation",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Ajouter une prestation</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Titre</Label>
              <Input
                  placeholder="Titre de la prestation"
                  value={formData.titre}
                  onChange={(e) => setFormData((prev) => ({ ...prev, titre: e.target.value }))}
                  required
              />
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                  placeholder="Détaillez la prestation"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  required
              />
            </div>

            <div>
              <Label>Domaine</Label>
              <Select value={formData.domaineId} onValueChange={(v) => setFormData((p) => ({ ...p, domaineId: v }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un domaine" />
                </SelectTrigger>
                <SelectContent>
                  {domaines.map((d) => (
                      <SelectItem key={d.IDDomaine} value={d.IDDomaine.toString()}>
                        {d.DomaineTitre}
                      </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Tarif indicatif (€)</Label>
              <Input
                  type="number"
                  step="0.01"
                  placeholder="Ex : 20.00"
                  value={formData.tarifIndicatif}
                  onChange={(e) => setFormData((prev) => ({ ...prev, tarifIndicatif: e.target.value }))}
                  required
              />
            </div>

            <div>
              <Label>Senior concerné</Label>
              <Select value={formData.seniorId} onValueChange={(v) => setFormData((p) => ({ ...p, seniorId: v }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un senior" />
                </SelectTrigger>
                <SelectContent>
                  {seniors.map((s) => (
                      <SelectItem key={s.IDUtilisateurs} value={s.IDUtilisateurs.toString()}>
                        {s.Prenom} {s.Nom}
                      </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Aidant concerné</Label>
              <Select value={formData.aidantId} onValueChange={(v) => setFormData((p) => ({ ...p, aidantId: v }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un aidant" />
                </SelectTrigger>
                <SelectContent>
                  {aidants.map((a) => (
                      <SelectItem key={a.IDUtilisateurs} value={a.IDUtilisateurs.toString()}>
                        {a.Prenom} {a.Nom}
                      </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>Annuler</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Création..." : "Créer la prestation"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
  );
};

export default AddPrestationModal;
