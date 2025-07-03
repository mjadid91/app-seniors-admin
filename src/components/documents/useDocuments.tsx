
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export interface Document {
  id: number;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  category: string;
  status: string;
  supabaseId?: number;
  utilisateurId?: number;
}

interface SupabaseDocument {
  IDDocument: number;
  Titre: string;
  TypeFichier: string;
  TailleFichier: number | null;
  DateUpload: string;
  Statut: string;
  IDCategorieDocument: number | null;
  IDUtilisateurs: number | null;
  URLFichier: string;
}

interface SupabaseCategorie {
  IDCategorieDocument: number;
  NomCategorie: string;
}

export const useDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const { toast } = useToast();
  const [catIdToName, setCatIdToName] = useState<Record<number, string>>({});
  const [catNameToId, setCatNameToId] = useState<Record<string, number>>({});

  // Fetch categories from Supabase
  const fetchCategories = useCallback(async () => {
    const { data, error } = await supabase
      .from("CategorieDocument")
      .select("IDCategorieDocument,NomCategorie");
    if (error) {
      toast({ title: "Erreur", description: "Impossible de charger les catégories.", variant: "destructive" });
      return;
    }
    setCategories(data.map((cat: SupabaseCategorie) => cat.NomCategorie));
    // Build mappings
    const idToName: Record<number, string> = {};
    const nameToId: Record<string, number> = {};
    data.forEach((cat: SupabaseCategorie) => {
      idToName[cat.IDCategorieDocument] = cat.NomCategorie;
      nameToId[cat.NomCategorie] = cat.IDCategorieDocument;
    });
    setCatIdToName(idToName);
    setCatNameToId(nameToId);
  }, [toast]);

  // Fetch documents from Supabase avec RLS
  const fetchDocuments = useCallback(async () => {
    const { data, error } = await supabase
      .from("Document")
      .select("*");
    if (error) {
      console.error('Error fetching documents:', error);
      toast({ title: "Erreur", description: "Impossible de charger les documents.", variant: "destructive" });
      return;
    }

    setDocuments(
      (data as SupabaseDocument[]).map((doc) => ({
        id: doc.IDDocument,
        name: doc.Titre,
        type: doc.URLFichier, // Stocker l'URL dans le champ type pour compatibilité
        size: doc.TailleFichier != null ? `${(doc.TailleFichier / (1024 * 1024)).toFixed(1)} MB` : "0.0 MB",
        uploadDate: doc.DateUpload,
        category: doc.IDCategorieDocument && catIdToName[doc.IDCategorieDocument]
          ? catIdToName[doc.IDCategorieDocument]
          : "",
        status: doc.Statut,
        supabaseId: doc.IDDocument,
        utilisateurId: doc.IDUtilisateurs || undefined,
      }))
    );
  }, [catIdToName, toast]);

  // Fetch on mount
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    if (Object.keys(catIdToName).length > 0) {
      fetchDocuments();
    }
  }, [catIdToName, fetchDocuments]);

  // Edit document
  const handleEditDocument = async (id: number, updatedDoc: Partial<Document>) => {
    // Find catId if category is being updated
    let values: any = {};
    if (updatedDoc.name) values.Titre = updatedDoc.name;
    if (updatedDoc.status) values.Statut = updatedDoc.status;
    if (updatedDoc.category) values.IDCategorieDocument = catNameToId[updatedDoc.category];
    const { error } = await supabase
      .from("Document")
      .update(values)
      .eq("IDDocument", id);

    if (error) {
      toast({ title: "Erreur", description: "Mise à jour du document impossible.", variant: "destructive" });
      return;
    }
    toast({ title: "Document mis à jour", description: "Document édité avec succès." });
    fetchDocuments();
  };

  const handleViewDocument = (doc: Document) => {
    toast({
      title: "Aperçu du document",
      description: `Ouverture de ${doc.name} (non implémenté)`,
    });
    window.open(doc.supabaseId ? "#" : "#", "_blank");
  };

  const handleDeleteDocument = async (docId: number) => {
    const { error } = await supabase.from("Document").delete().eq("IDDocument", docId);
    if (error) {
      toast({ title: "Erreur", description: "Impossible de supprimer le document.", variant: "destructive" });
      return;
    }
    toast({ title: "Document supprimé", description: "Suppression réussie." });
    fetchDocuments();
  };

  return {
    documents,
    categories,
    handleViewDocument,
    handleEditDocument,
    handleDeleteDocument,
    fetchDocuments // Exposer la fonction pour rafraîchir les documents
  };
};
