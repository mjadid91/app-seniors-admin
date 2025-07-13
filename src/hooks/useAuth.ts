
import { useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuthStore } from '../stores/authStore';
import { useToast } from './use-toast';
import type { User } from '../stores/authStore';

export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    isInitialized,
    setUser,
    setAuthenticated,
    setLoading,
    setInitialized,
    setSessionId,
    logout: logoutStore,
    reset,
  } = useAuthStore();

  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Fonction pour mapper l'utilisateur Supabase vers notre modèle User
  const mapSupabaseUserToAppUser = useCallback(async (supabaseUser: any): Promise<User | null> => {
    if (!supabaseUser?.email) {
      console.warn('useAuth: No email found in supabase user');
      return null;
    }

    try {
      console.log('useAuth: Mapping user with email:', supabaseUser.email);
      
      const { data: userData, error } = await supabase
        .from('Utilisateurs')
        .select(`
          IDUtilisateurs,
          Nom,
          Prenom,
          Email,
          CatUtilisateurs:IDCatUtilisateurs (
            EstAdministrateur,
            EstModerateur,
            EstSupport,
            EstSenior,
            EstAidant
          )
        `)
        .eq('Email', supabaseUser.email)
        .single();

      if (error) {
        console.error('useAuth: Error fetching user data:', error);
        if (error.code === 'PGRST116') {
          toast({
            title: "Utilisateur non trouvé",
            description: "Cet utilisateur doit être créé dans le panel admin avant de pouvoir se connecter.",
            variant: "destructive",
          });
        }
        return null;
      }

      if (!userData) {
        console.warn('useAuth: No user data found');
        return null;
      }

      // Déterminer le rôle
      let role: User['role'] = 'visualisateur';
      if (userData.CatUtilisateurs) {
        const cat = userData.CatUtilisateurs;
        if (cat.EstAdministrateur) {
          role = 'administrateur';
        } else if (cat.EstModerateur) {
          role = 'moderateur';
        } else if (cat.EstSupport) {
          role = 'support';
        } else {
          role = 'visualisateur';
        }
      }

      const appUser: User = {
        id: userData.IDUtilisateurs.toString(),
        nom: userData.Nom || '',
        prenom: userData.Prenom || '',
        email: userData.Email,
        role,
        dateInscription: supabaseUser.created_at || new Date().toISOString(),
      };

      console.log('useAuth: User mapped successfully:', { id: appUser.id, role: appUser.role });
      return appUser;
    } catch (error) {
      console.error('useAuth: Exception in mapSupabaseUserToAppUser:', error);
      return null;
    }
  }, [toast]);

  // Initialisation de l'authentification
  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      console.log('useAuth: Initializing authentication...');
      setLoading(true);

      try {
        // Vérifier la session existante
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('useAuth: Error getting session:', error);
          if (mounted) {
            logoutStore();
            setInitialized(true);
            setLoading(false);
          }
          return;
        }

        if (session?.user && mounted) {
          console.log('useAuth: Found existing session');
          setSessionId(session.access_token);
          
          const appUser = await mapSupabaseUserToAppUser(session.user);
          if (appUser && mounted) {
            setUser(appUser);
            setAuthenticated(true);
          } else if (mounted) {
            logoutStore();
          }
        } else if (mounted) {
          console.log('useAuth: No existing session');
          logoutStore();
        }
      } catch (error) {
        console.error('useAuth: Error during initialization:', error);
        if (mounted) {
          logoutStore();
        }
      } finally {
        if (mounted) {
          setInitialized(true);
          setLoading(false);
        }
      }
    };

    // Écouter les changements d'état d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('useAuth: Auth state changed:', { event, hasSession: !!session });
      
      if (!mounted) return;

      if (event === 'SIGNED_IN' && session?.user) {
        setSessionId(session.access_token);
        const appUser = await mapSupabaseUserToAppUser(session.user);
        if (appUser && mounted) {
          setUser(appUser);
          setAuthenticated(true);
        }
      } else if (event === 'SIGNED_OUT' || !session) {
        console.log('useAuth: User signed out');
        if (mounted) {
          logoutStore();
        }
      }
    });

    initializeAuth();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [setUser, setAuthenticated, setLoading, setInitialized, setSessionId, logoutStore, mapSupabaseUserToAppUser]);

  // Fonction de connexion
  const signIn = async (email: string, password: string) => {
    try {
      console.log('useAuth: Signing in...');
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        console.error('useAuth: Sign in error:', error);
        return { success: false, error: error.message };
      }

      if (data.user) {
        console.log('useAuth: Sign in successful');
        // L'onAuthStateChange se chargera du mapping
        return { success: true };
      }

      return { success: false, error: 'Aucune donnée utilisateur reçue' };
    } catch (error) {
      console.error('useAuth: Sign in exception:', error);
      return { success: false, error: 'Erreur de connexion' };
    } finally {
      setLoading(false);
    }
  };

  // Fonction de déconnexion
  const signOut = async () => {
    try {
      console.log('useAuth: Signing out...');
      
      // Nettoyer le store immédiatement
      logoutStore();
      
      // Déconnecter de Supabase (en arrière-plan)
      await supabase.auth.signOut();
      
      console.log('useAuth: Sign out completed');
      return { success: true };
    } catch (error) {
      console.warn('useAuth: Sign out error (non-blocking):', error);
      // Même en cas d'erreur, considérer la déconnexion comme réussie
      return { success: true };
    }
  };

  // Gestion de la navigation automatique
  useEffect(() => {
    if (!isInitialized || isLoading) return;

    const currentPath = location.pathname;
    const isPublicRoute = currentPath === '/connexion' || currentPath === '/';

    console.log('useAuth: Navigation check:', {
      currentPath,
      isAuthenticated,
      isPublicRoute,
      hasUser: !!user,
    });

    if (isAuthenticated && user && isPublicRoute) {
      console.log('useAuth: Redirecting authenticated user to dashboard');
      navigate('/dashboard', { replace: true });
    } else if (!isAuthenticated && !isPublicRoute) {
      console.log('useAuth: Redirecting unauthenticated user to login');
      navigate('/connexion', { replace: true });
    }
  }, [isAuthenticated, user, isInitialized, isLoading, location.pathname, navigate]);

  return {
    user,
    isAuthenticated,
    isLoading,
    isInitialized,
    signIn,
    signOut,
  };
};
