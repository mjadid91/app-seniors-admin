
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface PrestationDB {
  id: number;
  type_prestation: string;
  date_creation: string;
  tarif: number;
  statut: "en_attente" | "en_cours" | "terminee" | "refusee" | "annulee";
  IDSeniors: number | null;
  senior_nom: string;
  IDAidant: number | null;
  aidant_nom: string;
  evaluation?: number | null;
  evaluation_commentaire?: string | null;
  IDDomaine?: number | null;
  domaine_nom?: string | null;
}

export const useSupabasePrestations = () => {
  return useQuery({
    queryKey: ["prestations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("prestations_dashboard_view")
        .select("*");
      if (error) throw new Error(error.message);
      return data as PrestationDB[];
    },
  });
};
