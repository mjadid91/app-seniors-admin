
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export interface Document {
  id: number;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  category: string;
  status: string;
}

export const useDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 1,
      name: "Conditions générales d'utilisation",
      type: "PDF",
      size: "2.3 MB",
      uploadDate: "2024-01-15",
      category: "Légal",
      status: "Publié"
    },
    {
      id: 2,
      name: "Guide utilisateur",
      type: "PDF",
      size: "5.7 MB",
      uploadDate: "2024-01-10",
      category: "Documentation",
      status: "Brouillon"
    },
    {
      id: 3,
      name: "Charte de qualité",
      type: "DOC",
      size: "1.2 MB",
      uploadDate: "2024-01-08",
      category: "Qualité",
      status: "Publié"
    }
  ]);

  const { toast } = useToast();
  const categories = ["Légal", "Documentation", "Qualité", "Formation", "Procédures"];

  const handleAddDocument = (newDocData: Omit<Document, 'id'>) => {
    const newDocument: Document = {
      ...newDocData,
      id: documents.length + 1
    };
    setDocuments(prev => [...prev, newDocument]);
  };

  const handleViewDocument = (doc: Document) => {
    toast({
      title: "Aperçu du document",
      description: `Ouverture de ${doc.name}`,
    });
    console.log("Visualiser le document:", doc);
  };

  const handleEditDocument = (id: number, updatedDoc: Partial<Document>) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === id ? { ...doc, ...updatedDoc } : doc
    ));
  };

  const handleDownloadDocument = (doc: Document) => {
    toast({
      title: "Téléchargement",
      description: `Téléchargement de ${doc.name} en cours...`,
    });
    console.log("Télécharger le document:", doc);
  };

  const handleDeleteDocument = (docId: number) => {
    const doc = documents.find(d => d.id === docId);
    if (doc) {
      setDocuments(prev => prev.filter(d => d.id !== docId));
      toast({
        title: "Document supprimé",
        description: `${doc.name} a été supprimé avec succès.`,
      });
    }
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
