
import { User } from '../../stores/authStore';

export interface SupabaseUser {
  IDUtilisateurs: number;
  Nom: string;
  Prenom: string;
  Email: string;
  Telephone: string;
  DateNaissance: string;
  Adresse: string;
  Genre: string;
  MotDePasse: string;
  IDCatUtilisateurs: number;
  DateInscription: string;
  Commentaire: string;
  DateModification: string;
  LangueSite: string;
  Photo: string;
  EstDesactive?: boolean;
  EstRGPD?: boolean;
}

export interface UserHookReturn {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  addUser: (userData: any, userPassword: string) => Promise<User>;
  updateUser: (userId: string, updates: Partial<User>) => Promise<User>;
  deleteUser: (userId: string) => Promise<void>;
}
