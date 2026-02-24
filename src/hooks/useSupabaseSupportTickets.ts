import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface SupportTicketDB {
    id: number;
    sujet: string;
    message: string | null;
    date_creation: string | null;
    statut: "en_attente" | "en_cours" | "resolu";
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
    date_resolution?: string | null;
}

export const useSupabaseSupportTickets = () => {
    return useQuery({
        queryKey: ["support-tickets"],
        refetchInterval: 1 * 60 * 1000, // Rafraîchissement automatique toutes les minutes
        staleTime: 30 * 1000,
        queryFn: async () => {
            // 1. On interroge la vue
            // 2. On trie par date de création (les plus récents en premier)
            // 3. (Optionnel en prod) On pourrait ajouter un .limit(50) ou de la pagination
            const { data, error } = await supabase
                .from("support_dashboard_view")
                .select("*")
                .order("date_creation", { ascending: false });

            if (error) {
                console.error("Erreur récupération tickets:", error);
                throw new Error(error.message);
            }

            // On a supprimé le "pansement O(N²)" : les données SQL doivent être parfaites !
            return data as SupportTicketDB[];
        },
    });
};