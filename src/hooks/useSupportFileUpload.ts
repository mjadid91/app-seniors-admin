
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useSupportFileUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const uploadFile = async (file: File, ticketId: string): Promise<string | null> => {
    if (!file) return null;

    setIsUploading(true);
    
    try {
      console.log("Upload du fichier pour le ticket:", ticketId);
      
      // Générer un nom de fichier unique
      const fileExt = file.name.split('.').pop();
      const fileName = `ticket-${ticketId}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      console.log("Nom du fichier:", fileName);

      const { data, error } = await supabase.storage
        .from('support-files')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error("Erreur lors de l'upload:", error);
        throw error;
      }

      console.log("Fichier uploadé avec succès:", data);

      // Récupérer l'URL publique du fichier
      const { data: { publicUrl } } = supabase.storage
        .from('support-files')
        .getPublicUrl(fileName);

      console.log("URL publique du fichier:", publicUrl);
      
      return publicUrl;
    } catch (error: any) {
      console.error("Erreur lors de l'upload du fichier:", error);
      toast({
        title: "Erreur d'upload",
        description: "Impossible d'uploader le fichier. Veuillez réessayer.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadFile,
    isUploading,
  };
};
