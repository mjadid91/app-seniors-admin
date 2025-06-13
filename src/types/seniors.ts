
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
  aidants?: string[]; // IDs des aidants assignés
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
  };
  dateInscription: string;
  statut: 'actif' | 'inactif' | 'en_attente';
  seniorsAssignes?: string[]; // IDs des seniors assignés
  evaluations?: {
    note: number;
    commentaire?: string;
    date: string;
  }[];
}
