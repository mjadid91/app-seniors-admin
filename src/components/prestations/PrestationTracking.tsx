import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Calendar, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

const mockPrestations: Prestation[] = [
  {
    id: 'P001',
    seniorNom: 'Marie Dupont',
    aidantNom: 'Jean Martin',
    typePrestation: 'Aide à domicile',
    dateCreation: '2024-06-10',
    tarif: 25.50,
    statut: 'en_cours',
    evaluation: 4.5
  },
  {
    id: 'P002',
    seniorNom: 'Pierre Bernard',
    aidantNom: 'Sophie Dubois',
    typePrestation: 'Accompagnement médical',
    dateCreation: '2024-06-08',
    tarif: 35.00,
    statut: 'terminee',
    evaluation: 5.0
  },
  {
    id: 'P003',
    seniorNom: 'Claire Moreau',
    aidantNom: 'Luc Petit',
    typePrestation: 'Courses et livraisons',
    dateCreation: '2024-06-12',
    tarif: 20.00,
    statut: 'en_attente'
  }
];

const PrestationTracking = () => {
  const [prestations] = useState<Prestation[]>(mockPrestations);
  const [selectedStatut, setSelectedStatut] = useState<string>("tous");
  const { toast } = useToast();

  const filteredPrestations = prestations.filter(prestation => 
    selectedStatut === "tous" || prestation.statut === selectedStatut
  );

  const getStatutBadgeColor = (statut: string) => {
    switch (statut) {
      case 'en_attente': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'en_cours': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'terminee': return 'bg-green-100 text-green-700 border-green-200';
      case 'refusee': return 'bg-red-100 text-red-700 border-red-200';
      case 'annulee': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatutLabel = (statut: string) => {
    switch (statut) {
      case 'en_attente': return 'En attente';
      case 'en_cours': return 'En cours';
      case 'terminee': return 'Terminée';
      case 'refusee': return 'Refusée';
      case 'annulee': return 'Annulée';
      default: return statut;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  const handleVoirPrestation = (prestation: Prestation) => {
    toast({
      title: "Détails de la prestation",
      description: `Ouverture de la prestation ${prestation.id} : ${prestation.typePrestation}`,
    });
    console.log("Voir prestation:", prestation);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Suivi des prestations</h2>
          <p className="text-slate-600 mt-1">Supervision des prestations entre seniors et aidants</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Calendar className="h-4 w-4" />
            Total: {filteredPrestations.length} prestations
          </div>
        </div>
      </div>

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

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Liste des prestations</CardTitle>
            <select
              value={selectedStatut}
              onChange={(e) => setSelectedStatut(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="tous">Tous les statuts</option>
              <option value="en_attente">En attente</option>
              <option value="en_cours">En cours</option>
              <option value="terminee">Terminée</option>
              <option value="refusee">Refusée</option>
              <option value="annulee">Annulée</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-medium text-slate-700">ID</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Senior</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Aidant</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Tarif</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Statut</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Évaluation</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPrestations.map((prestation) => (
                  <tr key={prestation.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-4 font-mono text-sm text-slate-600">{prestation.id}</td>
                    <td className="py-4 px-4">
                      <p className="font-medium text-slate-800">{prestation.seniorNom}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-medium text-slate-800">{prestation.aidantNom}</p>
                    </td>
                    <td className="py-4 px-4 text-slate-600">{prestation.typePrestation}</td>
                    <td className="py-4 px-4 text-slate-600">
                      {new Date(prestation.dateCreation).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="py-4 px-4 font-medium text-slate-800">{prestation.tarif.toFixed(2)}€</td>
                    <td className="py-4 px-4">
                      <Badge className={getStatutBadgeColor(prestation.statut)}>
                        {getStatutLabel(prestation.statut)}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      {prestation.evaluation ? (
                        <div className="flex items-center gap-1">
                          {renderStars(prestation.evaluation)}
                          <span className="text-sm text-slate-600 ml-1">{prestation.evaluation}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-slate-400">Non évaluée</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleVoirPrestation(prestation)}
                        title="Voir détails"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrestationTracking;
