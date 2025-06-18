
import { useState } from "react";
import DocumentsHeader from "./DocumentsHeader";
import DocumentsFilters from "./DocumentsFilters";
import DocumentsTable from "./DocumentsTable";
import DocumentsUpload from "./DocumentsUpload";
import DocumentsStats from "./DocumentsStats";
import DocumentsQuickActions from "./DocumentsQuickActions";
import AddDocumentModal from "./AddDocumentModal";
import EditDocumentModal from "./EditDocumentModal";
import ViewDocumentModal from "./ViewDocumentModal";
import { useDocuments, Document } from "./useDocuments";

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
    handleAddDocument,
    handleEditDocument,
    handleDownloadDocument,
    handleDeleteDocument
  } = useDocuments();

  const handleEditClick = (doc: Document) => {
    setSelectedDocument(doc);
    setIsEditDocumentModalOpen(true);
  };

  const handleViewClick = (doc: Document) => {
    setSelectedDocument(doc);
    setIsViewDocumentModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <DocumentsHeader onAddDocument={() => setIsAddDocumentModalOpen(true)} />

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <DocumentsFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterType={filterType}
          setFilterType={setFilterType}
          categories={categories}
        />

        <DocumentsTable
          documents={documents}
          onView={handleViewClick}
          onEdit={handleEditClick}
          onDownload={handleDownloadDocument}
          onDelete={handleDeleteDocument}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DocumentsUpload />
        <DocumentsStats documents={documents} />
        <DocumentsQuickActions />
      </div>

      <AddDocumentModal 
        isOpen={isAddDocumentModalOpen}
        onClose={() => setIsAddDocumentModalOpen(false)}
        onAddDocument={handleAddDocument}
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
