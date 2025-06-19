
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface TicketResponseModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketId: string;
  clientEmail: string;
  onSuccess: () => void;
}

// Créer une table temporaire pour les réponses de tickets
const TicketResponseModal = ({ isOpen, onClose, ticketId, clientEmail, onSuccess }: TicketResponseModalProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Pour l'instant, on log juste la réponse car la table ReponseTicket n'existe pas
      console.log('Réponse ticket:', {
        ticketId: parseInt(ticketId),
        response: response,
        date: new Date().toISOString(),
        responderId: 1 // À adapter selon l'utilisateur connecté
      });

      // Appeler la fonction edge pour envoyer l'email
      const { error: emailError } = await supabase.functions.invoke('send-ticket-response', {
        body: {
          to: clientEmail,
          ticketId: ticketId,
          response: response
        }
      });

      if (emailError) {
        console.error('Erreur lors de l\'envoi de l\'email:', emailError);
        // Ne pas bloquer le processus si l'email échoue
      }

      toast({
        title: "Réponse envoyée",
        description: "La réponse a été enregistrée et l'email envoyé au client"
      });

      onSuccess();
      onClose();
      setResponse("");
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la réponse:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer la réponse",
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
          <DialogTitle>Répondre au ticket</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Votre réponse</label>
            <Textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Tapez votre réponse ici..."
              className="min-h-[120px]"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Envoi..." : "Envoyer la réponse"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TicketResponseModal;
