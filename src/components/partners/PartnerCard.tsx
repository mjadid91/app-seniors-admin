
import { Building2, Mail, Phone, MapPin, Star, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Partner {
  id: number;
  nom: string; // Renommé pour cohérence
  type: string;
  email: string;
  telephone: string; // Renommé pour cohérence
  adresse: string; // Renommé pour cohérence
  statut: string;
  evaluation: number; // Renommé pour cohérence
  services: string[];
  dateInscription: string; // Renommé pour cohérence
  // Champs système cohérents
  dateCreation?: string;
  dateMiseAJour?: string;
  creePar?: string;
}

interface PartnerCardProps {
  partner: Partner;
  onContact: (partner: Partner) => void;
  onViewDetails: (partner: Partner) => void;
}

const PartnerCard = ({ partner, onContact, onViewDetails }: PartnerCardProps) => {
  return (
    <div className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
            <Building2 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">{partner.nom}</h3>
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
          <span>{partner.telephone}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <MapPin className="h-4 w-4" />
          <span>{partner.adresse}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <Star className="h-4 w-4 text-yellow-500 fill-current" />
        <span className="text-sm font-medium">{partner.evaluation}</span>
        <span className={`px-2 py-1 rounded-full text-xs ${
          partner.statut === 'Actif' 
            ? 'bg-green-100 text-green-700' 
            : partner.statut === 'En attente'
            ? 'bg-yellow-100 text-yellow-700'
            : 'bg-red-100 text-red-700'
        }`}>
          {partner.statut}
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
          onClick={() => onContact(partner)}
        >
          Contacter
        </Button>
        <Button 
          size="sm" 
          className="flex-1"
          onClick={() => onViewDetails(partner)}
        >
          Voir détails
        </Button>
      </div>
    </div>
  );
};

export default PartnerCard;
