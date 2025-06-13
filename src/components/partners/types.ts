
export interface Partner {
  id: number;
  nom: string; // Renommé pour cohérence
  type: string;
  email: string;
  telephone: string; // Renommé pour cohérence
  adresse: string; // Renommé pour cohérence
  statut: string;
  evaluation: number; // Renommé pour cohérence
  services: string[];
  dateInscription: string; // Renommé pour cohérence
  // Champs système cohérents
  dateCreation?: string;
  dateMiseAJour?: string;
  creePar?: string;
}

export interface BonPlan {
  id: number;
  titre: string;
  partenaire: string;
  description: string;
  typeReduction: string;
  valeurReduction: number; // Renommé pour cohérence
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
