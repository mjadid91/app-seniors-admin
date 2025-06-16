
import { useState, useEffect } from 'react';
import { useSupabaseSeniorsData } from './operations/useSupabaseSeniorsData';
import { useSupabaseAidantsData } from './operations/useSupabaseAidantsData';

export const useSupabaseSeniors = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { seniors, setSeniors, fetchSeniors } = useSupabaseSeniorsData();
  const { aidants, setAidants, fetchAidants } = useSupabaseAidantsData();

  const fetchData = async () => {
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
    fetchData();
  }, []);

  return {
    seniors,
    aidants,
    loading,
    error,
    refetch: fetchData
  };
};
