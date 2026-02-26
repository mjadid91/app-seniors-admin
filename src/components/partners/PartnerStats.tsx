
// Use the same Partner interface as other components for consistency
interface Partner {
  id: number;
  nom: string; // Renommé pour cohérence
  type: string;
  email: string;
  telephone: string; // Renommé pour cohérence
  adresse: string; // Renommé pour cohérence
  statut: string;
  evaluation: number; // Renommé pour cohérence
  services: string[];
  dateInscription: string; // Renommé pour cohérence
  // Champs système cohérents
  dateCreation?: string;
  dateMiseAJour?: string;
  creePar?: string;
}

interface PartnerStatsProps {
  partners: Partner[];
}

const PartnerStats = ({ partners }: PartnerStatsProps) => {
  const activePartners = partners.filter(p => p.statut === 'Actif').length;
  const pendingPartners = partners.filter(p => p.statut === 'En attente').length;
  const newPartnersThisMonth = partners.filter(p => 
    new Date(p.dateInscription) > new Date('2024-01-01')
  ).length;
  const averageRating = partners.length > 0 
    ? (partners.reduce((acc, p) => acc + p.evaluation, 0) / partners.length).toFixed(1)
    : '0.0';

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-800 mb-2">Total partenaires</h3>
        <p className="text-3xl font-bold text-blue-600">{partners.length}</p>
        <p className="text-sm text-slate-500">+{newPartnersThisMonth} ce mois</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-800 mb-2">Partenaires actifs</h3>
        <p className="text-3xl font-bold text-green-600">{activePartners}</p>
        <p className="text-sm text-slate-500">
          {partners.length > 0 ? Math.round((activePartners / partners.length) * 100) : 0}% du total
        </p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-800 mb-2">En attente</h3>
        <p className="text-3xl font-bold text-yellow-600">{pendingPartners}</p>
        <p className="text-sm text-slate-500">À valider</p>
      </div>
    </div>
  );
};

export default PartnerStats;
