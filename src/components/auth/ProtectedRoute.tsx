
import { ReactNode } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { useSupabaseAuth } from '../../hooks/useSupabaseAuth';
import { usePermissions } from '../../hooks/usePermissions';
import { AlertTriangle, Lock, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

// Import the Permission type
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
  const { user: storeUser, isAuthenticated: storeAuth } = useAuthStore();
  const { user: authUser, isAuthenticated: authAuth, loading, authError } = useSupabaseAuth();
  const { canAccessPage, hasPermission } = usePermissions();
  const navigate = useNavigate();

  // Utiliser les données d'auth les plus récentes
  const user = authUser || storeUser;
  const isAuthenticated = authAuth || storeAuth;

  console.log('ProtectedRoute: Check access', {
    requiredPage,
    user: user ? `${user.prenom} ${user.nom} (${user.role})` : null,
    isAuthenticated,
    loading,
    authError
  });

  // Rediriger vers la connexion si pas authentifié (mais seulement après le chargement)
  useEffect(() => {
    if (!loading && !isAuthenticated && !authError) {
      console.log('ProtectedRoute: Not authenticated, redirecting to login');
      navigate('/connexion', { replace: true });
    }
  }, [loading, isAuthenticated, authError, navigate]);

  // Si erreur d'authentification, afficher l'erreur
  if (authError) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-slate-800">Erreur d'authentification</h3>
            <p className="text-slate-600 max-w-md">
              {authError}
            </p>
            <button 
              onClick={() => navigate('/connexion', { replace: true })}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retourner à la connexion
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Afficher le chargement pendant la vérification
  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
          <p className="text-slate-600">Vérification des droits d'accès...</p>
        </div>
      </div>
    );
  }

  // Si pas authentifié, ne rien afficher (la redirection va se faire)
  if (!isAuthenticated || !user) {
    console.log('ProtectedRoute: No authentication, redirecting...');
    return null;
  }

  const hasAccess = () => {
    if (requiredPage && !canAccessPage(requiredPage)) {
      console.log('ProtectedRoute: No access to page:', requiredPage);
      return false;
    }
    if (requiredPermission && !hasPermission(requiredPermission)) {
      console.log('ProtectedRoute: No permission:', requiredPermission);
      return false;
    }
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
              Vous n'avez pas les droits nécessaires pour accéder à cette section.
            </p>
            <p className="text-sm text-slate-500">
              Connecté en tant que: {user.prenom} {user.nom} ({user.role})
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

  console.log('ProtectedRoute: Access granted, rendering children');
  return <>{children}</>;
};

export default ProtectedRoute;
