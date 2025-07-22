
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
      const itemIdNum = parseInt(itemId);
      
      if (type === 'forum') {
        const { error: hideError } = await supabase
          .from('ReponseForum')
          .update({ 
            ContenuReponse: '[Contenu masqué par la modération]'
          })
          .eq('IDReponseForum', itemIdNum);

        if (hideError) throw hideError;

        const { error: signalError } = await supabase
          .from('SignalementContenu')
          .update({ 
            Traité: true,
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

        const { error: signalError } = await supabase
          .from('SignalementContenu')
          .update({ 
            Traité: true,
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

  const deleteContent = async (type: 'forum' | 'group', itemId: string) => {
    setIsProcessing(true);
    
    try {
      const itemIdNum = parseInt(itemId);
      
      // D'abord supprimer tous les signalements associés
      const column = type === 'forum' ? 'IDReponseForum' : 'IDMessageGroupe';
      
      const { error: deleteSignalError } = await supabase
        .from('SignalementContenu')
        .delete()
        .eq(column, itemIdNum);

      if (deleteSignalError) throw deleteSignalError;

      // Ensuite supprimer le contenu
      if (type === 'forum') {
        const { error: deleteError } = await supabase
          .from('ReponseForum')
          .delete()
          .eq('IDReponseForum', itemIdNum);

        if (deleteError) throw deleteError;
      } else {
        const { error: deleteError } = await supabase
          .from('MessageGroupe')
          .delete()
          .eq('IDMessageGroupe', itemIdNum);

        if (deleteError) throw deleteError;
      }

      toast({
        title: "Contenu supprimé",
        description: "Le contenu et tous ses signalements ont été supprimés définitivement"
      });

      return true;
    } catch (error: any) {
      console.error('Erreur lors de la suppression:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le contenu",
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
    deleteContent,
    isProcessing
  };
};
