
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useCreerDemandeRGPD } from "@/hooks/useSupabaseRGPD";
import { useUsersSelect } from "@/hooks/useUsersSelect";

interface AddDemandeRGPDModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddDemandeRGPDModal = ({ isOpen, onClose }: AddDemandeRGPDModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    idUtilisateur: "",
    typeDemande: "Accès aux données"
  });

  const creerDemandeMutation = useCreerDemandeRGPD();
  const { data: users, isLoading: usersLoading } = useUsersSelect();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.idUtilisateur) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un utilisateur",
        variant: "destructive"
      });
      return;
    }

    try {
      await creerDemandeMutation.mutateAsync({
        idUtilisateur: parseInt(formData.idUtilisateur),
        typeDemande: formData.typeDemande
      });

      toast({
        title: "Demande créée",
        description: "La demande RGPD a été créée avec succès"
      });

      onClose();
      setFormData({
        idUtilisateur: "",
        typeDemande: "Accès aux données"
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer la demande",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Ajouter une demande RGPD</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Utilisateur</label>
            <Select 
              value={formData.idUtilisateur} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, idUtilisateur: value }))}
              disabled={usersLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder={usersLoading ? "Chargement..." : "Sélectionner un utilisateur"} />
              </SelectTrigger>
              <SelectContent>
                {users?.map((user) => (
                  <SelectItem key={user.id} value={user.id.toString()}>
                    {user.displayName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Type de demande</label>
            <Select value={formData.typeDemande} onValueChange={(value) => setFormData(prev => ({ ...prev, typeDemande: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Accès aux données">Accès aux données</SelectItem>
                <SelectItem value="Rectification">Rectification</SelectItem>
                <SelectItem value="Suppression">Suppression</SelectItem>
                <SelectItem value="Portabilité">Portabilité</SelectItem>
                <SelectItem value="Opposition">Opposition</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={creerDemandeMutation.isPending || !formData.idUtilisateur}>
              {creerDemandeMutation.isPending ? "Création..." : "Créer"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDemandeRGPDModal;
