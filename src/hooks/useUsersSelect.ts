
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface UserOption {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  displayName: string;
}

export const useUsersSelect = () => {
  return useQuery({
    queryKey: ["users-select"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("Utilisateurs")
        .select("IDUtilisateurs, Nom, Prenom, Email")
        .order("Nom", { ascending: true });
      
      if (error) throw new Error(error.message);
      
      return data?.map((user: any) => ({
        id: user.IDUtilisateurs,
        nom: user.Nom || "Nom non défini",
        prenom: user.Prenom || "Prénom non défini",
        email: user.Email || "Email non défini",
        displayName: `${user.Nom || "Nom non défini"} ${user.Prenom || "Prénom non défini"} (${user.Email || "Email non défini"})`
      })) as UserOption[];
    },
  });
};
