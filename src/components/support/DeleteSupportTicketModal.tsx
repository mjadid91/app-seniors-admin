
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface DeleteSupportTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: { id: number; sujet: string } | null;
  onSuccess: () => void;
}

const DeleteSupportTicketModal = ({ isOpen, onClose, ticket, onSuccess }: DeleteSupportTicketModalProps) => {
  const { toast } = useToast();

  const handleDelete = async () => {
    if (!ticket) return;

    try {
      // Supprimer d'abord les réponses du ticket
      const { error: repliesError } = await supabase
        .from('ReponsesSupport')
        .delete()
        .eq('IDTicketClient', ticket.id);

      if (repliesError) {
        console.error('Erreur lors de la suppression des réponses:', repliesError);
      }

      // Supprimer les prestations support liées
      const { error: prestationError } = await supabase
        .from('PrestationSupport')
        .delete()
        .eq('IDTicketClient', ticket.id);

      if (prestationError) {
        console.error('Erreur lors de la suppression des prestations:', prestationError);
      }

      // Enfin supprimer le ticket
      const { error: ticketError } = await supabase
        .from('SupportClient')
        .delete()
        .eq('IDTicketClient', ticket.id);

      if (ticketError) throw ticketError;

      toast({
        title: "Ticket supprimé",
        description: `Le ticket "${ticket.sujet}" et ses dépendances ont été supprimés`,
        variant: "destructive"
      });

      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Erreur lors de la suppression du ticket:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le ticket",
        variant: "destructive"
      });
    }
  };

  if (!ticket) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Supprimer le ticket
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800 mb-2">
              <strong>Attention :</strong> Cette action est irréversible.
            </p>
            <p className="text-sm text-red-700">
              Cette action supprimera définitivement le ticket, toutes ses réponses et prestations associées.
            </p>
            <div className="mt-3 p-2 bg-red-100 rounded border-l-4 border-red-400">
              <p className="text-sm font-medium text-red-800">
                Ticket : <span className="font-mono">{ticket.sujet}</span>
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Confirmer la suppression
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteSupportTicketModal;
