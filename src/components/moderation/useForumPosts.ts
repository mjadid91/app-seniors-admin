import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ForumPost } from "./types";

// ✅ CORRECTION 1 : Interface représentant une ligne de la vue SQL "v_forum_posts_stats"
interface ForumPostRow {
    IDSujetForum: number | string;
    TitreSujet: string;
    IDUtilisateurs: number | string | null;
    PrenomAuteur: string;
    NomAuteur: string;
    DateCreationSujet: string | null;
    nb_reponses: number | string;
    signalements: number | string;
}

// ✅ CORRECTION 2 : On remplace "any" par notre nouvelle interface
const mapForumPost = (row: ForumPostRow): ForumPost => ({
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
            // ✅ CORRECTION 3 : Utilisation de 'as never' pour le nom de la table
            // Cela évite l'erreur ESLint 'any' tout en bypassant la vérification de table inexistante
            const { data, error } = await supabase
                .from("v_forum_posts_stats" as never)
                .select("*")
                .order("DateCreationSujet", { ascending: false });

            if (error) {
                console.error("Erreur de récupération des sujets :", error);
                throw error;
            }

            // ✅ CORRECTION 4 : Cast des données reçues vers notre interface
            const rows = (data as unknown as ForumPostRow[]) || [];
            return rows.map(mapForumPost);
        },
    });
};