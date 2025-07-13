
import { ReactNode } from 'react';
import { useSupabaseAuth } from '../../hooks/useSupabaseAuth';
import { usePermissions } from '../../hooks/usePermissions';
import { AlertTriangle, Lock } from 'lucide-react';

type Permission = typeof import('../../hooks/usePermissions').PERMISSIONS[keyof typeof import('../../hooks/usePermissions').PERMISSIONS];

interface ProtectedRouteProps {
  children: ReactNode;
  requiredPage?: string;
  requiredPermission?: Permission;
  fallback?: ReactNode;
}

const ProtectedRoute = ({ 
  children, 
  requiredPage, 
  requiredPermission, 
  fallback 
}: ProtectedRouteProps) => {
  const { isAuthenticated, loading, isInitialized, user } = useSupabaseAuth();
  const { canAccessPage, hasPermission } = usePermissions();

  console.log('ProtectedRoute: Checking access', {
    isAuthenticated,
    loading,
    isInitialized,
    user: user ? { id: user.id, role: user.role } : null,
    requiredPage,
    requiredPermission
  });

  // Afficher le chargement si l'auth n'est pas encore initialisée ou en cours
  if (!isInitialized || loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-slate-600">Vérification des autorisations...</p>
        </div>
      </div>
    );
  }

  // Si pas authentifié, ne pas afficher le contenu
  if (!isAuthenticated || !user) {
    console.log('ProtectedRoute: User not authenticated');
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <Lock className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-slate-800">Authentification requise</h3>
            <p className="text-slate-600 max-w-md">
              Vous devez être connecté pour accéder à cette section.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const hasAccess = () => {
    if (requiredPage && !canAccessPage(requiredPage)) {
      console.log('ProtectedRoute: Access denied for page:', requiredPage);
      return false;
    }
    if (requiredPermission && !hasPermission(requiredPermission)) {
      console.log('ProtectedRoute: Access denied for permission:', requiredPermission);
      return false;
    }
    console.log('ProtectedRoute: Access granted');
    return true;
  };

  if (!hasAccess()) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <Lock className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-slate-800">Accès restreint</h3>
            <p className="text-slate-600 max-w-md">
              Votre rôle ({user.role}) ne permet pas d'accéder à cette section.
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-amber-600 bg-amber-50 px-4 py-2 rounded-lg">
            <AlertTriangle className="h-4 w-4" />
            <span>Contactez votre administrateur si vous pensez qu'il s'agit d'une erreur</span>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
