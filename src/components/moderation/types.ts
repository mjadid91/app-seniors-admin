
export interface ForumPost {
  id: string;
  titre: string;
  auteur: string;
  dateCreation: string;
  nbReponses: number;
  signalements: number;
  statut: 'visible' | 'masque' | 'archive';
  // Champs système cohérents
  dateMiseAJour?: string;
  creePar?: string;
}

export interface GroupMessage {
  id: string;
  contenu: string;
  auteur: string;
  groupe: string;
  dateEnvoi: string;
  signalements: number;
  statut: 'visible' | 'masque' | 'supprime';
  // Champs système cohérents
  dateCreation?: string;
  dateMiseAJour?: string;
  creePar?: string;
}
