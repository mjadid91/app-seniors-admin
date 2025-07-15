
import { useEffect, useState, useRef } from 'react';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { User } from '../stores/authStore';
import { useSupabaseUserMapping } from './useSupabaseUserMapping';
import { useDatabaseAuth } from './useDatabaseAuth';

export const useSupabaseAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [manualUserMapping, setManualUserMapping] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const initializationInProgress = useRef(false);
  
  const { userMapping, isLoading: mappingLoading, findOrCreateUserMapping, clearUserMapping } = useSupabaseUserMapping();
  const { authenticateUser, isLoading: dbAuthLoading } = useDatabaseAuth();

  // Persist manual authentication in sessionStorage
  const persistManualAuth = (userMapping: any, sessionData: Session) => {
    try {
      sessionStorage.setItem('manual_auth_mapping', JSON.stringify(userMapping));
      sessionStorage.setItem('manual_auth_session', JSON.stringify(sessionData));
    } catch (error) {
      console.error('Failed to persist manual auth:', error);
    }
  };

  const loadPersistedManualAuth = () => {
    try {
      const persistedMapping = sessionStorage.getItem('manual_auth_mapping');
      const persistedSession = sessionStorage.getItem('manual_auth_session');
      
      if (persistedMapping && persistedSession) {
        const mapping = JSON.parse(persistedMapping);
        const sessionData = JSON.parse(persistedSession);
        
        console.log('useSupabaseAuth: Loading persisted manual auth');
        setManualUserMapping(mapping);
        setSession(sessionData);
        return true;
      }
    } catch (error) {
      console.error('Failed to load persisted manual auth:', error);
    }
    return false;
  };

  const clearPersistedManualAuth = () => {
    try {
      sessionStorage.removeItem('manual_auth_mapping');
      sessionStorage.removeItem('manual_auth_session');
    } catch (error) {
      console.error('Failed to clear persisted manual auth:', error);
    }
  };

  useEffect(() => {
    // Éviter les initialisations multiples
    if (initializationInProgress.current) {
      console.log('useSupabaseAuth: Initialization already in progress, skipping...');
      return;
    }

    initializationInProgress.current = true;
    let mounted = true;

    const initializeAuth = async () => {
      try {
        console.log('useSupabaseAuth: Starting one-time initialization...');
        setIsLoading(true);

        // D'abord essayer de charger l'auth manuelle persistée
        const hasPersistedAuth = loadPersistedManualAuth();
        
        if (hasPersistedAuth) {
          console.log('useSupabaseAuth: Restored persisted manual authentication');
          if (mounted) {
            setIsLoading(false);
            setIsInitialized(true);
            initializationInProgress.current = false;
          }
          return;
        }

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
          setIsLoading(false);
          setIsInitialized(true);
          initializationInProgress.current = false;
          console.log('useSupabaseAuth: Initialization complete');
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
        setManualUserMapping(null);
        clearPersistedManualAuth();
      }
    });

    // Initialize auth seulement si pas déjà initialisé
    if (!isInitialized) {
      initializeAuth();
    }

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []); // Dépendances vides pour éviter les re-initialisations

  const signIn = async (email: string, password: string) => {
    try {
      console.log('useSupabaseAuth: Starting hybrid sign in process for:', email);

      // 1. D'abord essayer Supabase Auth
      console.log('useSupabaseAuth: Trying Supabase Auth...');
      const { data: supabaseData, error: supabaseError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (!supabaseError && supabaseData.user) {
        console.log('useSupabaseAuth: Supabase Auth successful');
        return { success: true, user: supabaseData.user, source: 'supabase' };
      }

      console.log('useSupabaseAuth: Supabase Auth failed, trying database authentication...');

      // 2. Si Supabase Auth échoue, essayer l'authentification directe en base
      const dbResult = await authenticateUser(email, password);
      
      if (dbResult.success && dbResult.userMapping) {
        console.log('useSupabaseAuth: Database authentication successful');
        
        // Créer une session manuelle pour les utilisateurs de la DB
        const mockSession = {
          user: {
            id: dbResult.userMapping.supabaseUserId,
            email: dbResult.userMapping.email,
            created_at: new Date().toISOString(),
          }
        } as Session;

        setSession(mockSession);
        setManualUserMapping(dbResult.userMapping);
        
        // Persister l'authentification manuelle
        persistManualAuth(dbResult.userMapping, mockSession);

        return { success: true, user: mockSession.user, source: 'database' };
      }

      return { success: false, error: dbResult.error || 'Identifiants incorrects' };

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
      setManualUserMapping(null);
      clearPersistedManualAuth();
      
      // Essayer de déconnecter de Supabase (peut échouer si c'était une session manuelle)
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.log('useSupabaseAuth: Supabase sign out error (ignoré):', error);
      }
      
      console.log('useSupabaseAuth: Sign out completed');
      return { success: true };
    } catch (error) {
      console.log('useSupabaseAuth: Sign out exception (ignoré):', error);
      return { success: true };
    }
  };

  // Convert user mapping to app User type
  const convertToAppUser = (): User | null => {
    // Utiliser le mapping manuel si disponible (utilisateurs DB), sinon le mapping Supabase
    const activeMapping = manualUserMapping || userMapping;
    
    if (!activeMapping || !session?.user) {
      return null;
    }
    
    const appUser: User = {
      id: activeMapping.dbUserId.toString(),
      nom: activeMapping.nom,
      prenom: activeMapping.prenom,
      email: activeMapping.email,
      role: activeMapping.role as User['role'],
      dateInscription: session.user.created_at || new Date().toISOString(),
    };

    return appUser;
  };

  const appUser = convertToAppUser();
  
  // Un utilisateur est authentifié s'il a une session ET un mapping (manuel ou Supabase)
  const isAuthenticated = isInitialized && !!session?.user && !!(manualUserMapping || userMapping);
  const loading = isLoading || mappingLoading || dbAuthLoading || !isInitialized;

  console.log('useSupabaseAuth: Current state:', {
    hasSession: !!session,
    hasSupabaseUserMapping: !!userMapping,
    hasManualUserMapping: !!manualUserMapping,
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
