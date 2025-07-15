
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
  situationFamiliale?: string;
  handicap?: boolean;
  pathologies?: string[];
  photo?: string;
  humeurJour?: {
    humeur: 'tres_content' | 'content' | 'neutre' | 'triste' | 'tres_triste';
    date: string;
    commentaire?: string;
  };
  derniereConnexion?: string;
  aidantsAssignes?: string[];
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
  photo?: string;
  disponibilites?: {
    jours: string[];
    heures: string;
  };
  formations?: string[];
  certifications?: string[];
  evaluations?: {
    note: number;
    date: string;
    commentaire?: string;
  }[];
  seniorsAssignes?: string[];
}

export interface SeniorsStats {
  totalSeniors: number;
  seniorsActifs: number;
  totalAidants: number;
  aidantsActifs: number;
  humeurPositive: number;
  humeurNegative: number;
}
