
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import PartnerCard from "./PartnerCard";
import PartnerFilters from "./PartnerFilters";
import AddPartnerModal from "./AddPartnerModal";
import PartnerDetailsModal from "./PartnerDetailsModal";
import { Partner } from "./types";

interface PartnersListSectionProps {
  partners: Partner[];
  onAddPartner: (partner: Omit<Partner, 'id'>) => void;
  onContactPartner: (partner: Partner) => void;
}

const PartnersListSection = ({ 
  partners, 
  onAddPartner, 
  onContactPartner 
}: PartnersListSectionProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isAddPartnerModalOpen, setIsAddPartnerModalOpen] = useState(false);
  const [isPartnerDetailsModalOpen, setIsPartnerDetailsModalOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  const handleViewPartnerDetails = (partner: Partner) => {
    setSelectedPartner(partner);
    setIsPartnerDetailsModalOpen(true);
  };

  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || partner.statut === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Gestion des Partenaires</h1>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setIsAddPartnerModalOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouveau partenaire
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <PartnerFilters
          searchTerm={searchTerm}
          filterStatus={filterStatus}
          onSearchChange={setSearchTerm}
          onFilterChange={setFilterStatus}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPartners.map((partner) => (
            <PartnerCard
              key={partner.id}
              partner={partner}
              onContact={onContactPartner}
              onViewDetails={handleViewPartnerDetails}
            />
          ))}
        </div>
      </div>

      <AddPartnerModal 
        isOpen={isAddPartnerModalOpen}
        onClose={() => setIsAddPartnerModalOpen(false)}
        onAddPartner={onAddPartner}
      />

      <PartnerDetailsModal 
        isOpen={isPartnerDetailsModalOpen}
        onClose={() => setIsPartnerDetailsModalOpen(false)}
        partner={selectedPartner}
      />
    </>
  );
};

export default PartnersListSection;
