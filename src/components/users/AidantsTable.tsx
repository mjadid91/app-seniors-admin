
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserCheck, Phone, MapPin, Star, Calendar, Eye } from "lucide-react";
import { Aidant } from "../../types/seniors";
import AidantDetailsModal from "../seniors/AidantDetailsModal";

interface AidantsTableProps {
  aidants: Aidant[];
}

const AidantsTable = ({ aidants }: AidantsTableProps) => {
  const [selectedAidant, setSelectedAidant] = useState<Aidant | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleViewDetails = (aidant: Aidant) => {
    setSelectedAidant(aidant);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom & Prénom</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Localisation</TableHead>
              <TableHead>Profession</TableHead>
              <TableHead>Disponibilités</TableHead>
              <TableHead>Évaluation</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {aidants.map((aidant) => (
              <TableRow key={aidant.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center">
                      <UserCheck className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">{aidant.prenom} {aidant.nom}</div>
                      <div className="text-sm text-muted-foreground">{aidant.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4" />
                    <span>{aidant.telephone}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>{aidant.ville || 'Non renseigné'}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-medium text-sm">{aidant.profession}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>{aidant.disponibilites?.heures || 'Non renseigné'}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {aidant.evaluations && aidant.evaluations.length > 0 ? (
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-yellow-600 font-medium">
                        {aidant.evaluations[0].note}/5
                      </span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground text-sm">Aucune</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge className={getStatusBadgeClass(aidant.statut)}>
                    {aidant.statut.replace('_', ' ')}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewDetails(aidant)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Voir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AidantDetailsModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aidant={selectedAidant}
      />
    </>
  );
};

export default AidantsTable;
