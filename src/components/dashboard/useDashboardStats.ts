
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface DashboardStats {
  totalUsers: number;
  activeServices: number;
  totalRevenue: number;
  supportTickets: number;
}

export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeServices: 0,
    totalRevenue: 0,
    supportTickets: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);

        // Récupérer le nombre total d'utilisateurs
        const { count: usersCount, error: usersError } = await supabase
          .from('Utilisateurs')
          .select('*', { count: 'exact', head: true })
          .gte('IDCatUtilisateurs', 1);

        if (usersError) {
          console.error('Erreur utilisateurs:', usersError);
        }

        // Récupérer le nombre de prestations actives
        const { count: prestationsCount, error: prestationsError } = await supabase
          .from('MiseEnRelation')
          .select('*', { count: 'exact', head: true })
          .eq('Statut', 'en_cours');

        if (prestationsError) {
          console.error('Erreur prestations:', prestationsError);
        }

        // Récupérer le montant total des commissions (revenus)
        const { data: revenueData, error: revenueError } = await supabase
          .from('VersementCommissions')
          .select('MontantCommission');

        if (revenueError) {
          console.error('Erreur revenus:', revenueError);
        }

        const totalRevenue = revenueData?.reduce((sum, record) => {
          return sum + (parseFloat(record.MontantCommission?.toString() || '0') || 0);
        }, 0) || 0;

        // Récupérer le nombre de tickets de support (simulé pour l'instant)
        const supportTickets = Math.floor(Math.random() * 50) + 10;

        setStats({
          totalUsers: usersCount || 0,
          activeServices: prestationsCount || 0,
          totalRevenue: Math.round(totalRevenue * 100) / 100, // Arrondir à 2 décimales
          supportTickets
        });

      } catch (err) {
        console.error('Erreur lors de la récupération des statistiques:', err);
        setError('Erreur lors du chargement des statistiques');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
};
