
import { useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface OptimizedQueryOptions<TData, TError = Error> extends Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'> {
  queryKey: string[];
  queryFn: () => Promise<TData>;
  showErrorToast?: boolean;
  errorMessage?: string;
}

export const useOptimizedQuery = <TData, TError = Error>({
  queryKey,
  queryFn,
  showErrorToast = true,
  errorMessage = 'Erreur lors du chargement des données',
  ...options
}: OptimizedQueryOptions<TData, TError>) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey,
    queryFn: async () => {
      try {
        console.log(`useOptimizedQuery: Fetching data for ${queryKey.join('.')}`);
        const data = await queryFn();
        console.log(`useOptimizedQuery: Successfully fetched ${queryKey.join('.')}`);
        return data;
      } catch (error) {
        console.error(`useOptimizedQuery: Error fetching ${queryKey.join('.')}:`, error);
        
        if (showErrorToast) {
          toast({
            title: "Erreur de chargement",
            description: errorMessage,
            variant: "destructive",
          });
        }
        
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (anciennement cacheTime)
    retry: (failureCount, error: any) => {
      // Retry jusqu'à 3 fois pour les erreurs réseau
      if (failureCount < 3 && error?.code !== 'PGRST116') {
        return true;
      }
      return false;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    ...options,
  });

  // Fonction pour invalider le cache de cette requête
  const invalidateQuery = useCallback(() => {
    queryClient.invalidateQueries({ queryKey });
  }, [queryClient, queryKey]);

  // Fonction pour précharger les données
  const prefetchQuery = useCallback(() => {
    queryClient.prefetchQuery({
      queryKey,
      queryFn,
      staleTime: 5 * 60 * 1000,
    });
  }, [queryClient, queryKey, queryFn]);

  // Fonction pour mettre à jour les données du cache
  const updateQueryData = useCallback((updater: (oldData: TData | undefined) => TData) => {
    queryClient.setQueryData(queryKey, updater);
  }, [queryClient, queryKey]);

  return {
    ...query,
    invalidateQuery,
    prefetchQuery,
    updateQueryData,
  };
};
