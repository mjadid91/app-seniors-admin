
import { useEffect, useState, useCallback } from 'react';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { User } from '../stores/authStore';
import { useSupabaseUserMapping } from './useSupabaseUserMapping';

interface AuthError {
  message: string;
  code?: string;
}

export const useSupabaseAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);
  const { userMapping, isLoading: mappingLoading, findOrCreateUserMapping, clearUserMapping } = useSupabaseUserMapping();

  // Fonction pour nettoyer les erreurs après un délai
  const clearError = useCallback(() => {
    setTimeout(() => setError(null), 5000);
  }, []);

  // Fonction sécurisée pour gérer les erreurs
  const handleError = useCallback((error: any, context: string) => {
    console.error(`useSupabaseAuth: ${context}:`, error);
    const authError: AuthError = {
      message: error?.message || 'Une erreur inattendue s\'est produite',
      code: error?.code
    };
    setError(authError);
    clearError();
  }, [clearError]);

  useEffect(() => {
    let mounted = true;
    let initializationTimeout: NodeJS.Timeout;
    let retryCount = 0;
    const maxRetries = 3;

    const initializeAuth = async () => {
      try {
        console.log('useSupabaseAuth: Starting initialization...');
        setIsLoading(true);
        setError(null);

        // Tentative de récupération de la session avec retry
        const attemptGetSession = async (): Promise<Session | null> => {
          for (let i = 0; i < maxRetries; i++) {
            try {
              const { data: { session }, error } = await supabase.auth.getSession();
              
              if (error) {
                if (i === maxRetries - 1) throw error;
                console.warn(`useSupabaseAuth: Session attempt ${i + 1} failed, retrying...`);
                await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
                continue;
              }
              
              return session;
            } catch (err) {
              if (i === maxRetries - 1) throw err;
              await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
            }
          }
          return null;
        };

        const session = await attemptGetSession();
        
        if (mounted) {
          console.log('useSupabaseAuth: Initial session retrieved:', !!session);
          setSession(session);
          
          if (session?.user) {
            console.log('useSupabaseAuth: User found, fetching mapping...');
            try {
              await findOrCreateUserMapping(session.user);
            } catch (mappingError) {
              handleError(mappingError, 'User mapping failed');
            }
          }
        }
      } catch (error) {
        if (mounted) {
          handleError(error, 'Initialization failed');
        }
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

    // Écouter les changements d'authentification avec gestion d'erreur
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('useSupabaseAuth: Auth state changed:', { event, hasSession: !!session });
      
      if (!mounted) return;

      try {
        if (event === 'SIGNED_IN' && session) {
          setSession(session);
          setError(null);
          await findOrCreateUserMapping(session.user);
        } else if (event === 'SIGNED_OUT' || !session) {
          console.log('useSupabaseAuth: User signed out, clearing states');
          setSession(null);
          clearUserMapping();
          setError(null);
        } else if (event === 'TOKEN_REFRESHED' && session) {
          setSession(session);
        }
      } catch (error) {
        handleError(error, `Auth state change (${event})`);
      }
    });

    // Initialiser l'authentification
    initializeAuth();

    return () => {
      mounted = false;
      if (initializationTimeout) {
        clearTimeout(initializationTimeout);
      }
      subscription.unsubscribe();
    };
  }, [findOrCreateUserMapping, clearUserMapping, handleError]);

  const signIn = async (email: string, password: string) => {
    // Validation des entrées
    if (!email?.trim() || !password?.trim()) {
      const error = { message: 'Email et mot de passe requis' };
      setError(error);
      clearError();
      return { success: false, error: error.message };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      const error = { message: 'Format d\'email invalide' };
      setError(error);
      clearError();
      return { success: false, error: error.message };
    }

    try {
      console.log('useSupabaseAuth: Signing in...', email);
      setError(null);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        let userFriendlyMessage = 'Erreur de connexion';
        
        switch (error.message) {
          case 'Invalid login credentials':
            userFriendlyMessage = 'Email ou mot de passe incorrect';
            break;
          case 'Email not confirmed':
            userFriendlyMessage = 'Veuillez confirmer votre email';
            break;
          case 'Too many requests':
            userFriendlyMessage = 'Trop de tentatives, veuillez réessayer plus tard';
            break;
          default:
            userFriendlyMessage = error.message;
        }

        const authError = { message: userFriendlyMessage, code: error.code };
        setError(authError);
        clearError();
        return { success: false, error: userFriendlyMessage };
      }

      console.log('useSupabaseAuth: Sign in successful');
      return { success: true, user: data.user };
    } catch (error: any) {
      const authError = { message: 'Erreur de connexion inattendue' };
      handleError(error, 'Sign in exception');
      return { success: false, error: authError.message };
    }
  };

  const signOut = async () => {
    try {
      console.log('useSupabaseAuth: Starting sign out process...');
      setError(null);
      
      // Nettoyer d'abord les états locaux
      setSession(null);
      clearUserMapping();
      
      // Essayer de déconnecter de Supabase avec timeout
      const signOutPromise = supabase.auth.signOut();
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), 5000)
      );
      
      try {
        await Promise.race([signOutPromise, timeoutPromise]);
      } catch (error: any) {
        // Log l'erreur mais ne pas la traiter comme bloquante
        console.log('useSupabaseAuth: Supabase sign out error (ignoré):', error.message);
      }
      
      console.log('useSupabaseAuth: Sign out completed');
      return { success: true };
    } catch (error: any) {
      console.log('useSupabaseAuth: Sign out exception (ignoré):', error.message);
      // Même en cas d'exception, considérer la déconnexion comme réussie
      // car les états locaux ont été nettoyés
      return { success: true };
    }
  };

  // Convert user mapping to app User type avec validation
  const convertToAppUser = useCallback((): User | null => {
    if (!userMapping || !session?.user) {
      return null;
    }
    
    try {
      const appUser: User = {
        id: String(userMapping.dbUserId), // Assurer la conversion en string
        nom: userMapping.nom || '',
        prenom: userMapping.prenom || '',
        email: userMapping.email || session.user.email || '',
        role: userMapping.role as User['role'],
        dateInscription: session.user.created_at || new Date().toISOString(),
      };

      // Validation des données utilisateur
      if (!appUser.email || !['administrateur', 'moderateur', 'support', 'visualisateur'].includes(appUser.role)) {
        console.warn('useSupabaseAuth: Invalid user data detected');
        return null;
      }

      return appUser;
    } catch (error) {
      handleError(error, 'User conversion failed');
      return null;
    }
  }, [userMapping, session?.user, handleError]);

  const appUser = convertToAppUser();
  
  const isAuthenticated = isInitialized && !!session?.user && !!userMapping && !error;
  const loading = isLoading || mappingLoading || !isInitialized;

  console.log('useSupabaseAuth: Current state:', {
    hasSession: !!session,
    hasUserMapping: !!userMapping,
    isAuthenticated,
    loading,
    isInitialized,
    userRole: appUser?.role,
    error: error?.message
  });

  return {
    session,
    loading,
    user: appUser,
    isAuthenticated,
    isInitialized,
    error,
    signIn,
    signOut,
  };
};
