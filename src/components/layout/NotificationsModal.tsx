
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Clock, AlertTriangle, CheckCircle, Info, Settings } from "lucide-react";
import { useNotifications } from "@/hooks/useNotifications";
import { useEffect } from "react";

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationsModal = ({ isOpen, onClose }: NotificationsModalProps) => {
  const { 
    notifications, 
    isLoading, 
    isUpdating, 
    unreadCount, 
    fetchNotifications, 
    markAllAsRead, 
    getRelativeTime 
  } = useNotifications();

  // Re-fetch notifications when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  const getNotificationIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'success': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'système': return <Settings className="h-4 w-4 text-purple-600" />;
      case 'info':
      default: return <Info className="h-4 w-4 text-blue-600" />;
    }
  };

  const getNotificationBadgeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'warning': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'success': return 'bg-green-100 text-green-700 border-green-200';
      case 'error': return 'bg-red-100 text-red-700 border-red-200';
      case 'système': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'info':
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-blue-600" />
            Toutes les notifications
            {unreadCount > 0 && (
              <Badge className="bg-red-100 text-red-700 border-red-200">
                {unreadCount} non lue{unreadCount > 1 ? 's' : ''}
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-sm text-slate-500">Chargement des notifications...</div>
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-sm text-slate-500">Aucune notification</div>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.IDNotifications}
                className={`p-4 rounded-lg border transition-colors hover:bg-slate-50 ${
                  !notification.EstLu ? 'bg-blue-50 border-blue-200' : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {getNotificationIcon(notification.TypeNotification)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-slate-800">{notification.Titre}</h3>
                      {!notification.EstLu && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{notification.Message}</p>
                    <div className="flex items-center gap-2">
                      <Badge className={getNotificationBadgeColor(notification.TypeNotification)}>
                        {notification.TypeNotification}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Clock className="h-3 w-3" />
                        {getRelativeTime(notification.DateCreation)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleMarkAllAsRead}
            disabled={isUpdating || unreadCount === 0}
          >
            {isUpdating ? 'Mise à jour...' : 'Marquer tout comme lu'}
          </Button>
          <Button onClick={onClose}>
            Fermer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationsModal;
