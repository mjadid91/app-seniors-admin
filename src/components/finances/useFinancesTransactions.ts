
import { useEffect, useState } from "react";
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

export function useFinancesTransactions() {
  const [transactions, setTransactions] = useState<FinanceTransaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);

      // Use the correct lowercase view name matching Supabase's generated types
      const { data, error } = await supabase
        .from("v_financestransactions")
        .select("*")
        .order("date", { ascending: false });

      if (error) {
        setError("Impossible de charger les transactions financières.");
        setLoading(false);
        return;
      }
      // Add a console log for debugging field names
      console.log("Fetched v_financestransactions:", data);
      setTransactions(
        (data || []).map((t: any) => ({
          id: t.id ?? t.ID ?? t.IDTransaction ?? Math.random(),
          type: t.type || t.TypeCommande || "-",
          utilisateur: t.utilisateur || t.Utilisateur || t.prenom_utilisateur || "-",
          montant: t.montant ?? t.Montant ?? t.montant_total ?? 0,
          commission: t.commission ?? t.Commission ?? 0,
          date: t.date ?? t.Date ?? t.date_transaction ?? "",
          statut: t.statut ?? t.Statut ?? t.StatutPaiement ?? "-",
        }))
      );
      setLoading(false);
    };

    fetchTransactions();
  }, []);

  return { transactions, loading, error };
}
