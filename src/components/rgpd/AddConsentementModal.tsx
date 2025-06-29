
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useMettreAJourConsentement } from "@/hooks/useSupabaseRGPD";
import { useUsersSelect } from "@/hooks/useUsersSelect";

interface AddConsentementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddConsentementModal = ({ isOpen, onClose }: AddConsentementModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    idUtilisateur: "",
    typeCookie: "Essentiel",
    statut: true
  });

  const consentementMutation = useMettreAJourConsentement();
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
      await consentementMutation.mutateAsync({
        idUtilisateur: parseInt(formData.idUtilisateur),
        typeCookie: formData.typeCookie,
        statut: formData.statut
      });

      toast({
        title: "Consentement ajouté",
        description: "Le consentement a été enregistré avec succès"
      });

      onClose();
      setFormData({
        idUtilisateur: "",
        typeCookie: "Essentiel",
        statut: true
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le consentement",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Ajouter un consentement</DialogTitle>
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
            <label className="block text-sm font-medium mb-1">Type de cookie</label>
            <Select value={formData.typeCookie} onValueChange={(value) => setFormData(prev => ({ ...prev, typeCookie: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Essentiel">Essentiel</SelectItem>
                <SelectItem value="Analytique">Analytique</SelectItem>
                <SelectItem value="Publicitaire">Publicitaire</SelectItem>
                <SelectItem value="Fonctionnel">Fonctionnel</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={formData.statut}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, statut: checked }))}
            />
            <label className="text-sm font-medium">Consentement accordé</label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={consentementMutation.isPending || !formData.idUtilisateur}>
              {consentementMutation.isPending ? "Ajout..." : "Ajouter"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddConsentementModal;
