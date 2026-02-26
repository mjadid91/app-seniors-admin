
export interface Partner {
  id: number;
  nom: string;
  raisonSociale: string; // Ajout de cette propriété utilisée dans le code
  type: string;
  email: string;
  telephone: string;
  adresse: string;
  services: string[];
  dateInscription: string;
  // Champs système cohérents
  dateCreation?: string;
  dateMiseAJour?: string;
  creePar?: string;
}

export interface BonPlan {
  id: number;
  titre: string;
  partenaire: string;
  idPartenaire?: number; // Ajout de cette propriété pour les relations
  description: string;
  typeReduction: string;
  valeurReduction: number;
  dateDebutReduction: string;
  dateFinReduction: string;
  codePromo: string;
  statut: string;
  // Champs système cohérents
  dateCreation?: string;
  dateMiseAJour?: string;
  creePar?: string;
}

// Separate interface for partner selection in BonPlansSection
export interface PartnerForSelect {
  id: number;
  name: string;
}
