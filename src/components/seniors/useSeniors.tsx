
import { useState, useEffect } from "react";
import { Senior, Aidant, SeniorsStats } from "../../types/seniors";
import { useSupabaseSeniors } from "../../hooks/useSupabaseSeniors";

export const useSeniors = () => {
  const { seniors: realSeniors, aidants: realAidants, loading, error } = useSupabaseSeniors();
  const [stats, setStats] = useState<SeniorsStats>({
    totalSeniors: 0,
    seniorsActifs: 0,
    totalAidants: 0,
    aidantsActifs: 0,
    humeurPositive: 0,
    humeurNegative: 0
  });

  // Utiliser les vraies données de Supabase au lieu des données de démonstration
  useEffect(() => {
    console.log('=== useSeniors - Calcul des statistiques ===');
    console.log('Données reçues:', { 
      realSeniorsCount: realSeniors.length, 
      realAidantsCount: realAidants.length,
      loading,
      error 
    });
    
    if (realSeniors.length > 0 || realAidants.length > 0) {
      console.log('Seniors reçus pour calcul stats:', realSeniors.map(s => ({ id: s.id, nom: s.nom, prenom: s.prenom })));
      
      // Vérification stricte de l'unicité
      const seniorIds = realSeniors.map(s => s.id);
      const uniqueIds = new Set(seniorIds);
      
      if (seniorIds.length !== uniqueIds.size) {
        console.error('❌ DOUBLONS DÉTECTÉS dans useSeniors!', {
          totalSeniors: seniorIds.length,
          uniqueSeniors: uniqueIds.size,
          doublons: seniorIds.filter((id, index) => seniorIds.indexOf(id) !== index)
        });
      } else {
        console.log('✅ Aucun doublon détecté dans useSeniors');
      }
      
      // Calcul des statistiques basé sur les vraies données
      const newStats: SeniorsStats = {
        totalSeniors: realSeniors.length,
        seniorsActifs: realSeniors.filter(s => s.statut === 'actif').length,
        totalAidants: realAidants.length,
        aidantsActifs: realAidants.filter(a => a.statut === 'actif').length,
        humeurPositive: realSeniors.filter(s => 
          s.humeurJour && ['content', 'tres_content'].includes(s.humeurJour.humeur)
        ).length,
        humeurNegative: realSeniors.filter(s => 
          s.humeurJour && ['triste', 'tres_triste'].includes(s.humeurJour.humeur)
        ).length,
        moyenneAge: realSeniors.length > 0 ? Math.round(
          realSeniors.reduce((acc, s) => {
            const age = new Date().getFullYear() - new Date(s.dateNaissance).getFullYear();
            return acc + age;
          }, 0) / realSeniors.length
        ) : 0,
        repartitionAutonomie: {
          faible: realSeniors.filter(s => s.niveauAutonomie === 'faible').length,
          moyen: realSeniors.filter(s => s.niveauAutonomie === 'moyen').length,
          eleve: realSeniors.filter(s => s.niveauAutonomie === 'eleve').length
        }
      };

      console.log('Stats calculées:', newStats);
      setStats(newStats);
    }
  }, [realSeniors, realAidants, loading, error]);

  return {
    seniors: realSeniors,
    aidants: realAidants,
    stats,
    setSeniors: () => {}, // Fonction vide car on utilise les données de Supabase
    setAidants: () => {}, // Fonction vide car on utilise les données de Supabase
    loading,
    error
  };
};
