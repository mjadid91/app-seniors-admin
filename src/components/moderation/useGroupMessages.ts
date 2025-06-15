
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { GroupMessage } from "./types";

// Mapping function
const mapGroupMessage = (row: any): GroupMessage => ({
  id: String(row.IDMessageGroupe),
  contenu: row.Contenu,
  auteur: row.IDUtilisateurs
    ? "Utilisateur #" + row.IDUtilisateurs
    : "Inconnu",
  groupe: row.IDGroupe
    ? "Groupe #" + row.IDGroupe
    : "Inconnu",
  dateEnvoi: row.DateEnvoi
    ? new Date(row.DateEnvoi).toISOString()
    : new Date().toISOString(),
  signalements: row.signalements ?? 0,
  statut: "visible", // Placeholder, possible amélioration = status logic
});

export const useGroupMessages = () => {
  return useQuery({
    queryKey: ["moderation-groupMessages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("MessageGroupe")
        .select("*")
        .order("DateEnvoi", { ascending: false });

      if (error) throw error;
      return (data || []).map(mapGroupMessage);
    },
  });
};
