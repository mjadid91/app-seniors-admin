
import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { User } from '../stores/authStore';
import { useSupabaseUserMapping } from './useSupabaseUserMapping';

export const useSupabaseAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { userMapping, isLoading: mappingLoading, findOrCreateUserMapping, clearUserMapping } = useSupabaseUserMapping();

  useEffect(() => {
    let mounted = true;
    
    const initializeAuth = async () => {
      try {
        console.log('useSupabaseAuth: Initializing auth...');
        
        // Get initial session
        const { data: { session: initialSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('useSupabaseAuth: Error getting session:', error);
          if (mounted) {
            setLoading(false);
          }
          return;
        }

        console.log('useSupabaseAuth: Initial session:', initialSession);
        
        if (mounted) {
          setSession(initialSession);
          
          if (initialSession?.user) {
            console.log('useSupabaseAuth: Found user in session, fetching mapping...');
            await findOrCreateUserMapping(initialSession.user);
          } else {
            console.log('useSupabaseAuth: No user in session');
            clearUserMapping();
          }
          
          setLoading(false);
        }
      } catch (error) {
        console.error('useSupabaseAuth: Error during initialization:', error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('useSupabaseAuth: Auth state changed:', { event, session: !!session });
        
        if (!mounted) return;
        
        setSession(session);
        
        if (session?.user) {
          console.log('useSupabaseAuth: User logged in, fetching mapping...');
          await findOrCreateUserMapping(session.user);
        } else {
          console.log('useSupabaseAuth: User logged out, clearing mapping');
          clearUserMapping();
        }
      }
    );

    // Initialize auth
    initializeAuth();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      console.log('useSupabaseAuth: Attempting sign in for:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('useSupabaseAuth: Sign in error:', error);
        return { success: false, error: error.message };
      }

      console.log('useSupabaseAuth: Sign in successful:', !!data.user);
      return { success: true, user: data.user };
    } catch (error) {
      console.error('useSupabaseAuth: Sign in exception:', error);
      return { success: false, error: 'Erreur de connexion' };
    }
  };

  const signOut = async () => {
    try {
      console.log('useSupabaseAuth: Signing out...');
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('useSupabaseAuth: Sign out error:', error);
      }
      clearUserMapping();
    } catch (error) {
      console.error('useSupabaseAuth: Sign out exception:', error);
    }
  };

  // Convert user mapping to app User type
  const convertToAppUser = (): User | null => {
    if (!userMapping || !session?.user) {
      console.log('useSupabaseAuth: Cannot convert user - missing mapping or session');
      return null;
    }
    
    const appUser = {
      id: userMapping.dbUserId.toString(),
      nom: userMapping.nom,
      prenom: userMapping.prenom,
      email: userMapping.email,
      role: userMapping.role as User['role'],
      dateInscription: session.user.created_at || new Date().toISOString(),
    };
    
    console.log('useSupabaseAuth: Converted app user:', appUser);
    return appUser;
  };

  const appUser = convertToAppUser();
  const isAuthenticated = !!session?.user && !!userMapping;
  const totalLoading = loading || mappingLoading;

  console.log('useSupabaseAuth: Current state:', {
    hasSession: !!session,
    hasUser: !!session?.user,
    hasMapping: !!userMapping,
    isAuthenticated,
    loading: totalLoading,
    appUser: appUser ? `${appUser.prenom} ${appUser.nom} (${appUser.role})` : null
  });

  return {
    session,
    loading: totalLoading,
    user: appUser,
    isAuthenticated,
    signIn,
    signOut,
  };
};
