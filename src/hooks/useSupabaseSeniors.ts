
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Senior, Aidant } from '../types/seniors';

export const useSupabaseSeniors = () => {
  const [seniors, setSeniors] = useState<Senior[]>([]);
  const [aidants, setAidants] = useState<Aidant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

      // Créer un map des utilisateurs par ID
      const utilisateursMap = new Map();
      utilisateursData.forEach(user => {
        utilisateursMap.set(user.IDUtilisateurs, user);
      });

      // Transformer les données
      const seniorsWithUserInfo: Senior[] = (seniorsData || []).map(senior => {
        const userInfo = utilisateursMap.get(senior.IDUtilisateurSenior);
        
        return {
          id: senior.IDSeniors.toString(),
          nom: userInfo?.Nom || 'Nom non renseigné',
          prenom: userInfo?.Prenom || 'Prénom non renseigné',
          email: userInfo?.Email || 'Email non renseigné',
          telephone: userInfo?.Telephone || 'Non renseigné',
          dateNaissance: userInfo?.DateNaissance || '1970-01-01',
          adresse: userInfo?.Adresse || 'Non renseigné',
          niveauAutonomie: senior.NiveauAutonomie === 1 ? 'faible' : senior.NiveauAutonomie === 2 ? 'moyen' : 'eleve',
          dateInscription: userInfo?.DateInscription || new Date().toISOString(),
          statut: 'actif' as const,
          ville: 'Non renseigné',
          codePostal: 'Non renseigné'
        };
      });

      console.log('Seniors transformés:', seniorsWithUserInfo);
      setSeniors(seniorsWithUserInfo);
    } catch (err) {
      console.error('Erreur complète lors de la récupération des seniors:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue lors du chargement des seniors');
      setSeniors([]);
    }
  };

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

      // Créer un map des utilisateurs par ID
      const utilisateursMap = new Map();
      utilisateursData.forEach(user => {
        utilisateursMap.set(user.IDUtilisateurs, user);
      });

      // Transformer les données
      const aidantsWithUserInfo: Aidant[] = (aidantsData || []).map(aidant => {
        const userInfo = utilisateursMap.get(aidant.IDUtilisateurs);
        
        return {
          id: aidant.IDAidant.toString(),
          nom: userInfo?.Nom || 'Nom non renseigné',
          prenom: userInfo?.Prenom || 'Prénom non renseigné',
          email: userInfo?.Email || 'Email non renseigné',
          telephone: userInfo?.Telephone || 'Non renseigné',
          dateNaissance: userInfo?.DateNaissance || '1970-01-01',
          adresse: userInfo?.Adresse || 'Non renseigné',
          profession: 'Aidant professionnel',
          experience: aidant.Experience || 'Expérience à définir',
          dateInscription: userInfo?.DateInscription || new Date().toISOString(),
          statut: 'actif' as const,
          ville: 'Non renseigné',
          codePostal: 'Non renseigné',
          tarifHoraire: aidant.TarifAidant || 0,
          disponibilites: {
            jours: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'],
            heures: '9h-17h'
          }
        };
      });

      console.log('Aidants transformés:', aidantsWithUserInfo);
      setAidants(aidantsWithUserInfo);
    } catch (err) {
      console.error('Erreur complète lors de la récupération des aidants:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue lors du chargement des aidants');
      setAidants([]);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await Promise.all([
        fetchSeniors(),
        fetchAidants()
      ]);
    } catch (err) {
      console.error('Erreur globale:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    seniors,
    aidants,
    loading,
    error,
    refetch: fetchData
  };
};
