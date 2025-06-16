
import { useState, useEffect, useRef } from 'react';
import { useSupabaseSeniorsData } from './operations/useSupabaseSeniorsData';
import { useSupabaseAidantsData } from './operations/useSupabaseAidantsData';

export const useSupabaseSeniors = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasInitialized = useRef(false);
  const isCurrentlyFetching = useRef(false);

  const { seniors, setSeniors, fetchSeniors } = useSupabaseSeniorsData();
  const { aidants, setAidants, fetchAidants } = useSupabaseAidantsData();

  const fetchData = async () => {
    // Empêcher les appels multiples simultanés
    if (isCurrentlyFetching.current) {
      console.log('Fetch already in progress, skipping...');
      return;
    }

    isCurrentlyFetching.current = true;
    setLoading(true);
    setError(null);
    
    try {
      console.log('Starting fetchData for seniors and aidants');
      await Promise.all([
        fetchSeniors(),
        fetchAidants()
      ]);
      console.log('Completed fetchData for seniors and aidants');
    } catch (err) {
      console.error('Erreur globale:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
      isCurrentlyFetching.current = false;
    }
  };

  useEffect(() => {
    // Empêcher l'initialisation multiple
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      console.log('Initializing useSupabaseSeniors...');
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
