
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
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('useSupabaseAuth: Initial session', session);
      setSession(session);
      
      if (session?.user) {
        findOrCreateUserMapping(session.user);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('useSupabaseAuth: Auth state changed', { _event, session });
      setSession(session);
      
      if (session?.user) {
        findOrCreateUserMapping(session.user);
      } else {
        clearUserMapping();
      }
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
      clearUserMapping();
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  // Convert user mapping to app User type
  const convertToAppUser = (): User | null => {
    if (!userMapping || !session?.user) return null;
    
    return {
      id: userMapping.dbUserId.toString(), // Utiliser l'ID de la base de données
      nom: userMapping.nom,
      prenom: userMapping.prenom,
      email: userMapping.email,
      role: userMapping.role as User['role'],
      dateInscription: session.user.created_at || new Date().toISOString(),
    };
  };

  const appUser = convertToAppUser();
  const isAuthenticated = !!session?.user && !!userMapping;
  const totalLoading = loading || mappingLoading;

  return {
    session,
    loading: totalLoading,
    user: appUser,
    isAuthenticated,
    signIn,
    signOut,
  };
};
