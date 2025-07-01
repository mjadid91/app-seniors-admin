
import { useNotifications } from '@/hooks/useNotifications';
import NotificationItem from './NotificationItem';
import { Skeleton } from '@/components/ui/skeleton';

const NotificationsList = () => {
  const { data: notifications, isLoading, error } = useNotifications();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        Erreur lors du chargement des notifications
      </div>
    );
  }

  if (!notifications || notifications.length === 0) {
    return (
      <div className="text-center text-slate-500 p-8">
        <p>Aucune notification</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <NotificationItem key={notification.IDNotifications} notification={notification} />
      ))}
    </div>
  );
};

export default NotificationsList;
