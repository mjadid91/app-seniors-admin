
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
  categorie_type: string;
  original_id: number;
  id_utilisateurs?: number;
  id_commande?: number;
  id_activite_remuneree?: number;
  id_service_post_mortem?: number;
  id_don_cagnotte?: number;
  // Legacy fields for backward compatibility
  originalId?: number;
  idCommande?: number;
  idActiviteRemuneree?: number;
  idServicePostMortem?: number;
  idDonCagnotte?: number;
}

export const useFinancesTransactions = () => {
  return useQuery<FinanceTransaction[]>({
    queryKey: ["finances-transactions"],
    queryFn: async () => {
      console.log("Récupération des transactions depuis la vue...");
      
      try {
        const { data: transactions, error } = await supabase
          .from("v_financestransactions")
          .select("*")
          .order("date", { ascending: false });

        if (error) {
          console.error("Erreur lors du chargement des transactions:", error);
          throw new Error("Erreur lors du chargement des transactions");
        }

        // Map the data to ensure backward compatibility with existing code
        const mappedTransactions: FinanceTransaction[] = (transactions || []).map(transaction => ({
          id: transaction.id,
          type: transaction.type,
          utilisateur: transaction.utilisateur,
          montant: transaction.montant || 0,
          commission: transaction.commission || 0,
          date: transaction.date,
          statut: transaction.statut,
          categorie_type: transaction.categorie_type,
          original_id: transaction.original_id,
          id_utilisateurs: transaction.id_utilisateurs,
          id_commande: transaction.id_commande,
          id_activite_remuneree: transaction.id_activite_remuneree,
          id_service_post_mortem: transaction.id_service_post_mortem,
          id_don_cagnotte: transaction.id_don_cagnotte,
          // Legacy fields for backward compatibility
          originalId: transaction.original_id,
          idCommande: transaction.id_commande,
          idActiviteRemuneree: transaction.id_activite_remuneree,
          idServicePostMortem: transaction.id_service_post_mortem,
          idDonCagnotte: transaction.id_don_cagnotte
        }));

        console.log("Transactions récupérées depuis la vue:", mappedTransactions);
        return mappedTransactions;
      } catch (error) {
        console.error("Erreur lors de la récupération des transactions:", error);
        throw error;
      }
    },
  });
};
