
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";

interface TicketStatusInfoProps {
  ticket: {
    statut: 'a_traiter' | 'en_cours' | 'resolu';
    priorite: 'basse' | 'normale' | 'haute';
    assigneA?: string;
  };
}

const TicketStatusInfo = ({ ticket }: TicketStatusInfoProps) => {
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

  return (
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
  );
};

export default TicketStatusInfo;
