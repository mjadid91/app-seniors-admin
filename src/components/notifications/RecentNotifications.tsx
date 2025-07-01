
import { useNotifications } from '@/hooks/useNotifications';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const RecentNotifications = () => {
  const { data: notifications } = useNotifications();

  const recentNotifications = notifications?.slice(0, 5) || [];

  if (recentNotifications.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications récentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-500 text-center py-4">Aucune notification récente</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notifications récentes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentNotifications.map((notification) => (
            <div
              key={notification.IDNotifications}
              className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg"
            >
              <Bell className="h-4 w-4 text-blue-600 mt-1" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-sm">{notification.Titre}</h4>
                  {!notification.EstLue && (
                    <Badge variant="secondary" className="text-xs">Nouveau</Badge>
                  )}
                </div>
                <p className="text-xs text-slate-600 line-clamp-2">{notification.Message}</p>
                <p className="text-xs text-slate-500 mt-1">
                  {formatDistanceToNow(new Date(notification.DateCreation), {
                    addSuffix: true,
                    locale: fr,
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentNotifications;
