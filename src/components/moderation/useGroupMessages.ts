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
    // Refetch automatiquement toutes les 2 minutes pour la modération
    refetchInterval: 2 * 60 * 1000,
    staleTime: 1 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase
          .from("v_group_messages_moderation")
          .select("*")
          .order("DateEnvoi", { ascending: false });

      if (error) throw error;
      return (data || []).map(mapGroupMessage);
    },
  });
};
