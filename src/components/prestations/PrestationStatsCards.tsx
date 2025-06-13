
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, DollarSign } from "lucide-react";

interface Prestation {
  id: string;
  seniorNom: string;
  aidantNom: string;
  typePrestation: string;
  dateCreation: string;
  tarif: number;
  statut: 'en_attente' | 'en_cours' | 'terminee' | 'refusee' | 'annulee';
  evaluation?: number;
}

interface PrestationStatsCardsProps {
  prestations: Prestation[];
}

const PrestationStatsCards = ({ prestations }: PrestationStatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Calendar className="h-4 w-4 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">En attente</p>
              <p className="text-xl font-bold text-slate-800">
                {prestations.filter(p => p.statut === 'en_attente').length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">En cours</p>
              <p className="text-xl font-bold text-slate-800">
                {prestations.filter(p => p.statut === 'en_cours').length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Calendar className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Terminées</p>
              <p className="text-xl font-bold text-slate-800">
                {prestations.filter(p => p.statut === 'terminee').length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">CA mensuel</p>
              <p className="text-xl font-bold text-slate-800">
                {prestations.reduce((sum, p) => sum + p.tarif, 0).toFixed(2)}€
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrestationStatsCards;
