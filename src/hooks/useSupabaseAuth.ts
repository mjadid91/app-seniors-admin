
import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { User } from '../stores/authStore';

export const useSupabaseAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

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
            setAuthError('Erreur de récupération de session');
            setLoading(false);
          }
          return;
        }

        console.log('useSupabaseAuth: Initial session:', !!initialSession);
        
        if (mounted) {
          setSession(initialSession);
          
          if (initialSession?.user) {
            await handleUserMapping(initialSession.user);
          } else {
            console.log('useSupabaseAuth: No user in session');
            setUser(null);
          }
          
          setLoading(false);
        }
      } catch (error) {
        console.error('useSupabaseAuth: Error during initialization:', error);
        if (mounted) {
          setAuthError('Erreur d\'initialisation');
          setLoading(false);
        }
      }
    };

    const handleUserMapping = async (supabaseUser: any) => {
      try {
        console.log('useSupabaseAuth: Mapping user:', supabaseUser.email);
        
        // Chercher l'utilisateur par email
        let { data: userData, error: userError } = await supabase
          .from('Utilisateurs')
          .select(`
            IDUtilisateurs,
            Nom,
            Prenom,
            Email,
            IDCatUtilisateurs,
            CatUtilisateurs!inner(
              EstAdministrateur,
              EstModerateur,
              EstSupport
            )
          `)
          .eq('Email', supabaseUser.email)
          .single();

        if (userError && userError.code === 'PGRST116') {
          console.log('useSupabaseAuth: User not found, creating admin user...');
          
          // Créer un utilisateur admin automatiquement
          const { data: newUser, error: createError } = await supabase
            .from('Utilisateurs')
            .insert({
              Email: supabaseUser.email,
              Nom: supabaseUser.user_metadata?.last_name || 'Admin',
              Prenom: supabaseUser.user_metadata?.first_name || 'User',
              IDCatUtilisateurs: 5, // Administrateur
              MotDePasse: 'auto-generated',
              DateInscription: new Date().toISOString(),
              EstDesactive: false,
              Adresse: '',
              Commentaire: '',
              DateModification: new Date().toISOString(),
              DateNaissance: '1970-01-01',
              Genre: 'Non spécifié',
              LangueSite: 'fr',
              Photo: '',
              Telephone: ''
            })
            .select(`
              IDUtilisateurs,
              Nom,
              Prenom,
              Email,
              IDCatUtilisateurs,
              CatUtilisateurs!inner(
                EstAdministrateur,
                EstModerateur,
                EstSupport
              )
            `)
            .single();

          if (createError) {
            console.error('useSupabaseAuth: Error creating user:', createError);
            throw createError;
          }

          userData = newUser;
          console.log('useSupabaseAuth: User created successfully');
        } else if (userError) {
          console.error('useSupabaseAuth: Error finding user:', userError);
          throw userError;
        }

        if (userData && mounted) {
          // Déterminer le rôle
          let role = 'visualisateur';
          if (userData.CatUtilisateurs?.EstAdministrateur) {
            role = 'administrateur';
          } else if (userData.CatUtilisateurs?.EstModerateur) {
            role = 'moderateur';
          } else if (userData.CatUtilisateurs?.EstSupport) {
            role = 'support';
          }

          const appUser: User = {
            id: userData.IDUtilisateurs.toString(),
            nom: userData.Nom,
            prenom: userData.Prenom,
            email: userData.Email,
            role: role as User['role'],
            dateInscription: supabaseUser.created_at || new Date().toISOString(),
          };

          console.log('useSupabaseAuth: Setting app user:', appUser);
          setUser(appUser);
        }
      } catch (error) {
        console.error('useSupabaseAuth: Error in user mapping:', error);
        if (mounted) {
          setAuthError('Erreur de mapping utilisateur');
          setUser(null);
        }
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('useSupabaseAuth: Auth state changed:', { event, session: !!session });
        
        if (!mounted) return;
        
        setSession(session);
        setAuthError(null);
        
        if (session?.user) {
          console.log('useSupabaseAuth: User logged in, mapping...');
          setLoading(true);
          await handleUserMapping(session.user);
          setLoading(false);
        } else {
          console.log('useSupabaseAuth: User logged out');
          setUser(null);
          setLoading(false);
        }
      }
    );

    // Initialize auth
    initializeAuth();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []); // Dépendances vides pour éviter les re-rendus

  const signIn = async (email: string, password: string) => {
    try {
      console.log('useSupabaseAuth: Attempting sign in for:', email);
      setAuthError(null);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('useSupabaseAuth: Sign in error:', error);
        setAuthError(error.message);
        return { success: false, error: error.message };
      }

      console.log('useSupabaseAuth: Sign in successful');
      return { success: true, user: data.user };
    } catch (error) {
      console.error('useSupabaseAuth: Sign in exception:', error);
      const errorMessage = 'Erreur de connexion';
      setAuthError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const signOut = async () => {
    try {
      console.log('useSupabaseAuth: Signing out...');
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('useSupabaseAuth: Sign out error:', error);
        setAuthError(error.message);
      }
      setUser(null);
    } catch (error) {
      console.error('useSupabaseAuth: Sign out exception:', error);
      setAuthError('Erreur de déconnexion');
    }
  };

  const isAuthenticated = !!session?.user && !!user;

  console.log('useSupabaseAuth: Current state:', {
    hasSession: !!session,
    hasUser: !!user,
    isAuthenticated,
    loading,
    authError,
    appUser: user ? `${user.prenom} ${user.nom} (${user.role})` : null
  });

  return {
    session,
    loading,
    user,
    isAuthenticated,
    authError,
    signIn,
    signOut,
  };
};
