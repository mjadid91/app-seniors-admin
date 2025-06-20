
import { usePermissions } from "@/hooks/usePermissions";
import { useAuthStore } from "@/stores/authStore";

interface Ticket {
  statut: 'a_traiter' | 'en_cours' | 'resolu';
  assigneA?: string;
}

export const useTicketPermissions = (ticket: Ticket) => {
  const { isAdmin, isSupport } = usePermissions();
  const { user } = useAuthStore();

  const canResolve = () => {
    if (ticket.statut === 'resolu') return false;
    
    // L'admin peut toujours résoudre
    if (isAdmin()) return true;
    
    // Le support peut résoudre seulement s'il est assigné au ticket
    if (isSupport() && user) {
      const currentUserFullName = `${user.prenom} ${user.nom}`;
      return ticket.assigneA === currentUserFullName;
    }
    
    return false;
  };

  return {
    canResolve: canResolve(),
  };
};
