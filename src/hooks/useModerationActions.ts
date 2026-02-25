import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useModerationActions = () => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleError = (error: unknown, defaultMessage: string) => {
    const errorMessage = error instanceof Error ? error.message : defaultMessage;
    console.error(defaultMessage, error);
    toast({
      title: "Erreur",
      description: errorMessage,
      variant: "destructive"
    });
  };

  const markAsProcessed = async (type: 'forum' | 'group', itemId: string) => {
    setIsProcessing(true);
    try {
      // ✅ Correction : On définit explicitement les colonnes valides pour Supabase
      const column = type === 'forum' ? 'IDReponseForum' : 'IDMessageGroupe';
      const id = parseInt(itemId);

      const { error } = await supabase
          .from('SignalementContenu')
          .update({
            Traité: true,
            ActionModeration: 'Traité par modérateur'
          })
          .eq(column as "IDReponseForum" | "IDMessageGroupe", id);

      if (error) throw error;

      toast({
        title: "Signalement traité",
        description: "Le signalement a été marqué comme traité"
      });
      return true;
    } catch (error) {
      handleError(error, "Impossible de traiter le signalement");
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const hideContent = async (type: 'forum' | 'group', itemId: string) => {
    setIsProcessing(true);
    try {
      const id = parseInt(itemId);
      const maskedText = '[Contenu masqué par la modération]';

      if (type === 'forum') {
        // ✅ Correction : Appels directs aux tables pour éviter "as any"
        const { error: hideError } = await supabase
            .from('ReponseForum')
            .update({ ContenuReponse: maskedText })
            .eq('IDReponseForum', id);
        if (hideError) throw hideError;

        await supabase
            .from('SignalementContenu')
            .update({ Traité: true, ActionModeration: 'Contenu masqué' })
            .eq('IDReponseForum', id);
      } else {
        const { error: hideError } = await supabase
            .from('MessageGroupe')
            .update({ Contenu: maskedText })
            .eq('IDMessageGroupe', id);
        if (hideError) throw hideError;

        await supabase
            .from('SignalementContenu')
            .update({ Traité: true, ActionModeration: 'Contenu masqué' })
            .eq('IDMessageGroupe', id);
      }

      toast({ title: "Contenu masqué", description: "Le contenu a été masqué." });
      return true;
    } catch (error) {
      handleError(error, "Impossible de masquer le contenu");
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const deleteContent = async (type: 'forum' | 'group', itemId: string) => {
    setIsProcessing(true);
    try {
      const id = parseInt(itemId);
      const column = type === 'forum' ? 'IDReponseForum' : 'IDMessageGroupe';

      // 1. Supprimer les signalements
      const { error: signalError } = await supabase
          .from('SignalementContenu')
          .delete()
          .eq(column as "IDReponseForum" | "IDMessageGroupe", id);
      if (signalError) throw signalError;

      // 2. Supprimer le contenu selon le type
      if (type === 'forum') {
        const { error } = await supabase.from('ReponseForum').delete().eq('IDReponseForum', id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('MessageGroupe').delete().eq('IDMessageGroupe', id);
        if (error) throw error;
      }

      toast({ title: "Contenu supprimé", description: "Suppression définitive effectuée." });
      return true;
    } catch (error) {
      handleError(error, "Impossible de supprimer le contenu");
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return { markAsProcessed, hideContent, deleteContent, isProcessing };
};