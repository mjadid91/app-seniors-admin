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
                // UNE SEULE REQUÊTE RPC !
                // Le "as any" permet de contourner l'erreur TS en attendant
                // la prochaine mise à jour du fichier types.ts
                const { data, error } = await supabase.rpc('get_admin_dashboard_stats' as any);

                if (error) throw error;

                // Le JSON retourné par SQL correspond exactement à notre interface
                setStats(data as unknown as DashboardStats);

            } catch (err: any) {
                console.error("Erreur Dashboard RPC:", err);
                setError("Erreur lors du chargement des statistiques globales.");
                setStats(null);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return { stats, loading, error };
};