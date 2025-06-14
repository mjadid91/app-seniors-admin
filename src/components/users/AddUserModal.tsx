
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useUserCategories } from "../../hooks/useUserCategories";
import { CreateUserData } from "./userTypes";
import UserCreationForm from "./UserCreationForm";
import PasswordConfirmation from "./PasswordConfirmation";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (user: CreateUserData) => void;
}

const AddUserModal = ({ isOpen, onClose, onAddUser }: AddUserModalProps) => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    categoryId: 0,
    languePreferee: "",
    devise: ""
  });
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCreatedPassword, setShowCreatedPassword] = useState(false);
  const [createdPassword, setCreatedPassword] = useState("");
  const { toast } = useToast();
  const { categories } = useUserCategories();

  const handleSubmit = async (newUser: CreateUserData, userPassword: string) => {
    setIsLoading(true);

    try {
      onAddUser(newUser);
      setCreatedPassword(userPassword);
      setShowCreatedPassword(true);
      
      const selectedCategory = categories.find(cat => cat.IDCatUtilisateurs === formData.categoryId);
      toast({
        title: "Utilisateur créé avec succès",
        description: `${formData.prenom} ${formData.nom} a été ajouté avec le rôle ${selectedCategory?.LibelleCategorie}.`,
      });

      // Reset form
      setFormData({
        nom: "",
        prenom: "",
        email: "",
        categoryId: 0,
        languePreferee: "",
        devise: ""
      });
      setPassword("");
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer l'utilisateur.",
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
    setFormData({
      nom: "",
      prenom: "",
      email: "",
      categoryId: 0,
      languePreferee: "",
      devise: ""
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Ajouter un utilisateur</DialogTitle>
          <DialogDescription>
            Créez un nouveau compte utilisateur pour l'administration.
          </DialogDescription>
        </DialogHeader>

        {showCreatedPassword ? (
          <PasswordConfirmation 
            password={createdPassword}
            onClose={handleClose}
          />
        ) : (
          <UserCreationForm
            formData={formData}
            setFormData={setFormData}
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
