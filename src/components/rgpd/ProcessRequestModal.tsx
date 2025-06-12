
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface DataRequest {
  id: number;
  type: string;
  user: string;
  email: string;
  date: string;
  status: string;
  deadline: string;
}

interface ProcessRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: DataRequest | null;
  onProcessRequest: (requestId: number, status: string, response: string) => void;
}

const ProcessRequestModal = ({ isOpen, onClose, request, onProcessRequest }: ProcessRequestModalProps) => {
  const [status, setStatus] = useState("Traité");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!request) return;

    setIsLoading(true);

    try {
      onProcessRequest(request.id, status, response);
      
      toast({
        title: "Demande traitée",
        description: `La demande de ${request.user} a été ${status.toLowerCase()}.`,
      });

      setResponse("");
      setStatus("Traité");
      onClose();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de traiter la demande.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!request) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Traiter la demande RGPD</DialogTitle>
          <DialogDescription>
            Demande de {request.user} - {request.type}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="bg-slate-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Détails de la demande</h4>
            <div className="space-y-1 text-sm">
              <p><strong>Utilisateur:</strong> {request.user}</p>
              <p><strong>Email:</strong> {request.email}</p>
              <p><strong>Type:</strong> {request.type}</p>
              <p><strong>Date de demande:</strong> {new Date(request.date).toLocaleDateString('fr-FR')}</p>
              <p><strong>Échéance:</strong> {new Date(request.deadline).toLocaleDateString('fr-FR')}</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="status">Nouveau statut</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Traité">Traité</SelectItem>
                  <SelectItem value="Rejeté">Rejeté</SelectItem>
                  <SelectItem value="En cours">En cours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="response">Réponse à l'utilisateur</Label>
              <Textarea
                id="response"
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Rédigez la réponse qui sera envoyée à l'utilisateur..."
                rows={4}
                required
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Annuler
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Traitement..." : "Traiter la demande"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProcessRequestModal;
