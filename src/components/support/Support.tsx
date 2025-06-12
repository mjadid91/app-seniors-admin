
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Eye, MessageCircle, Clock, CheckCircle, AlertTriangle } from "lucide-react";

interface Ticket {
  id: string;
  sujet: string;
  dateCreation: string;
  statut: 'en_attente' | 'en_cours' | 'resolu';
  utilisateur: string;
  technicien?: string;
  priorite: 'basse' | 'normale' | 'haute';
  description: string;
}

const mockTickets: Ticket[] = [
  {
    id: 'T001',
    sujet: 'Problème de connexion',
    dateCreation: '2024-06-11',
    statut: 'en_cours',
    utilisateur: 'Marie Dupont',
    technicien: 'Pierre Martin',
    priorite: 'haute',
    description: 'Impossible de me connecter depuis ce matin'
  },
  {
    id: 'T002',
    sujet: 'Question sur les prestations',
    dateCreation: '2024-06-10',
    statut: 'resolu',
    utilisateur: 'Jean Bernard',
    technicien: 'Sophie Dubois',
    priorite: 'normale',
    description: 'Comment modifier le tarif de mes prestations?'
  },
  {
    id: 'T003',
    sujet: 'Demande de modification profil',
    dateCreation: '2024-06-12',
    statut: 'en_attente',
    utilisateur: 'Claire Moreau',
    priorite: 'basse',
    description: 'Je souhaite modifier mon adresse'
  }
];

const Support = () => {
  const [tickets] = useState<Ticket[]>(mockTickets);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [response, setResponse] = useState("");

  const getStatutBadgeColor = (statut: string) => {
    switch (statut) {
      case 'en_attente': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'en_cours': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'resolu': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
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

  const getStatutIcon = (statut: string) => {
    switch (statut) {
      case 'en_attente': return <Clock className="h-4 w-4" />;
      case 'en_cours': return <MessageCircle className="h-4 w-4" />;
      case 'resolu': return <CheckCircle className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const handleTicketSelect = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setResponse("");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Support Client</h2>
          <p className="text-slate-600 mt-1">Gestion des demandes d'assistance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="h-4 w-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">En attente</p>
                <p className="text-xl font-bold text-slate-800">
                  {tickets.filter(t => t.statut === 'en_attente').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="h-4 w-4 text-blue-600" />
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
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Priorité haute</p>
                <p className="text-xl font-bold text-slate-800">
                  {tickets.filter(t => t.priorite === 'haute').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Liste des tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  onClick={() => handleTicketSelect(ticket)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                    selectedTicket?.id === ticket.id ? 'border-blue-500 bg-blue-50' : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatutIcon(ticket.statut)}
                        <p className="font-medium text-slate-800">{ticket.sujet}</p>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">Par: {ticket.utilisateur}</p>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatutBadgeColor(ticket.statut)}>
                          {ticket.statut.replace('_', ' ')}
                        </Badge>
                        <Badge className={getPrioriteBadgeColor(ticket.priorite)}>
                          {ticket.priorite}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-500">{ticket.id}</p>
                      <p className="text-xs text-slate-400">
                        {new Date(ticket.dateCreation).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {selectedTicket ? `Détails du ticket ${selectedTicket.id}` : 'Sélectionnez un ticket'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedTicket ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700">Utilisateur</label>
                    <p className="text-slate-800">{selectedTicket.utilisateur}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Technicien assigné</label>
                    <p className="text-slate-800">{selectedTicket.technicien || 'Non assigné'}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">Description</label>
                  <p className="text-slate-800 bg-slate-50 p-3 rounded-lg mt-1">
                    {selectedTicket.description}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">Statut</label>
                  <select className="w-full mt-1 p-2 border border-slate-200 rounded-lg">
                    <option value="en_attente">En attente</option>
                    <option value="en_cours">En cours</option>
                    <option value="resolu">Résolu</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">Réponse</label>
                  <Textarea
                    placeholder="Tapez votre réponse..."
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    className="mt-1"
                    rows={4}
                  />
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1">Envoyer la réponse</Button>
                  <Button variant="outline">Marquer comme résolu</Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500">
                <MessageCircle className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                <p>Sélectionnez un ticket pour voir les détails</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Support;
