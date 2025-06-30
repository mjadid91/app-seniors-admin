
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { Bell, CheckCircle, AlertTriangle, Info, X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMarkNotificationAsRead, type Notification } from "@/hooks/useNotifications";

interface NotificationItemProps {
  notification: Notification;
  showActions?: boolean;
}

const NotificationItem = ({ notification, showActions = true }: NotificationItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const markAsReadMutation = useMarkNotificationAsRead();

  const getNotificationIcon = (type: string) => {
    const iconProps = { className: "h-4 w-4" };
    switch (type) {
      case 'success': return <CheckCircle {...iconProps} className="h-4 w-4 text-green-600" />;
      case 'warning': return <AlertTriangle {...iconProps} className="h-4 w-4 text-yellow-600" />;
      case 'error': return <AlertCircle {...iconProps} className="h-4 w-4 text-red-600" />;
      case 'system': return <Bell {...iconProps} className="h-4 w-4 text-purple-600" />;
      default: return <Info {...iconProps} className="h-4 w-4 text-blue-600" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'border-l-green-500 bg-green-50';
      case 'warning': return 'border-l-yellow-500 bg-yellow-50';
      case 'error': return 'border-l-red-500 bg-red-50';
      case 'system': return 'border-l-purple-500 bg-purple-50';
      default: return 'border-l-blue-500 bg-blue-50';
    }
  };

  const getBadgeColor = (cible: string) => {
    switch (cible) {
      case 'Admin': return 'bg-red-100 text-red-700 border-red-200';
      case 'Aidant': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Senior': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const handleMarkAsRead = () => {
    if (!notification.EstLu) {
      markAsReadMutation.mutate(notification.IDNotifications);
    }
  };

  const timeAgo = formatDistanceToNow(new Date(notification.DateCreation), {
    addSuffix: true,
    locale: fr
  });

  return (
    <div className={`border-l-4 rounded-lg p-4 transition-all hover:shadow-md ${getNotificationColor(notification.TypeNotification)} ${!notification.EstLu ? 'shadow-sm' : 'opacity-75'}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <div className="mt-1">
            {getNotificationIcon(notification.TypeNotification)}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className={`font-semibold text-slate-800 ${!notification.EstLu ? 'font-bold' : ''}`}>
                {notification.Titre}
              </h3>
              {!notification.EstLu && (
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              )}
            </div>

            <p className={`text-sm text-slate-600 mb-2 ${isExpanded ? '' : 'line-clamp-2'}`}>
              {notification.Message}
            </p>

            {notification.Message.length > 100 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs text-blue-600 hover:text-blue-800 mb-2"
              >
                {isExpanded ? 'Réduire' : 'Voir plus'}
              </button>
            )}

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Badge className={getBadgeColor(notification.Cible)}>
                {notification.Cible}
              </Badge>
              <span>•</span>
              <span>{timeAgo}</span>
            </div>
          </div>
        </div>

        {showActions && !notification.EstLu && (
          <Button
            size="sm"
            variant="ghost"
            onClick={handleMarkAsRead}
            disabled={markAsReadMutation.isPending}
            className="ml-2 h-8 w-8 p-0"
            title="Marquer comme lu"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default NotificationItem;
