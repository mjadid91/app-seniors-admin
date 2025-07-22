
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface AddForumReplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  sujetId?: string;
  onSuccess: () => void;
}

const AddForumReplyModal = ({ isOpen, onClose, sujetId, onSuccess }: AddForumReplyModalProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    contenu: "",
    auteurId: ""
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
    if (!sujetId) return;
    
    setIsSubmitting(true);

    try {
      // Get the next available ID
      const { data: maxIdData, error: maxIdError } = await supabase
        .from('ReponseForum')
        .select('IDReponseForum')
        .order('IDReponseForum', { ascending: false })
        .limit(1);

      if (maxIdError) {
        console.error('Error getting max ID:', maxIdError);
      }

      const nextId = maxIdData && maxIdData.length > 0 ? maxIdData[0].IDReponseForum + 1 : 1;

      const { error } = await supabase
        .from('ReponseForum')
        .insert({
          IDReponseForum: nextId,
          IDSujetForum: parseInt(sujetId),
          IDUtilisateurs: parseInt(formData.auteurId),
          ContenuReponse: formData.contenu,
          DateReponse: new Date().toISOString().split('T')[0]
        });

      if (error) throw error;

      toast({
        title: "Réponse ajoutée",
        description: "La réponse a été ajoutée avec succès"
      });

      onSuccess();
      setFormData({ contenu: "", auteurId: "" });
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la réponse:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter la réponse",
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
          <DialogTitle>Ajouter une réponse</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Auteur de la réponse</label>
            <Select value={formData.auteurId} onValueChange={(value) => setFormData(prev => ({ ...prev, auteurId: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un utilisateur" />
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
            <label className="block text-sm font-medium mb-1">Contenu de la réponse</label>
            <Textarea
              value={formData.contenu}
              onChange={(e) => setFormData(prev => ({ ...prev, contenu: e.target.value }))}
              placeholder="Écrivez votre réponse..."
              className="min-h-[100px]"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Ajout..." : "Ajouter"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddForumReplyModal;
