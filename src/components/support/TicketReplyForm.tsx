
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send, Paperclip } from "lucide-react";

interface TicketReplyFormProps {
  ticketId: string;
  onReplySubmitted: () => void;
}

const TicketReplyForm = ({ ticketId, onReplySubmitted }: TicketReplyFormProps) => {
  const [reply, setReply] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmitReply = async () => {
    if (!reply.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir une réponse",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulation d'envoi de la réponse
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Réponse envoyée",
      description: `Votre réponse au ticket ${ticketId} a été envoyée`,
    });

    setReply("");
    setIsSubmitting(false);
    onReplySubmitted();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Répondre au ticket</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="reply" className="block text-sm font-medium text-slate-700 mb-2">
            Votre réponse
          </label>
          <Textarea
            id="reply"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Tapez votre réponse ici..."
            rows={4}
            className="resize-none"
          />
        </div>

        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm">
            <Paperclip className="h-4 w-4 mr-2" />
            Joindre un fichier
          </Button>

          <Button 
            onClick={handleSubmitReply} 
            disabled={isSubmitting || !reply.trim()}
          >
            {isSubmitting ? (
              "Envoi en cours..."
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Envoyer la réponse
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TicketReplyForm;
