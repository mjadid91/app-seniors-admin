
import { Card, CardContent } from "@/components/ui/card";
import { User, Calendar } from "lucide-react";

interface TicketHeaderProps {
  ticket: {
    id: number;
    sujet: string;
    utilisateur: string;
    dateCreation: string;
  };
}

const TicketHeader = ({ ticket }: TicketHeaderProps) => {
  return (
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
  );
};

export default TicketHeader;
