
import { supabase } from '@/integrations/supabase/client';
import { User } from '../../stores/authStore';
import { convertSupabaseUserToAppUser, getCategoryFromRole } from '../utils/userConversion';

export const useUserUpdate = (
  users: User[],
  setUsers: (users: User[]) => void,
  getRoleFromCategory: (categoryId: number) => User['role']
) => {
  // Fonction pour mettre à jour un utilisateur
  const updateUser = async (userId: string, updates: Partial<User>): Promise<User> => {
    try {
      const supabaseUpdates: any = {
        DateModification: new Date().toISOString()
      };
      
      if (updates.nom) supabaseUpdates.Nom = updates.nom;
      if (updates.prenom) supabaseUpdates.Prenom = updates.prenom;
      if (updates.email) supabaseUpdates.Email = updates.email;
      
      // Pour la mise à jour du rôle, on trouve la catégorie correspondante
      if (updates.role) {
        supabaseUpdates.IDCatUtilisateurs = getCategoryFromRole(updates.role);
      }

      const { data, error: updateError } = await supabase
        .from('Utilisateurs')
        .update(supabaseUpdates)
        .eq('IDUtilisateurs', parseInt(userId))
        .select()
        .single();

      if (updateError) {
        throw updateError;
      }

      const updatedUser = convertSupabaseUserToAppUser(data, getRoleFromCategory);
      setUsers(users.map(user => user.id === userId ? updatedUser : user));
      return updatedUser;
    } catch (err) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', err);
      throw err;
    }
  };

  return {
    updateUser
  };
};
