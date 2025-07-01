
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStore } from "@/stores/authStore";

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
  urlFichier?: string;
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
  const { user } = useAuthStore();
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

  // Fetch documents from Supabase
  const fetchDocuments = useCallback(async () => {
    if (!user?.id) {
      console.log("No user ID available, skipping document fetch");
      return;
    }

    const { data, error } = await supabase
      .from("Document")
      .select("*");
    
    if (error) {
      toast({ title: "Erreur", description: "Impossible de charger les documents.", variant: "destructive" });
      return;
    }

    setDocuments(
      (data as SupabaseDocument[]).map((doc) => ({
        id: doc.IDDocument,
        name: doc.Titre,
        type: doc.TypeFichier,
        size: doc.TailleFichier != null ? `${Number(doc.TailleFichier).toFixed(1)} MB` : "0.0 MB",
        uploadDate: doc.DateUpload,
        category: doc.IDCategorieDocument && catIdToName[doc.IDCategorieDocument]
          ? catIdToName[doc.IDCategorieDocument]
          : "",
        status: doc.Statut,
        supabaseId: doc.IDDocument,
        utilisateurId: doc.IDUtilisateurs || undefined,
        urlFichier: doc.URLFichier,
      }))
    );
  }, [catIdToName, toast, user?.id]);

  // Fetch on mount
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    if (Object.keys(catIdToName).length > 0 && user?.id) {
      fetchDocuments();
    }
  }, [catIdToName, fetchDocuments, user?.id]);

  // Add new document (create in Supabase) - updated to handle the new interface
  const handleAddDocument = async (newDocData: Omit<Document, "id" | "supabaseId">) => {
    console.log('Adding document with data:', newDocData);
    
    if (!user?.id) {
      toast({ title: "Erreur", description: "Vous devez être connecté pour ajouter un document.", variant: "destructive" });
      return;
    }
    
    try {
      const catId = catNameToId[newDocData.category];
      
      if (!catId) {
        toast({ title: "Erreur", description: "Catégorie non trouvée.", variant: "destructive" });
        return;
      }

      const { data, error } = await supabase
        .from("Document")
        .insert([
          {
            Titre: newDocData.name,
            TypeFichier: newDocData.type,
            TailleFichier: parseFloat(newDocData.size),
            DateUpload: new Date().toISOString().split('T')[0],
            IDCategorieDocument: catId,
            Statut: newDocData.status,
            IDUtilisateurs: parseInt(user.id),
            URLFichier: newDocData.urlFichier || "#",
          },
        ])
        .select();

      if (error) {
        console.error('Supabase error:', error);
        toast({ title: "Erreur", description: "Création du document impossible.", variant: "destructive" });
        return;
      }

      console.log('Document created successfully:', data);
      toast({ title: "Document ajouté", description: `Le document "${newDocData.name}" a été ajouté.` });
      fetchDocuments();
    } catch (error) {
      console.error('Error adding document:', error);
      toast({ title: "Erreur", description: "Création du document impossible.", variant: "destructive" });
    }
  };

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
    if (doc.urlFichier && doc.urlFichier !== "#") {
      window.open(doc.urlFichier, "_blank");
    } else {
      toast({
        title: "Document non disponible",
        description: "Le fichier de ce document n'est pas disponible.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadDocument = (doc: Document) => {
    // Vérifier si le document est publié
    if (doc.status !== 'Publié') {
      toast({
        title: "Accès refusé",
        description: "Seuls les documents publiés peuvent être téléchargés.",
        variant: "destructive",
      });
      return;
    }

    if (doc.urlFichier && doc.urlFichier !== "#") {
      // Créer un lien de téléchargement
      const link = document.createElement('a');
      link.href = doc.urlFichier;
      link.download = doc.name;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Téléchargement",
        description: `Téléchargement de ${doc.name} en cours...`,
      });
    } else {
      toast({
        title: "Erreur",
        description: "Le fichier de ce document n'est pas disponible.",
        variant: "destructive",
      });
    }
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
    handleAddDocument,
    handleViewDocument,
    handleEditDocument,
    handleDownloadDocument,
    handleDeleteDocument
  };
};
