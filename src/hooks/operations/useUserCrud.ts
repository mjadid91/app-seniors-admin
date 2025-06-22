import { supabase } from '@/integrations/supabase/client';
import { User } from '../../stores/authStore';
import { convertSupabaseUserToAppUser, getCategoryFromRole } from '../utils/userConversion';
import { CreateUserData } from '../../components/users/userTypes';

export const useUserCrud = (
  users: User[],
  setUsers: (users: User[]) => void,
  getRoleFromCategory: (categoryId: number) => User['role']
) => {

  const getRoleFlags = (idCat: number) => {
    return {
      EstAdministrateur: idCat === 5,
      EstModerateur: idCat === 6,
      EstSupport: idCat === 8,
      EstSenior: false,
      EstAidant: false,
      EstTuteur: false,
      EstOrganisme: false
    };
  };

  // Fonction pour ajouter un utilisateur avec le mot de passe fourni
  const addUser = async (userData: CreateUserData, userPassword: string): Promise<User> => {
    try {
      const currentDate = new Date().toISOString();

      const roleFlags = getRoleFlags(userData.categoryId);
      await supabase
          .from("CatUtilisateurs")
          .upsert([{
            IDCatUtilisateurs: userData.categoryId,
            ...roleFlags
          }]);

      const supabaseUserData = {
        Nom: userData.nom,
        Prenom: userData.prenom,
        Email: userData.email,
        Telephone: '0000000000',
        DateNaissance: '1970-01-01',
        Adresse: 'Adresse non renseignée',
        Genre: 'Non précisé',
        MotDePasse: userPassword,
        IDCatUtilisateurs: userData.categoryId,
        DateInscription: userData.dateInscription,
        Commentaire: '',
        DateModification: currentDate,
        LangueSite: 'fr',
        Photo: '',
        EstDesactive: false,
        EstRGPD: false
      };

      const { data, error: insertError } = await supabase
          .from('Utilisateurs')
          .insert([supabaseUserData])
          .select()
          .single();

      if (insertError) throw insertError;

      const userId = data?.IDUtilisateurs;
      if (!userId) throw new Error('IDUtilisateurs introuvable');

      // Ajout langue
      if (userData.languePreferee) {
        console.log("Langue sélectionnée :", userData.languePreferee);
        const { data: langueData, error: langueError } = await supabase
            .from('Langue')
            .select('IDLangue')
            .eq('Titre', userData.languePreferee)
            .single();

        if (langueError) {
          console.warn("Langue non trouvée :", userData.languePreferee, langueError);
        } else {
          console.log("Insertion Langue_Utilisateurs avec IDLangue :", langueData.IDLangue);
          await supabase.from('Langue_Utilisateurs').insert([{
            IDUtilisateurs: userId,
            IDLangue: langueData.IDLangue,
            NiveauLangue: 3
          }]);
        }
      }


      if (userData.devise) {
        console.log("Devise sélectionnée :", userData.devise);
        const { data: deviseData, error: deviseError } = await supabase
            .from('Devise')
            .select('IDDevise')
            .eq('Titre', userData.devise)
            .single();

        if (deviseError) {
          console.warn("Devise non trouvée :", userData.devise, deviseError);
        } else {
          console.log("Insertion Devise_Utilisateurs avec IDDevise :", deviseData.IDDevise);
          await supabase.from('Devise_Utilisateurs').insert([{
            IDUtilisateurs: userId,
            IDDevise: deviseData.IDDevise
          }]);
        }
      }



      const newUser = convertSupabaseUserToAppUser(data, getRoleFromCategory);
      setUsers([...users, newUser]);
      return newUser;

    } catch (err) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur:', err);
      throw err;
    }
  };

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

  // Fonction pour supprimer un utilisateur
  const deleteUser = async (userId: string): Promise<void> => {
    try {
      const userIdInt = parseInt(userId);
      
      // D'abord, supprimer les références dans les tables liées
      console.log('Suppression des références de l\'utilisateur:', userIdInt);
      
      // Supprimer les langues de l'utilisateur
      const { error: langueError } = await supabase
        .from('Langue_Utilisateurs')
        .delete()
        .eq('IDUtilisateurs', userIdInt);
      
      if (langueError) {
        console.warn('Erreur lors de la suppression des langues:', langueError);
      }
      
      // Supprimer les devises de l'utilisateur
      const { error: deviseError } = await supabase
        .from('Devise_Utilisateurs')
        .delete()
        .eq('IDUtilisateurs', userIdInt);
      
      if (deviseError) {
        console.warn('Erreur lors de la suppression des devises:', deviseError);
      }
      
      // Supprimer l'entrée Senior si elle existe
      const { error: seniorError } = await supabase
        .from('Seniors')
        .delete()
        .eq('IDUtilisateurSenior', userIdInt);
      
      if (seniorError) {
        console.warn('Erreur lors de la suppression du profil Senior:', seniorError);
      }
      
      // Supprimer l'entrée Aidant si elle existe
      const { error: aidantError } = await supabase
        .from('Aidant')
        .delete()
        .eq('IDUtilisateurs', userIdInt);
      
      if (aidantError) {
        console.warn('Erreur lors de la suppression du profil Aidant:', aidantError);
      }
      
      // Enfin, supprimer l'utilisateur principal
      const { error: deleteError } = await supabase
        .from('Utilisateurs')
        .delete()
        .eq('IDUtilisateurs', userIdInt);

      if (deleteError) {
        console.error('Erreur lors de la suppression de l\'utilisateur:', deleteError);
        throw deleteError;
      }

      console.log('Utilisateur supprimé avec succès');
      setUsers(users.filter(user => user.id !== userId));
    } catch (err) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', err);
      throw err;
    }
  };

  return {
    addUser,
    updateUser,
    deleteUser
  };
};
