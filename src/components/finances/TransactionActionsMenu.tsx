
import { useState } from "react";
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FinanceTransaction } from "@/hooks/useFinancesTransactions";
import TransactionDetailsModal from "./TransactionDetailsModal";
import EditTransactionModal from "./EditTransactionModal";
import DeleteTransactionModal from "./DeleteTransactionModal";
import { usePermissions, PERMISSIONS } from "@/hooks/usePermissions";

interface TransactionActionsMenuProps {
  transaction: FinanceTransaction;
  onTransactionUpdated: () => void;
}

const TransactionActionsMenu = ({ transaction, onTransactionUpdated }: TransactionActionsMenuProps) => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { hasPermission } = usePermissions();

  // Vérifier les permissions
  const canManageFinances = hasPermission(PERMISSIONS.MANAGE_FINANCES);
  const canViewFinances = hasPermission(PERMISSIONS.VIEW_FINANCES);

  // Si l'utilisateur n'a pas les permissions de base, ne rien afficher
  if (!canViewFinances) {
    return null;
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Ouvrir le menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setShowDetailsModal(true)}>
            <Eye className="mr-2 h-4 w-4" />
            Voir les détails
          </DropdownMenuItem>
          
          {canManageFinances && (
            <>
              <DropdownMenuItem onClick={() => setShowEditModal(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Modifier
              </DropdownMenuItem>
              
              <DropdownMenuItem 
                onClick={() => setShowDeleteModal(true)}
                className="text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Supprimer
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <TransactionDetailsModal
        transaction={transaction}
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
      />

      {canManageFinances && (
        <>
          <EditTransactionModal
            transaction={transaction}
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
            onTransactionUpdated={onTransactionUpdated}
          />

          <DeleteTransactionModal
            transaction={transaction}
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onTransactionDeleted={onTransactionUpdated}
          />
        </>
      )}
    </>
  );
};

export default TransactionActionsMenu;
