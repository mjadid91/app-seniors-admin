
import { supabase } from '@/integrations/supabase/client';
import { User } from '../../stores/authStore';

export const useUserDeletion = (
  users: User[],
  setUsers: (users: User[]) => void
) => {
  // Fonction pour supprimer un utilisateur
  const deleteUser = async (userId: string): Promise<void> => {
    try {
      const { error: deleteError } = await supabase
        .from('Utilisateurs')
        .delete()
        .eq('IDUtilisateurs', parseInt(userId));

      if (deleteError) {
        throw deleteError;
      }

      setUsers(users.filter(user => user.id !== userId));
    } catch (err) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', err);
      throw err;
    }
  };

  return {
    deleteUser
  };
};
