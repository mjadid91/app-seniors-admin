
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { GroupMessage } from './types';
import { getStatutBadgeColor } from './utils';

interface GroupMessagesTableProps {
  groupMessages: GroupMessage[];
  setGroupMessages: React.Dispatch<React.SetStateAction<GroupMessage[]>>;
}

const GroupMessagesTable = ({ groupMessages, setGroupMessages }: GroupMessagesTableProps) => {
  const { toast } = useToast();

  const handleVoirMessage = (message: GroupMessage) => {
    toast({
      title: "Voir le message",
      description: `Ouverture du message de ${message.auteur}`,
    });
    console.log("Voir message:", message);
  };

  const handleMasquerMessage = (message: GroupMessage) => {
    setGroupMessages(prev => prev.map(m => 
      m.id === message.id ? { ...m, statut: 'masque' as const } : m
    ));
    toast({
      title: "Message masqué",
      description: `Le message de ${message.auteur} a été masqué`,
    });
  };

  const handleSupprimerMessage = (message: GroupMessage) => {
    setGroupMessages(prev => prev.filter(m => m.id !== message.id));
    toast({
      title: "Message supprimé",
      description: `Le message de ${message.auteur} a été supprimé`,
      variant: "destructive"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Messages de groupes</CardTitle>
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
                    <p className="text-slate-800 max-w-xs truncate">{message.contenu}</p>
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
                        onClick={() => handleMasquerMessage(message)}
                      >
                        <EyeOff className="h-4 w-4" />
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
  );
};

export default GroupMessagesTable;
