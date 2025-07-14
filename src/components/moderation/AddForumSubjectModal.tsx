
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface AddForumSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddForumSubjectModal = ({ isOpen, onClose, onSuccess }: AddForumSubjectModalProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    titre: "",
    contenu: "",
    auteurId: "",
    forumId: ""
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

  // Récupérer les forums
  const { data: forums = [] } = useQuery({
    queryKey: ['forums'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Forum')
        .select('IDForum, TitreForum')
        .order('TitreForum');
      
      if (error) throw error;
      return data;
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // First, get the next available ID to avoid conflicts
      const { data: maxIdData, error: maxIdError } = await supabase
        .from('SujetForum')
        .select('IDSujetForum')
        .order('IDSujetForum', { ascending: false })
        .limit(1);

      if (maxIdError) {
        console.error('Error getting max ID:', maxIdError);
      }

      const nextId = maxIdData && maxIdData.length > 0 ? maxIdData[0].IDSujetForum + 1 : 1;

      const { error } = await supabase
        .from('SujetForum')
        .insert({
          IDSujetForum: nextId,
          TitreSujet: formData.titre,
          ContenuSujet: formData.contenu,
          IDUtilisateurs: parseInt(formData.auteurId),
          IDForum: parseInt(formData.forumId),
          DateCreationSujet: new Date().toISOString().split('T')[0],
          NbVues: 0
        });

      if (error) throw error;

      toast({
        title: "Sujet créé",
        description: "Le sujet de forum a été créé avec succès"
      });

      onSuccess();
      onClose();
      setFormData({
        titre: "",
        contenu: "",
        auteurId: "",
        forumId: ""
      });
    } catch (error) {
      console.error('Erreur lors de la création du sujet:', error);
      toast({
        title: "Erreur",
        description: "Impossible de créer le sujet",
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
          <DialogTitle>Ajouter un sujet de forum</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Titre du sujet</label>
            <Input
              value={formData.titre}
              onChange={(e) => setFormData(prev => ({ ...prev, titre: e.target.value }))}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Contenu du sujet</label>
            <Textarea
              value={formData.contenu}
              onChange={(e) => setFormData(prev => ({ ...prev, contenu: e.target.value }))}
              placeholder="Décrivez votre sujet..."
              className="min-h-[100px]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Forum</label>
            <Select value={formData.forumId} onValueChange={(value) => setFormData(prev => ({ ...prev, forumId: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un forum" />
              </SelectTrigger>
              <SelectContent>
                {forums.map((forum) => (
                  <SelectItem key={forum.IDForum} value={forum.IDForum.toString()}>
                    {forum.TitreForum}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Auteur</label>
            <Select value={formData.auteurId} onValueChange={(value) => setFormData(prev => ({ ...prev, auteurId: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un auteur" />
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

export default AddForumSubjectModal;
