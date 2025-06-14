
import { User } from '../../stores/authStore';
import { SupabaseUser } from '../types/userTypes';

export const convertSupabaseUserToAppUser = (
  supabaseUser: SupabaseUser,
  getRoleFromCategory: (categoryId: number) => User['role']
): User => {
  return {
    id: supabaseUser.IDUtilisateurs.toString(),
    nom: supabaseUser.Nom,
    prenom: supabaseUser.Prenom,
    email: supabaseUser.Email,
    role: getRoleFromCategory(supabaseUser.IDCatUtilisateurs),
    dateInscription: supabaseUser.DateInscription
  };
};

export const getCategoryFromRole = (role: User['role']): number => {
  // Cette fonction devrait être remplacée par une recherche dans les catégories réelles
  // Pour l'instant, on garde une correspondance par défaut
  switch (role) {
    case 'administrateur': return 5;
    case 'moderateur': return 6;
    case 'support': return 4;
    case 'visualisateur': return 7;
    default: return 7;
  }
};
