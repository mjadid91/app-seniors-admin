import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuthStore, User as StoreUser } from '../stores/authStore';
import { useSupabaseUserMapping } from './useSupabaseUserMapping';

export const useSupabaseAuth = () => {
    const { user, isAuthenticated, setUser, setAuthenticated, logout: clearStore } = useAuthStore();
    const { findOrCreateUserMapping } = useSupabaseUserMapping();
    const [loading, setLoading] = useState(true);
    const [isInitialized, setIsInitialized] = useState(false);

    // ✅ Fonctions d'action stables
    const signIn = useCallback(async (email: string, password: string) => {
        return await supabase.auth.signInWithPassword({ email, password });
    }, []);

    const signOut = useCallback(async () => {
        const res = await supabase.auth.signOut();
        clearStore();
        return res;
    }, [clearStore]);

    useEffect(() => {
        let mounted = true;

        const initializeAuth = async () => {
            try {
                if (mounted) setLoading(true);
                const { data: { session } } = await supabase.auth.getSession();

                if (session?.user) {
                    const mapping = await findOrCreateUserMapping(session.user);
                    if (mounted && mapping) {
                        setUser({
                            id: mapping.dbUserId.toString(),
                            nom: mapping.nom,
                            prenom: mapping.prenom,
                            email: mapping.email,
                            role: mapping.role,
                            dateInscription: new Date().toISOString(),
                        });
                        setAuthenticated(true);
                    }
                }
            } catch (error) {
                console.error("Auth Init Error:", error);
            } finally {
                if (mounted) {
                    setLoading(false);
                    setIsInitialized(true);
                }
            }
        };

        initializeAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' && session?.user) {
                const mapping = await findOrCreateUserMapping(session.user);
                if (mapping && mounted) {
                    setUser({
                        id: mapping.dbUserId.toString(),
                        nom: mapping.nom,
                        prenom: mapping.prenom,
                        email: mapping.email,
                        role: mapping.role,
                        dateInscription: new Date().toISOString(),
                    });
                    setAuthenticated(true);
                }
            } else if (event === 'SIGNED_OUT') {
                if (mounted) {
                    setUser(null);
                    setAuthenticated(false);
                }
            }
        });

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, [setUser, setAuthenticated]);

    return { user, isAuthenticated, loading, isInitialized, signIn, signOut };
};