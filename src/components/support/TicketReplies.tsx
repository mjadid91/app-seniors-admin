
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { SupportReply } from "@/hooks/useSupportReplies";

interface TicketRepliesProps {
  replies: SupportReply[];
  isLoading: boolean;
}

const TicketReplies = ({ replies, isLoading }: TicketRepliesProps) => {
  const handleDownloadFile = (fileUrl: string, fileName: string) => {
    window.open(fileUrl, '_blank');
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-16 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (replies.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-gray-500">
          Aucune réponse pour ce ticket.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">
        Fil de discussion ({replies.length} réponse{replies.length > 1 ? 's' : ''})
      </h3>
      
      {replies.map((reply) => (
        <Card key={reply.IDReponse} className={`${reply.is_support ? 'border-l-4 border-l-blue-500 bg-blue-50' : 'border-l-4 border-l-gray-300'}`}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-medium text-slate-800">
                  {reply.auteur_prenom} {reply.auteur_nom}
                </span>
                <Badge variant={reply.is_support ? "default" : "secondary"}>
                  {reply.is_support ? "Support" : "Client"}
                </Badge>
              </div>
              <span className="text-sm text-slate-500">
                {new Date(reply.DateReponse).toLocaleDateString('fr-FR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            <div className="whitespace-pre-wrap text-slate-700 mb-3">
              {reply.Contenu}
            </div>
            
            {reply.FichierJoint && (
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border">
                <FileText className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-700 flex-1">
                  Fichier joint
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownloadFile(reply.FichierJoint!, `fichier-ticket-${reply.IDTicketClient}`)}
                >
                  <Download className="h-4 w-4 mr-1" />
                  Télécharger
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TicketReplies;
