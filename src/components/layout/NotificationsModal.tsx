
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Clock, User, AlertTriangle, CheckCircle } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'info' | 'warning' | 'success' | 'error';
  isRead: boolean;
}

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Nouveau signalement',
    description: 'Un contenu inapproprié a été signalé dans le forum',
    time: 'Il y a 5 minutes',
    type: 'warning',
    isRead: false
  },
  {
    id: '2',
    title: 'Demande RGPD en attente',
    description: 'Une nouvelle demande de suppression de données',
    time: 'Il y a 1 heure',
    type: 'info',
    isRead: false
  },
  {
    id: '3',
    title: 'Nouveau partenaire inscrit',
    description: 'La pharmacie Martin a rejoint la plateforme',
    time: 'Il y a 2 heures',
    type: 'success',
    isRead: false
  },
  {
    id: '4',
    title: 'Ticket support résolu',
    description: 'Le ticket T001 a été marqué comme résolu',
    time: 'Il y a 3 heures',
    type: 'success',
    isRead: true
  },
  {
    id: '5',
    title: 'Prestation annulée',
    description: 'La prestation P005 a été annulée par le senior',
    time: 'Il y a 4 heures',
    type: 'error',
    isRead: true
  }
];

const NotificationsModal = ({ isOpen, onClose }: NotificationsModalProps) => {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'success': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <Bell className="h-4 w-4 text-blue-600" />;
    }
  };

  const getNotificationBadgeColor = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'success': return 'bg-green-100 text-green-700 border-green-200';
      case 'error': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-blue-600" />
            Toutes les notifications
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {mockNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border transition-colors hover:bg-slate-50 ${
                !notification.isRead ? 'bg-blue-50 border-blue-200' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-slate-800">{notification.title}</h3>
                    {!notification.isRead && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{notification.description}</p>
                  <div className="flex items-center gap-2">
                    <Badge className={getNotificationBadgeColor(notification.type)}>
                      {notification.type}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Clock className="h-3 w-3" />
                      {notification.time}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <Button variant="outline" size="sm">
            Marquer tout comme lu
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
