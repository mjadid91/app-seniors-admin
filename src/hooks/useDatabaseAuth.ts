
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

interface DatabaseUser {
  IDUtilisateurs: number;
  Nom: string;
  Prenom: string;
  Email: string;
  MotDePasse: string;
  EstDesactive: boolean;
  DateInscription: string;
  CatUtilisateurs?: {
    EstAdministrateur: boolean;
    EstModerateur: boolean;
    EstSupport: boolean;
    EstSenior: boolean;
    EstAidant: boolean;
  };
}

interface UserMapping {
  supabaseUserId: string;
  dbUserId: number;
  nom: string;
  prenom: string;
  email: string;
  role: string;
}

export const useDatabaseAuth = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const authenticateUser = async (email: string, password: string): Promise<{ success: boolean; userMapping?: UserMapping; error?: string }> => {
    setIsLoading(true);
    
    try {
      console.log('useDatabaseAuth: Searching for user with email:', email);
      
      // Chercher l'utilisateur dans la table Utilisateurs
      const { data: user, error } = await supabase
        .from('Utilisateurs')
        .select(`
          IDUtilisateurs,
          Nom,
          Prenom,
          Email,
          MotDePasse,
          EstDesactive,
          DateInscription,
          CatUtilisateurs:IDCatUtilisateurs (
            EstAdministrateur,
            EstModerateur,
            EstSupport,
            EstSenior,
            EstAidant
          )
        `)
        .eq('Email', email)
        .maybeSingle();

      if (error) {
        console.error('useDatabaseAuth: Database error:', error);
        return { success: false, error: 'Erreur de base de données' };
      }

      if (!user) {
        console.log('useDatabaseAuth: User not found');
        return { success: false, error: 'Utilisateur non trouvé' };
      }

      // Vérifier si le compte est désactivé
      if (user.EstDesactive) {
        console.log('useDatabaseAuth: User account is disabled');
        toast({
          title: "Compte désactivé",
          description: "Votre compte a été désactivé par l'administrateur.",
          variant: "destructive",
        });
        return { success: false, error: 'Compte désactivé' };
      }

      // Vérifier le mot de passe
      if (user.MotDePasse !== password) {
        console.log('useDatabaseAuth: Invalid password');
        return { success: false, error: 'Mot de passe incorrect' };
      }

      // Déterminer le rôle basé sur la catégorie
      let role = 'visualisateur'; // rôle par défaut
      if (user.CatUtilisateurs) {
        const cat = user.CatUtilisateurs;
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

      console.log('useDatabaseAuth: Authentication successful, role:', role);

      const userMapping: UserMapping = {
        supabaseUserId: `db_user_${user.IDUtilisateurs}`, // Préfixe pour identifier les utilisateurs DB
        dbUserId: user.IDUtilisateurs,
        nom: user.Nom || '',
        prenom: user.Prenom || '',
        email: user.Email || '',
        role
      };

      return { success: true, userMapping };

    } catch (error) {
      console.error('useDatabaseAuth: Error in authenticateUser:', error);
      return { success: false, error: 'Erreur lors de l\'authentification' };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    authenticateUser,
    isLoading
  };
};
