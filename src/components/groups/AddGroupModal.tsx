
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface AddGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddGroupModal = ({ isOpen, onClose, onSuccess }: AddGroupModalProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    createurId: ""
  });

  // Récupérer les utilisateurs
  const { data: utilisateurs = [] } = useQuery({
    queryKey: ['utilisateurs'],
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
    setIsSubmitting(true);

    try {
      // Get the next available ID to avoid conflicts
      const { data: maxIdData, error: maxIdError } = await supabase
        .from('Groupe')
        .select('IDGroupe')
        .order('IDGroupe', { ascending: false })
        .limit(1);

      if (maxIdError) {
        console.error('Error getting max ID:', maxIdError);
      }

      const nextId = maxIdData && maxIdData.length > 0 ? maxIdData[0].IDGroupe + 1 : 1;

      // Créer le groupe
      const { error: groupError } = await supabase
        .from('Groupe')
        .insert({
          IDGroupe: nextId,
          Titre: formData.titre,
          Description: formData.description,
          IDUtilisateursCreateur: parseInt(formData.createurId),
          DateCreation: new Date().toISOString().split('T')[0]
        });

      if (groupError) throw groupError;

      // Ajouter automatiquement le créateur comme membre du groupe
      const { error: memberError } = await supabase
        .from('Utilisateurs_Groupe')
        .insert({
          IDGroupe: nextId,
          IDUtilisateurs: parseInt(formData.createurId)
        });

      if (memberError) throw memberError;

      toast({
        title: "Groupe créé",
        description: "Le groupe a été créé avec succès et le créateur a été ajouté comme membre"
      });

      onSuccess();
      onClose();
      setFormData({
        titre: "",
        description: "",
        createurId: ""
      });
    } catch (error) {
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
            <label className="block text-sm font-medium mb-1">Créateur</label>
            <Select value={formData.createurId} onValueChange={(value) => setFormData(prev => ({ ...prev, createurId: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un créateur" />
              </SelectTrigger>
              <SelectContent>
                {utilisateurs.map((utilisateur) => (
                  <SelectItem key={utilisateur.IDUtilisateurs} value={utilisateur.IDUtilisateurs.toString()}>
                    {utilisateur.Prenom} {utilisateur.Nom}
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
              {isSubmitting ? "Création..." : "Créer"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddGroupModal;
