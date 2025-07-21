import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Configuration des tables et leurs query keys associées
const TABLE_QUERY_MAPPING = {
  'Utilisateurs': ['users', 'seniors', 'aidants', 'support-users'],
  'Seniors': ['seniors'],
  'Aidant': ['aidants'],
  'SupportClient': ['support-tickets'],
  'ReponseSupport': ['support-replies'],
  'ActiviteRemuneree_Utilisateurs': ['finances-transactions'],
  'Commande': ['finances-transactions'],
  'ServicePostMortem': ['finances-transactions'],
  'DonCagnotte': ['finances-transactions'],
  'CagnotteDeces': ['finances-transactions'],
  'VersementCommissions': ['finances-transactions'],
  'Prestation': ['prestations'],
  'Domaine': ['domaines'],
  'Partenaire': ['partenaires'],
  'BonPlan': ['bon-plans'],
  'DemandeRGPD': ['demandes-rgpd'],
  'ConsentementCookies': ['consentements-cookies'],
  'DocumentRGPD': ['documents-rgpd'],
  'Document': ['documents'],
  'DocumentPatrimonial': ['documents-patrimoniaux'],
  'Notifications': ['notifications'],
  'SignalementContenu': ['moderation-stats', 'signalements'],
  'MessageGroupe': ['moderation-groupMessages'],
  'SujetForum': ['moderation-forumPosts'],
  'Forum': ['forums'],
  'Groupe': ['groupes'],
  'ParametresCommission': ['finances-transactions']
};

/**
 * Hook pour gérer l'invalidation automatique des queries en temps réel
 * Écoute les changements sur les tables Supabase et invalide les queries correspondantes
 */
export const useRealtimeInvalidation = () => {
  const queryClient = useQueryClient();
  const channelRef = useRef<any>(null);

  useEffect(() => {
    // Créer un canal pour écouter les changements sur toutes les tables
    channelRef.current = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Écouter tous les événements (INSERT, UPDATE, DELETE)
          schema: 'public'
        },
        (payload) => {
          console.log('Changement détecté dans la base de données:', payload);
          
          const tableName = payload.table;
          const queryKeys = TABLE_QUERY_MAPPING[tableName as keyof typeof TABLE_QUERY_MAPPING];
          
          if (queryKeys) {
            console.log(`Invalidation des queries pour la table ${tableName}:`, queryKeys);
            
            // Invalider toutes les queries associées à cette table
            queryKeys.forEach(queryKey => {
              queryClient.invalidateQueries({ queryKey: [queryKey] });
            });
          } else {
            console.log(`Aucune query key configurée pour la table: ${tableName}`);
          }
        }
      )
      .subscribe();

    console.log('Écoute temps réel activée pour toutes les tables');

    // Nettoyage lors du démontage
    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        console.log('Écoute temps réel désactivée');
      }
    };
  }, [queryClient]);

  // Fonction utilitaire pour invalider manuellement des queries
  const invalidateQueries = (queryKeys: string[]) => {
    queryKeys.forEach(queryKey => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    });
  };

  return { invalidateQueries };
};