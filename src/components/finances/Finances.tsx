
import { useFinancesTransactions } from "@/hooks/useFinancesTransactions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import AddTransactionModal from "./AddTransactionModal";
import CommissionManagement from "./CommissionManagement";

const Finances = () => {
    const { data: transactions, isLoading, error, refetch } = useFinancesTransactions();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
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
                            <CardTitle className="text-lg font-semibold">Historique des Transactions</CardTitle>
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
                                            <th className="px-4 py-2">Commission</th>
                                            <th className="px-4 py-2">Statut</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {transactions?.map((t) => (
                                            <tr key={t.id} className="border-t border-slate-200">
                                                <td className="px-4 py-2">{t.date}</td>
                                                <td className="px-4 py-2">{t.type}</td>
                                                <td className="px-4 py-2">{t.utilisateur}</td>
                                                <td className="px-4 py-2 text-right">{t.montant.toFixed(2)} €</td>
                                                <td className="px-4 py-2 text-right">{t.commission?.toFixed(2)} €</td>
                                                <td className="px-4 py-2">{t.statut}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
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
    );
};

export default Finances;
