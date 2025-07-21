
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MessageSquare } from "lucide-react";
import { useState } from "react";
import TicketAssignmentForm from "./TicketAssignmentForm";
import ResolveTicketModal from "./ResolveTicketModal";
import TicketHeader from "./TicketHeader";
import TicketStatusInfo from "./TicketStatusInfo";
import TicketResolutionInfo from "./TicketResolutionInfo";
import TicketDescription from "./TicketDescription";
import TicketActions from "./TicketActions";
import TicketReplies from "./TicketReplies";
import { useTicketPermissions } from "@/hooks/useTicketPermissions";
import { useSupportTicketMutations } from "@/hooks/useSupportTicketMutations";
import { useSupportReplies } from "@/hooks/useSupportReplies";

interface Ticket {
  id: number;
  sujet: string;
  utilisateur: string;
  dateCreation: string;
  statut: 'en_attente' | 'en_cours' | 'resolu';
  priorite: 'basse' | 'normale' | 'haute';
  assigneA?: string;
  dateResolution?: string;
  descriptionDemande?: string | null;
}

interface SupportTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: Ticket | null;
  onTicketUpdated?: (updatedTicket: Ticket) => void;
}

const SupportTicketModal = ({ isOpen, onClose, ticket, onTicketUpdated }: SupportTicketModalProps) => {
  const [isResolveModalOpen, setIsResolveModalOpen] = useState(false);
  const { canResolve } = useTicketPermissions(ticket || { statut: 'en_attente' });
  const { resolveTicket, isResolving } = useSupportTicketMutations();
  
  // Hook pour gérer les réponses (seulement si ticket existe)
  const { replies, isLoading: isLoadingReplies } = useSupportReplies(ticket ? String(ticket.id) : "0");

  if (!ticket) return null;

  const handleAssignmentChanged = (assignee: string) => {
    if (onTicketUpdated) {
      onTicketUpdated({
        ...ticket,
        assigneA: assignee,
        statut: 'en_cours'
      });
    }
  };

  const handleReplySubmitted = () => {
    console.log("Réponse soumise pour le ticket", ticket.id);
  };

  const handleResolveTicket = async (ticketId: string, resolutionNote?: string) => {
    console.log("Tentative de résolution du ticket:", { ticketId, resolutionNote });
    
    try {
      await resolveTicket({ ticketId, resolutionNote });
      
      // Mettre à jour l'état local si une fonction de callback est fournie
      if (onTicketUpdated) {
        onTicketUpdated({
          ...ticket,
          statut: 'resolu',
          dateResolution: new Date().toISOString()
        });
      }
      
      // Fermer la modale de résolution
      setIsResolveModalOpen(false);
    } catch (error) {
      console.error("Erreur lors de la résolution:", error);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              Détails du ticket {ticket.id}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <TicketHeader ticket={ticket} />
            
            <TicketStatusInfo ticket={ticket} />

            <TicketResolutionInfo ticket={ticket} />

            <TicketDescription description={ticket.descriptionDemande || "Pas de description fournie"} />

            {/* Section fil de discussion */}
            <div className="space-y-4">
              <TicketReplies 
                replies={replies} 
                isLoading={isLoadingReplies}
              />
            </div>

            <div className="space-y-4">
              <TicketAssignmentForm
                ticketId={String(ticket.id)}
                currentAssignee={ticket.assigneA}
                onAssignmentChanged={handleAssignmentChanged}
              />
            </div>

            <TicketActions
              canResolve={canResolve}
              onResolveClick={() => setIsResolveModalOpen(true)}
              onClose={onClose}
            />
          </div>
        </DialogContent>
      </Dialog>

      <ResolveTicketModal
        isOpen={isResolveModalOpen}
        onClose={() => setIsResolveModalOpen(false)}
        ticketId={String(ticket.id)}
        onResolve={handleResolveTicket}
      />
    </>
  );
};

export default SupportTicketModal;
