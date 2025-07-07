
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import TransactionDetailsModal from "./TransactionDetailsModal";
import EditTransactionModal from "./EditTransactionModal";
import DeleteTransactionModal from "./DeleteTransactionModal";

interface TransactionActionsMenuProps {
  transaction: any;
  onTransactionUpdated: () => void;
}

const TransactionActionsMenu = ({ transaction, onTransactionUpdated }: TransactionActionsMenuProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setShowDetails(true)}>
            <Eye className="mr-2 h-4 w-4" />
            Voir les détails
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowEdit(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Modifier
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setShowDelete(true)}
            className="text-red-600"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <TransactionDetailsModal
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        transaction={transaction}
      />

      <EditTransactionModal
        isOpen={showEdit}
        onClose={() => setShowEdit(false)}
        transaction={transaction}
        onTransactionUpdated={onTransactionUpdated}
      />

      <DeleteTransactionModal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        transaction={transaction}
        onTransactionDeleted={onTransactionUpdated}
      />
    </>
  );
};

export default TransactionActionsMenu;
