
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, Calendar, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ForumPost } from './types';
import { useForumReplies } from './useForumReplies';
import AddForumReplyModal from './AddForumReplyModal';
import ConfirmDeleteDialog from '../rgpd/ConfirmDeleteDialog';

interface ViewForumRepliesModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: ForumPost | null;
}

const ViewForumRepliesModal = ({ isOpen, onClose, post }: ViewForumRepliesModalProps) => {
  const { toast } = useToast();
  const [isAddReplyModalOpen, setIsAddReplyModalOpen] = useState(false);
  const [deleteReplyId, setDeleteReplyId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const { data: replies = [], refetch } = useForumReplies(post?.id);

  const handleDeleteReply = async () => {
    if (!deleteReplyId) return;
    
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('ReponseForum')
        .delete()
        .eq('IDReponseForum', parseInt(deleteReplyId));

      if (error) throw error;

      toast({
        title: "Réponse supprimée",
        description: "La réponse a été supprimée avec succès"
      });

      refetch();
      setDeleteReplyId(null);
    } catch (error: any) {
      console.error('Erreur lors de la suppression:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la réponse",
        variant: "destructive"
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (!post) return null;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Réponses au sujet : {post.titre}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                {replies.length} réponse{replies.length !== 1 ? 's' : ''}
              </h3>
              <Button 
                onClick={() => setIsAddReplyModalOpen(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Ajouter une réponse
              </Button>
            </div>

            <div className="space-y-4">
              {replies.length === 0 ? (
                <Card>
                  <CardContent className="p-6 text-center text-slate-500">
                    Aucune réponse pour ce sujet
                  </CardContent>
                </Card>
              ) : (
                replies.map((reply) => (
                  <Card key={reply.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-3">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-slate-500" />
                              <span className="font-medium">{reply.auteur}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-slate-500" />
                              <span className="text-sm text-slate-600">
                                {new Date(reply.dateReponse).toLocaleDateString('fr-FR')}
                              </span>
                            </div>
                          </div>
                          <div className="prose max-w-none">
                            <p className="text-slate-700 whitespace-pre-wrap">{reply.contenu}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => setDeleteReplyId(reply.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            <div className="flex justify-end">
              <Button variant="outline" onClick={onClose}>
                Fermer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AddForumReplyModal
        isOpen={isAddReplyModalOpen}
        onClose={() => setIsAddReplyModalOpen(false)}
        sujetId={post?.id}
        onSuccess={() => {
          refetch();
          setIsAddReplyModalOpen(false);
        }}
      />

      <ConfirmDeleteDialog
        isOpen={!!deleteReplyId}
        onClose={() => setDeleteReplyId(null)}
        onConfirm={handleDeleteReply}
        title="Supprimer la réponse"
        description="Cette action supprimera définitivement cette réponse du forum."
        isLoading={isDeleting}
      />
    </>
  );
};

export default ViewForumRepliesModal;
