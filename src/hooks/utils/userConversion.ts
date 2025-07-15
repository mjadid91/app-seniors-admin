
import { User } from '../../stores/authStore';

// Interface pour les données utilisateur Supabase
interface SupabaseUserData {
  IDUtilisateurs: number;
  Nom: string;
  Prenom: string;
  Email: string;
  DateInscription: string;
  EstDesactive?: boolean;
  CatUtilisateurs?: {
    IDCatUtilisateurs: number;
    EstAdministrateur: boolean;
    EstModerateur: boolean;
    EstSupport: boolean;
    EstSenior: boolean;
    EstAidant: boolean;
  };
}

export const convertSupabaseUserToAppUser = (
  userData: SupabaseUserData,
  getRoleFromCategory: (categoryId: number) => User['role']
): User => {
  const categoryId = userData.CatUtilisateurs?.IDCatUtilisateurs || 7; // Défaut: visualisateur
  const role = getRoleFromCategory(categoryId);

  return {
    id: userData.IDUtilisateurs.toString(),
    nom: userData.Nom || '',
    prenom: userData.Prenom || '',
    email: userData.Email || '',
    role,
    dateInscription: userData.DateInscription || new Date().toISOString(),
    estDesactive: userData.EstDesactive || false,
  };
};

export const getCategoryFromRole = (role: User['role']): number => {
  switch (role) {
    case 'administrateur':
      return 5;
    case 'moderateur':
      return 6;
    case 'support':
      return 8;
    case 'visualisateur':
    default:
      return 7;
  }
};
