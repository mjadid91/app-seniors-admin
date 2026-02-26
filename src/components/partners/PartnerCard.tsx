
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, Mail, Phone, MapPin, Calendar, Edit, Trash2, Eye } from "lucide-react";
import { Partner } from "./types";

interface PartnerCardProps {
  partner: Partner;
  onView: (partner: Partner) => void;
  onEdit: (partner: Partner) => void;
  onDelete: (partner: Partner) => void;
}

const PartnerCard = ({ partner, onView, onEdit, onDelete }: PartnerCardProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'actif':
        return <Badge className="bg-green-100 text-green-700 border-green-200">Actif</Badge>;
      case 'inactif':
        return <Badge className="bg-gray-100 text-gray-700 border-gray-200">Inactif</Badge>;
      case 'suspendu':
        return <Badge className="bg-red-100 text-red-700 border-red-200">Suspendu</Badge>;
      default:
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">En attente</Badge>;
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-lg">{partner.raisonSociale}</CardTitle>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-slate-600">
            <Mail className="h-4 w-4" />
            <span>{partner.email}</span>
          </div>
          
          <div className="flex items-center gap-2 text-slate-600">
            <Phone className="h-4 w-4" />
            <span>{partner.telephone}</span>
          </div>
          
          {partner.adresse && (
            <div className="flex items-center gap-2 text-slate-600">
              <MapPin className="h-4 w-4" />
              <span className="truncate">{partner.adresse}</span>
            </div>
          )}
          
          <div className="flex items-center gap-2 text-slate-600">
            <Calendar className="h-4 w-4" />
            <span>Inscrit le {new Date(partner.dateInscription).toLocaleDateString('fr-FR')}</span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-slate-200">
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onView(partner)}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              <Eye className="h-4 w-4 mr-1" />
              Voir
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(partner)}
              className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
            >
              <Edit className="h-4 w-4 mr-1" />
              Modifier
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(partner)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Supprimer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PartnerCard;
