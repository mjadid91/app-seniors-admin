
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Star, Calendar } from "lucide-react";
import { Aidant } from "../../types/seniors";
import AidantDetailsModal from "./AidantDetailsModal";

interface AidantsListProps {
  aidants: Aidant[];
}

const AidantsList = ({ aidants }: AidantsListProps) => {
  const [selectedAidant, setSelectedAidant] = useState<Aidant | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (aidant: Aidant) => {
    setSelectedAidant(aidant);
    setIsModalOpen(true);
  };

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
    <>
      <div className="space-y-4">
        {aidants.map((aidant) => (
          <Card key={aidant.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-slate-800">
                      {aidant.prenom} {aidant.nom}
                    </h3>
                    <Badge className={getStatusBadgeClass(aidant.statut)}>
                      {aidant.statut.replace('_', ' ')}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600 mb-3">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>{aidant.telephone}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{aidant.ville || 'Non renseigné'}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{aidant.disponibilites?.heures || 'Non renseigné'}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <span className="font-medium text-slate-700">
                      {aidant.profession}
                    </span>
                    <span className="text-slate-500">
                      {aidant.seniorsAssignes?.length || 0} senior(s) assigné(s)
                    </span>
                    {aidant.evaluations && aidant.evaluations.length > 0 && (
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-yellow-600">
                          {aidant.evaluations[0].note}/5
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleViewDetails(aidant)}
                >
                  Voir détails
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AidantDetailsModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aidant={selectedAidant}
      />
    </>
  );
};

export default AidantsList;
