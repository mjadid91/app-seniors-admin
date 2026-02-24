import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuthStore } from '@/stores/authStore';

export const useSupabaseAuth = () => {
    const { setUser, setAuthenticated, logout: clearStore, isAuthenticated, user } = useAuthStore();
    const [loading, setLoading] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    // Initialisation et écoute des changements de session (Rafraîchissement de page, etc.)
    useEffect(() => {
        const initAuth = async () => {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (session?.user) {
                await fetchUserProfile(session.user.email);
            } else {
                clearStore();
            }
            setIsInitialized(true);
        };

        initAuth();

        // Écouteur en temps réel si le token expire ou si l'utilisateur se déconnecte d'un autre onglet
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' && session?.user) {
                await fetchUserProfile(session.user.email);
            } else if (event === 'SIGNED_OUT') {
                clearStore();
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    // Fonction pour lier l'Auth Supabase à TA table Utilisateurs
    // Fonction pour lier l'Auth Supabase à TA table Utilisateurs
    const fetchUserProfile = async (email?: string) => {
        if (!email) return;

        try {
            // On va chercher le profil admin dans ta base de données via l'email
            const { data: profile, error } = await supabase
                .from('Utilisateurs')
                .select('*')
                .eq('Email', email) // <-- CORRECTION : 'Email' au lieu de 'AdresseEmail'
                .single();

            if (error || !profile) {
                console.error("Profil non trouvé dans la table Utilisateurs:", error);
                clearStore();
                return;
            }

            // On met à jour ton Zustand store avec les bonnes données
            setUser({
                id: profile.IDUtilisateurs.toString(),
                nom: profile.Nom,
                prenom: profile.Prenom,
                email: profile.Email, // <-- CORRECTION : 'Email' au lieu de 'AdresseEmail'
                // On suppose que la catégorie 5 est Admin (à adapter selon ta table CatUtilisateurs)
                role: profile.IDCatUtilisateurs === 5 ? 'administrateur' : 'moderateur',
                dateInscription: profile.DateInscription || new Date().toISOString(),
            });
            setAuthenticated(true);

        } catch (err) {
            console.error("Erreur critique lors du fetch du profil:", err);
            clearStore();
        }
    };

    // La fonction appelée par ton LoginPage.tsx
    const signIn = async (email: string, password: string) => {
        setLoading(true);
        try {
            // 1. Authentification sécurisée via Supabase
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                // Traduction des erreurs fréquentes
                if (error.message === 'Invalid login credentials') {
                    return { success: false, error: "Email ou mot de passe incorrect." };
                }
                return { success: false, error: error.message };
            }

            // 2. Si connexion réussie, on charge le profil
            if (data.user) {
                await fetchUserProfile(data.user.email);
                return { success: true };
            }

            return { success: false, error: "Erreur inattendue." };
        } catch (error: any) {
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        clearStore();
    };

    return {
        signIn,
        signOut,
        loading,
        isInitialized,
        isAuthenticated,
        user,
    };
};