
import { useState } from "react";
import { DollarSign, TrendingUp, TrendingDown, CreditCard, PieChart, BarChart3, Download, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFinancesTransactions } from "./useFinancesTransactions";

const Finances = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  // hook pour les transactions dynamiques
  const { transactions, loading, error } = useFinancesTransactions();

  // Calculs des sommes dynamiques sur la période si possible
  const revenus = transactions.reduce(
    (sum, t) => t.montant > 0 ? sum + t.montant : sum, 0
  );
  const depenses = transactions.reduce(
    (sum, t) => t.montant < 0 ? sum + Math.abs(t.montant) : sum, 0
  );
  const profit = revenus - depenses;
  const nbTransactions = transactions.length;

  // Pour la partie "Evolution mensuelle", on mocke l'affichage vide pour l'instant
  // ou préparez une séparation par mois si voulu plus tard

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-800">Gestion Financière</h1>
        <div className="flex items-center gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
            <option value="quarter">Ce trimestre</option>
            <option value="year">Cette année</option>
          </select>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Exporter rapport
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Revenus</p>
              <p className="text-2xl font-bold text-slate-800">
                {loading ? "..." : "€" + revenus.toLocaleString()}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                {/* % d'évolution : calcul dynamique à venir */}
              </div>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Dépenses</p>
              <p className="text-2xl font-bold text-slate-800">
                {loading ? "..." : "€" + depenses.toLocaleString()}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingDown className="h-4 w-4 text-red-600" />
              </div>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Bénéfices</p>
              <p className="text-2xl font-bold text-slate-800">
                {loading ? "..." : "€" + profit.toLocaleString()}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Transactions</p>
              <p className="text-2xl font-bold text-slate-800">
                {loading ? "..." : nbTransactions}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <CreditCard className="h-4 w-4 text-purple-600" />
              </div>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Evolution mensuelle */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-800">Évolution mensuelle</h3>
            <BarChart3 className="h-5 w-5 text-blue-600" />
          </div>
          <div className="space-y-4 text-slate-400 text-center py-8">
            <span>Indisponible pour l’instant</span>
          </div>
        </div>
        {/* Répartition des revenus */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-800">Répartition des revenus</h3>
            <PieChart className="h-5 w-5 text-blue-600" />
          </div>
          <div className="space-y-4 text-slate-400 text-center py-8">
            <span>Indisponible pour l’instant</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-800">Transactions récentes</h3>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Filtrer par date
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-medium text-slate-600">Type</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Utilisateur</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Montant</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Commission</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Date</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Statut</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-blue-500 font-medium">
                    Chargement des transactions...
                  </td>
                </tr>
              )}
              {error && !loading && (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-red-600 font-medium">
                    {error}
                  </td>
                </tr>
              )}
              {!loading && !error && transactions.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-slate-500">
                    Aucune transaction trouvée.
                  </td>
                </tr>
              )}
              {!loading && !error && transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-4 px-4">
                    {transaction.type}
                  </td>
                  <td className="py-4 px-4">
                    {transaction.utilisateur}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`font-semibold ${transaction.montant > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      €{Math.abs(transaction.montant).toFixed(2)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`font-medium ${transaction.commission > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      €{Math.abs(transaction.commission).toFixed(2)}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-600">
                    {transaction.date
                      ? new Date(transaction.date).toLocaleDateString('fr-FR')
                      : ""}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      transaction.statut === 'Complété'
                        ? 'bg-green-100 text-green-700'
                        : transaction.statut === 'En attente'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-blue-100 text-blue-700'
                    }`}>
                      {transaction.statut}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Finances;

