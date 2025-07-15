
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { User } from "../../stores/authStore";

interface DeleteUserConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onConfirmDelete: (userId: string) => void;
}

const DeleteUserConfirm = ({ isOpen, onClose, user, onConfirmDelete }: DeleteUserConfirmProps) => {
  const handleConfirm = () => {
    if (user) {
      onConfirmDelete(user.id);
      onClose();
    }
  };

  if (!user) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Supprimer l'utilisateur</AlertDialogTitle>
          <AlertDialogDescription>
            Êtes-vous sûr de vouloir supprimer l'utilisateur <strong>{user.prenom} {user.nom}</strong> ({user.email}) ?
            <br /><br />
            Cette action est irréversible et supprimera définitivement le compte utilisateur et toutes ses données associées.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} className="bg-red-500 hover:bg-red-600 text-white">
            Supprimer définitivement
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteUserConfirm;
