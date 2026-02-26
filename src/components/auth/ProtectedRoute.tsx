import { ReactNode } from 'react';
import { usePermissions } from '../../hooks/usePermissions';
import { AlertTriangle, Lock } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore'; // <- store global d'auth

// Récupération dynamique du type Permission depuis le hook
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
  // On utilise uniquement le store global, plus de hook qui réinitialise
  const { isAuthenticated, isInitialized, user } = useAuthStore();
  const loading = !isInitialized;

  const { canAccessPage, hasPermission } = usePermissions();

  // --- ÉTAPE 1 : CHARGEMENT ---
  if (loading) {
    return (
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-slate-600 font-medium">Vérification des autorisations...</p>
          </div>
        </div>
    );
  }

  // --- ÉTAPE 2 : AUTHENTIFICATION ---
  if (!isAuthenticated || !user) {
    console.warn('ProtectedRoute: Accès refusé (Utilisateur non authentifié)');
    return (
        <div className="min-h-[400px] flex items-center justify-center p-4">
          <div className="text-center space-y-6 max-w-md">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center shadow-sm">
                <Lock className="h-10 w-10 text-slate-400" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-800">Session expirée ou utilisateur inconnu</h3>
              <p className="text-slate-600">
                Votre session n'est plus valide ou votre compte n'a pas été trouvé dans notre base de données.
              </p>
            </div>
            <button
                onClick={() => window.location.href = '/connexion'}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retour à la connexion
            </button>
          </div>
        </div>
    );
  }

  // --- ÉTAPE 3 : AUTORISATIONS (RÔLES) ---
  const checkAccess = () => {
    if (requiredPage && !canAccessPage(requiredPage)) return false;
    if (requiredPermission && !hasPermission(requiredPermission)) return false;
    return true;
  };

  if (!checkAccess()) {
    console.error(`ProtectedRoute: L'utilisateur ${user.email} n'a pas les droits pour cette section.`);

    if (fallback) return <>{fallback}</>;

    return (
        <div className="min-h-[400px] flex items-center justify-center p-4">
          <div className="text-center space-y-6 max-w-md">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center border border-red-100">
                <Lock className="h-10 w-10 text-red-600" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-800">Accès restreint</h3>
              <p className="text-slate-600">
                Votre rôle actuel (<span className="font-semibold text-slate-900">{user.role}</span>)
                ne vous permet pas de consulter cette page.
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 px-4 py-3 rounded-xl shadow-sm">
              <AlertTriangle className="h-5 w-5 shrink-0" />
              <span className="text-left">
              Si vous devriez avoir accès, contactez l'administrateur système.
            </span>
            </div>
          </div>
        </div>
    );
  }

  // --- ÉTAPE 4 : ACCÈS AUTORISÉ ---
  return <>{children}</>;
};

export default ProtectedRoute;