
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { Partner } from "./types";

interface EditPartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  partner: Partner | null;
  onEditPartner: (partner: Partner) => void;
}

const EditPartnerModal = ({ isOpen, onClose, partner, onEditPartner }: EditPartnerModalProps) => {
  const [formData, setFormData] = useState({
    raisonSociale: '',
    email: '',
    telephone: '',
    adresse: '',
  });

  useEffect(() => {
    if (partner) {
      setFormData({
        raisonSociale: partner.raisonSociale || partner.nom || '',
        email: partner.email || '',
        telephone: partner.telephone || '',
        adresse: partner.adresse || '',
      });
    }
  }, [partner]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partner) return;

    const updatedPartner: Partner = {
      ...partner,
      raisonSociale: formData.raisonSociale,
      nom: formData.raisonSociale, // Mettre à jour aussi le nom
      email: formData.email,
      telephone: formData.telephone,
      adresse: formData.adresse,
    };

    onEditPartner(updatedPartner);
    onClose();
  };

  const handleClose = () => {
    onClose();
    setFormData({
      raisonSociale: '',
      email: '',
      telephone: '',
      adresse: '',
    });
  };

  if (!partner) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Modifier le partenaire</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="raisonSociale">Raison sociale *</Label>
            <Input
              id="raisonSociale"
              type="text"
              value={formData.raisonSociale}
              onChange={(e) => setFormData({ ...formData, raisonSociale: e.target.value })}
              placeholder="Nom de l'entreprise"
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="contact@entreprise.com"
              required
            />
          </div>

          <div>
            <Label htmlFor="telephone">Téléphone *</Label>
            <Input
              id="telephone"
              type="tel"
              value={formData.telephone}
              onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
              placeholder="01 23 45 67 89"
              required
            />
          </div>

          <div>
            <Label htmlFor="adresse">Adresse</Label>
            <Textarea
              id="adresse"
              value={formData.adresse}
              onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
              placeholder="Adresse complète du partenaire"
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Annuler
            </Button>
            <Button type="submit">
              Modifier
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPartnerModal;
