
import { supabase } from '@/integrations/supabase/client';
import { User } from '../../stores/authStore';
import { CreateUserData } from '../../components/users/userTypes';
import { convertSupabaseUserToAppUser } from '../utils/userConversion';

export const useUserCreation = (
  users: User[],
  setUsers: (users: User[]) => void,
  getRoleFromCategory: (categoryId: number) => User['role']
) => {
  // Fonction pour ajouter un utilisateur avec le mot de passe fourni
  const addUser = async (userData: CreateUserData, userPassword: string): Promise<User> => {
    try {
      const currentDate = new Date().toISOString();

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

      console.log('Données envoyées à Supabase:', supabaseUserData);

      // 1. Insertion dans Utilisateurs
      const { data, error: insertError } = await supabase
        .from('Utilisateurs')
        .insert([supabaseUserData])
        .select()
        .single();

      if (insertError) {
        console.error('Erreur lors de l\'insertion:', insertError);
        throw insertError;
      }

      console.log('Utilisateur créé avec succès:', data);
      const newUser = convertSupabaseUserToAppUser(data, getRoleFromCategory);

      // 2. Récupérer l'IDUtilisateurs
      const userId = data?.IDUtilisateurs;
      if (!userId) {
        throw new Error('IDUtilisateurs introuvable après création');
      }

      // 3. Créer les entrées spécifiques selon la catégorie
      await createCategorySpecificEntries(userId, userData.categoryId);

      // 4. Insertion dans Langue_Utilisateurs
      if (userData.languePreferee) {
        // Trouver l'IDLangue correspondant (par défaut on met: 1 = fr, 2 = en, 3 = es, 4 = de, 5 = it)
        const langueMap: Record<string, number> = { fr: 1, en: 2, es: 3, de: 4, it: 5 };
        const idLangue = langueMap[userData.languePreferee] || 1;
        await supabase
          .from('Langue_Utilisateurs')
          .insert([{
            IDUtilisateurs: userId,
            IDLangue: idLangue,
            NiveauLangue: 3 // niveau par défaut (moyen)
          }]);
      }

      // 5. Insertion dans Devise_Utilisateurs
      if (userData.devise) {
        // Trouver l'IDDevise correspondant (par défaut : 1 = EUR, 2 = USD, 3 = GBP, 4 = CHF, 5 = CAD)
        const deviseMap: Record<string, number> = { EUR: 1, USD: 2, GBP: 3, CHF: 4, CAD: 5 };
        const idDevise = deviseMap[userData.devise] || 1;
        await supabase
          .from('Devise_Utilisateurs')
          .insert([{
            IDUtilisateurs: userId,
            IDDevise: idDevise
          }]);
      }

      setUsers([...users, newUser]);
      return newUser;
    } catch (err) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur:', err);
      throw err;
    }
  };

  // Fonction pour créer les entrées spécifiques selon la catégorie
  const createCategorySpecificEntries = async (userId: number, categoryId: number) => {
    try {
      // Récupérer les informations de la catégorie
      const { data: categoryData, error: categoryError } = await supabase
        .from('CatUtilisateurs')
        .select('*')
        .eq('IDCatUtilisateurs', categoryId)
        .single();

      if (categoryError) {
        console.error('Erreur lors de la récupération de la catégorie:', categoryError);
        return;
      }

      console.log('Catégorie trouvée:', categoryData);

      // Si c'est un Senior (IDCatUtilisateurs = 1)
      if (categoryData.EstSenior) {
        console.log('Création d\'une entrée Senior pour l\'utilisateur:', userId);
        const { error: seniorError } = await supabase
          .from('Seniors')
          .insert([{
            IDUtilisateurSenior: userId,
            NiveauAutonomie: 2, // Niveau moyen par défaut
            EstRGPD: false,
            IDStructures: null,
            IDTuteur: null
          }]);

        if (seniorError) {
          console.error('Erreur lors de la création de l\'entrée Senior:', seniorError);
          throw seniorError;
        }
        console.log('Entrée Senior créée avec succès');
      }

      // Si c'est un Aidant (IDCatUtilisateurs = 4)
      if (categoryData.EstAidant) {
        console.log('Création d\'une entrée Aidant pour l\'utilisateur:', userId);
        const { error: aidantError } = await supabase
          .from('Aidant')
          .insert([{
            IDUtilisateurs: userId,
            Experience: 'Expérience à définir',
            TarifAidant: 0
          }]);

        if (aidantError) {
          console.error('Erreur lors de la création de l\'entrée Aidant:', aidantError);
          throw aidantError;
        }
        console.log('Entrée Aidant créée avec succès');
      }
    } catch (err) {
      console.error('Erreur lors de la création des entrées spécifiques:', err);
      throw err;
    }
  };

  return {
    addUser
  };
};
