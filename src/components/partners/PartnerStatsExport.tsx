
import { Button } from "@/components/ui/button";
import { Download, FileSpreadsheet } from "lucide-react";
import { Partner, BonPlan } from "./types";
import { useToast } from "@/hooks/use-toast";

interface PartnerStatsExportProps {
  partners: Partner[];
  bonsPlans: BonPlan[];
}

const PartnerStatsExport = ({ partners, bonsPlans }: PartnerStatsExportProps) => {
  const { toast } = useToast();

  const generateStatsData = () => {
    return partners.map(partner => {
      const partnerBonsPlans = bonsPlans.filter(bp => bp.idPartenaire === partner.id);
      const activeBonsPlans = partnerBonsPlans.filter(bp => bp.statut === 'actif');
      const usedBonsPlans = partnerBonsPlans.filter(bp => bp.statut === 'utilisé');
      
      return {
        'Nom du partenaire': partner.raisonSociale,
        'Email': partner.email,
        'Téléphone': partner.telephone,
        'Date d\'inscription': new Date(partner.dateInscription).toLocaleDateString('fr-FR'),
        'Nombre total de bons plans': partnerBonsPlans.length,
        'Bons plans actifs': activeBonsPlans.length,
        'Bons plans utilisés': usedBonsPlans.length,
        'Taux d\'utilisation': partnerBonsPlans.length > 0 
          ? `${Math.round((usedBonsPlans.length / partnerBonsPlans.length) * 100)}%` 
          : '0%'
      };
    });
  };

  const exportToCSV = () => {
    try {
      const data = generateStatsData();
      
      if (data.length === 0) {
        toast({
          title: "Aucune donnée",
          description: "Aucune statistique à exporter.",
          variant: "destructive",
        });
        return;
      }

      // Créer le header CSV
      const headers = Object.keys(data[0]);
      const csvContent = [
        headers.join(','),
        ...data.map(row => 
          headers.map(header => `"${row[header as keyof typeof row]}"`).join(',')
        )
      ].join('\n');

      // Créer et télécharger le fichier
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `statistiques-partenaires-${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast({
          title: "Export réussi",
          description: "Les statistiques ont été exportées avec succès.",
        });
      }
    } catch (error) {
      console.error('Erreur lors de l\'export:', error);
      toast({
        title: "Erreur d'export",
        description: "Impossible d'exporter les statistiques.",
        variant: "destructive",
      });
    }
  };

  const exportToJSON = () => {
    try {
      const data = generateStatsData();
      
      if (data.length === 0) {
        toast({
          title: "Aucune donnée",
          description: "Aucune statistique à exporter.",
          variant: "destructive",
        });
        return;
      }

      const jsonContent = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const link = document.createElement('a');
      
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `statistiques-partenaires-${new Date().toISOString().split('T')[0]}.json`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast({
          title: "Export réussi",
          description: "Les statistiques ont été exportées avec succès.",
        });
      }
    } catch (error) {
      console.error('Erreur lors de l\'export:', error);
      toast({
        title: "Erreur d'export",
        description: "Impossible d'exporter les statistiques.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Export des statistiques</h3>
          <p className="text-sm text-slate-600">
            Exportez les données de performance des partenaires
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={exportToCSV} variant="outline" size="sm">
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            CSV
          </Button>
          <Button onClick={exportToJSON} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            JSON
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="font-medium text-blue-800">Total partenaires</div>
          <div className="text-2xl font-bold text-blue-600">{partners.length}</div>
        </div>
        
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="font-medium text-green-800">Bons plans actifs</div>
          <div className="text-2xl font-bold text-green-600">
            {bonsPlans.filter(bp => bp.statut === 'actif').length}
          </div>
        </div>
        
        <div className="bg-purple-50 p-3 rounded-lg">
          <div className="font-medium text-purple-800">Bons plans utilisés</div>
          <div className="text-2xl font-bold text-purple-600">
            {bonsPlans.filter(bp => bp.statut === 'utilisé').length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerStatsExport;
