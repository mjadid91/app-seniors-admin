
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuthStore } from '@/stores/authStore';

export interface Notification {
  IDNotifications: number;
  Titre: string;
  Message: string;
  DateCreation: string;
  EstLue: boolean;
  IDUtilisateurDestinataire: number;
  IDUtilisateurExpediteur: number;
  Type: string;
  user_expediteur?: {
    Nom: string;
    Prenom: string;
  };
}

export const useNotifications = () => {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ['notifications', user?.IDUtilisateurs],
    queryFn: async () => {
      if (!user?.IDUtilisateurs) return [];

      const { data, error } = await supabase
        .from('Notifications')
        .select(`
          *,
          user_expediteur:Utilisateurs!IDUtilisateurExpediteur(Nom, Prenom)
        `)
        .eq('IDUtilisateurDestinataire', user.IDUtilisateurs)
        .order('DateCreation', { ascending: false });

      if (error) throw error;
      return data as Notification[];
    },
    enabled: !!user?.IDUtilisateurs,
  });
};

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  return useMutation({
    mutationFn: async (notificationId: number) => {
      const { error } = await supabase
        .from('Notifications')
        .update({ EstLue: true })
        .eq('IDNotifications', notificationId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', user?.IDUtilisateurs] });
    },
  });
};

export const useCreateNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notification: {
      titre: string;
      message: string;
      destinataireId: number;
      expediteurId: number;
      type: string;
    }) => {
      const { error } = await supabase
        .from('Notifications')
        .insert({
          Titre: notification.titre,
          Message: notification.message,
          IDUtilisateurDestinataire: notification.destinataireId,
          IDUtilisateurExpediteur: notification.expediteurId,
          Type: notification.type,
          DateCreation: new Date().toISOString(),
          EstLue: false,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};
