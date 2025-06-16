
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
      
      // D'abord récupérer les seniors
      const { data: seniorsData, error: seniorsError } = await supabase
        .from('Seniors')
        .select('*');

      if (seniorsError) {
        console.error('Erreur lors de la récupération des seniors:', seniorsError);
        throw new Error(`Erreur seniors: ${seniorsError.message}`);
      }

      console.log('Seniors data brute:', seniorsData);

      if (!seniorsData || seniorsData.length === 0) {
        console.log('Aucun senior trouvé');
        setSeniors([]);
        return;
      }

      // Récupérer les informations utilisateurs pour chaque senior
      const seniorIds = seniorsData.map(s => s.IDUtilisateurSenior).filter(Boolean);
      
      if (seniorIds.length === 0) {
        console.log('Aucun IDUtilisateurSenior valide trouvé');
        setSeniors([]);
        return;
      }

      const { data: utilisateursData, error: utilisateursError } = await supabase
        .from('Utilisateurs')
        .select('*')
        .in('IDUtilisateurs', seniorIds);

      if (utilisateursError) {
        console.error('Erreur lors de la récupération des utilisateurs seniors:', utilisateursError);
        throw new Error(`Erreur utilisateurs seniors: ${utilisateursError.message}`);
      }

      console.log('Utilisateurs data:', utilisateursData);

      // Créer un map des utilisateurs par ID
      const utilisateursMap = new Map();
      if (utilisateursData) {
        utilisateursData.forEach(user => {
          utilisateursMap.set(user.IDUtilisateurs, user);
        });
      }

      // Transformer les données
      const seniorsWithUserInfo: Senior[] = seniorsData.map(senior => {
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
      
      // D'abord récupérer les aidants
      const { data: aidantsData, error: aidantsError } = await supabase
        .from('Aidant')
        .select('*');

      if (aidantsError) {
        console.error('Erreur lors de la récupération des aidants:', aidantsError);
        throw new Error(`Erreur aidants: ${aidantsError.message}`);
      }

      console.log('Aidants data brute:', aidantsData);

      if (!aidantsData || aidantsData.length === 0) {
        console.log('Aucun aidant trouvé');
        setAidants([]);
        return;
      }

      // Récupérer les informations utilisateurs pour chaque aidant
      const aidantUserIds = aidantsData.map(a => a.IDUtilisateurs).filter(Boolean);
      
      if (aidantUserIds.length === 0) {
        console.log('Aucun IDUtilisateurs valide trouvé pour les aidants');
        setAidants([]);
        return;
      }

      const { data: utilisateursData, error: utilisateursError } = await supabase
        .from('Utilisateurs')
        .select('*')
        .in('IDUtilisateurs', aidantUserIds);

      if (utilisateursError) {
        console.error('Erreur lors de la récupération des utilisateurs aidants:', utilisateursError);
        throw new Error(`Erreur utilisateurs aidants: ${utilisateursError.message}`);
      }

      console.log('Utilisateurs aidants data:', utilisateursData);

      // Créer un map des utilisateurs par ID
      const utilisateursMap = new Map();
      if (utilisateursData) {
        utilisateursData.forEach(user => {
          utilisateursMap.set(user.IDUtilisateurs, user);
        });
      }

      // Transformer les données
      const aidantsWithUserInfo: Aidant[] = aidantsData.map(aidant => {
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
