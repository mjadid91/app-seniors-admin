import { supabase } from '@/integrations/supabase/client';
import { User } from '../../stores/authStore';
import { convertSupabaseUserToAppUser, getCategoryFromRole } from '../utils/userConversion';
import { CreateUserData } from '../../components/users/userTypes';

interface UtilisateurRowUpdate {
  Nom?: string;
  Prenom?: string;
  Email?: string;
  EstDesactive?: boolean;
  IDCatUtilisateurs?: number;
  DateModification: string;
}

export const useUserCrud = (
    users: User[],
    setUsers: (users: User[]) => void,
    getRoleFromCategory: (categoryId: number) => User['role']
) => {

  const getRoleFlags = (idCat: number) => {
    switch (idCat) {
      case 5: // Administrateur
        return {
          EstAdministrateur: true,
          EstModerateur: false,
          EstSupport: false,
          EstSenior: false,
          EstAidant: false,
          EstTuteur: false,
          EstOrganisme: false
        };
      case 6: // Modérateur
        return {
          EstAdministrateur: false,
          EstModerateur: true,
          EstSupport: false,
          EstSenior: false,
          EstAidant: false,
          EstTuteur: false,
          EstOrganisme: false
        };
      case 8: // Support
        return {
          EstAdministrateur: false,
          EstModerateur: false,
          EstSupport: true,
          EstSenior: false,
          EstAidant: false,
          EstTuteur: false,
          EstOrganisme: false
        };
      default: // Visualisateur (7) ou autre
        return {
          EstAdministrateur: false,
          EstModerateur: false,
          EstSupport: false,
          EstSenior: false,
          EstAidant: false,
          EstTuteur: false,
          EstOrganisme: false
        };
    }
  };

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

      // Gestion des langues et devises (logique inchangée mais sécurisée)
      if (userData.languePreferee) {
        const { data: langueData } = await supabase
            .from('Langue')
            .select('IDLangue')
            .eq('Titre', userData.languePreferee)
            .single();

        if (langueData) {
          await supabase.from('Langue_Utilisateurs').insert([{
            IDUtilisateurs: userId,
            IDLangue: langueData.IDLangue,
            NiveauLangue: 3
          }]);
        }
      }

      const { data: newUserData, error: fetchError } = await supabase
          .from('Utilisateurs')
          .select(`
          IDUtilisateurs, Nom, Prenom, Email, DateInscription, EstDesactive, IDCatUtilisateurs,
          CatUtilisateurs:IDCatUtilisateurs (
            IDCatUtilisateurs, EstAdministrateur, EstModerateur, EstSupport, EstSenior, EstAidant
          )
        `)
          .eq('IDUtilisateurs', userId)
          .single();

      if (fetchError) {
        const newUser = convertSupabaseUserToAppUser(data, getRoleFromCategory);
        setUsers([...users, newUser]);
        return newUser;
      }

      const newUser = convertSupabaseUserToAppUser(newUserData, getRoleFromCategory);
      setUsers([...users, newUser]);
      return newUser;

    } catch (err) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur:', err);
      throw err;
    }
  };

  const updateUser = async (userId: string, updates: Partial<User>): Promise<User> => {
    try {
      const supabaseUpdates: UtilisateurRowUpdate = {
        DateModification: new Date().toISOString()
      };

      if (updates.nom) supabaseUpdates.Nom = updates.nom;
      if (updates.prenom) supabaseUpdates.Prenom = updates.prenom;
      if (updates.email) supabaseUpdates.Email = updates.email;
      if (updates.estDesactive !== undefined) supabaseUpdates.EstDesactive = updates.estDesactive;

      if (updates.role) {
        supabaseUpdates.IDCatUtilisateurs = getCategoryFromRole(updates.role);
      }

      const { data, error: updateError } = await supabase
          .from('Utilisateurs')
          .update(supabaseUpdates)
          .eq('IDUtilisateurs', parseInt(userId))
          .select(`
          IDUtilisateurs, Nom, Prenom, Email, DateInscription, EstDesactive,
          CatUtilisateurs:IDCatUtilisateurs (
            IDCatUtilisateurs, EstAdministrateur, EstModerateur, EstSupport, EstSenior, EstAidant
          )
        `)
          .single();

      if (updateError) throw updateError;

      const updatedUser = convertSupabaseUserToAppUser(data, getRoleFromCategory);
      setUsers(users.map(user => user.id === userId ? updatedUser : user));
      return updatedUser;
    } catch (err) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', err);
      throw err;
    }
  };

  const deleteUser = async (userId: string): Promise<void> => {
    try {
      const userIdInt = parseInt(userId);

      // Nettoyage des références ( cascades manuelles )
      await supabase.from('PrestationSupport').delete().eq('IDIntervenant', userIdInt);
      await supabase.from('Langue_Utilisateurs').delete().eq('IDUtilisateurs', userIdInt);
      await supabase.from('Devise_Utilisateurs').delete().eq('IDUtilisateurs', userIdInt);
      await supabase.from('Seniors').delete().eq('IDUtilisateurSenior', userIdInt);
      await supabase.from('Aidant').delete().eq('IDUtilisateurs', userIdInt);
      await supabase.from('ConsentementCookies').delete().eq('IDUtilisateurs', userIdInt);
      await supabase.from('HistoriqueConnexion').delete().eq('IDUtilisateurs', userIdInt);
      await supabase.from('MessageGroupe').delete().eq('IDUtilisateurs', userIdInt);
      await supabase.from('ReponseForum').delete().eq('IDUtilisateurs', userIdInt);

      const { error: deleteError } = await supabase
          .from('Utilisateurs')
          .delete()
          .eq('IDUtilisateurs', userIdInt);

      if (deleteError) throw deleteError;

      setUsers(users.filter(user => user.id !== userId));
    } catch (err) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', err);
      throw err;
    }
  };

  return { addUser, updateUser, deleteUser };
};