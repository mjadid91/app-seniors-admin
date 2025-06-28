import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, UserPlus, MessageCircle, Clock, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SupportTicketModal from "./SupportTicketModal";
import { useSupabaseSupportTickets, SupportTicketDB } from "@/hooks/useSupabaseSupportTickets";
import AddTicketModal from "@/components/support/AddTicketModal.tsx";

// Type local pour usage UI et mapping
interface Ticket {
  id: number; // Changed from string to number
  sujet: string;
  utilisateur: string;
  dateCreation: string;
  statut: "a_traiter" | "en_cours" | "resolu";
  priorite: "basse" | "normale" | "haute";
  assigneA?: string;
  message?: string | null;
  utilisateur_email?: string | null;
}


const Support = () => {
  // Appel aux données réelles
  const { data: ticketsDB = [], isLoading, error, refetch } = useSupabaseSupportTickets();
  const [selectedStatut, setSelectedStatut] = useState<string>("tous");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const { toast } = useToast();
  const [openModal, setOpenModal] = useState(false);

  // Mapping : vue → modèle local Ticket
  const mappedTickets: Ticket[] = useMemo(() => ticketsDB.map(t => ({
    id: t.id,
    sujet: t.sujet ?? "—",
    utilisateur:
      ((t.utilisateur_prenom ?? "") + " " + (t.utilisateur_nom ?? "")).trim() || "—",
    dateCreation: t.date_creation ?? "",
    statut: t.statut,
    priorite: t.priorite,
    assigneA:
      t.assigne_prenom && t.assigne_nom
        ? `${t.assigne_prenom} ${t.assigne_nom}`
        : undefined,
    message: t.message,
    utilisateur_email: t.utilisateur_email,
  })), [ticketsDB]);

  const tickets = mappedTickets;

  const filteredTickets = useMemo(() =>
    tickets.filter(ticket =>
      selectedStatut === "tous" || ticket.statut === selectedStatut
    ), [tickets, selectedStatut]
  );

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

  const handleVoirTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsTicketModalOpen(true);
    toast({
      title: "Détails du ticket",
      description: `Ouverture du ticket ${ticket.id} : ${ticket.sujet}`,
    });
    console.log("Voir ticket:", ticket);
  };

  // Pour l’instant, on garde la logique d’assignation mock côté UI
  const handleAssignerTicket = (ticket: Ticket) => {
    toast({
      title: "Ticket assigné (mock)",
      description: `Le ticket ${ticket.id} serait assigné (fonction à implémenter).`,
    });
  };

  const handleTicketUpdated = (updatedTicket: Ticket) => {
    // Refetch les données pour s'assurer que la liste est à jour
    refetch();
    
    // Mettre à jour le ticket sélectionné si c'est le même
    if (selectedTicket && selectedTicket.id === updatedTicket.id) {
      setSelectedTicket(updatedTicket);
    }
  };



  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24 animate-pulse">
        <span className="text-slate-600">
          Chargement des tickets depuis la base...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-100 border border-red-200 rounded-xl text-red-700">
        Erreur lors du chargement des tickets : {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Support client</h2>
          <p className="text-slate-600 mt-1">Gestion des demandes d'assistance</p>
        </div>
      </div>

      <Button onClick={() => setOpenModal(true)} className="mb-4">
        Ajouter un ticket
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">À traiter</p>
                <p className="text-xl font-bold text-slate-800">
                  {tickets.filter(t => t.statut === 'a_traiter').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="h-4 w-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">En cours</p>
                <p className="text-xl font-bold text-slate-800">
                  {tickets.filter(t => t.statut === 'en_cours').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Résolus</p>
                <p className="text-xl font-bold text-slate-800">
                  {tickets.filter(t => t.statut === 'resolu').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Total</p>
                <p className="text-xl font-bold text-slate-800">{tickets.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Liste des tickets</CardTitle>
            <select
              value={selectedStatut}
              onChange={(e) => setSelectedStatut(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="tous">Tous les statuts</option>
              <option value="a_traiter">À traiter</option>
              <option value="en_cours">En cours</option>
              <option value="resolu">Résolu</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-medium text-slate-700">ID</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Sujet</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Utilisateur</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Priorité</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Statut</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Assigné à</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.map((ticket) => (
                  <tr key={ticket.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-4 font-mono text-sm text-slate-600">{ticket.id}</td>
                    <td className="py-4 px-4">
                      <p className="font-medium text-slate-800">{ticket.sujet}</p>
                    </td>
                    <td className="py-4 px-4 text-slate-600">{ticket.utilisateur}</td>
                    <td className="py-4 px-4 text-slate-600">
                      {ticket.dateCreation
                        ? new Date(ticket.dateCreation).toLocaleDateString('fr-FR')
                        : "—"}
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getPrioriteBadgeColor(ticket.priorite)}>
                        {ticket.priorite}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getStatutBadgeColor(ticket.statut)}>
                        {getStatutLabel(ticket.statut)}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-slate-600">
                      {ticket.assigneA || '-'}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleVoirTicket(ticket)}
                          title="Voir"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {ticket.statut === 'a_traiter' && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleAssignerTicket(ticket)}
                            title="Assigner"
                          >
                            <UserPlus className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <SupportTicketModal
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
        ticket={selectedTicket}
        onTicketUpdated={handleTicketUpdated}
      />

      <AddTicketModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          onSuccess={() => {
            setOpenModal(false);
            refetch();
          }}
      />
    </div>
  );
};

export default Support;
