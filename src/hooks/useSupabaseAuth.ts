
import { useEffect, useState } from 'react';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { User } from '../stores/authStore';
import { useSupabaseUserMapping } from './useSupabaseUserMapping';

export const useSupabaseAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isSessionLoading, setIsSessionLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const { userMapping, isLoading: mappingLoading, findOrCreateUserMapping, clearUserMapping } = useSupabaseUserMapping();

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        console.log('useSupabaseAuth: Initializing authentication...');
        setIsSessionLoading(true);

        // Get initial session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('useSupabaseAuth: Error getting session:', error);
        } else {
          console.log('useSupabaseAuth: Initial session retrieved:', session);
          
          if (mounted) {
            setSession(session);
            
            if (session?.user) {
              console.log('useSupabaseAuth: User found, fetching mapping...');
              await findOrCreateUserMapping(session.user);
            }
          }
        }
      } catch (error) {
        console.error('useSupabaseAuth: Error during initialization:', error);
      } finally {
        if (mounted) {
          setIsSessionLoading(false);
          setIsInitialized(true);
          console.log('useSupabaseAuth: Initialization complete');
        }
      }
    };

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('useSupabaseAuth: Auth state changed:', { event, session });
      
      if (!mounted) return;

      setIsSessionLoading(true);
      setSession(session);
      
      if (session?.user) {
        console.log('useSupabaseAuth: User authenticated, fetching mapping...');
        await findOrCreateUserMapping(session.user);
      } else {
        console.log('useSupabaseAuth: User signed out, clearing mapping...');
        clearUserMapping();
      }

      setIsSessionLoading(false);
    });

    // Initialize auth
    initializeAuth();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      console.log('useSupabaseAuth: Signing in...', email);
      setIsSessionLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('useSupabaseAuth: Sign in error:', error);
        setIsSessionLoading(false);
        return { success: false, error: error.message };
      }

      console.log('useSupabaseAuth: Sign in successful');
      return { success: true, user: data.user };
    } catch (error) {
      console.error('useSupabaseAuth: Sign in exception:', error);
      setIsSessionLoading(false);
      return { success: false, error: 'Erreur de connexion' };
    }
  };

  const signOut = async () => {
    try {
      console.log('useSupabaseAuth: Signing out...');
      setIsSessionLoading(true);
      
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('useSupabaseAuth: Sign out error:', error);
      }
      
      clearUserMapping();
      setIsSessionLoading(false);
    } catch (error) {
      console.error('useSupabaseAuth: Sign out exception:', error);
      setIsSessionLoading(false);
    }
  };

  // Convert user mapping to app User type
  const convertToAppUser = (): User | null => {
    if (!userMapping || !session?.user) {
      console.log('useSupabaseAuth: No user mapping or session available');
      return null;
    }
    
    const appUser: User = {
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
  const isAuthenticated = !!session?.user && !!userMapping && isInitialized;
  const totalLoading = isSessionLoading || mappingLoading || !isInitialized;

  console.log('useSupabaseAuth: Current state:', {
    hasSession: !!session,
    hasUserMapping: !!userMapping,
    isAuthenticated,
    totalLoading,
    isInitialized,
    userRole: appUser?.role
  });

  return {
    session,
    loading: totalLoading,
    user: appUser,
    isAuthenticated,
    isInitialized,
    signIn,
    signOut,
  };
};
