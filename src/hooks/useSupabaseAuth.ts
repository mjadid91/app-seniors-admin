import { useEffect, useState } from 'react';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { User } from '../stores/authStore';
import { useSupabaseUserMapping } from './useSupabaseUserMapping';

export const useSupabaseAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const { userMapping, isLoading: mappingLoading, findOrCreateUserMapping, clearUserMapping } = useSupabaseUserMapping();

  useEffect(() => {
    let mounted = true;
    let initializationTimeout: NodeJS.Timeout;

    const initializeAuth = async () => {
      try {
        console.log('useSupabaseAuth: Starting initialization...');
        setIsLoading(true);

        // Get initial session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('useSupabaseAuth: Error getting session:', error);
        } else {
          console.log('useSupabaseAuth: Initial session retrieved:', !!session);
          
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
          initializationTimeout = setTimeout(() => {
            if (mounted) {
              setIsLoading(false);
              setIsInitialized(true);
              console.log('useSupabaseAuth: Initialization complete');
            }
          }, 100);
        }
      }
    };

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('useSupabaseAuth: Auth state changed:', { event, hasSession: !!session });
      
      if (!mounted) return;

      if (event === 'SIGNED_IN' && session) {
        setSession(session);
        findOrCreateUserMapping(session.user);
      } else if (event === 'SIGNED_OUT' || !session) {
        console.log('useSupabaseAuth: User signed out, clearing states');
        setSession(null);
        clearUserMapping();
      }
    });

    // Initialize auth
    initializeAuth();

    return () => {
      mounted = false;
      if (initializationTimeout) {
        clearTimeout(initializationTimeout);
      }
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      console.log('useSupabaseAuth: Signing in...', email);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('useSupabaseAuth: Sign in error:', error);
        return { success: false, error: error.message };
      }

      console.log('useSupabaseAuth: Sign in successful');
      return { success: true, user: data.user };
    } catch (error) {
      console.error('useSupabaseAuth: Sign in exception:', error);
      return { success: false, error: 'Erreur de connexion' };
    }
  };

  const signOut = async () => {
    try {
      console.log('useSupabaseAuth: Starting sign out process...');
      
      // Nettoyer d'abord les états locaux
      setSession(null);
      clearUserMapping();
      
      // Essayer de déconnecter de Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.log('useSupabaseAuth: Supabase sign out error (ignoré):', error);
        // Ne pas traiter les erreurs de session comme des erreurs bloquantes
        // car l'utilisateur peut déjà être déconnecté côté serveur
      }
      
      console.log('useSupabaseAuth: Sign out completed');
      return { success: true };
    } catch (error) {
      console.log('useSupabaseAuth: Sign out exception (ignoré):', error);
      // Même en cas d'exception, considérer la déconnexion comme réussie
      // car les états locaux ont été nettoyés
      return { success: true };
    }
  };

  // Convert user mapping to app User type
  const convertToAppUser = (): User | null => {
    if (!userMapping || !session?.user) {
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

    return appUser;
  };

  const appUser = convertToAppUser();
  
  const isAuthenticated = isInitialized && !!session?.user && !!userMapping;
  const loading = isLoading || mappingLoading || !isInitialized;

  console.log('useSupabaseAuth: Current state:', {
    hasSession: !!session,
    hasUserMapping: !!userMapping,
    isAuthenticated,
    loading,
    isInitialized,
    userRole: appUser?.role
  });

  return {
    session,
    loading,
    user: appUser,
    isAuthenticated,
    isInitialized,
    signIn,
    signOut,
  };
};
