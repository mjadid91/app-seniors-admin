
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
    <div className="space-y-6">
      {/* En-tête principal */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Gestion Financière</h1>
          <p className="text-slate-600 mt-1">
            Suivi des transactions et des commissions de la plateforme
          </p>
        </div>
        {canManageFinances && (
          <Button 
            onClick={onAddTransaction}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Ajouter une transaction
          </Button>
        )}
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-600">Total Transactions</p>
              <p className="text-2xl font-bold text-slate-900">{totalTransactions}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-600">Montant Total</p>
              <p className="text-2xl font-bold text-slate-900">{totalAmount.toFixed(2)} €</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-600">Commissions</p>
              <p className="text-2xl font-bold text-slate-900">{totalCommissions.toFixed(2)} €</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceHeader;
