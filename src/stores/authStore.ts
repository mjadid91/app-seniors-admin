import { create } from 'zustand';

export interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  role: 'administrateur' | 'moderateur' | 'support' | 'visualisateur';
  dateInscription: string;
  estDesactive?: boolean;
  photo?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  setUser: (user: User | null) => void;
  setAuthenticated: (authenticated: boolean) => void;
  setInitialized: (initialized: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isInitialized: false,
  setUser: (user) => set({ user }),
  setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
  setInitialized: (initialized) => set({ isInitialized: initialized }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));