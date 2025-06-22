
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User as AppUser } from '../stores/authStore';
import { useUserCategories } from './useUserCategories';

export const useSupabaseAuth = () => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { getRoleFromCategory, loading: categoriesLoading } = useUserCategories();

  const signIn = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true);
      
      console.log('Tentative de connexion pour:', email);
      
      // Attendre que les catégories soient chargées
      if (categoriesLoading || !getRoleFromCategory) {
        return { success: false, error: 'Chargement des catégories en cours...' };
      }
      
      // Vérifier si l'utilisateur existe dans notre table Utilisateurs
      const { data: userData, error: userError } = await supabase
        .from('Utilisateurs')
        .select('*')
        .eq('Email', email.trim().toLowerCase())
        .single();

      console.log('Résultat de la requête utilisateur:', { userData, userError });

      if (userError) {
        console.error('Erreur lors de la requête:', userError);
        return { success: false, error: 'Utilisateur non trouvé dans la base de données' };
      }

      if (!userData) {
        console.error('Aucun utilisateur trouvé pour cet email');
        return { success: false, error: 'Utilisateur non trouvé dans la base de données' };
      }

      // Vérifier que l'utilisateur a une catégorie autorisée selon vos spécifications
      const allowedCategories = [5, 6, 7, 8]; // Admin, Modérateur, Visualisateur, Support
      if (!allowedCategories.includes(userData.IDCatUtilisateurs)) {
        console.error('Catégorie d\'utilisateur non autorisée:', userData.IDCatUtilisateurs);
        return { success: false, error: 'Vous n\'êtes pas autorisé à accéder à cette application d\'administration' };
      }

      // Vérifier le mot de passe (comparaison exacte)
      if (userData.MotDePasse !== password) {
        console.error('Mot de passe incorrect');
        return { success: false, error: 'Email ou mot de passe incorrect' };
      }

      // Créer l'utilisateur de l'application avec le bon rôle
      const role = getRoleFromCategory(userData.IDCatUtilisateurs);
      console.log('Rôle attribué:', role, 'pour la catégorie:', userData.IDCatUtilisateurs);

      const appUser: AppUser = {
        id: userData.IDUtilisateurs.toString(),
        nom: userData.Nom || '',
        prenom: userData.Prenom || '',
        email: userData.Email,
        role: role,
        dateInscription: userData.DateInscription || new Date().toISOString(),
        photo: userData.Photo || undefined
      };

      console.log('Utilisateur créé avec succès:', appUser);

      setUser(appUser);
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      return { success: false, error: 'Erreur lors de la connexion' };
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    console.log('Déconnexion de l\'utilisateur...');
    setUser(null);
    setIsAuthenticated(false);
    // Nettoyer le localStorage
    localStorage.removeItem('appseniors-auth');
    console.log('Session fermée et localStorage nettoyé');
  };

  // Initialisation - vérifier s'il y a une session sauvegardée
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const savedUser = localStorage.getItem('appseniors-auth');
        if (savedUser) {
          const parsedData = JSON.parse(savedUser);
          if (parsedData.state?.user && parsedData.state?.isAuthenticated) {
            console.log('Session trouvée dans localStorage:', parsedData.state.user);
            setUser(parsedData.state.user);
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error('Erreur lors de la lecture de la session sauvegardée:', error);
        localStorage.removeItem('appseniors-auth');
      }
      setLoading(false);
    };

    // Attendre que les catégories soient chargées avant d'initialiser l'auth
    if (!categoriesLoading) {
      initializeAuth();
    }
  }, [categoriesLoading]);

  // Sauvegarder l'état d'authentification
  useEffect(() => {
    if (!loading && !categoriesLoading) {
      const authData = {
        state: {
          user,
          isAuthenticated,
          token: isAuthenticated ? 'mock-token' : null
        }
      };
      
      if (isAuthenticated && user) {
        localStorage.setItem('appseniors-auth', JSON.stringify(authData));
        console.log('Session sauvegardée dans localStorage');
      } else if (!isAuthenticated) {
        localStorage.removeItem('appseniors-auth');
        console.log('Session supprimée du localStorage');
      }
    }
  }, [user, isAuthenticated, loading, categoriesLoading]);

  return {
    user,
    isAuthenticated,
    loading: loading || categoriesLoading,
    signIn,
    signOut
  };
};
