
export const getStatutBadgeColor = (statut: string) => {
  switch (statut) {
    case 'visible': return 'bg-green-100 text-green-700 border-green-200';
    case 'masque': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'archive': return 'bg-gray-100 text-gray-700 border-gray-200';
    case 'supprime': return 'bg-red-100 text-red-700 border-red-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};
