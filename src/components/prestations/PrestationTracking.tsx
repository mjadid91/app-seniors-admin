import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import PrestationStatsCards from "./PrestationStatsCards";
import PrestationFilters from "./PrestationFilters";
import PrestationTable from "./PrestationTable";
import PrestationDetailsModal from "./PrestationDetailsModal";
import EditPrestationModal from "./EditPrestationModal";
import AddPrestationModal from "./AddPrestationModal";
import { useSupabasePrestations, PrestationDB } from "../../hooks/useSupabasePrestations";
import { Button } from "@/components/ui/button";
import AddDomaineModal from "./AddDomaineModal";

// ✅ Import du type pour garantir la cohérence
import type { Prestation } from "./PrestationTable";

const mapPrestationDBToUI = (db: PrestationDB): Prestation => {
  return {
    id: db.id.toString(),
    seniorNom: db.senior_nom ?? "N/A",
    aidantNom: db.aidant_nom ?? "N/A",
    typePrestation: db.type_prestation ?? "Sans titre",
    dateCreation: db.date_creation ?? "",
    tarif: typeof db.tarif === "number" ? db.tarif : 0,
    statut: db.statut ?? "disponible",
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
  const [prestationToDelete, setPrestationToDelete] = useState<Prestation | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const { toast } = useToast();

  const mappedPrestations: Prestation[] = prestations.map(mapPrestationDBToUI);

  const filteredPrestations =
      selectedStatut === "tous"
          ? mappedPrestations
          : mappedPrestations.filter((prestation) => prestation.statut === selectedStatut);

  const handleVoirPrestation = (prestation: Prestation) => {
    setSelectedPrestation(prestation);
    setIsDetailsModalOpen(true);
  };

  const handleEditPrestation = (prestation: Prestation) => {
    setSelectedPrestation(prestation);
    setIsEditModalOpen(true);
  };

  const handleDeletePrestation = (prestation: Prestation) => {
    setPrestationToDelete(prestation);
    setIsDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!prestationToDelete) return;

    try {
      // Suppression en cascade manuelle
      await supabase.from("Evaluation").delete().eq("IDMiseEnRelation", parseInt(prestationToDelete.id));
      await supabase.from("MiseEnRelation_Prestation").delete().eq("IDPrestation", parseInt(prestationToDelete.id));
      await supabase.from("MiseEnRelation").delete().eq("IDPrestation", parseInt(prestationToDelete.id));

      const { error: prestationError } = await supabase
          .from("Prestation")
          .delete()
          .eq("IDPrestation", parseInt(prestationToDelete.id));

      if (prestationError) throw prestationError;

      toast({
        title: "Prestation supprimée",
        description: `La prestation "${prestationToDelete.typePrestation}" a été supprimée.`,
      });

      refetch();

    } catch (err) {
      // ✅ CORRECTION 1 : Typage de l'erreur du catch
      const error = err as Error;
      console.error("Erreur lors de la suppression:", error.message);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la prestation.",
        variant: "destructive",
      });
    } finally {
      setIsDeleteConfirmOpen(false);
      setPrestationToDelete(null);
    }
  };

  const handleEditSuccess = () => {
    refetch();
    toast({ title: "Succès", description: "Prestation modifiée." });
  };

  const handleStatutChange = (statut: string) => {
    const allowedStatuts = ["en_attente", "en_cours", "terminee", "refusee", "annulee", "disponible", "tous"] as const;
    if ((allowedStatuts as readonly string[]).includes(statut)) {
      setSelectedStatut(statut as Prestation["statut"] | "tous");
    } else {
      setSelectedStatut("tous");
    }
  };

  if (isLoading) return <div className="flex items-center justify-center py-24 animate-pulse">Chargement...</div>;

  return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">Suivi des prestations</h2>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setIsAddModalOpen(true)} className="bg-blue-600">Ajouter prestation</Button>
            <Button onClick={() => setIsAddDomaineModalOpen(true)} className="bg-gray-600">Ajouter domaine</Button>
          </div>
        </div>

        {/* ✅ CORRECTION 2 : Plus besoin de "as any" ici */}
        <PrestationStatsCards prestations={mappedPrestations} />

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Liste des prestations</CardTitle>
              <PrestationFilters selectedStatut={selectedStatut} onStatutChange={handleStatutChange} />
            </div>
          </CardHeader>
          <CardContent>
            <PrestationTable
                prestations={filteredPrestations}
                onVoirPrestation={handleVoirPrestation}
                onEditPrestation={handleEditPrestation}
                onDeletePrestation={handleDeletePrestation}
            />
          </CardContent>
        </Card>

        {/* ✅ CORRECTION 3 : Plus besoin de "as any" ici */}
        <PrestationDetailsModal
            isOpen={isDetailsModalOpen}
            onClose={() => setIsDetailsModalOpen(false)}
            prestation={selectedPrestation}
        />

        {/* ✅ CORRECTION 4 : Plus besoin de "as any" ici */}
        <EditPrestationModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            prestation={selectedPrestation}
            onSuccess={handleEditSuccess}
        />

        <AddPrestationModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSuccess={() => { setIsAddModalOpen(false); refetch(); }} />
        <AddDomaineModal isOpen={isAddDomaineModalOpen} onClose={() => setIsAddDomaineModalOpen(false)} onSuccess={() => { setIsAddDomaineModalOpen(false); refetch(); }} />

        <AlertDialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
              <AlertDialogDescription>
                Êtes-vous sûr de vouloir supprimer "{prestationToDelete?.typePrestation}" ?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmDelete} className="bg-red-600">Supprimer</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
  );
};

export default PrestationTracking;