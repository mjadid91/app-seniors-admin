
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
    sujet: "",
    descriptionDemande: "",
    clientId: "",
    priorite: "Normale",
    agentId: "" // Optionnel
  });

  const {data: clients = [] } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Utilisateurs')
        .select('IDUtilisateurs, Nom, Prenom, Email')
        .order('Nom');
      if (error) throw error;
      return data;
    }
  });

  // Récupérer les agents de support (IDCatUtilisateurs = 8)
  const { data: supportAgents = [] } = useQuery({
    queryKey: ['support-agents'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Utilisateurs')
        .select('IDUtilisateurs, Nom, Prenom, Email')
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
      console.log('Données du formulaire:', formData);

      // Déterminer le statut initial : "en_attente" si pas d'agent, "en_cours" si agent assigné
      const statutInitial = formData.agentId ? "en_cours" : "en_attente";

      // Créer le ticket dans SupportClient (sans spécifier l'ID qui sera auto-généré)
      const { data: ticketData, error: ticketError } = await supabase
        .from('SupportClient')
        .insert({
          Sujet: formData.sujet,
          DescriptionDemande: formData.descriptionDemande,
          IDUtilisateursClient: parseInt(formData.clientId),
          Priorite: formData.priorite,
          StatutDemande: statutInitial,
          DateEnvoi: new Date().toISOString().split('T')[0]
        })
        .select()
        .single();

      if (ticketError) {
        console.error('Erreur lors de la création du ticket:', ticketError);
        throw ticketError;
      }

      console.log('Ticket créé avec succès:', ticketData);

      // Si un agent est sélectionné, créer l'entrée dans PrestationSupport
      if (formData.agentId && ticketData) {
        console.log('Assignation de l\'agent:', formData.agentId);
        
        const { error: prestationError } = await supabase
          .from('PrestationSupport')
          .insert({
            IDTicketClient: ticketData.IDTicketClient,
            IDIntervenant: parseInt(formData.agentId)
          });

        if (prestationError) {
          console.error('Erreur lors de l\'assignation:', prestationError);
          throw prestationError;
        }
      }

      toast({
        title: "Ticket créé",
        description: `Le ticket support a été créé avec le statut "${statutInitial === "en_attente" ? "en attente" : "en cours"}"`
      });

      onSuccess();
      onClose();
      setFormData({
        sujet: "",
        descriptionDemande: "",
        clientId: "",
        priorite: "Normale",
        agentId: ""
      });
    } catch (error: any) {
      console.error('Erreur lors de la création du ticket:', error);
      toast({
        title: "Erreur",
        description: error.message || "Impossible de créer le ticket",
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
            <label className="block text-sm font-medium mb-1">Sujet du ticket</label>
            <Input
              value={formData.sujet}
              onChange={(e) => setFormData(prev => ({ ...prev, sujet: e.target.value }))}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description du problème</label>
            <Textarea
              value={formData.descriptionDemande}
              onChange={(e) => setFormData(prev => ({ ...prev, descriptionDemande: e.target.value }))}
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
                {clients.map((client: any) => (
                  <SelectItem key={client.IDUtilisateurs} value={client.IDUtilisateurs.toString()}>
                    {client.Prenom} {client.Nom} ({client.Email})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Agent de support (optionnel)</label>
            <Select value={formData.agentId} onValueChange={(value) => setFormData(prev => ({ ...prev, agentId: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un agent (optionnel)" />
              </SelectTrigger>
              <SelectContent>
                {supportAgents.map((agent: any) => (
                  <SelectItem key={agent.IDUtilisateurs} value={agent.IDUtilisateurs.toString()}>
                    {agent.Prenom} {agent.Nom} ({agent.Email})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500 mt-1">
              Si aucun agent n'est sélectionné, le ticket sera créé avec le statut "en attente"
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Priorité</label>
            <Select value={formData.priorite} onValueChange={(value) => setFormData(prev => ({ ...prev, priorite: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Faible">Faible</SelectItem>
                <SelectItem value="Normale">Normale</SelectItem>
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
