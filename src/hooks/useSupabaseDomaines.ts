
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface DomaineDB {
  IDDomaine: number;
  DomaineTitre: string;
}

export const useSupabaseDomaines = () => {
  return useQuery({
    queryKey: ["domaines"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("Domaine")
        .select("*");
      if (error) throw new Error(error.message);
      return data as DomaineDB[];
    },
  });
};

export const useSupabaseDomaine = (domaineId: number | null) => {
  return useQuery({
    queryKey: ["domaine", domaineId],
    queryFn: async () => {
      if (!domaineId) return null;
      const { data, error } = await supabase
        .from("Domaine")
        .select("*")
        .eq("IDDomaine", domaineId)
        .single();
      if (error) throw new Error(error.message);
      return data as DomaineDB;
    },
    enabled: !!domaineId,
  });
};
