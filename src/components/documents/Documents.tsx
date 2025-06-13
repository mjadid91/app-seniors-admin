
import { useState } from "react";
import DocumentsHeader from "./DocumentsHeader";
import DocumentsFilters from "./DocumentsFilters";
import DocumentsTable from "./DocumentsTable";
import DocumentsUpload from "./DocumentsUpload";
import DocumentsStats from "./DocumentsStats";
import DocumentsQuickActions from "./DocumentsQuickActions";
import AddDocumentModal from "./AddDocumentModal";
import EditDocumentModal from "./EditDocumentModal";
import { useDocuments } from "./useDocuments";

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [isAddDocumentModalOpen, setIsAddDocumentModalOpen] = useState(false);
  const [isEditDocumentModalOpen, setIsEditDocumentModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  
  const {
    documents,
    categories,
    handleAddDocument,
    handleViewDocument,
    handleEditDocument,
    handleDownloadDocument,
    handleDeleteDocument
  } = useDocuments();

  const handleEditClick = (doc) => {
    setSelectedDocument(doc);
    setIsEditDocumentModalOpen(true);
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
          onView={handleViewDocument}
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
    </div>
  );
};

export default Documents;
