
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const usePartnerPrestations = (partnerId: number | null) => {
  const [prestationsCount, setPrestationsCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrestationsCount = async () => {
      if (!partnerId) {
        setPrestationsCount(0);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Récupérer tous les IDMiseEnRelation où IDPartenairePayeur = partnerId
        const { data: miseEnRelationData, error: miseEnRelationError } = await supabase
          .from('MiseEnRelation')
          .select('IDMiseEnRelation')
          .eq('IDPartenairePayeur', partnerId);

        if (miseEnRelationError) {
          console.error('Erreur lors de la récupération des mises en relation:', miseEnRelationError);
          setPrestationsCount(0);
          return;
        }

        if (!miseEnRelationData || miseEnRelationData.length === 0) {
          setPrestationsCount(0);
          return;
        }

        // Extraire les IDs pour la requête suivante
        const miseEnRelationIds = miseEnRelationData.map(item => item.IDMiseEnRelation);

        // Compter les lignes dans MiseEnRelation_Prestation avec ces IDs
        const { count, error: prestationError } = await supabase
          .from('MiseEnRelation_Prestation')
          .select('*', { count: 'exact', head: true })
          .in('IDMiseEnRelation', miseEnRelationIds);

        if (prestationError) {
          console.error('Erreur lors du comptage des prestations:', prestationError);
          setPrestationsCount(0);
          return;
        }

        setPrestationsCount(count || 0);
      } catch (error) {
        console.error('Erreur lors du calcul du nombre de prestations:', error);
        setPrestationsCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchPrestationsCount();
  }, [partnerId]);

  return { prestationsCount, loading };
};
