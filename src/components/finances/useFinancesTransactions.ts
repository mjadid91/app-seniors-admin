
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

      // On suppose que la vue expose les bonnes colonnes, à ajuster si ce n'est pas le cas.
      const { data, error } = await supabase
        .from("V_FinancesTransactions")
        .select("*")
        .order("date", { ascending: false });

      if (error) {
        setError("Impossible de charger les transactions financières.");
        setLoading(false);
        return;
      }
      setTransactions(
        (data || []).map((t: any) => ({
          id: t.id ?? t.ID ?? t.IDTransaction ?? Math.random(), // fallback si différent
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
