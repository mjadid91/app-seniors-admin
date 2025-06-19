
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, Calendar, Users, MessageCircle, Shield } from "lucide-react";
import { GroupMessage } from './types';
import { getStatutBadgeColor } from './utils';

interface ViewGroupMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: GroupMessage | null;
  onModerate?: (message: GroupMessage) => void;
}

const ViewGroupMessageModal = ({ isOpen, onClose, message, onModerate }: ViewGroupMessageModalProps) => {
  if (!message) return null;

  const handleModerate = () => {
    if (onModerate) {
      onModerate(message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-blue-600" />
            Détails du message de groupe
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-slate-500" />
                  <div>
                    <p className="text-sm text-slate-600">Auteur</p>
                    <p className="font-medium text-slate-800">{message.auteur}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-slate-500" />
                  <div>
                    <p className="text-sm text-slate-600">Groupe</p>
                    <p className="font-medium text-slate-800">{message.groupe}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-slate-500" />
                  <div>
                    <p className="text-sm text-slate-600">Date d'envoi</p>
                    <p className="font-medium text-slate-800">
                      {new Date(message.dateEnvoi).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-slate-600 mb-2">Signalements</p>
                  {message.signalements > 0 ? (
                    <Badge className="bg-red-100 text-red-700 border-red-200">
                      {message.signalements}
                    </Badge>
                  ) : (
                    <span className="text-slate-400">0</span>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-slate-600 mb-2">Statut</p>
                <Badge className={getStatutBadgeColor(message.statut)}>
                  {message.statut}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold text-slate-800 mb-2">Contenu du message</h4>
              <p className="text-slate-600 bg-slate-50 p-3 rounded-lg">
                {message.contenu}
              </p>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Fermer
            </Button>
            <Button onClick={handleModerate} className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Modérer le message
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewGroupMessageModal;
