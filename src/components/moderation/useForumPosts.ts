
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
  nbReponses: row.nb_reponses || 0,
  signalements: row.signalements || 0,
  statut: "visible",
});

export const useForumPosts = () => {
  return useQuery({
    queryKey: ["moderation-forumPosts"],
    refetchInterval: 2 * 60 * 1000,
    staleTime: 1 * 60 * 1000,
    queryFn: async () => {
      // Récupérer les sujets avec le vrai nombre de réponses
      const { data, error } = await supabase
          .from("SujetForum")
          .select(`
            IDSujetForum,
            TitreSujet,
            DateCreationSujet,
            IDUtilisateurs,
            Utilisateurs!inner(Nom, Prenom)
          `)
          .order("DateCreationSujet", { ascending: false });

      if (error) throw error;

      // Pour chaque sujet, compter le nombre réel de réponses
      const postsWithReplyCounts = await Promise.all(
        (data || []).map(async (sujet) => {
          // Compter les réponses pour ce sujet
          const { count: replyCount } = await supabase
            .from("ReponseForum")
            .select("*", { count: "exact", head: true })
            .eq("IDSujetForum", sujet.IDSujetForum);

          // Compter les signalements pour ce sujet
          const { count: signalements } = await supabase
            .from("SignalementContenu")
            .select("*", { count: "exact", head: true })
            .eq("IDReponseForum", sujet.IDSujetForum)
            .eq("Traité", false);

          return {
            ...sujet,
            PrenomAuteur: sujet.Utilisateurs?.Prenom,
            NomAuteur: sujet.Utilisateurs?.Nom,
            nb_reponses: replyCount || 0,
            signalements: signalements || 0
          };
        })
      );

      return postsWithReplyCounts.map(mapForumPost);
    },
  });
};
