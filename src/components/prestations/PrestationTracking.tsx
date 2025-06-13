
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PrestationStatsCards from "./PrestationStatsCards";
import PrestationFilters from "./PrestationFilters";
import PrestationTable from "./PrestationTable";
import PrestationDetailsModal from "./PrestationDetailsModal";

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
  const [selectedPrestation, setSelectedPrestation] = useState<Prestation | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const { toast } = useToast();

  const filteredPrestations = prestations.filter(prestation => 
    selectedStatut === "tous" || prestation.statut === selectedStatut
  );

  const handleVoirPrestation = (prestation: Prestation) => {
    setSelectedPrestation(prestation);
    setIsDetailsModalOpen(true);
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

      <PrestationStatsCards prestations={prestations} />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Liste des prestations</CardTitle>
            <PrestationFilters 
              selectedStatut={selectedStatut}
              onStatutChange={setSelectedStatut}
            />
          </div>
        </CardHeader>
        <CardContent>
          <PrestationTable 
            prestations={filteredPrestations}
            onVoirPrestation={handleVoirPrestation}
          />
        </CardContent>
      </Card>

      <PrestationDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        prestation={selectedPrestation}
      />
    </div>
  );
};

export default PrestationTracking;
