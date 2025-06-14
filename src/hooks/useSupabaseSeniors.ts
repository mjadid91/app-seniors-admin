
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Senior, Aidant } from '../types/seniors';

interface SupabaseSenior {
  IDSeniors: number;
  IDUtilisateurSenior: number;
  IDStructures?: number;
  IDTuteur?: number;
  EstRGPD: boolean;
  NiveauAutonomie: number;
}

interface SupabaseAidant {
  IDAidant: number;
  IDUtilisateurs: number;
  Experience: string;
  TarifAidant: number;
}

interface SupabaseUser {
  IDUtilisateurs: number;
  Nom: string;
  Prenom: string;
  Email: string;
  Telephone: string;
  DateNaissance: string;
  Adresse: string;
  Genre: string;
  DateInscription: string;
}

export const useSupabaseSeniors = () => {
  const [seniors, setSeniors] = useState<Senior[]>([]);
  const [aidants, setAidants] = useState<Aidant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSeniors = async () => {
    try {
      // Fetch seniors with their user information
      const { data: seniorsData, error: seniorsError } = await supabase
        .from('Seniors')
        .select(`
          IDSeniors,
          IDUtilisateurSenior,
          IDStructures,
          IDTuteur,
          EstRGPD,
          NiveauAutonomie
        `);

      if (seniorsError) {
        throw seniorsError;
      }

      // Fetch user information for seniors
      const seniorUserIds = seniorsData?.map(s => s.IDUtilisateurSenior).filter(Boolean) || [];
      
      let seniorsWithUserInfo: Senior[] = [];
      
      if (seniorUserIds.length > 0) {
        const { data: usersData, error: usersError } = await supabase
          .from('Utilisateurs')
          .select('*')
          .in('IDUtilisateurs', seniorUserIds);

        if (usersError) {
          throw usersError;
        }

        // Combine senior and user data
        seniorsWithUserInfo = seniorsData?.map(senior => {
          const userInfo = usersData?.find(user => user.IDUtilisateurs === senior.IDUtilisateurSenior);
          
          return {
            id: senior.IDSeniors.toString(),
            nom: userInfo?.Nom || 'Nom non renseigné',
            prenom: userInfo?.Prenom || 'Prénom non renseigné',
            email: userInfo?.Email || 'Email non renseigné',
            telephone: userInfo?.Telephone,
            dateNaissance: userInfo?.DateNaissance || '1970-01-01',
            adresse: userInfo?.Adresse,
            niveauAutonomie: senior.NiveauAutonomie === 1 ? 'faible' : senior.NiveauAutonomie === 2 ? 'moyen' : 'eleve',
            dateInscription: userInfo?.DateInscription || new Date().toISOString(),
            statut: 'actif' as const,
            ville: 'Non renseigné', // Pas de champ ville dans la base
            codePostal: 'Non renseigné' // Pas de champ code postal dans la base
          };
        }) || [];
      }

      setSeniors(seniorsWithUserInfo);
    } catch (err) {
      console.error('Erreur lors de la récupération des seniors:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      setSeniors([]);
    }
  };

  const fetchAidants = async () => {
    try {
      // Fetch aidants with their user information
      const { data: aidantsData, error: aidantsError } = await supabase
        .from('Aidant')
        .select(`
          IDAidant,
          IDUtilisateurs,
          Experience,
          TarifAidant
        `);

      if (aidantsError) {
        throw aidantsError;
      }

      // Fetch user information for aidants
      const aidantUserIds = aidantsData?.map(a => a.IDUtilisateurs).filter(Boolean) || [];
      
      let aidantsWithUserInfo: Aidant[] = [];
      
      if (aidantUserIds.length > 0) {
        const { data: usersData, error: usersError } = await supabase
          .from('Utilisateurs')
          .select('*')
          .in('IDUtilisateurs', aidantUserIds);

        if (usersError) {
          throw usersError;
        }

        // Combine aidant and user data
        aidantsWithUserInfo = aidantsData?.map(aidant => {
          const userInfo = usersData?.find(user => user.IDUtilisateurs === aidant.IDUtilisateurs);
          
          return {
            id: aidant.IDAidant.toString(),
            nom: userInfo?.Nom || 'Nom non renseigné',
            prenom: userInfo?.Prenom || 'Prénom non renseigné',
            email: userInfo?.Email || 'Email non renseigné',
            telephone: userInfo?.Telephone || 'Non renseigné',
            dateNaissance: userInfo?.DateNaissance || '1970-01-01',
            adresse: userInfo?.Adresse,
            profession: 'Aidant', // Pas de champ profession spécifique dans la base
            experience: aidant.Experience,
            dateInscription: userInfo?.DateInscription || new Date().toISOString(),
            statut: 'actif' as const,
            ville: 'Non renseigné', // Pas de champ ville dans la base
            codePostal: 'Non renseigné', // Pas de champ code postal dans la base
            tarifHoraire: aidant.TarifAidant,
            disponibilites: {
              jours: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'],
              heures: '9h-17h'
            }
          };
        }) || [];
      }

      setAidants(aidantsWithUserInfo);
    } catch (err) {
      console.error('Erreur lors de la récupération des aidants:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      setAidants([]);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    await Promise.all([
      fetchSeniors(),
      fetchAidants()
    ]);
    
    setLoading(false);
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
