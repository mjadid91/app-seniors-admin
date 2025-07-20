import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AddCagnotteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface Senior {
  IDSeniors: number;
  Utilisateurs: {
    Nom: string;
    Prenom: string;
  };
}

const AddCagnotteModal = ({ isOpen, onClose, onSuccess }: AddCagnotteModalProps) => {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [dateOuverture, setDateOuverture] = useState("");
  const [dateCloture, setDateCloture] = useState("");
  const [seniorId, setSeniorId] = useState("");
  const [seniors, setSeniors] = useState<Senior[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSeniors = async () => {
      const { data, error } = await supabase
        .from("Seniors")
        .select(`
          IDSeniors,
          Utilisateurs!Seniors_IDUtilisateurSenior_fkey (
            Nom,
            Prenom
          )
        `);
      
      if (error) {
        console.error("Erreur lors du chargement des seniors:", error);
      } else {
        setSeniors(data || []);
      }
    };

    if (isOpen) {
      fetchSeniors();
      // Initialiser les dates par défaut
      const today = new Date().toISOString().split('T')[0];
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      setDateOuverture(today);
      setDateCloture(nextMonth.toISOString().split('T')[0]);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!titre.trim() || !description.trim() || !dateOuverture || !dateCloture) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    if (new Date(dateCloture) <= new Date(dateOuverture)) {
      toast.error("La date de clôture doit être postérieure à la date d'ouverture");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from("CagnotteDeces")
        .insert({
          Titre: titre.trim(),
          Description: description.trim(),
          DateOuverture: dateOuverture,
          DateCloture: dateCloture,
          IDSeniors: seniorId ? parseInt(seniorId) : null,
          MontantTotal: 0,
          Statut: "ouverte"
        });

      if (error) {
        console.error("Erreur lors de la création de la cagnotte:", error);
        toast.error("Erreur lors de la création de la cagnotte");
      } else {
        toast.success("Cagnotte créée avec succès !");
        resetForm();
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitre("");
    setDescription("");
    setDateOuverture("");
    setDateCloture("");
    setSeniorId("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Créer une nouvelle cagnotte</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="titre">Titre *</Label>
            <Input
              id="titre"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              placeholder="Titre de la cagnotte"
              maxLength={50}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description de la cagnotte"
              maxLength={255}
              rows={3}
              required
            />
          </div>

          <div>
            <Label htmlFor="dateOuverture">Date d'ouverture *</Label>
            <Input
              id="dateOuverture"
              type="date"
              value={dateOuverture}
              onChange={(e) => setDateOuverture(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="dateCloture">Date de clôture *</Label>
            <Input
              id="dateCloture"
              type="date"
              value={dateCloture}
              onChange={(e) => setDateCloture(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="senior">Senior concerné</Label>
            <Select value={seniorId} onValueChange={setSeniorId}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un senior (optionnel)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Aucun senior spécifique</SelectItem>
                {seniors.map((senior) => (
                  <SelectItem 
                    key={senior.IDSeniors} 
                    value={senior.IDSeniors.toString()}
                  >
                    {senior.Utilisateurs?.Prenom} {senior.Utilisateurs?.Nom}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Création..." : "Créer la cagnotte"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCagnotteModal;