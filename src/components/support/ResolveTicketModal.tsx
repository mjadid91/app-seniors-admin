
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { useState } from "react";

interface ResolveTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketId: string;
  onResolve: (ticketId: string, resolutionNote?: string) => void;
}

const ResolveTicketModal = ({ isOpen, onClose, ticketId, onResolve }: ResolveTicketModalProps) => {
  const [resolutionNote, setResolutionNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleResolve = async () => {
    setIsSubmitting(true);
    try {
      await onResolve(ticketId, resolutionNote.trim() || undefined);
      onClose();
      setResolutionNote("");
    } catch (error) {
      console.error("Erreur lors de la résolution:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    setResolutionNote("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Marquer comme résolu
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-yellow-800">Confirmation requise</p>
              <p className="text-sm text-yellow-700">
                Êtes-vous sûr de vouloir marquer ce ticket comme résolu ? Cette action ne peut pas être annulée.
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Note de résolution (optionnelle)
            </label>
            <Textarea
              value={resolutionNote}
              onChange={(e) => setResolutionNote(e.target.value)}
              placeholder="Ajoutez une note sur la résolution du problème..."
              className="min-h-[80px]"
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button 
              variant="outline" 
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button 
              onClick={handleResolve}
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? "Résolution..." : "Marquer comme résolu"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResolveTicketModal;
