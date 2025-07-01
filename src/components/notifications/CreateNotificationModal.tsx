
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCreateNotification } from '@/hooks/useNotifications';
import { useAuthStore } from '@/stores/authStore';
import { useToast } from '@/hooks/use-toast';

interface CreateNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateNotificationModal = ({ isOpen, onClose }: CreateNotificationModalProps) => {
  const { user } = useAuthStore();
  const { toast } = useToast();
  const createNotificationMutation = useCreateNotification();

  const [titre, setTitre] = useState('');
  const [message, setMessage] = useState('');
  const [destinataireId, setDestinataireId] = useState('');
  const [type, setType] = useState('info');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.id) return;

    try {
      await createNotificationMutation.mutateAsync({
        titre,
        message,
        destinataireId: parseInt(destinataireId),
        expediteurId: parseInt(user.id),
        type,
      });

      toast({
        title: 'Notification créée',
        description: 'La notification a été envoyée avec succès',
      });

      onClose();
      setTitre('');
      setMessage('');
      setDestinataireId('');
      setType('info');
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de créer la notification',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Créer une notification</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Titre</label>
            <Input
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              placeholder="Titre de la notification"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message de la notification"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">ID Destinataire</label>
            <Input
              value={destinataireId}
              onChange={(e) => setDestinataireId(e.target.value)}
              placeholder="ID de l'utilisateur destinataire"
              type="number"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="info">Information</SelectItem>
                <SelectItem value="warning">Avertissement</SelectItem>
                <SelectItem value="success">Succès</SelectItem>
                <SelectItem value="error">Erreur</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={createNotificationMutation.isPending}>
              {createNotificationMutation.isPending ? 'Création...' : 'Créer'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNotificationModal;
