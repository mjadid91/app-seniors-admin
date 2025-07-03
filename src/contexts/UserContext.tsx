
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { User } from '../stores/authStore';

interface SupabaseUserData {
  IDUtilisateurs: number;
  IDAuth: string;
  Email: string;
  Nom: string;
  Prenom: string;
  IDCatUtilisateurs: number;
  DateInscription: string;
  LanguePreferee?: string;
  Devise?: string;
  Photo?: string;
}

interface UserContextType {
  user: User | null;
  supabaseUser: SupabaseUser | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, userData: { nom: string; prenom: string }) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  refreshUserData: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

const convertSupabaseUserToAppUser = (userData: SupabaseUserData): User => {
  const getRoleFromCategory = (categoryId: number): User['role'] => {
    switch (categoryId) {
      case 5: return 'administrateur';
      case 6: return 'moderateur';
      case 8: return 'support';
      case 7: return 'visualisateur';
      default: return 'visualisateur';
    }
  };

  return {
    id: userData.IDUtilisateurs.toString(),
    nom: userData.Nom,
    prenom: userData.Prenom,
    email: userData.Email,
    role: getRoleFromCategory(userData.IDCatUtilisateurs),
    dateInscription: userData.DateInscription,
    photo: userData.Photo
  };
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async (authUserId: string) => {
    try {
      const { data, error } = await supabase
        .from('Utilisateurs')
        .select('*')
        .eq('IDAuth', authUserId)
        .single();

      if (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
        return null;
      }

      return data as SupabaseUserData;
    } catch (err) {
      console.error('Erreur inattendue lors de la récupération des données utilisateur:', err);
      return null;
    }
  };

  const refreshUserData = async () => {
    if (!session?.user?.id) return;
    
    const userData = await fetchUserData(session.user.id);
    if (userData) {
      const appUser = convertSupabaseUserToAppUser(userData);
      setUser(appUser);
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        setSession(session);
        setSupabaseUser(session?.user ?? null);
        
        if (session?.user) {
          // Defer user data fetching to avoid potential deadlocks
          setTimeout(async () => {
            const userData = await fetchUserData(session.user.id);
            if (userData) {
              const appUser = convertSupabaseUserToAppUser(userData);
              setUser(appUser);
            }
            setLoading(false);
          }, 0);
        } else {
          setUser(null);
          setLoading(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setSupabaseUser(session?.user ?? null);
      
      if (session?.user) {
        setTimeout(async () => {
          const userData = await fetchUserData(session.user.id);
          if (userData) {
            const appUser = convertSupabaseUserToAppUser(userData);
            setUser(appUser);
          }
          setLoading(false);
        }, 0);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password: password,
      });

      if (error) {
        console.error('Erreur de connexion:', error);
        
        if (error.message.includes('Invalid login credentials')) {
          return { success: false, error: 'Email ou mot de passe incorrect' };
        } else if (error.message.includes('Email not confirmed')) {
          return { success: false, error: 'Veuillez confirmer votre email avant de vous connecter' };
        } else {
          return { success: false, error: error.message || 'Erreur de connexion' };
        }
      }

      if (data.user) {
        // User data will be fetched by the auth state change listener
        return { success: true };
      }

      return { success: false, error: 'Erreur de connexion' };
    } catch (err) {
      console.error('Erreur lors de la connexion:', err);
      return { success: false, error: 'Une erreur inattendue s\'est produite' };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (
    email: string, 
    password: string, 
    userData: { nom: string; prenom: string }
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true);
      
      const redirectUrl = `${window.location.origin}/connexion`;
      
      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password: password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            nom: userData.nom.trim(),
            prenom: userData.prenom.trim()
          }
        }
      });

      if (error) {
        console.error('Erreur d\'inscription:', error);
        
        if (error.message.includes('User already registered')) {
          return { success: false, error: 'Un compte existe déjà avec cette adresse email' };
        } else {
          return { success: false, error: error.message || 'Erreur lors de l\'inscription' };
        }
      }

      if (data.user) {
        return { success: true };
      }

      return { success: false, error: 'Erreur lors de l\'inscription' };
    } catch (err) {
      console.error('Erreur lors de l\'inscription:', err);
      return { success: false, error: 'Une erreur inattendue s\'est produite' };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      setUser(null);
      setSupabaseUser(null);
      setSession(null);
    } catch (err) {
      console.error('Erreur lors de la déconnexion:', err);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    supabaseUser,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    refreshUserData
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
