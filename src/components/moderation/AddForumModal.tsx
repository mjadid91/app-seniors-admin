
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
    
    // Validation côté client
    if (formData.titre.length > 50) {
      toast({
        title: "Erreur de validation",
        description: "Le titre ne doit pas dépasser 50 caractères",
        variant: "destructive"
      });
      return;
    }

    if (formData.description.length > 255) {
      toast({
        title: "Erreur de validation",
        description: "La description ne doit pas dépasser 255 caractères",
        variant: "destructive"
      });
      return;
    }

    if (formData.categorie.length > 50) {
      toast({
        title: "Erreur de validation",
        description: "La catégorie ne doit pas dépasser 50 caractères",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // First, get the next available ID to avoid conflicts
      const { data: maxIdData, error: maxIdError } = await supabase
        .from('Forum')
        .select('IDForum')
        .order('IDForum', { ascending: false })
        .limit(1);

      if (maxIdError) {
        console.error('Error getting max ID:', maxIdError);
      }

      const nextId = maxIdData && maxIdData.length > 0 ? maxIdData[0].IDForum + 1 : 1;

      const { error } = await supabase
        .from('Forum')
        .insert({
          IDForum: nextId,
          TitreForum: formData.titre,
          DescriptionForum: formData.description,
          Categorie: formData.categorie,
          IDCreateur: parseInt(formData.createurId),
          estPublic: formData.estPublic,
          DateCreationForum: new Date().toISOString().split('T')[0]
        });

      if (error) {
        console.error('Erreur Supabase:', error);
        
        // Messages d'erreur plus spécifiques
        if (error.code === '22001') {
          toast({
            title: "Erreur",
            description: "Un des champs dépasse la longueur maximale autorisée. Veuillez raccourcir votre texte.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Erreur",
            description: error.message || "Impossible de créer le forum",
            variant: "destructive"
          });
        }
        return;
      }

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
    } catch (error: any) {
      console.error('Erreur lors de la création du forum:', error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite",
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
            <label className="block text-sm font-medium mb-1">
              Titre du forum <span className="text-xs text-gray-500">({formData.titre.length}/50)</span>
            </label>
            <Input
              value={formData.titre}
              onChange={(e) => setFormData(prev => ({ ...prev, titre: e.target.value }))}
              maxLength={50}
              required
              className={formData.titre.length > 50 ? "border-red-500" : ""}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description <span className="text-xs text-gray-500">({formData.description.length}/255)</span>
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              maxLength={255}
              required
              className={formData.description.length > 255 ? "border-red-500" : ""}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Catégorie <span className="text-xs text-gray-500">({formData.categorie.length}/50)</span>
            </label>
            <Input
              value={formData.categorie}
              onChange={(e) => setFormData(prev => ({ ...prev, categorie: e.target.value }))}
              placeholder="Ex: Général, Support, etc."
              maxLength={50}
              required
              className={formData.categorie.length > 50 ? "border-red-500" : ""}
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
