
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface DeleteGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  group: { id: string; titre: string } | null;
  onSuccess: () => void;
}

const DeleteGroupModal = ({ isOpen, onClose, group, onSuccess }: DeleteGroupModalProps) => {
  const { toast } = useToast();

  const handleDelete = async () => {
    if (!group) return;

    try {
      const groupId = parseInt(group.id);

      console.log('Début suppression groupe:', groupId);

      // 1. D'abord, récupérer tous les messages du groupe pour supprimer leurs signalements
      const { data: messages, error: messagesSelectError } = await supabase
        .from('MessageGroupe')
        .select('IDMessageGroupe')
        .eq('IDGroupe', groupId);

      if (messagesSelectError) {
        console.error('Erreur lors de la récupération des messages:', messagesSelectError);
        throw messagesSelectError;
      }

      // 2. Supprimer tous les signalements liés aux messages du groupe
      if (messages && messages.length > 0) {
        const messageIds = messages.map(msg => msg.IDMessageGroupe);
        
        const { error: signalError } = await supabase
          .from('SignalementContenu')
          .delete()
          .in('IDMessageGroupe', messageIds);

        if (signalError) {
          console.error('Erreur lors de la suppression des signalements:', signalError);
          // Continue même en cas d'erreur sur les signalements
        } else {
          console.log('Signalements supprimés pour les messages:', messageIds);
        }
      }

      // 3. Supprimer tous les messages du groupe
      const { error: messagesError } = await supabase
        .from('MessageGroupe')
        .delete()
        .eq('IDGroupe', groupId);

      if (messagesError) {
        console.error('Erreur lors de la suppression des messages:', messagesError);
        throw messagesError;
      } else {
        console.log('Messages du groupe supprimés');
      }

      // 4. Supprimer tous les membres du groupe
      const { error: membersError } = await supabase
        .from('Utilisateurs_Groupe')
        .delete()
        .eq('IDGroupe', groupId);

      if (membersError) {
        console.error('Erreur lors de la suppression des membres:', membersError);
        throw membersError;
      } else {
        console.log('Membres du groupe supprimés');
      }

      // 5. Enfin supprimer le groupe lui-même
      const { error: groupError } = await supabase
        .from('Groupe')
        .delete()
        .eq('IDGroupe', groupId);

      if (groupError) {
        console.error('Erreur lors de la suppression du groupe:', groupError);
        throw groupError;
      }

      console.log('Groupe supprimé avec succès:', groupId);

      toast({
        title: "Groupe supprimé",
        description: `Le groupe "${group.titre}" et tout son contenu ont été supprimés définitivement`,
        variant: "destructive"
      });

      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Erreur lors de la suppression du groupe:', error);
      toast({
        title: "Erreur",
        description: `Impossible de supprimer le groupe: ${error.message}`,
        variant: "destructive"
      });
    }
  };

  if (!group) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Supprimer le groupe
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800 mb-2">
              <strong>Attention :</strong> Cette action est irréversible.
            </p>
            <p className="text-sm text-red-700 mb-2">
              Cette action supprimera définitivement :
            </p>
            <ul className="text-sm text-red-700 ml-4 list-disc">
              <li>Le groupe et sa configuration</li>
              <li>Tous les messages du groupe</li>
              <li>Tous les signalements liés aux messages</li>
              <li>Tous les membres du groupe</li>
            </ul>
            <div className="mt-3 p-2 bg-red-100 rounded border-l-4 border-red-400">
              <p className="text-sm font-medium text-red-800">
                Groupe : <span className="font-mono">{group.titre}</span>
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Confirmer la suppression
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteGroupModal;
