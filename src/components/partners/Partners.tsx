
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import AddPartnerModal from "./AddPartnerModal";
import PartnerDetailsModal from "./PartnerDetailsModal";
import PartnerCard from "./PartnerCard";
import PartnerFilters from "./PartnerFilters";
import PartnerStats from "./PartnerStats";
import BonPlansSection from "./BonPlansSection";

interface Partner {
  id: number;
  name: string;
  type: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  rating: number;
  services: string[];
  joinDate: string;
}

interface BonPlan {
  id: number;
  titre: string;
  partenaire: string;
  description: string;
  reduction: string;
  dateExpiration: string;
  statut: string;
}

const Partners = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isAddPartnerModalOpen, setIsAddPartnerModalOpen] = useState(false);
  const [isPartnerDetailsModalOpen, setIsPartnerDetailsModalOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  
  const [partners, setPartners] = useState<Partner[]>([
    {
      id: 1,
      name: "Services Plus",
      type: "Prestataire de services",
      email: "contact@servicesplus.fr",
      phone: "01 23 45 67 89",
      address: "15 rue de la République, 75001 Paris",
      status: "Actif",
      rating: 4.8,
      services: ["Ménage", "Jardinage", "Bricolage"],
      joinDate: "2023-01-15"
    },
    {
      id: 2,
      name: "Aide à Domicile Pro",
      type: "Aide à domicile",
      email: "info@aidedomicilepro.fr",
      phone: "01 34 56 78 90",
      address: "8 avenue des Champs, 69001 Lyon",
      status: "Actif",
      rating: 4.6,
      services: ["Aide à domicile", "Courses", "Compagnie"],
      joinDate: "2023-03-22"
    },
    {
      id: 3,
      name: "Tech Senior",
      type: "Support technique",
      email: "support@techsenior.fr",
      phone: "01 45 67 89 01",
      address: "22 rue du Commerce, 33000 Bordeaux",
      status: "En attente",
      rating: 4.2,
      services: ["Support informatique", "Installation", "Formation"],
      joinDate: "2024-01-10"
    }
  ]);

  const [bonsPlans] = useState<BonPlan[]>([
    {
      id: 1,
      titre: "Réduction ménage 20%",
      partenaire: "Services Plus",
      description: "Bénéficiez de 20% de réduction sur tous les services de ménage",
      reduction: "20%",
      dateExpiration: "2024-07-31",
      statut: "Actif"
    },
    {
      id: 2,
      titre: "Première consultation gratuite",
      partenaire: "Tech Senior",
      description: "Première consultation informatique offerte pour tout nouveau client",
      reduction: "Gratuit",
      dateExpiration: "2024-06-30",
      statut: "Actif"
    }
  ]);

  const { toast } = useToast();

  const handleAddPartner = (newPartnerData: Omit<Partner, 'id'>) => {
    const newPartner: Partner = {
      ...newPartnerData,
      id: partners.length + 1
    };
    setPartners(prev => [...prev, newPartner]);
    toast({
      title: "Partenaire ajouté",
      description: `${newPartnerData.name} a été ajouté avec succès.`,
    });
  };

  const handleContactPartner = (partner: Partner) => {
    toast({
      title: "Contact partenaire",
      description: `Ouverture du contact avec ${partner.name}`,
    });
    window.location.href = `mailto:${partner.email}?subject=Contact depuis AppSeniors Admin`;
  };

  const handleViewPartnerDetails = (partner: Partner) => {
    setSelectedPartner(partner);
    setIsPartnerDetailsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
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
          {partners.map((partner) => (
            <PartnerCard
              key={partner.id}
              partner={partner}
              onContact={handleContactPartner}
              onViewDetails={handleViewPartnerDetails}
            />
          ))}
        </div>
      </div>

      <BonPlansSection bonsPlans={bonsPlans} />

      <PartnerStats partners={partners} />

      <AddPartnerModal 
        isOpen={isAddPartnerModalOpen}
        onClose={() => setIsAddPartnerModalOpen(false)}
        onAddPartner={handleAddPartner}
      />

      <PartnerDetailsModal 
        isOpen={isPartnerDetailsModalOpen}
        onClose={() => setIsPartnerDetailsModalOpen(false)}
        partner={selectedPartner}
      />
    </div>
  );
};

export default Partners;
