import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ForumPost } from "./types";

// Fonction de formatage pure (séparée de la logique d'appel)
const mapForumPost = (row: any): ForumPost => ({
    id: String(row.IDSujetForum),
    titre: row.TitreSujet,
    auteur: row.IDUtilisateurs
        ? `${row.PrenomAuteur} ${row.NomAuteur}`
        : "Inconnu",
    dateCreation: row.DateCreationSujet
        ? new Date(row.DateCreationSujet).toISOString()
        : new Date().toISOString(),
    nbReponses: Number(row.nb_reponses) || 0,
    signalements: Number(row.signalements) || 0,
    statut: "visible",
});

export const useForumPosts = () => {
    return useQuery({
        queryKey: ["moderation-forumPosts"],
        refetchInterval: 2 * 60 * 1000, // Rafraîchissement toutes les 2 min
        staleTime: 1 * 60 * 1000,
        queryFn: async () => {

            // FINI LE PROBLÈME N+1 !
            // 1 seule requête cible notre vue pré-calculée.
            // (On utilise 'as any' pour bypasser TypeScript tant que les types Supabase ne sont pas regénérés)
            const { data, error } = await supabase
                .from("v_forum_posts_stats" as any)
                .select("*")
                .order("DateCreationSujet", { ascending: false });

            if (error) {
                console.error("Erreur de récupération des sujets :", error);
                throw error;
            }

            return (data || []).map(mapForumPost);
        },
    });
};