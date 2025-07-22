
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

      // Supprimer d'abord les messages du groupe
      const { error: messagesError } = await supabase
        .from('MessageGroupe')
        .delete()
        .eq('IDGroupe', groupId);

      if (messagesError) {
        console.error('Erreur lors de la suppression des messages:', messagesError);
      }

      // Supprimer les membres du groupe
      const { error: membersError } = await supabase
        .from('Utilisateurs_Groupe')
        .delete()
        .eq('IDGroupe', groupId);

      if (membersError) {
        console.error('Erreur lors de la suppression des membres:', membersError);
      }

      // Supprimer les signalements liés aux messages du groupe
      const { error: signalError } = await supabase
        .from('SignalementContenu')
        .delete()
        .eq('IDMessageGroupe', groupId);

      if (signalError) {
        console.error('Erreur lors de la suppression des signalements:', signalError);
      }

      // Enfin supprimer le groupe
      const { error: groupError } = await supabase
        .from('Groupe')
        .delete()
        .eq('IDGroupe', groupId);

      if (groupError) throw groupError;

      toast({
        title: "Groupe supprimé",
        description: `Le groupe "${group.titre}" et tout son contenu ont été supprimés`,
        variant: "destructive"
      });

      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Erreur lors de la suppression du groupe:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le groupe",
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
            <p className="text-sm text-red-700">
              Cette action supprimera définitivement le groupe, tous ses messages, membres et signalements associés.
            </p>
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
