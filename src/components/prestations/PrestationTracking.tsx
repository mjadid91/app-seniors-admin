
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PrestationStatsCards from "./PrestationStatsCards";
import PrestationFilters from "./PrestationFilters";
import PrestationTable from "./PrestationTable";
import PrestationDetailsModal from "./PrestationDetailsModal";
import { useSupabasePrestations, PrestationDB } from "../../hooks/useSupabasePrestations";

// Import the Prestation type for consistency
import type { Prestation as PrestationTableType } from "./PrestationTable";

// Use the same type everywhere in this component
type Prestation = PrestationTableType;

const mapPrestationDBToUI = (db: PrestationDB): Prestation => ({
  id: db.IDPrestation?.toString() ?? "",
  seniorNom: "N/A", // No senior info in current `Prestation` table
  aidantNom: "N/A",  // No aidant info in current `Prestation` table
  typePrestation: db.Titre ?? "Sans titre",
  dateCreation: "", // No date in current DB
  tarif: typeof db.TarifIndicatif === "number" ? db.TarifIndicatif : 0,
  statut: "en_attente", // fallback to a legal value for the UI props
  evaluation: undefined,
  ...db // copy all DB fields (useful for modal/details)
});

const PrestationTracking = () => {
  const { data: prestations = [], isLoading, error } = useSupabasePrestations();
  const [selectedStatut, setSelectedStatut] = useState<Prestation["statut"] | "tous">("tous");
  const [selectedPrestation, setSelectedPrestation] = useState<Prestation | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const { toast } = useToast();

  // Map DB data to UI data (ensures compatibility)
  const mappedPrestations: Prestation[] = prestations.map(mapPrestationDBToUI);

  // Statut filtering
  const filteredPrestations =
    selectedStatut === "tous"
      ? mappedPrestations
      : mappedPrestations.filter((prestation) => prestation.statut === selectedStatut);

  const handleVoirPrestation = (prestation: Prestation) => {
    setSelectedPrestation(prestation);
    setIsDetailsModalOpen(true);
    toast({
      title: "Détails de la prestation",
      description: `Ouverture de la prestation ${prestation.id} : ${prestation.typePrestation}`,
    });
    console.log("Voir prestation:", prestation);
  };

  // *** FIX: add type-safe wrapper for setSelectedStatut ***
  const handleStatutChange = (statut: string) => {
    // Only allow the union types (type safety for assignment)
    const allowedStatuts = [
      "en_attente",
      "en_cours",
      "terminee",
      "refusee",
      "annulee",
      "tous"
    ] as const;
    if ((allowedStatuts as readonly string[]).includes(statut)) {
      setSelectedStatut(statut as Prestation["statut"] | "tous");
    } else {
      // fallback: don't update, or you could default to 'tous'
      setSelectedStatut("tous");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24 animate-pulse">
        <span className="text-slate-600">
          Chargement des prestations depuis la base...
        </span>
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
          <h2 className="text-3xl font-bold text-slate-800">
            Suivi des prestations
          </h2>
          <p className="text-slate-600 mt-1">
            Supervision des prestations entre seniors et aidants
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Calendar className="h-4 w-4" />
            Total: {filteredPrestations.length} prestations
          </div>
        </div>
      </div>

      <PrestationStatsCards prestations={mappedPrestations} />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Liste des prestations</CardTitle>
            <PrestationFilters
              selectedStatut={selectedStatut}
              onStatutChange={handleStatutChange}
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

