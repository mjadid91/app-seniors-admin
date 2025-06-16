
import { useState, useEffect, useRef } from 'react';
import { useSupabaseSeniorsData } from './operations/useSupabaseSeniorsData';
import { useSupabaseAidantsData } from './operations/useSupabaseAidantsData';

export const useSupabaseSeniors = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const initRef = useRef({
    hasInitialized: false,
    isInitializing: false
  });

  const { seniors, setSeniors, fetchSeniors } = useSupabaseSeniorsData();
  const { aidants, setAidants, fetchAidants } = useSupabaseAidantsData();

  const fetchData = async () => {
    // Empêcher les appels multiples pendant l'initialisation
    if (initRef.current.isInitializing) {
      console.log('Seniors data fetch already in progress, skipping...');
      return;
    }

    if (initRef.current.hasInitialized) {
      console.log('Seniors data already initialized, skipping...');
      return;
    }

    initRef.current.isInitializing = true;
    setLoading(true);
    setError(null);
    
    try {
      await Promise.all([
        fetchSeniors(),
        fetchAidants()
      ]);
      initRef.current.hasInitialized = true;
    } catch (err) {
      console.error('Erreur globale:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
      initRef.current.isInitializing = false;
    }
  };

  useEffect(() => {
    if (!initRef.current.hasInitialized && !initRef.current.isInitializing) {
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
