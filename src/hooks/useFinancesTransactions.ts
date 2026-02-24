import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface FinanceTransaction {
    id?: number; // Généré dynamiquement pour React key
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
}

export const useFinancesTransactions = () => {
    return useQuery<FinanceTransaction[]>({
        queryKey: ["finances-transactions"],
        refetchInterval: 30 * 1000,
        staleTime: 15 * 1000,
        queryFn: async () => {
            console.log("Récupération des transactions depuis la vue SQL...");

            try {
                // Appelle simplement notre nouvelle vue !
                // Finis les téléchargements de 4 tables géantes
                const { data, error } = await supabase
                    .from("v_finances_transactions_admin")
                    .select("*")
                    .order("date", { ascending: false });

                if (error) {
                    console.error("Erreur lors de la récupération :", error);
                    throw error;
                }

                // On rajoute juste un ID unique pour le rendu React (.map)
                return (data as FinanceTransaction[]).map((transaction, index) => ({
                    ...transaction,
                    id: index + 1
                }));

            } catch (error) {
                console.error("Erreur hook finances:", error);
                throw error;
            }
        },
    });
};