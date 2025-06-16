
import { Senior, Aidant, SeniorsStats } from "../../../types/seniors";

export const calculateSeniorsStats = (seniors: Senior[], aidants: Aidant[]): SeniorsStats => {
  const stats: SeniorsStats = {
    totalSeniors: seniors.length,
    seniorsActifs: seniors.filter(s => s.statut === 'actif').length,
    totalAidants: aidants.length,
    aidantsActifs: aidants.filter(a => a.statut === 'actif').length,
    humeurPositive: seniors.filter(s => 
      s.humeurJour && ['content', 'tres_content'].includes(s.humeurJour.humeur)
    ).length,
    humeurNegative: seniors.filter(s => 
      s.humeurJour && ['triste', 'tres_triste'].includes(s.humeurJour.humeur)
    ).length,
    moyenneAge: Math.round(
      seniors.reduce((acc, s) => {
        const age = new Date().getFullYear() - new Date(s.dateNaissance).getFullYear();
        return acc + age;
      }, 0) / seniors.length
    ),
    repartitionAutonomie: {
      faible: seniors.filter(s => s.niveauAutonomie === 'faible').length,
      moyen: seniors.filter(s => s.niveauAutonomie === 'moyen').length,
      eleve: seniors.filter(s => s.niveauAutonomie === 'eleve').length
    }
  };

  return stats;
};
