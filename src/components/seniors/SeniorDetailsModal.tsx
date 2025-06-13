
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { User, Phone, MapPin, Calendar, Heart, AlertTriangle } from "lucide-react";
import { Senior } from "../../types/seniors";

interface SeniorDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  senior: Senior | null;
}

const SeniorDetailsModal = ({ isOpen, onClose, senior }: SeniorDetailsModalProps) => {
  if (!senior) return null;

  const getHumeurColor = (humeur?: string) => {
    switch (humeur) {
      case 'tres_content':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'content':
        return 'bg-lime-100 text-lime-700 border-lime-200';
      case 'neutre':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'triste':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'tres_triste':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getHumeurLabel = (humeur?: string) => {
    switch (humeur) {
      case 'tres_content':
        return 'Très content';
      case 'content':
        return 'Content';
      case 'neutre':
        return 'Neutre';
      case 'triste':
        return 'Triste';
      case 'tres_triste':
        return 'Très triste';
      default:
        return 'Non renseigné';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600" />
            Détails de {senior.prenom} {senior.nom}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold text-slate-800 mb-3">Informations personnelles</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-slate-500" />
                  <div>
                    <p className="text-sm text-slate-600">Téléphone</p>
                    <p className="font-medium">{senior.telephone || 'Non renseigné'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-slate-500" />
                  <div>
                    <p className="text-sm text-slate-600">Date de naissance</p>
                    <p className="font-medium">
                      {new Date(senior.dateNaissance).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-slate-500" />
                  <div>
                    <p className="text-sm text-slate-600">Adresse</p>
                    <p className="font-medium">
                      {senior.adresse ? `${senior.adresse}, ${senior.ville} ${senior.codePostal}` : 'Non renseignée'}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-slate-600">Situation familiale</p>
                  <Badge variant="outline" className="mt-1">
                    {senior.situationFamiliale || 'Non renseignée'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold text-slate-800 mb-3">État de santé et autonomie</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-4 w-4 text-slate-500" />
                  <div>
                    <p className="text-sm text-slate-600">Handicap</p>
                    <Badge className={senior.handicap ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}>
                      {senior.handicap ? 'Oui' : 'Non'}
                    </Badge>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-slate-600 mb-2">Niveau d'autonomie</p>
                  <Badge variant="outline">
                    {senior.niveauAutonomie}
                  </Badge>
                </div>

                {senior.pathologies && senior.pathologies.length > 0 && (
                  <div>
                    <p className="text-sm text-slate-600 mb-2">Pathologies</p>
                    <div className="flex flex-wrap gap-2">
                      {senior.pathologies.map((pathologie, index) => (
                        <Badge key={index} variant="outline" className="bg-red-50 text-red-700">
                          {pathologie}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {senior.humeurJour && (
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                  <Heart className="h-4 w-4 text-pink-500" />
                  Humeur du jour
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Badge className={getHumeurColor(senior.humeurJour.humeur)}>
                      {getHumeurLabel(senior.humeurJour.humeur)}
                    </Badge>
                    <span className="text-sm text-slate-500">
                      {new Date(senior.humeurJour.date).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  {senior.humeurJour.commentaire && (
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <p className="text-sm text-slate-700">{senior.humeurJour.commentaire}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold text-slate-800 mb-3">Informations système</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-600">Date d'inscription</p>
                  <p className="font-medium">
                    {new Date(senior.dateInscription).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600">Dernière connexion</p>
                  <p className="font-medium">
                    {senior.derniereConnexion 
                      ? new Date(senior.derniereConnexion).toLocaleDateString('fr-FR')
                      : 'Jamais connecté'
                    }
                  </p>
                </div>
                <div>
                  <p className="text-slate-600">Statut</p>
                  <Badge className={senior.statut === 'actif' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                    {senior.statut}
                  </Badge>
                </div>
                <div>
                  <p className="text-slate-600">Aidants assignés</p>
                  <p className="font-medium">{senior.aidants?.length || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SeniorDetailsModal;
