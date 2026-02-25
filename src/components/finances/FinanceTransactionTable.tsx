
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import TransactionActionsMenu from "./TransactionActionsMenu";
import { FinanceTransaction } from "@/hooks/useFinancesTransactions";

interface FinanceTransactionTableProps {
  transactions: FinanceTransaction[];
  isLoading: boolean;
  error: Error | null;
  onRefetch: () => void;
  canManageFinances: boolean;
}

const FinanceTransactionTable = ({ 
  transactions, 
  isLoading, 
  error, 
  onRefetch, 
  canManageFinances 
}: FinanceTransactionTableProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-slate-600">Chargement des transactions...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="text-center text-red-600">
            <p className="font-medium">Erreur lors du chargement des transactions</p>
            <p className="text-sm mt-1">Veuillez réessayer plus tard</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="text-center text-gray-500">
            <p className="font-medium">Aucune transaction trouvée</p>
            <p className="text-sm mt-1">Les transactions apparaîtront ici une fois créées</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          Historique des Transactions
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <div className="text-sm space-y-1">
                  <p>Calcul des commissions :</p>
                  <p>• Activité rémunérée : Commission calculée</p>
                  <p>• Commande : Commission calculée</p>
                  <p>• Service post-mortem : Commission calculée</p>
                  <p>• Don cagnotte : AUCUNE commission</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[600px] w-full">
          <div className="p-6">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-slate-50 z-10">
                <tr className="border-b border-slate-200">
                  <th className="px-4 py-3 text-left font-medium text-slate-700">Date</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-700">Type</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-700">Utilisateur</th>
                  <th className="px-4 py-3 text-right font-medium text-slate-700">Montant</th>
                  <th className="px-4 py-3 text-right font-medium text-slate-700">
                    <div className="flex items-center justify-end gap-1">
                      Commission
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-3 w-3 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="text-sm space-y-1">
                              <p>Commission calculée selon les taux définis</p>
                              <p>Les dons ne génèrent AUCUNE commission</p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-slate-700">
                    <div className="flex items-center justify-end gap-1">
                      Montant Net
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-3 w-3 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Montant après déduction de la commission</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-slate-700">Statut</th>
                  {canManageFinances && (
                    <th className="px-4 py-3 text-center font-medium text-slate-700">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transactions.map((transaction) => {
                  const montantNet = transaction.montant - (transaction.commission || 0);
                  const pourcentage = transaction.commission ? ((transaction.commission / transaction.montant) * 100).toFixed(1) : '0';
                  
                  return (
                    <tr key={transaction.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 text-slate-600">
                        {new Date(transaction.date).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          transaction.type === 'Don cagnotte' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : transaction.type === 'Activité rémunérée' 
                            ? 'bg-blue-100 text-blue-800'
                            : transaction.type === 'Commande'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {transaction.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-700 font-medium">
                        {transaction.utilisateur}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-slate-900">
                        {transaction.montant.toFixed(2)} €
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex flex-col items-end">
                          <span className={`font-medium ${
                            transaction.commission > 0 ? 'text-orange-600' : 'text-gray-400'
                          }`}>
                            {(transaction.commission || 0).toFixed(2)} €
                          </span>
                          <span className="text-xs text-gray-500">
                            {transaction.commission > 0 ? `(${pourcentage}%)` : '(0%)'}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-green-600">
                        {montantNet.toFixed(2)} €
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          transaction.statut === 'Payé' || transaction.statut === 'Validé' 
                            ? 'bg-green-100 text-green-800' 
                            : transaction.statut === 'En attente' || transaction.statut === 'En cours' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {transaction.statut}
                        </span>
                      </td>
                      {canManageFinances && (
                        <td className="px-4 py-3 text-center">
                          <TransactionActionsMenu 
                            transaction={transaction} 
                            onTransactionUpdated={onRefetch}
                          />
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default FinanceTransactionTable;
