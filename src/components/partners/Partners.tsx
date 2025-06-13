import { useState } from "react";
import { Building2, Mail, Phone, MapPin, Star, Plus, Search, Filter, Edit, Trash2, Tag, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import AddPartnerModal from "./AddPartnerModal";
import PartnerDetailsModal from "./PartnerDetailsModal";

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
  const partnerTypes = ["Prestataire de services", "Aide à domicile", "Support technique", "Santé", "Transport"];

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
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Rechercher un partenaire..."
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select
              className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">Tous les statuts</option>
              <option value="Actif">Actif</option>
              <option value="En attente">En attente</option>
              <option value="Suspendu">Suspendu</option>
            </select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtrer
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {partners.map((partner) => (
            <div key={partner.id} className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{partner.name}</h3>
                    <p className="text-sm text-slate-500">{partner.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Edit className="h-4 w-4 text-slate-400 hover:text-blue-600 cursor-pointer" />
                  <Trash2 className="h-4 w-4 text-slate-400 hover:text-red-600 cursor-pointer" />
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Mail className="h-4 w-4" />
                  <span>{partner.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Phone className="h-4 w-4" />
                  <span>{partner.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <MapPin className="h-4 w-4" />
                  <span>{partner.address}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">{partner.rating}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  partner.status === 'Actif' 
                    ? 'bg-green-100 text-green-700' 
                    : partner.status === 'En attente'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {partner.status}
                </span>
              </div>

              <div className="mb-4">
                <p className="text-sm text-slate-600 mb-2">Services proposés:</p>
                <div className="flex flex-wrap gap-1">
                  {partner.services.map((service, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleContactPartner(partner)}
                >
                  Contacter
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleViewPartnerDetails(partner)}
                >
                  Voir détails
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section Bons Plans */}
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
            <div key={bonPlan.id} className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
                    <Tag className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{bonPlan.titre}</h3>
                    <p className="text-sm text-slate-500">{bonPlan.partenaire}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  bonPlan.statut === 'Actif' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {bonPlan.statut}
                </span>
              </div>

              <p className="text-slate-600 mb-4">{bonPlan.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-lg font-bold text-purple-600">{bonPlan.reduction}</p>
                    <p className="text-xs text-slate-500">Réduction</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-slate-700">
                      {new Date(bonPlan.dateExpiration).toLocaleDateString('fr-FR')}
                    </p>
                    <p className="text-xs text-slate-500">Expire le</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ... keep existing code (statistics section) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-800 mb-2">Total partenaires</h3>
          <p className="text-3xl font-bold text-blue-600">{partners.length}</p>
          <p className="text-sm text-slate-500">+{partners.filter(p => new Date(p.joinDate) > new Date('2024-01-01')).length} ce mois</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-800 mb-2">Partenaires actifs</h3>
          <p className="text-3xl font-bold text-green-600">{partners.filter(p => p.status === 'Actif').length}</p>
          <p className="text-sm text-slate-500">{Math.round((partners.filter(p => p.status === 'Actif').length / partners.length) * 100)}% du total</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-800 mb-2">En attente</h3>
          <p className="text-3xl font-bold text-yellow-600">{partners.filter(p => p.status === 'En attente').length}</p>
          <p className="text-sm text-slate-500">À valider</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-800 mb-2">Note moyenne</h3>
          <p className="text-3xl font-bold text-purple-600">{(partners.reduce((acc, p) => acc + p.rating, 0) / partners.length).toFixed(1)}</p>
          <p className="text-sm text-slate-500">Sur 5 étoiles</p>
        </div>
      </div>

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
