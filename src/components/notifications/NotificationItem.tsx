
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Bell, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMarkAsRead, type Notification } from '@/hooks/useNotifications';

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem = ({ notification }: NotificationItemProps) => {
  const markAsReadMutation = useMarkAsRead();

  const handleMarkAsRead = () => {
    if (!notification.EstLu) {
      markAsReadMutation.mutate(notification.IDNotifications);
    }
  };

  return (
    <div
      className={`p-4 border rounded-lg transition-colors hover:bg-slate-50 ${
        !notification.EstLu ? 'bg-blue-50 border-blue-200' : 'bg-white border-slate-200'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-1">
          <Bell className="h-4 w-4 text-blue-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-slate-800">{notification.Titre}</h3>
            {!notification.EstLu && (
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            )}
          </div>
          <p className="text-sm text-slate-600 mb-2">{notification.Message}</p>
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500">
              {formatDistanceToNow(new Date(notification.DateCreation), {
                addSuffix: true,
                locale: fr,
              })}
            </p>
            {!notification.EstLu && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMarkAsRead}
                className="h-8 px-2"
              >
                <Check className="h-3 w-3 mr-1" />
                Marquer comme lu
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
