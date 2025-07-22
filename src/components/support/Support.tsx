
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Plus, Eye, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSupabaseSupportTickets } from "@/hooks/useSupabaseSupportTickets";
import { useTicketPermissions } from "@/hooks/useTicketPermissions";
import SupportTicketModal from "./SupportTicketModal";
import AddTicketModal from "./AddTicketModal";
import DeleteSupportTicketModal from "./DeleteSupportTicketModal";

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

const Support = () => {
  const { toast } = useToast();
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTicket, setDeleteTicket] = useState<{ id: number; sujet: string } | null>(null);

  // Récupérer les tickets depuis Supabase
  const { data: ticketsDB = [], isLoading, error, refetch } = useSupabaseSupportTickets();

  const { canViewTickets } = useTicketPermissions({ statut: 'en_attente' });

  if (!canViewTickets) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-slate-600">Vous n'avez pas les permissions pour accéder à cette section.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-slate-600">Chargement des tickets...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-600">Erreur lors du chargement des tickets: {error.message}</p>
      </div>
    );
  }

  // Transform database tickets to UI tickets
  const tickets: Ticket[] = ticketsDB.map(ticketDB => ({
    id: ticketDB.id_ticket_client,
    sujet: ticketDB.sujet,
    utilisateur: ticketDB.nom_utilisateur || 'Utilisateur inconnu',
    dateCreation: ticketDB.date_creation,
    statut: ticketDB.statut as 'en_attente' | 'en_cours' | 'resolu',
    priorite: ticketDB.priorite as 'basse' | 'normale' | 'haute',
    assigneA: ticketDB.assigne_a || undefined,
    dateResolution: ticketDB.date_resolution || undefined,
    descriptionDemande: ticketDB.description_demande,
  }));

  const handleVoirTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsTicketModalOpen(true);
  };

  const handleDeleteTicket = (ticket: Ticket) => {
    setDeleteTicket({
      id: ticket.id,
      sujet: ticket.sujet
    });
    setIsDeleteModalOpen(true);
  };

  const handleTicketUpdated = (updatedTicket: Ticket) => {
    refetch();
    setSelectedTicket(updatedTicket);
  };

  const getStatutBadge = (statut: string) => {
    const statutConfig = {
      'en_attente': { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', text: 'En attente' },
      'en_cours': { color: 'bg-blue-100 text-blue-700 border-blue-200', text: 'En cours' },
      'resolu': { color: 'bg-green-100 text-green-700 border-green-200', text: 'Résolu' }
    };
    
    const config = statutConfig[statut as keyof typeof statutConfig] || statutConfig.en_attente;
    return <Badge className={config.color}>{config.text}</Badge>;
  };

  const getPrioriteBadge = (priorite: string) => {
    const prioriteConfig = {
      'basse': { color: 'bg-gray-100 text-gray-700', text: 'Basse' },
      'normale': { color: 'bg-blue-100 text-blue-700', text: 'Normale' },
      'haute': { color: 'bg-red-100 text-red-700', text: 'Haute' }
    };
    
    const config = prioriteConfig[priorite as keyof typeof prioriteConfig] || prioriteConfig.normale;
    return <Badge variant="outline" className={config.color}>{config.text}</Badge>;
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageCircle className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-slate-800">Support Client</h1>
          </div>
          <Button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nouveau ticket
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-blue-600" />
              Tickets de support ({tickets.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-medium text-slate-700">ID</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-700">Sujet</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-700">Utilisateur</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-700">Priorité</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-700">Statut</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-700">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-700">Assigné à</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket) => (
                    <tr key={ticket.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4 font-mono text-sm text-slate-600">#{ticket.id}</td>
                      <td className="py-4 px-4">
                        <p className="font-medium text-slate-800">{ticket.sujet}</p>
                      </td>
                      <td className="py-4 px-4 text-slate-600">{ticket.utilisateur}</td>
                      <td className="py-4 px-4">{getPrioriteBadge(ticket.priorite)}</td>
                      <td className="py-4 px-4">{getStatutBadge(ticket.statut)}</td>
                      <td className="py-4 px-4 text-slate-600">
                        {new Date(ticket.dateCreation).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="py-4 px-4 text-slate-600">
                        {ticket.assigneA || 'Non assigné'}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            title="Voir le ticket"
                            onClick={() => handleVoirTicket(ticket)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            title="Supprimer le ticket"
                            onClick={() => handleDeleteTicket(ticket)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {tickets.length === 0 && (
                <div className="text-center py-8 text-slate-500">
                  Aucun ticket trouvé
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <SupportTicketModal
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
        ticket={selectedTicket}
        onTicketUpdated={handleTicketUpdated}
      />

      <AddTicketModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={() => {
          refetch();
          setIsAddModalOpen(false);
        }}
      />

      <DeleteSupportTicketModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        ticket={deleteTicket}
        onSuccess={() => {
          refetch();
          setIsDeleteModalOpen(false);
        }}
      />
    </>
  );
};

export default Support;
