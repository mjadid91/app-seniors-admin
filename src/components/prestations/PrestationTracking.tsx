
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PrestationStatsCards from "./PrestationStatsCards";
import PrestationFilters from "./PrestationFilters";
import PrestationTable from "./PrestationTable";
import PrestationDetailsModal from "./PrestationDetailsModal";
import { useSupabasePrestations } from "../../hooks/useSupabasePrestations";

const PrestationTracking = () => {
  const { data: prestations = [], isLoading, error } = useSupabasePrestations();
  const [selectedStatut, setSelectedStatut] = useState<string>("tous");
  const [selectedPrestation, setSelectedPrestation] = useState<any | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const { toast } = useToast();

  // Filtrage par statut (à adapter quand la colonne statut existera)
  const filteredPrestations = prestations.filter(
    (prestation) =>
      selectedStatut === "tous" ||
      prestation.statut === selectedStatut
  );

  const handleVoirPrestation = (prestation: any) => {
    setSelectedPrestation(prestation);
    setIsDetailsModalOpen(true);
    toast({
      title: "Détails de la prestation",
      description: `Ouverture de la prestation ${prestation.IDPrestation} : ${prestation.Titre}`,
    });
    console.log("Voir prestation:", prestation);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24 animate-pulse">
        <span className="text-slate-600">Chargement des prestations depuis la base...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-100 border border-red-200 rounded-xl text-red-700">
        Erreur lors du chargement des prestations : {error.message}
      </div>
    );
  }

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
