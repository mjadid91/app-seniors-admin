
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useSupportTicketMutations = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const resolveTicketMutation = useMutation({
    mutationFn: async ({ ticketId, resolutionNote }: { ticketId: string; resolutionNote?: string }) => {
      console.log("Résolution du ticket:", { ticketId, resolutionNote });
      
      const { data, error } = await supabase
        .from("SupportClient")
        .update({
          statut: "resolu",
          date_resolution: new Date().toISOString()
        })
        .eq("IDTicketClient", parseInt(ticketId))
        .select();

      if (error) {
        console.error("Erreur lors de la résolution du ticket:", error);
        throw new Error(error.message);
      }

      console.log("Ticket résolu avec succès:", data);
      return data;
    },
    onSuccess: () => {
      // Rafraîchir les données des tickets
      queryClient.invalidateQueries({ queryKey: ["support-tickets"] });
      
      toast({
        title: "Ticket résolu",
        description: "Le ticket a été marqué comme résolu avec succès.",
      });
    },
    onError: (error) => {
      console.error("Erreur mutation:", error);
      toast({
        title: "Erreur",
        description: "Impossible de résoudre le ticket. Veuillez réessayer.",
        variant: "destructive",
      });
    },
  });

  return {
    resolveTicket: resolveTicketMutation.mutate,
    isResolving: resolveTicketMutation.isPending,
  };
};
