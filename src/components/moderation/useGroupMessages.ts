
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { GroupMessage } from "./types";

// Mapping function
const mapGroupMessage = (row: any): GroupMessage => ({
  id: String(row.IDMessageGroupe),
  contenu: row.Contenu,
  auteur: `${row.PrenomAuteur} ${row.NomAuteur}`,
  groupe: row.NomGroupe,
  dateEnvoi: row.DateEnvoi
      ? new Date(row.DateEnvoi).toISOString()
      : new Date().toISOString(),
  signalements: Number(row.signalements) || 0,
  statut: "visible",
});

export const useGroupMessages = () => {
  return useQuery({
    queryKey: ["moderation-groupMessages"],
    // Configuration pour temps réel optimisée
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    // Réduire le staleTime pour une réactivité plus rapide
    staleTime: 30 * 1000, // 30 secondes au lieu de 1 minute
    // Refetch automatiquement plus fréquent pour la modération
    refetchInterval: 60 * 1000, // 1 minute au lieu de 2 minutes
    queryFn: async () => {
      console.log('Récupération des messages de groupe...');
      const { data, error } = await supabase
          .from("v_group_messages_moderation")
          .select("*")
          .order("DateEnvoi", { ascending: false });

      if (error) {
        console.error('Erreur lors de la récupération des messages:', error);
        throw error;
      }
      
      console.log('Messages récupérés:', data?.length || 0);
      return (data || []).map(mapGroupMessage);
    },
  });
};
