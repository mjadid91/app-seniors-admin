
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
      console.log('Fetching seniors...');
      
      // Fetch seniors avec join sur Utilisateurs
      const { data: seniorsData, error: seniorsError } = await supabase
        .from('Seniors')
        .select(`
          IDSeniors,
          IDUtilisateurSenior,
          IDStructures,
          IDTuteur,
          EstRGPD,
          NiveauAutonomie,
          Utilisateurs!inner(
            IDUtilisateurs,
            Nom,
            Prenom,
            Email,
            Telephone,
            DateNaissance,
            Adresse,
            DateInscription
          )
        `);

      if (seniorsError) {
        console.error('Erreur lors de la récupération des seniors:', seniorsError);
        throw seniorsError;
      }

      console.log('Seniors data:', seniorsData);

      // Transformer les données
      const seniorsWithUserInfo: Senior[] = (seniorsData || []).map(senior => {
        const userInfo = senior.Utilisateurs as any;
        
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
          ville: 'Non renseigné', // Pas de champ ville dans la base
          codePostal: 'Non renseigné' // Pas de champ code postal dans la base
        };
      });

      console.log('Seniors transformés:', seniorsWithUserInfo);
      setSeniors(seniorsWithUserInfo);
    } catch (err) {
      console.error('Erreur lors de la récupération des seniors:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      setSeniors([]);
    }
  };

  const fetchAidants = async () => {
    try {
      console.log('Fetching aidants...');
      
      // Fetch aidants avec join sur Utilisateurs
      const { data: aidantsData, error: aidantsError } = await supabase
        .from('Aidant')
        .select(`
          IDAidant,
          IDUtilisateurs,
          Experience,
          TarifAidant,
          Utilisateurs!inner(
            IDUtilisateurs,
            Nom,
            Prenom,
            Email,
            Telephone,
            DateNaissance,
            Adresse,
            DateInscription
          )
        `);

      if (aidantsError) {
        console.error('Erreur lors de la récupération des aidants:', aidantsError);
        throw aidantsError;
      }

      console.log('Aidants data:', aidantsData);

      // Transformer les données
      const aidantsWithUserInfo: Aidant[] = (aidantsData || []).map(aidant => {
        const userInfo = aidant.Utilisateurs as any;
        
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
          ville: 'Non renseigné', // Pas de champ ville dans la base
          codePostal: 'Non renseigné', // Pas de champ code postal dans la base
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
