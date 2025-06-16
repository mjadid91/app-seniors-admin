
import { useState, useEffect, useRef } from 'react';
import { useSupabaseSeniorsData } from './operations/useSupabaseSeniorsData';
import { useSupabaseAidantsData } from './operations/useSupabaseAidantsData';

export const useSupabaseSeniors = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isInitializedRef = useRef(false);

  const { seniors, setSeniors, fetchSeniors } = useSupabaseSeniorsData();
  const { aidants, setAidants, fetchAidants } = useSupabaseAidantsData();

  const fetchData = async () => {
    // Empêcher les appels multiples pendant l'initialisation
    if (isInitializedRef.current && loading) {
      console.log('Data fetch already in progress, skipping...');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      await Promise.all([
        fetchSeniors(),
        fetchAidants()
      ]);
    } catch (err) {
      console.error('Erreur globale:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isInitializedRef.current) {
      isInitializedRef.current = true;
      fetchData();
    }
  }, []);

  return {
    seniors,
    aidants,
    loading,
    error,
    refetch: fetchData
  };
};
