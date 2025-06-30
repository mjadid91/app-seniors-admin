
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, ArrowRight } from "lucide-react";
import NotificationsList from "../notifications/NotificationsList";
import { useState } from "react";
import NotificationCenter from "../notifications/NotificationCenter";

const RecentNotifications = () => {
  const [showAllNotifications, setShowAllNotifications] = useState(false);

  return (
    <>
      <Card className="h-fit">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications récentes
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAllNotifications(true)}
            className="text-xs"
          >
            Voir tout
            <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        </CardHeader>
        <CardContent>
          <NotificationsList limit={3} showMarkAllRead={false} />
        </CardContent>
      </Card>

      <NotificationCenter 
        isOpen={showAllNotifications} 
        onClose={() => setShowAllNotifications(false)} 
      />
    </>
  );
};

export default RecentNotifications;
