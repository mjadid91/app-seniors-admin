import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { usePermissions, PERMISSIONS } from "../../hooks/usePermissions";
import { useToast } from "@/hooks/use-toast";
import { FinanceTransaction } from "@/hooks/useFinancesTransactions";

interface FinanceExportActionsProps {
  transactions: FinanceTransaction[];
}

const FinanceExportActions = ({ transactions }: FinanceExportActionsProps) => {
  const { hasPermission, isViewer } = usePermissions();
  const { toast } = useToast();

  const canExportData = hasPermission(PERMISSIONS.EXPORT_DATA);

  const handleExport = () => {
    if (!canExportData) {
      toast({
        title: "Accès refusé",
        description: "Vous n'avez pas les droits pour exporter des données.",
        variant: "destructive"
      });
      return;
    }

    const headers = ["Date", "Type", "Utilisateur", "Montant", "Commission", "Montant Net", "Statut"];
    const rows = transactions.map(transaction => {
      const montantNet = transaction.montant - (transaction.commission || 0);
      return [
        new Date(transaction.date).toLocaleDateString('fr-FR'),
        transaction.type,
        transaction.utilisateur,
        `${transaction.montant.toFixed(2)} €`,
        `${(transaction.commission || 0).toFixed(2)} €`,
        `${montantNet.toFixed(2)} €`,
        transaction.statut
      ];
    });

    const escapeCsvValue = (value: string | number | Date) =>
        `"${String(value).replace(/"/g, '""')}"`;

    const csv = [
      headers.map(escapeCsvValue).join(";"),
      ...rows.map(row => row.map(escapeCsvValue).join(";"))
    ].join("\n");

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + encodeURIComponent(csv);
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", "transactions_financieres_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export réussi",
      description: "Les transactions financières ont été exportées.",
    });
  };

  if (!canExportData) {
    return null;
  }

  return (
    <Button variant="outline" onClick={handleExport} disabled={isViewer()}>
      <Download className="h-4 w-4 mr-2" />
      Exporter
    </Button>
  );
};

export default FinanceExportActions;