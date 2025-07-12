
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
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  setUser: (user: User | null) => void;
  setAuthenticated: (authenticated: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      token: null,

      login: async (email: string, password: string) => {
        // Cette fonction sera maintenant gérée par useSupabaseAuth
        return false;
      },

      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false, 
          token: null 
        });
      },

      checkAuth: async () => {
        const { token } = get();
        if (!token) {
          set({ isAuthenticated: false, user: null });
          return;
        }
        // En mode réel, on vérifierait le token avec le backend
      },

      setUser: (user: User | null) => {
        set({ user });
      },

      setAuthenticated: (authenticated: boolean) => {
        set({ isAuthenticated: authenticated });
      }
    }),
    {
      name: 'appseniors-auth',
      partialize: (state) => ({ 
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated 
      })
    }
  )
);
