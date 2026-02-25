import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";
import { useSupportReplies } from "@/hooks/useSupportReplies";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";

interface TicketReplyFormProps {
  ticketId: string;
  onReplySubmitted: () => void;
}

const TicketReplyForm = ({ ticketId, onReplySubmitted }: TicketReplyFormProps) => {
  const [reply, setReply] = useState("");
  const { toast } = useToast();
  const { user } = useSupabaseAuth();
  const { addReply, isAddingReply } = useSupportReplies(ticketId);

  // On récupère l'ID depuis user.id, sinon on utilise 8 (Mohamed) par défaut
  const currentUserId = user?.id ? (typeof user.id === 'string' ? parseInt(user.id) : user.id) : 8;

  console.log("Debug TicketReplyForm:", {
    userId: user?.id,
    currentUserId,
    hasUser: !!user
  });

  const handleSubmitReply = async () => {
    if (!reply.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir une réponse",
        variant: "destructive"
      });
      return;
    }

    try {
      addReply({
        content: reply,
        authorId: currentUserId
      });

      // Réinitialiser le formulaire
      setReply("");
      onReplySubmitted();

    } catch (error) {
      const err = error as Error;
      console.error("Erreur lors de l'envoi de la réponse:", err.message);
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer la réponse. Veuillez réessayer.",
        variant: "destructive"
      });
    }
  };

  const isSubmitting = isAddingReply;

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
                disabled={isSubmitting}
            />
          </div>

          <div className="flex justify-end">
            <Button
                onClick={handleSubmitReply}
                disabled={isSubmitting || !reply.trim()}
            >
              {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Envoi en cours...
                  </>
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