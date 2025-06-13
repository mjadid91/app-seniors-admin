
import { User } from "../../stores/authStore";

export const mockUsers: User[] = [
  {
    id: '1',
    nom: 'Dubois',
    prenom: 'Marie',
    email: 'admin@appseniors.fr',
    role: 'administrateur',
    dateInscription: '2024-01-15'
  },
  {
    id: '2',
    nom: 'Martin',
    prenom: 'Pierre',
    email: 'support@appseniors.fr',
    role: 'support',
    dateInscription: '2024-02-10'
  },
  {
    id: '3',
    nom: 'Durand',
    prenom: 'Sophie',
    email: 'moderateur@appseniors.fr',
    role: 'moderateur',
    dateInscription: '2024-03-05'
  },
  {
    id: '4',
    nom: 'Leclerc',
    prenom: 'Jean',
    email: 'viewer@appseniors.fr',
    role: 'visualisateur',
    dateInscription: '2024-03-20'
  },
  {
    id: '5',
    nom: 'Moreau',
    prenom: 'Claire',
    email: 'claire.moreau@appseniors.fr',
    role: 'support',
    dateInscription: '2024-04-12'
  }
];
