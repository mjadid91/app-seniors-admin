
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  role: 'administrateur' | 'moderateur' | 'support' | 'visualisateur';
  photo?: string;
  dateInscription: string;
}

interface AuthError {
  message: string;
  code?: string;
  timestamp: number;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  error: AuthError | null;
  lastActivity: number;
  sessionTimeout: number; // en millisecondes
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  setUser: (user: User | null) => void;
  setAuthenticated: (authenticated: boolean) => void;
  setError: (error: AuthError | null) => void;
  clearError: () => void;
  updateLastActivity: () => void;
  isSessionExpired: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      error: null,
      lastActivity: Date.now(),
      sessionTimeout: 8 * 60 * 60 * 1000, // 8 heures

      login: async (email: string, password: string) => {
        try {
          // Cette fonction est maintenant gérée par useSupabaseAuth
          console.log('AuthStore: Login attempt redirected to useSupabaseAuth');
          set({ error: null, lastActivity: Date.now() });
          return false;
        } catch (error: any) {
          const authError: AuthError = {
            message: error?.message || 'Erreur de connexion',
            code: error?.code,
            timestamp: Date.now(),
          };
          set({ error: authError });
          return false;
        }
      },

      logout: () => {
        console.log('AuthStore: Clearing all auth data');
        set({ 
          user: null, 
          isAuthenticated: false, 
          token: null,
          error: null,
          lastActivity: Date.now(),
        });
      },

      checkAuth: async () => {
        try {
          const { token, isSessionExpired } = get();
          
          if (!token) {
            set({ isAuthenticated: false, user: null, error: null });
            return;
          }

          if (isSessionExpired()) {
            console.log('AuthStore: Session expired, logging out');
            const expiredError: AuthError = {
              message: 'Session expirée, veuillez vous reconnecter',
              code: 'SESSION_EXPIRED',
              timestamp: Date.now(),
            };
            set({ 
              isAuthenticated: false, 
              user: null, 
              token: null,
              error: expiredError 
            });
            return;
          }

          // En mode réel, on vérifierait le token avec le backend
          console.log('AuthStore: Token valid, session active');
          set({ error: null });
        } catch (error: any) {
          console.error('AuthStore: Auth check failed:', error);
          const authError: AuthError = {
            message: 'Erreur de vérification d\'authentification',
            code: error?.code || 'AUTH_CHECK_FAILED',
            timestamp: Date.now(),
          };
          set({ 
            isAuthenticated: false, 
            user: null,
            error: authError 
          });
        }
      },

      setUser: (user: User | null) => {
        console.log('AuthStore: Setting user:', user ? user.email : 'null');
        
        // Validation des données utilisateur
        if (user) {
          if (!user.email || !user.id || !user.role) {
            console.warn('AuthStore: Invalid user data detected');
            const validationError: AuthError = {
              message: 'Données utilisateur invalides',
              code: 'INVALID_USER_DATA',
              timestamp: Date.now(),
            };
            set({ user: null, error: validationError });
            return;
          }

          // Vérifier que le rôle est valide
          const validRoles = ['administrateur', 'moderateur', 'support', 'visualisateur'];
          if (!validRoles.includes(user.role)) {
            console.warn('AuthStore: Invalid user role:', user.role);
            const roleError: AuthError = {
              message: 'Rôle utilisateur non reconnu',
              code: 'INVALID_ROLE',
              timestamp: Date.now(),
            };
            set({ user: null, error: roleError });
            return;
          }
        }

        set({ 
          user, 
          error: null,
          lastActivity: Date.now() 
        });
      },

      setAuthenticated: (authenticated: boolean) => {
        console.log('AuthStore: Setting authenticated:', authenticated);
        set({ 
          isAuthenticated: authenticated,
          error: null,
          lastActivity: Date.now() 
        });
      },

      setError: (error: AuthError | null) => {
        console.log('AuthStore: Setting error:', error?.message || 'null');
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },

      updateLastActivity: () => {
        set({ lastActivity: Date.now() });
      },

      isSessionExpired: () => {
        const { lastActivity, sessionTimeout } = get();
        return Date.now() - lastActivity > sessionTimeout;
      },
    }),
    {
      name: 'appseniors-auth',
      partialize: (state) => ({ 
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        lastActivity: state.lastActivity,
      }),
      // Fonction de migration pour les versions futures
      version: 1,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          // Migration depuis la version 0 - ajouter lastActivity si manquant
          return {
            ...persistedState,
            lastActivity: persistedState.lastActivity || Date.now(),
            error: null,
          };
        }
        return persistedState;
      },
    }
  )
);
