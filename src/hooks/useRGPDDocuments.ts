
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface DocumentRGPD {
  IDDocumentRGPD: number;
  Titre: string;
  TypeDoc: string;
  URLFichier: string;
  DateMiseAJour: string;
}

export const useRGPDDocuments = () => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ["documents-rgpd"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("DocumentRGPD")
        .select("*")
        .order("DateMiseAJour", { ascending: false });
      
      if (error) throw new Error(error.message);
      return data as DocumentRGPD[];
    },
  });
};

export const useDownloadRGPDDocument = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (document: DocumentRGPD) => {
      if (!document.URLFichier) {
        throw new Error("URL du document non disponible");
      }

      // Créer un lien de téléchargement
      const link = document.createElement('a');
      link.href = document.URLFichier;
      link.download = `${document.Titre}.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      return document;
    },
    onSuccess: (document) => {
      toast({
        title: "Téléchargement",
        description: `Téléchargement de "${document.Titre}" en cours...`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de télécharger le document.",
        variant: "destructive",
      });
    },
  });
};
