
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Structure adaptée à la vue support_dashboard_view
export interface SupportTicketDB {
  id: number; // Changed from string to number
  sujet: string;
  message: string | null;
  date_creation: string | null;
  statut: "a_traiter" | "en_cours" | "resolu";
  priorite: "basse" | "normale" | "haute";
  id_utilisateur: number | null;
  utilisateur_nom: string | null;
  utilisateur_prenom: string | null;
  utilisateur_email: string | null;
  id_prestation_support: number | null;
  id_intervenant: number | null;
  assigne_nom: string | null;
  assigne_prenom: string | null;
  assigne_email: string | null;
}

export const useSupabaseSupportTickets = () => {
  return useQuery({
    queryKey: ["support-tickets"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("support_dashboard_view")
        .select("*");
      if (error) throw new Error(error.message);
      return data as SupportTicketDB[];
    },
  });
};
