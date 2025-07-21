import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ForumPost } from "./types";

const mapForumPost = (row: any): ForumPost => ({
  id: String(row.IDSujetForum),
  titre: row.TitreSujet,
  auteur: row.IDUtilisateurs
      ? `${row.PrenomAuteur} ${row.NomAuteur}`
      : "Inconnu",
  dateCreation: row.DateCreationSujet
      ? new Date(row.DateCreationSujet).toISOString()
      : new Date().toISOString(),
  nbReponses: row.nbReponses ?? 0,
  signalements: row.signalements ?? 0,
  statut: "visible",
});

export const useForumPosts = () => {
  return useQuery({
    queryKey: ["moderation-forumPosts"],
    // Refetch automatiquement toutes les 2 minutes pour la modération
    refetchInterval: 2 * 60 * 1000,
    staleTime: 1 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase
          .from("v_forum_posts_moderation")
          .select("*")
          .order("DateCreationSujet", { ascending: false });

      if (error) throw error;
      return (data || []).map(mapForumPost);
    },
  });
};
