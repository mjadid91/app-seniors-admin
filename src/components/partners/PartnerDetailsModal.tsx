
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Mail, Phone, MapPin, Star, Calendar, Users } from "lucide-react";
import { Partner } from "./types";
import { usePartnerPrestations } from "../../hooks/usePartnerPrestations";

interface PartnerDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  partner: Partner | null;
  onContact: (partner: Partner) => void; // Ajout de cette propriété
}

const PartnerDetailsModal = ({ isOpen, onClose, partner, onContact }: PartnerDetailsModalProps) => {
  const { prestationsCount, loading } = usePartnerPrestations(partner?.id || null);

  if (!partner) return null;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            {partner.raisonSociale || partner.nom}
          </DialogTitle>
          <DialogDescription>
            Détails complets du partenaire
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Informations générales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-slate-700">Type de partenaire</label>
                <p className="text-slate-900">{partner.type}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Date d'inscription</label>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-slate-500" />
                  <p className="text-slate-900">
                    {partner.dateInscription
                        ? new Date(partner.dateInscription).toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })
                        : "Date inconnue"}
                  </p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Statut</label>
                <div className="mt-1">
                  <Badge className={`${
                    partner.statut === 'Actif' 
                      ? 'bg-green-100 text-green-700' 
                      : partner.statut === 'En attente'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {partner.statut}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-slate-700">Note moyenne</label>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    {renderStars(partner.evaluation)}
                  </div>
                  <span className="text-sm font-medium text-slate-700">{partner.evaluation}/5</span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Nombre de prestations</label>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-slate-500" />
                  <p className="text-slate-900">
                    {loading ? "Chargement..." : prestationsCount}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Coordonnées */}
          <div className="bg-slate-50 rounded-lg p-4">
            <h3 className="font-semibold text-slate-800 mb-3">Coordonnées</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-slate-500" />
                <span className="text-slate-700">{partner.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-slate-500" />
                <span className="text-slate-700">{partner.telephone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-slate-500" />
                <span className="text-slate-700">{partner.adresse}</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-3">Services proposés</h3>
            <div className="flex flex-wrap gap-2">
              {partner.services.map((service, index) => (
                <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {service}
                </Badge>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-4 border-t border-slate-200">
            <Button variant="outline" onClick={onClose}>
              Fermer
            </Button>
            <Button onClick={() => onContact(partner)}>
              Contacter
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PartnerDetailsModal;
