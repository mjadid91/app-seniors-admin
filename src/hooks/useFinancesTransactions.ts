
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface FinanceTransaction {
  id: number;
  type: string;
  utilisateur: string;
  montant: number;
  commission: number;
  date: string;
  statut: string;
}

export const useFinancesTransactions = () => {
  return useQuery<FinanceTransaction[]>({
    queryKey: ["finances-transactions"],
    queryFn: async () => {
      const { data, error } = await supabase
          .from("v_financestransactions")
          .select("*")
          .order("date", { ascending: false });

      if (error) {
        console.error("Erreur lors du chargement des transactions :", error);
        throw new Error("Erreur lors du chargement des transactions");
      }

      return data as FinanceTransaction[];
    },
  });
};
