
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, User, MapPin, Euro, Star, Clock } from "lucide-react";

interface Prestation {
  id: string;
  seniorNom: string;
  aidantNom: string;
  typePrestation: string;
  dateCreation: string;
  tarif: number;
  statut: 'en_attente' | 'en_cours' | 'terminee' | 'refusee' | 'annulee';
  evaluation?: number;
}

interface PrestationDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  prestation: Prestation | null;
}

const PrestationDetailsModal = ({ isOpen, onClose, prestation }: PrestationDetailsModalProps) => {
  if (!prestation) return null;

  const getStatutBadgeColor = (statut: string) => {
    switch (statut) {
      case 'en_attente': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'en_cours': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'terminee': return 'bg-green-100 text-green-700 border-green-200';
      case 'refusee': return 'bg-red-100 text-red-700 border-red-200';
      case 'annulee': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatutLabel = (statut: string) => {
    switch (statut) {
      case 'en_attente': return 'En attente';
      case 'en_cours': return 'En cours';
      case 'terminee': return 'Terminée';
      case 'refusee': return 'Refusée';
      case 'annulee': return 'Annulée';
      default: return statut;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
    ));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            Détails de la prestation {prestation.id}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <User className="h-8 w-8 text-blue-600 bg-blue-100 rounded-full p-2" />
                  <div>
                    <p className="text-sm text-slate-600">Senior</p>
                    <p className="font-semibold text-slate-800">{prestation.seniorNom}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <User className="h-8 w-8 text-green-600 bg-green-100 rounded-full p-2" />
                  <div>
                    <p className="text-sm text-slate-600">Aidant</p>
                    <p className="font-semibold text-slate-800">{prestation.aidantNom}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-slate-500" />
              <div>
                <p className="text-sm text-slate-600">Type de prestation</p>
                <p className="font-medium text-slate-800">{prestation.typePrestation}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-slate-500" />
              <div>
                <p className="text-sm text-slate-600">Date de création</p>
                <p className="font-medium text-slate-800">
                  {new Date(prestation.dateCreation).toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Euro className="h-5 w-5 text-slate-500" />
              <div>
                <p className="text-sm text-slate-600">Tarif</p>
                <p className="font-medium text-slate-800">{prestation.tarif.toFixed(2)}€</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-2">Statut</p>
              <Badge className={getStatutBadgeColor(prestation.statut)}>
                {getStatutLabel(prestation.statut)}
              </Badge>
            </div>

            {prestation.evaluation && (
              <div>
                <p className="text-sm text-slate-600 mb-2">Évaluation</p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {renderStars(prestation.evaluation)}
                  </div>
                  <span className="text-sm text-slate-600">{prestation.evaluation}/5</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end pt-4">
            <Button onClick={onClose}>Fermer</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PrestationDetailsModal;
