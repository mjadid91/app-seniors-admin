
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface AddTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddTicketModal = ({ isOpen, onClose, onSuccess }: AddTicketModalProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    clientId: "",
    supportId: "",
    priorite: "Moyenne"
  });

  // Récupérer les utilisateurs clients
  const { data: clients = [] } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Utilisateurs')
        .select('IDUtilisateurs, Nom, Prenom')
        .order('Nom');
      
      if (error) throw error;
      return data;
    }
  });

  // Récupérer les agents support (IDCatUtilisateurs = 8)
  const { data: supportAgents = [] } = useQuery({
    queryKey: ['support-agents'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Utilisateurs')
        .select('IDUtilisateurs, Nom, Prenom')
        .eq('IDCatUtilisateurs', 8)
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
        .from('TicketClient')
        .insert({
          TitreTicket: formData.titre,
          DescriptionProbleme: formData.description,
          IDUtilisateursClient: parseInt(formData.clientId),
          IDUtilisateursSupport: formData.supportId ? parseInt(formData.supportId) : null,
          PrioriteTicket: formData.priorite,
          StatutTicket: 'Ouvert',
          DateCreation: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: "Ticket créé",
        description: "Le ticket support a été créé avec succès"
      });

      onSuccess();
      onClose();
      setFormData({
        titre: "",
        description: "",
        clientId: "",
        supportId: "",
        priorite: "Moyenne"
      });
    } catch (error) {
      console.error('Erreur lors de la création du ticket:', error);
      toast({
        title: "Erreur",
        description: "Impossible de créer le ticket",
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
          <DialogTitle>Ajouter un ticket support</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Titre du ticket</label>
            <Input
              value={formData.titre}
              onChange={(e) => setFormData(prev => ({ ...prev, titre: e.target.value }))}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description du problème</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Client</label>
            <Select value={formData.clientId} onValueChange={(value) => setFormData(prev => ({ ...prev, clientId: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un client" />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem key={client.IDUtilisateurs} value={client.IDUtilisateurs.toString()}>
                    {client.Prenom} {client.Nom}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Agent support</label>
            <Select value={formData.supportId} onValueChange={(value) => setFormData(prev => ({ ...prev, supportId: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un agent support" />
              </SelectTrigger>
              <SelectContent>
                {supportAgents.map((agent) => (
                  <SelectItem key={agent.IDUtilisateurs} value={agent.IDUtilisateurs.toString()}>
                    {agent.Prenom} {agent.Nom}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Priorité</label>
            <Select value={formData.priorite} onValueChange={(value) => setFormData(prev => ({ ...prev, priorite: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Faible">Faible</SelectItem>
                <SelectItem value="Moyenne">Moyenne</SelectItem>
                <SelectItem value="Haute">Haute</SelectItem>
                <SelectItem value="Urgente">Urgente</SelectItem>
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

export default AddTicketModal;
