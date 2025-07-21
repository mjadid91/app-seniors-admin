
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface ModerationStatsData {
  signalements: number;
  masques: number;
  archives: number;
}

export const useModerationStats = () => {
  return useQuery({
    queryKey: ["moderation-stats"],
    // Refetch automatiquement toutes les 3 minutes pour les stats
    refetchInterval: 3 * 60 * 1000,
    staleTime: 2 * 60 * 1000,
    queryFn: async (): Promise<ModerationStatsData> => {
      // Récupérer le nombre total de signalements
      const { count: signalements } = await supabase
        .from("SignalementContenu")
        .select("*", { count: "exact", head: true });

      // Pour les contenus masqués et archivés, on peut compter depuis les tables concernées
      // En attendant d'avoir une logique de statut plus précise, on retourne des valeurs par défaut
      const masques = 0; // À implémenter selon la logique métier
      const archives = 0; // À implémenter selon la logique métier

      return {
        signalements: signalements ?? 0,
        masques,
        archives,
      };
    },
  });
};
