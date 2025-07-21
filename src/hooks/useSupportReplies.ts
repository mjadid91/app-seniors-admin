
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface SupportReply {
  IDReponse: number;
  IDTicketClient: number;
  IDAuteur: number;
  Contenu: string;
  DateReponse: string;
  auteur_nom?: string;
  auteur_prenom?: string;
  auteur_email?: string;
  is_support?: boolean;
}

export const useSupportReplies = (ticketId: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Récupérer les réponses d'un ticket
  const { data: replies = [], isLoading, error } = useQuery({
    queryKey: ["support-replies", ticketId],
    queryFn: async () => {
      console.log("Récupération des réponses pour ticket:", ticketId);
      
      const { data, error } = await supabase
        .from("ReponsesSupport")
        .select(`
          *,
          Utilisateurs!fk_auteur(
            Nom,
            Prenom,
            Email,
            IDCatUtilisateurs,
            CatUtilisateurs(EstSupport, EstAdministrateur)
          )
        `)
        .eq("IDTicketClient", parseInt(ticketId))
        .order("DateReponse", { ascending: true });

      if (error) {
        console.error("Erreur lors de la récupération des réponses:", error);
        throw new Error(error.message);
      }

      console.log("Réponses récupérées:", data);

      // Mapper les données pour inclure les informations sur l'auteur
      return data.map((reply: any) => ({
        ...reply,
        auteur_nom: reply.Utilisateurs?.Nom || "Inconnu",
        auteur_prenom: reply.Utilisateurs?.Prenom || "",
        auteur_email: reply.Utilisateurs?.Email || "",
        is_support: reply.Utilisateurs?.CatUtilisateurs?.EstSupport || reply.Utilisateurs?.CatUtilisateurs?.EstAdministrateur || false
      })) as SupportReply[];
    },
  });

  // Mutation pour ajouter une réponse
  const addReplyMutation = useMutation({
    mutationFn: async ({ 
      content, 
      authorId 
    }: { 
      content: string; 
      authorId: number;
    }) => {
      console.log("Ajout d'une réponse:", { ticketId, content, authorId });

      // Validation de l'authorId
      if (!authorId || isNaN(authorId)) {
        throw new Error("ID auteur invalide");
      }

      const { data, error } = await supabase
        .from("ReponsesSupport")
        .insert({
          IDTicketClient: parseInt(ticketId),
          IDAuteur: authorId,
          Contenu: content
        })
        .select()
        .single();

      if (error) {
        console.error("Erreur lors de l'ajout de la réponse:", error);
        throw new Error(error.message);
      }

      console.log("Réponse ajoutée avec succès:", data);
      return data;
    },
    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ["support-replies", ticketId] });
      queryClient.invalidateQueries({ queryKey: ["support-tickets"] });
      
      toast({
        title: "Réponse envoyée",
        description: "Votre réponse a été envoyée avec succès.",
      });

      // Déclencher l'envoi de l'email
      try {
        await sendEmailNotification(parseInt(ticketId), data.Contenu);
      } catch (emailError) {
        console.error("Erreur lors de l'envoi de l'email, mais la réponse a été sauvegardée:", emailError);
        // On ne fait pas échouer l'opération si l'email ne peut pas être envoyé
      }
    },
    onError: (error) => {
      console.error("Erreur mutation:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer la réponse. Veuillez réessayer.",
        variant: "destructive",
      });
    },
  });

  // Fonction pour envoyer l'email de notification
  const sendEmailNotification = async (ticketId: number, replyContent: string) => {
    try {
      console.log("Envoi de l'email de notification pour le ticket:", ticketId);
      
      const { data, error } = await supabase.functions.invoke('send-ticket-response', {
        body: {
          ticketId: ticketId,
          response: replyContent
        }
      });

      if (error) {
        console.error("Erreur lors de l'envoi de l'email:", error);
        throw error;
      } else {
        console.log("Email envoyé avec succès:", data);
        
        // Afficher une notification de succès pour l'email
        toast({
          title: "Email envoyé",
          description: "Le client a été notifié par email de votre réponse.",
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email:", error);
      
      // Afficher une notification d'erreur pour l'email
      toast({
        title: "Attention",
        description: "La réponse a été enregistrée mais l'email n'a pas pu être envoyé.",
        variant: "destructive",
      });
      
      throw error;
    }
  };

  return {
    replies,
    isLoading,
    error,
    addReply: addReplyMutation.mutate,
    isAddingReply: addReplyMutation.isPending,
  };
};
