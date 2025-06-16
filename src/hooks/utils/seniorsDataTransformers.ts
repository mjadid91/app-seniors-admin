
import { Senior, Aidant } from '../../types/seniors';

export const transformSeniorData = (seniorsData: any[], utilisateursMap: Map<any, any>): Senior[] => {
  return (seniorsData || []).map(senior => {
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
};

export const transformAidantData = (aidantsData: any[], utilisateursMap: Map<any, any>): Aidant[] => {
  return (aidantsData || []).map(aidant => {
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
};

export const createUtilisateursMap = (utilisateursData: any[]): Map<any, any> => {
  const utilisateursMap = new Map();
  utilisateursData.forEach(user => {
    utilisateursMap.set(user.IDUtilisateurs, user);
  });
  return utilisateursMap;
};
