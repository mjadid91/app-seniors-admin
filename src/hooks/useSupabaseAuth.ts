// src/hooks/useSupabaseAuth.ts
import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuthStore } from '../stores/authStore';
import { useSupabaseUserMapping } from './useSupabaseUserMapping';

export const useSupabaseAuth = () => {
    const {
        user,
        isAuthenticated,
        isInitialized,
        setUser,
        setAuthenticated,
        setInitialized,
    } = useAuthStore();

    const { findOrCreateUserMapping } = useSupabaseUserMapping();

    const [loading, setLoading] = useState(!isInitialized);

    // Fonction stable (utilisée dans initialize ET dans le listener)
    const handleMapping = useCallback(async (supabaseUser: any) => {
        if (!supabaseUser) return;

        console.log('🔄 [Auth] Appel findOrCreateUserMapping pour:', supabaseUser.email);

        try {
            const mapping = await findOrCreateUserMapping(supabaseUser);

            if (mapping) {
                setUser({
                    id: mapping.dbUserId.toString(),
                    nom: mapping.nom,
                    prenom: mapping.prenom,
                    email: mapping.email,
                    role: mapping.role as any,
                    dateInscription: new Date().toISOString(),
                });
                setAuthenticated(true);
                console.log('✅ [Auth] Mapping réussi – utilisateur chargé');
            }
        } catch (err) {
            console.error('❌ [Auth] Erreur pendant le mapping:', err);
        }
    }, [findOrCreateUserMapping, setUser, setAuthenticated]);

    // =========================
    // INITIALIZATION (une seule fois)
    // =========================
    useEffect(() => {
        let mounted = true;

        const initialize = async () => {
            if (useAuthStore.getState().isInitialized) {
                console.log('⏭️ [Auth] Déjà initialisé');
                if (mounted) setLoading(false);
                return;
            }

            console.log('🚀 [Auth] Début initialisation Seniors Admin...');
            if (mounted) setLoading(true);

            try {
                const { data: { session } } = await supabase.auth.getSession();

                if (session?.user && mounted) {
                    await handleMapping(session.user);
                } else if (mounted) {
                    setUser(null);
                    setAuthenticated(false);
                }
            } catch (err) {
                console.error("❌ [Auth] Erreur initialization:", err);
            } finally {
                if (mounted) {
                    setLoading(false);
                    setInitialized(true);
                    console.log('🏁 [Auth] Initialisation TERMINÉE – isInitialized = true');
                }
            }
        };

        initialize();

        // Listener unique
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            console.log("🔄 [Auth] State changed:", event);

            if (event === 'SIGNED_IN' && session?.user && mounted) {
                await handleMapping(session.user);
            }

            if (event === 'SIGNED_OUT' && mounted) {
                setUser(null);
                setAuthenticated(false);
            }
        });

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, [handleMapping, setUser, setAuthenticated, setInitialized]);

    // SIGN IN / SIGN OUT (inchangés)
    const signIn = useCallback(async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) return { success: false, error: error.message };
        return { success: true };
    }, []);

    const signOut = useCallback(async () => {
        await supabase.auth.signOut();
        setUser(null);
        setAuthenticated(false);
    }, [setUser, setAuthenticated]);

    return {
        user,
        isAuthenticated,
        loading,
        isInitialized,
        signIn,
        signOut,
    };
};