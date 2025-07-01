
import { useState } from 'react';
import { Bell, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePermissions } from '@/hooks/usePermissions';
import NotificationsList from './NotificationsList';
import CreateNotificationModal from './CreateNotificationModal';

const NotificationCenter = () => {
  const { isAdmin } = usePermissions();
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Centre de notifications</h1>
          <p className="text-slate-600 mt-2">Gérez vos notifications</p>
        </div>

        {isAdmin() && (
          <Button onClick={() => setShowCreateModal(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Créer une notification
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Toutes les notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <NotificationsList />
        </CardContent>
      </Card>

      <CreateNotificationModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </div>
  );
};

export default NotificationCenter;
