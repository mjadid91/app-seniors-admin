import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Calendar, AlertCircle, MessageSquare } from "lucide-react";
import TicketReplyForm from "./TicketReplyForm";
import TicketAssignmentForm from "./TicketAssignmentForm";

interface Ticket {
  id: number;
  sujet: string;
  utilisateur: string;
  dateCreation: string;
  statut: 'a_traiter' | 'en_cours' | 'resolu';
  priorite: 'basse' | 'normale' | 'haute';
  assigneA?: string;
}

interface SupportTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: Ticket | null;
  onTicketUpdated?: (updatedTicket: Ticket) => void;
}

const SupportTicketModal = ({ isOpen, onClose, ticket, onTicketUpdated }: SupportTicketModalProps) => {
  if (!ticket) return null;

  const getStatutBadgeColor = (statut: string) => {
    switch (statut) {
      case 'a_traiter': return 'bg-red-100 text-red-700 border-red-200';
      case 'en_cours': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'resolu': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatutLabel = (statut: string) => {
    switch (statut) {
      case 'a_traiter': return 'À traiter';
      case 'en_cours': return 'En cours';
      case 'resolu': return 'Résolu';
      default: return statut;
    }
  };

  const getPrioriteBadgeColor = (priorite: string) => {
    switch (priorite) {
      case 'haute': return 'bg-red-100 text-red-700 border-red-200';
      case 'normale': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'basse': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

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
    // Logic pour mettre à jour le statut du ticket si nécessaire
    console.log("Réponse soumise pour le ticket", ticket.id);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-600" />
            Détails du ticket {ticket.id}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">{ticket.sujet}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-slate-500" />
                  <div>
                    <p className="text-sm text-slate-600">Utilisateur</p>
                    <p className="font-medium text-slate-800">{ticket.utilisateur}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-slate-500" />
                  <div>
                    <p className="text-sm text-slate-600">Date de création</p>
                    <p className="font-medium text-slate-800">
                      {new Date(ticket.dateCreation).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-slate-600 mb-2">Statut</p>
              <Badge className={getStatutBadgeColor(ticket.statut)}>
                {getStatutLabel(ticket.statut)}
              </Badge>
            </div>

            <div>
              <p className="text-sm text-slate-600 mb-2">Priorité</p>
              <Badge className={getPrioriteBadgeColor(ticket.priorite)}>
                <AlertCircle className="h-3 w-3 mr-1" />
                {ticket.priorite}
              </Badge>
            </div>

            <div>
              <p className="text-sm text-slate-600 mb-2">Assigné à</p>
              <p className="font-medium text-slate-800">{ticket.assigneA || 'Non assigné'}</p>
            </div>
          </div>

          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold text-slate-800 mb-2">Description détaillée</h4>
              <p className="text-slate-600">
                Détails du problème rencontré par l'utilisateur. Ceci est un exemple de description 
                qui pourrait contenir plus d'informations sur le ticket de support.
              </p>
            </CardContent>
          </Card>

          <Tabs defaultValue="reply" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="reply">Répondre au ticket</TabsTrigger>
              <TabsTrigger value="assign">Assignation</TabsTrigger>
            </TabsList>
            
            <TabsContent value="reply" className="space-y-4">
              <TicketReplyForm 
                ticketId={String(ticket.id)}
                onReplySubmitted={handleReplySubmitted}
              />
            </TabsContent>
            
            <TabsContent value="assign" className="space-y-4">
              <TicketAssignmentForm
                ticketId={String(ticket.id)}
                currentAssignee={ticket.assigneA}
                onAssignmentChanged={handleAssignmentChanged}
              />
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Fermer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SupportTicketModal;
