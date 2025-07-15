
import { User } from "../../stores/authStore";
import { UserStats } from "./userTypes";

// Calcul des statistiques basé sur le statut EstDesactive
export const calculateUserStats = (users: User[]): UserStats => {
  return {
    total: users.length,
    active: users.filter(u => !u.EstDesactive).length,
    inactive: users.filter(u => u.EstDesactive).length,
    admins: users.filter(u => u.role === 'administrateur').length
  };
};

export const updateStatsAfterUserAdded = (prevStats: UserStats, newUser: User): UserStats => {
  const isActive = !newUser.EstDesactive;
  return {
    ...prevStats,
    total: prevStats.total + 1,
    active: isActive ? prevStats.active + 1 : prevStats.active,
    inactive: isActive ? prevStats.inactive : prevStats.inactive + 1,
    admins: newUser.role === 'administrateur' ? prevStats.admins + 1 : prevStats.admins
  };
};

export const updateStatsAfterUserDeleted = (prevStats: UserStats, deletedUser: User): UserStats => {
  const wasActive = !deletedUser.EstDesactive;
  return {
    ...prevStats,
    total: prevStats.total - 1,
    active: wasActive ? prevStats.active - 1 : prevStats.active,
    inactive: wasActive ? prevStats.inactive : prevStats.inactive - 1,
    admins: deletedUser.role === 'administrateur' ? prevStats.admins - 1 : prevStats.admins
  };
};

export const updateStatsAfterRoleChange = (users: User[]): UserStats => {
  return calculateUserStats(users);
};
