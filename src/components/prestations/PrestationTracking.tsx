
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PrestationStatsCards from "./PrestationStatsCards";
import PrestationFilters from "./PrestationFilters";
import PrestationTable from "./PrestationTable";
import PrestationDetailsModal from "./PrestationDetailsModal";
import EditPrestationModal from "./EditPrestationModal";
import AddPrestationModal from "./AddPrestationModal";
import { useSupabasePrestations, PrestationDB } from "../../hooks/useSupabasePrestations";
import { Button } from "@/components/ui/button";
import AddDomaineModal from "./AddDomaineModal";

// Import type pour type safety
import type { Prestation as PrestationTableType } from "./PrestationTable";

// Use the same type everywhere in this component
type Prestation = PrestationTableType;

const mapPrestationDBToUI = (db: PrestationDB): Prestation => {
  console.log("Mapping prestation DB to UI:", db);

  return {
    id: db.id.toString(), // Convert number to string for UI
    seniorNom: db.senior_nom ?? "N/A",
    aidantNom: db.aidant_nom ?? "N/A",
    typePrestation: db.type_prestation ?? "Sans titre",
    dateCreation: db.date_creation ?? "",
    tarif: typeof db.tarif === "number" ? db.tarif : 0,
    statut: db.statut ?? "en_attente",
    evaluation: db.evaluation ? Number(db.evaluation) : undefined,
    domaineNom: db.domaine_titre || undefined,

  };
};

const PrestationTracking = () => {
  const { data: prestations = [], isLoading, error, refetch } = useSupabasePrestations();
  const [selectedStatut, setSelectedStatut] = useState<Prestation["statut"] | "tous">("tous");
  const [selectedPrestation, setSelectedPrestation] = useState<Prestation | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddDomaineModalOpen, setIsAddDomaineModalOpen] = useState(false);

  const { toast } = useToast();

  // Map DB data to UI data (ensures compatibility)
  const mappedPrestations: Prestation[] = prestations.map(mapPrestationDBToUI);

  // Statut filtering
  const filteredPrestations =
      selectedStatut === "tous"
          ? mappedPrestations
          : mappedPrestations.filter((prestation) => prestation.statut === selectedStatut);

  const handleVoirPrestation = (prestation: Prestation) => {
    console.log("Voir prestation:", prestation);
    setSelectedPrestation(prestation);
    setIsDetailsModalOpen(true);
    toast({
      title: "Détails de la prestation",
      description: `Ouverture de la prestation ${prestation.id} : ${prestation.typePrestation}`,
    });
  };

  const handleEditPrestation = (prestation: Prestation) => {
    console.log("Modifier prestation:", prestation);
    setSelectedPrestation(prestation);
    setIsEditModalOpen(true);
    toast({
      title: "Modification de la prestation",
      description: `Modification de la prestation ${prestation.id} : ${prestation.typePrestation}`,
    });
  };

  const handleEditSuccess = () => {
    refetch(); // Recharger les données après modification
    toast({
      title: "Succès",
      description: "La prestation a été modifiée avec succès",
    });
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
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">Suivi des prestations</h2>
            <p className="text-slate-600 mt-1">
              Supervision des prestations entre seniors et aidants
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Calendar className="h-4 w-4" />
              <span>Total : {filteredPrestations.length} prestations</span>
            </div>

            <div className="flex gap-2">
              <Button
                  onClick={() => setIsAddModalOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Ajouter une prestation
              </Button>
              <Button
                  onClick={() => setIsAddDomaineModalOpen(true)}
                  className="bg-gray-600 hover:bg-gray-700 text-white"
              >
                Ajouter un domaine
              </Button>
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <PrestationStatsCards prestations={mappedPrestations} />

        {/* Tableau */}
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
                onEditPrestation={handleEditPrestation}
            />
          </CardContent>
        </Card>

        {/* Modals */}
        <PrestationDetailsModal
            isOpen={isDetailsModalOpen}
            onClose={() => setIsDetailsModalOpen(false)}
            prestation={selectedPrestation}
        />

        <EditPrestationModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            prestation={selectedPrestation}
            onSuccess={handleEditSuccess}
        />

        <AddPrestationModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onSuccess={() => {
              setIsAddModalOpen(false);
              refetch();
            }}
        />

        <AddDomaineModal
            isOpen={isAddDomaineModalOpen}
            onClose={() => setIsAddDomaineModalOpen(false)}
            onSuccess={() => {
              setIsAddDomaineModalOpen(false);
              refetch();
            }}
        />
      </div>
  );
};

export default PrestationTracking;
