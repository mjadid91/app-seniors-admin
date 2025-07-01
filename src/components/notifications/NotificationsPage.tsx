
import { usePermissions } from '@/hooks/usePermissions';
import NotificationCenter from './NotificationCenter';

const NotificationsPage = () => {
  const { canAccessPage } = usePermissions();

  if (!canAccessPage('dashboard')) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-slate-600">Accès non autorisé</p>
      </div>
    );
  }

  return <NotificationCenter />;
};

export default NotificationsPage;
