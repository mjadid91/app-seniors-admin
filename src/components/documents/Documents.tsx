import { useState } from "react";
import { FileText, Upload, Download, Eye, Trash2, Search, Filter, Plus, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import AddDocumentModal from "./AddDocumentModal";

interface Document {
  id: number;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  category: string;
  status: string;
}

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [isAddDocumentModalOpen, setIsAddDocumentModalOpen] = useState(false);
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

  const handleEditDocument = (doc: Document) => {
    toast({
      title: "Modification du document",
      description: `Édition de ${doc.name}`,
    });
    console.log("Modifier le document:", doc);
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-800">Gestion des Documents</h1>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setIsAddDocumentModalOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouveau document
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Rechercher un document..."
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select
              className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">Toutes les catégories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtrer
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-medium text-slate-600">Document</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Catégorie</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Taille</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Date d'upload</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Statut</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-slate-800">{doc.name}</p>
                        <p className="text-sm text-slate-500">{doc.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                      {doc.category}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-600">{doc.size}</td>
                  <td className="py-4 px-4 text-slate-600">{new Date(doc.uploadDate).toLocaleDateString('fr-FR')}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      doc.status === 'Publié' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewDocument(doc)}
                        title="Visualiser"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditDocument(doc)}
                        title="Modifier"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDownloadDocument(doc)}
                        title="Télécharger"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDeleteDocument(doc.id)}
                        title="Supprimer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Upload className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-slate-800">Upload rapide</h3>
          </div>
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
            <FileText className="h-8 w-8 text-slate-400 mx-auto mb-2" />
            <p className="text-slate-600 mb-2">Glissez vos fichiers ici</p>
            <Button variant="outline" size="sm">
              Parcourir les fichiers
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Statistiques</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-600">Total documents:</span>
              <span className="font-medium">{documents.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Publiés:</span>
              <span className="font-medium text-green-600">{documents.filter(d => d.status === 'Publié').length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Brouillons:</span>
              <span className="font-medium text-yellow-600">{documents.filter(d => d.status === 'Brouillon').length}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Actions rapides</h3>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <Plus className="h-4 w-4 mr-2" />
              Nouveau template
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <FileText className="h-4 w-4 mr-2" />
              Importer en lot
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Download className="h-4 w-4 mr-2" />
              Exporter la liste
            </Button>
          </div>
        </div>
      </div>

      <AddDocumentModal 
        isOpen={isAddDocumentModalOpen}
        onClose={() => setIsAddDocumentModalOpen(false)}
        onAddDocument={handleAddDocument}
      />
    </div>
  );
};

export default Documents;
