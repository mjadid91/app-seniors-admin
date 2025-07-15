
import { Button } from "@/components/ui/button";
import { Plus, TrendingUp, DollarSign } from "lucide-react";

interface FinanceHeaderProps {
  canManageFinances: boolean;
  onAddTransaction: () => void;
  totalTransactions: number;
  totalAmount: number;
  totalCommissions: number;
}

const FinanceHeader = ({ 
  canManageFinances, 
  onAddTransaction, 
  totalTransactions, 
  totalAmount, 
  totalCommissions 
}: FinanceHeaderProps) => {
  return (
    <div className="space-y-8">
      {/* En-tête principal */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Gestion Financière</h1>
          <p className="page-description">
            Suivi des transactions et des commissions de la plateforme
          </p>
        </div>
        {canManageFinances && (
          <Button 
            onClick={onAddTransaction}
            className="bg-primary hover:bg-primary/90 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Ajouter une transaction
          </Button>
        )}
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="dashboard-card p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Transactions</p>
              <p className="text-2xl font-bold text-gray-900">{totalTransactions}</p>
            </div>
          </div>
        </div>

        <div className="dashboard-card p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-50 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Montant Total</p>
              <p className="text-2xl font-bold text-gray-900">{totalAmount.toFixed(2)} €</p>
            </div>
          </div>
        </div>

        <div className="dashboard-card p-6">
          <div className="flex items-center">
            <div className="p-3 bg-orange-50 rounded-lg">
              <DollarSign className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Commissions</p>
              <p className="text-2xl font-bold text-gray-900">{totalCommissions.toFixed(2)} €</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceHeader;
