
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Check, X, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useModerationActions } from "../../hooks/useModerationActions";

interface Signalement {
  IDSignalement: number;
  IDMessageGroupe?: number;
  IDReponseForum?: number;
  IDUtilisateurSignaleur: number;
  Motif: string;
  DateSignalement: string;
  Traite: boolean;
  ActionModeration?: string;
  SignaleurNom?: string;
  SignaleurPrenom?: string;
  ContenuSignale?: string;
  TypeContenu?: 'forum' | 'group';
}

interface SignalementsTableProps {
  refreshTrigger?: number;
}

const SignalementsTable = ({ refreshTrigger }: SignalementsTableProps) => {
  const { toast } = useToast();
  const { markAsProcessed, hideContent, isProcessing } = useModerationActions();

  const { data: signalements = [], refetch } = useQuery({
    queryKey: ['signalements', refreshTrigger],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('SignalementContenu')
        .select(`
          IDSignalement,
          IDMessageGroupe,
          IDReponseForum,
          IDUtilisateurSignaleur,
          Motif,
          DateSignalement,
          Traite,
          ActionModeration,
          Utilisateurs!inner(Nom, Prenom)
        `)
        .order('DateSignalement', { ascending: false });
      
      if (error) throw error;

      // Enrichir avec le contenu signalé
      const enrichedData = await Promise.all(
        data.map(async (signalement) => {
          let contenuSignale = '';
          let typeContenu: 'forum' | 'group' = 'group';

          if (signalement.IDMessageGroupe) {
            const { data: messageData } = await supabase
              .from('MessageGroupe')
              .select('Contenu')
              .eq('IDMessageGroupe', signalement.IDMessageGroupe)
              .single();
            
            contenuSignale = messageData?.Contenu || 'Contenu supprimé';
            typeContenu = 'group';
          } else if (signalement.IDReponseForum) {
            const { data: reponseData } = await supabase
              .from('ReponseForum')
              .select('ContenuReponse')
              .eq('IDReponseForum', signalement.IDReponseForum)
              .single();
            
            contenuSignale = reponseData?.ContenuReponse || 'Contenu supprimé';
            typeContenu = 'forum';
          }

          return {
            ...signalement,
            SignaleurNom: signalement.Utilisateurs?.Nom,
            SignaleurPrenom: signalement.Utilisateurs?.Prenom,
            ContenuSignale: contenuSignale,
            TypeContenu: typeContenu
          };
        })
      );

      return enrichedData as Signalement[];
    }
  });

  const handleMarquerTraite = async (signalement: Signalement) => {
    const itemId = signalement.IDMessageGroupe?.toString() || signalement.IDReponseForum?.toString() || '';
    const success = await markAsProcessed(signalement.TypeContenu!, itemId);
    
    if (success) {
      refetch();
      toast({
        title: "Signalement traité",
        description: "Le signalement a été marqué comme traité"
      });
    }
  };

  const handleMasquerContenu = async (signalement: Signalement) => {
    const itemId = signalement.IDMessageGroupe?.toString() || signalement.IDReponseForum?.toString() || '';
    const success = await hideContent(signalement.TypeContenu!, itemId);
    
    if (success) {
      refetch();
      toast({
        title: "Contenu masqué",
        description: "Le contenu a été masqué avec succès"
      });
    }
  };

  const getStatutBadge = (traite: boolean) => {
    if (traite) {
      return <Badge className="bg-green-100 text-green-700 border-green-200">Traité</Badge>;
    }
    return <Badge className="bg-red-100 text-red-700 border-red-200">En attente</Badge>;
  };

  const getTypeBadge = (type: string) => {
    if (type === 'forum') {
      return <Badge variant="outline" className="bg-blue-50 text-blue-700">Forum</Badge>;
    }
    return <Badge variant="outline" className="bg-purple-50 text-purple-700">Groupe</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-600" />
          Signalements ({signalements.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-medium text-slate-700">ID</th>
                <th className="text-left py-3 px-4 font-medium text-slate-700">Type</th>
                <th className="text-left py-3 px-4 font-medium text-slate-700">Motif</th>
                <th className="text-left py-3 px-4 font-medium text-slate-700">Signaleur</th>
                <th className="text-left py-3 px-4 font-medium text-slate-700">Date</th>
                <th className="text-left py-3 px-4 font-medium text-slate-700">Contenu</th>
                <th className="text-left py-3 px-4 font-medium text-slate-700">Statut</th>
                <th className="text-left py-3 px-4 font-medium text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {signalements.map((signalement) => (
                <tr key={signalement.IDSignalement} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-4 text-slate-600">#{signalement.IDSignalement}</td>
                  <td className="py-4 px-4">
                    {getTypeBadge(signalement.TypeContenu!)}
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-medium text-slate-800">{signalement.Motif}</span>
                  </td>
                  <td className="py-4 px-4 text-slate-600">
                    {signalement.SignaleurPrenom} {signalement.SignaleurNom}
                  </td>
                  <td className="py-4 px-4 text-slate-600">
                    {new Date(signalement.DateSignalement).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="py-4 px-4">
                    <div className="max-w-xs">
                      <p className="text-sm text-slate-600 truncate">
                        {signalement.ContenuSignale?.substring(0, 80)}...
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    {getStatutBadge(signalement.Traite)}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {!signalement.Traite && (
                        <>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            title="Marquer comme traité"
                            onClick={() => handleMarquerTraite(signalement)}
                            disabled={isProcessing}
                          >
                            <Check className="h-4 w-4 text-green-600" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            title="Masquer le contenu"
                            onClick={() => handleMasquerContenu(signalement)}
                            disabled={isProcessing}
                            className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      {signalement.ActionModeration && (
                        <span className="text-xs text-slate-500">
                          {signalement.ActionModeration}
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {signalements.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              Aucun signalement trouvé
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SignalementsTable;
