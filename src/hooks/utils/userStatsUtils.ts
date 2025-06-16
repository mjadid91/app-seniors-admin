
import { User } from '../../stores/authStore';

export interface UserStats {
  total: number;
  active: number;
  inactive: number;
  admins: number;
}

export const calculateUserStats = (users: User[]): UserStats => {
  return {
    total: users.length,
    active: users.length, // Assuming all fetched users are active
    inactive: 0,
    admins: users.filter(user => user.role === 'administrateur').length
  };
};

export const updateStatsAfterUserAdded = (
  currentStats: UserStats,
  newUser: User
): UserStats => {
  return {
    total: currentStats.total + 1,
    active: currentStats.active + 1,
    inactive: currentStats.inactive,
    admins: currentStats.admins + (newUser.role === 'administrateur' ? 1 : 0)
  };
};

export const updateStatsAfterUserDeleted = (
  currentStats: UserStats,
  deletedUser: User
): UserStats => {
  return {
    total: Math.max(0, currentStats.total - 1),
    active: Math.max(0, currentStats.active - 1),
    inactive: currentStats.inactive,
    admins: Math.max(0, currentStats.admins - (deletedUser.role === 'administrateur' ? 1 : 0))
  };
};

export const updateStatsAfterRoleChange = (
  currentStats: UserStats,
  oldRole: User['role'],
  newRole: User['role']
): UserStats => {
  let admins = currentStats.admins;
  
  if (oldRole === 'administrateur') {
    admins = Math.max(0, admins - 1);
  }
  if (newRole === 'administrateur') {
    admins = admins + 1;
  }
  
  return {
    ...currentStats,
    admins
  };
};
