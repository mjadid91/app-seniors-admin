
import { useAuthStore } from '../stores/authStore';

// Définition des permissions par rôle
export const PERMISSIONS = {
  // Permissions générales
  VIEW_DASHBOARD: 'view_dashboard',
  VIEW_USERS: 'view_users',
  MANAGE_USERS: 'manage_users',
  VIEW_SENIORS: 'view_seniors',
  MANAGE_SENIORS: 'manage_seniors',
  VIEW_PRESTATIONS: 'view_prestations',
  MANAGE_PRESTATIONS: 'manage_prestations',
  VIEW_MODERATION: 'view_moderation',
  MANAGE_MODERATION: 'manage_moderation',
  VIEW_SUPPORT: 'view_support',
  MANAGE_SUPPORT: 'manage_support',
  VIEW_DOCUMENTS: 'view_documents',
  MANAGE_DOCUMENTS: 'manage_documents',
  VIEW_PARTNERS: 'view_partners',
  MANAGE_PARTNERS: 'manage_partners',
  VIEW_RGPD: 'view_rgpd',
  MANAGE_RGPD: 'manage_rgpd',
  VIEW_FINANCES: 'view_finances',
  MANAGE_FINANCES: 'manage_finances',
  
  // Permissions spéciales
  MANAGE_ROLES: 'manage_roles',
  EXPORT_DATA: 'export_data',
  DELETE_CONTENT: 'delete_content',
  HIDE_CONTENT: 'hide_content',
} as const;

// Type pour les permissions
type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];

// Mapping des permissions par rôle selon vos spécifications
const ROLE_PERMISSIONS = {
  // Admin (IDCatUtilisateur = 5) : accès complet à tout
  administrateur: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.VIEW_SENIORS,
    PERMISSIONS.MANAGE_SENIORS,
    PERMISSIONS.VIEW_PRESTATIONS,
    PERMISSIONS.MANAGE_PRESTATIONS,
    PERMISSIONS.VIEW_MODERATION,
    PERMISSIONS.MANAGE_MODERATION,
    PERMISSIONS.VIEW_SUPPORT,
    PERMISSIONS.MANAGE_SUPPORT,
    PERMISSIONS.VIEW_DOCUMENTS,
    PERMISSIONS.MANAGE_DOCUMENTS,
    PERMISSIONS.VIEW_PARTNERS,
    PERMISSIONS.MANAGE_PARTNERS,
    PERMISSIONS.VIEW_RGPD,
    PERMISSIONS.MANAGE_RGPD,
    PERMISSIONS.VIEW_FINANCES,
    PERMISSIONS.MANAGE_FINANCES,
    PERMISSIONS.MANAGE_ROLES,
    PERMISSIONS.EXPORT_DATA,
    PERMISSIONS.DELETE_CONTENT,
    PERMISSIONS.HIDE_CONTENT,
  ],
  // Modérateur (IDCatUtilisateur = 6) : uniquement accès à la modération
  moderateur: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_MODERATION,
    PERMISSIONS.MANAGE_MODERATION,
    PERMISSIONS.DELETE_CONTENT,
    PERMISSIONS.HIDE_CONTENT,
  ],
  // Support (IDCatUtilisateur = 8) : uniquement accès au support
  support: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_SUPPORT,
    PERMISSIONS.MANAGE_SUPPORT,
  ],
  // Visualisateur (IDCatUtilisateur = 7) : accès en lecture seule à toutes les pages
  visualisateur: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.VIEW_SENIORS,
    PERMISSIONS.VIEW_PRESTATIONS,
    PERMISSIONS.VIEW_MODERATION,
    PERMISSIONS.VIEW_SUPPORT,
    PERMISSIONS.VIEW_DOCUMENTS,
    PERMISSIONS.VIEW_PARTNERS,
    PERMISSIONS.VIEW_RGPD,
    PERMISSIONS.VIEW_FINANCES,
    // Aucune permission de gestion/modification pour le visualisateur
  ],
};

// Pages accessibles par rôle selon vos spécifications
export const ACCESSIBLE_PAGES = {
  // Admin : toutes les pages
  administrateur: ['dashboard', 'users', 'seniors', 'prestations', 'moderation', 'support', 'documents', 'partners', 'rgpd', 'finances'],
  // Modérateur : uniquement dashboard et modération
  moderateur: ['dashboard', 'moderation'],
  // Support : uniquement dashboard et support
  support: ['dashboard', 'support'],
  // Visualisateur : toutes les pages en lecture seule
  visualisateur: ['dashboard', 'users', 'seniors', 'prestations', 'moderation', 'support', 'documents', 'partners', 'rgpd', 'finances'],
};

export const usePermissions = () => {
  const { user } = useAuthStore();

  const hasPermission = (permission: Permission): boolean => {
    if (!user) return false;
    const userPermissions = ROLE_PERMISSIONS[user.role] || [];
    return userPermissions.includes(permission);
  };

  const hasAnyPermission = (permissions: Permission[]): boolean => {
    return permissions.some(permission => hasPermission(permission));
  };

  const canAccessPage = (page: string): boolean => {
    if (!user) return false;
    const accessiblePages = ACCESSIBLE_PAGES[user.role] || [];
    return accessiblePages.includes(page);
  };

  const isAdmin = (): boolean => {
    return user?.role === 'administrateur';
  };

  const isModerator = (): boolean => {
    return user?.role === 'moderateur';
  };

  const isSupport = (): boolean => {
    return user?.role === 'support';
  };

  const isViewer = (): boolean => {
    return user?.role === 'visualisateur';
  };

  return {
    hasPermission,
    hasAnyPermission,
    canAccessPage,
    isAdmin,
    isModerator,
    isSupport,
    isViewer,
    userRole: user?.role,
  };
};
