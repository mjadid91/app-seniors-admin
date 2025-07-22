

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface AddGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddGroupModal = ({ isOpen, onClose, onSuccess }: AddGroupModalProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    createur: ""
  });

  // Récupérer la liste des utilisateurs
  const { data: utilisateurs = [] } = useQuery({
    queryKey: ['utilisateurs-list'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Utilisateurs')
        .select('IDUtilisateurs, Nom, Prenom')
        .order('Nom');
      
      if (error) throw error;
      return data;
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.titre || !formData.description || !formData.createur) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('Groupe')
        .insert({
          Titre: formData.titre,
          Description: formData.description,
          DateCreation: new Date().toISOString().split('T')[0],
          IDUtilisateursCreateur: parseInt(formData.createur)
        })
        .select()
        .single();

      if (error) throw error;

      // Invalider les queries liées aux groupes
      queryClient.invalidateQueries({ queryKey: ['groups-list'] });
      queryClient.invalidateQueries({ queryKey: ['group-stats'] });
      queryClient.invalidateQueries({ queryKey: ['groupes'] });

      toast({
        title: "Groupe créé",
        description: `Le groupe "${formData.titre}" a été créé avec succès`
      });

      onSuccess();
      onClose();
      
      // Réinitialiser le formulaire
      setFormData({
        titre: "",
        description: "",
        createur: ""
      });
    } catch (error: any) {
      console.error('Erreur lors de la création du groupe:', error);
      toast({
        title: "Erreur",
        description: "Impossible de créer le groupe",
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
          <DialogTitle>Ajouter un groupe</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Titre du groupe</label>
            <Input
              value={formData.titre}
              onChange={(e) => setFormData(prev => ({ ...prev, titre: e.target.value }))}
              placeholder="Nom du groupe"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Description du groupe"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Créateur</label>
            <Select value={formData.createur} onValueChange={(value) => setFormData(prev => ({ ...prev, createur: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un utilisateur" />
              </SelectTrigger>
              <SelectContent>
                {utilisateurs.map((user) => (
                  <SelectItem key={user.IDUtilisateurs} value={user.IDUtilisateurs.toString()}>
                    {user.Prenom} {user.Nom}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Création..." : "Créer le groupe"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddGroupModal;

