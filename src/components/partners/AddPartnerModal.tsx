
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Partner } from "./types";

interface AddPartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPartner: (partner: Omit<Partner, 'id'>) => void;
}

const AddPartnerModal = ({ isOpen, onClose, onAddPartner }: AddPartnerModalProps) => {
  const [formData, setFormData] = useState({
    nom: "",
    type: "",
    email: "",
    telephone: "",
    adresse: "",
    statut: "En attente",
    services: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const partnerTypes = ["Prestataire de services", "Aide à domicile", "Support technique", "Santé", "Transport"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const newPartner: Omit<Partner, 'id'> = {
        ...formData,
        evaluation: 0,
        services: formData.services.split(',').map(s => s.trim()).filter(s => s.length > 0),
        dateInscription: new Date().toISOString().split('T')[0]
      };

      onAddPartner(newPartner);
      
      toast({
        title: "Partenaire ajouté",
        description: `${formData.nom} a été ajouté avec succès.`,
      });

      setFormData({
        nom: "",
        type: "",
        email: "",
        telephone: "",
        adresse: "",
        statut: "En attente",
        services: ""
      });
      onClose();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le partenaire.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nouveau partenaire</DialogTitle>
          <DialogDescription>
            Ajoutez un nouveau partenaire à la plateforme.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nom">Nom du partenaire</Label>
            <Input
              id="nom"
              value={formData.nom}
              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un type" />
              </SelectTrigger>
              <SelectContent>
                {partnerTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telephone">Téléphone</Label>
              <Input
                id="telephone"
                value={formData.telephone}
                onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="adresse">Adresse</Label>
            <Input
              id="adresse"
              value={formData.adresse}
              onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="services">Services (séparés par des virgules)</Label>
            <Textarea
              id="services"
              value={formData.services}
              onChange={(e) => setFormData({ ...formData, services: e.target.value })}
              placeholder="Ex: Ménage, Jardinage, Bricolage"
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="statut">Statut</Label>
            <Select value={formData.statut} onValueChange={(value) => setFormData({ ...formData, statut: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="En attente">En attente</SelectItem>
                <SelectItem value="Actif">Actif</SelectItem>
                <SelectItem value="Suspendu">Suspendu</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Ajout..." : "Ajouter"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPartnerModal;
