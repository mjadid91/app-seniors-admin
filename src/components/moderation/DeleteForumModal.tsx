
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface DeleteForumModalProps {
  isOpen: boolean;
  onClose: () => void;
  forum: { IDForum: number; TitreForum: string } | null;
  onSuccess: () => void;
}

const DeleteForumModal = ({ isOpen, onClose, forum, onSuccess }: DeleteForumModalProps) => {
  const { toast } = useToast();

  const handleDelete = async () => {
    if (!forum) return;

    try {
      // Supprimer d'abord toutes les réponses des sujets de ce forum
      const { data: sujets, error: sujetsError } = await supabase
        .from('SujetForum')
        .select('IDSujetForum')
        .eq('IDForum', forum.IDForum);

      if (sujetsError) throw sujetsError;

      if (sujets && sujets.length > 0) {
        const sujetIds = sujets.map(s => s.IDSujetForum);
        
        // Supprimer toutes les réponses des sujets
        const { error: repliesError } = await supabase
          .from('ReponseForum')
          .delete()
          .in('IDSujetForum', sujetIds);

        if (repliesError) {
          console.error('Erreur lors de la suppression des réponses:', repliesError);
        }
      }

      // Supprimer tous les sujets du forum
      const { error: sujetsDeleteError } = await supabase
        .from('SujetForum')
        .delete()
        .eq('IDForum', forum.IDForum);

      if (sujetsDeleteError) throw sujetsDeleteError;

      // Enfin supprimer le forum
      const { error: forumError } = await supabase
        .from('Forum')
        .delete()
        .eq('IDForum', forum.IDForum);

      if (forumError) throw forumError;

      toast({
        title: "Forum supprimé",
        description: `Le forum "${forum.TitreForum}" et tout son contenu ont été supprimés`,
        variant: "destructive"
      });

      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Erreur lors de la suppression du forum:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le forum",
        variant: "destructive"
      });
    }
  };

  if (!forum) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Supprimer le forum
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800 mb-2">
              <strong>Attention :</strong> Cette action est irréversible.
            </p>
            <p className="text-sm text-red-700">
              Cette action supprimera définitivement le forum, tous ses sujets et toutes les réponses associées.
            </p>
            <div className="mt-3 p-2 bg-red-100 rounded border-l-4 border-red-400">
              <p className="text-sm font-medium text-red-800">
                Forum à supprimer : <span className="font-mono">{forum.TitreForum}</span>
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

export default DeleteForumModal;
