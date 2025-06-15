
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Structure d'une prestation minimale adaptée à l'affichage du tableau
export interface PrestationDB {
  IDPrestation: number;
  Titre: string;
  TarifIndicatif: number;
  Description: string;
  IDDomaine: number | null;
}

export const useSupabasePrestations = () => {
  return useQuery({
    queryKey: ["prestations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("Prestation")
        .select("*");
      if (error) throw new Error(error.message);
      return data as PrestationDB[];
    },
  });
};
