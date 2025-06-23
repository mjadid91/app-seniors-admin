
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface AddForumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddForumModal = ({ isOpen, onClose, onSuccess }: AddForumModalProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    categorie: "",
    createurId: "",
    estPublic: true
  });

  // Récupérer les utilisateurs pour le créateur
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
      const { error } = await supabase
        .from('Forum')
        .insert({
          TitreForum: formData.titre,
          DescriptionForum: formData.description,
          Categorie: formData.categorie,
          IDCreateur: parseInt(formData.createurId),
          estPublic: formData.estPublic,
          DateCreationForum: new Date().toISOString().split('T')[0]
        });

      if (error) throw error;

      toast({
        title: "Forum créé",
        description: "Le forum a été créé avec succès"
      });

      onSuccess();
      onClose();
      setFormData({
        titre: "",
        description: "",
        categorie: "",
        createurId: "",
        estPublic: true
      });
    } catch (error) {
      console.error('Erreur lors de la création du forum:', error);
      toast({
        title: "Erreur",
        description: "Impossible de créer le forum",
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
          <DialogTitle>Ajouter un forum</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Titre du forum</label>
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
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Catégorie</label>
            <Input
              value={formData.categorie}
              onChange={(e) => setFormData(prev => ({ ...prev, categorie: e.target.value }))}
              placeholder="Ex: Général, Support, etc."
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

          <div>
            <label className="block text-sm font-medium mb-1">Visibilité</label>
            <Select 
              value={formData.estPublic.toString()} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, estPublic: value === 'true' }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Public</SelectItem>
                <SelectItem value="false">Privé</SelectItem>
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

export default AddForumModal;
