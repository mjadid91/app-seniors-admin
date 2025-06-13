
export interface ForumPost {
  id: string;
  titre: string;
  auteur: string;
  dateCreation: string;
  nbReponses: number;
  signalements: number;
  statut: 'visible' | 'masque' | 'archive';
}

export interface GroupMessage {
  id: string;
  contenu: string;
  auteur: string;
  groupe: string;
  dateEnvoi: string;
  signalements: number;
  statut: 'visible' | 'masque' | 'supprime';
}
