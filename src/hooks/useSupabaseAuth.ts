
import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { User } from '../stores/authStore';

export const useSupabaseAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('useSupabaseAuth: Initial session', session);
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('useSupabaseAuth: Auth state changed', { _event, session });
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Erreur de connexion:', error);
        return { success: false, error: error.message };
      }

      return { success: true, user: data.user };
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      return { success: false, error: 'Erreur de connexion' };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Erreur de déconnexion:', error);
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  // Convert Supabase user to app User type
  const convertToAppUser = (supabaseUser: any): User | null => {
    if (!supabaseUser) return null;
    
    // Ensure we have a valid user ID
    if (!supabaseUser.id || supabaseUser.id === 'NaN') {
      console.warn('useSupabaseAuth: Invalid user ID detected', supabaseUser);
      return null;
    }
    
    // For now, we'll create a basic conversion
    // In a real app, you'd fetch this from your users table
    return {
      id: supabaseUser.id,
      nom: supabaseUser.user_metadata?.nom || 'Nom',
      prenom: supabaseUser.user_metadata?.prenom || 'Prénom',
      email: supabaseUser.email || '',
      role: 'support', // Default role, should be fetched from database
      dateInscription: supabaseUser.created_at || new Date().toISOString(),
    };
  };

  const appUser = session?.user ? convertToAppUser(session.user) : null;
  const isAuthenticated = !!session?.user && !!appUser;

  return {
    session,
    loading,
    user: appUser,
    isAuthenticated,
    signIn,
    signOut,
  };
};
