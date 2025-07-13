
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

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  sessionId: string | null;
  
  // Actions
  setUser: (user: User | null) => void;
  setAuthenticated: (authenticated: boolean) => void;
  setLoading: (loading: boolean) => void;
  setInitialized: (initialized: boolean) => void;
  setSessionId: (sessionId: string | null) => void;
  logout: () => void;
  reset: () => void;
}

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  isInitialized: false,
  sessionId: null,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setUser: (user: User | null) => {
        console.log('AuthStore: Setting user:', user ? { id: user.id, role: user.role } : null);
        set({ user });
      },

      setAuthenticated: (authenticated: boolean) => {
        console.log('AuthStore: Setting authenticated:', authenticated);
        set({ isAuthenticated: authenticated });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setInitialized: (initialized: boolean) => {
        console.log('AuthStore: Setting initialized:', initialized);
        set({ isInitialized: initialized });
      },

      setSessionId: (sessionId: string | null) => {
        set({ sessionId });
      },

      logout: () => {
        console.log('AuthStore: Logging out');
        set({
          ...initialState,
          isLoading: false,
          isInitialized: true,
        });
      },

      reset: () => {
        console.log('AuthStore: Resetting all state');
        set(initialState);
      },
    }),
    {
      name: 'appseniors-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        sessionId: state.sessionId,
        isInitialized: state.isInitialized,
      }),
    }
  )
);
