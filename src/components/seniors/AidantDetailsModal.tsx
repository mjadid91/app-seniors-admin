
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { UserCheck, Phone, MapPin, Calendar, Star, Award, Book } from "lucide-react";
import { Aidant } from "../../types/seniors";

interface AidantDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  aidant: Aidant | null;
}

const AidantDetailsModal = ({ isOpen, onClose, aidant }: AidantDetailsModalProps) => {
  if (!aidant) return null;

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-blue-600" />
            Détails de l'aidant {aidant.prenom} {aidant.nom}
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

          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold text-slate-800 mb-3">Informations professionnelles</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-600">Profession</p>
                  <p className="font-medium">{aidant.profession}</p>
                </div>

                {aidant.experience && (
                  <div>
                    <p className="text-sm text-slate-600">Expérience</p>
                    <p className="font-medium">{aidant.experience}</p>
                  </div>
                )}

                {aidant.formations && aidant.formations.length > 0 && (
                  <div>
                    <p className="text-sm text-slate-600 mb-2 flex items-center gap-2">
                      <Book className="h-4 w-4" />
                      Formations
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {aidant.formations.map((formation, index) => (
                        <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
                          {formation}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {aidant.certifications && aidant.certifications.length > 0 && (
                  <div>
                    <p className="text-sm text-slate-600 mb-2 flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Certifications
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {aidant.certifications.map((certification, index) => (
                        <Badge key={index} variant="outline" className="bg-green-50 text-green-700">
                          {certification}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {aidant.disponibilites && (
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold text-slate-800 mb-3">Disponibilités</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-600">Horaires</p>
                    <p className="font-medium">{aidant.disponibilites.heures}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-2">Jours disponibles</p>
                    <div className="flex flex-wrap gap-2">
                      {aidant.disponibilites.jours.map((jour, index) => (
                        <Badge key={index} variant="outline">
                          {jour}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {aidant.evaluations && aidant.evaluations.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  Évaluations
                </h4>
                <div className="space-y-3">
                  {aidant.evaluations.map((eval, index) => (
                    <div key={index} className="bg-slate-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{eval.note}/5</span>
                        </div>
                        <span className="text-sm text-slate-500">
                          {new Date(eval.date).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      {eval.commentaire && (
                        <p className="text-sm text-slate-700">{eval.commentaire}</p>
                      )}
                    </div>
                  ))}
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
                    {new Date(aidant.dateInscription).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600">Seniors assignés</p>
                  <p className="font-medium">{aidant.seniorsAssignes?.length || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AidantDetailsModal;
