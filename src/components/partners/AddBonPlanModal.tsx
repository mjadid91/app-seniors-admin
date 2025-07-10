
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { BonPlan, PartnerForSelect } from "./types";

interface AddBonPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBonPlan: (bonPlan: Omit<BonPlan, 'id'>) => void;
  partenaires: PartnerForSelect[];
}

const AddBonPlanModal = ({ isOpen, onClose, onAddBonPlan, partenaires }: AddBonPlanModalProps) => {
  const [formData, setFormData] = useState({
    titre: '',
    partenaire: '',
    description: '',
    typeReduction: '',
    valeurReduction: 0,
    dateDebutReduction: '',
    dateFinReduction: '',
    codePromo: '',
    statut: 'Actif',
  });

  // Réinitialiser le pourcentage quand le type de réduction change
  useEffect(() => {
    if (formData.typeReduction === 'gratuit') {
      setFormData(prev => ({ ...prev, valeurReduction: 100 }));
    }
  }, [formData.typeReduction]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const bonPlanData: Omit<BonPlan, 'id'> = {
      ...formData,
      // S'assurer que pour un bon plan gratuit, la valeur est bien 100
      valeurReduction: formData.typeReduction === 'gratuit' ? 100 : formData.valeurReduction,
    };

    onAddBonPlan(bonPlanData);
    handleClose();
  };

  const handleClose = () => {
    onClose();
    setFormData({
      titre: '',
      partenaire: '',
      description: '',
      typeReduction: '',
      valeurReduction: 0,
      dateDebutReduction: '',
      dateFinReduction: '',
      codePromo: '',
      statut: 'Actif',
    });
  };

  const isGratuit = formData.typeReduction === 'gratuit';

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nouveau bon plan</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="titre">Titre *</Label>
              <Input
                id="titre"
                type="text"
                value={formData.titre}
                onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
                placeholder="Titre du bon plan"
                required
              />
            </div>

            <div>
              <Label htmlFor="partenaire">Partenaire *</Label>
              <Select 
                value={formData.partenaire} 
                onValueChange={(value) => setFormData({ ...formData, partenaire: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un partenaire" />
                </SelectTrigger>
                <SelectContent>
                  {partenaires.map((partenaire) => (
                    <SelectItem key={partenaire.id} value={partenaire.name}>
                      {partenaire.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Description du bon plan"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="typeReduction">Type de réduction *</Label>
              <Select 
                value={formData.typeReduction} 
                onValueChange={(value) => setFormData({ ...formData, typeReduction: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Type de réduction" />
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
                {formData.typeReduction === 'pourcentage' || isGratuit ? 'Pourcentage (%)' : 'Montant (€)'} *
              </Label>
              <Input
                id="valeurReduction"
                type="number"
                value={formData.valeurReduction}
                onChange={(e) => setFormData({ ...formData, valeurReduction: Number(e.target.value) })}
                placeholder={isGratuit ? "100" : "0"}
                required
                disabled={isGratuit}
                className={isGratuit ? "bg-gray-100 cursor-not-allowed" : ""}
              />
              {isGratuit && (
                <p className="text-sm text-gray-500 mt-1">
                  Pour un bon plan gratuit, la valeur est automatiquement fixée à 100%
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dateDebutReduction">Date de début *</Label>
              <Input
                id="dateDebutReduction"
                type="date"
                value={formData.dateDebutReduction}
                onChange={(e) => setFormData({ ...formData, dateDebutReduction: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="dateFinReduction">Date de fin *</Label>
              <Input
                id="dateFinReduction"
                type="date"
                value={formData.dateFinReduction}
                onChange={(e) => setFormData({ ...formData, dateFinReduction: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="codePromo">Code promo</Label>
              <Input
                id="codePromo"
                type="text"
                value={formData.codePromo}
                onChange={(e) => setFormData({ ...formData, codePromo: e.target.value })}
                placeholder="CODE2024"
              />
            </div>

            <div>
              <Label htmlFor="statut">Statut</Label>
              <Select 
                value={formData.statut} 
                onValueChange={(value) => setFormData({ ...formData, statut: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Actif">Actif</SelectItem>
                  <SelectItem value="En attente">En attente</SelectItem>
                  <SelectItem value="Expiré">Expiré</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Annuler
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              Créer le bon plan
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBonPlanModal;
