
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Phone, MapPin, Heart, Eye } from "lucide-react";
import { Senior } from "../../types/seniors";
import SeniorDetailsModal from "../seniors/SeniorDetailsModal";

interface SeniorsTableProps {
  seniors: Senior[];
}

const SeniorsTable = ({ seniors }: SeniorsTableProps) => {
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

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom & Prénom</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Localisation</TableHead>
              <TableHead>Autonomie</TableHead>
              <TableHead>Humeur du jour</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {seniors.map((senior) => (
              <TableRow key={senior.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-slate-400 to-slate-500 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">{senior.prenom} {senior.nom}</div>
                      <div className="text-sm text-muted-foreground">{senior.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4" />
                    <span>{senior.telephone || 'Non renseigné'}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>{senior.ville || 'Non renseigné'}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">
                    {senior.niveauAutonomie}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-pink-500" />
                    <Badge className={getHumeurColor(senior.humeurJour?.humeur)}>
                      {getHumeurLabel(senior.humeurJour?.humeur)}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={senior.statut === 'actif' ? 'default' : 'secondary'}>
                    {senior.statut}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewDetails(senior)}
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

      <SeniorDetailsModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        senior={selectedSenior}
      />
    </>
  );
};

export default SeniorsTable;
