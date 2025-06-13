
import { User } from "../../stores/authStore";
import { UserStats } from "./userTypes";

export const calculateUserStats = (users: User[]): UserStats => {
  return {
    total: users.length,
    active: users.length - 1,
    inactive: 1,
    admins: users.filter(u => u.role === 'administrateur').length
  };
};

export const updateStatsAfterUserAdded = (prevStats: UserStats, newUser: User): UserStats => {
  return {
    ...prevStats,
    total: prevStats.total + 1,
    active: prevStats.active + 1,
    admins: newUser.role === 'administrateur' ? prevStats.admins + 1 : prevStats.admins
  };
};

export const updateStatsAfterUserDeleted = (prevStats: UserStats, deletedUser: User): UserStats => {
  return {
    ...prevStats,
    total: prevStats.total - 1,
    active: prevStats.active - 1,
    admins: deletedUser.role === 'administrateur' ? prevStats.admins - 1 : prevStats.admins
  };
};

export const updateStatsAfterRoleChange = (users: User[]): UserStats => {
  return {
    total: users.length,
    active: users.length - 1,
    inactive: 1,
    admins: users.filter(u => u.role === 'administrateur').length
  };
};
