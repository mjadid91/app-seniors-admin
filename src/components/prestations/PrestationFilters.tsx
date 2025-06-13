
interface PrestationFiltersProps {
  selectedStatut: string;
  onStatutChange: (statut: string) => void;
}

const PrestationFilters = ({ selectedStatut, onStatutChange }: PrestationFiltersProps) => {
  return (
    <select
      value={selectedStatut}
      onChange={(e) => onStatutChange(e.target.value)}
      className="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="tous">Tous les statuts</option>
      <option value="en_attente">En attente</option>
      <option value="en_cours">En cours</option>
      <option value="terminee">Terminée</option>
      <option value="refusee">Refusée</option>
      <option value="annulee">Annulée</option>
    </select>
  );
};

export default PrestationFilters;
