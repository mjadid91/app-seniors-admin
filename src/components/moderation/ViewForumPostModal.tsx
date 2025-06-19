
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, Calendar, MessageSquare, Shield } from "lucide-react";
import { ForumPost } from './types';
import { getStatutBadgeColor } from './utils';

interface ViewForumPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: ForumPost | null;
  onModerate?: (post: ForumPost) => void;
}

const ViewForumPostModal = ({ isOpen, onClose, post, onModerate }: ViewForumPostModalProps) => {
  if (!post) return null;

  const handleModerate = () => {
    if (onModerate) {
      onModerate(post);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-600" />
            Détails du sujet de forum
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">{post.titre}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-slate-500" />
                  <div>
                    <p className="text-sm text-slate-600">Auteur</p>
                    <p className="font-medium text-slate-800">{post.auteur}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-slate-500" />
                  <div>
                    <p className="text-sm text-slate-600">Date de création</p>
                    <p className="font-medium text-slate-800">
                      {new Date(post.dateCreation).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-slate-600 mb-2">Statut</p>
              <Badge className={getStatutBadgeColor(post.statut)}>
                {post.statut}
              </Badge>
            </div>

            <div>
              <p className="text-sm text-slate-600 mb-2">Réponses</p>
              <p className="font-medium text-slate-800">{post.nbReponses}</p>
            </div>

            <div>
              <p className="text-sm text-slate-600 mb-2">Signalements</p>
              {post.signalements > 0 ? (
                <Badge className="bg-red-100 text-red-700 border-red-200">
                  {post.signalements}
                </Badge>
              ) : (
                <span className="text-slate-400">0</span>
              )}
            </div>
          </div>

          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold text-slate-800 mb-2">Contenu du sujet</h4>
              <p className="text-slate-600">
                Contenu détaillé du sujet de forum. Ceci est un exemple de contenu 
                qui pourrait contenir le texte complet du sujet posté par l'utilisateur.
              </p>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Fermer
            </Button>
            <Button onClick={handleModerate} className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Modérer le sujet
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewForumPostModal;
