
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, DollarSign, Percent, Receipt } from "lucide-react";
import {FinanceTransaction} from "@/hooks/useFinancesTransactions.ts";

interface TransactionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: FinanceTransaction | null;
}

const TransactionDetailsModal = ({ isOpen, onClose, transaction }: TransactionDetailsModalProps) => {
  if (!transaction) return null;

  const montantNet = transaction.montant - (transaction.commission || 0);
  const pourcentage = transaction.commission ? ((transaction.commission / transaction.montant) * 100).toFixed(2) : '0';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Détails de la transaction
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Informations générales */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informations générales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">Type</span>
                  <p className="text-sm">{transaction.type}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Date</span>
                  <p className="text-sm">{transaction.date}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Utilisateur</span>
                  <p className="text-sm">{transaction.utilisateur}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Statut</span>
                  <Badge variant={transaction.statut === 'Payé' ? 'default' : 'secondary'}>
                    {transaction.statut}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Détails financiers */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Détails financiers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <DollarSign className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Montant total</p>
                    <p className="text-xl font-bold">{transaction.montant.toFixed(2)} €</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <Percent className="h-8 w-8 text-orange-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Commission ({pourcentage}%)</p>
                    <p className="text-xl font-bold text-orange-600">
                      {(transaction.commission || 0).toFixed(2)} €
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <Receipt className="h-8 w-8 text-green-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Montant net</p>
                    <p className="text-xl font-bold text-green-600">{montantNet.toFixed(2)} €</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDetailsModal;
