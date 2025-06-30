
import { useNotifications, useMarkAllNotificationsAsRead } from "@/hooks/useNotifications";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCheck, Bell } from "lucide-react";
import NotificationItem from "./NotificationItem";

interface NotificationsListProps {
  limit?: number;
  showMarkAllRead?: boolean;
}

const NotificationsList = ({ limit, showMarkAllRead = true }: NotificationsListProps) => {
  const { user } = useAuthStore();
  const { data: notifications, isLoading, isError } = useNotifications(user?.id);
  const markAllAsReadMutation = useMarkAllNotificationsAsRead();

  const handleMarkAllAsRead = () => {
    markAllAsReadMutation.mutate(user?.id);
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="border rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Skeleton className="h-4 w-4 rounded-full mt-1" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-8">
        <Bell className="h-12 w-12 text-slate-400 mx-auto mb-4" />
        <p className="text-slate-600">Erreur lors du chargement des notifications</p>
      </div>
    );
  }

  if (!notifications || notifications.length === 0) {
    return (
      <div className="text-center py-8">
        <Bell className="h-12 w-12 text-slate-400 mx-auto mb-4" />
        <p className="text-slate-600">Aucune notification</p>
      </div>
    );
  }

  const displayedNotifications = limit ? notifications.slice(0, limit) : notifications;
  const unreadCount = notifications.filter(n => !n.EstLu).length;

  return (
    <div className="space-y-4">
      {showMarkAllRead && unreadCount > 0 && (
        <div className="flex justify-between items-center pb-2 border-b">
          <p className="text-sm text-slate-600">
            {unreadCount} notification{unreadCount > 1 ? 's' : ''} non lue{unreadCount > 1 ? 's' : ''}
          </p>
          <Button
            size="sm"
            variant="outline"
            onClick={handleMarkAllAsRead}
            disabled={markAllAsReadMutation.isPending}
            className="text-xs"
          >
            <CheckCheck className="h-3 w-3 mr-1" />
            Tout marquer comme lu
          </Button>
        </div>
      )}

      <div className="space-y-3">
        {displayedNotifications.map((notification) => (
          <NotificationItem
            key={notification.IDNotifications}
            notification={notification}
          />
        ))}
      </div>

      {limit && notifications.length > limit && (
        <p className="text-center text-sm text-slate-500 pt-2">
          Et {notifications.length - limit} autre{notifications.length - limit > 1 ? 's' : ''} notification{notifications.length - limit > 1 ? 's' : ''}...
        </p>
      )}
    </div>
  );
};

export default NotificationsList;
