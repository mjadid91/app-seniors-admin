
import { User } from "../../stores/authStore";

export const filterUsers = (users: User[], searchTerm: string): User[] => {
  if (!searchTerm) return users;
  
  return users.filter(user =>
    user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
