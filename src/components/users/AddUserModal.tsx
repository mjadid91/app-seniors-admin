
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { User } from "../../stores/authStore";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (user: Omit<User, 'id'>) => void;
}

const AddUserModal = ({ isOpen, onClose, onAddUser }: AddUserModalProps) => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    role: "visualisateur" as User['role']
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const newUser: Omit<User, 'id'> = {
        ...formData,
        dateInscription: new Date().toISOString().split('T')[0]
      };

      onAddUser(newUser);
      
      toast({
        title: "Utilisateur ajouté",
        description: `${formData.prenom} ${formData.nom} a été ajouté avec succès.`,
      });

      setFormData({
        nom: "",
        prenom: "",
        email: "",
        role: "visualisateur"
      });
      onClose();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter l'utilisateur.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter un utilisateur</DialogTitle>
          <DialogDescription>
            Créez un nouveau compte utilisateur pour l'administration.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="prenom">Prénom</Label>
              <Input
                id="prenom"
                value={formData.prenom}
                onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nom">Nom</Label>
              <Input
                id="nom"
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Rôle</Label>
            <Select value={formData.role} onValueChange={(value: User['role']) => setFormData({ ...formData, role: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="administrateur">Administrateur</SelectItem>
                <SelectItem value="moderateur">Modérateur</SelectItem>
                <SelectItem value="support">Support</SelectItem>
                <SelectItem value="visualisateur">Visualisateur</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Ajout..." : "Ajouter"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserModal;
