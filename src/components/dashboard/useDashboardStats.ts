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
                const { data, error } = await supabase.rpc('get_admin_dashboard_stats' as never);

                if (error) throw error;

                // Le JSON retourné par SQL correspond exactement à notre interface
                setStats(data as unknown as DashboardStats);

            } catch (err) {
                const error = err as Error;
                console.error("Erreur Dashboard RPC:", error.message || error);
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