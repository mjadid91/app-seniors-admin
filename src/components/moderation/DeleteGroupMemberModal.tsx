
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface DeleteGroupMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: { id: string; nom: string; prenom: string; groupeId: string } | null;
  onSuccess: () => void;
}

const DeleteGroupMemberModal = ({ isOpen, onClose, member, onSuccess }: DeleteGroupMemberModalProps) => {
  const { toast } = useToast();

  const handleDelete = async () => {
    if (!member) return;

    try {
      const { error } = await supabase
        .from('Utilisateurs_Groupe')
        .delete()
        .eq('IDUtilisateurs', parseInt(member.id))
        .eq('IDGroupe', parseInt(member.groupeId));

      if (error) throw error;

      toast({
        title: "Membre supprimé",
        description: `${member.prenom} ${member.nom} a été retiré du groupe`,
        variant: "destructive"
      });

      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Erreur lors de la suppression du membre:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le membre du groupe",
        variant: "destructive"
      });
    }
  };

  if (!member) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Supprimer le membre
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800 mb-2">
              <strong>Attention :</strong> Cette action retirera définitivement le membre du groupe.
            </p>
            <div className="mt-3 p-2 bg-red-100 rounded border-l-4 border-red-400">
              <p className="text-sm font-medium text-red-800">
                Membre : <span className="font-mono">{member.prenom} {member.nom}</span>
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Supprimer le membre
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteGroupMemberModal;
