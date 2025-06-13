
import PartnersListSection from "./PartnersListSection";
import BonPlansSection from "./BonPlansSection";
import PartnerStats from "./PartnerStats";
import { usePartners } from "./usePartners";

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

  return (
    <div className="space-y-6">
      <PartnersListSection
        partners={partners}
        onAddPartner={handleAddPartner}
        onContactPartner={handleContactPartner}
      />

      <BonPlansSection 
        bonsPlans={bonsPlans}
        onAddBonPlan={handleAddBonPlan}
        onEditBonPlan={handleEditBonPlan}
        onDeleteBonPlan={handleDeleteBonPlan}
        partenaires={getPartenairesForSelect()}
      />

      <PartnerStats partners={partners} />
    </div>
  );
};

export default Partners;
