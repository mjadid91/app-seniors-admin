
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useUserCategories } from "../../hooks/useUserCategories";
import { useUserFormData } from "../../hooks/useUserFormData";
import { CreateUserData } from "./userTypes";
import UserCreationForm from "./UserCreationForm";
import PasswordConfirmation from "./PasswordConfirmation";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (user: CreateUserData, password: string) => void;
}

const AddUserModal = ({ isOpen, onClose, onAddUser }: AddUserModalProps) => {
  const { formData, resetFormData } = useUserFormData();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCreatedPassword, setShowCreatedPassword] = useState(false);
  const [createdPassword, setCreatedPassword] = useState("");
  const { toast } = useToast();
  const { categories } = useUserCategories();

  const handleSubmit = async (newUser: CreateUserData, userPassword: string) => {
    setIsLoading(true);

    try {
      console.log('Création utilisateur avec mot de passe:', userPassword);
      await onAddUser(newUser, userPassword);
      setCreatedPassword(userPassword);
      setShowCreatedPassword(true);
      
      const selectedCategory = categories.find(cat => cat.IDCatUtilisateurs === formData.categoryId);
      toast({
        title: "Utilisateur créé avec succès",
        description: `${formData.prenom} ${formData.nom} a été ajouté avec le rôle ${selectedCategory?.LibelleCategorie}.`,
      });

      // Reset form
      resetFormData();
      setPassword("");
    } catch (error) {
      console.error('Erreur lors de la création:', error);
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Impossible de créer l'utilisateur.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setShowCreatedPassword(false);
    setCreatedPassword("");
    setPassword("");
    resetFormData();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {showCreatedPassword ? "Utilisateur créé" : "Ajouter un utilisateur"}
          </DialogTitle>
          {!showCreatedPassword && (
            <DialogDescription>
              Créez un nouveau compte utilisateur avec les informations et permissions appropriées.
            </DialogDescription>
          )}
        </DialogHeader>

        {showCreatedPassword ? (
          <PasswordConfirmation 
            password={createdPassword}
            onClose={handleClose}
          />
        ) : (
          <UserCreationForm
            password={password}
            setPassword={setPassword}
            isLoading={isLoading}
            onSubmit={handleSubmit}
            onCancel={handleClose}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddUserModal;
