
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';
import { useAuthStore } from '../stores/authStore';
import { useSupabaseAuth } from './useSupabaseAuth';

export const useUserActivation = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { user: currentUser } = useAuthStore();
  const { signOut } = useSupabaseAuth();

  const checkLastActiveAdmin = async (userId: string): Promise<boolean> => {
    try {
      console.log('Checking if user can be deactivated:', userId);
      
      // Vérifier si l'utilisateur à désactiver est administrateur
      const { data: userToDisable, error: userError } = await supabase
        .from('Utilisateurs')
        .select(`
          IDUtilisateurs,
          CatUtilisateurs:IDCatUtilisateurs (
            EstAdministrateur
          )
        `)
        .eq('IDUtilisateurs', parseInt(userId))
        .single();

      if (userError) {
        console.error('Error fetching user to disable:', userError);
        return false;
      }

      console.log('User to disable:', userToDisable);

      if (!userToDisable?.CatUtilisateurs?.EstAdministrateur) {
        // Si ce n'est pas un admin, on peut le désactiver
        console.log('User is not admin, can be deactivated');
        return true;
      }

      // Compter le nombre d'administrateurs actifs
      const { data: activeAdmins, error: adminError } = await supabase
        .from('Utilisateurs')
        .select(`
          IDUtilisateurs,
          CatUtilisateurs:IDCatUtilisateurs (
            EstAdministrateur
          )
        `)
        .eq('EstDesactive', false);

      if (adminError) {
        console.error('Error checking active admins:', adminError);
        return false;
      }

      // Filtrer les vrais administrateurs
      const realActiveAdmins = activeAdmins?.filter(admin => 
        admin.CatUtilisateurs?.EstAdministrateur === true
      ) || [];

      console.log('Active admins found:', realActiveAdmins.length);

      // Si il y a plus d'un admin actif, on peut désactiver
      return realActiveAdmins.length > 1;
    } catch (error) {
      console.error('Error in checkLastActiveAdmin:', error);
      return false;
    }
  };

  const toggleUserActivation = async (userId: string, shouldDeactivate: boolean): Promise<boolean> => {
    console.log('toggleUserActivation called:', { userId, shouldDeactivate });
    setIsLoading(true);
    
    try {
      // Si on veut désactiver l'utilisateur
      if (shouldDeactivate) {
        console.log('Attempting to deactivate user');
        const canDisable = await checkLastActiveAdmin(userId);
        if (!canDisable) {
          toast({
            title: "Action impossible",
            description: "Impossible de désactiver ce compte : il s'agit du dernier administrateur actif.",
            variant: "destructive",
          });
          return false;
        }
      }

      // Mettre à jour le statut de désactivation
      console.log('Updating user activation status');
      const { error } = await supabase
        .from('Utilisateurs')
        .update({ EstDesactive: shouldDeactivate })
        .eq('IDUtilisateurs', parseInt(userId));

      if (error) {
        console.error('Error updating user activation status:', error);
        toast({
          title: "Erreur",
          description: "Impossible de modifier le statut du compte.",
          variant: "destructive",
        });
        return false;
      }

      const action = shouldDeactivate ? "désactivé" : "réactivé";
      toast({
        title: "Compte modifié",
        description: `Le compte a été ${action} avec succès.`,
      });

      // Si l'utilisateur se désactive lui-même, le déconnecter
      if (shouldDeactivate && currentUser?.id === userId) {
        toast({
          title: "Déconnexion automatique",
          description: "Vous avez désactivé votre propre compte. Vous allez être déconnecté.",
          variant: "destructive",
        });
        
        // Attendre un peu pour que l'utilisateur voie le message
        setTimeout(() => {
          signOut();
        }, 2000);
      }

      return true;
    } catch (error) {
      console.error('Error in toggleUserActivation:', error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    toggleUserActivation,
    isLoading
  };
};
