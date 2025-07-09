
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStore } from "@/stores/authStore";

export interface PatrimonialDocument {
  IDDocumentPatrimonial: number;
  TypeDocument: string;
  URLDocument: string;
  IDSeniors: number | null;
  dateCreation?: string;
}

export const usePatrimonialDocuments = () => {
  const [documents, setDocuments] = useState<PatrimonialDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuthStore();

  const fetchDocuments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from("DocumentPatrimonial")
        .select("*");

      // Filtrer selon le rôle de l'utilisateur
      if (user?.role === 'support') {
        // Les seniors ne voient que leurs propres documents
        query = query.eq("IDSeniors", user.id);
      }
      // Les administrateurs et visualisateurs voient tous les documents (mais sans accès au contenu)

      const { data, error } = await query.order('IDDocumentPatrimonial', { ascending: false });

      if (error) {
        console.error('Erreur lors de la récupération des documents patrimoniaux:', error);
        setError('Impossible de charger les documents patrimoniaux');
        toast({
          title: "Erreur",
          description: "Impossible de charger les documents patrimoniaux.",
          variant: "destructive",
        });
        return;
      }

      setDocuments(data || []);
    } catch (err) {
      console.error('Erreur lors de la récupération des documents patrimoniaux:', err);
      setError('Erreur lors du chargement');
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors du chargement.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  useEffect(() => {
    if (user) {
      fetchDocuments();
    }
  }, [fetchDocuments]);

  const handleDownloadDocument = async (doc: PatrimonialDocument) => {
    // Vérification des droits côté client (sécurité supplémentaire)
    if (user?.role !== 'support' || doc.IDSeniors !== parseInt(user.id)) {
      toast({
        title: "Accès refusé",
        description: "Vous n'avez pas l'autorisation de télécharger ce document.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Ici, on pourrait implémenter le téléchargement sécurisé
      // Pour l'instant, on affiche un message
      toast({
        title: "Téléchargement",
        description: `Téléchargement de ${doc.TypeDocument} (fonctionnalité à implémenter)`,
      });
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
      toast({
        title: "Erreur",
        description: "Impossible de télécharger le document.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteDocument = async (docId: number) => {
    // Seuls les seniors propriétaires peuvent supprimer leurs documents
    if (user?.role !== 'support') {
      toast({
        title: "Accès refusé",
        description: "Vous n'avez pas l'autorisation de supprimer ce document.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from("DocumentPatrimonial")
        .delete()
        .eq("IDDocumentPatrimonial", docId)
        .eq("IDSeniors", user.id); // Sécurité supplémentaire

      if (error) {
        throw error;
      }

      toast({
        title: "Document supprimé",
        description: "Le document patrimonial a été supprimé avec succès.",
      });

      fetchDocuments();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le document.",
        variant: "destructive",
      });
    }
  };

  return {
    documents,
    loading,
    error,
    handleDownloadDocument,
    handleDeleteDocument,
    refetchDocuments: fetchDocuments,
  };
};
