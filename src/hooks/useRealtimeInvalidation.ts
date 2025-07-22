
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
  'ReponsesSupport': ['support-replies'],
  'ActiviteRemuneree_Utilisateurs': ['finances-transactions'],
  'Commande': ['finances-transactions'],
  'ServicePostMortem': ['finances-transactions'],
  'DonCagnotte': ['finances-transactions'],
  'CagnotteDeces': ['finances-transactions'],
  'VersementCommissions': ['finances-transactions'],
  'Prestation': ['prestations'],
  'MiseEnRelation': ['prestations'],
  'Domaine': ['domaines', 'prestations'],
  'Partenaire': ['partenaires'],
  'BonPlan': ['bon-plans'],
  'DemandeRGPD': ['demandes-rgpd'],
  'ConsentementCookies': ['consentements-cookies'],
  'DocumentRGPD': ['documents-rgpd'],
  'Document': ['documents'],
  'DocumentPatrimonial': ['documents-patrimoniaux'],
  'Notifications': ['notifications'],
  'SignalementContenu': ['moderation-stats', 'signalements'],
  'MessageGroupe': ['moderation-groupMessages', 'group-members', 'messages-groupe'],
  'SujetForum': ['moderation-forumPosts', 'forum-stats'],
  'ReponseForum': ['forum-replies', 'moderation-forumPosts', 'forum-stats'],
  'Forum': ['forums', 'forums-list'],
  'Groupe': ['groupes', 'groups-list', 'messages-groupe'],
  'Utilisateurs_Groupe': ['group-members', 'groups-list', 'membres-groupe-signalement'],
  'ParametresCommission': ['finances-transactions']
};

/**
 * Hook pour gérer l'invalidation automatique des queries en temps réel
 * Écoute les changements sur les tables Supabase et invalide les queries correspondantes
 * IMPORTANT: Ce hook ne doit être utilisé qu'une seule fois dans l'application (dans App.tsx)
 */
export const useRealtimeInvalidation = () => {
  const queryClient = useQueryClient();
  const channelRef = useRef<any>(null);
  const isSubscribedRef = useRef(false);

  useEffect(() => {
    // Éviter les souscriptions multiples
    if (isSubscribedRef.current || channelRef.current) {
      console.log('Real-time invalidation already active, skipping subscription');
      return;
    }

    // Créer un canal unique pour écouter les changements sur toutes les tables
    channelRef.current = supabase
      .channel(`schema-db-changes-${Math.random().toString(36).substr(2, 9)}`) // Canal unique
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
            
            // Forcer un refetch immédiat pour les données critiques de modération
            if (tableName === 'MessageGroupe') {
              queryClient.refetchQueries({ queryKey: ['moderation-groupMessages'] });
              queryClient.refetchQueries({ queryKey: ['messages-groupe'] });
            }
            if (tableName === 'ReponseForum') {
              queryClient.refetchQueries({ queryKey: ['moderation-forumPosts'] });
            }
            if (tableName === 'SignalementContenu') {
              queryClient.refetchQueries({ queryKey: ['signalements'] });
              queryClient.refetchQueries({ queryKey: ['moderation-stats'] });
            }
            if (tableName === 'Utilisateurs_Groupe') {
              queryClient.refetchQueries({ queryKey: ['group-members'] });
              // Invalider toutes les queries qui commencent par 'membres-groupe-signalement'
              queryClient.invalidateQueries({ 
                predicate: (query) => {
                  const queryKey = query.queryKey[0] as string;
                  return queryKey?.startsWith('membres-groupe-signalement');
                }
              });
            }
          } else {
            console.log(`Aucune query key configurée pour la table: ${tableName}`);
          }
        }
      )
      .subscribe((status) => {
        console.log('Real-time subscription status:', status);
        if (status === 'SUBSCRIBED') {
          isSubscribedRef.current = true;
          console.log('Écoute temps réel activée pour toutes les tables');
        }
      });

    // Nettoyage lors du démontage
    return () => {
      if (channelRef.current) {
        console.log('Cleaning up real-time subscription...');
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
        isSubscribedRef.current = false;
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
