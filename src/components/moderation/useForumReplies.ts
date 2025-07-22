
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ForumReply {
  id: string;
  contenu: string;
  auteur: string;
  dateReponse: string;
  idUtilisateur: number;
  idSujetForum: number;
}

const mapForumReply = (row: any): ForumReply => ({
  id: String(row.IDReponseForum),
  contenu: row.ContenuReponse,
  auteur: row.Utilisateurs ? `${row.Utilisateurs.Prenom} ${row.Utilisateurs.Nom}` : "Utilisateur inconnu",
  dateReponse: row.DateReponse,
  idUtilisateur: row.IDUtilisateurs,
  idSujetForum: row.IDSujetForum,
});

export const useForumReplies = (sujetId?: string) => {
  return useQuery({
    queryKey: ["forum-replies", sujetId],
    enabled: !!sujetId,
    queryFn: async () => {
      if (!sujetId) return [];
      
      const { data, error } = await supabase
        .from("ReponseForum")
        .select(`
          IDReponseForum,
          ContenuReponse,
          DateReponse,
          IDUtilisateurs,
          IDSujetForum,
          Utilisateurs!inner(Nom, Prenom)
        `)
        .eq("IDSujetForum", parseInt(sujetId))
        .order("DateReponse", { ascending: true });

      if (error) throw error;
      return (data || []).map(mapForumReply);
    },
  });
};
