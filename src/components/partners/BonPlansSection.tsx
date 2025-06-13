
import { Gift, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import BonPlanCard from "./BonPlanCard";

interface BonPlan {
  id: number;
  titre: string;
  partenaire: string;
  description: string;
  reduction: string;
  dateExpiration: string;
  statut: string;
}

interface BonPlansSectionProps {
  bonsPlans: BonPlan[];
}

const BonPlansSection = ({ bonsPlans }: BonPlansSectionProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Gift className="h-6 w-6 text-purple-600" />
          <h2 className="text-xl font-semibold text-slate-800">Bons Plans Partenaires</h2>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Nouveau bon plan
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {bonsPlans.map((bonPlan) => (
          <BonPlanCard key={bonPlan.id} bonPlan={bonPlan} />
        ))}
      </div>
    </div>
  );
};

export default BonPlansSection;
