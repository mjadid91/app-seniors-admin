
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export interface Document {
  id: number;
  name: string;
  type: string;
  category: string;
  status: string;
  uploadDate: string;
  size?: number;
  description?: string;
  utilisateurId?: number;
  utilisateurNom?: string;
}

export const useDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const { toast } = useToast();

  const fetchDocuments = async () => {
    try {
      const { data, error } = await supabase
        .from("Document")
        .select(`
          IDDocument,
          Titre,
          TypeFichier,
          URLFichier,
          DateUpload,
          TailleFichier,
          Statut,
          IDUtilisateurs,
          CategorieDocument!inner(NomCategorie),
          Utilisateurs(Nom, Prenom)
        `);

      if (error) {
        console.error("Error fetching documents:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les documents",
          variant: "destructive"
        });
        return;
      }

      const transformedDocuments: Document[] = data.map((doc: any) => ({
        id: doc.IDDocument,
        name: doc.Titre,
        type: doc.URLFichier,
        category: doc.CategorieDocument.NomCategorie,
        status: doc.Statut,
        uploadDate: doc.DateUpload,
        size: doc.TailleFichier,
        utilisateurId: doc.IDUtilisateurs,
        utilisateurNom: doc.Utilisateurs ? `${doc.Utilisateurs.Prenom} ${doc.Utilisateurs.Nom}` : "Non assigné"
      }));

      setDocuments(transformedDocuments);
    } catch (error) {
      console.error("Error in fetchDocuments:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors du chargement des documents",
        variant: "destructive"
      });
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("CategorieDocument")
        .select("NomCategorie");

      if (error) {
        console.error("Error fetching categories:", error);
        return;
      }

      setCategories(data.map(cat => cat.NomCategorie));
    } catch (error) {
      console.error("Error in fetchCategories:", error);
    }
  };

  const handleEditDocument = async (id: number, updatedDoc: Partial<Document>) => {
    try {
      // Récupérer l'ID de la catégorie à partir du nom
      let categoryId = null;
      if (updatedDoc.category) {
        const { data: categoryData, error: categoryError } = await supabase
          .from("CategorieDocument")
          .select("IDCategorieDocument")
          .eq("NomCategorie", updatedDoc.category)
          .single();

        if (categoryError) {
          throw categoryError;
        }
        categoryId = categoryData.IDCategorieDocument;
      }

      // Préparer les données pour la mise à jour
      const updateData: any = {};
      if (updatedDoc.name) updateData.Titre = updatedDoc.name;
      if (updatedDoc.status) updateData.Statut = updatedDoc.status;
      if (categoryId) updateData.IDCategorieDocument = categoryId;
      if (updatedDoc.utilisateurId) updateData.IDUtilisateurs = updatedDoc.utilisateurId;

      const { error } = await supabase
        .from("Document")
        .update(updateData)
        .eq("IDDocument", id);

      if (error) {
        throw error;
      }

      // Recharger les documents après la modification
      await fetchDocuments();

      toast({
        title: "Document modifié",
        description: "Le document a été modifié avec succès"
      });
    } catch (error) {
      console.error("Error updating document:", error);
      toast({
        title: "Erreur",
        description: "Impossible de modifier le document",
        variant: "destructive"
      });
    }
  };

  const handleDeleteDocument = async (id: number) => {
    try {
      const { error } = await supabase
        .from("Document")
        .delete()
        .eq("IDDocument", id);

      if (error) {
        throw error;
      }

      // Recharger les documents après la suppression
      await fetchDocuments();

      toast({
        title: "Document supprimé",
        description: "Le document a été supprimé avec succès"
      });
    } catch (error) {
      console.error("Error deleting document:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le document",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchDocuments();
    fetchCategories();
  }, []);

  return {
    documents,
    categories,
    handleEditDocument,
    handleDeleteDocument,
    fetchDocuments
  };
};
