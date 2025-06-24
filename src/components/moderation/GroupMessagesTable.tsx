
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Trash2, Archive } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { GroupMessage } from './types';
import { getStatutBadgeColor } from './utils';
import ViewGroupMessageModal from './ViewGroupMessageModal';
import ModerationActionsModal from './ModerationActionsModal';

interface GroupMessagesTableProps {
  groupMessages: GroupMessage[];
  setGroupMessages: React.Dispatch<React.SetStateAction<GroupMessage[]>>;
}

const GroupMessagesTable = ({ groupMessages, setGroupMessages }: GroupMessagesTableProps) => {
  const { toast } = useToast();
  const [selectedMessage, setSelectedMessage] = useState<GroupMessage | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isModerationModalOpen, setIsModerationModalOpen] = useState(false);

  const handleVoirMessage = (message: GroupMessage) => {
    setSelectedMessage(message);
    setIsViewModalOpen(true);
    toast({
      title: "Voir le message",
      description: "Ouverture du message de groupe",
    });
    console.log("Voir message:", message);
  };

  const handleModerateMessage = (message: GroupMessage) => {
    setSelectedMessage(message);
    setIsModerationModalOpen(true);
  };

  const handleModerationAction = async (messageId: string, action: string, reason?: string) => {
    console.log(`Action de modération: ${action} sur le message ${messageId}`, { reason });
    
    if (action === 'supprime') {
      setGroupMessages(prev => prev.filter(m => m.id !== messageId));
    } else if (['visible', 'masque'].includes(action)) {
      setGroupMessages(prev =>
        prev.map(m =>
          m.id === messageId ? { ...m, statut: action as 'visible' | 'masque' } : m
        )
      );
    }
  };

  const handleStatutChange = (messageId: string, statut: string) => {
    if (['visible', 'masque', 'supprime'].includes(statut)) {
      setGroupMessages(prev =>
        prev.map(m =>
          m.id === messageId ? { ...m, statut: statut as GroupMessage['statut'] } : m
        )
      );
    }
  };

  const handleArchiverMessage = (message: GroupMessage) => {
    handleStatutChange(message.id, 'masque');
    toast({
      title: "Message masqué",
      description: "Le message a été masqué",
    });
  };

  const handleSupprimerMessage = (message: GroupMessage) => {
    setGroupMessages(prev => prev.filter(m => m.id !== message.id));
    toast({
      title: "Message supprimé",
      description: "Le message a été supprimé définitivement",
      variant: "destructive"
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Messages de groupe</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Contenu</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Auteur</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Groupe</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Signalements</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Statut</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {groupMessages.map((message) => (
                  <tr key={message.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-4">
                      <p className="font-medium text-slate-800 truncate max-w-xs">
                        {message.contenu.substring(0, 100)}...
                      </p>
                      <p className="text-sm text-slate-500">ID: {message.id}</p>
                    </td>
                    <td className="py-4 px-4 text-slate-600">{message.auteur}</td>
                    <td className="py-4 px-4 text-slate-600">{message.groupe}</td>
                    <td className="py-4 px-4 text-slate-600">
                      {new Date(message.dateEnvoi).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="py-4 px-4">
                      {message.signalements > 0 ? (
                        <Badge className="bg-red-100 text-red-700 border-red-200">
                          {message.signalements}
                        </Badge>
                      ) : (
                        <span className="text-slate-400">0</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getStatutBadgeColor(message.statut)}>
                        {message.statut}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          title="Voir"
                          onClick={() => handleVoirMessage(message)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          title="Masquer"
                          onClick={() => handleArchiverMessage(message)}
                        >
                          <Archive className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-600 hover:text-red-700 hover:bg-red-50" 
                          title="Supprimer"
                          onClick={() => handleSupprimerMessage(message)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <ViewGroupMessageModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        message={selectedMessage}
        onModerate={handleModerateMessage}
      />

      <ModerationActionsModal
        isOpen={isModerationModalOpen}
        onClose={() => setIsModerationModalOpen(false)}
        item={selectedMessage}
        type="group"
        onAction={handleModerationAction}
      />
    </>
  );
};

export default GroupMessagesTable;
