import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, Calendar, Settings } from "lucide-react";
import { ForumPost } from './types';

interface ViewForumPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: ForumPost | null;
  onModerate: (post: ForumPost) => void;
}

const ViewForumPostModal = ({ isOpen, onClose, post, onModerate }: ViewForumPostModalProps) => {
  if (!post) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{post?.titre}</DialogTitle>
          <DialogDescription>
            Détails et contenu du sujet de forum sélectionné.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{post.titre}</h3>
                </div>

                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Auteur : {post.auteur}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Date : {new Date(post.dateCreation).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <span className="font-medium">Réponses : {post.nbReponses}</span>
                  <span className="font-medium">Signalements : {post.signalements}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center pt-4">
            <Button variant="outline" onClick={onClose}>
              Fermer
            </Button>
            <Button 
              onClick={() => onModerate(post)}
              className="flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              Modérer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewForumPostModal;
