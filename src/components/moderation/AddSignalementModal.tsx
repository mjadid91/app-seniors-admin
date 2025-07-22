
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface AddSignalementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddSignalementModal = ({ isOpen, onClose, onSuccess }: AddSignalementModalProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    messageId: "",
    signaleurId: "",
    motif: "",
    description: ""
  });

  // Récupérer les messages de groupe avec actualisation temps réel
  const { data: messages = [] } = useQuery({
    queryKey: ['messages-groupe'],
    // Configuration temps réel optimisée
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    staleTime: 30 * 1000, // 30 secondes
    refetchInterval: 60 * 1000, // 1 minute
    queryFn: async () => {
      console.log('Récupération des messages pour signalement...');
      const { data, error } = await supabase
        .from('MessageGroupe')
        .select(`
          IDMessageGroupe,
          Contenu,
          IDGroupe,
          Utilisateurs!inner(Nom, Prenom),
          Groupe!inner(Titre)
        `)
        .order('DateEnvoi', { ascending: false });
      
      if (error) throw error;
      console.log('Messages pour signalement récupérés:', data?.length || 0);
      return data;
    }
  });

  // Récupérer les membres du groupe du message sélectionné avec actualisation temps réel
  const { data: membresGroupe = [] } = useQuery({
    queryKey: ['membres-groupe-signalement', formData.messageId],
    // Configuration temps réel
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000,
    queryFn: async () => {
      if (!formData.messageId) return [];
      
      console.log('Récupération des membres du groupe pour signalement...');
      
      // D'abord, récupérer le groupe du message
      const { data: messageData, error: messageError } = await supabase
        .from('MessageGroupe')
        .select('IDGroupe')
        .eq('IDMessageGroupe', parseInt(formData.messageId))
        .single();

      if (messageError || !messageData) return [];

      // Ensuite, récupérer les membres de ce groupe
      const { data, error } = await supabase
        .from('Utilisateurs_Groupe')
        .select(`
          IDUtilisateurs,
          Utilisateurs!inner(IDUtilisateurs, Nom, Prenom)
        `)
        .eq('IDGroupe', messageData.IDGroupe);
      
      if (error) throw error;
      console.log('Membres du groupe récupérés:', data?.length || 0);
      return data.map(item => ({
        IDUtilisateurs: item.Utilisateurs.IDUtilisateurs,
        Nom: item.Utilisateurs.Nom,
        Prenom: item.Utilisateurs.Prenom
      }));
    },
    enabled: !!formData.messageId
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Vérifier que le signaleur est bien membre du groupe du message
      const { data: messageData } = await supabase
        .from('MessageGroupe')
        .select('IDGroupe')
        .eq('IDMessageGroupe', parseInt(formData.messageId))
        .single();

      if (messageData) {
        const { data: isMember } = await supabase
          .from('Utilisateurs_Groupe')
          .select('IDUtilisateurs')
          .eq('IDGroupe', messageData.IDGroupe)
          .eq('IDUtilisateurs', parseInt(formData.signaleurId))
          .single();

        if (!isMember) {
          toast({
            title: "Erreur",
            description: "Le signaleur doit être membre du groupe",
            variant: "destructive"
          });
          setIsSubmitting(false);
          return;
        }
      }

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

      // Invalider toutes les queries pertinentes pour la mise à jour temps réel
      queryClient.invalidateQueries({ queryKey: ['signalements'] });
      queryClient.invalidateQueries({ queryKey: ['moderation-groupMessages'] });
      queryClient.invalidateQueries({ queryKey: ['moderation-stats'] });
      queryClient.invalidateQueries({ queryKey: ['messages-groupe'] });

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

  // Réinitialiser le signaleur quand le message change
  const handleMessageChange = (value: string) => {
    setFormData(prev => ({ 
      ...prev, 
      messageId: value,
      signaleurId: "" // Réinitialiser le signaleur
    }));
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
            <Select value={formData.messageId} onValueChange={handleMessageChange}>
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
            <label className="block text-sm font-medium mb-1">Signaleur (membres du groupe uniquement)</label>
            <Select 
              value={formData.signaleurId} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, signaleurId: value }))}
              disabled={!formData.messageId}
            >
              <SelectTrigger>
                <SelectValue placeholder={formData.messageId ? "Sélectionner un signaleur" : "Sélectionner d'abord un message"} />
              </SelectTrigger>
              <SelectContent>
                {membresGroupe.map((membre) => (
                  <SelectItem key={membre.IDUtilisateurs} value={membre.IDUtilisateurs.toString()}>
                    {membre.Prenom} {membre.Nom}
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
            <Button type="submit" disabled={isSubmitting || !formData.messageId || !formData.signaleurId}>
              {isSubmitting ? "Création..." : "Créer"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSignalementModal;
