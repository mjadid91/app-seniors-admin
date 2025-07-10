
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
    getPartenairesForSelect,
    handleUpdatePartner,
    handleDeletePartner
  } = usePartners();

  const [isEditPartnerModalOpen, setIsEditPartnerModalOpen] = useState(false);
  const [isDeletePartnerModalOpen, setIsDeletePartnerModalOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  const handleEditPartnerClick = (partner: Partner) => {
    console.log("Modifier partenaire:", partner);
    setSelectedPartner(partner);
    setIsEditPartnerModalOpen(true);
  };

  const handleDeletePartnerClick = (partner: Partner) => {
    console.log("Supprimer partenaire:", partner);
    setSelectedPartner(partner);
    setIsDeletePartnerModalOpen(true);
  };

  const handlePartnerUpdate = (updatedPartner: Partner) => {
    handleUpdatePartner(updatedPartner);
    setIsEditPartnerModalOpen(false);
    setSelectedPartner(null);
  };

  const handlePartnerDelete = (partnerId: number) => {
    handleDeletePartner(partnerId);
    setIsDeletePartnerModalOpen(false);
    setSelectedPartner(null);
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
        onEditPartner={handleEditPartnerClick}
        onDeletePartner={handleDeletePartnerClick}
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
        onClose={() => {
          setIsEditPartnerModalOpen(false);
          setSelectedPartner(null);
        }}
        partner={selectedPartner}
        onEditPartner={handlePartnerUpdate}
      />

      <DeletePartnerModal
        isOpen={isDeletePartnerModalOpen}
        onClose={() => {
          setIsDeletePartnerModalOpen(false);
          setSelectedPartner(null);
        }}
        partner={selectedPartner}
        onDeletePartner={handlePartnerDelete}
      />
    </div>
  );
};

export default Partners;
