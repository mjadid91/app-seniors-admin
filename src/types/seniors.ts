
export interface Senior {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  dateNaissance: string;
  adresse?: string;
  ville?: string;
  codePostal?: string;
  situationFamiliale?: 'celibataire' | 'marie' | 'veuf' | 'divorce';
  handicap?: boolean;
  pathologies?: string[];
  niveauAutonomie?: 'faible' | 'moyen' | 'eleve';
  dateInscription: string;
  statut: 'actif' | 'inactif' | 'suspendu';
  derniereConnexion?: string;
  humeurJour?: {
    date: string;
    humeur: 'tres_content' | 'content' | 'neutre' | 'triste' | 'tres_triste';
    commentaire?: string;
  };
  aidantsAssignes?: string[]; // IDs des aidants assignés
  // Champs système cohérents avec User
  dateCreation?: string;
  dateMiseAJour?: string;
  creePar?: string;
}

export interface Aidant {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  dateNaissance: string;
  adresse?: string;
  ville?: string;
  codePostal?: string;
  profession?: string;
  experience?: string;
  formations?: string[];
  certifications?: string[];
  disponibilites?: {
    jours: string[];
    heures: string;
    zoneCouverture?: string[];
  };
  dateInscription: string;
  statut: 'actif' | 'inactif' | 'en_attente' | 'suspendu';
  seniorsAssignes?: string[]; // IDs des seniors assignés
  evaluations?: {
    id: string;
    note: number;
    commentaire?: string;
    date: string;
    seniorId: string;
  }[];
  // Champs système cohérents avec User
  dateCreation?: string;
  dateMiseAJour?: string;
  creePar?: string;
  tarifHoraire?: number;
  specialites?: string[];
}

// Types pour les statistiques
export interface SeniorsStats {
  totalSeniors: number;
  seniorsActifs: number;
  totalAidants: number;
  aidantsActifs: number;
  humeurPositive: number;
  humeurNegative: number;
  moyenneAge?: number;
  repartitionAutonomie?: {
    faible: number;
    moyen: number;
    eleve: number;
  };
}
