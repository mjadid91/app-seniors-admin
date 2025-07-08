
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Aidant } from "../../types/seniors";
import { usePermissions, PERMISSIONS } from "../../hooks/usePermissions";

interface AidantsTableProps {
  aidants: Aidant[];
  onEditAidant: (aidant: Aidant) => void;
  onDeleteAidant: (aidant: Aidant) => void;
}

const AidantsTable = ({ aidants, onEditAidant, onDeleteAidant }: AidantsTableProps) => {
  const { hasPermission, isViewer } = usePermissions();
  const canManageUsers = hasPermission(PERMISSIONS.MANAGE_USERS);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const getStatusBadge = (statut: string) => {
    const statusConfig = {
      'actif': { variant: 'default' as const, className: 'bg-green-50 text-green-700 border-green-200' },
      'inactif': { variant: 'secondary' as const, className: 'bg-gray-50 text-gray-700 border-gray-200' },
      'en_attente': { variant: 'outline' as const, className: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
      'suspendu': { variant: 'destructive' as const, className: 'bg-red-50 text-red-700 border-red-200' }
    };
    
    const config = statusConfig[statut as keyof typeof statusConfig] || statusConfig.inactif;
    return <Badge variant={config.variant} className={config.className}>{statut.replace('_', ' ')}</Badge>;
  };

  if (aidants.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Aucun aidant trouvé</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Aidant</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Téléphone</TableHead>
          <TableHead>Tarif/h</TableHead>
          <TableHead>Disponibilités</TableHead>
          <TableHead>Date d'inscription</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {aidants.map((aidant) => (
          <TableRow key={aidant.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {aidant.prenom[0]}{aidant.nom[0]}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{aidant.prenom} {aidant.nom}</p>
                  <p className="text-sm text-gray-500">{aidant.profession || 'Aidant professionnel'}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>{aidant.email}</TableCell>
            <TableCell>{aidant.telephone}</TableCell>
            <TableCell>
              <span className="font-medium">{aidant.tarifHoraire || 0}€</span>
            </TableCell>
            <TableCell>
              <div className="text-sm">
                <div>{aidant.disponibilites?.jours?.join(', ') || 'Non renseigné'}</div>
                <div className="text-gray-500">{aidant.disponibilites?.heures || ''}</div>
              </div>
            </TableCell>
            <TableCell>
              {formatDate(aidant.dateInscription)}
            </TableCell>
            <TableCell>
              {getStatusBadge(aidant.statut)}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  disabled={isViewer()}
                  onClick={() => onEditAidant(aidant)}
                >
                  Modifier
                </Button>
                {canManageUsers && !isViewer() && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-600 hover:text-red-700"
                    onClick={() => onDeleteAidant(aidant)}
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

export default AidantsTable;
