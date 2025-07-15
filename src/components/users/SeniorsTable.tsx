
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Senior } from "../../types/seniors";
import { usePermissions, PERMISSIONS } from "../../hooks/usePermissions";

interface SeniorsTableProps {
  seniors: Senior[];
  onEditSenior: (senior: Senior) => void;
  onDeleteSenior: (senior: Senior) => void;
}

const SeniorsTable = ({ seniors, onEditSenior, onDeleteSenior }: SeniorsTableProps) => {
  const { hasPermission, isViewer } = usePermissions();
  const canManageUsers = hasPermission(PERMISSIONS.MANAGE_USERS);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const getStatusBadge = (statut: string) => {
    const statusConfig = {
      'actif': { variant: 'default' as const, className: 'bg-green-50 text-green-700 border-green-200' },
      'inactif': { variant: 'secondary' as const, className: 'bg-gray-50 text-gray-700 border-gray-200' },
      'suspendu': { variant: 'destructive' as const, className: 'bg-red-50 text-red-700 border-red-200' }
    };
    
    const config = statusConfig[statut as keyof typeof statusConfig] || statusConfig.inactif;
    return <Badge variant={config.variant} className={config.className}>{statut}</Badge>;
  };

  const getAutonomieBadge = (niveau: string) => {
    const autonomieConfig = {
      'faible': { className: 'bg-red-50 text-red-700 border-red-200' },
      'moyen': { className: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
      'eleve': { className: 'bg-green-50 text-green-700 border-green-200' }
    };
    
    const config = autonomieConfig[niveau as keyof typeof autonomieConfig] || autonomieConfig.moyen;
    return <Badge variant="outline" className={config.className}>{niveau}</Badge>;
  };

  const displayGenre = (genre?: string) => {
    return genre && genre !== 'Non précisé' ? genre : 'Non renseigné';
  };

  if (seniors.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Aucun senior trouvé</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Senior</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Téléphone</TableHead>
          <TableHead>Genre</TableHead>
          <TableHead>Autonomie</TableHead>
          <TableHead>Date d'inscription</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {seniors.map((senior) => (
          <TableRow key={senior.id}>
            <TableCell>
              <div>
                <p className="font-medium">{senior.prenom} {senior.nom}</p>
                <p className="text-sm text-gray-500">{senior.ville || 'Ville non renseignée'}</p>
              </div>
            </TableCell>
            <TableCell>{senior.email}</TableCell>
            <TableCell>{senior.telephone}</TableCell>
            <TableCell>{displayGenre(senior.genre)}</TableCell>
            <TableCell>
              {getAutonomieBadge(senior.niveauAutonomie || 'moyen')}
            </TableCell>
            <TableCell>
              {formatDate(senior.dateInscription)}
            </TableCell>
            <TableCell>
              {getStatusBadge(senior.statut)}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  disabled={isViewer()}
                  onClick={() => onEditSenior(senior)}
                >
                  Modifier
                </Button>
                {canManageUsers && !isViewer() && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-600 hover:text-red-700"
                    onClick={() => onDeleteSenior(senior)}
                  >
                    Supprimer
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SeniorsTable;
