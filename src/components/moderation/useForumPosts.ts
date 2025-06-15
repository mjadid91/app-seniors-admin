
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ForumPost } from "./types";

// Mapping function from Supabase row to ForumPost for frontend
const mapForumPost = (row: any): ForumPost => ({
  id: String(row.IDSujetForum),
  titre: row.TitreSujet,
  auteur: row.IDUtilisateurs
    ? "Utilisateur #" + row.IDUtilisateurs
    : "Inconnu",
  dateCreation: row.DateCreationSujet
    ? new Date(row.DateCreationSujet).toISOString()
    : new Date().toISOString(),
  nbReponses: row.nbReponses ?? 0, // This may need to be filled in later if relation exists
  signalements: row.signalements ?? 0, // This may need to be filled in later if relation exists
  statut: "visible", // Placeholder, set based on data if relevant
});

export const useForumPosts = () => {
  return useQuery({
    queryKey: ["moderation-forumPosts"],
    queryFn: async () => {
      // Récupère les sujets de forum, jointures possibles à ajouter si besoin
      const { data, error } = await supabase
        .from("SujetForum")
        .select("*")
        .order("DateCreationSujet", { ascending: false });

      if (error) throw error;
      // Post-process to match frontend typing. Signalements/nbReponses require joins for real values.
      return (data || []).map(mapForumPost);
    },
  });
};
