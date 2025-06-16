
import { useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Senior } from '../../types/seniors';
import { transformSeniorData, createUtilisateursMap } from '../utils/seniorsDataTransformers';

export const useSupabaseSeniorsData = () => {
  const [seniors, setSeniors] = useState<Senior[]>([]);
  const fetchRef = useRef({
    isLoading: false,
    hasFetched: false
  });

  const fetchSeniors = async () => {
    // Empêcher les appels multiples simultanés
    if (fetchRef.current.isLoading) {
      console.log('Fetch seniors already in progress, skipping...');
      return;
    }

    // Ne pas refetch si déjà fait
    if (fetchRef.current.hasFetched) {
      console.log('Seniors already fetched, skipping...');
      return;
    }

    try {
      fetchRef.current.isLoading = true;
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
        fetchRef.current.hasFetched = true;
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

      // Créer les entrées manquantes en une seule fois seulement s'il y en a
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

        // Récupérer les données finales après insertion
        const { data: finalSeniorsData, error: finalError } = await supabase
          .from('Seniors')
          .select('*')
          .in('IDUtilisateurSenior', userIds);

        if (finalError) {
          console.error('Erreur lors de la récupération finale des seniors:', finalError);
          throw new Error(`Erreur seniors finaux: ${finalError.message}`);
        }

        console.log('Final seniors data after creation:', finalSeniorsData);

        // Transformer les données
        const utilisateursMap = createUtilisateursMap(utilisateursData);
        const seniorsWithUserInfo = transformSeniorData(finalSeniorsData, utilisateursMap);
        setSeniors(seniorsWithUserInfo);
      } else {
        // Pas de nouvelles entrées à créer, utiliser les données existantes
        console.log('All seniors data already exists:', existingSeniorsData);
        const utilisateursMap = createUtilisateursMap(utilisateursData);
        const seniorsWithUserInfo = transformSeniorData(existingSeniorsData, utilisateursMap);
        setSeniors(seniorsWithUserInfo);
      }

      fetchRef.current.hasFetched = true;
      console.log('Seniors fetch completed successfully');
    } catch (err) {
      console.error('Erreur complète lors de la récupération des seniors:', err);
      throw err;
    } finally {
      fetchRef.current.isLoading = false;
    }
  };

  return {
    seniors,
    setSeniors,
    fetchSeniors
  };
};
