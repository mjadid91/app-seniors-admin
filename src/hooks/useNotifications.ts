
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Notification {
  IDNotifications: number;
  IDUtilisateurDestinataire: number | null;
  IDUtilisateurOrigine: number | null;
  DateCreation: string;
  EstLu: boolean;
  Titre: string;
  Message: string;
  TypeNotification: 'info' | 'success' | 'warning' | 'error' | 'system';
  Cible: 'Admin' | 'Aidant' | 'Senior' | 'Tous';
}

export const useNotifications = (userId?: number) => {
  return useQuery({
    queryKey: ['notifications', userId],
    queryFn: async () => {
      let query = supabase
        .from('Notifications')
        .select('*')
        .order('DateCreation', { ascending: false });

      if (userId) {
        query = query.or(`IDUtilisateurDestinataire.eq.${userId},Cible.eq.Tous`);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Erreur lors de la récupération des notifications:', error);
        throw error;
      }

      return data as Notification[];
    },
    staleTime: 30000, // 30 secondes
  });
};

export const useUnreadNotificationsCount = (userId?: number) => {
  return useQuery({
    queryKey: ['notifications-unread-count', userId],
    queryFn: async () => {
      let query = supabase
        .from('Notifications')
        .select('*', { count: 'exact', head: true })
        .eq('EstLu', false);

      if (userId) {
        query = query.or(`IDUtilisateurDestinataire.eq.${userId},Cible.eq.Tous`);
      }

      const { count, error } = await query;

      if (error) {
        console.error('Erreur lors du comptage des notifications non lues:', error);
        throw error;
      }

      return count || 0;
    },
    staleTime: 10000, // 10 secondes
  });
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (notificationId: number) => {
      const { error } = await supabase
        .from('Notifications')
        .update({ EstLu: true })
        .eq('IDNotifications', notificationId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications-unread-count'] });
    },
    onError: (error) => {
      console.error('Erreur lors de la marque comme lu:', error);
      toast({
        title: "Erreur",
        description: "Impossible de marquer la notification comme lue",
        variant: "destructive"
      });
    }
  });
};

export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (userId?: number) => {
      let query = supabase
        .from('Notifications')
        .update({ EstLu: true })
        .eq('EstLu', false);

      if (userId) {
        query = query.or(`IDUtilisateurDestinataire.eq.${userId},Cible.eq.Tous`);
      }

      const { error } = await query;
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications-unread-count'] });
      toast({
        title: "Succès",
        description: "Toutes les notifications ont été marquées comme lues"
      });
    },
    onError: (error) => {
      console.error('Erreur lors de la marque globale comme lu:', error);
      toast({
        title: "Erreur",
        description: "Impossible de marquer toutes les notifications comme lues",
        variant: "destructive"
      });
    }
  });
};

export const useCreateNotification = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (notification: Omit<Notification, 'IDNotifications' | 'DateCreation' | 'EstLu'>) => {
      const { error } = await supabase
        .from('Notifications')
        .insert({
          ...notification,
          DateCreation: new Date().toISOString(),
          EstLu: false
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications-unread-count'] });
      toast({
        title: "Notification créée",
        description: "La notification a été envoyée avec succès"
      });
    },
    onError: (error) => {
      console.error('Erreur lors de la création de la notification:', error);
      toast({
        title: "Erreur",
        description: "Impossible de créer la notification",
        variant: "destructive"
      });
    }
  });
};
