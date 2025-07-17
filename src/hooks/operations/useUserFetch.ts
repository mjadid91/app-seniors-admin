
import { supabase } from '@/integrations/supabase/client';
import { User } from '../../stores/authStore';
import { convertSupabaseUserToAppUser } from '../utils/userConversion';

export const useUserFetch = (
  setUsers: (users: User[]) => void,
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void,
  getRoleFromCategory: (categoryId: number) => User['role']
) => {
  
  const ensureSpecializedEntries = async () => {
    try {
      // S'assurer que les catégories administratives existent
      const categories = [
        { id: 5, flags: { EstAdministrateur: true, EstModerateur: false, EstSupport: false, EstSenior: false, EstAidant: false, EstTuteur: false, EstOrganisme: false } },
        { id: 6, flags: { EstAdministrateur: false, EstModerateur: true, EstSupport: false, EstSenior: false, EstAidant: false, EstTuteur: false, EstOrganisme: false } },
        { id: 7, flags: { EstAdministrateur: false, EstModerateur: false, EstSupport: false, EstSenior: false, EstAidant: false, EstTuteur: false, EstOrganisme: false } }, // Visualisateur
        { id: 8, flags: { EstAdministrateur: false, EstModerateur: false, EstSupport: true, EstSenior: false, EstAidant: false, EstTuteur: false, EstOrganisme: false } }
      ];

      for (const category of categories) {
        await supabase
          .from("CatUtilisateurs")
          .upsert([{
            IDCatUtilisateurs: category.id,
            ...category.flags
          }]);
      }
    } catch (error) {
      console.warn('Error ensuring specialized entries:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('useUserFetch: Starting to fetch administrative users...');

      // Récupérer UNIQUEMENT les utilisateurs administratifs avec les catégories 5, 6, 7, 8
      const { data: usersData, error } = await supabase
        .from('Utilisateurs')
        .select(`
          IDUtilisateurs,
          Nom,
          Prenom,
          Email,
          DateInscription,
          EstDesactive,
          IDCatUtilisateurs,
          CatUtilisateurs:IDCatUtilisateurs (
            IDCatUtilisateurs,
            EstAdministrateur,
            EstModerateur,
            EstSupport,
            EstSenior,
            EstAidant
          )
        `)
        .in('IDCatUtilisateurs', [5, 6, 7, 8]); // Filtrer SEULEMENT les catégories administratives

      if (error) {
        console.error('useUserFetch: Error fetching users:', error);
        throw error;
      }

      console.log('useUserFetch: Raw administrative users data:', usersData);

      if (usersData) {
        // Double vérification pour s'assurer qu'on n'affiche que les catégories administratives
        const filteredUsers = usersData.filter(user => {
          const isValidCategory = [5, 6, 7, 8].includes(user.IDCatUtilisateurs);
          if (!isValidCategory) {
            console.warn('useUserFetch: Filtering out user with invalid category:', user.IDCatUtilisateurs);
          }
          return isValidCategory && user.CatUtilisateurs;
        });

        const convertedUsers = filteredUsers.map(user => convertSupabaseUserToAppUser(user, getRoleFromCategory));
        
        console.log('useUserFetch: Final administrative users list:', convertedUsers);
        setUsers(convertedUsers);
      } else {
        setUsers([]);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors du chargement des utilisateurs';
      console.error('useUserFetch: Error in fetchUsers:', err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchUsers,
    ensureSpecializedEntries
  };
};
