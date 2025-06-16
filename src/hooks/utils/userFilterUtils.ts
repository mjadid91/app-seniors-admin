
import { User } from '../../stores/authStore';

export const filterUsers = (users: User[], searchTerm: string): User[] => {
  if (!searchTerm.trim()) {
    return users;
  }

  const lowercaseSearchTerm = searchTerm.toLowerCase();
  
  return users.filter(user => 
    user.nom.toLowerCase().includes(lowercaseSearchTerm) ||
    user.prenom.toLowerCase().includes(lowercaseSearchTerm) ||
    user.email.toLowerCase().includes(lowercaseSearchTerm) ||
    user.role.toLowerCase().includes(lowercaseSearchTerm)
  );
};
