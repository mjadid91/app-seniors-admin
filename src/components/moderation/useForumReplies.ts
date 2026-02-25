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

// ✅ CORRECTION 1 : Définition de la structure brute avec la jointure Utilisateurs
interface ForumReplyRow {
  IDReponseForum: number;
  ContenuReponse: string;
  DateReponse: string;
  IDUtilisateurs: number;
  IDSujetForum: number;
  Utilisateurs: {
    Nom: string;
    Prenom: string;
  } | null;
}

// ✅ CORRECTION 2 : Remplacement de "any" par notre nouvelle interface
const mapForumReply = (row: ForumReplyRow): ForumReply => ({
  id: String(row.IDReponseForum),
  contenu: row.ContenuReponse,
  auteur: row.Utilisateurs
      ? `${row.Utilisateurs.Prenom} ${row.Utilisateurs.Nom}`
      : "Utilisateur inconnu",
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

      // ✅ CORRECTION 3 : Cast des données vers le tableau de lignes typées
      const rows = (data as unknown as ForumReplyRow[]) || [];
      return rows.map(mapForumReply);
    },
  });
};