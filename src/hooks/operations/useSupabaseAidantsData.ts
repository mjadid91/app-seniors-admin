
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Aidant } from '../../types/seniors';
import { transformAidantData, createUtilisateursMap } from '../utils/seniorsDataTransformers';

export const useSupabaseAidantsData = () => {
  const [aidants, setAidants] = useState<Aidant[]>([]);

  const fetchAidants = async () => {
    try {
      console.log('Fetching aidants...');
      
      // Récupérer les utilisateurs avec la catégorie 4 (aidants)
      const { data: utilisateursData, error: utilisateursError } = await supabase
        .from('Utilisateurs')
        .select('*')
        .eq('IDCatUtilisateurs', 4);

      if (utilisateursError) {
        console.error('Erreur lors de la récupération des utilisateurs aidants:', utilisateursError);
        throw new Error(`Erreur utilisateurs aidants: ${utilisateursError.message}`);
      }

      console.log('Utilisateurs aidants data:', utilisateursData);

      if (!utilisateursData || utilisateursData.length === 0) {
        console.log('Aucun utilisateur aidant trouvé avec la catégorie 4');
        setAidants([]);
        return;
      }

      // Pour chaque utilisateur aidant, s'assurer qu'il a une entrée dans la table Aidant
      for (const user of utilisateursData) {
        const { data: existingAidant } = await supabase
          .from('Aidant')
          .select('IDAidant')
          .eq('IDUtilisateurs', user.IDUtilisateurs)
          .maybeSingle();

        if (!existingAidant) {
          console.log(`Creating missing Aidant entry for user ${user.IDUtilisateurs}`);
          await supabase
            .from('Aidant')
            .insert({
              IDUtilisateurs: user.IDUtilisateurs,
              Experience: 'Expérience à définir',
              TarifAidant: 0
            });
        }
      }

      // Récupérer les informations aidants correspondantes
      const userIds = utilisateursData.map(u => u.IDUtilisateurs);
      const { data: aidantsData, error: aidantsError } = await supabase
        .from('Aidant')
        .select('*')
        .in('IDUtilisateurs', userIds);

      if (aidantsError) {
        console.error('Erreur lors de la récupération des aidants:', aidantsError);
        throw new Error(`Erreur aidants: ${aidantsError.message}`);
      }

      console.log('Aidants data:', aidantsData);

      // Créer un map des utilisateurs par ID et transformer les données
      const utilisateursMap = createUtilisateursMap(utilisateursData);
      const aidantsWithUserInfo = transformAidantData(aidantsData, utilisateursMap);

      console.log('Aidants transformés:', aidantsWithUserInfo);
      setAidants(aidantsWithUserInfo);
    } catch (err) {
      console.error('Erreur complète lors de la récupération des aidants:', err);
      throw err;
    }
  };

  return {
    aidants,
    setAidants,
    fetchAidants
  };
};
