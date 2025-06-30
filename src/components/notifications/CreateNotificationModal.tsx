
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useCreateNotification } from "@/hooks/useNotifications";
import { useAuthStore } from "@/stores/authStore";

interface CreateNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateNotificationModal = ({ isOpen, onClose }: CreateNotificationModalProps) => {
  const { user } = useAuthStore();
  const createNotificationMutation = useCreateNotification();
  
  const [formData, setFormData] = useState({
    Titre: '',
    Message: '',
    TypeNotification: 'info' as 'info' | 'success' | 'warning' | 'error' | 'system',
    Cible: 'Tous' as 'Admin' | 'Aidant' | 'Senior' | 'Tous',
    IDUtilisateurDestinataire: null as number | null
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.Titre.trim() || !formData.Message.trim()) {
      return;
    }

    try {
      await createNotificationMutation.mutateAsync({
        ...formData,
        IDUtilisateurOrigine: user?.id || null
      });

      // Reset form
      setFormData({
        Titre: '',
        Message: '',
        TypeNotification: 'info',
        Cible: 'Tous',
        IDUtilisateurDestinataire: null
      });

      onClose();
    } catch (error) {
      console.error('Erreur lors de la création:', error);
    }
  };

  const handleClose = () => {
    setFormData({
      Titre: '',
      Message: '',
      TypeNotification: 'info',
      Cible: 'Tous',
      IDUtilisateurDestinataire: null
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Créer une notification</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="titre">Titre *</Label>
            <Input
              id="titre"
              value={formData.Titre}
              onChange={(e) => setFormData(prev => ({ ...prev, Titre: e.target.value }))}
              placeholder="Titre de la notification"
              required
            />
          </div>

          <div>
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              value={formData.Message}
              onChange={(e) => setFormData(prev => ({ ...prev, Message: e.target.value }))}
              placeholder="Contenu de la notification"
              rows={4}
              required
            />
          </div>

          <div>
            <Label htmlFor="type">Type</Label>
            <Select
              value={formData.TypeNotification}
              onValueChange={(value) => setFormData(prev => ({ 
                ...prev, 
                TypeNotification: value as typeof formData.TypeNotification 
              }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="info">Information</SelectItem>
                <SelectItem value="success">Succès</SelectItem>
                <SelectItem value="warning">Avertissement</SelectItem>
                <SelectItem value="error">Erreur</SelectItem>
                <SelectItem value="system">Système</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="cible">Destinataires</Label>
            <Select
              value={formData.Cible}
              onValueChange={(value) => setFormData(prev => ({ 
                ...prev, 
                Cible: value as typeof formData.Cible 
              }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tous">Tous les utilisateurs</SelectItem>
                <SelectItem value="Admin">Administrateurs</SelectItem>
                <SelectItem value="Aidant">Aidants</SelectItem>
                <SelectItem value="Senior">Seniors</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Annuler
            </Button>
            <Button 
              type="submit" 
              disabled={createNotificationMutation.isPending || !formData.Titre.trim() || !formData.Message.trim()}
            >
              {createNotificationMutation.isPending ? "Création..." : "Créer"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNotificationModal;
