
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useModerationActions = () => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const markAsProcessed = async (type: 'forum' | 'group', itemId: string) => {
    setIsProcessing(true);
    
    try {
      const column = type === 'forum' ? 'IDReponseForum' : 'IDMessageGroupe';
      
      const { error } = await supabase
        .from('SignalementContenu')
        .update({ 
          Traité: true,
          ActionModeration: 'Traité par modérateur'
        })
        .eq(column, parseInt(itemId));

      if (error) throw error;

      toast({
        title: "Signalement traité",
        description: "Le signalement a été marqué comme traité"
      });

      return true;
    } catch (error: any) {
      console.error('Erreur lors du traitement:', error);
      toast({
        title: "Erreur",
        description: "Impossible de traiter le signalement",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const hideContent = async (type: 'forum' | 'group', itemId: string) => {
    setIsProcessing(true);
    
    try {
      const column = type === 'forum' ? 'IDReponseForum' : 'IDMessageGroupe';
      const table = type === 'forum' ? 'ReponseForum' : 'MessageGroupe';
      const idColumn = type === 'forum' ? 'IDReponseForum' : 'IDMessageGroupe';
      const contentColumn = type === 'forum' ? 'ContenuReponse' : 'Contenu';
      
      const itemIdNum = parseInt(itemId);
      
      // Marquer le contenu comme supprimé/masqué
      const hideResult = await supabase
        .from(table)
        .update({ 
          [contentColumn]: '[Contenu masqué par la modération]'
        })
        .eq(idColumn, itemIdNum);

      if (hideResult.error) throw hideResult.error;

      // Marquer le signalement comme traité
      const signalResult = await supabase
        .from('SignalementContenu')
        .update({ 
          Traité: true,
          ActionModeration: 'Contenu masqué'
        })
        .eq(column, itemIdNum);

      if (signalResult.error) throw signalResult.error;

      toast({
        title: "Contenu masqué",
        description: "Le contenu a été masqué et le signalement traité"
      });

      return true;
    } catch (error: any) {
      console.error('Erreur lors du masquage:', error);
      toast({
        title: "Erreur",
        description: "Impossible de masquer le contenu",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    markAsProcessed,
    hideContent,
    isProcessing
  };
};
