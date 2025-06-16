
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Senior } from '../../types/seniors';
import { transformSeniorData, createUtilisateursMap } from '../utils/seniorsDataTransformers';

export const useSupabaseSeniorsData = () => {
  const [seniors, setSeniors] = useState<Senior[]>([]);

  const fetchSeniors = async () => {
    try {
      console.log('Fetching seniors...');
      
      // Récupérer les utilisateurs avec la catégorie 1 (seniors)
      const { data: utilisateursData, error: utilisateursError } = await supabase
        .from('Utilisateurs')
        .select('*')
        .eq('IDCatUtilisateurs', 1);

      if (utilisateursError) {
        console.error('Erreur lors de la récupération des utilisateurs seniors:', utilisateursError);
        throw new Error(`Erreur utilisateurs seniors: ${utilisateursError.message}`);
      }

      console.log('Utilisateurs seniors data:', utilisateursData);

      if (!utilisateursData || utilisateursData.length === 0) {
        console.log('Aucun utilisateur senior trouvé avec la catégorie 1');
        setSeniors([]);
        return;
      }

      // Pour chaque utilisateur senior, s'assurer qu'il a une entrée dans la table Seniors
      for (const user of utilisateursData) {
        const { data: existingSenior } = await supabase
          .from('Seniors')
          .select('IDSeniors')
          .eq('IDUtilisateurSenior', user.IDUtilisateurs)
          .maybeSingle();

        if (!existingSenior) {
          console.log(`Creating missing Senior entry for user ${user.IDUtilisateurs}`);
          await supabase
            .from('Seniors')
            .insert({
              IDUtilisateurSenior: user.IDUtilisateurs,
              NiveauAutonomie: 2,
              EstRGPD: false
            });
        }
      }

      // Récupérer les informations seniors correspondantes
      const userIds = utilisateursData.map(u => u.IDUtilisateurs);
      const { data: seniorsData, error: seniorsError } = await supabase
        .from('Seniors')
        .select('*')
        .in('IDUtilisateurSenior', userIds);

      if (seniorsError) {
        console.error('Erreur lors de la récupération des seniors:', seniorsError);
        throw new Error(`Erreur seniors: ${seniorsError.message}`);
      }

      console.log('Seniors data:', seniorsData);

      // Créer un map des utilisateurs par ID et transformer les données
      const utilisateursMap = createUtilisateursMap(utilisateursData);
      const seniorsWithUserInfo = transformSeniorData(seniorsData, utilisateursMap);

      console.log('Seniors transformés:', seniorsWithUserInfo);
      setSeniors(seniorsWithUserInfo);
    } catch (err) {
      console.error('Erreur complète lors de la récupération des seniors:', err);
      throw err;
    }
  };

  return {
    seniors,
    setSeniors,
    fetchSeniors
  };
};
