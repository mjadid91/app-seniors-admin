
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
          Traite: true,
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
      const itemIdNum = parseInt(itemId);
      
      // Marquer le contenu comme supprimé/masqué - use separate operations for each type
      if (type === 'forum') {
        const { error: hideError } = await supabase
          .from('ReponseForum')
          .update({ 
            ContenuReponse: '[Contenu masqué par la modération]'
          })
          .eq('IDReponseForum', itemIdNum);

        if (hideError) throw hideError;

        // Marquer le signalement comme traité
        const { error: signalError } = await supabase
          .from('SignalementContenu')
          .update({ 
            Traite: true,
            ActionModeration: 'Contenu masqué'
          })
          .eq('IDReponseForum', itemIdNum);

        if (signalError) throw signalError;
      } else {
        const { error: hideError } = await supabase
          .from('MessageGroupe')
          .update({ 
            Contenu: '[Contenu masqué par la modération]'
          })
          .eq('IDMessageGroupe', itemIdNum);

        if (hideError) throw hideError;

        // Marquer le signalement comme traité
        const { error: signalError } = await supabase
          .from('SignalementContenu')
          .update({ 
            Traite: true,
            ActionModeration: 'Contenu masqué'
          })
          .eq('IDMessageGroupe', itemIdNum);

        if (signalError) throw signalError;
      }

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
