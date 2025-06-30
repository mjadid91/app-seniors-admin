
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Bell } from "lucide-react";
import NotificationsList from "./NotificationsList";
import CreateNotificationModal from "./CreateNotificationModal";
import { useAuthStore } from "@/stores/authStore";

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationCenter = ({ isOpen, onClose }: NotificationCenterProps) => {
  const { user } = useAuthStore();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState("received");

  const canCreateNotifications = user?.role === 'admin' || user?.role === 'moderateur';

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-blue-600" />
              Centre de notifications
              {canCreateNotifications && (
                <Button
                  size="sm"
                  onClick={() => setShowCreateModal(true)}
                  className="ml-auto"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Nouvelle notification
                </Button>
              )}
            </DialogTitle>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-1">
              <TabsTrigger value="received">Notifications reçues</TabsTrigger>
            </TabsList>

            <TabsContent value="received" className="mt-4">
              <div className="max-h-[50vh] overflow-y-auto pr-2">
                <NotificationsList />
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      <CreateNotificationModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </>
  );
};

export default NotificationCenter;
