
import { create } from 'zustand';

export interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  role: 'administrateur' | 'moderateur' | 'support' | 'visualisateur';
  dateInscription: string;
  estDesactive?: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setAuthenticated: (authenticated: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user }),
  setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
