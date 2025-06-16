
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

      // Récupérer les informations seniors correspondantes
      const userIds = utilisateursData.map(u => u.IDUtilisateurs);
      console.log('User IDs to fetch seniors for:', userIds);
      
      const { data: seniorsData, error: seniorsError } = await supabase
        .from('Seniors')
        .select('*')
        .in('IDUtilisateurSenior', userIds);

      if (seniorsError) {
        console.error('Erreur lors de la récupération des seniors:', seniorsError);
        throw new Error(`Erreur seniors: ${seniorsError.message}`);
      }

      console.log('Seniors data:', seniorsData);

      // Créer un map des utilisateurs par ID pour éviter les doublons
      const utilisateursMap = new Map();
      utilisateursData.forEach(user => {
        utilisateursMap.set(user.IDUtilisateurs, user);
      });

      // Créer un Set pour éviter les doublons de seniors
      const uniqueSeniorsMap = new Map();

      // Transformer les données en évitant les doublons
      (seniorsData || []).forEach(senior => {
        const userInfo = utilisateursMap.get(senior.IDUtilisateurSenior);
        
        // Utiliser l'ID du senior comme clé unique
        const seniorId = senior.IDSeniors.toString();
        
        if (!uniqueSeniorsMap.has(seniorId) && userInfo) {
          const seniorData: Senior = {
            id: seniorId,
            nom: userInfo.Nom || 'Nom non renseigné',
            prenom: userInfo.Prenom || 'Prénom non renseigné',
            email: userInfo.Email || 'Email non renseigné',
            telephone: userInfo.Telephone || 'Non renseigné',
            dateNaissance: userInfo.DateNaissance || '1970-01-01',
            adresse: userInfo.Adresse || 'Non renseigné',
            niveauAutonomie: senior.NiveauAutonomie === 1 ? 'faible' : senior.NiveauAutonomie === 2 ? 'moyen' : 'eleve',
            dateInscription: userInfo.DateInscription || new Date().toISOString(),
            statut: 'actif' as const,
            ville: 'Non renseigné',
            codePostal: 'Non renseigné'
          };
          
          uniqueSeniorsMap.set(seniorId, seniorData);
        }
      });

      // Convertir la Map en Array
      const seniorsWithUserInfo = Array.from(uniqueSeniorsMap.values());

      console.log('Nombre de seniors uniques transformés:', seniorsWithUserInfo.length);
      console.log('Seniors transformés (uniques):', seniorsWithUserInfo);
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

      // Créer un map des utilisateurs par ID pour éviter les doublons
      const utilisateursMap = new Map();
      utilisateursData.forEach(user => {
        utilisateursMap.set(user.IDUtilisateurs, user);
      });

      // Créer un Set pour éviter les doublons d'aidants
      const uniqueAidantsMap = new Map();

      // Transformer les données en évitant les doublons
      (aidantsData || []).forEach(aidant => {
        const userInfo = utilisateursMap.get(aidant.IDUtilisateurs);
        
        // Utiliser l'ID de l'aidant comme clé unique
        const aidantId = aidant.IDAidant.toString();
        
        if (!uniqueAidantsMap.has(aidantId) && userInfo) {
          const aidantData: Aidant = {
            id: aidantId,
            nom: userInfo.Nom || 'Nom non renseigné',
            prenom: userInfo.Prenom || 'Prénom non renseigné',
            email: userInfo.Email || 'Email non renseigné',
            telephone: userInfo.Telephone || 'Non renseigné',
            dateNaissance: userInfo.DateNaissance || '1970-01-01',
            adresse: userInfo.Adresse || 'Non renseigné',
            profession: 'Aidant professionnel',
            experience: aidant.Experience || 'Expérience à définir',
            dateInscription: userInfo.DateInscription || new Date().toISOString(),
            statut: 'actif' as const,
            ville: 'Non renseigné',
            codePostal: 'Non renseigné',
            tarifHoraire: aidant.TarifAidant || 0,
            disponibilites: {
              jours: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'],
              heures: '9h-17h'
            }
          };
          
          uniqueAidantsMap.set(aidantId, aidantData);
        }
      });

      // Convertir la Map en Array
      const aidantsWithUserInfo = Array.from(uniqueAidantsMap.values());

      console.log('Nombre d\'aidants uniques transformés:', aidantsWithUserInfo.length);
      console.log('Aidants transformés (uniques):', aidantsWithUserInfo);
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
