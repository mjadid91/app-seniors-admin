
import { useState } from "react";
import { Shield, Eye, Download, Lock, Calendar, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePermissions } from "@/hooks/usePermissions";
import { useAuthStore } from "@/stores/authStore";
import { usePatrimonialDocuments } from "./usePatrimonialDocuments";
import AddPatrimonialDocumentModal from "./AddPatrimonialDocumentModal";
import ViewPatrimonialDocumentModal from "./ViewPatrimonialDocumentModal";

const PatrimonialDocuments = () => {
  const { user } = useAuthStore();
  const { isAdmin } = usePermissions();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const {
    documents,
    loading,
    error,
    handleDownloadDocument,
    handleDeleteDocument,
    refetchDocuments
  } = usePatrimonialDocuments();

  // Vérifier si l'utilisateur a accès à cette section
  const hasAccess = user?.role === 'support' || isAdmin() || user?.role === 'visualisateur';
  
  if (!hasAccess) {
    return null; // Masquer complètement la section pour les rôles non autorisés
  }

  // Vérifier si l'utilisateur peut ajouter des documents
  const canAddDocuments = user?.role === 'support' || isAdmin();

  const canDownload = (doc: any) => {
    // Seuls les seniors propriétaires peuvent télécharger leurs propres documents
    const userIdAsNumber = parseInt(user?.id || '0');
    return user?.role === 'support' && doc.IDSeniors === userIdAsNumber;
  };

  const canViewContent = (doc: any) => {
    // Même règle que pour le téléchargement
    return canDownload(doc);
  };

  const handleViewClick = (doc: any) => {
    if (canViewContent(doc)) {
      setSelectedDocument(doc);
      setIsViewModalOpen(true);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="h-6 w-6 text-red-600" />
          <h2 className="text-xl font-semibold text-slate-800">Documents Patrimoniaux</h2>
          <div className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-medium">
            CONFIDENTIEL
          </div>
        </div>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-slate-500 mt-2">Chargement des documents...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="h-6 w-6 text-red-600" />
          <h2 className="text-xl font-semibold text-slate-800">Documents Patrimoniaux</h2>
        </div>
        <div className="text-center py-8 text-red-600">
          <p>Erreur lors du chargement des documents patrimoniaux</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-red-600" />
            <h2 className="text-xl font-semibold text-slate-800">Documents Patrimoniaux</h2>
            <div className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-medium">
              CONFIDENTIEL
            </div>
          </div>
          
          {canAddDocuments && (
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <FileText className="h-4 w-4 mr-2" />
              Ajouter un document patrimonial
            </Button>
          )}
        </div>

        {/* Message d'information sur la confidentialité */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Lock className="h-5 w-5 text-red-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-red-800">Documents hautement confidentiels</h3>
              <p className="text-sm text-red-700 mt-1">
                {user?.role === 'support' 
                  ? "Vous pouvez consulter et télécharger vos documents patrimoniaux."
                  : "En tant qu'administrateur, vous pouvez uniquement voir l'existence des documents, sans accès au contenu."
                }
              </p>
            </div>
          </div>
        </div>

        {/* Tableau des documents */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-medium text-slate-600">Type de document</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Date d'ajout</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Confidentialité</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-500">
                    Aucun document patrimonial trouvé
                  </td>
                </tr>
              ) : (
                documents.map((doc) => (
                  <tr key={doc.IDDocumentPatrimonial} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-red-600" />
                        <span className="font-medium text-slate-800">{doc.TypeDocument}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Calendar className="h-4 w-4" />
                        {doc.dateCreation ? new Date(doc.dateCreation).toLocaleDateString('fr-FR') : 'N/A'}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4 text-red-600" />
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                          Confidentiel
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        {canViewContent(doc) ? (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewClick(doc)}
                              title="Visualiser"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDownloadDocument(doc)}
                              title="Télécharger"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </>
                        ) : (
                          <div className="flex items-center gap-2 text-slate-400">
                            <Lock className="h-4 w-4" />
                            <span className="text-xs">Accès restreint</span>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AddPatrimonialDocumentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onUploadSuccess={refetchDocuments}
      />

      <ViewPatrimonialDocumentModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        document={selectedDocument}
      />
    </>
  );
};

export default PatrimonialDocuments;
