
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface TicketResolutionInfoProps {
  ticket: {
    statut: 'en_attente' | 'en_cours' | 'resolu';
    dateResolution?: string;
  };
}

const TicketResolutionInfo = ({ ticket }: TicketResolutionInfoProps) => {
  if (ticket.statut !== 'resolu' || !ticket.dateResolution) {
    return null;
  }

  return (
    <Card className="bg-green-50 border-green-200">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <h4 className="font-semibold text-green-800">Ticket résolu</h4>
        </div>
        <p className="text-sm text-green-700">
          Résolu le {new Date(ticket.dateResolution).toLocaleDateString('fr-FR')} à {new Date(ticket.dateResolution).toLocaleTimeString('fr-FR')}
        </p>
      </CardContent>
    </Card>
  );
};

export default TicketResolutionInfo;
