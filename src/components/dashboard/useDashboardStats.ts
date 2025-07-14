
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface DashboardStats {
  utilisateurs: number;
  prestations: number;
  messages: number;
  signalements: number;
  revenus: number;
}

export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);

      try {
        // Nombre d'utilisateurs
        const { count: usersCount } = await supabase
          .from("Utilisateurs")
          .select("*", { count: "exact", head: true });

        // Nombre de prestations
        const { count: prestationsCount } = await supabase
          .from("Prestation")
          .select("*", { count: "exact", head: true });

        // Nombre de messages actifs (par exemple groupe, forum ou autre)
        const { count: messagesCount } = await supabase
          .from("MessageGroupe") // adapter si un autre type de messages
          .select("*", { count: "exact", head: true });

        // Nombre de signalements
        const { count: reportsCount } = await supabase
          .from("SignalementContenu")
          .select("*", { count: "exact", head: true });

        // Revenus = Montant total des commissions versées
        const { data: commissionsData, error: commissionsError } = await supabase
          .from("VersementCommissions")
          .select("MontantCommission");

        const revenus = commissionsError || !commissionsData
          ? 0
          : commissionsData.reduce(
              (sum: number, row: any) => sum + (Number(row.MontantCommission) || 0),
              0
            );

        setStats({
          utilisateurs: usersCount ?? 0,
          prestations: prestationsCount ?? 0,
          messages: messagesCount ?? 0,
          signalements: reportsCount ?? 0,
          revenus,
        });
      } catch (err: any) {
        setError("Erreur lors du chargement des statistiques.");
        setStats(null);
      }
      setLoading(false);
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
};
