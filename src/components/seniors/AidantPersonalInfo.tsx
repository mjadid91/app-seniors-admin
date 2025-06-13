
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, MapPin, Calendar } from "lucide-react";
import { Aidant } from "../../types/seniors";

interface AidantPersonalInfoProps {
  aidant: Aidant;
}

const getStatusBadgeClass = (statut: string) => {
  switch (statut) {
    case 'actif':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'inactif':
      return 'bg-gray-100 text-gray-700 border-gray-200';
    case 'en_attente':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const AidantPersonalInfo = ({ aidant }: AidantPersonalInfoProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <h4 className="font-semibold text-slate-800 mb-3">Informations personnelles</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-slate-500" />
            <div>
              <p className="text-sm text-slate-600">Téléphone</p>
              <p className="font-medium">{aidant.telephone}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-slate-500" />
            <div>
              <p className="text-sm text-slate-600">Date de naissance</p>
              <p className="font-medium">
                {new Date(aidant.dateNaissance).toLocaleDateString('fr-FR')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-slate-500" />
            <div>
              <p className="text-sm text-slate-600">Adresse</p>
              <p className="font-medium">
                {aidant.adresse ? `${aidant.adresse}, ${aidant.ville} ${aidant.codePostal}` : 'Non renseignée'}
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm text-slate-600">Statut</p>
            <Badge className={getStatusBadgeClass(aidant.statut)}>
              {aidant.statut.replace('_', ' ')}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AidantPersonalInfo;
