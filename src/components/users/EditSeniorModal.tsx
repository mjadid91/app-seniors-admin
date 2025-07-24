
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Senior } from "../../types/seniors";
import { useToast } from "@/hooks/use-toast";

interface EditSeniorModalProps {
  isOpen: boolean;
  onClose: () => void;
  senior: Senior | null;
  onSave: (senior: Senior) => void;
}

const EditSeniorModal = ({ isOpen, onClose, senior, onSave }: EditSeniorModalProps) => {
  const [formData, setFormData] = useState<Partial<Senior>>({});
  const { toast } = useToast();

  useEffect(() => {
    if (senior) {
      setFormData(senior);
    }
  }, [senior]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!senior || !formData.nom?.trim() || !formData.prenom?.trim() || !formData.email?.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    const updatedSenior: Senior = {
      ...senior,
      ...formData,
      nom: formData.nom!.trim(),
      prenom: formData.prenom!.trim(),
      email: formData.email!.trim(),
    };

    onSave(updatedSenior);
    onClose();
    
    toast({
      title: "Senior modifié",
      description: `Les informations de ${updatedSenior.prenom} ${updatedSenior.nom} ont été mises à jour.`,
    });
  };

  const handleChange = (field: keyof Senior, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!senior) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modifier le senior</DialogTitle>
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
          
          <div>
            <Label htmlFor="telephone">Téléphone</Label>
            <Input
              id="telephone"
              value={formData.telephone || ''}
              onChange={(e) => handleChange('telephone', e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="adresse">Adresse</Label>
            <Input
              id="adresse"
              value={formData.adresse || ''}
              onChange={(e) => handleChange('adresse', e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="niveauAutonomie">Niveau d'autonomie</Label>
            <Select 
              value={formData.niveauAutonomie || 'moyen'} 
              onValueChange={(value) => handleChange('niveauAutonomie', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="faible">Faible</SelectItem>
                <SelectItem value="moyen">Moyen</SelectItem>
                <SelectItem value="eleve">Élevé</SelectItem>
              </SelectContent>
            </Select>
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
                <SelectItem value="suspendu">Suspendu</SelectItem>
              </SelectContent>
            </Select>
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

export default EditSeniorModal;
