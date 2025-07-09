
import { useState } from "react";
import { Users, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import PartnerCard from "./PartnerCard";
import AddPartnerModal from "./AddPartnerModal";
import PartnerDetailsModal from "./PartnerDetailsModal";
import { Partner } from "./types";

interface PartnersListSectionProps {
  partners: Partner[];
  onAddPartner: (partner: Omit<Partner, 'id' | 'dateInscription'>) => void;
  onContactPartner: (partner: Partner) => void;
  onEditPartner: (partner: Partner) => void;
  onDeletePartner: (partner: Partner) => void;
}

const PartnersListSection = ({ 
  partners, 
  onAddPartner, 
  onContactPartner,
  onEditPartner,
  onDeletePartner
}: PartnersListSectionProps) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  const handleViewPartner = (partner: Partner) => {
    console.log("Voir partenaire:", partner);
    setSelectedPartner(partner);
    setIsDetailsModalOpen(true);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Users className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-slate-800">Partenaires</h2>
          </div>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Nouveau partenaire
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {partners.map((partner) => (
            <PartnerCard 
              key={partner.id} 
              partner={partner}
              onView={handleViewPartner}
              onEdit={onEditPartner}
              onDelete={onDeletePartner}
            />
          ))}
        </div>

        {partners.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-600 mb-2">Aucun partenaire</h3>
            <p className="text-slate-500 mb-4">Commencez par ajouter votre premier partenaire.</p>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setIsAddModalOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un partenaire
            </Button>
          </div>
        )}
      </div>

      <AddPartnerModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddPartner={onAddPartner}
      />

      <PartnerDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        partner={selectedPartner}
        onContact={onContactPartner}
      />
    </>
  );
};

export default PartnersListSection;
