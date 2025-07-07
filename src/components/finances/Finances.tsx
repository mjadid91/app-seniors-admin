
import { useFinancesTransactions } from "@/hooks/useFinancesTransactions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import AddTransactionModal from "./AddTransactionModal";
import CommissionManagement from "./CommissionManagement";
import TransactionActionsMenu from "./TransactionActionsMenu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

const Finances = () => {
    const { data: transactions, isLoading, error, refetch } = useFinancesTransactions();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <TooltipProvider>
            <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-slate-800">Gestion Financière</h2>
                    <Button onClick={() => setIsModalOpen(true)}>
                        Ajouter une transaction
                    </Button>
                </div>

                <Tabs defaultValue="transactions" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="transactions">Transactions</TabsTrigger>
                        <TabsTrigger value="commissions">Gestion des Commissions</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="transactions" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                    Historique des Transactions
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Info className="h-4 w-4 text-gray-400" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <div className="text-sm space-y-1">
                                                <p>Calcul des commissions :</p>
                                                <p>Commission = Montant × Pourcentage</p>
                                                <p>Net = Montant - Commission</p>
                                            </div>
                                        </TooltipContent>
                                    </Tooltip>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {isLoading ? (
                                    <p>Chargement...</p>
                                ) : error ? (
                                    <p>Erreur lors du chargement.</p>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full text-sm text-left border border-slate-200">
                                            <thead className="bg-slate-100 text-slate-700">
                                            <tr>
                                                <th className="px-4 py-2">Date</th>
                                                <th className="px-4 py-2">Type</th>
                                                <th className="px-4 py-2">Utilisateur</th>
                                                <th className="px-4 py-2">Montant</th>
                                                <th className="px-4 py-2">
                                                    Commission
                                                    <Tooltip>
                                                        <TooltipTrigger>
                                                            <Info className="h-3 w-3 ml-1 inline text-gray-400" />
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Calculée selon les taux définis</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </th>
                                                <th className="px-4 py-2">
                                                    Montant Net
                                                    <Tooltip>
                                                        <TooltipTrigger>
                                                            <Info className="h-3 w-3 ml-1 inline text-gray-400" />
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Montant après déduction de la commission</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </th>
                                                <th className="px-4 py-2">Statut</th>
                                                <th className="px-4 py-2 text-center">Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {transactions?.map((t) => {
                                                const montantNet = t.montant - (t.commission || 0);
                                                const pourcentage = t.commission ? ((t.commission / t.montant) * 100).toFixed(1) : '0';
                                                
                                                return (
                                                    <tr key={t.id} className="border-t border-slate-200 hover:bg-slate-50">
                                                        <td className="px-4 py-2">{t.date}</td>
                                                        <td className="px-4 py-2">
                                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                                {t.type}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-2">{t.utilisateur}</td>
                                                        <td className="px-4 py-2 text-right font-medium">{t.montant.toFixed(2)} €</td>
                                                        <td className="px-4 py-2 text-right">
                                                            <div className="flex flex-col">
                                                                <span className="font-medium text-orange-600">{(t.commission || 0).toFixed(2)} €</span>
                                                                <span className="text-xs text-gray-500">({pourcentage}%)</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-2 text-right font-medium text-green-600">{montantNet.toFixed(2)} €</td>
                                                        <td className="px-4 py-2">
                                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                                t.statut === 'Payé' ? 'bg-green-100 text-green-800' : 
                                                                t.statut === 'En attente' ? 'bg-yellow-100 text-yellow-800' : 
                                                                'bg-gray-100 text-gray-800'
                                                            }`}>
                                                                {t.statut}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-2 text-center">
                                                            <TransactionActionsMenu 
                                                                transaction={t} 
                                                                onTransactionUpdated={refetch}
                                                            />
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                            </tbody>
                                        </table>
                                        
                                        {transactions?.length === 0 && (
                                            <div className="text-center py-8 text-gray-500">
                                                Aucune transaction trouvée
                                            </div>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                    
                    <TabsContent value="commissions">
                        <CommissionManagement />
                    </TabsContent>
                </Tabs>

                <AddTransactionModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onTransactionAdded={refetch}
                />
            </div>
        </TooltipProvider>
    );
};

export default Finances;
