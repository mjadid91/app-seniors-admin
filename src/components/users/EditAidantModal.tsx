
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Aidant } from "../../types/seniors";
import { useToast } from "@/hooks/use-toast";

interface EditAidantModalProps {
  isOpen: boolean;
  onClose: () => void;
  aidant: Aidant | null;
  onSave: (aidant: Aidant) => void;
}

const EditAidantModal = ({ isOpen, onClose, aidant, onSave }: EditAidantModalProps) => {
  const [formData, setFormData] = useState<Partial<Aidant>>({});
  const { toast } = useToast();

  useEffect(() => {
    if (aidant) {
      setFormData(aidant);
    }
  }, [aidant]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!aidant || !formData.nom?.trim() || !formData.prenom?.trim() || !formData.email?.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    const updatedAidant: Aidant = {
      ...aidant,
      ...formData,
      nom: formData.nom!.trim(),
      prenom: formData.prenom!.trim(),
      email: formData.email!.trim(),
      tarifHoraire: Number(formData.tarifHoraire) || 0,
    };

    onSave(updatedAidant);
    onClose();
    
    toast({
      title: "Aidant modifié",
      description: `Les informations de ${updatedAidant.prenom} ${updatedAidant.nom} ont été mises à jour.`,
    });
  };

  const handleChange = (field: keyof Aidant, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!aidant) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Modifier l'aidant</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nom">Nom *</Label>
              <Input
                id="nom"
                value={formData.nom || ''}
                onChange={(e) => handleChange('nom', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="prenom">Prénom *</Label>
              <Input
                id="prenom"
                value={formData.prenom || ''}
                onChange={(e) => handleChange('prenom', e.target.value)}
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="telephone">Téléphone</Label>
              <Input
                id="telephone"
                value={formData.telephone || ''}
                onChange={(e) => handleChange('telephone', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="genre">Genre</Label>
              <Select 
                value={formData.genre || ''} 
                onValueChange={(value) => handleChange('genre', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Homme">Homme</SelectItem>
                  <SelectItem value="Femme">Femme</SelectItem>
                  <SelectItem value="Autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tarifHoraire">Tarif horaire (€)</Label>
              <Input
                id="tarifHoraire"
                type="number"
                min="0"
                step="0.01"
                value={formData.tarifHoraire || 0}
                onChange={(e) => handleChange('tarifHoraire', Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="statut">Statut</Label>
              <Select 
                value={formData.statut || 'actif'} 
                onValueChange={(value) => handleChange('statut', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="actif">Actif</SelectItem>
                  <SelectItem value="inactif">Inactif</SelectItem>
                  <SelectItem value="en_attente">En attente</SelectItem>
                  <SelectItem value="suspendu">Suspendu</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="ville">Ville</Label>
            <Input
              id="ville"
              value={formData.ville || ''}
              onChange={(e) => handleChange('ville', e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="experience">Expérience</Label>
            <Textarea
              id="experience"
              value={formData.experience || ''}
              onChange={(e) => handleChange('experience', e.target.value)}
              placeholder="Décrivez l'expérience de l'aidant..."
              rows={3}
            />
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">
              Enregistrer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAidantModal;
