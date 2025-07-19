
import { useState } from "react";
import DocumentsHeader from "./DocumentsHeader";
import DocumentsFilters from "./DocumentsFilters";
import DocumentsTable from "./DocumentsTable";
import DocumentsStats from "./DocumentsStats";
import PatrimonialDocuments from "./PatrimonialDocuments";
import AddDocumentModal from "./AddDocumentModal";
import EditDocumentModal from "./EditDocumentModal";
import ViewDocumentModal from "./ViewDocumentModal";
import { useDocuments, Document } from "./useDocuments";
import { useFileOperations } from "@/hooks/useFileOperations";

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [isAddDocumentModalOpen, setIsAddDocumentModalOpen] = useState(false);
  const [isEditDocumentModalOpen, setIsEditDocumentModalOpen] = useState(false);
  const [isViewDocumentModalOpen, setIsViewDocumentModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  
  const {
    documents,
    categories,
    handleEditDocument,
    handleDeleteDocument,
    fetchDocuments
  } = useDocuments();

  const { downloadFile } = useFileOperations();

  const handleEditClick = (doc: Document) => {
    setSelectedDocument(doc);
    setIsEditDocumentModalOpen(true);
  };

  const handleViewClick = (doc: Document) => {
    setSelectedDocument(doc);
    setIsViewDocumentModalOpen(true);
  };

  const handleDownloadDocument = async (doc: Document) => {
    try {
      if (!doc.url) {
        console.error('URL du document non disponible');
        return;
      }
      
      await downloadFile({
        URLFichier: doc.url,
        Titre: doc.name
      });
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
    }
  };

  const handleDeleteClick = (doc: Document) => {
    handleDeleteDocument(doc.id);
  };

  const handleUploadSuccess = () => {
    // Recharger la liste des documents après un upload réussi
    if (fetchDocuments) {
      fetchDocuments();
    }
  };

  // Logique de filtrage des documents
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterType === "all" || doc.category === filterType;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <DocumentsHeader onAddDocument={() => setIsAddDocumentModalOpen(true)} />

      {/* Section statistiques uniquement */}
      <div className="grid grid-cols-1 gap-6">
        <DocumentsStats documents={documents} />
      </div>

      {/* Section Documents Patrimoniaux - Hautement sécurisée */}
      <PatrimonialDocuments />

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <DocumentsFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterType={filterType}
          setFilterType={setFilterType}
          categories={categories}
        />

        <DocumentsTable
          documents={filteredDocuments}
          onView={handleViewClick}
          onEdit={handleEditClick}
          onDownload={handleDownloadDocument}
          onDelete={handleDeleteClick}
        />
      </div>

      <AddDocumentModal 
        isOpen={isAddDocumentModalOpen}
        onClose={() => setIsAddDocumentModalOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />

      <EditDocumentModal
        isOpen={isEditDocumentModalOpen}
        onClose={() => setIsEditDocumentModalOpen(false)}
        document={selectedDocument}
        onEditDocument={handleEditDocument}
        categories={categories}
      />

      <ViewDocumentModal
        isOpen={isViewDocumentModalOpen}
        onClose={() => setIsViewDocumentModalOpen(false)}
        document={selectedDocument}
      />
    </div>
  );
};

export default Documents;
