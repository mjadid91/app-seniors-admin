
import { useState } from "react";
import { Gift, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import BonPlanCard from "./BonPlanCard";
import AddBonPlanModal from "./AddBonPlanModal";
import ViewBonPlanModal from "./ViewBonPlanModal";
import EditBonPlanModal from "./EditBonPlanModal";
import DeleteBonPlanModal from "./DeleteBonPlanModal";

interface BonPlan {
  id: number;
  titre: string;
  partenaire: string;
  description: string;
  typeReduction: string;
  pourcentageReduction: number;
  dateDebutReduction: string;
  dateFinReduction: string;
  codePromo: string;
  statut: string;
}

interface BonPlansSectionProps {
  bonsPlans: BonPlan[];
  onAddBonPlan: (bonPlan: Omit<BonPlan, 'id'>) => void;
  onEditBonPlan: (bonPlan: BonPlan) => void;
  onDeleteBonPlan: (id: number) => void;
  partenaires: { id: number; name: string }[];
}

const BonPlansSection = ({ 
  bonsPlans, 
  onAddBonPlan, 
  onEditBonPlan, 
  onDeleteBonPlan,
  partenaires 
}: BonPlansSectionProps) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBonPlan, setSelectedBonPlan] = useState<BonPlan | null>(null);

  const handleView = (bonPlan: BonPlan) => {
    console.log("Voir bon plan:", bonPlan);
    setSelectedBonPlan(bonPlan);
    setIsViewModalOpen(true);
  };

  const handleEdit = (bonPlan: BonPlan) => {
    console.log("Modifier bon plan:", bonPlan);
    setSelectedBonPlan(bonPlan);
    setIsEditModalOpen(true);
  };

  const handleDelete = (bonPlan: BonPlan) => {
    console.log("Supprimer bon plan:", bonPlan);
    setSelectedBonPlan(bonPlan);
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Gift className="h-6 w-6 text-purple-600" />
            <h2 className="text-xl font-semibold text-slate-800">Bons Plans Partenaires</h2>
          </div>
          <Button 
            className="bg-purple-600 hover:bg-purple-700"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Nouveau bon plan
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {bonsPlans.map((bonPlan) => (
            <BonPlanCard 
              key={bonPlan.id} 
              bonPlan={bonPlan}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {bonsPlans.length === 0 && (
          <div className="text-center py-12">
            <Gift className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-600 mb-2">Aucun bon plan</h3>
            <p className="text-slate-500 mb-4">Commencez par créer votre premier bon plan partenaire.</p>
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => setIsAddModalOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Créer un bon plan
            </Button>
          </div>
        )}
      </div>

      <AddBonPlanModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddBonPlan={onAddBonPlan}
        partenaires={partenaires}
      />

      <ViewBonPlanModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        bonPlan={selectedBonPlan}
      />

      <EditBonPlanModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        bonPlan={selectedBonPlan}
        onEditBonPlan={onEditBonPlan}
        partenaires={partenaires}
      />

      <DeleteBonPlanModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        bonPlan={selectedBonPlan}
        onDeleteBonPlan={onDeleteBonPlan}
      />
    </>
  );
};

export default BonPlansSection;
