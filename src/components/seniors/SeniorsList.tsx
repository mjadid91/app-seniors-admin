
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Phone, MapPin } from "lucide-react";
import { Senior } from "../../types/seniors";
import SeniorDetailsModal from "./SeniorDetailsModal";

interface SeniorsListProps {
  seniors: Senior[];
}

const SeniorsList = ({ seniors }: SeniorsListProps) => {
  const [selectedSenior, setSelectedSenior] = useState<Senior | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleViewDetails = (senior: Senior) => {
    setSelectedSenior(senior);
    setIsModalOpen(true);
  };

  const getInitials = (prenom: string, nom: string) => {
    return `${prenom?.[0] || ''}${nom?.[0] || ''}`;
  };

  return (
    <>
      <div className="space-y-4">
        {seniors.map((senior) => (
          <Card key={senior.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={senior.photo || undefined} alt="Photo de profil" />
                    <AvatarFallback className="bg-gradient-to-br from-slate-400 to-slate-500 text-white font-medium">
                      {getInitials(senior.prenom, senior.nom)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-slate-800">
                        {senior.prenom} {senior.nom}
                      </h3>
                      <Badge variant={senior.statut === 'actif' ? 'default' : 'secondary'}>
                        {senior.statut}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>{senior.telephone || 'Non renseigné'}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{senior.ville || 'Non renseigné'}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-xs">Autonomie:</span>
                        <Badge variant="outline" className="text-xs">
                          {senior.niveauAutonomie}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <div className="flex items-center gap-2 mb-1">
                      <Heart className="h-4 w-4 text-pink-500" />
                      <span className="text-xs text-slate-500">Humeur du jour</span>
                    </div>
                    <Badge className={getHumeurColor(senior.humeurJour?.humeur)}>
                      {getHumeurLabel(senior.humeurJour?.humeur)}
                    </Badge>
                    {senior.humeurJour?.commentaire && (
                      <p className="text-xs text-slate-500 mt-1 max-w-32 truncate">
                        {senior.humeurJour.commentaire}
                      </p>
                    )}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewDetails(senior)}
                  >
                    Voir détails
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <SeniorDetailsModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        senior={selectedSenior}
      />
    </>
  );
};

export default SeniorsList;
