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
}

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    nom: 'Dubois',
    prenom: 'Marie',
    email: 'admin@appseniors.fr',
    role: 'administrateur',
    dateInscription: '2024-01-15'
  },
  {
    id: '2',
    nom: 'Martin',
    prenom: 'Pierre',
    email: 'support@appseniors.fr',
    role: 'support',
    dateInscription: '2024-02-10'
  }
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      token: null,

      login: async (email: string, password: string) => {
        // Mock authentication - replace with real API call
        const user = mockUsers.find(u => u.email === email);
        
        if (user && password === 'admin123') {
          const token = 'mock-jwt-token';
          set({ 
            user, 
            isAuthenticated: true, 
            token 
          });
          return true;
        }
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
        // In real app, verify token with backend
        // For now, keep existing state
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
