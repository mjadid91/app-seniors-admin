
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface BonPlan {
  id: number;
  titre: string;
  partenaire: string;
  description: string;
  typeReduction: string;
  valeurReduction: number; // Renommé pour cohérence
  dateDebutReduction: string;
  dateFinReduction: string;
  codePromo: string;
  statut: string;
  // Champs système cohérents
  dateCreation?: string;
  dateMiseAJour?: string;
  creePar?: string;
}

interface EditBonPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  bonPlan: BonPlan | null;
  onEditBonPlan: (bonPlan: BonPlan) => void;
  partenaires: { id: number; name: string }[];
}

const EditBonPlanModal = ({ isOpen, onClose, bonPlan, onEditBonPlan, partenaires }: EditBonPlanModalProps) => {
  const [formData, setFormData] = useState({
    id: 0,
    titre: "",
    partenaire: "",
    description: "",
    typeReduction: "pourcentage",
    valeurReduction: 0,
    dateDebutReduction: "",
    dateFinReduction: "",
    codePromo: "",
    statut: "Actif"
  });

  const { toast } = useToast();

  useEffect(() => {
    if (bonPlan) {
      setFormData(bonPlan);
    }
  }, [bonPlan]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.titre || !formData.partenaire || !formData.description) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    onEditBonPlan(formData);
    toast({
      title: "Bon plan modifié",
      description: `Le bon plan "${formData.titre}" a été mis à jour avec succès.`
    });
    onClose();
  };

  if (!bonPlan) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Modifier le bon plan</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="titre">Titre du bon plan *</Label>
              <Input
                id="titre"
                value={formData.titre}
                onChange={(e) => setFormData(prev => ({ ...prev, titre: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="partenaire">Partenaire *</Label>
              <Select 
                value={formData.partenaire} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, partenaire: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {partenaires.map(partenaire => (
                    <SelectItem key={partenaire.id} value={partenaire.name}>
                      {partenaire.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="typeReduction">Type de réduction</Label>
              <Select 
                value={formData.typeReduction} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, typeReduction: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pourcentage">Pourcentage</SelectItem>
                  <SelectItem value="montant">Montant fixe</SelectItem>
                  <SelectItem value="gratuit">Gratuit</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="valeurReduction">
                {formData.typeReduction === 'pourcentage' ? 'Pourcentage (%)' : 'Montant (€)'}
              </Label>
              <Input
                id="valeurReduction"
                type="number"
                value={formData.valeurReduction}
                onChange={(e) => setFormData(prev => ({ ...prev, valeurReduction: Number(e.target.value) }))}
                min="0"
                max={formData.typeReduction === 'pourcentage' ? "100" : undefined}
              />
            </div>

            <div>
              <Label htmlFor="statut">Statut</Label>
              <Select 
                value={formData.statut} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, statut: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Actif">Actif</SelectItem>
                  <SelectItem value="Inactif">Inactif</SelectItem>
                  <SelectItem value="Expiré">Expiré</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="codePromo">Code promo</Label>
              <Input
                id="codePromo"
                value={formData.codePromo}
                onChange={(e) => setFormData(prev => ({ ...prev, codePromo: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dateDebutReduction">Date de début</Label>
              <Input
                id="dateDebutReduction"
                type="date"
                value={formData.dateDebutReduction}
                onChange={(e) => setFormData(prev => ({ ...prev, dateDebutReduction: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="dateFinReduction">Date de fin</Label>
              <Input
                id="dateFinReduction"
                type="date"
                value={formData.dateFinReduction}
                onChange={(e) => setFormData(prev => ({ ...prev, dateFinReduction: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              Enregistrer les modifications
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBonPlanModal;
