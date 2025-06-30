
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Bell } from "lucide-react";
import NotificationsList from "./NotificationsList";
import CreateNotificationModal from "./CreateNotificationModal";
import { useAuthStore } from "../../stores/authStore";

const NotificationsPage = () => {
  const { user } = useAuthStore();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const canCreateNotifications = user?.role === 'admin' || user?.role === 'moderateur';

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <Bell className="h-6 w-6" />
              Notifications
            </h1>
            <p className="text-slate-600">
              Gérez et consultez toutes vos notifications
            </p>
          </div>

          {canCreateNotifications && (
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle notification
            </Button>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Toutes les notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <NotificationsList />
          </CardContent>
        </Card>
      </div>

      <CreateNotificationModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </>
  );
};

export default NotificationsPage;
