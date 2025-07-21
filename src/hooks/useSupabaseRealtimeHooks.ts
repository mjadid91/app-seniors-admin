import { useQueryClient } from '@tanstack/react-query';

/**
 * Hook utilitaire pour invalider les queries liées aux changements de données
 */
export const useQueryInvalidation = () => {
  const queryClient = useQueryClient();

  const invalidateRelatedQueries = (table: string) => {
    // Mapping des tables vers leurs query keys
    const tableQueryMapping: Record<string, string[]> = {
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

    const queryKeys = tableQueryMapping[table];
    if (queryKeys) {
      queryKeys.forEach(queryKey => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      });
    }
  };

  const invalidateAllQueries = () => {
    queryClient.invalidateQueries();
  };

  const invalidateSpecificQueries = (queryKeys: string[]) => {
    queryKeys.forEach(queryKey => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    });
  };

  return {
    invalidateRelatedQueries,
    invalidateAllQueries,
    invalidateSpecificQueries
  };
};