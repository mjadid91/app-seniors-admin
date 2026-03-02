// src/hooks/useSupabaseAuth.ts
import { useEffect, useState, useCallback, useRef } from 'react';
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

    // VERROU : Empêche les appels simultanés ou redondants
    const isMappingRef = useRef(false);

    // Fonction stable (utilisée dans initialize ET dans le listener)
    const handleMapping = useCallback(async (supabaseUser: any) => {
        // Si on est déjà en train de mapper, ou si l'utilisateur courant du store
        // a déjà le même email que la session Supabase, on ABANDONNE.
        if (!supabaseUser || isMappingRef.current) return;

        // On vérifie le store global : si on a déjà un user mappé avec le bon email, pas besoin de refaire l'appel DB.
        const currentUser = useAuthStore.getState().user;
        if (currentUser && currentUser.email === supabaseUser.email) {
            console.log('⏭️ [Auth] Utilisateur déjà mappé dans le store, on ignore.');
            return;
        }

        console.log('🔄 [Auth] Appel findOrCreateUserMapping pour:', supabaseUser.email);
        isMappingRef.current = true; // On verrouille

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
            } else {
                // Si le mapping échoue (ex: user non trouvé dans DB), on déconnecte
                setUser(null);
                setAuthenticated(false);
            }
        } catch (err) {
            console.error('❌ [Auth] Erreur pendant le mapping:', err);
        } finally {
            isMappingRef.current = false; // On déverrouille
        }
    }, [findOrCreateUserMapping, setUser, setAuthenticated]);

    // =========================
    // INITIALIZATION
    // =========================
    useEffect(() => {
        let mounted = true;

        const initialize = async () => {
            if (useAuthStore.getState().isInitialized) {
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
                }
            }
        };

        initialize();

        // Listener unique
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            console.log(`🔄 [Auth] State changed: ${event}`);

            // On ne mappe QUE sur INITIAL_SESSION, SIGNED_IN, ou TOKEN_REFRESHED
            // ET on laisse handleMapping décider si c'est vraiment nécessaire
            if ((event === 'INITIAL_SESSION' || event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && session?.user && mounted) {
                await handleMapping(session.user);
            }

            if (event === 'SIGNED_OUT' && mounted) {
                // Nettoyage complet
                isMappingRef.current = false;
                setUser(null);
                setAuthenticated(false);
            }
        });

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, [handleMapping, setUser, setAuthenticated, setInitialized]);

    // SIGN IN / SIGN OUT
    const signIn = useCallback(async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) return { success: false, error: error.message };
        return { success: true };
    }, []);

    const signOut = useCallback(async () => {
        await supabase.auth.signOut();
        // On force le nettoyage du store au cas où l'event SIGNED_OUT soit lent
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