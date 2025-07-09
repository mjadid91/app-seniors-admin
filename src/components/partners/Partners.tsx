
import { useState } from "react";
import PartnersListSection from "./PartnersListSection";
import BonPlansSection from "./BonPlansSection";
import PartnerStats from "./PartnerStats";
import PartnerStatsExport from "./PartnerStatsExport";
import EditPartnerModal from "./EditPartnerModal";
import DeletePartnerModal from "./DeletePartnerModal";
import { usePartners } from "./usePartners";
import { Partner } from "./types";

const Partners = () => {
  const {
    partners,
    bonsPlans,
    handleAddPartner,
    handleContactPartner,
    handleAddBonPlan,
    handleEditBonPlan,
    handleDeleteBonPlan,
    getPartenairesForSelect
  } = usePartners();

  const [isEditPartnerModalOpen, setIsEditPartnerModalOpen] = useState(false);
  const [isDeletePartnerModalOpen, setIsDeletePartnerModalOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  const handleEditPartner = (partner: Partner) => {
    console.log("Modifier partenaire:", partner);
    setSelectedPartner(partner);
    setIsEditPartnerModalOpen(true);
  };

  const handleDeletePartner = (partner: Partner) => {
    console.log("Supprimer partenaire:", partner);
    setSelectedPartner(partner);
    setIsDeletePartnerModalOpen(true);
  };

  const handleUpdatePartner = (updatedPartner: Partner) => {
    // Ici vous devriez appeler votre API pour mettre à jour le partenaire
    console.log("Mise à jour du partenaire:", updatedPartner);
  };

  const handleConfirmDeletePartner = (partnerId: number) => {
    // Ici vous devriez appeler votre API pour supprimer le partenaire et ses dépendances
    console.log("Suppression du partenaire:", partnerId);
  };

  return (
    <div className="space-y-6">
      <PartnerStats partners={partners} />

      <PartnerStatsExport 
        partners={partners} 
        bonsPlans={bonsPlans} 
      />

      <PartnersListSection
        partners={partners}
        onAddPartner={handleAddPartner}
        onContactPartner={handleContactPartner}
        onEditPartner={handleEditPartner}
        onDeletePartner={handleDeletePartner}
      />

      <BonPlansSection 
        bonsPlans={bonsPlans}
        onAddBonPlan={handleAddBonPlan}
        onEditBonPlan={handleEditBonPlan}
        onDeleteBonPlan={handleDeleteBonPlan}
        partenaires={getPartenairesForSelect()}
      />

      <EditPartnerModal
        isOpen={isEditPartnerModalOpen}
        onClose={() => setIsEditPartnerModalOpen(false)}
        partner={selectedPartner}
        onEditPartner={handleUpdatePartner}
      />

      <DeletePartnerModal
        isOpen={isDeletePartnerModalOpen}
        onClose={() => setIsDeletePartnerModalOpen(false)}
        partner={selectedPartner}
        onDeletePartner={handleConfirmDeletePartner}
      />
    </div>
  );
};

export default Partners;
