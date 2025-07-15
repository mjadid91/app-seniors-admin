
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle } from "lucide-react";
import { useFinancesTransactions } from "@/hooks/useFinancesTransactions";
import { usePermissions, PERMISSIONS } from "@/hooks/usePermissions";
import AddTransactionModal from "./AddTransactionModal";
import CommissionManagement from "./CommissionManagement";
import CommissionSummary from "./CommissionSummary";
import FinanceHeader from "./FinanceHeader";
import FinanceTransactionTable from "./FinanceTransactionTable";

const Finances = () => {
  const { data: transactions, isLoading, error, refetch } = useFinancesTransactions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { hasPermission, canAccessPage } = usePermissions();

  // Vérifier les permissions
  const canManageFinances = hasPermission(PERMISSIONS.MANAGE_FINANCES);
  const canViewFinances = hasPermission(PERMISSIONS.VIEW_FINANCES);

  // Calculer les statistiques
  const totalTransactions = transactions?.length || 0;
  const totalAmount = transactions?.reduce((sum, t) => sum + t.montant, 0) || 0;
  const totalCommissions = transactions?.reduce((sum, t) => sum + (t.commission || 0), 0) || 0;

  if (!canAccessPage("finances")) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">Accès non autorisé</h3>
            <p className="text-slate-600">
              Vous n'avez pas l'autorisation d'accéder à cette page.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <FinanceHeader
        canManageFinances={canManageFinances}
        onAddTransaction={() => setIsModalOpen(true)}
        totalTransactions={totalTransactions}
        totalAmount={totalAmount}
        totalCommissions={totalCommissions}
      />

      {/* Résumé des commissions */}
      <CommissionSummary />

      {/* Contenu principal avec onglets */}
      <Tabs defaultValue="transactions" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-white border border-slate-200">
          <TabsTrigger 
            value="transactions"
            className="data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900"
          >
            Transactions
          </TabsTrigger>
          <TabsTrigger 
            value="commissions"
            className="data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900"
          >
            Gestion des Commissions
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="transactions" className="mt-6">
          <FinanceTransactionTable
            transactions={transactions || []}
            isLoading={isLoading}
            error={error}
            onRefetch={refetch}
            canManageFinances={canManageFinances}
          />
        </TabsContent>
        
        <TabsContent value="commissions" className="mt-6">
          <CommissionManagement />
        </TabsContent>
      </Tabs>

      {/* Modal d'ajout de transaction */}
      {canManageFinances && (
        <AddTransactionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onTransactionAdded={refetch}
        />
      )}
    </div>
  );
};

export default Finances;
