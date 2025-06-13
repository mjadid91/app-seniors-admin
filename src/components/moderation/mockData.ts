
import { ForumPost, GroupMessage } from './types';

export const mockForumPosts: ForumPost[] = [
  {
    id: 'F001',
    titre: 'Conseils pour bien vieillir chez soi',
    auteur: 'Marie Dupont',
    dateCreation: '2024-06-10',
    nbReponses: 12,
    signalements: 0,
    statut: 'visible'
  },
  {
    id: 'F002',
    titre: 'Problème avec mon aidant',
    auteur: 'Pierre Martin',
    dateCreation: '2024-06-09',
    nbReponses: 5,
    signalements: 2,
    statut: 'visible'
  }
];

export const mockGroupMessages: GroupMessage[] = [
  {
    id: 'G001',
    contenu: 'Bonjour à tous, j\'aimerais partager mon expérience...',
    auteur: 'Sophie Bernard',
    groupe: 'Seniors Actifs',
    dateEnvoi: '2024-06-11',
    signalements: 1,
    statut: 'visible'
  }
];
