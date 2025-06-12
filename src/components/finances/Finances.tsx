
import { useState } from "react";
import { DollarSign, TrendingUp, TrendingDown, CreditCard, PieChart, BarChart3, Download, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const Finances = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  const financialData = {
    revenue: {
      current: 45620,
      previous: 42150,
      change: 8.2
    },
    expenses: {
      current: 28940,
      previous: 31200,
      change: -7.2
    },
    profit: {
      current: 16680,
      previous: 10950,
      change: 52.3
    },
    transactions: 1247
  };

  const recentTransactions = [
    {
      id: 1,
      type: "Paiement prestation",
      user: "Marie Dubois",
      amount: 85.50,
      date: "2024-01-15",
      status: "Complété",
      commission: 8.55
    },
    {
      id: 2,
      type: "Abonnement premium",
      user: "Jean Martin",
      amount: 29.99,
      date: "2024-01-15",
      status: "Complété",
      commission: 29.99
    },
    {
      id: 3,
      type: "Paiement prestation",
      user: "Sophie Laurent",
      amount: 120.00,
      date: "2024-01-14",
      status: "En attente",
      commission: 12.00
    },
    {
      id: 4,
      type: "Remboursement",
      user: "Pierre Durand",
      amount: -65.00,
      date: "2024-01-14",
      status: "Traité",
      commission: -6.50
    }
  ];

  const monthlyData = [
    { month: "Jan", revenue: 42150, expenses: 31200 },
    { month: "Fév", revenue: 38920, expenses: 29800 },
    { month: "Mar", revenue: 45620, expenses: 28940 },
    { month: "Avr", revenue: 48200, expenses: 32100 },
    { month: "Mai", revenue: 52300, expenses: 30500 },
    { month: "Jun", revenue: 49800, expenses: 31200 }
  ];

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
                €{financialData.revenue.current.toLocaleString()}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-green-600 text-sm font-medium">
                  +{financialData.revenue.change}%
                </span>
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
                €{financialData.expenses.current.toLocaleString()}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingDown className="h-4 w-4 text-green-600" />
                <span className="text-green-600 text-sm font-medium">
                  {financialData.expenses.change}%
                </span>
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
                €{financialData.profit.current.toLocaleString()}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span className="text-blue-600 text-sm font-medium">
                  +{financialData.profit.change}%
                </span>
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
                {financialData.transactions}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <CreditCard className="h-4 w-4 text-purple-600" />
                <span className="text-purple-600 text-sm font-medium">
                  Ce mois
                </span>
              </div>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-800">Évolution mensuelle</h3>
            <BarChart3 className="h-5 w-5 text-blue-600" />
          </div>
          <div className="space-y-4">
            {monthlyData.slice(-6).map((data, index) => (
              <div key={data.month} className="flex items-center justify-between">
                <span className="text-slate-600 font-medium">{data.month}</span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-slate-600">€{data.revenue.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-slate-600">€{data.expenses.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-800">Répartition des revenus</h3>
            <PieChart className="h-5 w-5 text-blue-600" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="text-slate-600">Commissions prestations</span>
              </div>
              <span className="font-semibold">65%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-slate-600">Abonnements premium</span>
              </div>
              <span className="font-semibold">25%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-purple-500 rounded"></div>
                <span className="text-slate-600">Services additionnels</span>
              </div>
              <span className="font-semibold">8%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span className="text-slate-600">Partenariats</span>
              </div>
              <span className="font-semibold">2%</span>
            </div>
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
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-slate-800">{transaction.type}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-600">{transaction.user}</td>
                  <td className="py-4 px-4">
                    <span className={`font-semibold ${
                      transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      €{Math.abs(transaction.amount).toFixed(2)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`font-medium ${
                      transaction.commission > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      €{Math.abs(transaction.commission).toFixed(2)}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-600">
                    {new Date(transaction.date).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      transaction.status === 'Complété' 
                        ? 'bg-green-100 text-green-700'
                        : transaction.status === 'En attente'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {transaction.status}
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
