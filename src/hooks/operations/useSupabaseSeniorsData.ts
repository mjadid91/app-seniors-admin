
import { useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Senior } from '../../types/seniors';
import { transformSeniorData, createUtilisateursMap } from '../utils/seniorsDataTransformers';

export const useSupabaseSeniorsData = () => {
  const [seniors, setSeniors] = useState<Senior[]>([]);
  const isLoadingRef = useRef(false);

  const fetchSeniors = async () => {
    // Empêcher les appels multiples simultanés
    if (isLoadingRef.current) {
      console.log('Fetch seniors already in progress, skipping...');
      return;
    }

    try {
      isLoadingRef.current = true;
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

      // Récupérer d'abord tous les seniors existants
      const userIds = utilisateursData.map(u => u.IDUtilisateurs);
      const { data: existingSeniorsData, error: existingSeniorsError } = await supabase
        .from('Seniors')
        .select('*')
        .in('IDUtilisateurSenior', userIds);

      if (existingSeniorsError) {
        console.error('Erreur lors de la récupération des seniors existants:', existingSeniorsError);
        throw new Error(`Erreur seniors existants: ${existingSeniorsError.message}`);
      }

      // Identifier les utilisateurs qui n'ont pas d'entrée Senior
      const existingSeniorUserIds = new Set(existingSeniorsData?.map(s => s.IDUtilisateurSenior) || []);
      const usersWithoutSeniorEntry = utilisateursData.filter(user => !existingSeniorUserIds.has(user.IDUtilisateurs));

      // Créer les entrées manquantes en une seule fois
      if (usersWithoutSeniorEntry.length > 0) {
        console.log(`Creating ${usersWithoutSeniorEntry.length} missing Senior entries`);
        const newSeniorEntries = usersWithoutSeniorEntry.map(user => ({
          IDUtilisateurSenior: user.IDUtilisateurs,
          NiveauAutonomie: 2,
          EstRGPD: false
        }));

        const { error: insertError } = await supabase
          .from('Seniors')
          .insert(newSeniorEntries);

        if (insertError) {
          console.error('Erreur lors de la création des entrées Senior:', insertError);
          throw new Error(`Erreur création seniors: ${insertError.message}`);
        }
      }

      // Récupérer toutes les informations seniors finales
      const { data: allSeniorsData, error: allSeniorsError } = await supabase
        .from('Seniors')
        .select('*')
        .in('IDUtilisateurSenior', userIds);

      if (allSeniorsError) {
        console.error('Erreur lors de la récupération finale des seniors:', allSeniorsError);
        throw new Error(`Erreur seniors finaux: ${allSeniorsError.message}`);
      }

      console.log('All seniors data:', allSeniorsData);

      // Créer un map des utilisateurs par ID et transformer les données
      const utilisateursMap = createUtilisateursMap(utilisateursData);
      const seniorsWithUserInfo = transformSeniorData(allSeniorsData, utilisateursMap);

      // Déduplication basée sur l'ID pour éviter les doublons
      const uniqueSeniors = seniorsWithUserInfo.reduce((acc, senior) => {
        if (!acc.find(s => s.id === senior.id)) {
          acc.push(senior);
        }
        return acc;
      }, [] as Senior[]);

      console.log('Seniors transformés et dédupliqués:', uniqueSeniors);
      setSeniors(uniqueSeniors);
    } catch (err) {
      console.error('Erreur complète lors de la récupération des seniors:', err);
      throw err;
    } finally {
      isLoadingRef.current = false;
    }
  };

  return {
    seniors,
    setSeniors,
    fetchSeniors
  };
};
