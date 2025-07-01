
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
    mutationFn: async (documentRGPD: DocumentRGPD) => {
      if (!documentRGPD.URLFichier) {
        throw new Error("URL du document non disponible");
      }

      // Créer un lien de téléchargement en utilisant l'objet DOM global
      const link = window.document.createElement('a');
      link.href = documentRGPD.URLFichier;
      link.download = `${documentRGPD.Titre}.pdf`;
      link.target = '_blank';
      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);

      return documentRGPD;
    },
    onSuccess: (documentRGPD) => {
      toast({
        title: "Téléchargement",
        description: `Téléchargement de "${documentRGPD.Titre}" en cours...`,
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
