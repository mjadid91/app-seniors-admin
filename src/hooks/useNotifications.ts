
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuthStore } from '@/stores/authStore';

export interface Notification {
  IDNotifications: number;
  Titre: string;
  Message: string;
  DateCreation: string;
  EstLu: boolean;
  IDUtilisateurDestinataire: number;
  IDUtilisateurOrigine: number;
  TypeNotification: string;
  user_expediteur?: {
    Nom: string;
    Prenom: string;
  };
}

export const useNotifications = () => {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ['notifications', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from('Notifications')
        .select(`
          *,
          user_expediteur:Utilisateurs!IDUtilisateurOrigine(Nom, Prenom)
        `)
        .eq('IDUtilisateurDestinataire', parseInt(user.id))
        .order('DateCreation', { ascending: false });

      if (error) throw error;
      return data as Notification[];
    },
    enabled: !!user?.id,
  });
};

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  return useMutation({
    mutationFn: async (notificationId: number) => {
      const { error } = await supabase
        .from('Notifications')
        .update({ EstLu: true })
        .eq('IDNotifications', notificationId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', user?.id] });
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
          IDUtilisateurOrigine: notification.expediteurId,
          TypeNotification: notification.type,
          DateCreation: new Date().toISOString(),
          EstLu: false,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};
