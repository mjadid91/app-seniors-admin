
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Percent, Calculator, Euro } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface CommissionRate {
  TypeTransaction: string;
  Pourcentage: number;
}

const CommissionSummary = () => {
  const [commissionRates, setCommissionRates] = useState<CommissionRate[]>([]);
  const [totalCommissions, setTotalCommissions] = useState<number>(0);
  const [totalCommissionAmount, setTotalCommissionAmount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchCommissionRates(), fetchTotalCommissions(), fetchTotalCommissionAmount()]);
  }, []);

  const fetchCommissionRates = async () => {
    try {
      const { data, error } = await supabase
        .from("ParametresCommission")
        .select("*")
        .order("TypeTransaction");

      if (error) throw error;
      setCommissionRates(data || []);
    } catch (error) {
      console.error("Erreur lors du chargement des taux de commission:", error);
    }
  };

  const fetchTotalCommissions = async () => {
    try {
      const { count, error } = await supabase
        .from("VersementCommissions")
        .select("*", { count: "exact", head: true });

      if (error) throw error;
      setTotalCommissions(count || 0);
    } catch (error) {
      console.error("Erreur lors du chargement du nombre total de commissions:", error);
    }
  };

  const fetchTotalCommissionAmount = async () => {
    try {
      const { data, error } = await supabase
        .from("VersementCommissions")
        .select("MontantCommission");

      if (error) throw error;
      
      const total = data?.reduce((sum, commission) => sum + (commission.MontantCommission || 0), 0) || 0;
      setTotalCommissionAmount(total);
    } catch (error) {
      console.error("Erreur lors du chargement du montant total des commissions:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalCommissionRate = commissionRates.reduce((sum, rate) => sum + rate.Pourcentage, 0);

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'Activite':
        return 'Activité rémunérée';
      case 'Commande':
        return 'Commande';
      case 'PostMortem':
        return 'Service post-mortem';
      default:
        return type;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'Activite':
        return 'bg-blue-100 text-blue-800';
      case 'Commande':
        return 'bg-green-100 text-green-800';
      case 'PostMortem':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="p-4">Chargement du résumé des commissions...</div>;
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Percent className="h-5 w-5" />
          Résumé des Taux de Commission
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-gray-700">Taux par type de transaction</h4>
            <div className="space-y-2">
              {commissionRates.map((rate) => (
                <div key={rate.TypeTransaction} className="flex items-center justify-between">
                  <Badge className={getTypeBadgeColor(rate.TypeTransaction)}>
                    {getTypeLabel(rate.TypeTransaction)}
                  </Badge>
                  <span className="font-medium">{rate.Pourcentage}%</span>
                </div>
              ))}
              {commissionRates.length === 0 && (
                <p className="text-gray-500 text-sm">Aucun taux de commission configuré</p>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-gray-700">Taux total de commission</h4>
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total cumulé</span>
                <span className="text-2xl font-bold text-blue-600">{totalCommissionRate.toFixed(1)}%</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Somme des pourcentages appliqués sur les transactions éligibles
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-sm text-gray-700 flex items-center gap-1">
              <Calculator className="h-4 w-4" />
              Nombre de commissions
            </h4>
            <div className="bg-orange-50 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Commissions versées</span>
                <span className="text-2xl font-bold text-orange-600">{totalCommissions}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Nombre total de versements effectués
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-sm text-gray-700 flex items-center gap-1">
              <Euro className="h-4 w-4" />
              Montant total versé
            </h4>
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total versé</span>
                <span className="text-2xl font-bold text-green-600">{totalCommissionAmount.toFixed(2)}€</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Montant total des commissions versées
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommissionSummary;
