
export interface Senior {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  dateNaissance: string;
  adresse: string;
  ville: string;
  codePostal: string;
  niveauAutonomie: 'faible' | 'moyen' | 'eleve';
  dateInscription: string;
  statut: 'actif' | 'inactif' | 'suspendu';
  genre?: string;
}

export interface Aidant {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  dateNaissance: string;
  adresse: string;
  ville: string;
  codePostal: string;
  profession: string;
  experience: string;
  dateInscription: string;
  statut: 'actif' | 'inactif' | 'en_attente' | 'suspendu';
  tarifHoraire: number;
  genre?: string;
  disponibilites?: {
    jours: string[];
    heures: string;
  };
}

export interface SeniorsStats {
  totalSeniors: number;
  seniorsActifs: number;
  totalAidants: number;
  aidantsActifs: number;
  humeurPositive: number;
  humeurNegative: number;
}
