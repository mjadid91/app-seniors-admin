
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
  // Correspondance corrigée avec les vraies valeurs IDCatUtilisateurs
  switch (role) {
    case 'administrateur': return 5;
    case 'moderateur': return 6;
    case 'visualisateur': return 7;
    case 'support': return 8;
    default: return 7; // Visualisateur par défaut
  }
};
