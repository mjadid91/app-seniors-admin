
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuthStore } from '../stores/authStore';
import { useToast } from './use-toast';

interface Notification {
  IDNotifications: number;
  Titre: string;
  Message: string;
  TypeNotification: string;
  DateCreation: string;
  EstLu: boolean;
  IDUtilisateurDestinataire: number | null;
  IDUtilisateurOrigine: number | null;
  Cible: string | null;
}

export const useNotifications = () => {
  const { user } = useAuthStore();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchNotifications = async () => {
    if (!user?.id || user.id === 'NaN') {
      console.error('Invalid user ID:', user?.id);
      return;
    }

    setIsLoading(true);
    try {
      // Vérifier que l'ID utilisateur est un nombre valide
      const userIdNumber = parseInt(user.id);
      if (isNaN(userIdNumber)) {
        console.error('Cannot convert user ID to number:', user.id);
        toast({
          title: "Erreur",
          description: "ID utilisateur invalide.",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase
        .from('Notifications')
        .select('*')
        .eq('IDUtilisateurDestinataire', userIdNumber)
        .order('DateCreation', { ascending: false });

      if (error) {
        console.error('Erreur lors du chargement des notifications:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les notifications.",
          variant: "destructive",
        });
        return;
      }

      setNotifications(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const markAllAsRead = async () => {
    if (!user?.id || user.id === 'NaN') {
      console.error('Invalid user ID:', user?.id);
      return;
    }

    setIsUpdating(true);
    try {
      // Vérifier que l'ID utilisateur est un nombre valide
      const userIdNumber = parseInt(user.id);
      if (isNaN(userIdNumber)) {
        console.error('Cannot convert user ID to number:', user.id);
        toast({
          title: "Erreur",
          description: "ID utilisateur invalide.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('Notifications')
        .update({ EstLu: true })
        .eq('IDUtilisateurDestinataire', userIdNumber)
        .eq('EstLu', false);

      if (error) {
        console.error('Erreur lors de la mise à jour:', error);
        toast({
          title: "Erreur",
          description: "Impossible de marquer les notifications comme lues.",
          variant: "destructive",
        });
        return;
      }

      // Mettre à jour l'état local
      setNotifications(prev => 
        prev.map(notif => ({ ...notif, EstLu: true }))
      );

      toast({
        title: "Notifications mises à jour",
        description: "Toutes les notifications ont été marquées comme lues.",
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) {
      return "À l'instant";
    } else if (diffInMinutes < 60) {
      return `Il y a ${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''}`;
    } else if (diffInHours < 24) {
      return `Il y a ${diffInHours} heure${diffInHours > 1 ? 's' : ''}`;
    } else if (diffInDays < 7) {
      return `Il y a ${diffInDays} jour${diffInDays > 1 ? 's' : ''}`;
    } else {
      return date.toLocaleDateString('fr-FR');
    }
  };

  const unreadCount = notifications.filter(n => !n.EstLu).length;

  useEffect(() => {
    if (user?.id && user.id !== 'NaN') {
      fetchNotifications();
    }
  }, [user?.id]);

  return {
    notifications,
    isLoading,
    isUpdating,
    unreadCount,
    fetchNotifications,
    markAllAsRead,
    getRelativeTime
  };
};
