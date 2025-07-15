
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface TicketActionsProps {
  canResolve: boolean;
  onResolveClick: () => void;
  onClose: () => void;
}

const TicketActions = ({ canResolve, onResolveClick, onClose }: TicketActionsProps) => {
  return (
    <div className="flex justify-between gap-3 pt-4 border-t border-slate-200">
      <div>
        {canResolve && (
          <Button
            onClick={onResolveClick}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Marquer comme résolu
          </Button>
        )}
      </div>
      <Button variant="outline" onClick={onClose}>
        Fermer
      </Button>
    </div>
  );
};

export default TicketActions;
