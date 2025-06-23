
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface AddSignalementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddSignalementModal = ({ isOpen, onClose, onSuccess }: AddSignalementModalProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    messageId: "",
    signaleurId: "",
    motif: "",
    description: ""
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

  // Récupérer les messages de groupe avec auteur et groupe
  const { data: messages = [] } = useQuery({
    queryKey: ['messages-groupe'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('MessageGroupe')
        .select(`
          IDMessageGroupe,
          Contenu,
          Utilisateurs!inner(Nom, Prenom),
          Groupe!inner(Titre)
        `)
        .order('DateEnvoi', { ascending: false });
      
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
        .from('SignalementContenu')
        .select('IDSignalement')
        .order('IDSignalement', { ascending: false })
        .limit(1);

      if (maxIdError) {
        console.error('Error getting max ID:', maxIdError);
      }

      const nextId = maxIdData && maxIdData.length > 0 ? maxIdData[0].IDSignalement + 1 : 1;

      const { error } = await supabase
        .from('SignalementContenu')
        .insert({
          IDSignalement: nextId,
          IDMessageGroupe: parseInt(formData.messageId),
          IDUtilisateurSignaleur: parseInt(formData.signaleurId),
          Motif: formData.motif,
          DateSignalement: new Date().toISOString().split('T')[0],
          Traité: false
        });

      if (error) throw error;

      toast({
        title: "Signalement ajouté",
        description: "Le signalement a été créé avec succès"
      });

      onSuccess();
      onClose();
      setFormData({
        messageId: "",
        signaleurId: "",
        motif: "",
        description: ""
      });
    } catch (error) {
      console.error('Erreur lors de la création du signalement:', error);
      toast({
        title: "Erreur",
        description: "Impossible de créer le signalement",
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
          <DialogTitle>Ajouter un signalement</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Message à signaler</label>
            <Select value={formData.messageId} onValueChange={(value) => setFormData(prev => ({ ...prev, messageId: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un message" />
              </SelectTrigger>
              <SelectContent>
                {messages.map((message) => (
                  <SelectItem key={message.IDMessageGroupe} value={message.IDMessageGroupe.toString()}>
                    {message.Groupe?.Titre} - {message.Utilisateurs?.Prenom} {message.Utilisateurs?.Nom}: {message.Contenu.substring(0, 50)}...
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Signaleur</label>
            <Select value={formData.signaleurId} onValueChange={(value) => setFormData(prev => ({ ...prev, signaleurId: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un signaleur" />
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
            <label className="block text-sm font-medium mb-1">Motif</label>
            <Select value={formData.motif} onValueChange={(value) => setFormData(prev => ({ ...prev, motif: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un motif" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Contenu inapproprié">Contenu inapproprié</SelectItem>
                <SelectItem value="Spam">Spam</SelectItem>
                <SelectItem value="Harcèlement">Harcèlement</SelectItem>
                <SelectItem value="Fausses informations">Fausses informations</SelectItem>
                <SelectItem value="Autre">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              placeholder="Décrivez le problème..."
              required
            />
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

export default AddSignalementModal;
