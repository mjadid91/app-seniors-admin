
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Eye, EyeOff, Archive, Trash2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ForumPost, GroupMessage } from './types';
import { getStatutBadgeColor } from './utils';
import { useModerationActions } from '@/hooks/useModerationActions';
import { markSignalementAsTraited } from '@/hooks/useSignalements';

interface ModerationActionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: ForumPost | GroupMessage | null;
  type: 'forum' | 'group';
  onAction: (itemId: string, action: string, reason?: string) => void;
}

const ModerationActionsModal = ({ isOpen, onClose, item, type, onAction }: ModerationActionsModalProps) => {
  const { toast } = useToast();
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { deleteContent } = useModerationActions();

  if (!item) return null;

  const handleAction = async (action: string) => {
    if (!reason.trim() && (action === 'masque' || action === 'archive' || action === 'supprime')) {
      toast({
        title: "Raison requise",
        description: "Veuillez fournir une raison pour cette action de modération",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      if (action === 'marquer_traite') {
        await markSignalementAsTraited(type, item.id);
        toast({
          title: "Action effectuée",
          description: "Le signalement a été marqué comme traité"
        });
      } else if (action === 'supprime') {
        // Utiliser la nouvelle fonction qui gère les signalements
        await deleteContent(type, item.id);
      } else {
        await onAction(item.id, action, reason);
        
        const actionLabels = {
          'visible': 'rendu visible',
          'masque': 'masqué',
          'archive': 'archivé'
        };

        toast({
          title: "Action effectuée",
          description: `Le ${type === 'forum' ? 'sujet' : 'message'} a été ${actionLabels[action as keyof typeof actionLabels]}`,
        });
      }

      onClose();
      setReason("");
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'action de modération",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTitle = () => {
    if ('titre' in item) return item.titre;
    return `Message de ${item.auteur}`;
  };

  const getContent = () => {
    if ('titre' in item) return "Contenu du sujet de forum...";
    return item.contenu;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            Actions de modération
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-slate-800 mb-2">{getTitle()}</h3>
              <div className="flex items-center gap-4 mb-3">
                <span className="text-sm text-slate-600">Auteur: {item.auteur}</span>
                <Badge className={getStatutBadgeColor(item.statut)}>
                  {item.statut}
                </Badge>
                {item.signalements > 0 && (
                  <Badge className="bg-red-100 text-red-700 border-red-200">
                    {item.signalements} signalement(s)
                  </Badge>
                )}
              </div>
              <div className="bg-slate-50 p-3 rounded-lg">
                <p className="text-slate-600 text-sm">{getContent()}</p>
              </div>
            </CardContent>
          </Card>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Raison de la modération (obligatoire pour masquer, archiver ou supprimer)
            </label>
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Expliquez la raison de cette action de modération..."
              className="min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <Button
              onClick={() => handleAction('visible')}
              disabled={isSubmitting || item.statut === 'visible'}
              className="flex items-center gap-2"
              variant="outline"
            >
              <Eye className="h-4 w-4" />
              Rendre visible
            </Button>

            <Button
              onClick={() => handleAction('masque')}
              disabled={isSubmitting || item.statut === 'masque'}
              className="flex items-center gap-2"
              variant="outline"
            >
              <EyeOff className="h-4 w-4" />
              Masquer
            </Button>

            <Button
              onClick={() => handleAction('archive')}
              disabled={isSubmitting || item.statut === 'archive'}
              className="flex items-center gap-2"
              variant="outline"
            >
              <Archive className="h-4 w-4" />
              Archiver
            </Button>

            <Button
              onClick={() => handleAction('supprime')}
              disabled={isSubmitting}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
              variant="outline"
            >
              <Trash2 className="h-4 w-4" />
              Supprimer
            </Button>

            <Button
              onClick={() => handleAction('marquer_traite')}
              disabled={isSubmitting}
              className="flex items-center gap-2 text-green-600 hover:text-green-700 hover:bg-green-50"
              variant="outline"
            >
              <CheckCircle className="h-4 w-4" />
              Marquer comme traité
            </Button>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button 
              variant="outline" 
              onClick={onClose}
              disabled={isSubmitting}
            >
              Annuler
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModerationActionsModal;
